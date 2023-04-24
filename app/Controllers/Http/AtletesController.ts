import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Atlete from 'App/Models/Atlete'

export default class AtletesController {
  public async index({ response }: HttpContextContract) {
    try {
      const atletes = await Atlete.all()
      response.status(200)
      response.send(atletes)
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
      const data = request.only(['email', 'password'])
      const atlete = await Atlete.create({ email: data.email, password: data.password })
      response.status(200)
      response.send(atlete)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const atlete = await Atlete.findOrFail(request.param('id'))
      response.status(200)
      response.send(atlete)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  public async edit({}: HttpContextContract) {} // ???

  public async update({}: HttpContextContract) {} // ???

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const atlete = await Atlete.findOrFail(request.param('id'))
      await atlete.delete()
      response.status(200)
      response.send('DELETED')
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }
}
