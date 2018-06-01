let mongoose = require('mongoose')
let Schema = mongoose.Schema

let SettingsApplicationSchema = new Schema({
  nameOptions: String,
  valueOptions: String
})

let IndexApplicationSettings = mongoose.model('IndexApplicationSettings', SettingsApplicationSchema);
module.exports = IndexApplicationSettings
