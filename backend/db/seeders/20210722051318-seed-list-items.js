'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ListItems', [
      {
        title: "Tofu",
        currentRank: 1,
        imageLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/dogs/119961.jpg",
        content: "Tofu is my very dog that I have ever owned. He is an English Cocker Spaniel. He is really active and enjoys the company of children very much",
        listId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Travis",
        currentRank: 2,
        imageLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/dogs/13865.jpg",
        content: "Travis is a very friendly little guy and is very shy. But don't worry, he is extremely cute and active once you get to know him a little more!",
        listId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Mochi",
        currentRank: 3,
        imageLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/dogs/141805.jpg",
        content: "Mochi is super cute and the most recent addition to the family. She enjoys playing around the park with her fellow friends. She is very active.",
        listId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Foods
      {
        title: "Steak",
        currentRank: 1,
        imageLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/favoritefood/102218.jpg",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        listId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Sushi",
        currentRank: 2,
        imageLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/favoritefood/102218.jpg",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        listId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Bacon",
        currentRank: 3,
        imageLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/favoritefood/107533.jpg",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        listId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cheesecake",
        currentRank: 4,
        imageLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/favoritefood/107533.jpg",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        listId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Fried Chicken",
        currentRank: 5,
        imageLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/favoritefood/119068.jpg",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        listId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // NBA players
      {
        title: "Lebron James",
        currentRank: 1,
        imageLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/favoritefood/102218.jpg",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        listId: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Giannis Antetokounmpo",
        currentRank: 2,
        imageLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/nbaplayers/ANTETOKOUNMPO_G_USATSI_14878894.jpg",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        listId: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Stephen Curry",
        currentRank: 3,
        imageLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/nbaplayers/curry_s_USATSI_1537941.jpg",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        listId: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Kevin Durant",
        currentRank: 4,
        imageLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/nbaplayers/Durant_Kevin_USATSI_15393372.jpg",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        listId: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Kawhi Leonard",
        currentRank: 5,
        imageLink: "https://topfunphotos.s3.us-west-1.amazonaws.com/topfunimages/nbaplayers/LEONARD_K_USATSI_15303268.jpg",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        listId: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },


    ], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('ListItems', null, {});
  }
};
