
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
	
	
	var topControlsController = function($rootScope, $scope, $location){
		
		/* vm stand for viewmodel
		 * used in place of $scope
		 * as per JP's guide
		 */
		
		var vm = this;
		
		var objDate = new Date();
		
		vm.months = [ 
						{ monthname: 'January' , monthnum : 1 },
						{ monthname: 'February' , monthnum : 2 },
						{ monthname: 'March' , monthnum : 3 },
						{ monthname: 'April' , monthnum : 4 },
						{ monthname: 'May' , monthnum : 5 },
						{ monthname: 'June' , monthnum : 6 },
						{ monthname: 'July' , monthnum : 7 },
						{ monthname: 'August' , monthnum : 8 },
						{ monthname: 'September' , monthnum : 9 },
						{ monthname: 'October' , monthnum : 10 },
						{ monthname: 'November' , monthnum : 11 },
						{ monthname: 'December' , monthnum : 12 }
					
					]; 
		
		vm.selectedMonth = (objDate.getMonth() + 1);
		
		vm.years = [ 2015, 2016, 2017, 2018 ];
		
		vm.selectedYear = objDate.getFullYear();
		
		vm.prevNextMonth = { 
			
								'previous' : { 'text' : '', 'isHidden': true },
			
								'next' : { 'text' : '', 'isHidden': true }
							};
		
		vm.calAllData = [];
		
				
				
		// User defined functions defintions
		
		/**
		* @name doSomething
		* @desc Does something awesome
		* @param {Number} x - First number to do something with
		* @param {Number} y - Second number to do something with
		* @returns {Number}
		*/
		
		var getPrevNextMonth = function(newVal, oldVal){
			
				var objPrev = _.pluck(_.filter(vm.months, 'monthnum', (newVal-1)), 'monthname');

				var objNext = _.pluck(_.filter(vm.months, 'monthnum', (newVal+1)), 'monthname');

				vm.prevNextMonth.previous = (!_.isEmpty(objPrev)) ? { 'text' : objPrev.toString(), 'isHidden': true } : { 'text' : '', 'isHidden': false };


				vm.prevNextMonth.next = (!_.isEmpty(objNext)) ? { 'text' : objNext.toString(), 'isHidden': true } : { 'text' : '', 'isHidden': false };


			if(newVal !== oldVal){
				
				$location.path('month/' + newVal);
			}

		};
		
		
		
		var setYearChange = function(cval, pval){
			
			if(cval !== pval){
				
				$rootScope.$emit('yearchange', { changedYear: cval });
			}
		};
		
			
		
		
		// End of User defined functions
		
		$scope.$watch('topctrls.selectedYear', setYearChange);
		$scope.$watch('topctrls.selectedMonth',  getPrevNextMonth);
		
		
	};
	
	
	angular
		.module('mycal')
		.controller('TopCtrl', topControlsController);
	
	topControlsController.$inject = ['$rootScope', '$scope', '$location' ];
	
})();	