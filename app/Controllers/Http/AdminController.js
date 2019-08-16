'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class AdminController {
    async getall({request, auth, response}) {
        let pro = await User.all()
        return response.json({pro})
    }

    async getusers({request, auth, response}) {
        const roles = request.input('roles')
        const pro = await User.query().where("roles", roles).fetch()
        return response.json({pro})
    }

    async createadmin({request, auth, response}) {
        const validation = await validateAll(request.all(), {
            phone : 'required|unique:users',
            email:'required|unique:users',
            username: 'required|unique:users',
            age: 'required|integer|above:10',
            region: 'required',
            city: 'required',
            profession: 'required',
            professional_phone: 'required',
            roles : 'required'
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
          user.email = request.input('email')
          user.roles = request.input('roles')
          user.city = request.input('city')
          user.profession = request.input('profession')
          user.phone_pro = request.input('professional_phone')
          user.birthyear = new Date().getFullYear() - request.input('age')
          user.password = password
          await user.save()

          // send the pass with a sms
          return response.json({"c" : "bon"})
    }
    async delete_user({request, auth, response}) {
        const id = request.input('id_user')
        console.log(request.all())
        const user = await User.find(id)
        await user.delete()
        return response.json({"user" : "L'utilisateur à bien été supprimé."})
    }
}

module.exports = AdminController