/*
 * Directive - related to previous button
 *
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

// Wrap everything in an Immediately Invoked Function Expression (IIFE)
// As per JP's guide

(function(){
	
	'use strict';
	
	var setPrevNextButton = function($location){
		
		var prevNextController = function($scope){
			
			$scope.vm.currentMonth = function(){
				
				var prevNext = ($scope.topctrls.selectedMonth - 1);
				
				$scope.topctrls.selectedMonth = prevNext;
				$location.path('/' + prevNext);
				$scope.$apply();
				
				
				
								
			};
			
		};
		
		
		var linkFunc = function($scope, element, attrs){
		
			$scope.$watch('topctrls.selectedMonth', function(newVal , oldVal){
				
				console.log('OLD: ' + oldVal + ' ' + 'NEW ' + newVal);
				
			});
		
			
			element.bind('click', $scope.vm.currentMonth);
		};
		
		prevNextController.$inject = ['$scope'];
		
		var directive = {
			
			restrict : 'E',
			
			templateUrl: 'mycal/components/prev-next-button.directive.html',
			
			link : linkFunc,
			
			controller: prevNextController,
			
			controllerAs: 'vm'
			
			
		};
		
		return directive; 
	};
	
	
	
	angular
		.module('mycal')
		.directive('prevNextButton', setPrevNextButton);
	
	setPrevNextButton.$inject = [ '$location' ];
	
	
})();