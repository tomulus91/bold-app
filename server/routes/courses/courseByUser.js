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
      status: 0
    }
    db.collection('courses-user').insert(newCourseForUser)
    res.send(newCourseForUser)
  })

  // Get Course By Single User
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

  // Update single save course
  app.post('/data/update-save-course', (req, res) => {
    const query = {course: req.body.courseToken, user: req.body.userToken}
    const newValues = {
      $set: {
        status: req.body.type === 'accept' ? 1 : -1
      }
    }
    db.collection('courses-user').update(query, newValues, (error, course) => {
      if (error) {
        console.log(error)
      }
      res.send(course)
    })
  })

  // Delete save course
  app.post('/data/remove-save-course', (req, res) => {
    db.collection('courses-user').deleteOne({course: req.body.params.token}, (err) => {
      if (err) throw err
      res.send(true)
    })
  })

  // Delete save course single
  app.post('/data/remove-save-course-single', (req, res) => {
    db.collection('courses-user').deleteOne({course: req.body.params.token, user: req.body.params.user}, (err) => {
      if (err) throw err
      res.send(true)
    })
  })
}
