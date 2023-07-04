import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Plan from 'App/Models/Plan'
import Verification from 'App/Models/Verification'

export default class Trainer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public external_id: string

  @hasOne(() => Verification)
  public verification: HasOne<typeof Verification>

  @hasMany(() => Plan)
  public plans: HasMany<typeof Plan>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
