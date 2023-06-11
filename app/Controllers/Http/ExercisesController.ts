import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exercise from 'App/Models/Exercise'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

const exerciseSchema = schema.create({
  title: schema.string([rules.minLength(1)]),
  muscles: schema.string(),
})

export default class ExercisesController {
  /**
   * @index
   * @description Return array of Exercises
   * @responseBody 200 - <Exercise[]>
   */
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

  /**
   * @store
   * @description Create Exercise
   * @responseBody 200 - <Exercise>
   * @responseBody 400 - Exercise could not be created
   * @requestBody {"title": "lorem", "muscles": "ARMS"}
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: exerciseSchema })
      const exercise = await Exercise.create({
        title: payload.title,
        muscles: payload.muscles,
      })
      response.status(200)
      response.send(exercise)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @description Return Exercise
   * @responseBody 200 - <Exercise>
   * @responseBody 404 - Exercise could not be found
   */
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

  /**
   * @update
   * @description Upadate Exercise
   * @responseBody 200 - <Exercise>
   * @responseBody 404 - Exercise could not be found
   * @requestBody <Exercise>.only(title, muscle)
   */
  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: exerciseSchema })
      const exercise = await Exercise.findOrFail(request.param('id'))
      await exercise.merge({
        title: payload.title,
        muscles: payload.muscles,
      })
      await exercise.save()
      response.status(200)
      response.send(exercise)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @description Delete Exercise
   * @responseBody 200 - DELETED
   * @responseBody 404 - Exercise could not be deleted
   */
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
