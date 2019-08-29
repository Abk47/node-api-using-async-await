const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const { registerValidation, loginValidation } = require('../validation')

exports.usersRegister = async (req, res) => {

  // VALIDATING DATA BEFORE USER IS CREATED USING IMPORTED JOI VALIDATION FILE
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Checking if the user's email is already in the database
  const emailExists = await User.findOne({ email: req.body.email }).exec()
  if (emailExists) return res.status(422).send('Email already exists!')

  // HASHING Passwords
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // Creates a new USER if there's no error after validation
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  try {
    const savedUser = await user.save()
    res.status(201).send({ user: savedUser._id })
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.usersLogin = async (req, res) => {
  // VALIDATING DATA BEFORE USER IS LOGGED IN USING IMPORTED JOI VALIDATION FILE
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
 
  // Checking if the user's email is valid or exists in the database
  const user = await User.findOne({ email: req.body.email }).exec()
  if (!user) return res.status(401).send('Invalid Email or Password')
  
  // Checking if PASSWORD is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(401).send('Invalid Email or Password')
  
  // Create and assign a JSON Web token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
  res.header('auth-token', token).send(token)
}