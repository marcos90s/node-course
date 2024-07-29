const jwt = require('jsonwebtoken')
const {users, registerUser} = require('../src/model/users')
const { JWT_SECRET } = require('../config/environment')

module.exports = {
    register: (req, res)=>{
        const {username, email, password} = req.body
        const registeredUser = registerUser(username, email, password)
        res.status(201).json(registeredUser)
    },
    login: (req, res)=>{
        const {email} = req.body
        const user = users.find(user => user.email === email)
        const payload = { email }
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'})
        res.status(200).json({message: `Welcome, ${user.username}
    Here is your token: ${token}`})
    }
}