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
//import Swagger from 'Config/swagger'

// returns swagger in YAML
/*Route.get('/swagger', async () => {
  return AutoSwagger.docs(Route.toJSON(), Swagger)
})*/

Route.get('/swagger', 'SwaggerController.get')

// Renders Swagger-UI and passes YAML-output of /swagger
Route.get('/docs', async () => {
  return AutoSwagger.ui('/swagger')
})

Route.get('/', async () => {
  return 'Trainer API'
})
Route.get('/health', async () => {
  return { status: 'OK' }
})

Route.group(() => {
  Route.group(() => {
    Route.resource('athletes', 'AthletesController').except(['create', 'edit']) // /api/v1/athletes
    Route.resource('plans', 'PlansController').except(['create', 'edit']) // /api/v1/plans
    Route.post('/plans/search', 'PlansController.search') // /api/v1/plans/search
    Route.get('/trainers/username/:username', 'TrainersController.getByAthleteExternalId')
    Route.get('/plans/:id/exercises', 'PlansController.getExercises') // /api/v1/plans/:id/exercises
    Route.get('/plans/:id/califications', 'PlansController.getCalifications') // /api/v1/plans/:id/califications
    Route.get('/plans/:id/likes', 'PlansController.getLikes') // /api/v1/plans/:id/likes
    Route.delete('/plans/:id/exercises/:exercise_id', 'PlansController.removeExercise') // /api/v1/plans/exercises/:id/:exercise_id
    Route.post('/plans/:id/athletes/:athlete_id', 'PlansController.addAthlete') // /api/v1/plans/exercises/athlete/:id/:athlete_id
    Route.delete('/plans/:id/athletes/:athlete_id', 'PlansController.removeAthlete') // /api/v1/plans/athlete/:id/:athlete_id
    Route.patch('/plans/:id/athletes/:athlete_id/likes', 'PlansController.addLike') // /api/v1/plans/exercises/athlete/:id/:athlete_id/likes
    Route.post('/plans/:id/exercises/:exercise_id', 'PlansController.addExercise') // /api/v1/plans/:id/:exercise_id
    Route.post('/plans/:id/athletes/:athlete_id/califications', 'PlansController.addCalification') // /api/v1/plans/exercises/athlete/:id/:athlete_id/califications
    Route.resource('exercises', 'ExercisesController').except(['create', 'edit']) // /api/v1/exercises
    Route.resource('multimedias', 'MultimediasController').except(['create', 'edit']) // /api/v1/multimedias
    Route.resource('trainers', 'TrainersController').except(['create', 'edit']) // /api/v1/trainers
    Route.get('/verifications', 'TrainersController.verifications') // /api/v1/trainers/verifications
    Route.patch('/trainers/:id/verify/request', 'TrainersController.requestVerification') // /api/v1/trainers/:id/verify/request
    Route.patch('/trainers/:id/verify', 'TrainersController.verify') // /api/v1/trainers/:id/verify
    Route.patch('/trainers/:id/verify/reject', 'TrainersController.rejectVerification') // /api/v1/trainers/:id/verify/reject
    Route.get('/trainers/:id/verify/status', 'TrainersController.verificationStatus') // /api/v1/trainers/:id/verify/status
  }).prefix('/v1')
}).prefix('/api')
