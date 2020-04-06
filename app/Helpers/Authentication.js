'use strict'

// eslint-disable-next-line
const Env = use('Env')

const accountSid = Env.get('TWILIO_SID')
const authToken = Env.get('TWILIO_TOKEN')
const helePhone = Env.get('TWILIO_PHONE')
const twilio = require('twilio')

/* istanbul ignore next */
const sendSMS = async (body, to) => {
  try {
    const client = twilio(accountSid, authToken)
    await client.messages
      .create({ body: body, from: helePhone, to: to })
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  sendSMS
}
