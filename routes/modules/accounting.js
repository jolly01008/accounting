const express = require('express')
const router = express.Router()
const accountingController = require('../../controllers/accounting-controller')
const passport = require('passport')
const authenticated = require('../../middleware/auth')

router.put('/:userId/:gpId/:recordId/putRecord', authenticated, accountingController.putRecord)
router.post('/:userId/:gpId/countRecord', authenticated, accountingController.countRecord)
router.post('/:userId/:gpId/addRecord', authenticated, accountingController.addRecord)

module.exports = router