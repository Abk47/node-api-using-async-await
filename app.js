const express = require('express')
const app = express()

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

// Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

dotenv.config()

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () => console.log('Connected to the database'))
mongoose.Promise = global.Promise

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route Middleware
app.use('/api/user', authRoute)
app.use('/api/user/posts', postRoute)

module.exports = app
