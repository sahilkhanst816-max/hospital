const express = require('express')
const ruotes = express.Router()
const photo = require('../controllers/user.photo.controlles')
const multer = require('multer')
const imgkit = require('../services/imgkits')
const upload = multer({ storage: multer.memoryStorage() })
ruotes.post('/photo/:index', upload.single('img'), photo)

module.exports = ruotes