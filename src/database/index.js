/**
 * Arquivo para globalizar os models
 * Connetar com o banco de dados e carregar as models!
 */

import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

//Arrays com todos os models
const models = [User];

class Database{
  constructor(){ 
    this.init();
  }
  init(){
    //Variavel que está sendo esperada dentro dos models "super.init()"
    this.connection = new Sequelize(databaseConfig);
    //Percorrendo o model user e iniciando ele passando a conexão como parametro
    models.map(model => model.init(this.connection));
  }

}

export default new Database();