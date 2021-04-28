const User = require('./User');
const Story = require('./Story');
const Contribution = require('./Contribution');


User.hasMany(Story, {
    foreignKey: 'user_id'
});

Story.belongsTo(User, {
    foreignKey: 'user_id',
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

module.exports = { User, Story, Contribution };