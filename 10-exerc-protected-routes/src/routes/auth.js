const express = require('express')
const jwt = require('jsonwebtoken')
const users = require('../model/users')
const {validateData, validateLogin} = require('../../middlewares/validationMidawares')


const authRouter = express.Router()
const secretKey = 'Jaming'
//Register route
authRouter.post('/register',validateData,(req, res)=>{
    const {username, email, password} = req.body
    const user = {id: Math.floor(Math.random()*99999),username, email, password, role:'Common'}
    users.push(user)
    res.status(201).json(user)
})
//Login route
authRouter.post('/login', validateLogin, (req, res)=>{
    const {email} = req.body
    const user = users.find(user => user.email === email)
    const payload = { email }
    const token = jwt.sign(payload, secretKey, {expiresIn: '1h'})
    res.status(200).json({message: `Welcome, ${user.username}
Here is your token: ${token}`})
})
 
module.exports = {authRouter, secretKey}