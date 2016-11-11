Template.mainLayout.events({
	'click #log': function() {
		return Meteor.logout();
	},
	'click #copyBtn': function(event){
     	var clipboard = new Clipboard('.btn');
     	clipboard.on('success', function(e) {
     		sweetAlert("Copied to clipboard")
     		e.clearSelection();
     		clipboard.destroy();

     	});
     	clipboard.on('error',function(e){
     		sweetAlert("Error \n This function only works for Safari 10+ and Google Chrome 42+")

     	});
    },
	'click .intro': function(event){
		event.preventDefault();
		var guide = require('intro.js');
		guide.introJs().setOption('doneLabel','Next page').start().oncomplete(function(){
			window.location.href = '/currentOrders?multipage=true';
		});
	}	
});

Template.mainLayout.helpers({
	hasOrder: ()=>{
		var order = Order.find({custID: Meteor.user()._id, confirmed:false}).fetch();
		return order.length>0;
	}
});