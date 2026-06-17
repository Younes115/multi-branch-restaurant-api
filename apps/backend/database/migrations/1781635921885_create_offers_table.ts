import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'offers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').notNullable()
      table
        .bigInteger('branch_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('branches')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.text('description').nullable()
      table.enum('discount_type', ['percentage', 'fixed_amount']).notNullable()
      table.decimal('discount_value', 10, 2).notNullable()
      table.timestamp('start_date', { useTz: true }).notNullable()
      table.timestamp('end_date', { useTz: true }).notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
