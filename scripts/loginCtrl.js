angular.module('main')
	.controller('loginCtrl', function($scope, $http, $location, user) {
		$scope.login = function() {
			var username = $scope.username;
			var password = $scope.password;
			$http({
				url: 'http://localhost/php/login.php',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: 'username='+username+'&password='+password
			}).then(function(response) {
				if(response.data.status == 'loggedin') {
					user.saveData(response.data);
					$scope.logInOrOut = "LogOut";
					$location.path('/browse');
				} else {
					alert('invalid login');
				}
			})
		}
		$scope.signup = function() {
			$location.path('/signup');
		}
		$scope.back = function() {
			$location.path('/');
		}
	}
);