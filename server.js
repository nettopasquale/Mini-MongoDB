require('dotenv').config(); // carrega o arquivo .env
const express =  require('express'); 
const app = express() 
const path = require('path'); 
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

//Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger) 

//Handler de checagem das opções de credenciais - antes do CORS!
// e depois faz o fetch dos cookies de credenciais necessários
app.use(credentials);

// cross origin resource sharing 
app.use(cors(corsOptions)); 

// built in middleware para lidar com urlencoded form data
app.use(express.urlencoded({extended: false}));

// built in middleware para lidar com json
app.use(express.json());

//middleware pra cookies
app.use(cookieParser());

//server arquivos estáticos
app.use(express.static(path.join(__dirname, '/public')));

// rotas
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
//middleware pra verificar o JWT
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/api/users'));

// app.use('/')
app.all('*', (req, res)=> {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')){
        res.json({error: "404 Não Encontrado"})
    }else{
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler);

//Agora nossa conexão tb depende de se conectar ao MongoDB! e só precisamos nos conectarmos 1 vez.
mongoose.connection.once('open', ()=>{
    console.log('Conectado ao MongoDB');
    app.listen(PORT, ()=> console.log(`Server rodando no port ${PORT}`));
});

