Template.currentOrders.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('dimSums');
		self.subscribe('orderItem');
		self.subscribe('Congee');
		self.subscribe('order');
		self.subscribe('users');
		self.subscribe('Sushi');
		self.subscribe('Drink');
	});

});

Template.currentOrders.helpers({

	findOrder:() =>{
		
		return OrderItems.find({ orderID: Template.currentData()._id, added: false});
		
	},

	notOver: ()=>{

		var currentDate = new Date();


		var reservationDate = Order.find({ _id: Template.currentData()._id, confirmed: false}).fetch()[0].reservationDate;
		
		
		return currentDate.getTime()<reservationDate.getTime();
	},

	findOrderUser: () =>{

		var custID = Template.currentData().custID

		return Accounts.users.find({_id: custID}).fetch();

		// return Accounts.users.find({_id: Meteor.user()._id}).fetch();
	},

	findOrderitem:() => {
		
		var catID = Template.currentData().category;
		
		if (catID == 1) {
			var food = DimSums.find({ _id: Template.currentData().foodID });
		}
		else if (catID==2){
			var food = Congee.find({ _id: Template.currentData().foodID });
		}

		else if (catID==3){
			var food = Sushi.find({ _id: Template.currentData().foodID });
		}

		else if (catID==4){
			var food = Drink.find({ _id: Template.currentData().foodID });
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
		else if (catID==3){
			var food = Sushi.find({ _id: Template.currentData().foodID });
		}
		else if (catID==4){
			var food = Drink.find({ _id: Template.currentData().foodID });
		}

		return (food.fetch()[0].price * quantity).toFixed(2);
	},

	Order:() =>{

		return Order.find({ custID: Meteor.user()._id, confirmed: false}, {sort: {reservationDate: -1}});
		
	},

	totalPrice:() =>{


		var orderid = Template.currentData()._id;

		var items = OrderItems.find({ orderID: orderid, added: false});

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

			else if(catID==3){
				price = Sushi.find({ _id: item.foodID }).fetch()[0].price;
				total += price * quantity;
			}

			else if(catID==4){
				price = Drink.find({ _id: item.foodID }).fetch()[0].price;
				total += price * quantity;
			}

		}
		//Order.update({_id: Template.currentData()._id}, {$set:{totalPrice: total}});
		Session.set(Template.currentData()._id, total);
		return total.toFixed(2);

	},

	findDate:()=>{

		return Order.find({ _id: Template.currentData()._id, confirmed: false}).fetch()[0].reservationDate.toDateString();
		
	},

	findTime: ()=> {
		
		return Order.find({ _id: Template.currentData()._id, confirmed: false}).fetch()[0].reservationTime;
	},

	findPax: ()=>{

		return Order.find({ _id: Template.currentData()._id, confirmed: false}).fetch()[0].numPax;

	},

	isUserOrderItem: ()=>{
		return Template.currentData().custID == Meteor.user()._id;
	},

	isUser:() =>{
		return Meteor.user().profile.role == 'User';
	}
});

Template.currentOrders.events({
	'click #place'(event,instance){
		var total = Session.get(this._id);
		Order.update({_id: this._id}, {$set:{confirmed: true, totalPrice: total}});

		var items = OrderItems.find({orderID: this._id});
		
		items.forEach(function(x){
			OrderItems.update({_id:x._id}, {$set:{added: true, custID: x.custID}}, {getAutoValues: false});
		});

		var order = Order.find({custID: Meteor.user()._id, confirmed:false}).fetch();
		 
		if (order.length>0){
			var NextOrderId = order[0]._id
			UserSession.set("currentorderid", NextOrderId);
		} else {
			UserSession.set("currentorderid", null);
		}
		
		FlowRouter.go('confirmedOrders');
		// var elem = document.getElementById(this._id);
		// elem.innerHTML = "Order Placed";
		// $('#' +this._id).prop('disabled',true);
	},
	'click #sendEmail': function(e,t) {
		e.preventDefault();

		var arr = [];
		
		var address = document.getElementById(this._id).value;

		var split = address.split(',');
		
		for(i=0; i<split.length; i++){
			arr.push(split[i])
		}

 		//console.log("ERR");
 		//console.log(this._id);
		//var address = t.find( '[name="email"]' ).value;
		//t.find( '[name="email"]' ).value = "";
		document.getElementById(this._id).value = "";
		var orderid = this._id;
		var email = {
			to: arr,
			from: 'admin@openjio.com',
			subject: "Invitation to Dine",
			text: "Click here: https://openjio.herokuapp.com/" + orderid + " to join us in building our menu."
		};
		Meteor.call('sendEmail', Meteor.userId(), email);

	},

	'click #delete': function(){
		Meteor.call('deleteOrder', this._id);

		var order = Order.find({custID: Meteor.user()._id, confirmed:false}).fetch();
		 
		if (order.length>0){
			var NextOrderId = order[0]._id
			UserSession.set("currentorderid", NextOrderId);
		} else {
			UserSession.set("currentorderid", null);
		}
	},

	'click #bin': function() {
		Meteor.call('deleteItem', this._id);
	}
});
