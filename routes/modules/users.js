const express = require('express')
const router = express.Router()

const authenticated = require('../../middleware/auth')

const userController = require('../../controllers/user-controller')

router.get('/:userId/groups/:gpId', authenticated, userController.getUserGroup)
router.get('/:userId', authenticated, userController.getUser)

module.exports = router