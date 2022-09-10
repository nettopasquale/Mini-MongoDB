const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }catch(erro){
        console.error(erro)
    }
}

module.exports = connectDB