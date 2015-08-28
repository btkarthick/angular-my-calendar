
/**
 * @name: TopCtrl
 * @desc: 
 * Controller for Top slect boxes and buttons controls
 * Contains methods and members related to slect boxes and buttons controls
 *
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

// Wrap everything in an Immediately Invoked Function Expression (IIFE)
// As per JP's guide

(function () {
	
    'use strict';
	
	
	var topControlsController = function($rootScope, $scope, $location, calData){
		
		$scope.months = calData.calMonthList; 
		
		$scope.modelMonthYear = { month : calData.currentMonth, year: calData.currentYear};
		
		$scope.years = calData.calYearList;
								
		// User defined functions defintions
		
		/**
		* @name doSomething
		* @desc Does something awesome
		* @param {Number} x - First number to do something with
		* @param {Number} y - Second number to do something with
		* @returns {Number}
		*/
		
		var setYearChange = function(cval, pval){
			
			if(cval !== pval){
				
				$location.path('year/' + cval);
				
			}
		};
	
		// End of User defined functions
		$scope.$watch('modelMonthYear.year', setYearChange);
	};
	
	
	angular
		.module('mycal')
		.controller('TopCtrl', topControlsController);
	
	topControlsController.$inject = ['$rootScope', '$scope', '$location', 'calData' ];
	
})();	