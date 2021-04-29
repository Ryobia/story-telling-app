const User = require('./User');
const Story = require('./Story');
const Like = require('./Like');
const Contribution = require('./Contribution');


User.hasMany(Story, {
    foreignKey: 'user_id'
});

Story.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Story, {
    through: Like,
    as: 'liked_stories',
    foreignKey: 'user_id'
});
  
Story.belongsToMany(User, {
    through: Like,
    as: 'liked_stories',
    foreignKey: 'story_id'
});

Like.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Like.belongsTo(Story, {
    foreignKey: 'story_id'
});
  
User.hasMany(Like, {
    foreignKey: 'user_id'
});
  
Story.hasMany(Like, {
    foreignKey: 'story_id'
});

Contribution.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Contribution.belongsTo(Story, {
    foreignKey: 'story_id'
});
  
User.hasMany(Contribution, {
    foreignKey: 'user_id'
});
  
Story.hasMany(Contribution, {
    foreignKey: 'story_id'
});

module.exports = { User, Story, Like, Contribution };