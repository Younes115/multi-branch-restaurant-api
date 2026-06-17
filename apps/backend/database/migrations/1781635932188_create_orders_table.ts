import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').notNullable()
      table
        .bigInteger('branch_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('branches')
        .onDelete('CASCADE')
      table.string('customer_name').notNullable()
      table.string('customer_phone').notNullable()
      table.text('customer_address').notNullable()
      table.decimal('total_amount', 10, 2).notNullable()
      table
        .enum('status', [
          'pending_approval',
          'accepted',
          'preparing',
          'delivered',
          'rejected',
          'cancelled',
        ])
        .notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
