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
  Route.post('/get/all', 'AdminController.getall')
  Route.post('/get/users', 'AdminController.getusers')
  Route.post('/getuser', 'AdminController.verifyid')
  Route.post('/admin/register', 'AdminController.createadmin')
  Route.post("/admin/delete", 'AdminController.deleteuser')
  Route.post("/admin/update", 'AdminController.updateuser')
}).prefix('/v1').middleware('auth')
