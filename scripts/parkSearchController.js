angular
	.module('parkSearch')
	.controller('parkSearchController', function($scope, parksFactory) {

		// Will be generated by the database
		$scope.parks;

		parksFactory.getParks().then(function(data) {
			$scope.parks = data.data;
		}, function(error) {
			console.log(error);
		});

		$scope.sayHello = function () {
			console.log('hello');
		}
	});