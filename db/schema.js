const schema = require('mongoose').Schema

const userSchema = new Schema({
    name: String,
    password: String
})

const organizerSchema = new Schema({
    title: String,
    dateCreated: Date,
    description: String,
    articles: []

})

const articleSchema = new Schema({
    title: String,
    notes: String,
    url: String,
    photoUrl: String,
})

module.exports = {
    articleSchema,
    userSchema,
    organizerSchema
}

