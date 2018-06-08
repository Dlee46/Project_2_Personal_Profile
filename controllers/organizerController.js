const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/User')

// index
router.get('/', (req, res) => {
    console.log("ready")
    const userId = req.params.userId
    User.findOne({ userId })
        .then((user) => {
            res.render('organizer/index', {
                userId,
            })
        })
        .catch((err) => {
            console.log(err)
        })
})
// new
router.get('/new', (req, res) => {
    const userId = req.params.userId
    res.render('organizer/new', {
        userId
    })
})
// create 
router.post('/', (req, res) => {
    const userId = req.params.userId
    const newOrganizer = req.body
    User.findOne({ userId })
        .then((user) => {
            user.organizer.push(newOrganizer)
            return user.save()
        })
        .then(() => {
            res.redirect(`/user/${userId}/organizer`)
        })
        .catch((err) => {
            console.log(err)
        })
})
// show
router.get('/:organizerId', (req, res) => {
    const userId = req.params.userId
    const organizerId = req.params.organizerId
    User.findOne({ userId })
        .then((user) => {
            const organizer = user.organizers.id(organizerId)
            res.render('organizer/show')
        })
        .catch((err) => {
            console.log(err)
        })
})
// delete
router.get('/:organizerId/delete', (req, reors) => {
    const userId = req.params.userId
    const organizerId = req.params.organizerId
    User.findOneAndRemove(organizerId)
        .then(() => {
            res.redirect(`/user/${userid}/organizer`)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router