import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Plan from 'App/Models/Plan'

export default class Athlete extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public external_id: string

  @manyToMany(() => Plan)
  // @no-swagger
  public plans: ManyToMany<typeof Plan>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
