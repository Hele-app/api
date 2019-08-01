'use strict'

class CreatePoi {
  get rules () {
    return {
      'name': 'required',
      // 'phone': 'required|regex:^0[6-7](\\d{2}){4}$',
      'adress': 'required',
      'code_postal': 'required|number',
      'latitude': 'required',
      'longitude': 'required'
    }
  }
  get messages(){
    return {
      'required':'Error,{{field}} is required',
      'number':'Error, the {{field}} must be a number ',
      'regex':'Error, the {{fiels}} must be a valid number phone'
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
    .flashAll()
  }
}

module.exports = CreatePoi
