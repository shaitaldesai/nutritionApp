var request = require('request');
var config = require('../services/config.js');

var url = `https://api.nal.usda.gov/ndb/search/?format=json&q=cheddar+cheese%0D%0A&sort=r&max=5&offset=0&api_key=${config.API_KEY}`;
var url2 =  `https://api.nal.usda.gov/ndb/V2/reports?ndbno=01009&type=f&format=json&api_key=${config.API_KEY}`;
var url3 = `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${config.API_KEY}&ndbno=43205&nutrients=205&nutrients=204&nutrients=208&nutrients=269&fg=0100&fg=0500`;
var url4 = `https://api.nal.usda.gov/ndb/list?format=json&ndbno=43205&lt=f&sort=n&api_key=${config.API_KEY}`;

var getResponse = (querry, callback) => {
request.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${querry}&sort=r&max=5&offset=0&api_key=${config.API_KEY}`, function (err, res, body) {
  // console.log('error:', err); // Print the error if one occurred
  // console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
  var data = JSON.parse(body);
  var ids = data.list.item.map(ele => {
  	var obj = {};
    obj.name = ele.name;
    obj.id = ele.ndbno;
    return obj;
  });
  var id = data.list.item[0].ndbno;
  request.get(`https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${config.API_KEY}&ndbno=${id}&nutrients=205&nutrients=204&nutrients=208&nutrients=269&nutrients=203&fg=0100&fg=0500`, function (err, res, body) {
  var data = JSON.parse(body);
  var nutri = data.report.foods;
  callback(nutri);
  });
});
};
var getResponseByNdbno = (ndbno, callback) => {
request.get(`https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${config.API_KEY}&ndbno=${ndbno}&nutrients=205&nutrients=204&nutrients=203&nutrients=208&nutrients=269&fg=0100&fg=0500`, function (err, res, body) {
  // console.log('error:', err); // Print the error if one occurred
  // console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
  var data = JSON.parse(body);
  var nutri = data.report.foods;
  callback(nutri);
  // var ids = data.list.item.map(ele => {
  //   var obj = {};
  //   obj.name = ele.name;
  //   obj.id = ele.ndbno;
  //   return obj;
  // });
  // var id = data.list.item[0].ndbno;
  // request.get(`https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${config.API_KEY}&ndbno=${id}&nutrients=205&nutrients=204&nutrients=208&nutrients=269&nutrients=203&fg=0100&fg=0500`, function (err, res, body) {
  // var data = JSON.parse(body);
  // var nutri = data.report.foods;
  // callback(nutri);
  // });
});
};
module.exports.getResponse = getResponse;
module.exports.getResponseByNdbno = getResponseByNdbno;