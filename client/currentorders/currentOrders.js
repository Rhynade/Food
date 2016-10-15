Template.currentOrders.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('dimSums');
		self.subscribe('orderItem');
		self.subscribe('Congee');
		self.subscribe('order');
	});
});

Template.currentOrders.helpers({
	findOrder:() =>{
		//console.log(Template.currentData()._id)
		//var orderid = Order.find({ custID: Meteor.user()._id, confirmed: false}).fetch()[0]._id;
		return OrderItems.find({ orderID: Template.currentData()._id, custID : Meteor.user()._id , added: false});
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

		return food.fetch()[0].price * quantity;
	},

	Order:() =>{
		return Order.find({ custID: Meteor.user()._id, confirmed: false});
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
		return total;

	},

	confirmOrder:() =>{
		return true;
	},

	findDate:()=>{
		return Order.find({ custID: Meteor.user()._id, confirmed: false}).fetch()[0].reservationDate;
	}
});

Template.currentOrders.events({
	'click .btn'(event,instance){
		//Order.update({_id: this._id}, {$set:{confirmed: true}});
		var elem = document.getElementById(this._id);
		elem.innerHTML = "Order Placed";
		$('#' +this._id).prop('disabled',true);
	}
});

