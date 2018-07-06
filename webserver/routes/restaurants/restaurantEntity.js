const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let schema = new mongoose.Schema({
 _id: String,
 imageurl: String,
 resName: {
   type:String
 },
 resCuisines: String,
 resAddress: {type:String},
 resRating: String,
 comments: String,
 distance: Number,
 user: String
});

let restaurant = mongoose.model('restaurant', schema);

module.exports = {
   restaurant
}
