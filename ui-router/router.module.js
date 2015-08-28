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
	
	var routeConfig = function( $stateProvider, $urlRouterProvider ){
		
		$urlRouterProvider.otherwise('/shows/detail/1');
		
		$stateProvider
			
			.state('shows', {
			
				url:'/shows',
				
				templateUrl: './ui-router/shows.html',
			
				controller : 'ShowsController'
			
			})
		
			.state('shows.detail', {
			
				url : '/detail/:id',
			
				templateUrl: './ui-router/shows.detail.html',
			
				controller: 'ShowsDetailController'
			
			})
	
	};
	
	
	
	/*
		Naming our app as uir - stand for UI Router
	*/
	
	angular
		    .module('uir', ['ui.router'])
			.config( routeConfig ); 
	
	routeConfig.$inject = [ '$stateProvider', '$urlRouterProvider' ];
	
})();