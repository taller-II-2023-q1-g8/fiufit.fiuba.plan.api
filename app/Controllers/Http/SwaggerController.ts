import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { readFile } from 'fs/promises'

export default class SwaggerController {
  public async get({}: HttpContextContract) {
    const content = await readFile('swagger.yml')
    return content.toString()
  }
}
