const express = require('express')
const router = express.Router()
const loginUser = require('../controllers/login.controlles') 
router.post('/login', loginUser)
module.exports = router