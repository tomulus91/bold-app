module.exports = function (app, db) {

  // Get all courses in application
  app.get('/data/courses', (req, res) => {
    db.collection('courses').find({}).sort([['_id', -1]]).toArray((err, result) => {
      if (err) {
        res.send({'error': 'Bad get courses'})
      } else {
        res.send(result)
      }
    })
  })

  // Add course
  app.post('/data/add-course', (req, res) => {
    const newCourse = {
      name: req.body.courseName,
      address: req.body.courseAddress,
      link: req.body.courseLink,
      type: req.body.courseType,
      price: req.body.coursePrice,
      token: req.body.courseToken,
      information: req.body.courseInformation,
      begin: req.body.courseStartDate,
      duration: req.body.courseDuration
    }
    db.collection('courses').insert(newCourse)
    res.send(newCourse)
  })
}
