module.exports = function (app, db) {

  // Get all courses in application
  app.get('/data/courses', (req, res) => {
    db.collection('courses').find({}).toArray((err, result) => {
      if (err) {
        res.send({'error': 'Bad get courses'})
      } else {
        res.send(result)
      }
    })
  })
}