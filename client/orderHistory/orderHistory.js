Template.orderHistory.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('dimSums');
		self.subscribe('orderItem');
		self.subscribe('Congee');
		self.subscribe('order');
	});
});

Template.orderHistory.helpers({


	Order:() =>{
		return Order.find({ custID: Meteor.user()._id, confirmed: true},{sort: {reservationDate: -1}});
	},

	past: () =>{
		var currentDate = new Date();

		var reservationDate = Order.find({ _id: Template.currentData()._id, confirmed: true}).fetch()[0].reservationDate;

		return currentDate.getTime()>reservationDate.getTime();
	},
	findOrderUser: () =>{

		var custID = Template.currentData().custID;
		
		return Accounts.users.find({_id: custID}).fetch();

		// return Accounts.users.find({_id: Meteor.user()._id}).fetch();
	},


	findOrder:() =>{
		
		//var orderid = Order.find({ custID: Meteor.user()._id, confirmed: false}).fetch()[0]._id;
		//console.log(OrderItems.find({orderID: Template.currentData()._id}));
		return OrderItems.find({ orderID: Template.currentData()._id});
	},
	findOrderitem:() => {
		
		var catID = Template.currentData().category;
		
		if (catID == 1) {
			var food = DimSums.find({ _id: Template.currentData().foodID });
		}
		else if (catID==2){
			var food = Congee.find({ _id: Template.currentData().foodID });
		}
		return food.fetch()[0].name;
	},
	findPrice:() => {
		var catID = Template.currentData().category;
		var quantity = Template.currentData().quantity;
		if (catID == 1) {
			var food = DimSums.find({ _id: Template.currentData().foodID });
		}
		else if (catID==2){
			var food = Congee.find({ _id: Template.currentData().foodID });
		}

		return (food.fetch()[0].price * quantity).toFixed(2);
	},

	totalPrice:() =>{
		
		return Order.find({ _id: Template.currentData()._id}).fetch()[0].totalPrice;

	},

	confirmOrder:() =>{
		return true;
	},

	findDate:()=>{
		return Order.find({ _id: Template.currentData()._id, confirmed: true}).fetch()[0].reservationDate.toDateString();
	},

	findTime: ()=> {
		return Order.find({ _id: Template.currentData()._id, confirmed: true}).fetch()[0].reservationTime;
	},

	findPax: ()=>{
		return Order.find({ _id: Template.currentData()._id, confirmed: true}).fetch()[0].numPax;
	},
	isUserOrderItem: ()=>{
		return Template.currentData().custID == Meteor.user()._id;
	}
});


