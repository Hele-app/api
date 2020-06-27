'use strict'

import argon from 'argon2'
import { User, PasswordReset } from '../commons/models'
import {
  sendSMS, generatedAgo,
  generateResetCode, generatePassword
} from '../commons/helpers'

export default class PasswordController {
  static async request(req, res) {
    const user = await new User({ phone: req.body.phone }).fetch({
      withRelated:
        ['passwordResets']
    })
    const previousRequest = await user.related('passwordResets').first()

    if (previousRequest &&
      generatedAgo(previousRequest.get('created_at'), 'hours') < 24) {
      return res.status(403).json({
        status: 403,
        errors: [{
          msg: 'E_RESET_CODE_ALREADY_REQUESTED',
          param: 'phone'
        }]
      })
    }

    const code = generateResetCode()
    const currentRequest = await PasswordReset.forge({
      user_id: user.get('id'),
      code
    }).save()

    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'production') {
      // TODO: text should be generated from a package and not from an hardcoded unlocalised string
      sendSMS(`${code}\nVoici ton code pour la génération de ton nouveau mot de passe.\nSi tu n'est pas à l'origine de cette demande, contacte un administrateur.`, user.get('phone'))
      return res.status(200).json({})
    }
    return res.status(200).json({ data: currentRequest })
  }

  static async reset(req, res) {
    const user = await new User({ phone: req.body.phone }).fetch({
      withRelated:
        ['passwordResets']
    })
    const currentRequest = await user.related('passwordResets')
      .where('code', req.body.code).first()

    if (currentRequest.get('is_used') || generatedAgo(currentRequest.get('created_at')) > 60) {
      return res.status(403).json({
        status: 403,
        errors: [{
          message: 'E_RESET_CODE_NOT_VALID',
          param: 'code'
        }]
      })
    }

    const password = generatePassword()
    await user.save({ password: await argon.hash(password) })
    await currentRequest.save({ is_used: true })

    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'production') {
      // TODO: text should be generated from a package and not from an hardcoded unlocalised string
      sendSMS(`Salut ${user.get('username')} !\nTon nouveau mot de passe pour te connecter est ${password}.`, user.get('phone'))
      return res.status(200).json({})
    }

    return res.status(200).json({ data: { user, password, currentRequest } })
  }
}
