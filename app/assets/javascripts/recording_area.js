(function() {
  var inputEl;
  var clearButtonEl;
  var searchInputEl;
  var mapEl;
  var map;
  var drawingManager;
  var autocomplete;
  var _polygon;

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
    clearButtonEl = document.getElementById('recording-area-clear');
    searchInputEl = document.getElementById('recording-area-search');
    clearButtonEl.addEventListener('click', clear);
  }

  function clear() {
    setPolygon(null);
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

  function enableClearButton() {
    $(clearButtonEl).attr('disabled', false);
  }

  function disableClearButton() {
    $(clearButtonEl).attr('disabled', true);
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

  function setPolygon(polygon) {
    if (!polygon && _polygon) {
      // remove existing polygon from the map
      _polygon.setMap(null);
    }

    _polygon = polygon;
    updateHiddenInput();

    if (polygon) {
      addEditListeners(polygon);
      disableTools();
      enableClearButton();
    } else {
      disableClearButton();
      enableTools();
    }
  }

  function onPolygonComplete(polygon) {
    setPolygon(polygon);
  }

  function onPlaceChanged() {
    var place = autocomplete.getPlace();
    var latLng = place.geometry.location;

    map.panTo(latLng);
    map.setZoom(13);
  }

  function initializeExistingArea() {
    var existing = $(inputEl).val();

    if (!existing) return;

    // parse wkt
    var wkt = new Wkt.Wkt();
    wkt.read(existing);
    var polygon = wkt.toObject();

    // add polygon to map
    polygon.setOptions(polygonOptions);
    polygon.setMap(map);

    // update map bounds to fit the polygon
    var bounds = new google.maps.LatLngBounds();
    polygon.getPath().forEach(function(point) {
      bounds.extend(point);
    });
    map.fitBounds(bounds);

    // set the polygon
    setPolygon(polygon);
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
  }

  function init() {
    initElements();
    initMap();
    initializeExistingArea();
  }

  $(document).ready(init);
})();
