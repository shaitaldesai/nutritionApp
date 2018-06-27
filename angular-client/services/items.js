angular.module('app')
.service('itemsService', function($http, $window) {
  this.getAll = function(query, callback) {
    $http.get('/items', {
      params: {
        q: query
      }
    })
    .then(function({data}) {
      if(callback) {
        callback(data);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  };
  this.getNames = function(callback) {
    $http.get('/names')
    .then(function({data}) {
      if(callback) {
        callback(data);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  };
  this.getByNdbno = function(ndbno, callback) {
    $http.get('/ndbno', {
      params: {
        q: ndbno
      }
    })
    .then(function({data}) {
      if(callback) {
        callback(data);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  };
  this.post = function (nutrInfo, callback) {
    // console.log('SERVICE', identifiers);
    var nutrInfo = JSON.stringify(nutrInfo);
    // console.log('JSON', identifiers);
    $http({
      method: 'POST',
      url:  '/items', 
      data: nutrInfo,
      contentType: 'application/json',
      timeout: 4000
    })
    .then (function () {
      if (callback) {
        callback();
      }
    })
    .catch (function (err) {
      console.log(err);
    });
  };
  this.login = function (identifiers) {
    // console.log('SERVICE', identifiers);
    var identifiers = JSON.stringify(identifiers);
    // console.log('JSON', identifiers);
    $http({
      method: 'POST',
      url:  '/login', 
      data: identifiers,
      contentType: 'application/json',
      timeout: 4000
    })
    .then (function ({data}) {
      if (callback) {
        callback(data);
      }
    })
    .catch (function (err) {
      console.log(err);
    });
  };
});