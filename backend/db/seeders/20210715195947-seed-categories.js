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

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      // await queryInterface.bulkDelete( "ListItems", null, {});
      // await queryInterface.bulkDelete( "Lists", null, {});
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
