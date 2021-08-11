const { Mission } = require('../models');

const missionData = [
  {
    name: 'Recover Batmobile wheel',
    location: 'Gotham',
    description: 'Joker is getting away',
    priority: 'Critical',
    status: 'Active',
    date_created: '08 / 04 / 2021',
    hero_id: 2,
  },
  {
    name: 'Stop Magneto',
    location: 'New York',
    description: 'Magneto is using his powers to steal hubcaps',
    priority: 'Critical',
    status: 'Active',
    date_created:' 08 / 04 / 2021',
    hero_id: 5,
  },
];

const seedMissions = () => Mission.bulkCreate(missionData);

module.exports = seedMissions;
