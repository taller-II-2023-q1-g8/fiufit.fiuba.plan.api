/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import AutoSwagger from 'adonis-autoswagger'
import Swagger from 'Config/swagger'

// returns swagger in YAML
Route.get('/swagger', async () => {
  return AutoSwagger.docs(Route.toJSON(), Swagger)
})
// Renders Swagger-UI and passes YAML-output of /swagger
Route.get('/docs', async () => {
  return AutoSwagger.ui('/swagger')
})

Route.get('/health', async () => {
  return { status: 'OK' }
})

Route.group(() => {
  Route.group(() => {
    Route.resource('athletes', 'AthletesController').except(['create', 'edit']) // /api/v1/athletes
    Route.resource('plans', 'PlansController').except(['create', 'edit']) // /api/v1/plans
    Route.resource('exercises', 'ExercisesController').except(['create', 'edit']) // /api/v1/exercises
    Route.resource('multimedias', 'MultimediasController').except(['create', 'edit']) // /api/v1/multimedias
    Route.resource('trainers', 'TrainersController').except(['create', 'edit']) // /api/v1/trainers
  }).prefix('/v1')
}).prefix('/api')
