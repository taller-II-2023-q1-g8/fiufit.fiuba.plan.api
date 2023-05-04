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
   * @requestBody <Trainer>
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

  public async update({}: HttpContextContract) {} // ???

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
