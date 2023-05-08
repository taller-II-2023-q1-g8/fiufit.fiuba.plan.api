import { test } from '@japa/runner'

test('Root', async ({ client }) => {
  const health = await client.get('/')

  health.assertStatus(200)
})
