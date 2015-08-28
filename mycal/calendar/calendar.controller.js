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

(function () {
	
    'use strict';
		
		
	var CalendarController = function( $rootScope, $scope, $routeParams, calData){
		
		/* vm stand for viewmodel
		 * used in place of $scope
		 * as per JP's guide
		 */
		
		var vm = this;
		
		//vm.currentYear = (!resolveData) ? $routeParams.year : resolveData;

		vm.currentMonthYear = calData.calCurrentMonth;
		
		vm.calendar = '';
		
		vm.eventslist = '';
		
		vm.eventsPerCell = 3;
		
		/**
		* @name doSomething
		* @desc Does something awesome
		* @param {Number} x - First number to do something with
		* @param {Number} y - Second number to do something with
		* @returns {Number}
		*/
		
		var setCalendarLoad = function(objNew, objOld){
						
			if(objNew != objOld){
							
				vm.calendar = calData.getCalDataByMonth();
				//vm.calendar = calData.getMonthByIndex(objNew.month);
			}
			
		};
				
		var calDataSuccess = function(resData){
			
			//vm.calendar = calData.getMonthByIndex(vm.currentMonthYear.month);
			vm.calendar = calData.getCalDataByMonth();
		};
		
		
		var calDataError = function(http, status, fnc, httpObj){
			
			console.log('Calendar retrieval failed.',http,status,httpObj);
		};
		
		
		var getCalData = function(){
			
				return calData.fetchCalData( vm.currentMonthYear.year )
							  
							   .then(calDataSuccess, calDataError);
		};
			
		
		// Get calendar json on load
		getCalData();
		$scope.$watchCollection( 'cal.currentMonthYear' , setCalendarLoad);
					
	};
	
	angular
		.module('mycal')
		.controller('CalCtrl', CalendarController);
	
	CalendarController.$inject = [ '$rootScope' , '$scope', '$routeParams', 'calData'];
		
})();
