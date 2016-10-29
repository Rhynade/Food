Template.newDishes.events({
	'click #DimSum' : ()=>{
		var category = "Dim Sum";
		UserSession.set('selectedCat', category);

	},

	'click #Congee' : ()=>{
		var category = "Mongkok Congee";
		console.log("CONGEE")
		UserSession.set('selectedCat', category);

	},

	'click #Sides' : ()=>{
		var category = "Side Dishes";
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
