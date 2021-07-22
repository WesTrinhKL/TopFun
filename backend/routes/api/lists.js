const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const {List} = require('../../db/models');
const {Category} = require('../../db/models');
const {ListItem} = require('../../db/models');


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






module.exports = router;
