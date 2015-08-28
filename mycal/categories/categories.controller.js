/*
 * @name CategoriesCtrl
 * @desc: Contains methods and members related event categories list
 *
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

// Wrap everything in an Immediately Invoked Function Expression (IIFE)
// As per JP's guide

(function(){
	
	'use strict';
	
	var CategoriesController = function( $scope, calData){
		
		/* vm stand for viewmodel
		 * used in place of $scope
		 * as per JP's guide
		 */
		
		var vm = this;
		
		$scope.eventsCategories = 'Hello are u ther';
		
				
		$scope.$watchCollection(calData.dataTypeList, function(objNewList){
			
			
			$scope.eventsCategories = objNewList;
			console.log($scope.eventsCategories);
			
		}, true);
		
	};

	
angular
.module('mycal')
.controller('CategoriesCtrl', CategoriesController);


CategoriesController.$inject = [ '$scope', 'calData' ];

})();


