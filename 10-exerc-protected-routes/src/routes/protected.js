const express = require('express')
const protectedMiddleware = require('../../middlewares/protectedMiddleware')
const users = require('../model/users')

const protectedRouter = express.Router()
//GET/protected/users
protectedRouter.get('/users', protectedMiddleware,(req, res)=>{
    res.status(200).json(users)
})
//GET/protected/users/:id
protectedRouter.get('/users/:id', protectedMiddleware,(req, res)=>{
    const {id} = req.params
    const user = users.find(user => user.id === +id)
    if(!user){
        return res.status(404).json({message: 'User not found'})
    }
    res.status(200).json(user)
})
//PUT/protected/users/:id
protectedRouter.put('/users/:id',protectedMiddleware, (req,res)=>{
    const {id} = req.params
    const user = users.find(user => user.id === +id)
    if(!user){
        return res.status(404).json({message: 'User not found'})
    }
    user.role = 'admin'
    res.status(200).json(`User role changed to admin: ${user}`)
})
//DELETE/protected/users/:id
protectedRouter.delete('/users/:id', protectedMiddleware, (req, res)=>{
    const {id} = req.params
    const userIndex = users.findIndex(user => user.id === +id)
    if(userIndex === -1){
        return res.status(404).json({message: 'User not found'})
    }
    users.splice(userIndex, 1)
    res.status(204).end()
})


module.exports = protectedRouter