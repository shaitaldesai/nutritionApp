var Signup = angular.module('signup', [])
.controller('Signup', function ($scope, itemService) {
  this.signup = () => {
  	itemService.signup(this.user);
  }
})
.component('signup', {
	bindings: {},
  controller: 'Signup',
  templateUrl: '/templates/signup.html'
});
