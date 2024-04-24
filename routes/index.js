var express = require('express');
const toyModel = require('../models/ToyModel');
var router = express.Router();
const categoryModel = require('../models/CategoryModel');

router.get('/', async (req, res) => {
  var toyList = await toyModel.find({});
  var categories = await categoryModel.find({});
  res.render('index', { toyList,categories });
});

router.get('/filter/:id',async (req,res) => {
  var id = req.params.id;
  var toyList = await toyModel.find({categories:id})
  var categories = await categoryModel.find({});
  res.render('index', { toyList,categories });
})

module.exports = router;
