/*
 * Custom Filter - related to showing events by events types
 *
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

// Wrap everything in an Immediately Invoked Function Expression (IIFE)
// As per JP's guide

(function(){
	
	'use strict';
	
	
	var setFilterEventsByCategories = function(){
		
		
		return function(items, typeIDs){
			
			var filtered = [];
			
			if(!_.isEmpty(items))
			{
				_.map(items, function(objEve){
					
					if(_.indexOf(typeIDs, objEve.typeId) > -1)
					{
						filtered.push(objEve);
					}
					
				});
			}
			
			return filtered;
		}
	};
	
	
	angular
			.module('mycal')
			.filter('EventsByCatFilter', setFilterEventsByCategories);
	
})();