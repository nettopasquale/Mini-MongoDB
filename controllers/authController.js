const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async(req, res)=>{
    const {user, password} = req.body;
    if (!user || ! password) return res.status(400).json({"message": "Usuário e senha são obrigatórios."});
    const foundedUser = await User.findOne({username: user}).exec()
    if(!foundedUser) return res.sendStatus(401); // Não autorizado
    //caso usuário seja encontrado:
    const match = await bcrypt.compare(password, foundedUser.password);
    //definir as funções
    const roles = Object.values(foundedUser.roles);
    if(match){
        // NCriando JWTs
        const acessToken = jwt.sign(
            { 
                "UserInfo": {
                    "username": foundedUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '60s'}
        )
        const refreshToken = jwt.sign(
            {"username": foundedUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '365d'}
        );
        //Salvando o refreshToken com o atual usuário
        foundedUser.refreshToken = refreshToken;
        const result = await foundedUser.save();
        console.log(result);

        //cookie não disponível em javascript, não 100% seguro mas mais q o local
        // secure = true para teste no Chrome, mas para salvar e criar cookies no thunderclient, ele n é necessário
        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});
        res.json({acessToken})
    }else{
        res.sendStatus(401)
    }
}

module.exports = {handleLogin};