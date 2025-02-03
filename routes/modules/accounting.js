const express = require('express')
const router = express.Router()
const accountingController = require('../../controllers/accounting-controller')
const passport = require('passport')
const authenticated = require('../../middleware/auth')

router.delete('/:userId/:gpId/:recordId/deleteRecord', authenticated, accountingController.deleteRecord)
router.put('/:userId/:gpId/:recordId/putRecord', authenticated, accountingController.putRecord)
router.post('/:userId/:gpId/countRecord', authenticated, accountingController.countRecord)
router.post('/:userId/:gpId/addRecord', authenticated, accountingController.addRecord)
router.post('/:userId/addGroup', authenticated, accountingController.addGroup)

module.exports = router