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
		
		
	var CalendarController = function($rootScope, $scope, $filter, calData){
		
		/* vm stand for viewmodel
		 * used in place of $scope
		 * as per JP's guide
		 */
		
		var vm = this;
		
		
		vm.currentMonthYear = calData.calCurrentMonth;
		
		vm.calendar = '';
		
		vm.eventslist = '';
		
		vm.typeIds = [];
		
		vm.eventsPerCell = 2;
		
		vm.eventsCatSelectAll = true;
		
		vm.setEventsCatSelectAll = function(){
			
			if(!vm.eventsCatSelectAll)
			{
				vm.typeIds.length = 0;
			}
			
			else{
				
				vm.typeIds = calData.getEventsTypeIDs();
			}
			
			_.map(vm.eventslist, function(obj){ obj.isEnabled  = vm.eventsCatSelectAll; });
		}
		
		
		
		vm.setEventsCatToogle = function(evecat){
			
			if(!evecat.isEnabled){
			
				_.remove(vm.typeIds, function(typeID){
					
					return (typeID === evecat.guid);
				});
			}
			
			else{
				vm.typeIds.push(evecat.guid);
			}
			
			var isAllChecked =  $filter('filter')( vm.eventslist, { isEnabled : false } ).length;
			
			vm.eventsCatSelectAll = (_.parseInt(isAllChecked) > 0) ? false : true;
		};
		
		/**
		* @name doSomething
		* @desc Does something awesome
		* @param {Number} x - First number to do something with
		* @param {Number} y - Second number to do something with
		* @returns {Number}
		*/
		
		var setCalendarLoad = function(objNew, objOld){
						
			if(objNew != objOld){
			
				if( objNew.year!== objOld.year ) {	getCalData(); }
				
				else{ vm.calendar = calData.getCalDataByMonth(); }
			}
			
		};
				
		var calDataSuccess = function(resData){
			
			vm.calendar = calData.getCalDataByMonth();
			
			vm.eventslist = calData.dataTypeList;
			
			vm.typeIds = calData.eventsTypeIDs;
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
	
	CalendarController.$inject = [ '$rootScope', '$scope', '$filter', 'calData'];
		
})();
