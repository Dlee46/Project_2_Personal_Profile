const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/User')

// Index
router.get('/', (req, res) => {
    User.find({})
        .then(() => {
            res.render('user/index')
        })
        .catch((err) => {
            console.log(err)
        })
})
// router.post('/userId', (req, res) => {
//     const madeUser = req.body
//     User.findById(madeUser)
//         .then((user) => {
//             res.redirect(`/user/${user.userId}/organizer`)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })
// Create (idea came from wdi project 2 example)
router.post('/new', (req, res) => {
    console.log("Working")
    const newUser = req.body
    console.log(newUser)
    User.create(newUser)
        .then((user) => {
            console.log(user)
            res.redirect(`/user/${user.userId}/organizer`)
        })
        .catch((err) => {
            console.log(err)
        })
})
module.exports = router