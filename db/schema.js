const Schema = require('mongoose').Schema

const articleSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    notes: String,
    url: String,
    photoUrl: String,
})
const organizerSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    dateCreated: Date,
    description: String,
    articles: [articleSchema]

})
const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    password: String,
    photoUrl: String,
    closet: [organizerSchema]
})

module.exports = {
    articleSchema,
    userSchema,
    organizerSchema
}

