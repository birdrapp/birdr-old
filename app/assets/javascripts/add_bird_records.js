var map;
var marker;
var autocomplete;
var birdResultTemplate;
var dropzone;


function placeChanged() {
  var place = autocomplete.getPlace();

  var latLng = place.geometry.location;

  map.panTo(latLng);
  map.setZoom(17);
  moveMarker(latLng);

  updateLocationName(place.name, place.formatted_address);
}

function updateLocation(latlng) {
  var wkt = 'POINT(' + latlng.lng() + ' ' + latlng.lat() + ')';
  $('#birding_session_location').val(wkt);
}

function updateLocationName(name, address) {
  $('#birding_session_location_name').val(name);
  $('#birding_session_location_address').val(address);
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

function updateModal(e) {
  var modal = $('#birdRecordModal');

  // Get values to update
  var index = modal.data('index');
  var notes = modal.find('#modalNotes').val();
  var count = modal.find('#modalCount').val();
  var photoFields = modal.find('#modalPhotos input');

  // Update form
  $('input[name="birding_session[bird_records_attributes][' + index + '][count]"]').val(count);
  $('input[name="birding_session[bird_records_attributes][' + index + '][notes]"]').val(notes);
  $('#photo_fields_' + index).append(photoFields);

  // Update data attributes
  $('#edit_' + index).data('count', count);
  $('#edit_' + index).data('notes', notes);

  // Update the UI
  if (count) $('#count_' + index).text(count + ' x ');
  $('#notes_' + index).text(notes);

  var thumbnails = modal.find('.dz-preview');
  // if we have photos
  if (thumbnails.length) {
    // use the first as the thumbnail
    var first = thumbnails.first();
    $('#photo_' + index).empty().append($('<img />', {
      src: first.find('img').attr('src'),
      class: 'rounded-circle mr-3'
    }));

    // Store all photos for later use
    var $photoContainer = $('#photos_' + index);

    if (!$photoContainer.length) {
      $photoContainer = $('<div />', {
        id: 'photos_' + index
      }).appendTo($('#photo_fields_' + index));
    }

    $photoContainer.html($('#photos-container').html());
  }

  modal.modal('hide');
}

function showModal(e) {
  var button = $(e.relatedTarget); // Button that triggered the modal
  var birdName = button.data('name');
  var modal = $(this);
  modal.data('index', button.data('index'));

  modal.find('.modal-title').text('Editing ' + birdName);
  modal.find('#modalCount').val(button.data('count'));
  modal.find('#modalNotes').val(button.data('notes'));
  // find any existing thumbnails
  var photos = $('#photos_' + button.data('index'));
  modal.find('#photos-container').empty().html(photos.html());
}

function fileAdded(file) {
  $('#modalUpdate').attr('disabled', true);
}

function queueComplete() {
  $('#modalUpdate').attr('disabled', false).text('Update');
}

function updateProgress(uploadProgress, totalBytes, totalBytesSent) {
  $('#modalUpdate').text('Uploading ' + Math.round(uploadProgress) + '%');
}

function photoUploaded(file, response) {
  // Get the index
  var modal = $('#birdRecordModal');
  var index = modal.data('index');
  // create a new hidden input
  var $photoInput = $('<input></input>', {
    value: response.id,
    type: 'hidden',
    name: 'birding_session[bird_records_attributes][' + index + '][photo_ids][]',
    class: 'form-control hidden photo-field'
  });

  // append the input to the modal
  $photoInput.appendTo($('#modalPhotos'));
}

function init() {
  $('#birding_session_date').flatpickr({
    altInput: true,
    maxDate: new Date()
  });

  $('#birding_session_start_time, #birding_session_end_time').flatpickr({
    enableTime: true,
    noCalendar: true,

    enableSeconds: false, // disabled by default

    time_24hr: true, // AM/PM time picker is used by default

    // default format
    dateFormat: "H:i"
  })

  birdResultTemplate = Handlebars.compile($("#birdRecordResultTemplate").html());

  $('#birdSearch').on('change', addBird);

  $('#birdRecords').on('click', '.remove-bird', function (e) {
    e.preventDefault();

    $(this).closest('.list-group-item').remove();
  });

  $('#birdRecords').on('click', '.remove-bird-record', function (e) {
    e.preventDefault();
    var removeBird = confirm($(this).data('confirm-message'));

    if (removeBird) $(this).closest('.birding-session-bird-result').remove();
  })

  $('#birdRecordModal').on('show.bs.modal', showModal);
  $('#birdRecordModal').on('click', '#modalUpdate', updateModal);

  dropzone = new Dropzone('.photo-upload', {
    paramName: "photo[image]",
    previewsContainer: ".photos-container",
    thumbnailWidth: 300,
    thumbnailHeight: 300,
    autoProcessQueue: true,
    previewTemplate: '<div class="dz-preview col-6 col-md-3 my-2"><img data-dz-thumbnail class="img-thumbnail" /><div class="progress dz-upload mt-2"><div class="progress-bar dz-upload" role="progressbar" data-dz-uploadprogress></div></div></div>'
  });

  dropzone.on('queuecomplete', queueComplete);
  dropzone.on('totaluploadprogress', updateProgress);
  dropzone.on('addedfile', fileAdded);
  dropzone.on('success', photoUploaded);
};

function initMap() {
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
}

$(document).ready(init);
