import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'exercise_plan'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('plan_id').unsigned().references('plans.id').onDelete('CASCADE')
      table.integer('exercise_id').unsigned().references('exercises.id').onDelete('CASCADE')
      table.unique(['plan_id', 'exercise_id'])
      table.integer('reps').unsigned().notNullable()
      table.integer('weight').unsigned().notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
