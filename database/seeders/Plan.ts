import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Plan from 'App/Models/Plan'

export default class PlanSeeder extends BaseSeeder {
  public async run() {
    const payloads = [
      {
        title: 'mancuerna',
        description: 'un dia vi una vaca vestida de uniforme',
        difficulty: 'EASY',
        tags: 'CHEST',
        trainer_id: 1,
      },
      {
        title: 'sentadilla',
        description: 'un dia vi una vaca vestida de uniforme',
        difficulty: 'EASY',
        tags: 'CHEST',
        trainer_id: 1,
      },
      {
        title: 'lagartijas',
        description: 'un dia vi una vaca vestida de uniforme',
        difficulty: 'HARD',
        tags: 'ARMS, CHEST',
        trainer_id: 1,
      },
      {
        title: 'abdominales',
        description: 'un dia vi una vaca vestida de uniforme',
        difficulty: 'NORMAL',
        tags: 'ARMS, CHEST',
        trainer_id: 2,
      },
      {
        title: 'saltos',
        description: 'un dia vi una vaca vestida de uniforme',
        difficulty: 'EASY',
        tags: 'LEGS',
        trainer_id: 3,
      },
      {
        title: 'dominadas',
        description: 'un dia vi una vaca vestida de uniforme',
        difficulty: 'HARD',
        tags: 'ARMS, LEGS',
        trainer_id: 2,
      },
    ]

    for (var payload of payloads) {
      await Plan.createWithTrain(payload)
    }
  }
}
