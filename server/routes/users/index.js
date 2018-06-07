module.exports = function (app, db) {
  // Get user
  app.get('/data/users', (req, res) => {
    db.collection('users').find({}).toArray((err, result) => {
      if (err) {
        res.send({ 'error': 'Bad get users' })
      } else {
        res.send(result)
      }
    })
  })

  // Add new user
  app.post('/data/add-users', (req, res) => {
    const newUser = {
      login: req.body.login,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      token: req.body.token
    }
    db.collection('users').insert(newUser)
    res.send(newUser)
  })

  // Update user
    app.post('/data/update-user', (req, res) => {
      const query = {token: req.body.token}
      const newValues = {$set: {
              name: req.body.name,
              login: req.body.login,
              email: req.body.email
          }}
        db.collection('users').update(query, newValues,(error, user) => {
            if (error) {
                console.log(error)
            }
            res.send(user)
        })
    })

    // Get Single User
    app.get('/data/single-user', (req, res) => {
        const token = req.query.token
        db.collection('users').findOne({'token': token}, (err, result) => {
            if (err) {
                res.send({ 'error': 'Bad get single users' })
            } else {
                res.send(result)
            }
        })
    })

  // Delete user
  app.post('/data/delete-users', (req, res) => {
    console.log(req.body.params.token)
    db.collection('users').deleteOne({token: req.body.params.token}, (err) => {
      if (err) throw err
      res.send(true)
    })
  })

// Single User by login
  app.get('/data/login-user', (req, res) => {
      const login = req.query.login
      db.collection('users').findOne({'login': login}, (err, result) => {
          if (err) {
              res.send({ 'error': 'Bad login user' })
          } else {
              res.send(result)
          }
      })
  })
}
