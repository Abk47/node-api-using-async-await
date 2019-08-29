const router = require('express').Router()
const userController = require('../controllers/user')

router.post('/register', userController.usersRegister)

router.post('/login', userController.usersLogin)

module.exports = router
