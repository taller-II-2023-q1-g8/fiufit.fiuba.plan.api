import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Trainer from 'App/Models/Trainer'

export default class TrainersController {
  /**
   * @index
   * @description Return array of Trainers
   * @responseBody 200 - <Trainer[]>
   */
  public async index({ response }: HttpContextContract) {
    try {
      const trainers = await Trainer.all()
      response.status(200)
      response.send(trainers)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @store
   * @description Create Trainer
   * @responseBody 200 - <Trainer>
   * @responseBody 400 - Trainer could not be created
   * @requestBody <Trainer>.only(external_id)
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = request.only(['external_id'])
      const trainer = await Trainer.create({ external_id: payload.external_id })
      response.status(200)
      response.send(trainer)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @description Return Trainer
   * @responseBody 200 - <Trainer>
   * @responseBody 404 - Trainer could not be found
   */
  public async show({ request, response }: HttpContextContract) {
    try {
      const trainer = await Trainer.findOrFail(request.param('id'))
      response.status(200)
      response.send(trainer)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @description Return Trainer
   * @responseBody 200 - <Trainer>
   * @responseBody 404 - Trainer could not be found
   */
  public async getByAthleteExternalId({ request, response }: HttpContextContract) {
    try {
      const trainer = await Trainer.findByOrFail('external_id', request.param('username'))
      response.status(200)
      response.send(trainer)
    } catch (error) {
      response.status(400)
      response.send({
        error: 'Trainer could not be found',
      })
    }
  }

  /**
   * @update
   * @description Upadate Trainer
   * @responseBody 200 - <Trainer>
   * @responseBody 404 - Trainer could not be found
   * @requestBody <Trainer>.only(external_id)
   */
  public async update({ request, response }: HttpContextContract) {
    try {
      const trainer = await Trainer.findOrFail(request.param('id'))
      trainer.external_id = request.input('external_id')
      await trainer.save()
      response.status(200)
      response.send(trainer)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @description Delete Trainer
   * @responseBody 200 - DELETED
   * @responseBody 404 - Trainer could not be deleted
   */
  public async destroy({ request, response }: HttpContextContract) {
    try {
      const trainer = await Trainer.findOrFail(request.param('id'))
      await trainer.delete()
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
