import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Plan from 'App/Models/Plan'
import Multimedia from 'App/Models/Multimedia'

export const MUSCLES = ['LEGS', 'ARMS', 'CHEST']

export default class Exercise extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public reps: number

  @column()
  public weight: number

  @column()
  public muscle: string

  @manyToMany(() => Plan)
  public plans: ManyToMany<typeof Plan>

  @hasOne(() => Multimedia)
  public multimedia: HasOne<typeof Multimedia>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
