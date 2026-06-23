require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('./db/db')
const multer = require('multer')
const cors = require('cors')
const user = require('./ruotes/user.ruotes')
const userdata = require('./ruotes/user.data.ruotes')
const UserLogin = require('./controllers/login.controlles')
const google = require('./services/email.services')
const uploadflis = require('./services/imgkits')
const userphoto = require('./ruotes/user.photo.ruotes')
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
))
app.use('/api/user' , userphoto)
app.use('/api/user', user)
app.use('/api/day', user)
app.use('/api/day', user)
app.use("/api/data", userdata)
app.use("/api/user", UserLogin)
app.use('/api', google)
app.use('/api', google)
mongoose()

module.exports = app