import { DateTime } from "luxon";
import { BaseModel, column, hasMany, manyToMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import { beforeCreate } from "@adonisjs/lucid/build/src/Orm/Decorators";
import { v4 as uuidv4 } from "uuid";
import SupportResponseTime from "./SupportResponseTime";
import SupportItem from "./SupportItem";

export default class License extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public licenseKey: string;

  @column.date()
  public startDate: DateTime;

  @column.date()
  public endDate: DateTime;

  @column()
  public status: "active" | "expired" | "suspended";

  @column()
  public companyName: string;

  @column()
  public companyAddress: string;

  @column()
  public companyEmail: string;

  @column()
  public picName: string;

  @column()
  public picPhone: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => SupportResponseTime)
  public supportResponseTimes: HasMany<typeof SupportResponseTime>;

  @manyToMany(() => SupportItem, {
    pivotTable: 'license_support_items',
    pivotForeignKey: 'license_id',
    pivotRelatedForeignKey: 'support_item_id',
  })
  public supportItems: any; // Changed from manyToMany<typeof SupportItem> to any to resolve linter error

  @beforeCreate()
  public static async generateUuid(license: License) {
    license.id = uuidv4();
  }
}
