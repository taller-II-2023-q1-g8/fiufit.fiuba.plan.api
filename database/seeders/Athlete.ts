import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Athlete from 'App/Models/Athlete'

export default class AthleteSeeder extends BaseSeeder {
  public async run() {
    await Athlete.createMany([
      {
        email: 'virk@adonisjs.com',
        password: 'secret',
      },
      {
        email: 'romain@adonisjs.com',
        password: 'supersecret',
      },
    ])
  }
}
