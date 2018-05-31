var passwordHash = require('password-hash')

export default {
  generatePassword (password) {
    return passwordHash.generate(password)
  },
  verifyPassword (password, hashedPassword) {
    return passwordHash.verify(password, hashedPassword)
  }
}
