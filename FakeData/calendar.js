/* 
 * Faking Calendar data
 * 
 */

var _ = require('lodash'),

	fs = require('fs'),
	
Chance = require('chance')

year = process.argv[2];

var chance = new Chance();

var Months = [ 'january','february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

var daysPerMonth = _.range(1, 31);

var getCategoriesList = function(){
	
	var totalCat = _.range(15);
	
	var catArray = [];
	
	(totalCat).forEach(function(n){
	
		var sentence = chance.sentence({words : _.random(3, 5)})
							  .replace('.', '');
	
		catArray.push( { color : chance.color( {format: 'hex'} ), guid : chance.guid(), name : sentence, isEnabled : true } );
	});
	
	return catArray;

}


var getEvents = function(catList){
	
	var calEvents = [];
	
	var eventsWithMonthKey =  {};
	
	var eventsForYear = _.range(1, 200);
	
	(eventsForYear).forEach(function(n){
		
		var randomMonth = _.random(0, 11);
		
		var randomDay = _.random(0,30);
		
		var randomCat = _.random(0,14);
		
		calEvents.push( { 
							month : Months[randomMonth],
			
							day : daysPerMonth[ randomDay ],
						
							starttime : chance.hour( {twentyfour: true} ) + ':' + chance.minute() ,
			
							endtime : chance.hour( {twentyfour: true} ) + ':' + chance.minute() ,
			
							title: chance.sentence({words : _.random(3, 5)}).replace('.', '') ,
						
							description : chance.paragraph({sentences: 2}),
			
							typeId : catList[randomCat].guid ,
			
							color : catList[randomCat].color
						
						} );
		
	});
	
		
	_.map( Months, function(n){
		
		eventsWithMonthKey[n] = _.filter( calEvents, { month : n } );
		
	});
	
	return eventsWithMonthKey;
	
}

var getCalendarData = function(){
	
	var current = require('./src/calendar-' + year + '.json');
	
	var calData = {};
	
	(Months).forEach(function(n){
		
		var tempArr = [];
				
		var strMonth = _.chain( current.monthlist )
						.filter( { Month : n } )
						.pluck( 'Days' )
						.first()
						.split(',')
						.value();
		
		var objVal =  _.map(strMonth, function(mdata){
			
			var temp = mdata.split('_');
			
			return { status : temp[0], day : temp[1] };
		});
		
				
		calData[n] = objVal;
		
		
	});
	
	return (calData);
};


var createCalendarJson = function(){
	
	var jsonToWrite = {}
	
	var objCategories = getCategoriesList();
	
	var objEvents = getEvents(objCategories);
	
	var monthList = getCalendarData();
			
	jsonToWrite.categories = objCategories;
	
	jsonToWrite.events = objEvents;
	
	jsonToWrite.calendar = monthList;
	
		
	fs.writeFile( './dist/' + year + '.json',  JSON.stringify(jsonToWrite), function(err){
		
		if (err) return console.log(err);
		
		console.log(year + '.json File written successfully!!!');
		
	});
};

createCalendarJson();