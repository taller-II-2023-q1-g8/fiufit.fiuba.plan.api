import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exercise from 'App/Models/Exercise'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ExercisesController {
  public async index({ response }: HttpContextContract) {
    try {
      const exercises = await Exercise.all()
      response.status(200)
      response.send(exercises)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const newExerciseSchema = schema.create({
      title: schema.string(),
      reps: schema.number([rules.unsigned()]),
      weight: schema.number([rules.unsigned()]),
    })

    try {
      const payload = await request.validate({ schema: newExerciseSchema })
      const exercise = await Exercise.create({
        title: payload.title,
        reps: payload.reps,
        weight: payload.weight,
      })
      response.status(200)
      response.send(exercise)
    } catch (error) {
      console.log(error)
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const exercise = await Exercise.findOrFail(request.param('id'))
      response.status(200)
      response.send(exercise)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  public async update({}: HttpContextContract) {} // ???

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const exercise = await Exercise.findOrFail(request.param('id'))
      await exercise.delete()
      response.status(200)
      response.send('DELETED')
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }
}
