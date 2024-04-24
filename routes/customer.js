var express = require('express');
const customerModel = require('../models/CustomerModel');
var router = express.Router();

//READ feature
//Importance: Must use "async" + await" keywords
router.get('/', async (req, res) => {
   
   var customerList = await customerModel.find({});
   res.render('customer/index', { customerList });
});

//DELETE feature
router.get('/delete/:id', async (req, res) => {

   let id = req.params.id;
   await customerModel.findByIdAndDelete(id);
   res.redirect('/customer');
})

router.get('/deleteall', async (req, res) => {
  
   await customerModel.deleteMany();
   res.redirect('/customer');
})

//step 1: render "Add customer" form for user to input data
router.get('/add', async (req, res) => {
   res.render('customer/add');
})

//step 2: get input data from form and add data to database
router.post('/add', async (req, res) => {
   var customer = req.body;
   console.log(customer)
   await customerModel.create(customer);
   res.redirect('/customer');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var customer = await customerModel.findById(id);
   console.log(customer)
   res.render('customer/edit', { customer });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var customer = req.body;
   await customerModel.findByIdAndUpdate(id,customer);
   res.redirect('/customer');
})

// //show customer detail
// router.get('/detail/:id', async (req, res) => {
//    let id = req.params.id;
//    var customer = await customerModel.findById(id);
//    res.render('customer/detail', { customer });
// })


//search by customer name
router.post('/search', async (req, res) => {
   let keyword = req.body.keyword;
   let customers = await customerModel.find({ name: new RegExp(keyword, "i") });
   res.render('customer/index', { customerList : customers });
})

//sort by customer id ascending
router.get('/sortid/asc', async (req, res) => {
   let customerList = await customerModel.find().sort({ name: 1 });
   res.render('customer/index', { customerList });
})

//sort by customer id descending
router.get('/sortid/desc', async (req, res) => {
   let customerList = await customerModel.find().sort({ name: -1 });
   res.render('customer/index', { customerList });
})

//filter customer by "male" gender
router.get('/male', async (req, res) => {
   let customerList = await customerModel.find({ gender : "nam"});
   res.render('customer/index', { customerList });
})

//filter customer by "female" gender
router.get('/female', async (req, res) => {
   let customerList = await customerModel.find({ gender: "nữ" });
   res.render('customer/index', { customerList });
})

module.exports = router;
