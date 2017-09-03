var map;
var marker;
var autocomplete;
var birdResultTemplate;


function placeChanged() {
  var place = autocomplete.getPlace();

  var latLng = place.geometry.location;

  map.panTo(latLng);
  map.setZoom(17);
  moveMarker(latLng);

  updateLocationName(place.name);
}

function updateLocation(latlng) {
  var wkt = 'POINT(' + latlng.lng() + ' ' + latlng.lat() + ')';
  $('#birding_session_location').val(wkt);
}

function updateLocationName(address) {
  $('#birding_session_location_name').val(address);
}

function moveMarker(latLng) {
  marker.setPosition(latLng)
  marker.setMap(map);
}

function addBird(e) {
  e.preventDefault();
  var id = $(this).val();
  var name = $(this).find(':selected').text();
  $('#birdRecords').prepend(birdResultTemplate({ id: id, name: name, index: +(new Date()) }))
  $(this).prop('selectedIndex',0)
}

function init() {
  var defaultLocation = { lat: 51.505, lng: -0.09 };

  map = new google.maps.Map(document.getElementById('map'), {
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

  autocomplete = new google.maps.places.Autocomplete(document.getElementById('search'), {});

  autocomplete.addListener('place_changed', placeChanged);

  $('#birding_session_date').datepicker({
    todayHighlight: true,
    autoclose: true,
    assumeNearbyYear: true,
    endDate: new Date(),
    format: 'dd/mm/yyyy',
    maxViewMode: 'days',
    showWeekDays: false,
    weekStart: 1
  });

  birdResultTemplate = Handlebars.compile($("#birdRecordResultTemplate").html());

  $('#birdSearch').on('change', addBird);

  $('#birdRecords').on('click', '.remove-bird', function (e) {
    e.preventDefault();

    $(this).closest('.list-group-item').remove();
  });
};

$(document).ready(init);
