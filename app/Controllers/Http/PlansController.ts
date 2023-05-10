import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan'
import { DIFFICULTY_LEVELS } from 'App/Models/Plan'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Exercise from 'App/Models/Exercise'
import Trainer from 'App/Models/Trainer'
import Athlete from 'App/Models/Athlete'

const createPlanSchema = schema.create({
  title: schema.string(),
  description: schema.string([rules.minLength(1)]),
  difficulty: schema.enum(DIFFICULTY_LEVELS),
  //tags: schema.enumSet(PLAN_TAGS),
  trainer_id: schema.string([rules.minLength(1)]),
})

const updatePlanSchema = schema.create({
  title: schema.string(),
  description: schema.string([rules.minLength(1)]),
  difficulty: schema.enum(DIFFICULTY_LEVELS),
  //tags: schema.enumSet(PLAN_TAGS),
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
   * @responseBody 200 - <Plan>.with(trainer)
   * @responseBody 400 - Plan could not be created
   * @requestBody <Plan>.only(title, description,difficulty).append("trainer_id":"A123")
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: createPlanSchema })
      const trainer = await Trainer.firstOrCreate({ external_id: payload.trainer_id })
      const plan = await Plan.create({
        title: payload.title,
        description: payload.description,
        difficulty: payload.difficulty,
      })
      await plan.related('trainer').associate(trainer)

      await plan.load((loader) => {
        loader.load('trainer')
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

  /**
   * @show
   * @description Return Plan
   * @responseBody 200 - <Plan>.with(exercises,trainer,athletes)
   * @responseBody 404 - Plan could not be found
   */
  public async show({ request, response }: HttpContextContract) {
    try {
      const plan = await Plan.findOrFail(request.param('id'))

      await plan.load((loader) => {
        loader.load('exercises').load('trainer').load('athletes')
      })

      response.status(200)
      response.send(plan)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @update
   * @description Upadate Plan
   * @responseBody 200 - <Plan>
   * @responseBody 404 - Plan could not be found
   * @requestBody <Plan>.only(title, description,difficulty)
   */
  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: updatePlanSchema })
      const plan = await Plan.findOrFail(request.param('id'))
      await plan.merge({
        title: payload.title,
        description: payload.description,
        difficulty: payload.difficulty,
      })
      await plan.save()

      await plan.load((loader) => {
        loader.load('exercises').load('trainer').load('athletes')
      })

      response.status(200)
      response.send(plan)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

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

  /**
   * @AddExercise
   * @description Add exercise to Plan
   * @responseBody 200 - <Plan>.with(exercises)
   * @responseBody 400 - Exercise could not be added to Plan
   */
  public async addExercise({ request, response }: HttpContextContract) {
    try {
      const plan = await Plan.findOrFail(request.param('id'))
      const exercise = await Exercise.findOrFail(request.param('exercise_id'))
      await plan.related('exercises').sync([exercise.id], false)

      await plan.load((loader) => {
        loader.load('exercises')
      })

      response.status(200)
      response.send(plan)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @RemoveExercise
   * @description Remove exercise to Plan
   * @responseBody 200 - <Plan>.with(exercises)
   * @responseBody 400 - Exercise could not be removed from Plan
   */
  public async removeExercise({ request, response }: HttpContextContract) {
    try {
      const plan = await Plan.findOrFail(request.param('id'))
      const exercise = await Exercise.findOrFail(request.param('exercise_id'))
      await plan.related('exercises').detach([exercise.id])

      await plan.load((loader) => {
        loader.load('exercises')
      })

      response.status(200)
      response.send(plan)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @AddAthlete
   * @description Add athlete to Plan
   * @responseBody 200 - <Plan>.with(athletes)
   * @responseBody 400 - Athlete could not be added to Plan
   */
  public async addAthlete({ request, response }: HttpContextContract) {
    try {
      const plan = await Plan.findOrFail(request.param('id'))
      const athlete = await Athlete.findOrFail(request.param('athlete_id'))
      await plan.related('athletes').sync([athlete.id], false)

      await plan.load((loader) => {
        loader.load('athletes')
      })

      response.status(200)
      response.send(plan)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @RemoveAthlete
   * @description Remove athlete to Plan
   * @responseBody 200 - <Plan>.with(athletes)
   * @responseBody 400 - Athlete could not be removed from Plan
   */
  public async removeAthlete({ request, response }: HttpContextContract) {
    try {
      const plan = await Plan.findOrFail(request.param('id'))
      const athlete = await Athlete.findOrFail(request.param('athlete_id'))
      await plan.related('athletes').detach([athlete.id])

      await plan.load((loader) => {
        loader.load('athletes')
      })

      response.status(200)
      response.send(plan)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }
}
