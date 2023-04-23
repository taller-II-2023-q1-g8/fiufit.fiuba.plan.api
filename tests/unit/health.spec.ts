import { test } from '@japa/runner'

test('Health', async ({ client }) => {
  const health = await client.get('/')

  health.assertStatus(200)
})
