import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SupportItem from "App/Models/SupportItem";

export default class AdminSupportItemsController {
  public async index({ view }: HttpContextContract) {
    const supportItems = await SupportItem.query()
      .orderBy('category', 'asc')
      .orderBy('title', 'asc');

    return view.render("admin/support-items/index", { supportItems });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("admin/support-items/create");
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only([
      "title",
      "description", 
      "category",
      "isActive"
    ]);

    try {
      await SupportItem.create(data);
      return response.redirect().toRoute("admin.support-items.index");
    } catch (error) {
      console.error("Error creating support item:", error);
      return response.redirect().back();
    }
  }

  public async show({ params, view }: HttpContextContract) {
    const supportItem = await SupportItem.findOrFail(params.id);
    return view.render("admin/support-items/show", { supportItem });
  }

  public async edit({ params, view }: HttpContextContract) {
    const supportItem = await SupportItem.findOrFail(params.id);
    return view.render("admin/support-items/edit", { supportItem });
  }

  public async update({ params, request, response }: HttpContextContract) {
    const supportItem = await SupportItem.findOrFail(params.id);
    const data = request.only([
      "title",
      "description",
      "category", 
      "isActive"
    ]);

    try {
      await supportItem.merge(data).save();
      return response.redirect().toRoute("admin.support-items.index");
    } catch (error) {
      console.error("Error updating support item:", error);
      return response.redirect().back();
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const supportItem = await SupportItem.findOrFail(params.id);
      await supportItem.delete();
      return response.redirect().toRoute("admin.support-items.index");
    } catch (error) {
      console.error("Error deleting support item:", error);
      return response.redirect().back();
    }
  }
}
