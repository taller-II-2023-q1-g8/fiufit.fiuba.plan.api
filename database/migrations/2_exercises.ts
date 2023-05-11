import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { MUSCLES } from 'App/Models/Exercise'

export default class extends BaseSchema {
  protected tableName = 'exercises'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.integer('reps').defaultTo(0)
      table.integer('weight').defaultTo(0)
      table.enum('muscle', MUSCLES).defaultTo(MUSCLES[0])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
