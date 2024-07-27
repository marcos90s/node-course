const jwt = require('jsonwebtoken')
const users = require("../src/model/users")
const { secretKey } = require('../src/routes/auth')

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(200).json({message: `Welcome, Guest`})
    }
    const token = authHeader.split(' ')[1]
    console.log("token: "+token)
    try{
        const verifiedToken = jwt.verify(token, secretKey)
        const user = users.find(user => user.email === verifiedToken.email)
        if(!user){
            return res.status(401).json({message: 'Invalid User'})
        }
        req.authenticatedUser = user
        next()
    }catch(error){
        console.log(error)
        return res.status(401).json({ message: 'Invalid token' })
    }
}

module.exports = authMiddleware