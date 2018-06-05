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
  app.post('/data/add_users', (req, res) => {
    const newUser = {
      login: req.body.login,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      token: req.body.token
    }
    db.collection('users').insert(newUser, (err, res) => {
      if (err) throw err
      res.send(newUser)
      db.close()
    })
  })

  // Delete user
  app.delete('/data/users/:id', (req) => {
    db.collection('users').remove({_id: req.params.id}, (err, res) => {
      if (err) throw err
      res.send(true)
      db.close()
    })
  })

// Single User
  app.get('/data/single_user/:id', (req, res) => {
    db.collection('users').findById(req.params.id, 'login name email token', function (error, user) {
      if (error) {
        console.error(error)
      }
      res.send(user)
    })
  })

// Update user
  app.put('/data/update_user/:id', (req, res) => {
    db.collection('users').findById(req.params.id, 'login name email', function (error, user) {
      if (error) {
        console.error(error)
      }
      user.login = req.body.login
      user.email = req.body.email
      user.name = req.body.name
      user.password = req.body.password
      user.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true
        })
      })
    })
  })

// Single User by login
  app.get('/data/login_user/:login', (req, res) => {
    db.collection('users').findOne({
      login: req.params.login
    }, 'password token', (error, result) => {
      res.send(result)
    })
  })
}
