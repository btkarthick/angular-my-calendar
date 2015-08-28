
(function(){
	
	'use strict';
	
	var setShowsController = function($scope, ShowsService){
		
		$scope.shows = ShowsService.list();
		
	};
	
	angular
			.module('uir')
			.controller('ShowsController', setShowsController);
	
	setShowsController.$inject = ['$scope', 'ShowsService'];
	
})();