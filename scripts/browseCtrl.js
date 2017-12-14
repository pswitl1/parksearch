angular.module('main')
.controller('browseCtrl', function($scope, $location, user, $http) {

	// browseCtrl scope vars
	$scope.user = user.getName();
	$scope.parks = [];
	$scope.parks_to_show = [];
	$scope.features_with_id = [];
	$scope.review= [];
	$scope.features = [];
	$scope.selected_features = [];

	// set Log In/Out text based on user
	if (user.getName() == "Guest") {
		$scope.logInOrOut = "Log In";
	} else {
		$scope.logInOrOut = "Log Out";
	}
	// get all features to show above parks
	$http.get("http://localhost/php/getfeatures.php")
		.then(function (response) {
			for (var i = 0; i < response.data.records.length; i++) {
				$scope.features_with_id.push(response.data.records[i]);
				if ($scope.features.indexOf(response.data.records[i].feature) == -1) {
					$scope.features.push(response.data.records[i].feature);
				}
			}

		});

		$http.get("http://localhost/php/getReview.php")
		.then(function (response) {
			for (var i = 0; i < response.data.records.length; i++) {
				$scope.review.push(response.data.records[i]);				
			}

		});


		
	// get all parks initially
	$http.get("http://localhost/php/getparks.php")
		.then(function (response) {
			$scope.parks = response.data.records;
			for (var j = 0; j < $scope.parks.length; j++) {
				$scope.parks[j].details = []
				$scope.parks[j].review = []
			}

			for (var i = 0; i < $scope.features_with_id.length; i++) {
				for (var j = 0; j < $scope.parks.length; j++) {
					if ($scope.features_with_id[i].park_id == $scope.parks[j].id) {
						$scope.parks[j].details.push($scope.features_with_id[i].feature)
					}
				}
			}
			console.log($scope.review);
			for (var i = 0; i < $scope.review.length; i++) {
				for (var j = 0; j < $scope.parks.length; j++) {
					if ($scope.review[i].park_id == $scope.parks[j].id) {
						$scope.parks[j].review.push($scope.review[i])
					}
				}
			}
			$scope.parks_to_show = $scope.parks;
			console.log($scope.parks_to_show);

		});

	// switch to search
	$scope.search = function() {
		$location.path('/search');
	}

	// switch to login/logout
	$scope.logInOrOutClicked = function() {
		if ($scope.user == "Guest") {
			$location.path('/login');
		} else {
			$location.path('/logout');
		}
	}

	// when feature clicked, update parks
	$scope.featureChanged = function(feature, checked) {
		if (checked) {
			$scope.selected_features.push(feature);
		} else {
			var i = $scope.selected_features.indexOf(feature);
			if(i != -1) {
				$scope.selected_features.splice(i, 1);
			}
		}
		$scope.parks_to_show = []
		$http.get("http://localhost/php/getfeatures.php")
			.then(function (response) {
				var feats = response.data.records;
				var park_ids = [];
				for (var i = 0; i < feats.length; i++) {
					if ($scope.selected_features.indexOf(feats[i].feature) > -1) {
						if (park_ids.indexOf(feats[i].park_id) == -1)
							park_ids.push(feats[i].park_id);
					}
				}
				for (var i = 0; i < park_ids.length; i++) {
					for (var j = 0; j < $scope.parks.length; j++) {
						if (park_ids[i] == $scope.parks[j].id) {
							$scope.parks_to_show.push($scope.parks[j]);
						}
					}
				}
				if ($scope.parks_to_show.length == 0) {
					$scope.parks_to_show = $scope.parks;
				}

			});
			}
		$scope.back = function() {
			$location.path('/');
		}
			$scope.entreview = function(park_id, text) {
			var username = $scope.user;
			
			console.log(park_id);
			console.log(username);
			console.log(text);

			if(angular.equals(username, 'Guest')){
				alert("Cannt leave a review as a Guest!");
			}
			else{
			$http({
					url: 'http://localhost/php/newreview.php',
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: 'username='+username+'&park_id='+park_id+'&review='+text
					}).then(function(response) {

					if(response.data.status == 'entered') {
						alert('Your Review has been submitted.');						
					}
					
					
				});
			}
		}

	});




