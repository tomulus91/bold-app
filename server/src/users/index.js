const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/users')

var db = mongoose.connection
var Users = require('../../models/users/index')

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  console.log('Connection Succeeded Users')
});

// Get user
app.get('/users', (req, res) => {
  Users.find({}, 'login name email password token isAdmin', function (error, users) {
    if (error) {
      console.error(error)
    }
    res.send({
      users: users
    })
  }).sort({_id: -1})
})

// Add new user
app.post('/add_users', (req, res) => {
  var new_post = new Users({
    login: req.body.login,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    token: req.body.token,
    isAdmin: req.body.isAdmin
  })

  new_post.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Delete user
app.delete('/users/:id', (req, res) => {
  Users.remove({
    _id: req.params.id
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

// Single User
app.get('/single_user/:id', (req, res) => {
  Users.findById(req.params.id, 'login name email token isAdmin', function (error, user) {
    if (error) {
      console.error(error)
    }
    res.send(user)
  })
})

// Update user
app.put('/update_user/:id', (req, res) => {
  Users.findById(req.params.id, 'login name email', function (error, user) {
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
app.get('/login_user/:login', (req, res) => {
  Users.findOne({
    login: req.params.login
  }, 'password token', function (error, result) {
    res.send(result)
  })
})

app.listen(process.env.PORT || 8081)
