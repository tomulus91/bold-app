module.exports = function (app, db) {
  // Get all courses for users
  app.get('/data/courses-user', (req, res) => {
    db.collection('courses-user').find({}).toArray((err, result) => {
      if (err) {
        res.send({'error': 'Bad get courses'})
      } else {
        res.send(result)
      }
    })
  })

  // Add course for user
  app.post('/data/add-course-for-user', (req, res) => {
    const newCourseForUser = {
      user: req.body.user,
      course: req.body.course,
      status: '0'
    }
    db.collection('courses-user').insert(newCourseForUser)
    res.send(newCourseForUser)
  })

}