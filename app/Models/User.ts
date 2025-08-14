import { DateTime } from "luxon";
import { BaseModel } from "@ioc:Adonis/Lucid/Orm";
import { column, hasMany } from "@adonisjs/lucid/build/src/Orm/Decorators";
import Post from "./Post";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public email: string;

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Post, {
    foreignKey: "authorId",
  })
  public posts: any;
}
