'use strict'

import twilio from 'twilio'
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN
const helePhone = process.env.TWILIO_PHONE

export const sendSMS = async (body, to) => {
  try {
    const client = twilio(accountSid, authToken)
    await client.messages
      .create({ body: body, from: helePhone, to: to })
  } catch (e) {
    console.log(e)
  }
}
