'use strict'

class CreatePoi {
  get rules () {
    return {
      'name': 'required',
      'phone': 'required',
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
   
  }
}

module.exports = CreatePoi
