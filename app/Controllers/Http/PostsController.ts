import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";

export default class PostsController {
  public async index({ response }: HttpContextContract) {
    try {
      const posts = await Post.query().preload("author");
      return response.json(posts);
    } catch (error) {
      console.error("Database error:", error);
      return response
        .status(500)
        .json({ error: "Failed to fetch posts", details: error.message });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const { title, content, authorId } = request.only([
        "title",
        "content",
        "authorId",
      ]);

      const post = await Post.create({
        id: Math.random().toString(36).substr(2, 9),
        title,
        content,
        published: false,
        authorId,
      });

      await post.load("author");
      return response.status(201).json(post);
    } catch (error) {
      console.error("Database error:", error);
      return response
        .status(500)
        .json({ error: "Failed to create post", details: error.message });
    }
  }
}
