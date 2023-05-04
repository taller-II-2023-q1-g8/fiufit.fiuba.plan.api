import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Athlete from 'App/Models/Athlete'

export default class AthletesController {
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

  public async create({}: HttpContextContract) {} // For the frontend

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only([])
      const athlete = await Athlete.create({})
      response.status(200)
      response.send(athlete)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

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

  public async edit({}: HttpContextContract) {} // ???

  public async update({}: HttpContextContract) {} // ???

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
