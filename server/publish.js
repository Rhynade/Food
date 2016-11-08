Meteor.publish('dimSums', function(){
	return DimSums.find({});
});

Meteor.publish('imagesDimSum', function(){
	return ImagesDimSum.find();
});

Meteor.publish('Congee', function(){
	return Congee.find({});
});

Meteor.publish('imagesCongee', function(){
	return ImagesCongee.find();
});

Meteor.publish('Sushi', function(){
	return Sushi.find({});
});

Meteor.publish('imagesSushi', function(){
	return ImagesSushi.find();
});

Meteor.publish('Drink', function(){
	return Drink.find({});
});

Meteor.publish('imageDrink', function(){
	return ImageDrink.find();
});


Meteor.publish('order', function(){
	return Order.find({});
});

Meteor.publish('orderItem', function(){
	return OrderItems.find({});
});


Meteor.publish('users', function(){
	return Accounts.users.find({});
});
