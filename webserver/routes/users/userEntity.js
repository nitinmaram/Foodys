let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let schema = new mongoose.Schema({
  username : String,
  password : String,
  name: String
});

let User = mongoose.model('user',schema);

module.exports = User;
