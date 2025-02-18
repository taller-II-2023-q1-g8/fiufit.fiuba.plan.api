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

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public blocked: boolean

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public difficulty: string

  @column()
  public tags: string

  @column()
  public trainer_id: number

  @belongsTo(() => Trainer, { localKey: 'id', foreignKey: 'trainer_id' })
  public trainer: BelongsTo<typeof Trainer>

  @manyToMany(() => Exercise, {
    localKey: 'id',
    pivotForeignKey: 'plan_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'exercise_id',
    pivotColumns: ['reps', 'weight'],
  })
  public exercises: ManyToMany<typeof Exercise>

  @manyToMany(() => Athlete, {
    localKey: 'id',
    pivotForeignKey: 'plan_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'athlete_id',
    pivotColumns: ['is_liked', 'calification', 'calification_score'],
  })
  public athletes: ManyToMany<typeof Athlete>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async createWithTrainer(payload) {
    const trainer = await Trainer.firstOrCreate({ external_id: payload.trainer_username })
    await trainer.related('verification').updateOrCreate({ trainerId: trainer.id }, { status: 0 })
    const plan = await Plan.create({
      title: payload.title,
      description: payload.description,
      difficulty: payload.difficulty,
      tags: payload.tags,
    })
    await plan.related('trainer').associate(trainer)

    await plan.load((loader) => {
      loader.load('trainer')
    })
    return plan
  }
}
