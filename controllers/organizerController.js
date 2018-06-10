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
                user
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
    console.log(userId)
    const newOrganizer = req.body
    User.findOne({ userId })
        .then((user) => {
            console.log('in then')
            user.organizers.push(newOrganizer)
            return user.save()
        })
        .then(() => {
            res.redirect(`/user/${userId}/organizer`)
            userId
        })
        .catch((err) => {
            console.log(err)
        })
})
// edit
router.get('/:organizerId/edit', (req, res) => {
    const userId = req.params.userId
    const organizerId = req.params.organizerId
    User.findOne({ userId })
        .then((user) => {
            res.render('/organizer/edit', {
                user,
                userId,
                organizerId
            })
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
router.delete('/:organizerId/delete', (req, res) => {
    console.log("inside delete")
    const userId = req.params.userId
    const organizerId = req.params.organizerId
    console.log("Hi")
    User.findOneAndRemove(organizerId)
        .then(() => {
            res.redirect(`/user/${userId}/organizer`, {
                user,
                userId,
                organizerId
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router