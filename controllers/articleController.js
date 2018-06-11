const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/User')
const Organizer = require('../models/Organizer')

router.get('/', (req, res) => {
    const userId = req.params.userId
    const organizerId = req.params.organizerId
    User.findOne({ userId })
        .then((user) => {
            const organizer = user.organizers.id(organizerId)
            res.render('article/index', {
                user,
                organizer,
                userId,
                organizerId
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router