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
<<<<<<< HEAD
Hero.belongsTo(Mission, {
  foreignKey: 'mission_id',
});
module.exports = { Hero, Mission, User };
=======

Hero.belongsTo(Mission, {
  foreignKey: 'mission_id',
});

module.exports = { Hero, Mission, User };
>>>>>>> 2c08db6e0e022d683753a9f998848a1207751604
