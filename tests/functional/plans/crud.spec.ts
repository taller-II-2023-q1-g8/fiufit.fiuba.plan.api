import { test } from '@japa/runner'
import Plan from 'App/Models/Plan'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Plans crud', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('List empty plans', async ({ client }) => {
    const plans = await client.get('/api/v1/plans')

    plans.assertStatus(200)
    plans.assertBodyContains([])
  })

  test('Register plan', async ({ client }) => {
    const planData = {
      title: '1',
    }

    const planRes = await client.post('/api/v1/plans').form(planData)

    planRes.assertStatus(200)
    planRes.assertBodyContains(planData)
  })

  test('Register plan with exercise', async ({ client }) => {
    const planData = {
      title: '1',
    }
    const planRes = await client.post('/api/v1/plans').form(planData)
    const plan = await Plan.findOrFail(planRes.body().id)
    await plan.related('exercises').create({ name: 'exercise 1' })
    planRes.assertStatus(200)
    planRes.assertBodyContains(planData)
  })

  test('Register plan fails', async ({ client }) => {
    const planData = {
      title123: '1',
    }

    const planRes = await client.post('/api/v1/plans').form(planData)

    planRes.assertStatus(400)
  })

  test('List plans after seeding', async ({ client }) => {
    const plansData = addPlans()
    const plans = await client.get('/api/v1/plans')

    plans.assertStatus(200)
    plans.assertBodyContains(plansData)
  })

  test('Get registered plan', async ({ client }) => {
    const planData = {
      title: '1',
    }

    const registeredPlan = (await client.post('/api/v1/plans').form(planData)).body()

    const planRes = await client.get('/api/v1/plans/' + registeredPlan.id)

    planRes.assertStatus(200)
    planRes.assertBodyContains(registeredPlan)
  })

  test('Delete registered plan', async ({ client }) => {
    const planData = {
      title: '1',
    }

    const registeredPlan = (await client.post('/api/v1/plans').form(planData)).body()

    const planRes = await client.delete('/api/v1/plans/' + registeredPlan.id)

    planRes.assertStatus(200)
    planRes.assertTextIncludes('DELETED')
  })
})

async function addPlans() {
  const plansData = [
    {
      title: '1',
    },
    {
      title: '2',
    },
  ]

  await Plan.createMany(plansData)
  return plansData
}
