import jwt from 'jsonwebtoken';
import User from '../models/User';

import * as Yup from 'yup';

import authConfig from '../../config/auth';

class SessionController{
  async store(req, res){

    //Metodo para definir padronização de campos
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Erro de validação!'})
    }

    const { email, password } = req.body;

    const user = await User.findOne({where: {email}});

    if(!user){
      return res.status(401).json({ error: 'User not exist!' });
    }

    if(!(await user.checkPassword(password))){
      return res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, name } = user;

    return res.json({
      user:{
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })

  }
}

export default new SessionController();