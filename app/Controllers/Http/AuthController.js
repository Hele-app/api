'use strict'

const User = use('App/Models/User')
const VerifyPassword = use('App/Models/VerifyPassword')
const Chat = use('App/Models/Chat')
const ChatUser = use('App/Models/ChatUser')
const Database = use('Database')
const { validateAll } = use('Validator')
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class AuthController {
  async register({ request, auth, response }) {

    const validation = await validateAll(request.all(), {
      phone: 'required|unique:users|regex:^0[6-7](\\d{2}){4}$',
      username: 'required|unique:users',
      age: 'required|integer|above:10',
      region_id: 'required',
      
    })

    if (validation.fails()) {
      throw new ValidationException(validation.messages(), 400)
    }

    const password = (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    ).substring(0, 10)
    let user = new User()
    user.phone = request.input('phone')
    user.username = request.input('username')
    user.region_id = request.input('region_id')
    user.birthyear = new Date().getFullYear() - request.input('age')
    user.password = password

    let isSave = await user.save()
    let access_token = await auth.generate(user)
    // TODO: send SMS with password instead of sending it in the response.

    if (isSave) {
      this.youngToPro(user)
    }

    return response.json({
      user,
      password,
      access_token
    })
  }

  async login({ request, auth, response }) {

    const validation = await validateAll(request.all(), {
      phone: 'required_without_all:username,email',
      username: 'required_without_all:phone,email',
      email: 'required_without_all:phone,username',
      password: 'required',
    })

    if (validation.fails()) {
      throw new ValidationException(validation.messages(), 400)
    }

    let query = User.query().where('active', true)

    if (request.input('phone', false) !== false) {
      query.where('phone', request.input('phone').replace(/[.| ]/g, ''))
    } else if (request.input('username', false) !== false) {
      query.where('username', request.input('username'))
    } else if (request.input('email', false) !== false) {
      query.where('email', request.input('email'))
    }

    let user = await query.firstOrFail()

    if (await auth.attempt(user.phone, request.input('password'))) {
      let access_token = await auth.generate(user)
      return response.json({
        user,
        access_token
      })
    }
  }

  async me({ request, auth, response }) {
    return response.json({ "user": auth.user })
  }

  async youngToPro(user) {
    try {

      let chat = await Chat.create({ type: 'PRIVATE' })
      let chatID = chat.id

      let allPro = await Database
      .select('id')
      .from('users')
      .where('roles', 'PROFESSIONAL')

      let randomPro =  allPro[Math.floor(Math.random() * allPro.length)]

      await user.chats().attach(chatID)
      await chat.users().attach(randomPro.id)
      this.youngToYoung(user, allPro)

    } catch (error) {
      console.error(error)
    }
  }

  async youngToYoung(user, allPro) {
    try {

      let chats = await Chat
      .query()
      .select('id')
      .where('type', 'GROUP')
      .whereHas('users', builder => {
        builder.where('roles', 'YOUNG')
      }, '<', 4)
      .fetch()

      chats = chats.toJSON()

      let chatsID = chats.map(chat => {
        return chat.id
      })

      if (chatsID.length > 0) {
        let randomChat = chatsID[Math.floor(Math.random() * chatsID.length)]
        await user.chats().attach(randomChat)
      } else {
        let newChat = await Chat.create({ type: 'GROUP' })
        let newChatID = newChat.id
        let randomPro = await allPro[Math.floor(Math.random() * allPro.length)]

        await user.chats().attach(newChatID)
        await newChat.users().attach(randomPro.id)

        let allModo = await Database
        .select('id')
        .from('users')
        .where('roles', 'MODERATOR')

        let randomModo =  allModo[Math.floor(Math.random() * allModo.length)]

        await newChat.users().attach(randomModo.id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async sendCode({ response, request }) {

    const code = (
      Math.random().toString().substring(2, 15) +
      Math.random().toString().substring(2, 15)
    ).substring(0, 6)

    const validation = await validateAll(request.all(), {
      phone: 'required'
    })

    if (validation.fails()) {
      throw new ValidationException(validation.messages(), 400)
    }

    const user = await User.query().where('phone', request.input('phone')).firstOrFail()

    const pass = new VerifyPassword;
    pass.code = code;

    await user.verifyPasswords().save(pass)
    return response.json(pass)
  }

  async changeCode({ response, request }) {

    const validation = await validateAll(request.all(), {
      phone: 'required',
      code: 'required'
    })

    if (validation.fails()) {
      throw new ValidationException(validation.messages(), 400)
    }

    const user = await User.query().where('phone', request.input('phone')).firstOrFail()

    const verifyPassword = await user.verifyPasswords().whereNull('used').where('code', request.input('code')).firstOrFail();

    const password = (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    ).substring(0, 10)

    user.password = password
    await user.save()

    verifyPassword.used = true
    await verifyPassword.save()

    await user.verifyPasswords().whereNull('used').update({
      used: false
    })

    return response.json({
      user,
      password
    })

  }
}

module.exports = AuthController
