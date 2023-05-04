import { test } from '@japa/runner'
import Exercise from 'App/Models/Exercise'
import Database from '@ioc:Adonis/Lucid/Database'
import { crudTests, crudTestsWithWrongFormat } from 'App/Utils/crudTests'

test.group('Exercises crud', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  const prefix = '/api/v1'
  const route = `${prefix}/exercises`
  const imposibleId = '1000'

  const sampleData = {
    title: 'title0',
    reps: 2,
    weight: 3
  }

  async function seed() {
    const data = [
      {
        title: 'title1',
        reps: 1,
        weight: 1
      },
      {
        title: 'title2',
        reps: 2,
        weight: 3
      },
      {
        title: 'title3',
        reps: 1,
        weight: 2
      },
    ]
  
    await Exercise.createMany(data)
    return data
  }

  const wrongSampleData1 = {
    reps: 2,
    weight: 3
  }

  const wrongSampleData2 = {
    title: 'title0',
    reps: -1,
    weight: 3
  }

  const wrongSampleData3 = {
    title: 'title0',
    reps: 2,
    weight: -3
  }

  crudTests(test, route, sampleData, seed, imposibleId)
  crudTestsWithWrongFormat(test, route, wrongSampleData1)
  crudTestsWithWrongFormat(test, route, wrongSampleData2)
  crudTestsWithWrongFormat(test, route, wrongSampleData3)
})