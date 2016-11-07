Template.currentOrders.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('dimSums');
		self.subscribe('orderItem');
		self.subscribe('Congee');
		self.subscribe('order');
		self.subscribe('users');
	});

	UserSession.set('tab', 'unconfirmed');
});

Template.currentOrders.helpers({

	findOrder:() =>{
		//var orderid = Order.find({ custID: Meteor.user()._id, confirmed: false}).fetch()[0]._id;
		var tab = UserSession.get('tab');

		if (tab=="unconfirmed"){
			return OrderItems.find({ orderID: Template.currentData()._id, added: false});
		} else {
			return OrderItems.find({ orderID: Template.currentData()._id, added: true});
		}
	},

	notOver: ()=>{

		var tab = UserSession.get('tab');

		var currentDate = new Date();

		if (tab=="unconfirmed"){

			var reservationDate = Order.find({ _id: Template.currentData()._id, confirmed: false}).fetch()[0].reservationDate;
 
		} else {
			var reservationDate = Order.find({ _id: Template.currentData()._id, confirmed: true}).fetch()[0].reservationDate;
		}
		
		return currentDate.getTime()<reservationDate.getTime();
	},

	findOrderUser: () =>{

		var custID = Template.currentData().custID;
 	
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

		var tab = UserSession.get('tab');

		if (tab=="unconfirmed"){
			return Order.find({ custID: Meteor.user()._id, confirmed: false}, {sort: {reservationDate: -1}});
		} else {
			return Order.find({ custID: Meteor.user()._id, confirmed: true}, {sort: {reservationDate: -1}});
		}
	},

	totalPrice:() =>{

		var tab = UserSession.get('tab');

		var orderid = Template.currentData()._id;

		if (tab=="unconfirmed"){
			var items = OrderItems.find({ orderID: orderid, added: false});
		} else {
			var items = OrderItems.find({ orderID: orderid, added: true});
		}

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
		//Order.update({_id: Template.currentData()._id}, {$set:{totalPrice: total}});
		Session.set(Template.currentData()._id, total);
		return total.toFixed(2);

	},

	confirmOrder:() =>{
		return true;
	},

	findDate:()=>{

		var tab = UserSession.get('tab');

		if (tab=="unconfirmed"){
			return Order.find({ _id: Template.currentData()._id, confirmed: false}).fetch()[0].reservationDate.toDateString();
		} else {
			return Order.find({ _id: Template.currentData()._id, confirmed: true}).fetch()[0].reservationDate.toDateString();
		}
	},

	findTime: ()=> {

		var tab = UserSession.get('tab');

		if (tab=="unconfirmed"){	
			return Order.find({ _id: Template.currentData()._id, confirmed: false}).fetch()[0].reservationTime;
		} else {
			return Order.find({ _id: Template.currentData()._id, confirmed: true}).fetch()[0].reservationTime;
		}
	},

	findPax: ()=>{

		var tab = UserSession.get('tab');

		if (tab=="unconfirmed") {
			return Order.find({ _id: Template.currentData()._id, confirmed: false}).fetch()[0].numPax;
		} else {
			return Order.find({ _id: Template.currentData()._id, confirmed: true}).fetch()[0].numPax;
		}
	},

	isUserOrderItem: ()=>{
		return Template.currentData().custID == Meteor.user()._id;
	},

	unconfirmed: ()=>{
		return UserSession.get('tab')=="unconfirmed";
	}
});

Template.currentOrders.events({
	'click #place'(event,instance){
		var total = Session.get(this._id);
		Order.update({_id: this._id}, {$set:{confirmed: true, totalPrice: total}});

		var items = OrderItems.find({orderID: this._id});

		items.forEach(function(x){
			OrderItems.update({_id:x._id}, {$set:{added: true}});
		});


		UserSession.set("currentorderid", null);
		UserSession.set("tab", "confirmed");
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
            from: 'admin@XinWang.com',
            subject: "Invitation to Dine",
            text: "http://localhost:3000/" + orderid
        };
        Meteor.call('sendEmail', Meteor.userId(), email);

	},

	'click #unconfirmed': function(){
		UserSession.set('tab', 'unconfirmed');
	},

	'click #confirmed': function(){
		UserSession.set('tab', 'confirmed');
	},

	'click #delete': function(){
		Meteor.call('deleteOrder', this._id);
	},

	'click #bin': function() {
		Meteor.call('deleteItem', this._id);
	}
});
