import generator from 'generate-password'

export const generatePassword = () => {
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

export const generateResetCode = () => {
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

export const generateEstablishmentCode = () => {
  return generator.generate({
    length: 5,
    excludeSimilarCharacters: false,
    numbers: false,
    lowercase: false,
    uppercase: true,
    symbols: false,
    strict: false
  })
}
