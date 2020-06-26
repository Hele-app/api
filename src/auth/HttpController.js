'use strict'

import argon from 'argon2'
import jwt from 'jsonwebtoken'
import { db, logger } from '../../config'
import { generatePassword, sendSMS } from '../commons/helpers'

export default class AuthController {
  static async register(req, res) {
    const body = req.body
    const establishment = await db('establishments')
      .where({ code: body.establishment_code }).first()

    if (!establishment) {
      return res.status(404).json({ error: 'E_ESTABLISHMENT_NOT_FOUND' })
    }

    try {
      const password = generatePassword()
      const userId = await db('users').insert({
        phone: body.phone,
        username: body.username,
        establishment_id: establishment.id,
        birthyear: new Date().getFullYear() - body.age,
        password: await argon.hash(password)
      })
      const user = await db('users').select(['username', 'phone'])
        .where({ id: userId }).first()

      if (process.env.NODE_ENV === 'production') {
        // TODO: text should be generated from a package and not from an hardcoded unlocalised string
        sendSMS(`Salut ${user.username} !\nBienvenu sur Hélé. Ton mot de passe pour te connecter est ${password}.\nA bientôt sur Hélé !`, user.phone)
        return res.status(201).json({})
      }

      return res.status(201).json({ user, password })
    } catch (e) {
      logger.error('Register Error', { error: e })
      return res.status(500).send('INTERNAL SERVER ERROR')
    }
  }

  static async login(req, res) {
    const body = req.body
    let field = null
    let value = null

    if (body.phone) {
      field = 'phone'
      value = body.phone
    } else if (body.username) {
      field = 'username'
      value = body.username
    } else if (body.email) {
      field = 'email'
      value = body.email
    } else {
      return res.status(400).end()
    }

    const user = await db('users').select(['password', 'id', 'phone', 'email', 'username', 'active', 'last_login', 'role'])
      .where({ [field]: value }).first()

    try {
      if (await argon.verify(user.password, body.password)) {
        await db('users').update('last_login', new Date())
          .where({ id: user.id })
        const accessToken = jwt.sign({ user: user.id }, process.env.APP_KEY,
          { algorithm: 'HS256', expiresIn: '1d' })
        delete user.password
        return res.status(200).json({ user, accessToken })
      } else {
        return res.status(400).json({
          status: 400,
          errors: [{ message: 'E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT' }]
        })
      }
    } catch (e) {
      logger.error('Loging Error', { error: e })
      return res.status(500).send('INTERNAL SERVER ERROR')
    }
  }

  static check(req, res) {
    return res.json(req.user)
  }
}