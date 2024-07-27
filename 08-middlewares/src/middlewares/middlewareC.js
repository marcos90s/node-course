module.exports = function (req, res, next){
    console.log('executando middleware c')
    req.middlewareC = 'OK'
    next()
}