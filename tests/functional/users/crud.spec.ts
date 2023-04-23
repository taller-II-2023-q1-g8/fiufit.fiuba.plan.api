import { test } from '@japa/runner'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Users crud', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('List empty users', async ({ client }) => {
    const users = await client.get('/api/v1/users')

    users.assertStatus(200)
    users.assertBodyContains([])
  })

  test('Register user', async ({ client }) => {
    const userData = {
      email: 'virk@adonisjs.com',
      password: 'secret',
    }

    const user = await client.post('/api/v1/users').form(userData)

    user.assertStatus(200)
    user.assertBodyContains(userData)
  })

  test('List users after seeding', async ({ client }) => {
    const usersData = addUsers()
    const users = await client.get('/api/v1/users')

    users.assertStatus(200)
    users.assertBodyContains(usersData)
  })

  test('Get registered user', async ({ client }) => {
    const userData = {
      email: 'virk@adonisjs.com',
      password: 'secret',
    }

    const registeredUser = (await client.post('/api/v1/users').form(userData)).body()

    const user = await client.get('/api/v1/users/' + registeredUser.id)

    user.assertStatus(200)
    user.assertBodyContains(registeredUser)
  })

  test('Delete registered user', async ({ client }) => {
    const userData = {
      email: 'virk@adonisjs.com',
      password: 'secret',
    }

    const registeredUser = (await client.post('/api/v1/users').form(userData)).body()

    const user = await client.delete('/api/v1/users/' + registeredUser.id)

    user.assertStatus(200)
    user.assertTextIncludes('DELETED')
  })
})

async function addUsers() {
  const usersData = [
    {
      email: 'virk@adonisjs.com',
      password: 'secret',
    },
    {
      email: 'romain@adonisjs.com',
      password: 'supersecret',
    },
  ]

  await User.createMany(usersData)
  return usersData
}
