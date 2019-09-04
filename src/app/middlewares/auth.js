/**
 * Middleware de autenticação!
 */

import jwt from 'jsonwebtoken';

//Função para converter uma outra função de callback para uma async - para poder usar o await
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  //Buscando o token
  const authHeader = req.headers.authorization;

  //verificando se o token existe!
  if(!authHeader){
    return res.status(401).json({ error: 'Token not provided!' })
  }
  
  //dividindo o que vem do headers, "bearer token....." - usar somente o "token"
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    //console.log(decoded) -> exibe as infos que estão presente dentro do token, id e outras infos do jwt

    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token Invalid' })
  }

  return next();
};