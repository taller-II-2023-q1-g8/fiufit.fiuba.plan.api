import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Exercise from 'App/Models/Exercise'

export default class ExerciseSeeder extends BaseSeeder {
  public async run() {
    await Exercise.createMany([
      {
        title: 'mancuerna',
        reps: 10,
        weight: 20,
        muscles: 'ARMS',
      },
      {
        title: 'sentadilla',
        reps: 10,
        weight: 20,
        muscles: 'CHEST',
      },
      {
        title: 'lagartijas',
        reps: 10,
        weight: 20,
        muscles: 'ARMS, CHEST',
      },
      {
        title: 'abdominales',
        reps: 10,
        weight: 20,
        muscles: 'ARMS, CHEST',
      },
      {
        title: 'saltos',
        reps: 10,
        weight: 20,
        muscles: 'LEGS',
      },
      {
        title: 'dominadas',
        reps: 10,
        weight: 20,
        muscles: 'ARMS, LEGS',
      },
    ])
  }
}
