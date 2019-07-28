'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')

class AuthController {
  async register({request, auth, response}) {
    const validation = await validateAll(request.all(), {
      phone: ['required', 'unique:users,phone', 'regex:^((\+)33|0)[6-7](\d{2}){4}$'],
      username: 'required|unique:users,username',
      age: 'required|integer|above:10',
      region: 'required'
    })

    if (validation.fails()) {
      response.status(400).json(validation.messages())
    }

    const password = (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    ).substring(0, 10);

    let user = new User()
    user.phone = request.input('phone')
    user.username = request.input('username')
    user.region = request.input('region')
    user.birthyear = new Date().getFullYear() - request.input('age');
    user.password = password

    await user.save()
    let access_token = await auth.generate(user)
    // TODO: send SMS with password instead of sending it in the response.
    return response.json({user, password, access_token})
  }

  async login({request, auth, response}) {
    const validation = await validateAll(request.all(), {
      phone: 'required_without_any:username, email',
      username: 'required_without_any:phone, email',
      email: 'required_without_any:phone, username',
      password: 'required',
    })

    if (validation.fails()) {
      response.status(400).json(validation.messages())
    }

    let query = User.query().where('active', true)

    let uid = request.input('username', request.input('phone', request.input('email')));
    if (request.input('phone', false) !== false) {
      // remove dots or spaces in phone number
      query.where('phone', request.input('phone').replace(/[.| ]/g, ''))
    } else if (request.input('username', false) !== false) {
      query.where('username', request.input('username'))
    } else if (request.input('email', false) !== false) {
      query.where('email', request.input('email'))
    }

    let user = await query.firstOrFail()

    if (await auth.attempt(user.phone, request.input('password'))) {
      let access_token = await auth.generate(user)
      return response.json({user, access_token})
    }
  }

  async me({request, auth, response}) {
    return response.json({"user": auth.user})
  }
}

module.exports = AuthController
