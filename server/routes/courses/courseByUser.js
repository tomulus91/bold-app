module.exports = function (app, db) {
  // Get all courses save
  app.get('/data/courses-save', (req, res) => {
    db.collection('courses-user').find().toArray((err, result) => {
      if (err) {
        res.send({'error': 'Bad get save courses'})
      } else {
        res.send(result)
      }
    })
  })

  // Get all courses save by token
  app.get('/data/courses-save-user-by-token', (req, res) => {
    const tokenCourse = req.query.tokenCourse
    db.collection('courses-user').find({'course': tokenCourse}).toArray((err, result) => {
      if (err) {
        res.send({'error': 'Bad get save courses'})
      } else {
        res.send(result)
      }
    })
  })

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
      name: req.body.name,
      date: req.body.date,
      status: '0'
    }
    db.collection('courses-user').insert(newCourseForUser)
    res.send(newCourseForUser)
  })

  // Get Single User
  app.get('/data/get-active-course-for-user', (req, res) => {
    const tokenUser = req.query.tokenUser
    db.collection('courses-user').find({'user': tokenUser}).toArray((err, result) => {
      if (err) {
        res.send({'error': 'Bad get course for user'})
      } else {
        res.send(result)
      }
    })
  })
}
