module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gympoint-database',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
