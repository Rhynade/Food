Template.profilepage.events({
	'click #sendEmail': function(e, t) {
		e.preventDefault();
		//console.log("ERR");
		//console.log(orderid);
		var orderid = "wntKmcbvwnaPWb5wJ";
		var email = {
			to: 'tanqyang@gmail.com',
			from: 'admin@openjio.com',
			subject: "Invitation to Dine",
			text: "https://openjio.herokuapp.com/" + orderid
		};
		Meteor.call('sendEmail', Meteor.userId(), email);
	},
	'submit form': function(e,t) {
		e.preventDefault();
		var firstname = t.find( '[name="FN"]' ).value;
		var lastname = t.find( '[name="LN"]' ).value;
		var name = lastname + " " + firstname;
		var gender = t.find('input[name = "gendergrp"]:checked').id;
		var block = t.find( '[name="Blk"]' ).value;
		var unit = t.find( '[name="UN"]' ).value;
		var postal = t.find( '[name="PC"]' ).value;
		var street = t.find( '[name="SN"]' ).value;
		var address = block + " " + street + " " + unit + " " + postal; 
		
		if(firstname && lastname && gender && block && unit && postal && street) {
			var id = Meteor.userId();
			Meteor.users.update(id, {$set:{profile:{role:"User",name:name,gender:gender,address:address}}});
			alert("Profile updated");
		}
		e.target.FN.value = "";
		e.target.LN.value = "";
		e.target.gendergrp.checked = false;
		e.target.Blk.value = "";
		e.target.UN.value = "";
		e.target.SN.value = "";
		e.target.PC.value = "";
		return false;
	}
});

Template.profilepage.onRendered(function(){
	$(document).ready(function(){
		$('ul.tabs').tabs();
	});
	$(document).ready(function(){
		$('ul.tabs').tabs('select_tab', 'tab_id');
	});
});

Template.profilepage.helpers({
	isUser:()=>{
		return Meteor.user().profile.role == 'User';
	}
})




