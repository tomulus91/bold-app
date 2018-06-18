const userRoutes = require('./users')
const settingsApplicationRoutes = require('./settingsApplication')
const coursesRoutes = require('./courses')

module.exports = function (app, db) {
  userRoutes(app, db),
  settingsApplicationRoutes(app, db),
  coursesRoutes(app, db)
}
