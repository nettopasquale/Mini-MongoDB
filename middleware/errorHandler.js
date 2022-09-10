const {logEvents} = require('./logEvents')

const errorHandler = (erro, req, res, next)=>{
    logEvents(`${erro.name}: ${erro.message}`, 'erroLog.txt')
    console.error(erro.stack);
    res.status(500).send(erro.message);
}

module.exports = errorHandler;