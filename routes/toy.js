var express = require('express');
const toyModel = require('../models/ToyModel');
var router = express.Router();
const categoryModel = require('../models/CategoryModel');

//READ feature
//Importance: Must use "async" + await" keywords
router.get('/', async (req, res) => {
   const toyList = await toyModel.find({}).populate('categories');
   res.render('toy/index', { toyList });
});

//DELETE feature
router.get('/delete/:id', async (req, res) => {
   let id = req.params.id;
   await toyModel.findByIdAndDelete(id);
   res.redirect('/toy');
})

router.get('/deleteall', async (req, res) => {
   await toyModel.deleteMany();
   res.redirect('/toy');
})

//step 1: render "Add toy" form for user to input data
router.get('/add', async (req, res) => {   
   var categories = await categoryModel.find({});
   res.render('toy/add',{ categories });
})

//step 2: get input data from form and add data to database
router.post('/add', async (req, res) => {
   var toy = req.body;
   console.log(toy);
   await toyModel.create(toy);
   res.redirect('/toy');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = await toyModel.findById(id);
   res.render('toy/edit', { toy });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = req.body;
   await toyModel.findByIdAndUpdate(id,toy);
   res.redirect('/toy');
})


//search by toy name
router.post('/search', async (req, res) => {
   let keyword = req.body.keyword;
   let toys = await toyModel.find({ name: new RegExp(keyword, "i") }).populate('categories');
   res.render('toy/index', { toyList : toys });
})

//sort by toy id ascending
router.get('/sortid/asc', async (req, res) => {
   let toyList = await toyModel.find().sort({ name: 1 }).populate('categories');
   res.render('toy/index', { toyList });
})

//sort by toy id descending
router.get('/sortid/desc', async (req, res) => {
   let toyList = await toyModel.find().sort({ name: -1 }).populate('categories');
   res.render('toy/index', { toyList });
})

module.exports = router;
