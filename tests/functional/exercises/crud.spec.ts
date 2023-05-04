import { test } from '@japa/runner'
import Exercise from 'App/Models/Exercise'
import Database from '@ioc:Adonis/Lucid/Database'
import { crud_tests } from 'App/Utils/crud_tests'

test.group('Athletes crud', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  const prefix = '/api/v1'
  const route = `${prefix}/exercises`
  const imposibleId = '1000'

  const sampleData = {name: 'name0'}

  async function seed() {
    const data = [
      {name: 'name1'},
      {name: 'name2'},
      {name: 'name3'},
    ]
  
    await Exercise.createMany(data)
    return data
  }

  crud_tests(test, route, sampleData, seed, imposibleId)
})