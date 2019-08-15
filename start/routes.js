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
  Route.get('/chat/:id', 'ChatController.show')
}).prefix('/v1')
.middleware('auth')

Route.group(() => {
  Route.get('/poi', 'PoiController.home')
  Route.get('/region', 'RegionController.show')
  Route.get('/region/poi/:id', 'RegionController.home')
}).prefix('/v1')
//CRUD POI
Route.get('/poi', 'PoiController.home')
Route.post('/poi/create','PoiController.create').validator('CreatePoi')
Route.get('/poi/delete/:id', 'PoiController.delete')
Route.get('/poi/edit/:id', 'PoiController.edit')
Route.post('/poi/update/:id', 'PoiController.update').validator('CreatePoi')
//Afficher les régions
Route.get('/poi/region','RegionController.home')