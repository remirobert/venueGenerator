'use strict';

var request = require('request');
var promise = require('promise');

/**
* Initialisation of the module.
* @param {clientId} Foorsquare clientId.
* @return {clientSecret} Foorsquare clientSecret.
*/
module.exports = function(clientId, clientSecret) {
  var requestUrl = "https://api.foursquare.com/v2/venues/explore"

  if (clientId && clientSecret) {
    requestUrl += "?client_id=" + clientId + "&client_secret=" + clientSecret;
  }
  else {
    throw "You need to specify your Foorsquare client_id and client_secret."
  }

  function optionsParameters(options, name, defaultValue) {
    return options && options[name] !== undefined ? options[name] : defaultValue;
  }

  var module = {
    /**
    * find venue by specified options.
    * @param {options} dictionary containing options for searching the venue.
    * @return {promise} return a promise block to handle the error and the response.
    */
    find: function(options) {
      requestUrl += "&v=20130815&ll=" + optionsParameters(options, 'lat', 40.7) + "," + optionsParameters(options, 'lng', -74);
      requestUrl += "&limit=" + optionsParameters(options, 'limit', 10);
      requestUrl += "&venuePhotos=" + optionsParameters(options, 'venuePhotos', 1);
      requestUrl += "&section=" + optionsParameters(options, 'section', "food");

      return new Promise(function (resolve, reject) {
        request(requestUrl, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            var venues = json.response.groups[0].items.map(function(item) {
              var venue = item.venue
              var photos = venue.photos.groups[0].items.map(function(photo) {
                return photo.prefix + "612x612" + photo.suffix;
              });
              return {
                name: venue.name,
                location: {
                  address: venue.location.formattedAddress,
                  lat: venue.location.lat,
                  lng: venue.location.lng,
                  distabce: venue.location.distance
                },
                contact: {
                  phone: venue.contact.formattedPhone
                },
                categorie: venue.categories[0].name,
                rating: venue.rating,
                photos: photos
              };
            });
            resolve(venues);
          }
          else if (error) {
            resolve(error);
          }
          else {
            resolve("Invalid request");
          }
        });
      });
    }
  };
  return module;
};
