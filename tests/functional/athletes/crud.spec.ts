import { test } from '@japa/runner'
import Athlete from 'App/Models/Athlete'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Athletes crud', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  const prefix = '/api/v1'
  const route = `${prefix}/athletes`

  const sampleAthleteData = {}

  test('[GET ALL] empty database', async ({ client }) => {
    const response = await client.get('/api/v1/athletes')

    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('[GET ALL] after seeding', async ({ client }) => {
    const athletesData = addAthletes()
    const response = await client.get(route)

    response.assertStatus(200)
    response.assertBodyContains(athletesData)
  })

  test('[POST]', async ({ client }) => {

    const response = (await client.post(route).form(sampleAthleteData))

    response.assertStatus(200)
    response.assertBodyContains(sampleAthleteData)
  })

  test('[GET] non existent', async ({ client }) => {

    const response = await client.get(route + '10000')

    response.assertStatus(404)
  })

  test('[POST -> GET]', async ({ client }) => {

    const registeredAthlete = (await client.post(route).form(sampleAthleteData)).body()
    const response = await client.get(route + `/${registeredAthlete.id}`)

    response.assertStatus(200)
    response.assertBodyContains(registeredAthlete)
  })

  test('[DELETE] non existent', async ({ client }) => {

    const response = await client.delete(route + '10000')

    response.assertStatus(404)
  })

  test('[POST -> DELETE]', async ({ client }) => {

    const registeredAthlete = (await client.post(route).form(sampleAthleteData)).body()
    const response = await client.delete(route + `/${registeredAthlete.id}`)

    response.assertStatus(200)
    response.assertTextIncludes('DELETED')
  })
})

async function addAthletes() {
  const athletesData = [
    {},
    {},
  ]

  await Athlete.createMany(athletesData)
  return athletesData
}
