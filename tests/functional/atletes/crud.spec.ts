import { test } from '@japa/runner'
import Atlete from 'App/Models/Atlete'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Atletes crud', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('List empty atletes', async ({ client }) => {
    const atletes = await client.get('/api/v1/atletes')

    atletes.assertStatus(200)
    atletes.assertBodyContains([])
  })

  test('Register atlete', async ({ client }) => {
    const atleteData = {
      email: 'virk@adonisjs.com',
      password: 'secret',
    }

    const atlete = await client.post('/api/v1/atletes').form(atleteData)

    atlete.assertStatus(200)
    atlete.assertBodyContains(atleteData)
  })

  test('List atletes after seeding', async ({ client }) => {
    const atletesData = addAtletes()
    const atletes = await client.get('/api/v1/atletes')

    atletes.assertStatus(200)
    atletes.assertBodyContains(atletesData)
  })

  test('Get registered atlete', async ({ client }) => {
    const atleteData = {
      email: 'virk@adonisjs.com',
      password: 'secret',
    }

    const registeredAtlete = (await client.post('/api/v1/atletes').form(atleteData)).body()

    const atlete = await client.get('/api/v1/atletes/' + registeredAtlete.id)

    atlete.assertStatus(200)
    atlete.assertBodyContains(registeredAtlete)
  })

  test('Delete registered atlete', async ({ client }) => {
    const atleteData = {
      email: 'virk@adonisjs.com',
      password: 'secret',
    }

    const registeredAtlete = (await client.post('/api/v1/atletes').form(atleteData)).body()

    const atlete = await client.delete('/api/v1/atletes/' + registeredAtlete.id)

    atlete.assertStatus(200)
    atlete.assertTextIncludes('DELETED')
  })
})

async function addAtletes() {
  const atletesData = [
    {
      email: 'virk@adonisjs.com',
      password: 'secret',
    },
    {
      email: 'romain@adonisjs.com',
      password: 'supersecret',
    },
  ]

  await Atlete.createMany(atletesData)
  return atletesData
}
