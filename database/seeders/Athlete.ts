import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Athlete from 'App/Models/Athlete'

export default class AthleteSeeder extends BaseSeeder {
  public async run() {
    const users = [
      'lucia8',
      'ana8',
      'gabriela8',
      'maria8',
      'sbiach',
      'andeasd',
      'lacobra',
      'santibiach',
      'santiago8',
      'pastamante',
      'rrytyuu',
      'san8',
      'rftd',
      'tute',
      'manfre',
      'lacobrahavertz',
      'tresdosuno',
      'lacobra1',
      'axelmpm',
      'andres',
      'eladministrador',
      'elquemaneja',
      'andyministrador',
      'fiufitadmin',
      'anita88',
    ]

    await Athlete.createMany(
      users.map((username) => {
        return { external_id: username }
      })
    )
  }
}
