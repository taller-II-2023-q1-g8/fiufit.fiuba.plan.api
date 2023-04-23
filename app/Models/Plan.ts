import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Exercise from 'App/Models/Exercise'
//import Resource from 'App/Models/Resource'
//import Goals from 'App/Models/Goal'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @manyToMany(() => Exercise)
  public exercises: ManyToMany<typeof Exercise>

  @column()
  public dificulty: string

  /*@hasMany(() => Resource)
  public resources: HasMany<typeof Resource>*/

  /*@hasMany(() => Goal)
  public goals: HasMany<typeof Goal>*/

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
