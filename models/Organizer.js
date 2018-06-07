const mongoose = require('mongoose')
const Schema = require('../db/schema')

const Organizer = mongoose.model('Organizer', Schema.organizerSchema)

module.exports = Organizer