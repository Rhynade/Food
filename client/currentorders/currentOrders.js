Template.currentOrders.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('dimSums');
		self.subscribe('orderItem');
		self.subscribe('Congee');
	});
});

Template.currentOrders.helpers({
	findOrder:() =>{
		return OrderItems.find({ custID : Meteor.user()._id , added: false});
	},
	findorderitem:() => {
		var catID = Template.currentData().category;
		
		if (catID == 1) {
			var food = DimSums.find({ _id: Template.currentData().foodID });
		}
		else if (catID==2){
			var food = Congee.find({ _id: Template.currentData().foodID });
		}
		return food.fetch()[0].name;
	},
	findprice:() => {
		var catID = Template.currentData().category;

		if (catID == 1) {
			var food = DimSums.find({ _id: Template.currentData().foodID });
		}
		else if (catID==2){
			var food = Congee.find({ _id: Template.currentData().foodID });
		}

		return food.fetch()[0].price
	}
});

