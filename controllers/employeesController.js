const Employee = require('../model/Employee');

//pega todos os funcionários
const getAllEmployees = async (req, res)=>{
    const employees = await Employee.find();
    if(!employees) res.status(204).json({'message': 'Nenhum funcionário encontrado'})  
    res.json(employees)
}

//cria um funcionário
const createNewEmployee = async (req, res)=>{
    // se no corpo da requsição não conter nome ou sobrenome, retorna erro 400 com mensagem
    if(!req?.body?.firstname || !req?.body?.lastname)  res.status(400).json({'message': 'Nome e sobrenome obrigatórios!'}) 
    //se tiver tente retorno de criação de nome e sobrenome:
    try{
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname:req.body.lastname
        });
        res.status(201).json(result)
    }catch(erro){
        console.error(erro)
    }
}

// atualiza um funcionário
const updateEmployee = async (req, res) =>{
    // employee precisa ser um funcionário com id existente e número inteiro, retorna mensagem de erro se esse ID n existir
    if(!req?.body?.id ) return res.status(400).json({"message": "ID é obrigatório"})
    const employee = await Employee.findOne({_id: req.body.id}).exec();

    // se não existir o funcionario retorna mensagem de erro
    if(!employee) return res.status(204).json({"message": `Não há matches de funcionários com a ${req.body.id}`});
    // se existerem, o body da requisição de funcionários serão atribuidos ao objeto data com o funcionario deles
    if(req.body.firstname) employee.firstname = req.body.firstname;
    if(req.body.lastname) employee.lastname = req.body.lastname;
    
    const result = await employee.save();
    res.json(result);
}

// deleta um funcionário
const deleteEmployee = async (req, res)=>{
    // employee precisa ser um funcionário com id existente e número inteiro, retorna mensagem de erro se esse ID n existir
    if(!req?.body?.id ) return res.status(400).json({"message": "ID é obrigatório"})
    const employee = await Employee.findOne({_id: req.body.id}).exec();

    if(!employee) return res.status(204).json({"message": `Não há matches de funcionários com a ${req.body.id}`});
    
    const result = await employee.deleteOne({_id: req.body.id});
    res.json(result)
}

// pega apenas um funcionario
const getEmployee = async (req, res)=>{
    if(!req?.params?.id ) return res.status(400).json({"message": "ID é obrigatório"});

    const employee = await Employee.findOne({_id: req.params.id}).exec();
    if(!employee) return res.status(204).json({"message": `Não há matches de funcionários com a ${req.params.id}`});
    res.json(employee);
}

module.exports ={
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}