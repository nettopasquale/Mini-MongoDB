const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    }
})

//o modelo tem que ser exportado usando o .mode, usando um nome string como primeiro argumento e depois o próprio schema
// o Mongo vai por default pegar 'Employee' e transformar em lowercase e no plural
module.exports = mongoose.model('Employee', employeeSchema);