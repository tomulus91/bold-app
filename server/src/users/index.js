const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/users')

let db = mongoose.connection
let Users = require('../../models/users/index')

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
  console.log('Connection Succeeded Users')
})

// Get user
app.get('/users', (req, res) => {
  Users.find({}, 'login name email', function (error, users) {
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
  let newUser = new Users({
    login: req.body.login,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    token: req.body.token
  })

  newUser.save(function (error, user) {
    if (error) {
      console.log(error)
    } else {
      res.send(user)
    }
  })
})

// Delete user
app.delete('/users/:id', (req, res) => {
  Users.remove({
    _id: req.params.id
  }, function (err) {
    if (err) {
      res.send(err)
    } else {
      res.send({
        success: true
      })
    }
  })
})

// Single User
app.get('/single_user/:id', (req, res) => {
  Users.findById(req.params.id, 'login name email token', function (error, user) {
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
  }, 'password token', (error, result) => {
    res.send(result)
  })
})

app.listen(process.env.PORT || 8081)
