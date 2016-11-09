Template.newDishes.events({
	'click #DimSum' : ()=>{
		var category = "Dim Sum";
		UserSession.set('selectedCat', category);

	},

	'click #Congee' : ()=>{
		var category = "Mongkok Congee";
		
		UserSession.set('selectedCat', category);

	},

	'click #Sushi' : ()=>{
		var category = "Sushi";
		UserSession.set('selectedCat', category);

	},

	'click #Drinks' : ()=>{
		var category = "Drinks";
		UserSession.set('selectedCat', category);

	}

	// 'click #button': ()=>{
	// 	var cat = Session.get('selectedCat');
	// 	return Session.get('selectedCat');
	// }
});

Template.newDishes.helpers({
	dimsum:()=>{
		var cat = UserSession.get('selectedCat');
		return cat == "Dim Sum";
	},
	
	congee:()=>{
		var cat = UserSession.get('selectedCat');
		return cat == "Mongkok Congee";
	},

	sushi:()=>{
		var cat = UserSession.get('selectedCat');
		return cat == "Sushi";
	},

	drink:()=>{
		var cat = UserSession.get('selectedCat');
		return cat == "Drinks";
	},

	isAdmin:()=>{
		return Meteor.user().profile.role == 'Admin';
	}
});

AutoForm.addHooks(["insertDimSumForm"], {
	

	onSuccess: function(operation, result, template) {
		FlowRouter.go('menu');
	}
});


AutoForm.addHooks(["insertCongeeForm"], {
	

	onSuccess: function(operation, result, template) {
		FlowRouter.go('mongkokCongee');
	}
});

AutoForm.addHooks(["insertSushiForm"], {
	

	onSuccess: function(operation, result, template) {
		FlowRouter.go('sushi');
	}
});

AutoForm.addHooks(["insertDrinkForm"], {
	

	onSuccess: function(operation, result, template) {
		FlowRouter.go('drinks');
	}
});

