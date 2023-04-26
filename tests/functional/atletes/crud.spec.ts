import { test } from '@japa/runner'
import Athlete from 'App/Models/Athlete'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Athletes crud', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('List empty athletes', async ({ client }) => {
    const athletes = await client.get('/api/v1/athletes')

    athletes.assertStatus(200)
    athletes.assertBodyContains([])
  })

  test('Register athlete', async ({ client }) => {
    const athleteData = {
      email: 'virk@adonisjs.com',
      password: 'secret',
    }

    const athlete = await client.post('/api/v1/athletes').form(athleteData)

    athlete.assertStatus(200)
    athlete.assertBodyContains(athleteData)
  })

  test('List athletes after seeding', async ({ client }) => {
    const athletesData = addAthletes()
    const athletes = await client.get('/api/v1/athletes')

    athletes.assertStatus(200)
    athletes.assertBodyContains(athletesData)
  })

  test('Get registered athlete', async ({ client }) => {
    const athleteData = {
      email: 'virk@adonisjs.com',
      password: 'secret',
    }

    const registeredAthlete = (await client.post('/api/v1/athletes').form(athleteData)).body()

    const athlete = await client.get('/api/v1/athletes/' + registeredAthlete.id)

    athlete.assertStatus(200)
    athlete.assertBodyContains(registeredAthlete)
  })

  test('Delete registered athlete', async ({ client }) => {
    const athleteData = {
      email: 'virk@adonisjs.com',
      password: 'secret',
    }

    const registeredAthlete = (await client.post('/api/v1/athletes').form(athleteData)).body()

    const athlete = await client.delete('/api/v1/athletes/' + registeredAthlete.id)

    athlete.assertStatus(200)
    athlete.assertTextIncludes('DELETED')
  })
})

async function addAthletes() {
  const athletesData = [
    {
      email: 'virk@adonisjs.com',
      password: 'secret',
    },
    {
      email: 'romain@adonisjs.com',
      password: 'supersecret',
    },
  ]

  await Athlete.createMany(athletesData)
  return athletesData
}
