angular
	.module('parkSearch')
	.factory('parksFactory', function($http) {

		// responsible for fetching parks everywhere else in the application
		function getParks() { 
			return $http.get('data/data.json'); // eventually get from database 
		} 
		return { 
			getParks: getParks 
		}
	});