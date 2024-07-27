const express = require('express')
const middlewareC = require('./middlewares/middlewareC')
const uploadMiddlewares = require('./middlewares/upload-middleware')

const app = express()

app.use(express.static('public'))

app.post('/upload', uploadMiddlewares.single('image'), (req, res)=>{
    console.log(req.file, req.body)
    res.json({message: 'Arquivo salvo'})
})

/* app.use(function (req, res, next){
    req.middlewareA = 'OK!'
    next()
})

function middlewareB (req, res, next){
    req.middlewareB = 'OK!'
    next()
}

app.get('/teste', (req, res) =>{
    console.log({a: req.middlewareA, b: req.middlewareB})
    throw new Error('Algo deu errado :(')
    res.end()
})

app.get('/testeB',middlewareC, middlewareB, (req, res) =>{
    console.log({a: req.middlewareA, b: req.middlewareB})
    res.end()
})

app.use(function(err, req, res, next){
    if(err){
        console.log(err.message)
        res.status(400).end()
    }else{
        next()
    }
}) */

const PORT = 8080

app.listen(PORT, ()=> console.log('Server iniciado'))
