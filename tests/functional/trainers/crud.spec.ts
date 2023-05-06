import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { crudTests } from 'App/Utils/crudTests'
import Trainer from 'App/Models/Trainer'
const name = 'trainer'

test.group(`${name} tests`, (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  const model = Trainer
  const prefix = '/api/v1'
  const route = `${prefix}/${name}s`
  const imposibleId = '1000'

  const correctSampleDataCases = [
    {
      external_id: '1',
    },
    {
      external_id: '2',
    },
  ]

  const wrongSampleDataCases = [{}]

  async function seed() {
    await model.createMany(correctSampleDataCases)
    return correctSampleDataCases
  }

  crudTests(test, route, seed, wrongSampleDataCases, correctSampleDataCases, imposibleId)
})
