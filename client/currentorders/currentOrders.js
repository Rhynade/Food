Template.currentOrders.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('dimSums');
		self.subscribe('orderItem');
		self.subscribe('Congee');
		self.subscribe('order');
		self.subscribe('Accounts.users');
	});
});

Template.currentOrders.helpers({
	findOrder:() =>{
		//console.log(Template.currentData()._id)
		//var orderid = Order.find({ custID: Meteor.user()._id, confirmed: false}).fetch()[0]._id;
		return OrderItems.find({ orderID: Template.currentData()._id, custID : Meteor.user()._id , added: false});
	},

	findUser: () =>{
		return Accounts.users.find({_id:this._id});
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

	Order:() =>{
		return Order.find({ custID: Meteor.user()._id, confirmed: false}, {sort: {reservationDate: -1}});
	},

	totalPrice:() =>{
		var orderid = Template.currentData()._id;
		var items = OrderItems.find({ orderID: orderid, custID : Meteor.user()._id , added: false});
		var total = 0;
		var catID = 0;
		var quantity = 0;
		var price = 0;
		for (i=0; i<items.fetch().length ; i++){
			var item = items.fetch()[i];
			catID = item.category;
			quantity = item.quantity;
			if (catID==1) {
				price = DimSums.find({_id: item.foodID}).fetch()[0].price;
				total += price * quantity;
			}
			else if(catID==2){
				price = Congee.find({ _id: item.foodID }).fetch()[0].price;
				total += price * quantity;
			}

		}
		Order.update({_id: this._id}, {$set:{totalPrice: total}});
		return total.toFixed(2);

	},

	confirmOrder:() =>{
		return true;
	},

	findDate:()=>{
		return Order.find({ _id: Template.currentData()._id, confirmed: false}).fetch()[0].reservationDate.toDateString();
	},

	findTime: ()=> {
		return Order.find({ _id: Template.currentData()._id, confirmed: false}).fetch()[0].reservationTime;
	},

	findPax: ()=>{
		return Order.find({ _id: Template.currentData()._id, confirmed: false}).fetch()[0].numPax;
	}
});

Template.currentOrders.events({
	'click .btn'(event,instance){
		Order.update({_id: this._id}, {$set:{confirmed: true}});
		FlowRouter.go('orderhistory');
		// var elem = document.getElementById(this._id);
		// elem.innerHTML = "Order Placed";
		// $('#' +this._id).prop('disabled',true);
	}
});
