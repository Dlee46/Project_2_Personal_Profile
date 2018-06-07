const mongoose = require('mongoose')
const router = express.router({ mergeParams: true })
const User = require('../models/User')


router.get('/', (req, res) => {
    const userId = request.params.userId
    User.findById(userId)
        .then((user) => {
            res.render('organizer/index', {
                userId
            })
        })
        .catch((err) => {
            console.log(err)
        })
})
router.get('/new', (req, res) => {
    // const userId = req.params.userId
    res.render('organizer/new'
        // userId
    )
})