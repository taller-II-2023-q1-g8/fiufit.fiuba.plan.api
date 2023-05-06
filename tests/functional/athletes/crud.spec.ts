import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { crudTests } from 'App/Utils/crudTests'
import Athlete from 'App/Models/Athlete'
const name = 'athlete'

test.group(`${name} tests`, (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  const model = Athlete
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

  crudTests(test, model, route, wrongSampleDataCases, correctSampleDataCases, imposibleId)
})
