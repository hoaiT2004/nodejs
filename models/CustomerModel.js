//declare mongoose
var mongoose = require('mongoose');
//declare schema (table design/structure)
var CustomerSchema = mongoose.Schema(
   {
      id: String,
      name: String,
      age: Number,   //integer
      gender: String,
      image: String
   }
);
//declare model (to be used in routes - controllers)
var CustomerModel = mongoose.model("customers", CustomerSchema);  //students: collection name
//Note: in case collection name is single form (without "s" at the end)
//var StudentModel = mongoose.model("sinh vien", StudentSchema, "student");
//export module
module.exports = CustomerModel;

