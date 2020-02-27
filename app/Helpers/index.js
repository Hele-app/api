'use strict'

const generatePassword = (length = 10) => {
  return (Math.random().toString(36).substr(2, 1 + length / 2) +
    Math.random().toString(36).substr(2, 1 + length / 2)).slice(-length)
}

module.exports = {
  generatePassword
}
