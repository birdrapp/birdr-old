var map;
var marker;

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

function handleSearchResultClick(e) {
  e.preventDefault();
  var latitude = $(this).data('latitude');
  var longitude = $(this).data('longitude');

  map.setView([latitude, longitude], 16);
  moveMarker([latitude, longitude]);

  toggleSearchResultState($(this));
}

function updateLocation(latlng) {
  var wkt = 'POINT(' + latlng.lng + ' ' + latlng.lat + ')';
  $('#trip_location').val(wkt);
}

function moveMarker(latLng) {
  marker.setLatLng(latLng).addTo(map);
}

function toggleSearchResultState(activeLink) {
  $('.trip-geocode-result').removeClass('active');
  activeLink.addClass('active');
}

function resetSearchResults() {
  $('#tripSearchResults').empty();
}

function init() {
  var defaultLocation = [51.505, -0.09];

  map = L.map('tripMap', {
    scrollWheelZoom: false
  }).setView(defaultLocation, 7);

  marker = L.marker(defaultLocation, {
    draggable: true
  });

  marker.on('move', function (data) {
    updateLocation(data.latlng);
  });

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.outdoors',
    accessToken: 'pk.eyJ1IjoibXJ3aWxsaWhvZyIsImEiOiJjajJhaXljMTUwMDEyMnFuMmVhY3RyMHJpIn0.lsj1oePERlB9Xsa3E1jvJQ'
  }).addTo(map);

  $('#tripSearch').on('keyup', function () {
    var $this = $(this);
    delay(function () {
      var val = $this.val();
      if (val === '') {
        resetSearchResults();
      } else {
        geocode($this.val());
      }
    }, 500);
  });

  $('#tripSearchResults').on('click', '.trip-geocode-result', handleSearchResultClick);

  resultsTemplate = Handlebars.compile($('#tripGeocodeResultsTemplate').html());
};

function geocode(address) {
  var geocoder = new Geocoder();

  var searchBox = $('.search-box');
  searchBox.toggleClass('active');

  geocoder.geocode(address)
    .then(renderResults)
    .then(function () {
      searchBox.toggleClass('active');
    });
}

function renderResults(results) {
  $('#tripSearchResults').html(resultsTemplate(results));
}

$(document).ready(init);
