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

  var polygonOptions = {
    fillColor: '#427FB4',
    fillOpacity: 0.5,
    strokeColor: '#427FB4',
    strokeWeight: 3,
    clickable: false,
    editable: true,
    zIndex: 1
  };

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

  function updateHiddenInput() {
    var wkt = polygonToWkt(_polygon);
    $(inputEl).val(wkt);
  }

  function onPolygonUpdate() {
    updateHiddenInput();
  }

  function addEditListeners(polygon) {
    ['set_at', 'insert_at', 'remove_at'].forEach(function(e) {
      google.maps.event.addListener(polygon.getPath(), e, onPolygonUpdate);
    });
  }

  function updatePolygon(polygon) {
    _polygon = polygon;
    updateHiddenInput();
    enableSaveButton();
    if (polygon) addEditListeners(polygon);
  }

  function onPolygonComplete(polygon) {
    disableTools();
    enableClearButton();
    updatePolygon(polygon);
  }

  function onPlaceChanged() {
    var place = autocomplete.getPlace();
    var latLng = place.geometry.location;

    map.panTo(latLng);
    map.setZoom(13);
  }

  function initializeExistingArea() {
    var wkt = new Wkt.Wkt();
    wkt.read($(inputEl).val());
    var polygon = wkt.toObject();
    polygon.setOptions(polygonOptions);
    polygon.setMap(map);

    var bounds = new google.maps.LatLngBounds();
    polygon.getPath().forEach(function(point) {
      bounds.extend(point);
    });

    map.fitBounds(bounds);

    disableTools();
    updatePolygon(polygon);
    enableClearButton();
  }

  function initMap() {
    // create map
    map = new google.maps.Map(mapEl, {
      zoom: 10,
      center: defaultLocation
    });

    // initialize search
    autocomplete = new google.maps.places.Autocomplete(searchInputEl, {});
    autocomplete.addListener('place_changed', onPlaceChanged);

    // initialize drawing manager
    drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon']
      },
      polygonOptions: polygonOptions
    });
    drawingManager.setMap(map);
    google.maps.event.addListener(
      drawingManager,
      'polygoncomplete',
      onPolygonComplete
    );

    // initialize existing recording area
    var existing = $(inputEl).val();
    if (existing != '') {
      initializeExistingArea();
    }
  }

  function init() {
    initElements();
    initMap();
  }

  $(document).ready(init);
})();
