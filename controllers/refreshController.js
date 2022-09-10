const User = require('../model/User')
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res)=>{
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundedUser = await User.findOne({ refreshToken }).exec()
    if(!foundedUser) return res.sendStatus(403); // Proibido Forbidden
    // Evaluar JWTs
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (erro, decoded)=>{
            if(erro || foundedUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundedUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo":{
                        "username": decoded.username,
                        "roles": roles
                    }
                 },
                process.env.ACESS_TOKEN_SECRET,
                {expiresIn: '60s'}
            );
            res.json({roles, accessToken})
        }
    );
       
}

module.exports = {handleRefreshToken}