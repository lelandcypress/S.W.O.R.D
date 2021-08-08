const sequelize = require('../config/connection');
const seedMissions = require('./missionData');
const seedHeros = require('./heroData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedHeros();
  console.log('\n----- HEROS SEEDED -----\n');

  await seedMissions();
  console.log('\n----- MISSIONS SEEDED -----\n');

  process.exit(0);
};

seedAll();
