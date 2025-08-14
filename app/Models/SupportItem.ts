import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { beforeCreate } from '@adonisjs/lucid/build/src/Orm/Decorators'
import { v4 as uuidv4 } from 'uuid'
import License from './License'

export default class SupportItem extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public category: string

  @column()
  public isActive: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => License, {
    pivotTable: 'license_support_items',
    pivotForeignKey: 'support_item_id',
    pivotRelatedForeignKey: 'license_id',
  })
  public licenses: manyToMany<typeof License>

  @beforeCreate()
  public static async generateUuid(supportItem: SupportItem) {
    supportItem.id = uuidv4()
  }
}
