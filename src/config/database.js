module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'docker',
  password: 'docker',
  database: 'gympoint',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
