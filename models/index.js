const Hero = require('./Hero');
const Mission = require('./Mission');
const User = require('./User');
<<<<<<< HEAD
User.belongsTo(Hero, {
  foreignKey: 'hero_id',
});
=======

User.belongsTo(Hero, {
  foreignKey: 'hero_id',
});

>>>>>>> e4082994856057044897eefdd3dffdb42ac5f18b
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
>>>>>>> e4082994856057044897eefdd3dffdb42ac5f18b
