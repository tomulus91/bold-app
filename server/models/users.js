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

var Users = mongoose.model("Users", UsersSchema);
module.exports = Users;