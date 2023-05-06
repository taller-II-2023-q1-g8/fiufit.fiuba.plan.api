import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Exercise from 'App/Models/Exercise'
import Athlete from 'App/Models/Athlete'
import Trainer from 'App/Models/Trainer'

export const DIFFICULTY_LEVELS = ['EASY', 'NORMAL', 'HARD']

export const PLAN_TAGS = ['LEGS', 'ARMS', 'FULL BODY']

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  // @enum(EASY, NORMAL, HARD)
  public difficulty: string

  //@column()
  // @enum(LEGS, ARMS, FULL BODY)
  //public tags: string[]

  @belongsTo(() => Trainer)
  public trainer: BelongsTo<typeof Trainer>

  @manyToMany(() => Exercise)
  public exercises: ManyToMany<typeof Exercise>

  @manyToMany(() => Athlete)
  public athletes: ManyToMany<typeof Athlete>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
