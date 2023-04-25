import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Plan from 'App/Models/Plan'
import Atlete from 'App/Models/Atlete'
import Metric from 'App/Models/Metric'

export default class Goal extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => Plan)
  public plans: ManyToMany<typeof Plan>

  @manyToMany(() => Atlete)
  public atletes: ManyToMany<typeof Atlete>

  @manyToMany(() => Metric)
  public metrics: ManyToMany<typeof Metric>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
