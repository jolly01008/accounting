const express = require('express')
const router = express.Router()
const passport = require('passport')

const users = require('./modules/users')
const userController = require('../controllers/user-controller')
const { apiErrorHandler } = require('../middleware/error-handler')
const userLogin = require('../middleware/login-handler')

router.post('/users/login', userLogin, userController.login)

router.use('/users', users)
router.use('/', apiErrorHandler)

module.exports = router
