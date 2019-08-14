'use strict'

const User = use('App/Models/User')
const VerifyPassword = use('App/Models/VerifyPassword')
const Chat = use('App/Models/Chat')
const ChatUser = use('App/Models/ChatUser')
const Database = use('Database')
const {
  validateAll
} = use('Validator')
const {
  ValidationException
} = use('@adonisjs/validator/src/Exceptions')

class AuthController {
  async register({
    request,
    auth,
    response
  }) {

    const validation = await validateAll(request.all(), {
      phone: 'required|unique:users|regex:^0[6-7](\\d{2}){4}$',
      username: 'required|unique:users',
      age: 'required|integer|above:10',
      region: 'required'
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
    user.region = request.input('region')
    user.birthyear = new Date().getFullYear() - request.input('age')
    user.password = password

    let isSave = await user.save()
    let access_token = await auth.generate(user)
    // TODO: send SMS with password instead of sending it in the response.

    if (isSave) {
      let userID = user.id
      this.youngToPro(userID)
    }

    return response.json({
      user,
      password,
      access_token
    })
  }

  async login({
    request,
    auth,
    response
  }) {
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
      return response.json({
        user,
        access_token
      })
    }
  }

  async me({
    request,
    auth,
    response
  }) {
    return response.json({
      "user": auth.user
    })
  }

  async youngToPro(userID) {
    const trx = await Database.beginTransaction()
    try {

      let chat = await Chat.create({
        type: 'PRIVATE'
      }, trx)
      let chatID = chat.id

      let allPro = await trx
        .select('id')
        .from('users')
        .where('roles', 'PROFESSIONAL')

      let randomPro = allPro[Math.round(Math.random() * allPro.length)]
      randomPro = randomPro.id

      await ChatUser.createMany([{
          user_id: userID,
          chat_id: chatID
        },
        {
          user_id: randomPro,
          chat_id: chatID
        }
      ], trx)

      await trx.commit()

    } catch (error) {
      trx.rollback()
      console.error(error)
    }
  }


  async verifyPassword({
    auth,
    response
  }) {
    //1ere route => recup le tel et on envoie un code
    //Creer une table avec le tel et le code unique 
    //2eme route => recuper le code et le tel, et faire le changement du mdp 
  }

  async sendCode({
    response,
    request
  }) {

    let min = 100000;
    let max = 999999;
    min = Math.ceil(min);
    max = Math.floor(max);
    const code = Math.floor(Math.random() * (max - min)) + min;


    const validation = await validateAll(request, {
      phone: 'required'
    })

    const user = await User.query().where('phone', request.input('phone')).firstOrFail()

    const pass = new VerifyPassword;
    pass.code = code;

    // J'accède au password et j'enregistre 
    await user.verifyPasswords().save(pass)

    // await pass.user().associate(user)
    console.log(pass)
    return response.json(pass)
  }

  async changeCode({
    response,
    request
  }) {

    const validation = await validateAll(request, {
      phone: 'required',
      code: 'required'
    })

    const user = await User.query().where('phone', request.input('phone')).firstOrFail()

    const verifyPassword = await user.verifyPasswords().where('used', null).where('code', request.input('code')).first();

    if (verifyPassword) {
      console.log('good code');
      console.log(verifyPassword.toJSON());

      const password = (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      ).substring(0, 10)

      user.password = password
      await user.save()
      console.log(password)   

      user.verifyPasswords().update({ used: false })
      // verifyPassword.used = true
      

      return response.json(user, password)
    } else {
      console.log('wrong code')
      throw new ValidationException(validation.messages(), 400)
    }
    
  }
}

module.exports = AuthController
