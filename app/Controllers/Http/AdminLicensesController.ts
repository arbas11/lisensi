import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import License from "App/Models/License";
import SupportResponseTime from "App/Models/SupportResponseTime";
import SupportItem from "App/Models/SupportItem";

export default class AdminLicensesController {
  public async index({ view }: HttpContextContract) {
    const licenses = await License.query()
      .orderBy("created_at", "desc")
      .preload("supportResponseTimes");

    return view.render("admin/licenses/index", { licenses });
  }

  public async create({ view }: HttpContextContract) {
    const supportItems = await SupportItem.query()
      .where("isActive", true)
      .orderBy("category", "asc");
    return view.render("admin/licenses/create", { supportItems });
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only([
      "licenseKey",
      "startDate",
      "endDate",
      "status",
      "companyName",
      "companyAddress",
      "companyEmail",
      "picName",
      "picPhone",
    ]);

    try {
      const license = await License.create(data);

      // Create support response times
      const supportCategories = request.input("supportCategories", []);
      const supportResponseTimes = request.input("supportResponseTimes", []);
      const supportDescriptions = request.input("supportDescriptions", []);
      const supportResolutions = request.input("supportResolutions", []);

      // Create support response times from the arrays
      for (let i = 0; i < supportCategories.length; i++) {
        if (supportCategories[i] && supportDescriptions[i]) {
          await SupportResponseTime.create({
            licenseId: license.id,
            category: supportCategories[i],
            description: supportDescriptions[i],
            responseTime: supportResponseTimes[i] || "",
            resolution: supportResolutions[i] || "",
          });
        }
      }

      // Attach selected support items
      const selectedSupportItems = request.input("supportItems", []);
      if (selectedSupportItems.length > 0) {
        await license.related("supportItems").attach(selectedSupportItems);
      }

      return response.redirect().toRoute("admin.licenses.index");
    } catch (error) {
      console.error("Error creating license:", error);
      return response.redirect().back();
    }
  }

  public async show({ params, view }: HttpContextContract) {
    const license = await License.query()
      .where("id", params.id)
      .preload("supportResponseTimes")
      .preload("supportItems")
      .firstOrFail();

    return view.render("admin/licenses/show", { license });
  }

  public async edit({ params, view }: HttpContextContract) {
    const license = await License.query()
      .where("id", params.id)
      .preload("supportResponseTimes")
      .preload("supportItems")
      .firstOrFail();

    const supportItems = await SupportItem.query()
      .where("isActive", true)
      .orderBy("category", "asc");

    // Get selected support item IDs
    const selectedSupportItemIds = license.supportItems.map((item) => item.id);

    return view.render("admin/licenses/edit", {
      license,
      supportItems,
      selectedSupportItemIds,
    });
  }

  public async update({ params, request, response }: HttpContextContract) {
    const license = await License.findOrFail(params.id);
    const data = request.only([
      "licenseKey",
      "startDate",
      "endDate",
      "status",
      "companyName",
      "companyAddress",
      "companyEmail",
      "picName",
      "picPhone",
    ]);

    try {
      await license.merge(data).save();

      // Update support response times
      await SupportResponseTime.query()
        .where("license_id", license.id)
        .delete();

      // Get the arrays from the form
      const supportCategories = request.input("supportCategories", []);
      const supportResponseTimes = request.input("supportResponseTimes", []);
      const supportDescriptions = request.input("supportDescriptions", []);
      const supportResolutions = request.input("supportResolutions", []);

      // Create support response times from the arrays
      for (let i = 0; i < supportCategories.length; i++) {
        if (supportCategories[i] && supportDescriptions[i]) {
          await SupportResponseTime.create({
            licenseId: license.id,
            category: supportCategories[i],
            description: supportDescriptions[i],
            responseTime: supportResponseTimes[i] || "",
            resolution: supportResolutions[i] || "",
          });
        }
      }

      // Update support items
      const selectedSupportItems = request.input("supportItems", []);
      await license.related("supportItems").sync(selectedSupportItems);

      return response.redirect().toRoute("admin.licenses.index");
    } catch (error) {
      console.error("Error updating license:", error);
      return response.redirect().back();
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const license = await License.findOrFail(params.id);
      await license.delete();
      return response.redirect().toRoute("admin.licenses.index");
    } catch (error) {
      console.error("Error deleting license:", error);
      return response.redirect().back();
    }
  }
}
