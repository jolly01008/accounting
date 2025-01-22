const express = require('express')
const router = express.Router()
const passport = require('passport')

const users = require('./modules/users')
const userController = require('../controllers/user-controller')
const { apiErrorHandler } = require('../middleware/error-handler')
const userLogin = require('../middleware/login-handler')
const accounting = require('../routes/modules/accounting')

router.post('/users/register', userController.register)
router.post('/users/login', userLogin, userController.login)
router.use('/accounting', accounting)

router.use('/users', users)
router.use('/', apiErrorHandler)

module.exports = router
