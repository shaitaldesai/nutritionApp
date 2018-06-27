angular.module('app')
.controller('AppCtrl', function($scope,  itemsService) {
  this.myStyle = {
    color: 'green',
    margin: 'auto',
    width: '50%',
    border: '3px solid green',
    padding: '10px',
    'background-color': 'rgb(247, 246, 237)'
  };
  this.buttonStyle = {
    'margin-top': '5px',
    'margin-bottom': '5px',
  }
  this.titleStyle = {
    'text-align': 'center',
    background: 'url("/templates/groceries.png") no-repeat top center',
    height: '100px',
    'padding-top': '7%',
  }
  this.savedMessage = () => {
    alert('Saved  Nutrition Info!');
  }
  this.getAll = (query) => {
  	itemsService.getAll(query, (data) => {
  		this.items = data;
  	});
  };
  this.getNames = () => {
    itemsService.getNames((data) => {
      this.names = data;
      console.log(this.names);
    });    
  }
  // this.changeClass = function () {
  //   this.hidden.display = 'none'? 'block' : 'none';
  //   // this.show.display = 'block'? 'none' : 'block';
  //     };
  this.hidden = {
    display: 'none'
  };
  this.show = {
    display: 'block'
  };
  this.getNdbno = (ndbno) => {
    itemsService.getByNdbno(ndbno, (message) => {
      this.fresh = message;
      this.hidden.display = 'block';
      this.hidden.color = '#cc7441';
      // this.show.display = 'none';
      // this.changeClass();
      console.log('NDBNO', this.fresh[0]);
    });
  }
  this.save = () => {
    itemsService.post(this.items, this.savedMessage);
  }
  this.login = () => {
  	console.log('LOGIN', this.input);
    itemsService.login(this.input);
  }
})
.component('app', {
  bindings: {},
  controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
});