const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Hero extends Model {}

Hero.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secret_identity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    powers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weakness: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mission_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'mission',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'hero',
  }
);

module.exports = Hero;
