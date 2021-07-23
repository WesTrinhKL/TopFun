'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListItem = sequelize.define('ListItem', {
    title: DataTypes.STRING,
    currentRank: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    imageLink: DataTypes.TEXT,
    listId: DataTypes.INTEGER
  }, {});
  ListItem.associate = function(models) {
    ListItem.belongsTo(models.List, {
      as: 'lists',
      foreignKey: 'listId',
      onDelete: 'cascade',

    })
    ListItem.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    })
  };
  return ListItem;
};
