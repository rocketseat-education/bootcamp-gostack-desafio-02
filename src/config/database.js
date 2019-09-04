module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100',
  port: 5332,
  username: 'postgres',
  password: '123456',
  database: 'meetapp',
  define: {
    timestamps: true, //Poder acessar recursos de att automaticos
    underscored: true, // Padronizar nomenclatura não camelcase = UserGrup = user_grup
    underscoredAll: true, // Padronizar nome de tabela
  },
};