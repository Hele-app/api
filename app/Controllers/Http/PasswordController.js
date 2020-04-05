'use strict'

// eslint-disable-next-line
const Env = use('Env')
const env = Env.get('NODE_ENV', 'development')

// eslint-disable-next-line
const User = use('App/Models/User')

// eslint-disable-next-line
const { generatePassword, generateResetCode } = use('App/Helpers/Random')

// eslint-disable-next-line
const { sendSMS } = use('App/Helpers/Authentication')

class PasswordController {
  async request({ request, response }) {
    const user = await User.findBy('phone', request.input('phone'))
    const previousRequest = await user.passwordResets()
      .orderBy('created_at', 'DESC').first()

    if (previousRequest && previousRequest.generatedAgo('hours') < 24) {
      return response.status(403).json({
        status: 403,
        errors: [{ message: 'E_RESET_CODE_ALREADY_REQUESTED' }]
      })
    }

    const code = generateResetCode()
    const currentRequest = await user.passwordResets().create({ code })

    /* istanbul ignore next */
    if (env === 'production') {
      // TODO: text should be generated from a package and not from an hardcoded unlocalised string
      sendSMS(`${code}\nVoici ton code pour la génération de ton nouveau mot de passe.\nSi tu n'est pas à l'origine de cette demande, contacte un administrateur.`, user.phone)
      return response.status(200).json({})
    }
    return response.status(200).json(currentRequest)
  }

  async reset({ request, response }) {
    const user = await User.findBy('phone', request.input('phone'))
    const currentRequest = await user.passwordResets()
      .where('code', request.input('code')).firstOrFail()

    if (!currentRequest.isValid()) {
      return response.status(403).json({
        status: 403,
        errors: [{ message: 'E_RESET_CODE_NOT_VALID' }]
      })
    }

    const password = generatePassword()

    user.password = password
    await user.save()

    currentRequest.is_used = true
    await currentRequest.save()

    /* istanbul ignore next */
    if (env === 'production') {
      // TODO: text should be generated from a package and not from an hardcoded unlocalised string
      sendSMS(`Salut ${user.username} !\nTon nouveau mot de passe pour te connecter est ${password}.`, user.phone)
      return response.status(200).json({})
    }

    return response.status(200).json({ user, password, currentRequest })
  }
}

module.exports = PasswordController
