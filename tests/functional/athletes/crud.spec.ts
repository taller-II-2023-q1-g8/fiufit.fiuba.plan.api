import { test } from '@japa/runner'
import Athlete from 'App/Models/Athlete'
import Database from '@ioc:Adonis/Lucid/Database'
import { crudTests, crudTestsWithWrongFormat } from 'App/Utils/crudTests'

test.group('Athletes crud', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  const prefix = '/api/v1'
  const route = `${prefix}/athletes`
  const imposibleId = '1000'

  const sampleData = {external_id: '0'}

  async function seed() {
    const data = [
      {external_id: '1'},
      {external_id: '2'},
      {external_id: '3'},
    ]
  
    await Athlete.createMany(data)
    return data
  }

  const wrongSampleData = {}

  crudTests(test, route, sampleData, seed, imposibleId)
  crudTestsWithWrongFormat(test, route, wrongSampleData)
})