'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

    */
      return queryInterface.bulkInsert('Lists', [
      {
        title: "My Favorite Dogs",
        coverPhotoLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/dogs/119961.jpg",
        description: "These are the dogs that I like a lot",
        categoryId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Top Foods You Must Try",
        coverPhotoLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/favoritefood/102218.jpg",
        description: "Here are some of the best foods in the world that you must try!",
        categoryId: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "My Top 10 Active NBA Players",
        coverPhotoLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/nbaplayers/ANTETOKOUNMPO_G_USATSI_14878894.jpg",
        description: "This is the TRUTH, this is straight factz, no cap",
        categoryId: 3,
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

    */
      return queryInterface.bulkDelete('Lists', null, {});
  }
};
