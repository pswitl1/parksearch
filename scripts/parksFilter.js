angular
	.module('parkSearch')
	.filter('parksFilter', function() {
		return function(listings, filterChosen) {
			var filtered = [];

			if (typeof filterChosen == 'undefined')
				return listings
			angular.forEach(listings, function(listing) {
				if (filterChosen == "all")
					filtered.push(listing);
				if (listing.details.pets_allowed == "true" && filterChosen == "pets_allowed")
					filtered.push(listing);
				if (listing.details.alcohol_allowed == 'true' && filterChosen == "alcohol_allowed")
					filtered.push(listing);

			});
			return filtered
		}
	});