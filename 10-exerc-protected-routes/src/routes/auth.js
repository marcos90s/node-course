const express = require('express')
const {validateData, validateLogin} = require('../../middlewares/validationMidawares')
const authControler = require('../../controllers/authController')

const authRouter = express.Router()

//Register route
authRouter.post('/register',validateData, authControler.register)
//Login route
authRouter.post('/login', validateLogin, authControler.login)
 
module.exports = authRouter