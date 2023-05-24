import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'athlete_plan'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('athlete_id').unsigned().references('athletes.id')
      table.integer('plan_id').unsigned().references('plans.id')
      table.unique(['athlete_id', 'plan_id'])
      table.boolean('is_liked').defaultTo(false)
      table.boolean('is_completed').defaultTo(false)
      table.string('calification').defaultTo('')
      table.integer('calification_score').defaultTo(-1)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
