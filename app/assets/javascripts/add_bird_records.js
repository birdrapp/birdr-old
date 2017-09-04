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

  $('#birdRecords').on('click', '.remove-bird-record', function (e) {
    e.preventDefault();
    $(this).closest('.birding-session-bird-result').remove();
  })

  $('#birdRecordModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var birdName = button.data('name');
    var modal = $(this)
    modal.data('index', button.data('index'));

    modal.find('.modal-title').text('Editing ' + birdName);
    modal.find('#modalCount').val(button.data('count'));
    modal.find('#modalNotes').val(button.data('notes'));
  });

  $('#birdRecordModal').on('click', '#modalUpdate', function (event) {
    var modal = $('#birdRecordModal');

    // Get values to update
    var index = modal.data('index');
    var notes = modal.find('#modalNotes').val();
    var count = modal.find('#modalCount').val();

    // Update form
    $('input[name="birding_session[bird_records_attributes][' + index + '][count]"]').val(count);
    $('input[name="birding_session[bird_records_attributes][' + index + '][notes]"]').val(notes);

    // Update data attributes
    $('#edit_' + index).data('count', count);
    $('#edit_' + index).data('notes', notes);

    // Update the UI
    if (count) $('#count_' + index).text(count + ' x ');
    $('#notes_' + index).text(notes);

    modal.modal('hide');
  });
};

$(document).ready(init);
