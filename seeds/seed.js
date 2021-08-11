const sequelize = require('../config/connection');
const seedMissions = require('./missionData');
const seedHeros = require('./heroData');
const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedMissions();
  console.log('\n----- MISSIONS SEEDED -----\n');

  await seedHeros();
  console.log('\n----- HEROS SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();
