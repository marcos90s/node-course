const users = require("../src/model/users")

module.exports ={
    getAll: (req, res) =>{
        res.status(200).json(users.findAll())
    },
    getById: (req, res)=>{
        const {id} = req.params
        const user = users.findUserById(+id)
        if(!user){
        return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json(user)
    },
    changeUserRole: (req, res)=>{
        const {id} = req.params
        const user = users.updateUserRole(+id)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json(`User role changed to admin: ${user}`)
    },
    deleteUser: (req, res)=>{
        const {id} = req.params
        const user = users.deleteUserById(+id)
        if(!user){
            return res.status(404).json({message: 'User not found'})   
        }
        res.status(200).json({message: 'User was delected'})
    }
}
