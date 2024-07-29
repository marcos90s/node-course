const {users} = require("../src/model/users")
//Middleware to validate data
const validateData = (req, res, next)=>{
    const {username, email, password} = req.body
    const userEmail = users.find(userEmail => userEmail.email == email)

    if(typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string'){
        console.log('Invalid data type')
        return res.status(400).json({message: 'Invalid data type'})
    }else if(userEmail){
        console.log('Email unavaiable')
        return res.status(400).json({message: 'Email unavaiable'})
    }else{
        console.log('Server message: Data are valid')
        next()
    }
}
//Middleware to validate login
const validateLogin = (req, res, next)=>{
    const {email, password} = req.body
    const user = users.find(user => user.email === email)
    if(!user || user.password !== password){
        return res.status(401).json({message: 'Invalid Credentials'})
    }else{
        next()
    }
}

module.exports = {
    validateData,
    validateLogin
}