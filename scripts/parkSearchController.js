angular
	.module('parkSearch')
	.controller('parkSearchController', function($scope, parksFactory) {

		// scope variables that are set in get parks
		$scope.parks;
		$scope.parks_to_show = [];
		$scope.users;
		$scope.filters;
		$scope.selected_filters = [];

		$scope.showBrowse = true;
		$scope.showSearch = false;
		$scope.showLogin = false;

		// gets the json data, define functions that interact with the db in here
		parksFactory.getParks().then(function(data) {

			// get park data
			$scope.parks = data.data.parks;
			$scope.parks_to_show = $scope.parks;
			// get user data TODO use this to code login/signup
			// signup will require users editting the database/json, which I havent looked into yet
			$scope.users = data.data.users;
			
			// get first park details to set a list of filters 
			// set scope.filters, each park should have eht same details, with a true/false for each one
			park_details = data.data.parks[0].details;
			$scope.filters = []
			for (var key in park_details)
				$scope.filters.push(key);

			// function that will do filter 
			$scope.filterBy = function(filter, checked) {

				// check if checkbox is checked or not and add/remove filter from selected filter
				if (checked) {
					$scope.selected_filters.push(filter)
				}
				else {
					var i = $scope.selected_filters.indexOf(filter);
					if(i != -1) {
						$scope.selected_filters.splice(i, 1);
					}
				}

				// loop through parks and filters to determine which parks to show
				$scope.parks_to_show = []
				for (var i = 0; i < $scope.selected_filters.length; i++) { 
					for (var j = 0; j < $scope.parks.length; j++) {
						filter = $scope.selected_filters[i]
						if ($scope.parks[j].details[filter] == "true") {
							add_park = true;
							for (var k = 0; k < $scope.parks_to_show.length; k++) {
								if ($scope.parks_to_show[k].name == $scope.parks[j].name)
									add_park = false;
							}
							if (add_park) {
								$scope.parks_to_show.push($scope.parks[j]);
							}
						}
						//for (var key in park.details) {
						//	if 
						//}
					}
				}
				if ($scope.selected_filters.length == 0) {
					$scope.parks_to_show = $scope.parks;
				}
			}

			// add code here for user login
			// should need $scope.users, and you will need to add html


		// if there is an error 
		}, function(error) {

			console.log(error);
		});

		// switch between tabs
		$scope.switchTab = function(tab) {

			$scope.showBrowse = false;
			$scope.showSearch = false;
			$scope.showLogin = false;
			if (tab == 'browse')
				$scope.showBrowse = true;
			else if (tab == 'search')
				$scope.showSearch = true;
			else if (tab == 'login')
				$scope.showLogin = true;
			
		}
	});