const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const {List} = require('../../db/models');
const {Category} = require('../../db/models');
const {ListItem} = require('../../db/models');


const router = express.Router();


router.get('/global-feed', asyncHandler(async (req, res)=>{
  const listsUnderCategory = await Category.findAll({
    include: {
      model: List,
      as: 'lists', //alias key 'lists' contains list record
      include:{
        model: ListItem,
        as: 'listItems',
      }
    },
    limit: 10,
  });
  return res.json(listsUnderCategory);

}))






module.exports = router;
