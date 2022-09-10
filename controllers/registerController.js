const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const {user, password} = req.body;
    if (!user || ! password) return res.status(400).json({"message": "Usuário e senha são obrigatórios."});

    //checar por usuários duplicados. exec é necessário por ser uma callback de async
    const duplicate = await User.findOne({username: user}).exec();
    if (duplicate) return res.sendStatus(409); // Conflito
    //se duplicato n existir:
    try{
        // encryptar a senha
        const hashedPassword = await bcrypt.hash(password, 10);
        // guarda e salva o usuario
        const result = await User.create({
            "username": user, 
            "password": hashedPassword
        });
        
        console.log(result)
        res.status(201).json({"message": `Novo usuário ${user} criado com sucesso!`})
    }
    catch(erro){
        res.status(500).json({'message': erro.message})
    }
}

module.exports = {
    handleNewUser
};