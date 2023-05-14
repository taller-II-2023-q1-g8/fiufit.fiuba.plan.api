import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { DIFFICULTY_LEVELS } from 'App/Models/Plan'

export default class extends BaseSchema {
  protected tableName = 'plans'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.string('description').defaultTo('')
      table.enum('difficulty', DIFFICULTY_LEVELS).defaultTo(DIFFICULTY_LEVELS[1])
      table.integer('trainer_id').unsigned().references('trainers.id')
      table.string('tags').defaultTo('')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
