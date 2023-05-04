import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Athlete from 'App/Models/Athlete'

export default class AthleteSeeder extends BaseSeeder {
  public async run() {
    await Athlete.createMany([
      {
        external_id: 'external_1',
      },
      {
        external_id: 'external_2',
      },
    ])
  }
}
