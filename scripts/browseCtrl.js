angular.module('main')
.controller('browseCtrl', function($scope, $location, user, $http) {
	$scope.user = user.getName();

	$scope.parks = [];
	$scope.parks_to_show = [];

	if (user.getName() == "Guest") {
		$scope.logInOrOut = "Log In";
	} else {
		$scope.logInOrOut = "Log Out";
	}
	$scope.search = function() {
		$location.path('/search');
	}
	$scope.logInOrOutClicked = function() {
		if ($scope.user == "Guest") {
			$location.path('/login');
		} else {
			$location.path('/logout');
		}
	}
	$http.get("http://localhost/php/getparks.php")
		.then(function (response) {
			console.log(response.data.records);
			$scope.parks_to_show = response.data.records;
		});
});

