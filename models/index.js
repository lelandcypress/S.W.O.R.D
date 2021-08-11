const Hero = require('./Hero');
const Mission = require('./Mission');
const User = require('./User');
User.belongsTo(Hero, {
  foreignKey: 'hero_id',
});
Hero.hasOne(User, {
  foreignKey: 'hero_id',
  onDelete: 'CASCADE',
});
Mission.hasMany(Hero, {
  foreignKey: 'mission_id',
});
Hero.belongsTo(Mission, {
  foreignKey: 'mission_id',
});
module.exports = { Hero, Mission, User };
