import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan'
import { DIFFICULTY_LEVELS } from 'App/Models/Plan'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Exercise from 'App/Models/Exercise'
import Athlete from 'App/Models/Athlete'
import Database from '@ioc:Adonis/Lucid/Database'

const createPlanSchema = schema.create({
  title: schema.string(),
  description: schema.string([rules.minLength(1)]),
  difficulty: schema.enum(DIFFICULTY_LEVELS),
  tags: schema.string(),
  trainer_id: schema.string([rules.minLength(1)]),
})

const updatePlanSchema = schema.create({
  title: schema.string(),
  description: schema.string([rules.minLength(1)]),
  difficulty: schema.enum(DIFFICULTY_LEVELS),
  tags: schema.string(),
})

export default class PlansController {
  /**
   * @index
   * @description Return array of Plans
   * @responseBody 200 - <Plan[]>
   */
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

  /**
   * @store
   * @description Create Plan
   * @responseBody 200 - <Plan>.with(trainer)
   * @responseBody 400 - Plan could not be created
   * @requestBody <Plan>.only(title,description,difficulty,tags).append("trainer_id":"A123")
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: createPlanSchema })
      const plan = await Plan.createWithTrain(payload)

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
   * @requestBody <Plan>.only(title,description,difficulty,tags)
   */
  public async update({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: updatePlanSchema })
      const plan = await Plan.findOrFail(request.param('id'))
      await plan.merge({
        title: payload.title,
        description: payload.description,
        difficulty: payload.difficulty,
        tags: payload.tags,
      })
      await plan.save()
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

  /**
   * @addLike
   * @description Like Plan favorited by Athlete
   * @responseBody 200 - Registered like
   * @responseBody 400 - Like could not be added to favorited by Athlete Plan
   */
  public async addLike({ request, response }: HttpContextContract) {
    try {
      const plan = await Plan.findOrFail(request.param('id'))
      const athlete = await Athlete.findOrFail(request.param('athlete_id'))

      await plan.related('athletes').sync(
        {
          [athlete.id]: {
            is_liked: true,
          },
        },
        false
      )

      response.status(200)
      response.send('Registered like')
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @addCompleted
   * @description Register completion of Plan favorited by Athlete
   * @responseBody 200 - Registered completion
   * @responseBody 400 - Completion could not be added to favorited by Athlete Plan
   */
  public async addCompleted({ request, response }: HttpContextContract) {
    try {
      const plan = await Plan.findOrFail(request.param('id'))
      const athlete = await Athlete.findOrFail(request.param('athlete_id'))

      await plan.related('athletes').sync(
        {
          [athlete.id]: {
            is_completed: true,
          },
        },
        false
      )

      response.status(200)
      response.send('Registered completion')
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @addCalification
   * @description Register calification of Plan favorited by Athlete
   * @responseBody 200 - Registered calification
   * @responseBody 400 - Calification could not be added to favorited by Athlete Plan
   * @requestBody {"calification": "nice plan", "calification_score": 5}
   */
  public async addCalification({ request, response }: HttpContextContract) {
    try {
      const plan = await Plan.findOrFail(request.param('id'))
      const athlete = await Athlete.findOrFail(request.param('athlete_id'))

      await plan.related('athletes').sync(
        {
          [athlete.id]: {
            calification: request.input('calification'),
            calification_score: request.input('calification_score'),
          },
        },
        false
      )

      response.status(200)
      response.send('Registered calification')
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @getCalifications
   * @description Get all calification of Plan
   * @responseBody 200 - califications
   * @responseBody 400 - could not be retrieved
   */
  public async getCalifications({ request, response }: HttpContextContract) {
    try {
      const inputs = {
        id: request.param('id'),
      }

      const califications = await Database.from('plans')
        .if(inputs.id, (query) => {
          query
            .join('athlete_plan', 'plans.id', '=', 'athlete_plan.plan_id')
            .where('athlete_plan.plan_id', '=', inputs.id)
        })
        .select('athlete_plan.calification', 'athlete_plan.calification_score')

      response.status(200)
      response.send(califications)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @getLikes
   * @description Get likes amount of Plan
   * @responseBody 200 - likes amount
   * @responseBody 400 - could not be retrieved
   */
  public async getLikes({ request, response }: HttpContextContract) {
    try {
      const inputs = {
        id: request.param('id'),
      }

      const likesAmount = await Database.from('plans')
        .if(inputs.id, (query) => {
          query
            .join('athlete_plan', 'plans.id', '=', 'athlete_plan.plan_id')
            .where('athlete_plan.plan_id', '=', inputs.id)
            .where('athlete_plan.is_liked', '=', true)
        })
        .count('*')

      response.status(200)
      response.send(likesAmount)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @search
   * @description Get Plan by query
   * @responseBody 200 - <Plan[]>
   * @responseBody 400 - Query error
   * @requestBody <Plan>.only(title,description,difficulty,tags).append("trainer_id": "1", "athlete_id":"1", "is_liked":"false", "is_completed":"false")
   */
  public async search({ request, response }: HttpContextContract) {
    try {
      const inputs = {
        title: request.input('title') ?? null,
        difficulty: request.input('difficulty') ?? null,
        tags: request.input('tags') ?? null,
        athlete_id: request.input('athlete_id') ?? null,
        trainer_id: request.input('trainer_id') ?? null,
        is_liked: request.input('is_liked') ?? null,
        is_completed: request.input('is_completed') ?? null,
      }

      const plans = await Database.from('plans')
        .if(inputs.title, (query) => {
          query.where('title', 'like', '%' + inputs.title + '%')
        })
        .if(inputs.tags, (query) => {
          const tags = inputs.tags.split(',')
          tags.forEach((tag) => {
            query.where('tags', 'like', '%' + tag + '%')
          })
        })
        .if(inputs.difficulty, (query) => {
          query.where('difficulty', '=', inputs.difficulty)
        })
        .if(inputs.athlete_id, (query) => {
          query
            .join('athlete_plan', 'plans.id', '=', 'athlete_plan.plan_id')
            .where('athlete_plan.athlete_id', '=', inputs.athlete_id)
        })
        .if(inputs.is_liked, (query) => {
          query.where('athlete_plan.is_liked', '=', inputs.is_liked)
        })
        .if(inputs.is_completed, (query) => {
          query.where('athlete_plan.is_completed', '=', inputs.is_completed)
        })
        .if(inputs.trainer_id, (query) => {
          query.where('plans.trainer_id', '=', inputs.trainer_id)
        })
        .select('plans.*')

      response.status(200)
      response.send(plans)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }
}
