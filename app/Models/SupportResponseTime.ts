import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import License from './License'

export default class SupportResponseTime extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public licenseId: string

  @column()
  public category: string

  @column()
  public description: string

  @column()
  public responseTime: string

  @column()
  public resolution: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relationships
  @belongsTo(() => License, {
    foreignKey: 'licenseId',
  })
  public license: any

  @beforeCreate()
  public static async generateUuid(supportTime: SupportResponseTime) {
    supportTime.id = uuidv4()
  }
}
