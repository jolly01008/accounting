const express = require('express')
const router = express.Router()
const passport = require('passport')

const users = require('./modules/users')
const userController = require('../controllers/user-controller')

router.post('/users/login', passport.authenticate('local',{session: false}), userController.login)

router.use('/users', users)

module.exports = router
