/*
 * Application entry file
 * Contains route definition
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

// Wrap everything in an Immediately Invoked Function Expression (IIFE)
// As per JP's guide
(function(){
	
	 'use strict';
	
	/*
	 * Again injecting the dependancies using angular's $inject
	 * As per JP's guid
	 */
	
		
	var routeConfig = function( $routeProvider, $locationProvider ){
		
		
		 $routeProvider
                .when('/',{ 
			 
			 					templateUrl: 'mycal/calendar/calendar.html',
			 
			 					controller: 'CalCtrl',
			 
								controllerAs: 'cal'
		 				  })
		 
		 		
                 .otherwise({ redirectTo: '/' });
		
		$locationProvider.hashPrefix('!'); 
		
	};
	
	
		
	
	/*Namming the app as mycal */
		 
	angular
	 		.module('mycal', [ 'ngRoute' ])
	 		.config(routeConfig);			
	
	routeConfig.$inject = [ '$routeProvider', '$locationProvider' ];
	

})();
