import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.query().preload("posts");
      return response.json(users);
    } catch (error) {
      console.error("Database error:", error);
      return response
        .status(500)
        .json({ error: "Failed to fetch users", details: error.message });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const { email, name } = request.only(["email", "name"]);

      const user = await User.create({
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
      });

      return response.status(201).json(user);
    } catch (error) {
      console.error("Database error:", error);
      return response
        .status(500)
        .json({ error: "Failed to create user", details: error.message });
    }
  }
}
