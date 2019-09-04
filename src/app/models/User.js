import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model{
  /**
   * Variavel 'sequelize' de conexão com o banco
   * Que será usada nas config do database, para distribuir os models
   * Database/Index.js
   */
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING
    },{
      sequelize,
    });

    this.addHook('beforeSave', async (user)=>{
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
        // Fazendo uma verificação e criando um hash de força 8 e jogando pro banco.
      }
    });
    
    return this;
  }

  checkPassword(password){
    //Verificação de senha
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;