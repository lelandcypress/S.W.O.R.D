const Hero = require('./Hero');
const Mission = require('./Mission');
const User = require('./User');

Hero.hasMany(User, {
  foreignKey: 'hero_id',
  onDelete: 'CASCADE',
});

Hero.hasOne(Mission, {
  foreignKey: 'hero_id',
});

module.exports = { Hero, Mission, User };
