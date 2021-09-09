'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    coverPhotoLink: DataTypes.TEXT,
    description: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  List.associate = function(models) {
    // associations can be defined here
    List.belongsTo(models.User,{
      as: 'user',
      foreignKey: 'userId',
    })
    List.hasMany(models.ListItem, {
      as: 'listItems',
      foreignKey: 'listId',
      onDelete: 'cascade',
    })
    List.belongsTo(models.Category,{
      as: 'category',
      foreignKey: 'categoryId',
      onDelete: 'cascade',

    })
  };

  List.getListItemsWithListId = async (id) => {

  }

  return List;
};
