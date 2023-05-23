import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Exercise from 'App/Models/Exercise'

export default class ExerciseSeeder extends BaseSeeder {
  public async run() {
    await Exercise.createMany([
      {
        title: 'mancuerna',
        muscles: 'ARMS',
      },
      {
        title: 'sentadilla',
        muscles: 'CHEST',
      },
      {
        title: 'lagartijas',
        muscles: 'ARMS, CHEST',
      },
      {
        title: 'abdominales',
        muscles: 'ARMS, CHEST',
      },
      {
        title: 'saltos',
        muscles: 'LEGS',
      },
      {
        title: 'dominadas',
        muscles: 'ARMS, LEGS',
      },
    ])
  }
}
