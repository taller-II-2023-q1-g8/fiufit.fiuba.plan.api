import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Trainer from 'App/Models/Trainer'

export default class TrainersController {
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

  public async create({}: HttpContextContract) {} // For the frontend

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = request.only(['external_id'])
      const trainer = await Trainer.create({external_id: payload.external_id})
      response.status(200)
      response.send(trainer)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

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

  public async edit({}: HttpContextContract) {} // ???

  public async update({}: HttpContextContract) {} // ???

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
