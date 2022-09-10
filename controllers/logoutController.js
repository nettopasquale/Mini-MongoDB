const User = require('../model/User');

const handleLogout = async (req, res)=>{
    // On client, também deleta o acessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // Sem conteúdo
    const refreshToken = cookies.jwt;
    // o RefreshToken está no db?
    const foundedUser = await User.findOne({refreshToken}).exec();
    if(!foundedUser){
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
        res.sendStatus(204); 
    } 
    //Deletar o refresToken no DB
    foundedUser.refreshToken = '';
    const result = await foundedUser.save();
    console.log(result);
    res.clearCookie('jwt', {httpOnly: true}); // secure: true - apenas serve ao https
    res.sendStatus(204);
}

module.exports = {handleLogout}