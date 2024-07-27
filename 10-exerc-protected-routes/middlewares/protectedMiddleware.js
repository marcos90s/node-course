const jwt = require('jsonwebtoken')
const users = require("../src/model/users")
const { secretKey } = require('../src/routes/auth')

const protectedMiddleware = (req,res, next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({message: `Auth Token is required`})
    }

    const token = authHeader.split(' ')[1]

    try{
        const verifiedToken = jwt.verify(token, secretKey)
        const user = users.find(user => user.email === verifiedToken.email)

        if(!user){
            return res.status(401).json({message: 'Invalid User'})
        }else if(user.role !== 'admin'){
            return res.status(401).json({message: 'Unauthorized User'})
        }

        req.authenticatedUser = user
        next()
        
    }catch(error){
        console.log(error)
        return res.status(401).json({ message: 'Invalid token' })
    }
}

module.exports = protectedMiddleware
