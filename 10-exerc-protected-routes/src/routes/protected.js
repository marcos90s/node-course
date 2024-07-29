const express = require('express')
const protectedMiddleware = require('../../middlewares/protectedMiddleware')
const users = require('../model/users')
const protectedController = require('../../controllers/protectedController')

const protectedRouter = express.Router()
//GET/protected/users
protectedRouter.get('/users', protectedMiddleware,protectedController.getAll)
//GET/protected/users/:id
protectedRouter.get('/users/:id', protectedMiddleware, protectedController.getById)
//PUT/protected/users/:id
protectedRouter.put('/users/:id',protectedMiddleware, protectedController.changeUserRole)
//DELETE/protected/users/:id
protectedRouter.delete('/users/:id', protectedMiddleware, protectedController.deleteUser)

module.exports = protectedRouter 