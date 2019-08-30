const express = require('express')
const app = express()

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

// Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

dotenv.config()

// Connect to DB
mongoose.connect(
  `${process.env.DB_CONNECT}`,
  { useNewUrlParser: true },
  () => console.log('Connected to the database'))
mongoose.Promise = global.Promise

// Middleware
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route Middleware
app.use('/api/user', authRoute)
app.use('/api/user/posts', postRoute)

// Testing end point
app.get('/test', async (req, res) => {
  res.status(200).json({ message: 'Test passed!' })
})

// Handle Global Errors
app.use((req, res, next) => {
  const error = new Error('Not found!')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app
