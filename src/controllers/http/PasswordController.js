'use strict'

import argon from 'argon2'
import db from '../../../config/database'
import { sendSMS } from '../../helpers/sms'
import { generatedAgo } from '../../helpers/time'
import { generateResetCode, generatePassword } from '../../helpers/random'

export default class PasswordController {
  static async request(req, res) {
    const user = await db('users').select(['id', 'username', 'phone']).where('phone', req.body.phone).first()
    const previousRequest = await db('password_resets').where('user_id', user.id).orderBy('created_at', 'DESC').first()

    if (previousRequest && generatedAgo(previousRequest.created_at, 'hours') < 24) {
      return res.status(403).json({
        status: 403,
        errors: [{ message: 'E_RESET_CODE_ALREADY_REQUESTED' }]
      })
    }

    const code = generateResetCode()
    const currentRequestId = await db('password_resets').insert({
      user_id: user.id,
      code
    })
    const currentRequest = await db('password_resets').where({ id: currentRequestId }).first()

    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'production') {
      // TODO: text should be generated from a package and not from an hardcoded unlocalised string
      sendSMS(`${code}\nVoici ton code pour la génération de ton nouveau mot de passe.\nSi tu n'est pas à l'origine de cette demande, contacte un administrateur.`, user.phone)
      return res.status(200).json({})
    }
    return res.status(200).json(currentRequest)
  }

  static async reset(req, res) {
    const user = await db('users').select(['id', 'username', 'phone']).where('phone', req.body.phone).first()
    const currentRequest = await db('password_resets').where('user_id', user.id).where('code', req.body.code).first()

    if (currentRequest.is_used || generatedAgo(currentRequest.created_at) < 60) {
      return res.status(403).json({
        status: 403,
        errors: [{ message: 'E_RESET_CODE_NOT_VALID' }]
      })
    }

    const password = generatePassword()
    await db('users').update('password', await argon.hash(password)).where({ id: user.id })
    await db('password_resets').update('is_used', true).where({ id: currentRequest.id })

    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'production') {
      // TODO: text should be generated from a package and not from an hardcoded unlocalised string
      sendSMS(`Salut ${user.username} !\nTon nouveau mot de passe pour te connecter est ${password}.`, user.phone)
      return res.status(200).json({})
    }

    return res.status(200).json({ user, password, currentRequest })
  }
}
