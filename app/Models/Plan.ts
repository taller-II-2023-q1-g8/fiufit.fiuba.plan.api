import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Exercise from 'App/Models/Exercise'
import Athlete from 'App/Models/Athlete'
import Trainer from 'App/Models/Trainer'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public difficulty: string

  @manyToMany(() => Exercise)
  public exercises: ManyToMany<typeof Exercise>

  @manyToMany(() => Athlete)
  public athletes: ManyToMany<typeof Athlete>

  @manyToMany(() => Trainer)
  public trainers: ManyToMany<typeof Trainer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
