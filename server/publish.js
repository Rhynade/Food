Meteor.publish('dimSums', function(){
	return DimSums.find({});
});

Meteor.publish('imagesDimSum', function(){
  return ImagesDimSum.find();
});

Meteor.publish('orderItem', function(){
	return OrderItems.find({ custID : this.userId});
});

Meteor.publish('Congee', function(){
	return Congee.find({});
});

Meteor.publish('imagesCongee', function(){
  return ImagesCongee.find();
});

Meteor.publish('order', function(){
  return Order.find({ custID : this.userId });
});