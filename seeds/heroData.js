const { Hero } = require('../models');

const heroData = [
  {
    name: 'Superman',
    secret_identity: 'Clark Kent',
    organization: 'Justice League',
    powers: 'Super Strength',
    weakness: 'Kryptonite',
  },
  {
    name: 'Batman',
    secret_identity: 'Bruce Wayne',
    organization: 'Justice League',
    powers: 'Gadgets and Martial Arts',
    weakness: 'Bullets',
  },
  {
    name: 'Spiderman',
    secret_identity: 'Peter Parker',
    organization: 'None',
    powers: 'Spide like abilities',
    weakness: 'Mary Jane Watson',
  },
  {
    name: 'Thor',
    secret_identity: 'None',
    organization: 'Avengers',
    powers: 'Mjolnir',
    weakness: 'Occasionally is not worthy',
  },
  {
    name: 'Wolverine',
    secret_identity: 'Logan',
    organization: 'X-Men',
    powers: 'Adimantium Skeleton',
    weakness: 'Bad Temper',
  },
];

const seedHeros = () => Hero.bulkCreate(heroData);

module.exports = seedHeros;
