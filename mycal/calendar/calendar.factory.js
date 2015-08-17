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

(function(){
	
	'use strict';
	
	var calendarDataService = function($http, $q){
	
		var FETCHURL = 'JSON/';
		
		var getCalDataByYear = function(cyear){
			
			return $http.get(FETCHURL + cyear.toString() + ".json").then(handleSuccess, handleError);
			//return $http.get(FETCHURL + cyear.toString() + ".json");
		}
		
		
		var handleError = function( response ){

		// The API response from the server should be returned in a
		// nomralized format. However, if the request was not handled by the
		// server (or what not handles properly - ex. server error), then we
		// may have to normalize it on our end, as best we can.

			if (!angular.isObject( response.data ) || ! response.data.Message) {

				return( $q.reject( "An unknown error occurred." ) );

			}

			// Otherwise, use expected error message.
			return( $q.reject( response.data.Message ) );

		};
	
	
	
		var handleSuccess = function( response ){

			 return( response.data );

		};
		
		
		
		var service = {
		
			fetchCalData : getCalDataByYear
		
		
		}
		
		return service;
		
		
	};
	
	
	angular
		.module('mycal')
		.factory('calData', calendarDataService);
	
	
	calendarDataService.$inject = ['$http', '$q'];
	
	
})();