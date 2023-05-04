import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Plan from 'App/Models/Plan'
import Goal from 'App/Models/Goal'

export default class Athlete extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => Plan)
  public plans: ManyToMany<typeof Plan>

  @manyToMany(() => Goal)
  public goals: ManyToMany<typeof Goal>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
