import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Multimedia from 'App/Models/Multimedia'

export default class MultimediasController {
  public async index({ response }: HttpContextContract) {
    try {
      const multimedias = await Multimedia.all()
      response.status(200)
      response.send(multimedias)
    } catch (error) {
      console.log(error)
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
      const multimedia = await Multimedia.create({external_id: payload.external_id})
      response.status(200)
      response.send(multimedia)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const multimedia = await Multimedia.findOrFail(request.param('id'))
      response.status(200)
      response.send(multimedia)
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
      const multimedia = await Multimedia.findOrFail(request.param('id'))
      await multimedia.delete()
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
