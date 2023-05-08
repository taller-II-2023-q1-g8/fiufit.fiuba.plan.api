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

  const prefix = '/api/v1'
  const route = `${prefix}/${name}s`
  const imposibleId = '1000'

  const correctSampleDataCases = [
    {
      title: 'title1',
      description: 'description1',
      difficulty: DIFFICULTY_LEVELS[0],
      //tags: [PLAN_TAGS[1], PLAN_TAGS[2]],
      trainer: '1',
    },
    {
      title: 'title2',
      description: 'description2',
      difficulty: DIFFICULTY_LEVELS[1],
      //tags: PLAN_TAGS,
      trainer: '1',
    },
    {
      title: 'title3',
      description: 'description3',
      difficulty: DIFFICULTY_LEVELS[2],
      //tags: [PLAN_TAGS[2]],
      trainer: '2',
    },
    {
      title: 'title3',
      description: 'description3',
      difficulty: DIFFICULTY_LEVELS[0],
      //tags: [PLAN_TAGS[0]],
      trainer: '3',
    },
  ]

  const wrongSampleDataCases = [
    {
      title: 'title0',
      trainer: '1',
    },
    {
      title: 'title1',
      difficulty: DIFFICULTY_LEVELS[0],
      trainer: 1,
    },
    {
      title: 'title1',
      description: 'description1',
      difficulty: 'kinda hard',
      trainer: 2,
    },
    {
      title: 'title1',
      description: 'description1',
      difficulty: DIFFICULTY_LEVELS[0],
    },
  ]

  async function seed() {
    await correctSampleDataCases.forEach(async (correctSampleData) => {
      let { trainer, ...rest } = correctSampleData
      await Plan.createPlan(rest, correctSampleData.trainer)
    })
    return correctSampleDataCases
  }

  crudTests(test, route, seed, wrongSampleDataCases, correctSampleDataCases, imposibleId)

  test('[GET] by difficulty, non matching, empty', async ({ client }) => {
    const query = {
      difficulty: DIFFICULTY_LEVELS[0],
    }
    const response = await client.get(route).form(query)

    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('[GET] by difficulty, non matching, pre seeded', async ({ client }) => {
    await seed()

    const query = {
      difficulty: DIFFICULTY_LEVELS[0],
    }
    const response = await client.get(route).form(query)

    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('[GET] by difficulty, matching, pre seeded', async ({ assert, client }) => {
    await seed()

    const query = {
      difficulty: DIFFICULTY_LEVELS[0],
    }
    const correctResponse = [correctSampleDataCases[0], correctSampleDataCases[3]]

    const response = await client.get(route).qs(query)

    response.assertStatus(200)
    assert.lengthOf(response.body(), correctResponse.length)
    response.assertBodyContains(correctResponse)
  })

  test('[GET] by title, non matching, empty', async ({ client }) => {
    const query = {
      title: 'title non existing',
    }
    const response = await client.get(route).form(query)

    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('[GET] by title, non matching, pre seeded', async ({ client }) => {
    await seed()

    const query = {
      title: 'title non existing',
    }
    const response = await client.get(route).form(query)

    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('[GET] by title, matching, pre seeded', async ({ assert, client }) => {
    await seed()

    const query = {
      title: correctSampleDataCases[2].title,
    }
    const correctResponse = [correctSampleDataCases[2], correctSampleDataCases[3]]

    const response = await client.get(route).qs(query)

    response.assertStatus(200)
    assert.lengthOf(response.body(), correctResponse.length)
    response.assertBodyContains(correctResponse)
  })
})
