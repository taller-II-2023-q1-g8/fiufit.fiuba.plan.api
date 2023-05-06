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
      reps: 2,
      weight: 3,
    },
    {
      title: 'title2',
      reps: 10,
      weight: 3,
    },
  ]

  const wrongSampleDataCases = [
    {
      title: '',
      reps: 2,
      weight: 3,
    },
    {
      title: 'title2',
      reps: -10,
      weight: 3,
    },
    {
      title: 'title2',
      reps: 10,
      weight: -3,
    },
    {
      title: 'title2',
      reps: 10,
      weight: 0,
    },
    {
      title: 'title2',
      reps: 0,
      weight: 3,
    },
    {
      title: 'title2',
      reps: 0,
    },
    {
      title: 'title2',
      weight: 3,
    },
    {
      reps: 0,
      weight: 3,
    },
  ]

  async function seed() {
    await model.createMany(correctSampleDataCases)
    return correctSampleDataCases
  }

  crudTests(test, route, seed, wrongSampleDataCases, correctSampleDataCases, imposibleId)
})
