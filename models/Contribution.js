const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Contribution extends Model {}

Contribution.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    contribution_text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
    },
    story_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'story',
            key: 'id'
        }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'contribution'
  }
);

module.exports = Contribution;