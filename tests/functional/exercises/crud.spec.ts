import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { crudTests } from 'App/Utils/crudTests'
import Exercise from 'App/Models/Exercise'
const name = 'exercise'

test.group(`${name} tests`, (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  const model = Exercise
  const prefix = '/api/v1'
  const route = `${prefix}/${name}s`
  const imposibleId = '1000'

  const correctSampleDataCases = [
    {
      title: 'title1',
      muscles: 'ARMS, CHEST',
    },
    {
      title: 'title2',
      muscles: 'LEGS',
    },
  ]

  const wrongSampleDataCases = [
    {
      title: '',
      muscles: '',
    },
    {
      title: '',
      muscles: 'LEGS',
    },
    {
      title: 'title2',
      muscles: '',
    },
    {
      title: 'title2',
    },
    {
      muscles: 'CHEST',
    },
  ]

  async function seed() {
    await model.createMany(correctSampleDataCases)
    return correctSampleDataCases
  }

  crudTests(test, route, seed, wrongSampleDataCases, correctSampleDataCases, imposibleId)
})
