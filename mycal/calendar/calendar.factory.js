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
	
		var FETCHURL 			= 'FakeJSON/',
			objDate        		= new Date(),
			dataMonthList  		= [],
			dataTypeList   		= [],
			dataEvents     		= [],
			eventsTypeIDs  	    = [],
			
		 	calMonthList = [ 
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
							],
		
			calYearList = [2012, 2013, 2014, 2015, 2016, 2017],
			calCurrentMonth = {};
			
		
		var getCalDataByMonth = function(){
		
			var calResults = [];
			
			var monthText = getCurrentMonthText();
			
			var calDays = calFactory.dataMonthList[monthText];
			
			var cMonthEvents = calFactory.dataEvents[monthText];
			
						
			_.map( calDays, function(objDay){
				
					if(objDay.status === 'A')
					{
						var objEvents =  _.filter( cMonthEvents, { 'day' : _.parseInt(objDay.day) } );

						objDay.events = objEvents;
						
					}
				
					else{ objDay.events = []; }
				
					calResults.push(objDay);
				
				});
			
			calFactory.currentCaldendarData = calResults;
						
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
		
				
		/*var getMonthByIndex = function(mindex){
			
			var objMonth = calFactory.dataMonthList[mindex].Days.split(',');
			
			return(_.map(objMonth, splitMonthArray));
		};*/
		
		
		/*var splitMonthArray = function(n){
			
			var split = n.split('_');
			
			return { state : split[0] , daynum : split[1] };
		};*/
		
		var getEventsTypeIDs = function(){
			
			return _.pluck(calFactory.dataTypeList, 'guid');
			
		};
		

	// Ajax related functions	
		
		
		var getCalDataByYear = function(cyear){
			
			cyear = (_.isUndefined(cyear)) ? calFactory.currentYear : cyear;
			
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
			
			
			calFactory.dataMonthList = response.data.calendar;
									
			calFactory.dataTypeList = response.data.categories;
			
			calFactory.dataEvents = response.data.events;
			
			calFactory.eventsTypeIDs = getEventsTypeIDs();
			
			return( response.data );

		};
		
		
		
		var calFactory = {
		
			currentMonth : objDate.getMonth(),
			
			currentYear : objDate.getFullYear(),
			
			fetchCalData : getCalDataByYear,
			
			calMonthList : calMonthList,
			
			calYearList  : calYearList,
			
			calCurrentMonth : calCurrentMonth,
			
			dataMonthList : dataMonthList,
			
			dataTypeList : dataTypeList,
			
			dataEvents : dataEvents,
			
			eventsTypeIDs : eventsTypeIDs,
			
			getEventsTypeIDs : getEventsTypeIDs,
			
			getCalDataByMonth : getCalDataByMonth
	
		};
		
		return calFactory;
	};
	
	
	angular
		.module('mycal')
		.factory('calData', calendarDataFactory);
	
	
	calendarDataFactory.$inject = ['$http', '$q'];
	
	
})();