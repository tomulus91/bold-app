const userRoutes = require('./users')
const settingsApplicationRoutes = require('./settingsApplication')

module.exports = function (app, db) {
  userRoutes(app, db),
  settingsApplicationRoutes(app, db)
}
