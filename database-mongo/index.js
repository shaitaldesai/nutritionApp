var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nutrition');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});


var FoodSchema = mongoose.Schema({
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

var Food = mongoose.model('Food', FoodSchema);

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
});

var User = mongoose.model('User', UserSchema);

var save = function(data, callback) {
  var newData = new Food(data);
  newData.save(callback);
}

var selectAll = function(callback) {
  Food.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var saveUser = function(data, callback) {
  var newData = new User(data);
  newData.save(callback);
}

var findUser = function(pw, callback) {
  User.find({password: pw}, function(err, user) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, user);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.save = save
module.exports.saveUser = saveUser;
module.exports.findUser = findUser;



// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/nutrition');

// var db = mongoose.connection;

// db.on('error', function() {
//   console.log('mongoose connection error');
// });

// db.once('open', function() {
//   console.log('mongoose connected successfully');
// });

// // User.collection.drop(); // use this terminal
// // mongoose.connection.collections['users'].drop( function(err) {
// //     console.log('collection dropped');
// // });

// var UserSchema = mongoose.Schema({
//   // username: Number,
//   // password: String,
//   food_id: {type: String, index: {unique: true}},
//   foodName: String,
//   weight: String,
//   calories: String,
//   sugars: String,
//   protein: String,
//   fat: String,
//   carbs: String
// });

// // var IdSchema = mongoose.Schema({
// //   username: Number,
// //   password: String,
// // });

// var User = mongoose.model('User', UserSchema);

// var save = function(data, callback) {
//   var newData = new User(data);
//   newData.save(callback);
// }

// var selectAll = function(callback) {
//   User.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// module.exports.selectAll = selectAll;
// module.exports.save = save;