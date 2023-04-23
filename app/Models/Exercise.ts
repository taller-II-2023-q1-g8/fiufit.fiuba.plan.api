import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Plan from 'App/Models/Plan'
//import ExerciseType from 'App/Models/ExerciseType'

export default class Exercise extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @manyToMany(() => Plan)
  public plans: ManyToMany<typeof Plan>

  /*@hasOne(() => ExerciseType)
  public type: HasOne<typeof ExerciseType>*/

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
