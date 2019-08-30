'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class AdminController {
  async index({request, auth, response}) {
    let users = await User.all()
    return response.json({users})
  }

  async findUser({request, auth, response, params: {id} }) {
    let user = await User.findOrFail(id)
    return response.json({user})
  }

  async create({request, auth, response}) {
    const validation = await validateAll(request.all(), {
      phone: 'required|unique:users|regex:^0[6-7](\\d{2}){4}$',
      username: 'required|unique:users',
      birthyear: 'required',
      region_id: 'required',
      roles: 'required'
    })

    if (validation.fails()) {
      throw new ValidationException(validation.messages(), 400)
    }

    const password = (
      Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    ).substring(0, 10)

    let user = new User()
    this.fillUser(user, request)
    user.password = password

    await user.save()
    // TODO: send SMS with password instead of sending it in the response.

    return response.json({user})
  }

  async update({request, auth, response, params: {id} }) {
    const validation = await validateAll(request.all(), {
      phone: 'unique:users|regex:^0[6-7](\\d{2}){4}$',
      username: 'unique:users',
    })

    if (validation.fails()) {
      throw new ValidationException(validation.messages(), 400)
    }

    const user = await User.findOrFail(id)
    this.fillUser(user, request)
    await user.save()
    // TODO: send SMS with password instead of sending it in the response.

    return response.json({user})
  }

  async delete({request, auth, response, params: {id} }) {
    const user = await User.findOrFail(id)
    await user.delete()
    console.log(user)
    return response.json({"user" : `L'utilisateur ${user.username} à bien été supprimé.`})
  }

  async fillUser(user, request) {
    user.phone = request.input('phone')
    user.email = request.input('email')
    user.username = request.input('username')
    user.birthyear = request.input('birthyear')
    user.region_id = request.input('region_id')
    user.city = request.input('city')
    user.roles = request.input('roles')
    user.profession = request.input('profession')
    user.phone_pro = request.input('phone_pro')
    user.active = request.input('active')
  }
}

module.exports = AdminController
