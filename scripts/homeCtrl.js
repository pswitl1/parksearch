angular.module('main')
	.controller('homeCtrl', function($scope, $http, $location, user) {
		$scope.logInOrOut = "Log In";
		$scope.goToLogin = function() {
			$location.path('/login');
		};
		$scope.skipLogin = function() {
			alert("User Functionality is disabled in guest mode.");
			$http({
				url: 'http://localhost/php/login.php',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: 'username=Guest&password=password'
			}).then(function(response) {
				if(response.data.status == 'loggedin') {
					user.saveData(response.data);
					$scope.logInOrOut = "Log In";
					$location.path('/browse');
				} else {
					alert('Could not continue as guest');
				}
			});
		}
		$scope.goToSignUp = function() {
			$location.path('/signup');
		}
});