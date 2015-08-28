/*
 * @name CalCtrl
 * @desc: Contains methods and members related to clendar
 *
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

// Wrap everything in an Immediately Invoked Function Expression (IIFE)
// As per JP's guide

(function(){
	
	'use strict';
	
	var calendarDataFactory = function($http, $q){
	
		var FETCHURL 		= 'JSON/';
		var objDate        	= new Date();
		var dataMonthList  	= [];
		var dataTypeList   	= [];
		var dataEvents     	= [];
				
		var calMonthList = [ 
								{ monthname: 'January' , monthnum : 0 },
								{ monthname: 'February' , monthnum : 1 },
								{ monthname: 'March' , monthnum : 2 },
								{ monthname: 'April' , monthnum : 3 },
								{ monthname: 'May' , monthnum : 4 },
								{ monthname: 'June' , monthnum : 5 },
								{ monthname: 'July' , monthnum : 6 },
								{ monthname: 'August' , monthnum : 7 },
								{ monthname: 'September' , monthnum : 8 },
								{ monthname: 'October' , monthnum : 9 },
								{ monthname: 'November' , monthnum : 10 },
								{ monthname: 'December' , monthnum : 11 }
							];
		
		var calYearList = [2013, 2014, 2015, 2016, 2017];
		
		var calCurrentMonth = {};
		
		
		var getCalDataByMonth = function(){
		
			var calResults = [];
			
			var monthText = getCurrentMonthText();
			
			var calDays = getMonthByIndex(calFactory.calCurrentMonth.month);
			
			var cMonthEvents = _.chain( calFactory.dataEvents )
			
								.filter( { EventMonth : monthText } )
			
								.pluck('Days')
					
								.first()
			
								.value();
			
			_.map( calDays, function(objDay){
				
					 var objEvents =   _.chain( cMonthEvents )
					 				  
					 					.filter( { EventDay: objDay.daynum } )
					 
					 					.pluck('Events')
					 
										.first()
					 
					 					.compact()

										.value();
					 
				calResults.push({ state : objDay.state , daynum : objDay.daynum, events :(objDay.state !== 'I') ? objEvents : [] }); 
		
			});
			
			 return calResults;			
		};
		
		
		var getCurrentMonthText = function(){
			
			 var mtext  = 	_.chain( calMonthList )

							.filter( { monthnum: calFactory.calCurrentMonth.month } )

							.pluck('monthname')

							.first()

							.value();
			
			return mtext.toLowerCase();
		};
		
				
		var getMonthByIndex = function(mindex){
			
			var objMonth = calFactory.dataMonthList[mindex].Days.split(',');
			
			return(_.map(objMonth, splitMonthArray));
		};
		
		
		var splitMonthArray = function(n){
			
			var split = n.split('_');
			
			return { state : split[0] , daynum : split[1] };
		};
		

	// Ajax related functions	
		
		
		var getCalDataByYear = function(cyear){
			
			return $http.get(FETCHURL + cyear.toString() + '.json')
						.then(handleSuccess, handleError);
			
		};
		
		
		var handleError = function( response ){

		// The API response from the server should be returned in a
		// nomralized format. However, if the request was not handled by the
		// server (or what not handles properly - ex. server error), then we
		// may have to normalize it on our end, as best we can.

			if (!angular.isObject( response.data ) || ! response.data.Message) {

				return( $q.reject( 'An unknown error occurred.' ) );

			}

			// Otherwise, use expected error message.
			return( $q.reject( response.data.Message ) );

		};
	
	
	
		var handleSuccess = function( response ){

			calFactory.dataMonthList = response.data.Output.monthlist;
									
			calFactory.dataTypeList = response.data.Output.eventtypelist;
			
			calFactory.dataEvents = response.data.Output.events.year.Months;
			
			console.log(calFactory.dataTypeList);
						 
			return( response.data );

		};
		
		
		
		var calFactory = {
		
			currentMonth : objDate.getMonth(),
			
			/*currentYear : objDate.getFullYear(),*/
			
			currentYear : 2013,
			
			fetchCalData : getCalDataByYear,
			
			calMonthList : calMonthList,
			
			calYearList  : calYearList,
			
			calCurrentMonth : calCurrentMonth,
			
			dataMonthList : dataMonthList,
			
			dataTypeList : dataTypeList,
			
			dataEvents : dataEvents,
			
			getCalDataByMonth : getCalDataByMonth
		
		};
		
		return calFactory;
		
		
	};
	
	
	angular
		.module('mycal')
		.factory('calData', calendarDataFactory);
	
	
	calendarDataFactory.$inject = ['$http', '$q'];
	
	
})();