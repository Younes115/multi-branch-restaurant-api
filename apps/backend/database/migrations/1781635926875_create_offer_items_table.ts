import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'offer_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').notNullable()
      table
        .bigInteger('offer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('offers')
        .onDelete('CASCADE')
      table
        .bigInteger('menu_item_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('menu_items')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
