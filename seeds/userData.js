const { User } = require('../models');
const bcrypt = require('bcrypt');

const hashedPassword = bcrypt.hashSync(process.env.hash, 10);

const userData = [
  {
    username: 'SuperMan',
    email: 'SuperMan@justiceleague.com',
    password: hashedPassword,
    hero_id: 1,
  },
  {
    username: 'Batman',
    email: 'Batman@Batmail.Bat',
    password: hashedPassword,
    hero_id: 2,
  },
  {
    username: 'SpiderMan',
    email: 'Spidey123@hotmail.com',
    password: hashedPassword,
    hero_id: 3,
  },
  {
    username: 'Thor',
    email: 'Worthy@Asgard.com',
    password: hashedPassword,
    hero_id: 4,
  },
  {
    username: 'Logan',
    email: 'Logan@Xmen.com',
    password: hashedPassword,
    hero_id: 5,
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
