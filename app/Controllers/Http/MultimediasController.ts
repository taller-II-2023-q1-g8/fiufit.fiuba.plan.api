import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Multimedia from 'App/Models/Multimedia'

export default class MultimediasController {
  /**
   * @index
   * @description Return array of Multimedias
   * @responseBody 200 - <Multimedia[]>
   */
  public async index({ response }: HttpContextContract) {
    try {
      const multimedias = await Multimedia.all()
      response.status(200)
      response.send(multimedias)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @store
   * @description Create Multimedia
   * @responseBody 200 - <Multimedia>
   * @responseBody 400 - Multimedia could not be created
   * @requestBody <Multimedia>.only(external_id)
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = request.only(['external_id'])
      const multimedia = await Multimedia.create({ external_id: payload.external_id })
      response.status(200)
      response.send(multimedia)
    } catch (error) {
      response.status(400)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @description Return Multimedia
   * @responseBody 200 - <Multimedia>
   * @responseBody 404 - Multimedia could not be found
   */
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

  /**
   * @update
   * @description Upadate Multimedia
   * @responseBody 200 - <Multimedia>
   * @responseBody 404 - Multimedia could not be found
   * @requestBody <Multimedia>.only(external_id)
   */
  public async update({ request, response }: HttpContextContract) {
    try {
      const multimedia = await Multimedia.findOrFail(request.param('id'))
      multimedia.external_id = request.input('external_id')
      await multimedia.save()
      response.status(200)
      response.send(multimedia)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @show
   * @description Delete Multimedia
   * @responseBody 200 - DELETED
   * @responseBody 404 - Multimedia could not be deleted
   */
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
