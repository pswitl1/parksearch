angular
.module('main', ['ngRoute', 'ui.bootstrap'])
.config(function($routeProvider, $locationProvider) {
	
		// configure routing
		$routeProvider.when('/', {
			templateUrl: './components/home.html',
			controller: 'homeCtrl'
		}).when('/login', {
			templateUrl: './components/login.html',
			controller: 'loginCtrl'
		}).when('/signup', {
			templateUrl: './components/signup.html',
			controller: 'signUpCtrl'
		}).when('/logout', {
			resolve: {
				deadResolve: function($location, user) {
					user.clearData();
					$location.path('/');
				}
			}
		}).when('/browse', {
			resolve: {
				check: function($location, user) {
					if(!user.isUserLoggedIn()) {
						$location.path('/login');
					}
				},
			},
			templateUrl: './components/browse.html',
			controller: 'browseCtrl'
		}).when('/search', {
			resolve: {
				check: function($location, user) {
					if(!user.isUserLoggedIn()) {
						$location.path('/login');
					}
				},
			},
			templateUrl: './components/search.html',
			controller: 'searchCtrl'
		}).otherwise({
			template: '404'
		});

		// configure html5 mode
		$locationProvider.html5Mode(true);
	});
