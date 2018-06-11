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
    User.findOne({ userId })
        .then((user) => {
            user.organizers.articles.push(newArticle)
            console.log(user.organizers.articles)
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
router.get('/:article/edit', (req, res) => {
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
    const articleId = req.params.organizedId
    User.findOne({ userId })
        .then((user) => {
            const organizer = user.organizers.id(organizerId)
            const article = organizer.articles.id(articleId)
            article.title = req.body.title
            article.description = req.body.notes
            return user.save()
        })
        .then((updatedArticle) => {
            res.redirect(`/user/${userId}/organizer/${organizerId}/article`)
            console.log(updatedArticle)
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
    const articleId = req.params.articleId
    const userId = req.params.userId
    const organizerId = req.params.organizerId
    User.findOne({ userId })
        .then((user) => {
            const organizer = user.organizers.id(organizerId)
            const article = organizer.articles.id(articleId).remove()
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