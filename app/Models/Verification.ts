import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Trainer from './Trainer'

export default class Verification extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public trainerId: number

  @belongsTo(() => Trainer, { localKey: 'id', foreignKey: 'trainerId' })
  public trainer: BelongsTo<typeof Trainer>

  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public getStatus() {
    switch (this.status) {
      case 1:
        return 'Pending'
      case 2:
        return 'Approved'
      case 3:
        return 'Rejected'
      default:
        return 'Not verified'
    }
  }
}
