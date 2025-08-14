import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'support_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.string('category').defaultTo('general')
      table.boolean('is_active').defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    // Create pivot table for many-to-many relationship
    this.schema.createTable('license_support_items', (table) => {
      table.uuid('id').primary()
      table.uuid('license_id').references('id').inTable('licenses').onDelete('CASCADE')
      table.uuid('support_item_id').references('id').inTable('support_items').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      
      // Ensure unique combinations
      table.unique(['license_id', 'support_item_id'])
    })
  }

  public async down() {
    this.schema.dropTable('license_support_items')
    this.schema.dropTable(this.tableName)
  }
}
