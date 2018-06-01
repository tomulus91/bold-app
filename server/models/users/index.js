let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UsersSchema = new Schema({
  login: String,
  name: String,
  email: String,
  password: String,
  token: String
})

let Index = mongoose.model('Index', UsersSchema)
module.exports = Index
