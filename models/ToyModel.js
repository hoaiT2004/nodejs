const mongoose = require('mongoose');
const ToySchema = mongoose.Schema(
   {
      id: String,
      name: String,
      count: Number,
      price: Number,
      image: String,
      categories: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'categories'
      }
   }
);
const ToyModel = mongoose.model("toys", ToySchema);
module.exports = ToyModel;

