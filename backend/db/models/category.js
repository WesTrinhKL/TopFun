'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.List,{
      as: 'lists',
      foreignKey: 'categoryId',
    })
    List.belongsTo(models.User,{
      foreignKey: 'userId',
    })

  };

  return Category;
};
