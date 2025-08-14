import { DateTime } from "luxon";
import { BaseModel } from "@ioc:Adonis/Lucid/Orm";
import { column, belongsTo } from "@adonisjs/lucid/build/src/Orm/Decorators";
import User from "./User";

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public title: string;

  @column()
  public content: string;

  @column()
  public published: boolean;

  @column()
  public authorId: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User, {
    foreignKey: "authorId",
  })
  public author: any;
}
