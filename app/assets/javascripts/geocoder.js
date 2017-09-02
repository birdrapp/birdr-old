var Geocoder = function () {
  this.url = 'https://maps.googleapis.com/maps/api/geocode/json';
  this.apiKey = 'AIzaSyCC3Ebzxe2VKuB54kd9baaW-7ztMxyRDA4';
}

Geocoder.prototype._parseResult = function (result) {
  return {
    name: result.address_components[0].short_name,
    description: result.formatted_address,
    latitude: result.geometry.location.lat,
    longitude: result.geometry.location.lng
  }
}

Geocoder.prototype._parseResults = function (results) {
  return results.map(this._parseResult);
}

Geocoder.prototype.geocode = function(address) {
  var self = this;

  return new Promise(function (resolve, reject) {
    $.getJSON(self.url, {
      key: self.apiKey,
      address: address
    }, function (response) {
      resolve(self._parseResults(response.results));
    });
  });
}
