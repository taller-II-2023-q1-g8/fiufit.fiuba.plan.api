import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Trainer from 'App/Models/Trainer'

export default class TrainerSeeder extends BaseSeeder {
  public async run() {
    await Trainer.createMany([
      {
        external_id: 'axelmpm',
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
