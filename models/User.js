const mongoose = require('mongoose')
const Schema = require('../db/schema')

const User = mongoose.model('User', Schema.userSchema)

module.exports = User