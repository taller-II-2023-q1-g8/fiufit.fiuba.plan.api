import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Athlete from 'App/Models/Athlete'

export default class AthleteSeeder extends BaseSeeder {
  public async run() {
    await Athlete.createMany([
      {
        external_id: '1',
      },
      {
        external_id: '2',
      },
      {
        external_id: '3',
      },
      {
        external_id: '4',
      },
      {
        external_id: '5',
      },
      {
        external_id: '6',
      },
    ])
  }
}
