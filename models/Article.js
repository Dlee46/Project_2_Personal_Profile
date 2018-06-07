const mongoose = require('mongoose')
const Schema = require('../db/schema')

const Article = mongoose.model('Article', Schema.articleSchema)

module.exports = Article