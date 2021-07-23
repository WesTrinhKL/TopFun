// api/lists/
const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const {List} = require('../../db/models');
const {Category} = require('../../db/models');
const {ListItem} = require('../../db/models');
const { Op } = require("sequelize");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateCreateList = [ //will run each middleware below (your req will be screened each time)
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid title.')
    .isLength({ max: 255 })
    .withMessage('Title Cannot be more than 255 characters long'),
  check('coverPhotoLink')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid cover photo.'),
  check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid description.'),
  check('categoryName')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid categoryName.'),
  handleValidationErrors,
];

const validateListItem = [ //will run each middleware below (your req will be screened each time)
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid title.')
    .isLength({ max: 255 })
    .withMessage('Title Cannot be more than 255 characters long'),
  check('imageLink')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid image.'),
  check('currentRank')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid rank.'),
  handleValidationErrors,
];


//@fetch one single list and its items based on list id
const router = express.Router();
router.get('/global-feed-lists', asyncHandler(async (req, res)=>{
  const lists = await List.findAll({
    include: [
      {
        model: User,
        as: 'user',
      },
      {
        model: ListItem,
        as: 'listItems',
      },
    ],
    limit: 10,
  });
  return res.json(lists);
  // returns an array of users obj, with arrays(lists key) of lists obj.
}))

//@get global data feed list.
router.get('/global-feed-lists', asyncHandler(async (req, res)=>{
  const lists = await List.findAll({
    include: [
      {
        model: User,
        as: 'user',
      },
      {
        model: ListItem,
        as: 'listItems',
      },
    ],
    limit: 10,
  });
  return res.json(lists);
  // returns an array of users obj, with arrays(lists key) of lists obj.
}))

//@get global data feed categories.
router.get('/global-feed-categories', asyncHandler(async (req, res)=>{
  const listsUnderCategory = await Category.findAll({
    include: {
      model: User,
      as: 'user',
      include: {
        model: List,
        as: 'lists', //alias key 'lists' contains list record
        include:{
          model: ListItem,
          as: 'listItems',
        }
      }
    },
    limit: 10,
  });
  return res.json(listsUnderCategory);
}))

//@route to create a "List" with category attached
router.post('/create', requireAuth, validateCreateList, asyncHandler(async (req,res)=>{
  const userId = req.user.id;
  const {
    title,
    coverPhotoLink,
    description,
    categoryName,
  } = req.body;

  //find existing or create new category
  const findUserCategoryByName = await Category.findOne({
    where: {
      [Op.and]: [
        {categoryType: categoryName},
        {userId: userId}
      ]
    }
  })
  let categoryId;
  if(findUserCategoryByName){
    categoryId = findUserCategoryByName.id;
  }else{
    const newlyMadeCategory = await Category.create({
      categoryType: categoryName,
      userId: userId,
    })
    categoryId = newlyMadeCategory.id;
  }
  //create the new list
  const createNewList = await List.create({
    title,
    coverPhotoLink,
    description,
    categoryId,
    userId,
  })
  return res.json(createNewList);
}) )
//@-----------List Items-----------
//@create item in list
//send post with 'list id' param and list item
//verify that the 'list id' sent belongs to user
router.post('/listId/:id/item', requireAuth, validateListItem, asyncHandler(async(req,res)=>{
  //very list id is accessible by user
  const paramListId = req.params.id;
  const userId = req.user.id;
  const listFoundVerified = await List.findOne({
    where: {
      [Op.and]: [
        {userId:userId},
        {id:paramListId}
      ]
    }
  })
  if(listFoundVerified){ //once validated
    // gather data from form and add list item
    const {
      title,
      currentRank,
      content,
      imageLink,
    } = req.body;

    //ensure that currentRank is unique later.
    const listId = paramListId;
    console.log("value of list ID:",listId)
    const createListItem = await ListItem.create({
      title,
      currentRank,
      content,
      imageLink,
      listId: listId,
      userId: userId,
    })
    return res.json(createListItem);
  }else{
    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    throw err;
  }
}))




router.post('/listId/:id/update/item/:itemId', requireAuth, validateListItem, asyncHandler(async(req,res)=>{
  //very list id is accessible by user
  const paramListId = req.params.id;
  const userId = req.user.id;
  const listFoundVerified = await List.findOne({
    where: {
      [Op.and]: [
        {userId:userId},
        {id:paramListId}
      ]
    }
  })
  if(listFoundVerified){ //once validated
    // gather data from form and add list item
    const itemId = req.params.itemId;
    const listItemToUpdate = await ListItem.findByPk(itemId)
    if (listItemToUpdate){
      const {
        title,
        currentRank,
        content,
        imageLink,
      } = req.body;

      //ensure that currentRank is unique later.
      await ListItem.update({
        title,
        currentRank,
        content,
        imageLink,
      }, {
        where: {id:itemId},
        returning: true,
        plain:true,
      })
      const returnedItem = await ListItem.findByPk(itemId)
      return res.json(returnedItem);
    }

  }else{
    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    throw err;
  }
}))



//@delete a category
router.post('/category/delete/:id', requireAuth, asyncHandler(async (req,res)=>{
  const id = parseInt(req.params.id);
  const categoryFound = await Category.findByPk(id);
  if(!categoryFound) throw new Error("cannot find category");
  await categoryFound.destroy();
  return res.json('deleted category: ', categoryFound.id);
}))




module.exports = router;
