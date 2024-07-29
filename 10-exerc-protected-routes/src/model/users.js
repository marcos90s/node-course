const users = [{
    id: 1,
    username: 'Marcos',
    email: 'marcos@gmail.com',
    password: '123456',
    role: 'admin'
}]

module.exports = {
    users,
    findAll: () => users,
    findUserById: (id) => users.find(user => user.id === id),
    registerUser: (username, email, password)=>{
        const newUser = {
            id: Math.floor(Math.random()*999999),
            username,
            email,
            password,
            role: 'standard'
        }
        users.push(newUser)
        return newUser
    },
    deleteUserById: (id) =>{
        const userIndex = users.findIndex(user => user.id === +id)
        if(userIndex === -1) return null
        const [deletedUser] = users.splice(userIndex, 1)
        return deletedUser
    },
    updateUserRole: (id)=>{
        const user = users.find(user => user.id === +id)
        if(!user) return null
        user.role = 'admin'
        return user
    }
}