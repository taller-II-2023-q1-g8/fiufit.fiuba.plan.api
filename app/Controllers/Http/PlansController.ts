import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan'
import { DIFFICULTY_LEVELS } from 'App/Models/Plan'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

const planSchema = schema.create({
  title: schema.string(),
  description: schema.string([rules.minLength(1)]),
  difficulty: schema.enum(DIFFICULTY_LEVELS),
  //tags: schema.enumSet(PLAN_TAGS),
  trainer: schema.string([rules.minLength(1)]),
})

export default class PlansController {
  /**
   * @index
   * @description Return array of Plans
   * @responseBody 200 - <Plan[]>
   */
  public async index({ request, response }: HttpContextContract) {
    try {
      const plans = await Plan.query().where(request.all())
      response.status(200)
      response.send(plans)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @store
   * @description Create Plan
   * @responseBody 200 - <Plan>
   * @responseBody 400 - Plan could not be created
   * @requestBody <Plan>
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: planSchema })
      const plan = await Plan.createPlan(
        {
          title: payload.title,
          description: payload.description,
          difficulty: payload.difficulty,
          //tags: payload.//tags,
        },
        payload.trainer
      )
      response.status(200)
      //response.send(await plan.load('trainer'))
      response.send(plan)
    } catch (error) {
      //console.log(error)
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @description Return Plan
   * @responseBody 200 - <Plan>
   * @responseBody 404 - Plan could not be found
   */
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

  /**
   * @show
   * @description Delete Plan
   * @responseBody 200 - DELETED
   * @responseBody 404 - Plan could not be deleted
   */
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
