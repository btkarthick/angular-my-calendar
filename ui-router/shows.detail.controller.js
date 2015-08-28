
(function(){
	
	'use strict';
	
	var setDetailsController = function( $scope, $stateParams, ShowsService ){
		
		
		$scope.selectedShow = ShowsService.find($stateParams.id);
		
	};
	
	
	angular
			.module('uir')
			.controller('ShowsDetailController', setDetailsController);
	
	setDetailsController.$inject = [ '$scope', '$stateParams', 'ShowsService' ];
	
})();