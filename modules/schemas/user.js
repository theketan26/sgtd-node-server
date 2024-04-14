const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: Number
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    User
};