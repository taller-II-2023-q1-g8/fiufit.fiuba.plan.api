import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { crudTests } from 'App/Utils/crudTests'
import { DIFFICULTY_LEVELS } from 'App/Models/Plan'
import Plan from 'App/Models/Plan'
const name = 'plan'

test.group(`${name} tests`, (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  const model = Plan
  const prefix = '/api/v1'
  const route = `${prefix}/${name}s`
  const imposibleId = '1000'

  const correctSampleDataCases = [
    {
      title: 'title1',
      description: 'description1',
      difficulty: DIFFICULTY_LEVELS[0],
      //tags: [PLAN_TAGS[1], PLAN_TAGS[2]],
    },
    {
      title: 'title2',
      description: 'description2',
      difficulty: DIFFICULTY_LEVELS[1],
      //tags: PLAN_TAGS,
    },
    {
      title: 'title3',
      description: 'description3',
      difficulty: DIFFICULTY_LEVELS[2],
      //tags: [PLAN_TAGS[2]],
    },
    {
      title: 'title3',
      description: 'description3',
      difficulty: DIFFICULTY_LEVELS[2],
      //tags: [PLAN_TAGS[0]],
    },
  ]

  const wrongSampleDataCases = [
    {
      title: 'title0',
    },
    {
      title: 'title1',
      description: 'description1',
      difficulty: 'kinda hard',
    },
  ]

  crudTests(test, model, route, wrongSampleDataCases, correctSampleDataCases, imposibleId)
})
