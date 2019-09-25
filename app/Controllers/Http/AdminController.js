'use strict'

const Env = use('Env')

const mode = Env.get('NODE_ENV', 'development')

const accountSid = Env.get('TWILIO_SID','')
const authToken = Env.get('TWILIO_TOKEN', )
const phone = Env.get('TWILIO_PHONE', '')
const client = require('twilio')(accountSid, authToken)

const User = use('App/Models/User')
const { validateAll } = use('Validator')
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class AdminController {
  addConditions(query) {
    const values = this.params[this.key].split("|")
    query.where(this.key, values[0])
    if (values.length > 1) {
      for (let index=1; index < values.length; index++) {
        query.orWhere(this.key, values[index])
      }
    }
  }
  async index({request, auth, response}) {
    const params = request.get()
    let query = User.query()
    let first = true;
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        if (first === true) {
          query.where(this.addConditions.bind({params: params,
                                               key: key}))
          first = false
        }
        else {
          query.andWhere(this.addConditions.bind({params: params,
                                               key: key}))
        }
      }
    }
    const users = await query.fetch()
    return response.json({users})
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

    if (mode === 'production') {
      try {
      const message = await client.messages
            .create({body: `Salut ${user.username} !\n Bienvenu sur Hélé. Ton mot de passe pour te connecter est ${password}. A bientôt sur Hélé !`, from: phone, to: user.phone})
        return response.status(201).json({user})
      }
      catch (e) {
        console.log(e)
        return response.status(500).json({message: e})
      }
    }
    else {
      return response.status(201).json({
        user,
        password
      })
    }
  }

  async update({request, auth, response, params: {id} }) {
    const user = await User.findOrFail(id)
    this.fillUser(user, request)
    await user.save()

    return response.json({user})
  }

  async delete({request, auth, response, params: {id} }) {
    const user = await User.findOrFail(id)
    await user.delete()
    console.log(user)
    return response.json({"user" : `L'utilisateur ${user.username} à bien été supprimé.`})
  }

  async fillUser(user, request) {
    if (request.input('phone') != undefined && request.input('phone') !== user.phone)
      user.phone = request.input('phone')
    if (request.input('email') != undefined && request.input('email') !== user.email)
      user.email = request.input('email')
    if (request.input('username') != undefined && request.input('username') !== user.username)
      user.username = request.input('username')
    if (request.input('birthyear') != undefined && request.input('birthyear') !== user.birthyear)
      user.birthyear = request.input('birthyear')
    if (request.input('region_id') != undefined && request.input('region_id') !== user.region_id)
      user.region_id = request.input('region_id')
    if (request.input('city') != undefined && request.input('city') !== user.city)
      user.city = request.input('city')
    if (request.input('roles') != undefined && request.input('roles') !== user.roles)
      user.roles = request.input('roles')
    if (request.input('profession') != undefined && request.input('profession') !== user.profession)
      user.profession = request.input('profession')
    if (request.input('phone_pro') != undefined && request.input('phone_pro') !== user.phone_pro)
      user.phone_pro = request.input('phone_pro')
    if (request.input('active') != undefined && request.input('active') !== user.active)
      user.active = request.input('active')
  }
}

module.exports = AdminController
