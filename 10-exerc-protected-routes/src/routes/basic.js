const express = require('express')
const authMiddleware = require('../../middlewares/authMiddleware')

const basicRouter = express.Router()

basicRouter.get('/', authMiddleware,(req,res)=>{
    res.json({message: `Welcome to Our Website, ${req.authenticatedUser.username}`})
})

module.exports = basicRouter