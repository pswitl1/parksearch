angular.module('main')
	.controller('signUpCtrl', function($scope, $http, $location, user) {
		$scope.signup = function() {
			var username = $scope.username;
			var password = $scope.password;
			var confirm_password = $scope.confirm_password;
			var email = $scope.email;
			var address = $scope.address;

			if (password != confirm_password) {
				alert("Passwords do not match. Try Again.");
			} else {
				$http({
					url: 'http://localhost/php/signup.php',
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: 'username='+username+'&password='+password+'&email='+email+'&address='+address
				}).then(function(response) {

					if(response.data.status == 'signedup') {
						alert('Signup successful. You will be asked to login.');
						$location.path('/login');
					} else if (response.data.status == 'username_exists') {
						alert('Username already exists. Try again.');
					} else if (response.data.status == 'email_exists') {
						alert('An account with this email already exists. Try again.');
					} else {
						alert('Invalid input.');
					}
				});
			}
		}
		$scope.back = function() {
			$location.path('/');
		}
	}
);