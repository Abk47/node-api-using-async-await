const router = require('express').Router()

// Auth token check
const verify = require('../middleware/check-auth')

const postController = require('../controllers/post')

router.get('/', verify, postController.postUserPosts)

module.exports = router
