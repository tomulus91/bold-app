var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    login: String,
    name: String,
    email: String,
    password: String,
    token: String,
    isAdmin: Boolean
});

var Index = mongoose.model('Index', UsersSchema);
module.exports = Index;