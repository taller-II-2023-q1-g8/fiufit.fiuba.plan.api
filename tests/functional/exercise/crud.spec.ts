import { test } from '@japa/runner'
import Exercise from 'App/Models/Exercise'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Exercises crud', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('List empty exercises', async ({ client }) => {
    const exercises = await client.get('/api/v1/exercises')

    exercises.assertStatus(200)
    exercises.assertBodyContains([])
  })

  test('Register exercise', async ({ client }) => {
    const exerciseData = {
      name: '1',
    }

    const exercise = await client.post('/api/v1/exercises').form(exerciseData)

    exercise.assertStatus(200)
    exercise.assertBodyContains(exerciseData)
  })

  test('Register exercise fails', async ({ client }) => {
    const exerciseData = {
      title123: '1',
    }

    const exercise = await client.post('/api/v1/exercises').form(exerciseData)

    exercise.assertStatus(400)
  })

  test('List exercises after seeding', async ({ client }) => {
    const exercisesData = addExercises()
    const exercises = await client.get('/api/v1/exercises')

    exercises.assertStatus(200)
    exercises.assertBodyContains(exercisesData)
  })

  test('Get registered exercise', async ({ client }) => {
    const exerciseData = {
      name: '1',
    }

    const registeredExercise = (await client.post('/api/v1/exercises').form(exerciseData)).body()

    const exercise = await client.get('/api/v1/exercises/' + registeredExercise.id)

    exercise.assertStatus(200)
    exercise.assertBodyContains(registeredExercise)
  })

  test('Delete registered exercise', async ({ client }) => {
    const exerciseData = {
      name: '1',
    }

    const registeredExercise = (await client.post('/api/v1/exercises').form(exerciseData)).body()

    const exercise = await client.delete('/api/v1/exercises/' + registeredExercise.id)

    exercise.assertStatus(200)
    exercise.assertTextIncludes('DELETED')
  })
})

async function addExercises() {
  const exercisesData = [
    {
      name: '1',
    },
    {
      name: '2',
    },
  ]

  await Exercise.createMany(exercisesData)
  return exercisesData
}
