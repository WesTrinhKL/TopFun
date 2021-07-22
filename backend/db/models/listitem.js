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
      as: 'list',
      foreignKey: 'listId',
    })
  };
  return ListItem;
};
