var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nutrition');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var UserSchema = mongoose.Schema({
  // username: Number,
  // password: String,
  food_id: {type: String, index: {unique: true}},
  foodName: String,
  weight: String,
  calories: String,
  sugars: String,
  protein: String,
  fat: String,
  carbs: String
});

var User = mongoose.model('User', UserSchema);

var save = function(data, callback) {
  var newData = new User(data);
  newData.save(callback);
}

var selectAll = function(callback) {
  User.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.save = save;