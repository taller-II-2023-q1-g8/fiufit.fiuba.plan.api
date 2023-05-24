import { DateTime } from 'luxon'
import { BaseModel, column, computed, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Plan from 'App/Models/Plan'

export default class Athlete extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @computed()
  public get is_liked() {
    return this.$extras.pivot_is_liked
  }

  @computed()
  public get calification() {
    return this.$extras.pivot_calification
  }

  @computed()
  public get calification_score() {
    return this.$extras.pivot_calification_score
  }

  @column()
  public external_id: string

  @manyToMany(() => Plan)
  public plans: ManyToMany<typeof Plan>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
