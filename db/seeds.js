require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User')
const Organizer = require('../models/Organizer')
const Article = require('../models/Article')

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected MONGO')
    })
    .catch((err) => {
        console.log('ERROR', err)
    })

User.remove()
    .then(() => {

        const testArticle = new Article({
            title: "Spirited Away",
            notes: "In this animated feature by noted Japanese director Hayao Miyazaki, 10-year-old Chihiro (Rumi Hiiragi) and her parents (Takashi Naitô, Yasuko Sawaguchi) stumble upon a seemingly abandoned amusement park. After her mother and father are turned into giant pigs, Chihiro meets the mysterious Haku (Miyu Irino), who explains that the park is a resort for supernatural beings who need a break from their time spent in the earthly realm, and that she must work there to free herself and her parents.",
            url: "https://en.wikipedia.org/wiki/Spirited_Away",
            photoUrl: "https://static1.squarespace.com/static/509155d3e4b0979eac7754e1/t/59248f2207eaa0ad034044a9/1495568191971/Spirited+Away+The+Next+Reel+Film+Podcast?format=1500w"
        })

        const testOrganizer = new Organizer({
            title: "Movies",
            dateCreated: 6 / 7 / 18,
            description: "movies I love",
            articles: [testArticle]
        })
        const testUser = new User({
            name: "Danny",
            userId: "Blah",
            organizers: [testOrganizer]
        })

        const users = [testUser]

        return User.insertMany(users)
    })
    .then(() => {
        console.log('mongoDB created')
        mongoose.connection.close()
    })

