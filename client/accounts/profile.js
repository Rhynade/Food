Template.profilepage.events({
	'click #sendEmail': function(e, t) {
		e.preventDefault();
		console.log("ERR");
		//console.log(orderid);
		var orderid = "wntKmcbvwnaPWb5wJ";
		var email = {
            to: 'tanqyang@gmail.com',
            from: 'admin@XinWang.com',
            subject: "Invitation to Dine",
            text: "http://localhost:3000/" + orderid
        };
        Meteor.call('sendEmail', Meteor.userId(), email);
	}
});