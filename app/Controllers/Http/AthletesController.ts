import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Athlete from 'App/Models/Athlete'

export default class AthletesController {
  /**
   * @index
   * @description Return array of Athletes
   * @responseBody 200 - <Athlete[]>
   */
  public async index({ response }: HttpContextContract) {
    try {
      const athletes = await Athlete.all()
      response.status(200)
      response.send(athletes)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @store
   * @description Create Athlete
   * @responseBody 200 - <Athlete>
   * @responseBody 400 - Athlete could not be created
   * @requestBody <Athlete>.only(external_id)
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = request.only(['external_id'])
      const athlete = await Athlete.create({ external_id: payload.external_id })
      response.status(200)
      response.send(athlete)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @description Return Athlete
   * @responseBody 200 - <Athlete>
   * @responseBody 404 - Athlete could not be found
   */
  public async show({ request, response }: HttpContextContract) {
    try {
      const athlete = await Athlete.findOrFail(request.param('id'))
      response.status(200)
      response.send(athlete)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @update
   * @description Upadate Athlete
   * @responseBody 200 - <Athlete>
   * @responseBody 404 - Athlete could not be found
   * @requestBody <Athlete>.only(external_id)
   */
  public async update({ request, response }: HttpContextContract) {
    try {
      const athlete = await Athlete.findOrFail(request.param('id'))
      athlete.external_id = request.input('external_id')
      await athlete.save()
      response.status(200)
      response.send(athlete)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @description Delete Athlete
   * @responseBody 200 - DELETED
   * @responseBody 404 - Athlete could not be deleted
   */
  public async destroy({ request, response }: HttpContextContract) {
    try {
      const athlete = await Athlete.findOrFail(request.param('id'))
      await athlete.delete()
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
