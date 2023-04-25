import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Exercise from './Exercise'

export default class Metric extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  public name: string

  public value: number

  @belongsTo(() => Exercise)
  public goals: BelongsTo<typeof Exercise>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
