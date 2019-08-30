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

  Route.post('/code/send', 'AuthController.sendCode')
  Route.post('/code/change', 'AuthController.changeCode')
  Route.get('/auth/me', 'AuthController.me')
}).prefix('/v1').middleware('guest')

Route.group(() => {
  Route.get('/users', 'AdminController.index')
  Route.get('/users/:id', 'AdminController.findUser')
  Route.post('/users', 'AdminController.create')
  Route.put("/users/:id", 'AdminController.update')
  Route.delete("/users/:id", 'AdminController.delete')
}).prefix('/v1/admin').middleware('auth')

Route.group(() => {
  Route.get('/chat', 'ChatController.index')
  Route.get('/chat/:id/:page?', 'ChatController.show')
 }).prefix('/v1').middleware('auth')

Route.group(() => {
  Route.get('/poi', 'PoiController.home')
  Route.get('/region_id', 'RegionController.all')
  Route.get('/region_id/:id', 'RegionController.show')
  Route.post('/poi/create','PoiController.create').validator('CreatePoi')
  Route.delete('/poi/delete/:id', 'PoiController.delete')
  Route.get('/poi/edit/:id', 'PoiController.edit')
  Route.get('/region/:id', 'RegionController.showid')
  Route.get('/region', 'RegionController.all')
  Route.put('/poi/update/:id', 'PoiController.update').validator('CreatePoi')
}).prefix('/v1').middleware('auth')

Route.group(() => {
  Route.get('/posts', 'PostController.index')
  Route.get('/post/:id', 'ReplyController.index')
}).prefix('/v1').middleware('auth')

 Route.group(() => {
   Route.get('/advice-card', 'AdviceCardController.index')
   Route.post('/advice-card', 'AdviceCardController.store')
   Route.delete('/advice-card/:id', 'AdviceCardController.destroy')
   Route.get('/advice-card/random', 'AdviceCardController.randomCard')
 }).prefix('/v1').middleware('auth')

Route.group(() => {
  Route.get('/articles', 'ArticleController.index')
  Route.post('/article/upload', 'ArticleController.upload')
  Route.delete('article/:id', 'ArticleController.destroy')
}).prefix('/v1').middleware('auth')

Route.group(() => {
  Route.post('/make/slot', 'SlotController.create')
  Route.get('/get/slot', 'SlotController.index')
  Route.post('/select/:id', 'SlotController.select')
  Route.post('/slot/pro', 'SlotController.indexProSlot')
}).prefix('/v1').middleware('auth')
