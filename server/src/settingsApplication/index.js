const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/settingsApplication')

let db = mongoose.connection
let SettingsApplication = require('../../models/settingsApplication/index')

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
  console.log('Connection Succeeded Settings Application')
})

// Get all options application
app.get('/settings', (req, res) => {
  SettingsApplication.find({}, function (error, users) {
    if (error) {
      console.error(error)
    }
    res.send({
      settingsApplication: users
    })
  }).sort({_id: -1})
})

// Add new settings
app.post('/add_settings', (req, res) => {
  let newOption = new SettingsApplication({
    nameOptions: req.body.nameOptions,
    valueOptions: req.body.valueOptions
  })

  newOption.save(function (error, option) {
    if (error) {
      console.log(error)
    } else {
      res.send(option)
    }
  })
})

// Single User by login
app.get('/setting_by_name_option/:option', (req, res) => {
  SettingsApplication.find({
    nameOptions: req.params.option
  }, 'valueOptions', function (error, result) {
    error ? res.send(error) : res.send(result)
  })
})

app.listen(process.env.PORT || 8082)
