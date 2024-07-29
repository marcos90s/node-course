const express = require('express')
const authRouter = require('./routes/auth')
const basicRouter = require('./routes/basic')
const protectedRouter = require('./routes/protected')

const app = express()
app.use(express.json())
app.use('/auth', authRouter)
app.use('/protected', protectedRouter)
app.use(basicRouter)
const PORT = 8080

app.listen(PORT, ()=> console.log('Server iniciated'))