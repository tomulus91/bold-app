var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SettingsApplicationSchema = new Schema({
  nameOptions: String,
  valueOptions: String
});

var IndexApplicationSettings = mongoose.model('IndexApplicationSettings', SettingsApplicationSchema);
module.exports = IndexApplicationSettings;