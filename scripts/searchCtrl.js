angular.module('main')
	.controller('searchCtrl', function($scope, $location, user, $http) {
		$scope.user = user.getName();
		$scope.parks_to_show_search = [];
		$scope.features_search = [];
		$scope.features_with_id_search = [];
		if (user.getName() == "Guest") {
			$scope.logInOrOut = "Log In";
		} else {
			$scope.logInOrOut = "Log Out";
		}

	// get all features to show above parks
	$http.get("http://localhost/php/getfeatures.php")
		.then(function (response) {
			console.log(response.data.records);
			$scope.features_with_id_search = response.data.records;
			for (var i = 0; i < response.data.records.length; i++) {
				if ($scope.features_search.indexOf(response.data.records[i].feature) == -1) {
					$scope.features_search.push(response.data.records[i].feature);
				}
			}
// get all parks initially
	$http.get("http://localhost/php/getparks.php")
		.then(function (response) {
			$scope.parks_search = response.data.records;
			for (var j = 0; j < $scope.parks_search.length; j++) {
				$scope.parks_search[j].details_search = []
			}
									console.log($scope.features_with_id_search);
									console.log($scope.parks_search);

			for (var i = 0; i < $scope.features_with_id_search.length; i++) {
				for (var j = 0; j < $scope.parks_search.length; j++) {
					if ($scope.features_with_id_search[i].park_id == $scope.parks_search[j].id) {
						$scope.parks_search[j].details_search.push($scope.features_with_id_search[i].feature)
					}
				}
			}
			$scope.parks_to_show_search = $scope.parks_search;
			console.log($scope.parks_to_show_search);
		});
		});

	


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
		$scope.searchChanged = function() {

			var search = $scope.search.toLowerCase().replace(/ /g,'');
			
					$scope.parks_to_show_search = []
					names = []
					ids = []
					park_ids = []
					for (var i = 0; i < $scope.parks_search.length; i++) {
						names.push($scope.parks_search[i].name
							.toLowerCase().replace(/ /g,'').replace(/-/g,'').replace(/'/g,''));
						ids.push($scope.parks_search[i].id);
					}
					for (var i = 0; i < names.length; i++) {
						if (names[i].indexOf(search) > -1) {
							park_ids.push(ids[i])
						}
					}
					for (var i = 0; i < park_ids.length; i++) {
						for (var j = 0; j < $scope.parks_search.length; j++) {
							if (park_ids[i] == $scope.parks_search[j].id)
								$scope.parks_to_show_search.push($scope.parks_search[j])
						}
					}
				
		}
	}
);

