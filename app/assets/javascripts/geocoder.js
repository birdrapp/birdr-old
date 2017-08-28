var Geocoder = function () {
  this.url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  this.accessToken = 'pk.eyJ1IjoibXJ3aWxsaWhvZyIsImEiOiJjajJhaXljMTUwMDEyMnFuMmVhY3RyMHJpIn0.lsj1oePERlB9Xsa3E1jvJQ';
}

Geocoder.prototype._buildUrl = function (address) {
  return this.url + address + '.json?access_token=' + this.accessToken
}

Geocoder.prototype._parseResults = function (data) {
  var locations = data.features.map(function (feature) {
    return {
      name: feature.text,
      description: feature.place_name,
      latitude: feature.center[1],
      longitude: feature.center[0]
    }
  });

  return {
    locations: locations
  };
}

Geocoder.prototype.geocode = function(address) {
  var self = this;

  return new Promise(function (resolve, reject) {
    $.getJSON(self._buildUrl(address), function (data) {
      resolve(self._parseResults(data));
    });
  });
}
