import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'licenses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('license_key').unique().notNullable()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.enum('status', ['active', 'expired', 'suspended']).defaultTo('active')
      table.string('company_name').notNullable()
      table.text('company_address').notNullable()
      table.string('company_email').notNullable()
      table.string('pic_name').notNullable()
      table.string('pic_phone').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
