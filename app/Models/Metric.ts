import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Goal from 'App/Models/Goal'

export default class Metric extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  public name: string

  public value: number

  @manyToMany(() => Goal)
  public goals: ManyToMany<typeof Goal>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
