const Hero = require('./Hero');
const Mission = require('./Mission');
const User = require('./User');

Hero.hasOne(User, {
  foreignKey: 'hero_id',
  onDelete: 'CASCADE',
});

Mission.hasMany(Hero, {
  foreignKey: 'mission_id',
});

module.exports = { Hero, Mission, User };
