const userRoutes = require('./users')
const settingsApplicationRoutes = require('./settingsApplication')
const coursesRoutes = require('./courses')
const coursesByUserRoutes = require('./courses/courseByUser')

module.exports = function (app, db) {
  userRoutes(app, db),
  settingsApplicationRoutes(app, db),
  coursesRoutes(app, db)
  coursesByUserRoutes(app, db)
}
