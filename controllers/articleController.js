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
// new
router.get('/new', (req, res) => {
    const userId = req.params.userId
    const organizerId = req.params.organizerId
    res.render('article/new', {
        userId,
        organizerId
    })
})
// create 
router.post('/', (req, res) => {
    const userId = req.params.userId
    const organizerId = req.params.organizerId
    const newArticle = req.body
    console.log('poop')
    User.findOne({ userId })
        .then((user) => {
            const organizer = user.organizers.id(organizerId)
            organizer.articles.push(newArticle)
            return user.save()
        })
        .then(() => {
            res.redirect(`/user/${userId}/organizer/${organizerId}/article`)
        })
        .catch((err) => {
            console.log(err)
        })
})
// edit
router.get('/:articleId/edit', (req, res) => {
    const userId = req.params.userId
    const organizerId = req.params.organizerId
    const articleId = req.params.articleId
    User.findOne({ userId })
        .then((user) => {
            const organizer = user.organizers.id(organizerId)
            const article = organizer.articles.id(articleId)
            res.render('article/edit', {
                user,
                userId,
                organizer,
                organizerId,
                article,
                articleId
            })
        })
        .catch((err) => {
            console.log(err)
        })
})
//update
router.put('/:articleId', (req, res) => {
    const userId = req.params.userId
    const organizerId = req.params.organizerId
    const articleId = req.params.articleId
    User.findOne({ userId })
        .then((user) => {
            console.log('UPDATE IS WORKING!!')
            const organizer = user.organizers.id(organizerId)
            const article = organizer.articles.id(articleId)
            article.title = req.body.title
            article.notes = req.body.notes
            article.photoUrl = req.body.photoUrl
            article.url = req.body.url
            return user.save()
        })
        .then((updatedArticle) => {
            res.redirect(`/user/${userId}/organizer/${organizerId}/article/${articleId}`)
            console.log(updatedArticle)
        })
        .catch((err) => {
            console.log(err)
        })
})
// show
router.get('/:articleId', (req, res) => {
    const userId = req.params.userId
    const organizerId = req.params.organizerId
    const articleId = req.params.articleId
    User.findOne({ userId })
        .then((user) => {
            const organizer = user.organizers.id(organizerId)
            const article = organizer.articles.id(articleId)
            res.render('article/show', {
                organizerId,
                userId,
                organizer,
                article,
                articleId
            })

        })
        .catch((err) => {
            console.log(err)
        })
})
// delete
router.delete('/:articleId', (req, res) => {
    const userId = req.params.userId
    const organizerId = req.params.organizerId
    const articleId = req.params.articleId
    console.log("organizer id is: " + organizerId)
    User.findOne({ userId })
        .then((user) => {
            console.log("1 " + user)
            console.log("2 " + user.organizers.id(organizerId))
            console.log("3 " + user.organizers.id(organizerId).articles.id(articleId))
            user.organizers.id(organizerId).articles.id(articleId).remove()
            return user.save()
        })
        .then(() => {
            res.redirect(`/user/${userId}/organizer/${organizerId}/article`)
        })
        .catch((err) => {
            console.log(err)
        })
})
module.exports = router