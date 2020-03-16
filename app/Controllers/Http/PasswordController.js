'use strict'

// eslint-disable-next-line
const PasswordReset = use('App/Models/PasswordReset')

// eslint-disable-next-line
const User = use('App/Models/User')

// eslint-disable-next-line
const { generatePassword, sendSMS } = use('App/Helpers/Authentication')

class PasswordController {
  async request({ request, response }) {
    const user = await User.findByOrFail('phone', request.input('phone'))
    const previousRequest = await user.passwordResets().orderBy('created_at', 'DESC').first()

    if (previousRequest && previousRequest.generatedAgo('hours') < 24) {
      return response.status(403).json({
        status: 403,
        errors: [{ message: 'E_RESET_ALREADY_ASKED' }]
      })
    }

    const code = generatePassword(6)

    const pr = await user.passwordResets().create({ code })
    return response.status(200).json(pr);
  }

  async reset({ request, response }) {

  }
}

module.exports = PasswordController
