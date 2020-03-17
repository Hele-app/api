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
const sensTextMessage = async (body, to) => {
  try {
    const client = twilio(accountSid, authToken)
    await client.messages
      .create({ body: body, from: helePhone, to: to })
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  generatePassword,
  sensTextMessage
}
