var express = require('express');
var bodyParser = require('body-parser');
var helper = require(__dirname + '/../angular-client/helpers/api-helper.js');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var database = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(bodyParser.json());

app.get('/items', function (req, res, next) {
	var query = req.query.q;// why did req.param.q not work? -param is depricated
 helper.getResponse(query, (data) => {
 	res.json(data);
 });
});

app.get('/ndbno', function (req, res, next) {
  var ndbno = req.query.q;// why did req.param.q not work?
 helper.getResponseByNdbno(ndbno, (data) => {
  res.json(data);
 });
});

app.post('/items', function (req, res, next) {
  var foodId = req.body[0].ndbno;
  var foodName = req.body[0].name;
  var foodWeight = req.body[0].weight;
  var Data = req.body[0].nutrients;
  console.log(Data);
  var foodData = {
    food_id: foodId,
    foodName: foodName,
    weight: foodWeight,
    calories: `${Data[0].value} ${Data[0].unit}`,
    sugars: `${Data[1].value} ${Data[1].unit}`,
    protein: `${Data[2].value} ${Data[2].unit}`,
    fat: `${Data[3].value} ${Data[3].unit}`,
    carbs: `${Data[4].value} ${Data[4].unit}`
  }
  database.save(foodData, (err) => {
    if (err) {
      console.log('database error:', err);
    } else {
      res.sendStatus(200);
    }
  });
  // res.sendStatus('200');
});

app.get('/names', function (req, res, next) {
  database.selectAll((err, data) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(data);
      var names = data.map((name) => {
        return {ndbno: name.food_id, name: name.foodName};
      }).slice(-5);
      // console.log(names);
      res.json(names);
    }
  });
});

app.post('/signup', function (req, res) {
  var identifiers = req.body;
  console.log(identifiers);
  database.saveUser(identifiers, (err, userData) => {
    if (err) {
      console.log(err);
    }
    res.sendStatus(201).redirect('/login');
  });
});

app.get('/login', function (req, res) {
  var identifiers = req.body;
  console.log(identifiers);
  var pw = {password: identifiers.password};
  database.saveUser(pw, (err, user) => {
    if (err) {
      console.log(err);
    }
    res.sendStatus(200).redirect('/');
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

