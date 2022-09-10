const {format} = require('date-fns');
const { v4: uuid} = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path =  require('path');

const logEvents = async (mensagem, logName) =>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${mensagem}\n`
    console.log(logItem)
    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);

    }
    catch(erro){
        console.error(erro)
    }
}

const logger = (req, res, next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = {logger, logEvents};
// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))

// console.log(uuid())
