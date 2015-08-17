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
		
		var objDate = new Date();
		
		vm.currentYear = objDate.getFullYear();
		
		//console.log(yearMonth.year)
		
		/*$rootScope.$on('sampleBroadCast', function(event, args){
			
			console.log(args.currentYear);
			
		});*/
		
		var activate = function(){
			
				return calData.fetchCalData( vm.currentYear ).then(function(data) {
					
					vm.calAllData = data;
					
					console.log(vm.calAllData);
					
					return vm.calAllData;
				});
		};
		
		
		activate();
					
	};
	
	angular
		.module('mycal')
		.controller('CalCtrl', CalendarController);
	
	CalendarController.$inject = [ '$rootScope' , '$scope', '$routeParams', , 'calData'];
		
})();
