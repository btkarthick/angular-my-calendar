/*
 * Directive - related events types check/uncheck operations
 *
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

// Wrap everything in an Immediately Invoked Function Expression (IIFE)
// As per JP's guide

(function(){
	
	
	'use strict';
	
	var setMoreButton = function( calData ){
		
			
		var linkFunc = function( $scope, element, attrs ){
			
			$scope.showPlus = true;
			
			var totalEvents = element.parent().children().find('DIV');
									
			if( _.parseInt(totalEvents.length) === _.parseInt(attrs.allowedEvents))
			{
				$scope.showPlus = false;
			}
									
		};
		
		
		
		var directive = {
			
			restrict : 'E',
			link : linkFunc,
			template : '<i class="glyphicon glyphicon-plus" data-ng-show="!showPlus"></i>',
			scope : { }
		};
		
		return directive; 
		
		
		
	};
	
	
		
	angular
			.module('mycal')
			.directive('eventsMoreButton', setMoreButton);
	
	setMoreButton.$inject = [ 'calData' ];
	
})();