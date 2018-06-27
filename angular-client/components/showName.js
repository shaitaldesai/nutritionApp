angular.module('app')
.controller('showName', function ($scope, itemsService) {
	this.display = false;
  this.getNdbno = (ndbno) => {
    console.log(this.name);
    itemsService.getByNdbno(ndbno, (message) => {
      this.fresh = message;
      console.log('NDBNO', this.fresh);
      this.display = true;
    });
  };
})
.component('showName', {
  bindings: {
    name: '<',
  },
  controller: 'showName',
  templateUrl: '/templates/name.html'
});