const router = require('express').Router()
const tweetCtrl=require('../controllers/tweetCtrl')
const auth=require('../middleware/auth')

router.route('/tweets').post(auth, tweetCtrl.createTweet)
module.exports = router