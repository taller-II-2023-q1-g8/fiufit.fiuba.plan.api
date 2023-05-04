import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class PlansController {
  public async index({ response }: HttpContextContract) {
    try {
      const plans = await Plan.all()
      response.status(200)
      response.send(plans)
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
      description: schema.string(),
      difficulty: schema.enum(['EASY', 'NORMAL', 'HARD'] as const),
    })

    try {
      const payload = await request.validate({ schema: newExerciseSchema })
      const plan = await Plan.create({
        title: payload.title,
        description: payload.description,
        difficulty: payload.difficulty,
      })
      response.status(200)
      response.send(plan)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const plan = await Plan.findOrFail(request.param('id'))
      response.status(200)
      response.send(plan)
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
      const plan = await Plan.findOrFail(request.param('id'))
      await plan.delete()
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
