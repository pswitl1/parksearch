angular.module('main')
	.controller('searchCtrl', function($scope, $location, user, $http) {
		$scope.user = user.getName();

		if (user.getName() == "Guest") {
			$scope.logInOrOut = "Log In";
		} else {
			$scope.logInOrOut = "Log Out";
		}
		$scope.browse = function() {
			$location.path('/browse');
		}
		$scope.logInOrOutClicked = function() {
			if ($scope.user == "Guest") {
				$location.path('/login');
			} else {
				$location.path('/logout');
			}
		}
	}
);

