const generator = require('generate-password')

const generatePassword = () => {
  return generator.generate({
    length: 10,
    excludeSimilarCharacters: true,
    numbers: true,
    lowercase: true,
    uppercase: true,
    symbols: true,
    strict: true
  })
}

const generateResetCode = () => {
  return generator.generate({
    length: 6,
    excludeSimilarCharacters: false,
    numbers: true,
    lowercase: true,
    uppercase: false,
    symbols: false,
    strict: false
  })
}

module.exports = {
  generatePassword,
  generateResetCode
}
