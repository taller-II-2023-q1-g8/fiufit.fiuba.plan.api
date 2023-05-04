import { test } from '@japa/runner'
import Plan, { PLAN_TAGS } from 'App/Models/Plan'
import Database from '@ioc:Adonis/Lucid/Database'
import { crudTests, crudTestsWithWrongFormat } from 'App/Utils/crudTests'
import { DIFFICULTY_LEVELS } from 'App/Models/Plan'

test.group('Plans crud', (group) => {
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
    difficulty: DIFFICULTY_LEVELS[0],
  }

  async function seed() {
    const data = [
      {
        title: 'title1',
        description: 'description1',
        difficulty: DIFFICULTY_LEVELS[0],
      },
      {
        title: 'title2',
        description: 'description2',
        difficulty: DIFFICULTY_LEVELS[1],
      },
      {
        title: 'title3',
        description: 'description3',
        difficulty: DIFFICULTY_LEVELS[2],
      },
    ]
  
    await Plan.createMany(data)
    return data
  }

  const wrongSampleData1 = {
    title: 'title0',
  }

  const wrongSampleData2 = {
    title: 'title1',
    description: 'description1',
    difficulty: 'kinda hard',
  }

  const wrongSampleData3 = {
    title: 'title1',
    description: 'description1',
    difficulty: DIFFICULTY_LEVELS[0],
    tags: [PLAN_TAGS[0]]
  }

  crudTests(test, route, sampleData, seed, imposibleId)
  crudTestsWithWrongFormat(test, route, wrongSampleData1)
  crudTestsWithWrongFormat(test, route, wrongSampleData2)
  crudTestsWithWrongFormat(test, route, wrongSampleData3)
})