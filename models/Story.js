const { Model, DataTypes, STRING } = require('sequelize');
const sequelize = require('../config/connection')

class Story extends Model {
  static like(body, models) {
    return models.Like.create({
      user_id: body.user_id,
      story_id: body.story_id
    }).then(() => {
      return Story.findOne({
        where: {
          id: body.story_id
        },
        attributes: [
          'id',
          'title',
          'beginning',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM like WHERE story.id = like.story_id)'),
            'like_count'
          ]
        ]
      });
    });
  }
}

Story.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      beginning: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'story'
    }
  );

  module.exports = Story;