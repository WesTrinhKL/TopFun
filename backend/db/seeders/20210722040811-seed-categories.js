'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

    */
      return queryInterface.bulkInsert('Categories', [
        {
          categoryType: "Dogs",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryType: "Food",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryType: "Basketball",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Categories', null, {});
  }
};
