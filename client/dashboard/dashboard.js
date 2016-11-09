Template.dashboard.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('order');
		self.subscribe('orderItem');
		self.subscribe('dimSums');
		self.subscribe('Congee');
		self.subscribe('Sushi');
		self.subscribe('Drink');

	});
});

Template.dashboard.helpers({
	createChart: function() {
		var Highcharts = require('highcharts');
		require('highcharts/modules/drilldown')(Highcharts);
		var cat1 = OrderItems.find({category:1, added:true}).fetch();
		var cat2 = OrderItems.find({category:2, added:true}).fetch();
		var cat3 = OrderItems.find({category:3, added:true}).fetch();
		var cat4 = OrderItems.find({category:4, added:true}).fetch();


		//dim sums
		var siewmai = 0;
		var charsiewbao = 0;
		var eggtart = 0;
		var shrimpdumplings = 0;
		var porkribs = 0;
		var sesame = 0;
		var rice = 0;
		var turnip = 0;

		var sum1 = 0;

		for (i=0; i<cat1.length ; i++){
			var food= DimSums.find({ _id: cat1[i].foodID}).fetch()[0];
			if (food.name == "Siew mai"){
				siewmai += cat1[i].quantity;
			} 
			else if (food.name == "Char Siew Bao"){
				charsiewbao += cat1[i].quantity;
			} 
			else if (food.name == "Egg Tart"){
				eggtart +=cat1[i].quantity;
			} 
			else if (food.name == "Shrimp Dumplings"){
				shrimpdumplings +=cat1[i].quantity;
			}
			else if (food.name == "Steamed Pork Ribs"){
				porkribs +=cat1[i].quantity;
			}
			else if (food.name == "Fried Sesame Balls"){
				sesame +=cat1[i].quantity;
			}
			else if (food.name == "Glutinous Rice"){
				rice +=cat1[i].quantity;
			} 
			else if (food.name == "Fried Turnip Cake"){
				turnip +=cat1[i].quantity;
			}
			sum1 += cat1[i].quantity;
		}

		//congee
		var porkCongee = 0;
		var fishCongee = 0;


		var sum2 = 0;

		for (i=0; i<cat2.length ; i++){
			var food= Congee.find({ _id: cat2[i].foodID}).fetch()[0];
			if (food.name == "Pork Congee"){
				porkCongee += cat2[i].quantity;
			} 
			else if (food.name == "Fish Congee"){
				fishCongee +=cat2[i].quantity;
			}

			sum2 += cat2[i].quantity;
		}

		var salmon = 0;
		var avocado = 0;
		var chicken = 0;
		var cheese = 0;
		var tempura = 0;
		var california = 0;
		var unagi = 0;
		var mango = 0;

		var sum3 = 0;


		for (i=0; i<cat3.length ; i++){
			var food= Sushi.find({ _id: cat3[i].foodID}).fetch()[0];
			if (food.name == "Spicy Salmon Roll"){
				salmon += cat3[i].quantity;
			} 
			else if (food.name == "Avocado Sushi Roll"){
				avocado +=cat3[i].quantity;
			}
			else if (food.name == "Cheese Chicken Roll"){
				cheese +=cat3[i].quantity;
			}
			else if (food.name == "Mango Roll"){
				mango +=cat3[i].quantity;
			}
			else if (food.name == "Chicken Katsu Roll"){
				chicken +=cat3[i].quantity;
			}
			else if (food.name == "Crispy Tempura Roll"){
				tempura +=cat3[i].quantity;
			}
			else if (food.name == "California Roll"){
				california +=cat3[i].quantity;
			}
			else if (food.name == "Unagi Roll"){
				unagi +=cat3[i].quantity;
			}

			sum3 += cat3[i].quantity;

		}

		var orange = 0;
		var jasmine = 0;
		var green = 0;
		var barley = 0;

		var sum4 = 0;

		for (i=0; i<cat4.length ; i++){
			var food= Drink.find({ _id: cat4[i].foodID}).fetch()[0];
			if (food.name == "Orange Juice"){
				orange += cat4[i].quantity;
			} 
			else if (food.name == "Jasmine Tea"){
				jasmine +=cat4[i].quantity;
			}
			else if (food.name == "Green Tea"){
				green +=cat4[i].quantity;
			}
			else if (food.name == "Barley"){
				barley +=cat4[i].quantity;
			}

			sum4 += cat4[i].quantity;
		}


		//var allOrders = Order.find().count();
		var ordersData = [{
				y: sum1*100/(sum1+sum2+sum3+sum4),
				name: "Dim Sum",
				drilldown: "dimsums"
			},{
				y: sum2*100/(sum1+sum2+sum3+sum4),
				name: "Congee",
				drilldown: "congees"
			},{
				y: sum3*100/(sum1+sum2+sum3+sum4),
				name: "Sushi",
				drilldown: "sushis"
			},{
				y: sum4*100/(sum1+sum2+sum3+sum4),
				name: "Drink",
				drilldown: "drinks"
			}];

		var dimsums = [{
				name: "Siew Mai",
				y: siewmai*100/sum1
			},{
				name: "Char Siew Bao",
				y: charsiewbao*100/sum1
			}, {
				name: "Egg Tart",
				y: eggtart*100/sum1
			}, {
				name: "Shrimp Dumplings",
				y: shrimpdumplings*100/sum1	
			},{
				name: "Stemed Porked Rib",
				y: porkribs*100/sum1
			},
			{
				name: "Fried Sesame Balls",
				y: sesame*100/sum1
			},
			{
				name: "Glutinous Rice",
				y: rice*100/sum1
			},
			{
				name: "Fried Turnip Cake",
				y: turnip*100/sum1
			}];

		var congees = [{
				name:"Pork Congee",
				y:porkCongee*100/sum2
			}, {
				name: "Fish Congee",
				y: fishCongee*100/sum2
			}
		];

		var sushis = [{
				name: "Spicy Salmon Roll",
				y: salmon*100/sum3
			},{
				name: "Avocado Roll",
				y: avocado*100/sum3
			}, {
				name: "Cheese Chicken Roll",
				y: cheese*100/sum3
			}, {
				name: "Chicken Katsu Roll",
				y: chicken*100/sum3	
			},{
				name: "Crispy Tempura Roll",
				y: tempura*100/sum3
			},
			{
				name: "California Roll",
				y: california*100/sum3
			},
			{
				name: "Unagi Roll",
				y: unagi*100/sum3
			},
			{
				name: "Mango Roll",
				y: mango*100/sum3
			},];

		var drinks = [{
				name:"Orange Juice",
				y:orange*100/sum4
			}, {
				name: "Jasmine Tea",
				y: jasmine*100/sum4
			}, {
				name: "Green Tea",
				y: jasmine*100/sum4
			}, {
				name: "Barley",
				y: barley*100/sum4
			}
		];

		Meteor.defer(function(){
			Highcharts.chart('chart',{
				title:{
					text: "Breakdown of Orders by Food Category"
				},
		        plotOptions: {
		            series: {
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.name}: {point.y:.1f}%'
		                }
		            }
		        },
				series: [{
					type: 'pie',
					data: ordersData,
				}],
				drilldown:{
					series: [{
						name:"DimSums",
						id:"dimsums",
						type:'pie',
						data: dimsums
					}, {
						id:"congees",
						name:"Congees",
						type:'pie',
						data: congees
					}, {
						name: "Sushi",
						id: "sushis",
						type: 'pie',
						data: sushis
					},{
						name: "Drink",
						id: "drinks",
						type: 'pie',
						data: drinks
					}]
				}
			});
		});
	},

	createLineChart: function(){
		var Highcharts = require('highcharts');

		var numOrders = Order.find({confirmed:true}).fetch();

		var monday = [0,0,0,0,0,0,0,0,0,0,0,0,];
		var tuesday = [0,0,0,0,0,0,0,0,0,0,0,0,];
		var wednesday = [0,0,0,0,0,0,0,0,0,0,0,0,];
		var thursday = [0,0,0,0,0,0,0,0,0,0,0,0,];
		var friday = [0,0,0,0,0,0,0,0,0,0,0,0,];
		var saturday = [0,0,0,0,0,0,0,0,0,0,0,0,];
		var sunday = [0,0,0,0,0,0,0,0,0,0,0,0,];

		
		for (i=0; i<numOrders.length; i++){
			var date = Order.find({confirmed:true}).fetch()[i].reservationDate;
			var date = date.toString().split(' ')[0];
			
			var time = Order.find({confirmed:true}).fetch()[i].reservationTime;

			if (date=="Sun"){

				if (time=="1000"){
					sunday[0] += 1;
				} else if (time=="1100") {
					sunday[1] +=1;
				} else if (time=="1200"){
					sunday[2] += 1;
				} else if (time=="1300"){
					sunday[3] += 1;
				} else if (time=="1400"){
					sunday[4] += 1;
				} else if (time=="1500"){
					sunday[5] += 1;
				} else if (time=="1600"){
					sunday[6] += 1;
				} else if (time=="1700"){
					sunday[7] += 1;
				} else if (time=="1800"){
					sunday[8] += 1;
				} else if (time=="1900"){
					sunday[9] += 1;
				} else if (time=="2000"){
					sunday[10] += 1;
				} else if (time=="2100"){
					sunday[11] += 1;
				} 	
			} else if (date=="Mon") {

				if (time=="1000"){
					monday[0] += 1;
				} else if (time=="1100") {
					monday[1] +=1;
				} else if (time=="1200"){
					monday[2] += 1;
				} else if (time=="1300"){
					monday[3] += 1;
				} else if (time=="1400"){
					monday[4] += 1;
				} else if (time=="1500"){
					monday[5] += 1;
				} else if (time=="1600"){
					monday[6] += 1;
				} else if (time=="1700"){
					monday[7] += 1;
				} else if (time=="1800"){
					monday[8] += 1;
				} else if (time=="1900"){
					monday[9] += 1;
				} else if (time=="2000"){
					monday[10] += 1;
				} else if (time=="2100"){
					monday[11] += 1;
				} 	
			} else if (date=="Tue") {

				if (time=="1000"){
					tuesday[0] += 1;
				} else if (time=="1100") {
					tuesday[1] +=1;
				} else if (time=="1200"){
					tuesday[2] += 1;
				} else if (time=="1300"){
					tuesday[3] += 1;
				} else if (time=="1400"){
					tuesday[4] += 1;
				} else if (time=="1500"){
					tuesday[5] += 1;
				} else if (time=="1600"){
					tuesday[6] += 1;
				} else if (time=="1700"){
					tuesday[7] += 1;
				} else if (time=="1800"){
					tuesay[8] += 1;
				} else if (time=="1900"){
					tuesday[9] += 1;
				} else if (time=="2000"){
					tuesday[10] += 1;
				} else if (time=="2100"){
					tuesday[11] += 1;
				} 	
			} else if (date=="Wed") {

				if (time=="1000"){
					wednesday[0] += 1;
				} else if (time=="1100") {
					wednesday[1] +=1;
				} else if (time=="1200"){
					wednesday[2] += 1;
				} else if (time=="1300"){
					wednesday[3] += 1;
				} else if (time=="1400"){
					wednesday[4] += 1;
				} else if (time=="1500"){
					wednesday[5] += 1;
				} else if (time=="1600"){
					wednesday[6] += 1;
				} else if (time=="1700"){
					wednesday[7] += 1;
				} else if (time=="1800"){
					wednesday[8] += 1;
				} else if (time=="1900"){
					wednesday[9] += 1;
				} else if (time=="2000"){
					wednesday[10] += 1;
				} else if (time=="2100"){
					wednesday[11] += 1;
				} 	
			} else if (date=="Thu") {

				if (time=="1000"){
					thursday[0] += 1;
				} else if (time=="1100") {
					thursday[1] +=1;
				} else if (time=="1200"){
					thursday[2] += 1;
				} else if (time=="1300"){
					thursday[3] += 1;
				} else if (time=="1400"){
					thursday[4] += 1;
				} else if (time=="1500"){
					thursday[5] += 1;
				} else if (time=="1600"){
					thursday[6] += 1;
				} else if (time=="1700"){
					thursday[7] += 1;
				} else if (time=="1800"){
					thursday[8] += 1;
				} else if (time=="1900"){
					thursday[9] += 1;
				} else if (time=="2000"){
					thursday[10] += 1;
				} else if (time=="2100"){
					thursday[11] += 1;
				} 	
			} else if (date=="Fri") {

				if (time=="1000"){
					friday[0] += 1;
				} else if (time=="1100") {
					friday[1] +=1;
				} else if (time=="1200"){
					friday[2] += 1;
				} else if (time=="1300"){
					friday[3] += 1;
				} else if (time=="1400"){
					friday[4] += 1;
				} else if (time=="1500"){
					friday[5] += 1;
				} else if (time=="1600"){
					friday[6] += 1;
				} else if (time=="1700"){
					friday[7] += 1;
				} else if (time=="1800"){
					friday[8] += 1;
				} else if (time=="1900"){
					friday[9] += 1;
				} else if (time=="2000"){
					friday[10] += 1;
				} else if (time=="2100"){
					friday[11] += 1;
				} 	
			} else if (date=="Sat") {

				if (time=="1000"){
					saturday[0] += 1;
				} else if (time=="1100") {
					saturday[1] +=1;
				} else if (time=="1200"){
					saturday[2] += 1;
				} else if (time=="1300"){
					saturday[3] += 1;
				} else if (time=="1400"){
					saturday[4] += 1;
				} else if (time=="1500"){
					saturday[5] += 1;
				} else if (time=="1600"){
					saturday[6] += 1;
				} else if (time=="1700"){
					saturday[7] += 1;
				} else if (time=="1800"){
					saturday[8] += 1;
				} else if (time=="1900"){
					saturday[9] += 1;
				} else if (time=="2000"){
					saturday[10] += 1;
				} else if (time=="2100"){
					saturday[11] += 1;
				} 	
			}
		}

		// Order.find({ _id: Template.currentData()._id, confirmed: true}).fetch()[0].reservationDate.toDateString();

		// return Order.find({ _id: Template.currentData()._id, confirmed: true}).fetch()[0].reservationTime;		


		Meteor.defer(function(){
			Highcharts.chart('linechart',{
				title: {
            text: 'Hourly Reservations',
            x: -20 //center
        },
        xAxis: {
            categories: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', 
            			'16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
        },
        yAxis: {
            title: {
                text: 'Number of Reservations'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Monday',
            data: monday
        }, {
            name: 'Tuesday',
            data: tuesday
        }, {
            name: 'Wednesday',
            data: wednesday
        }, {
            name: 'Thursday',
            data: thursday
        }, {
            name: 'Friday',
            data: friday
        }, {
            name: 'Saturday',
            data: saturday
        }, {
            name: 'Sunday',
            data: sunday
        }]
    });
    });
    } 
});