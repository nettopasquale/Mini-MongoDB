const User = require('../model/User');

//pega todos os usuarios
const getAllUsers = async (req, res)=>{
    const users = await User.find();
    if(!users) res.status(204).json({'message': 'Nenhum usuário encontrado.'})  
    res.json(users)
}

// deleta um usuário
const deleteUser = async (req, res)=>{
    // user precisa ser um usuário com id existente e número inteiro, retorna mensagem de erro se esse ID n existir
    if(!req?.body?.id ) return res.status(400).json({"message": "ID é obrigatório."})
    const user = await User.findOne({_id: req.body.id}).exec();

    if(!user) return res.status(204).json({"message": `ID ${req.body.id} do usuário.`});
    
    const result = await user.deleteOne({_id: req.body.id});
    res.json(result)
}

// pega apenas um usuário
const getUser = async (req, res)=>{
    if(!req?.params?.id ) return res.status(400).json({"message": "ID do usuário é obrigatório."});

    const user = await User.findOne({_id: req.params.id}).exec();
    if(!user) return res.status(204).json({"message": `ID ${req.params.id} do usuário não encontrada.`});
    res.json(user);
}

module.exports ={
    getAllUsers,
    deleteUser,
    getUser
}