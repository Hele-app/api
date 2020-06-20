'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
// eslint-disable-next-line
const Route = use('Route')

Route.get('/', ({ response }) => response.json({ greeting: 'Hello from Hélé API' }))

Route.group(() => {
  Route.post('/register', 'AuthenticationController.register')
    .validator('Authentication/Register')
  Route.post('/login', 'AuthenticationController.login')
    .validator('Authentication/Login')

  Route.post('/password/request', 'PasswordController.request')
    .validator('Password/Request')
  Route.post('/password/reset', 'PasswordController.reset')
    .validator('Password/Reset')
}).prefix('/auth').middleware('guest')

Route.group(() => {
  Route.get('/me', 'AuthenticationController.check')
}).prefix('/auth').middleware('auth')

Route.group(() => {
  Route.resource('young', 'YoungController')
    .validator(new Map([
      [['young.store'], ['User/Young/Store']],
      [['young.update'], ['User/Young/Update']]
    ]))
    .apiOnly()
  Route.resource('pro', 'ProController')
    .validator(new Map([
      [['pro.store'], ['User/Pro/Store']],
      [['pro.update'], ['User/Pro/Update']]
    ]))
    .apiOnly()
}).prefix('/user').middleware(['auth:jwt', 'role:admin']).namespace('User')

Route.group(() => {
  Route.get('region/all', 'RegionController.all')
  Route.get('establishment/all', 'EstablishmentController.all')
  Route.resource('establishment', 'EstablishmentController')
    .validator(new Map([
      [['establishment.store'], ['Establishment/Store']],
      [['establishment.update'], ['Establishment/Update']]
    ]))
    .apiOnly()
}).middleware(['auth:jwt', 'role:admin'])
