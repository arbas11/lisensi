import type { HttpContext } from "@ioc:Adonis/Core/HttpContext";
import License from "App/Models/License";

export default class LicenseController {
  public async search({ view }: HttpContext) {
    return view.render("license/search");
  }

  public async show({ params, view }: HttpContext) {
    try {
      const license = await License.query()
        .where("licenseKey", params.key)
        .preload("supportResponseTimes")
        .preload("supportItems")
        .firstOrFail();

      // Transform the data to match the view expectations
      const licenseData = {
        licenseKey: license.licenseKey,
        startDate: license.startDate,
        endDate: license.endDate,
        status: license.status,
        companyName: license.companyName,
        companyAddress: license.companyAddress,
        companyEmail: license.companyEmail,
        picName: license.picName,
        picPhone: license.picPhone,
        supportResponseTimes: license.supportResponseTimes.map((srt) => ({
          category: srt.category,
          description: srt.description,
          responseTime: srt.responseTime,
          resolution: srt.resolution,
        })),
        supportItems: license.supportItems.map((item) => ({
          title: item.title,
          description: item.description,
          category: item.category,
        })),
      };

      return view.render("license/show", { licenseData });
    } catch (error) {
      return view.render("license/search", {
        error:
          "License not found. Please check your license key and try again.",
        searchKey: params.key,
      });
    }
  }
}
