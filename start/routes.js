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

Route.get('/', () => {
  return { greeting: 'Hello from Hélé API' }
})

Route.group(() => {
  Route.post('/register', 'AuthenticationController.register')
    .validator('Register')
}).prefix('/auth').middleware('guest')
