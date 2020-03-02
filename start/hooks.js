const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersRegistered(() => {
  // eslint-disable-next-line
  const Validator = use('Validator')
  const exists = require('../app/Validators/CustomRules/Exists')

  Validator.extend('exists', exists)
})
