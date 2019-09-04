
//Função para validar dados de entrada!
import * as Yup from 'yup';

import User from '../models/User';

class UserController{
  //Cadastro de usúario!
  async store(req, res){

    //Metodo para definir padronização de campos
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Erro de validação!'})
    }

    const UserExists = await User.findOne({
      where:{
        email: req.body.email
      }
    });
    if(UserExists){
      return res.status(400).json({error: 'Email Já está em uso parceiro'})
    }

    const {id, name, email} = await User.create(req.body);

    return res.json({
      id,
      name,
      email
    });
  }

  async update(req, res){

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      confirmPassowrd: Yup.string().when('password', (password, field)=>
        password? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Favor insira a senha corretamente'})
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if(email !== user.email){
      const UserExists = await User.findOne({ where:{ email } });

      if(UserExists){
        return res.status(400).json({error: 'Email Já está em uso parceiro'})
      }
    }

    if(oldPassword && !(await user.checkPassword(oldPassword))){
      return res.status(401).json({error: "Senha Invalida para alteração!"})
    }

    const {id, name} = await user.update(req.body)

    return res.json({
      id,
      name,
      email
    })
  }
}
export default new UserController();