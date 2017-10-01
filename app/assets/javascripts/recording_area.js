(function() {
  var inputEl;
  var saveButtonEl;
  var clearButtonEl;
  var searchInputEl;
  var mapEl;
  var map;
  var drawingManager;
  var _polygon;
  var autocomplete;

  var defaultLocation = { lat: 51.505, lng: -0.09 };

  function noop() {}

  function initElements() {
    inputEl = document.querySelector('input[name="club[recording_area]"]');
    mapEl = document.getElementById('recording-area-map');
    saveButtonEl = document.getElementById('recording-area-save');
    clearButtonEl = document.getElementById('recording-area-clear');
    searchInputEl = document.getElementById('recording-area-search');

    clearButtonEl.addEventListener('click', clear);
  }

  function clear() {
    if (_polygon) _polygon.setMap(null);
    updatePolygon(null);
    enableTools();
  }

  function polygonToWkt(polygon) {
    if (!polygon) return '';

    var path = polygon.getPath();
    var points = path
      .getArray()
      .concat(path.getAt(0)) // close the loop!
      .map(function(point) {
        return point.lng() + ' ' + point.lat();
      })
      .join(',');

    return 'POLYGON((' + points + '))';
  }

  function disableTools() {
    drawingManager.setDrawingMode(null);
    drawingManager.setOptions({
      drawingControl: false
    });
  }

  function enableTools() {
    drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    drawingManager.setOptions({
      drawingControl: true
    });
  }

  function enableSaveButton() {
    $(saveButtonEl).attr('disabled', false);
  }

  function enableClearButton() {
    $(clearButtonEl).attr('disabled', false);
  }

  function updatePolygon(polygon) {
    _polygon = polygon;
    var wkt = polygonToWkt(polygon);
    $(inputEl).val(wkt);
  }

  function onPolygonComplete(polygon) {
    disableTools();
    enableSaveButton();
    enableClearButton();
    updatePolygon(polygon);
  }

  function onPlaceChanged() {
    var place = autocomplete.getPlace();
    var latLng = place.geometry.location;

    map.panTo(latLng);
    map.setZoom(13);
  }

  function initMap() {
    // create map
    map = new google.maps.Map(mapEl, {
      zoom: 10,
      center: defaultLocation
    });

    // initialize drawing manager
    drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon']
      },
      polygonOptions: {
        fillColor: '#427FB4',
        fillOpacity: 0.5,
        strokeColor: '#427FB4',
        strokeWeight: 3,
        clickable: false,
        editable: true,
        zIndex: 1
      }
    });
    drawingManager.setMap(map);
    google.maps.event.addListener(
      drawingManager,
      'polygoncomplete',
      onPolygonComplete
    );

    // initialize search
    autocomplete = new google.maps.places.Autocomplete(searchInputEl, {});
    autocomplete.addListener('place_changed', onPlaceChanged);
  }

  function init() {
    initElements();
    initMap();
  }

  // export
  window.noop = noop;

  $(document).ready(init);
})();
