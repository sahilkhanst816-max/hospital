const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.patient.controllera')

router.get('/patient', userController)

module.exports = router