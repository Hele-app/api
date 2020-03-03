'use strict'

// eslint-disable-next-line
const Env = use('Env')

const accountSid = Env.get('TWILIO_SID')
const authToken = Env.get('TWILIO_TOKEN')
const helePhone = Env.get('TWILIO_PHONE')
const twilio = require('twilio')

const generatePassword = (length = 10) => {
  return (Math.random().toString(36).substr(2, 1 + length / 2) +
    Math.random().toString(36).substr(2, 1 + length / 2)).slice(-length)
}

/* istanbul ignore next */
const sendSMS = async (username, phone, password) => {
  try {
    const client = twilio(accountSid, authToken)
    const message = await client.messages
      .create({ body: `Salut ${username} !\n Bienvenu sur Hélé. Ton mot de passe pour te connecter est ${password}. A bientôt sur Hélé !`, from: helePhone, to: phone })
  }
  catch (e) {
    console.log(e)
  }
}

module.exports = {
  generatePassword,
  sendSMS
}
