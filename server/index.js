const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const mainConfig = require('./config')
const dbConfig = require('./config/db')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

MongoClient.connect(dbConfig.url, (err, database) => {
  if (err) return console.log(err)
  let db = database.db(dbConfig.name)
  console.log('connect mogno')
  require('./routes')(app, db)

  app.listen(mainConfig.port, () => {
    console.log('Database start on port: ' + mainConfig.port)
  })
})

