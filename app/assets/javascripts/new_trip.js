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
  var latLng = { lat: latitude, lng: longitude };

  map.panTo(latLng);
  map.setZoom(17);
  moveMarker(latLng);

  toggleSearchResultState($(this));
}

function updateLocation(latlng) {
  var wkt = 'POINT(' + latlng.lng() + ' ' + latlng.lat() + ')';
  $('#trip_location').val(wkt);
}

function moveMarker(latLng) {
  marker.setPosition(latLng)
  marker.setMap(map);
}

function toggleSearchResultState(activeLink) {
  $('.trip-geocode-result').removeClass('active');
  activeLink.addClass('active');
}

function resetSearchResults() {
  $('#tripSearchResults').empty();
}

function init() {
  var defaultLocation = { lat: 51.505, lng: -0.09 };

  map = new google.maps.Map(document.getElementById('tripMap'), {
    zoom: 10,
    center: defaultLocation
  });

  marker = new google.maps.Marker({
    position: defaultLocation,
    draggable: true
  });

  marker.addListener('position_changed', function (data) {
    updateLocation(marker.getPosition());
  });

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
