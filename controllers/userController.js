const mongoose = require('mongoose')
const router = express.router()
const User = require('../models/User')

router.get('/', (req, res) => {
    User.find()
})

module.exports = router