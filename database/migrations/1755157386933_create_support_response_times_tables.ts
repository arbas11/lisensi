import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'support_response_times'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('license_id').references('id').inTable('licenses').onDelete('CASCADE')
      table.string('category').notNullable()
      table.text('description').notNullable()
      table.string('response_time').notNullable()
      table.string('resolution').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
