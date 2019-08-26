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
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.post('/auth/register', 'AuthController.register')
  Route.post('/auth/login', 'AuthController.login')
}).prefix('/v1').middleware('guest')

Route.group(() => {
  Route.get('/auth/me', 'AuthController.me')
}).prefix('/v1').middleware('auth')

Route.group(() => {
  Route.get('/chat', 'ChatController.index')
  Route.get('/chat/:id/:page?', 'ChatController.show')
 }).prefix('/v1').middleware('auth')


Route.post('/make/slot', 'SlotController.create')
.prefix('/v1')
.middleware('auth')

Route.post('/get/slot', 'SlotController.index')
.prefix('/v1')
