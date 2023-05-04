import { test } from '@japa/runner'
import Plan from 'App/Models/Plan'
import Database from '@ioc:Adonis/Lucid/Database'
import { crudTests, crudTestsWithWrongFormat } from 'App/Utils/crudTests'

test.group('Athletes crud', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  const prefix = '/api/v1'
  const route = `${prefix}/plans`
  const imposibleId = '1000'

  const sampleData = {
    title: 'title0',
    description: 'description0',
    difficulty: 'NORMAL',
  }

  const wrongSampleData1 = {
    title: 'title0',
  }

  const wrongSampleData2 = {
    title: 'title1',
    description: 'description1',
    difficulty: 'none',
  }

  async function seed() {
    const data = [
      {
        title: 'title1',
        description: 'description1',
        difficulty: 'EASY',
      },
      {
        title: 'title2',
        description: 'description2',
        difficulty: 'NORMAL',
      },
      {
        title: 'title3',
        description: 'description3',
        difficulty: 'HARD',
      },
    ]
  
    await Plan.createMany(data)
    return data
  }

  crudTests(test, route, sampleData, seed, imposibleId)
  crudTestsWithWrongFormat(test, route, wrongSampleData1)
  crudTestsWithWrongFormat(test, route, wrongSampleData2)
})