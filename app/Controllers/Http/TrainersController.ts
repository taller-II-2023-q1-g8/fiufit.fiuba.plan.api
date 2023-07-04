import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Trainer from 'App/Models/Trainer'
import Verification from 'App/Models/Verification'

export default class TrainersController {
  /**
   * @index
   * @description Return array of Trainers
   * @responseBody 200 - <Trainer[]>
   */
  public async index({ response }: HttpContextContract) {
    try {
      const trainers = await Trainer.all()
      for (const trainer of trainers) {
        await trainer.load((loader) => {
          loader.load('verification')
        })
      }
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

      await trainer.related('verification').updateOrCreate({ trainerId: trainer.id }, { status: 0 })

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
      const verification = await Verification.findByOrFail('trainer_id', trainer.id)
      const trainerJSON = trainer.toJSON()
      trainerJSON.verification = verification.status
      trainerJSON.verificationStatus = verification.getStatus()

      response.status(200)
      response.send(trainerJSON)
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
      const verification = await Verification.findByOrFail('trainer_id', trainer.id)
      const trainerJSON = trainer.toJSON()
      trainerJSON.verification = verification.status
      trainerJSON.verificationStatus = verification.getStatus()

      response.status(200)
      response.send(trainerJSON)
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

  /**
   * @verifications
   * @description Trainers verifications
   * @responseBody 200 - <Verification>
   * @responseBody 400 - No verifications
   * @requestBody {}
   */
  public async verifications({ response }: HttpContextContract) {
    try {
      const verifications = await Verification.query().whereNot('status', 0)
      response.status(200)
      response.send(verifications)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @requestVerification
   * @description Request Trainer verification
   * @responseBody 200 - Requested
   * @responseBody 400 - Request failed
   * @requestBody {}
   */
  public async requestVerification({ request, response }: HttpContextContract) {
    try {
      const trainer = await Trainer.findOrFail(request.param('id'))
      trainer.related('verification').updateOrCreate({ trainerId: trainer.id }, { status: 1 })
      await trainer.save()
      response.status(200)
      response.send('Requested')
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @verify
   * @description Verify Trainer
   * @responseBody 200 - Verified
   * @responseBody 400 - Verification failed
   * @requestBody {}
   */
  public async verify({ request, response }: HttpContextContract) {
    try {
      const trainer = await Trainer.findOrFail(request.param('id'))
      trainer.related('verification').updateOrCreate({ trainerId: trainer.id }, { status: 2 })
      await trainer.save()
      response.status(200)
      response.send('Verified')
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @reject
   * @description Reject Trainer verification
   * @responseBody 200 - Reject
   * @responseBody 400 - Rejection failed
   * @requestBody {}
   */
  public async rejectVerification({ request, response }: HttpContextContract) {
    try {
      const trainer = await Trainer.findOrFail(request.param('id'))
      await trainer.related('verification').updateOrCreate({ trainerId: trainer.id }, { status: 3 })
      await trainer.save()
      response.status(200)
      response.send('Rejected')
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  /**
   * @verificationStatus
   * @description Verification Status of a Trainer
   * @responseBody 200 - Verification Status
   * @responseBody 400 - Verification Status failed
   * @requestBody {}
   */
  public async verificationStatus({ request, response }: HttpContextContract) {
    try {
      const verification = await Verification.findByOrFail('trainer_id', request.param('id'))
      console.log(verification.status)
      const status = verification.getStatus()
      response.status(200)
      response.send(status)
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }
}
