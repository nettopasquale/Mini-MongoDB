const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) =>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){ // se o dominio n está na lista, origin aqui é apenas durante o desenvolvimento
            callback(null, true)
        }else{
            callback(new Error('Não permitido pelo CORS'))
        }
    },
    optionsSucessStatus: 200
}

module.exports = corsOptions;