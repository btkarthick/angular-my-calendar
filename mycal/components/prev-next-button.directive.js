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
	
	var setPrevNextButton = function( calData ){
		
		var prevNextController = function($scope){
			
			$scope.vm.prevNextMonth = { 
			
								'previous' : { 'text' : '', 'isHidden': true },
			
								'next' : { 'text' : '', 'isHidden': true }
							};			
			
			
						
			$scope.setPrevNextText = function(){
				
				var cMonth = $scope.modelMonthYear.month;
				var prevNext = ($scope.direction === 'prev') ? (cMonth - 1) : (cMonth + 1);
				$scope.modelMonthYear.month = prevNext;
				$scope.$apply();
			};
						
			
			$scope.watchOnMonthChange = function(newVal , oldVal){
			
				
				var objPrev = _.pluck(_.filter(calData.calMonthList, 'monthnum', (newVal.month-1)), 'monthname');

				var objNext = _.pluck(_.filter(calData.calMonthList, 'monthnum', (newVal.month+1)), 'monthname');

				$scope.vm.prevNextMonth.previous = (!_.isEmpty(objPrev)) ? { 'text' : objPrev.toString(), 'isHidden': true } : { 'text' : '', 'isHidden': false };


				$scope.vm.prevNextMonth.next = (!_.isEmpty(objNext)) ? { 'text' : objNext.toString(), 'isHidden': true } : { 'text' : '', 'isHidden': false };
			
				calData.calCurrentMonth = newVal;
				
			};
			
			
		
		};
		
		
		var linkFunc = function($scope, element, attrs){
		
			$scope.direction = attrs.direction;
			
			$scope.templatePath = 'mycal/components/button-' + $scope.direction + '.directive.html';
			
			$scope.$watch('modelMonthYear', $scope.watchOnMonthChange, true);
			
			element.bind('click', $scope.setPrevNextText);
		
		};
		
		prevNextController.$inject = ['$scope'];
		
		var directive = {
			
			restrict : 'EA',
			template: '<data-ng-include src="templatePath" />',
			link : linkFunc,
			scope : { modelMonthYear: '='},
			controller: prevNextController,
			controllerAs: 'vm'
		};
		
		return directive; 
	};
	
	
	
	angular
		.module('mycal')
		.directive('prevNextButton', setPrevNextButton);
	
	setPrevNextButton.$inject = [ 'calData' ];
	
	
})();