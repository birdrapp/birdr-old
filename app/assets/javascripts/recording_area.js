(function() {
  var inputEl;
  var mapEl;
  var map;
  var drawingManager;

  var defaultLocation = { lat: 51.505, lng: -0.09 };

  function noop() {}

  function initElements() {
    inputEl = document.querySelector('input[name="club[recording_area]"]');
    mapEl = document.getElementById('recording-area-map');
  }

  function polygonToWkt(polygon) {
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

  function onPolygonComplete(polygon) {
    disableTools();

    var wkt = polygonToWkt(polygon);

    $(inputEl).val(wkt);
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
  }

  function init() {
    initElements();
    initMap();
  }

  // export
  window.noop = noop;

  $(document).ready(init);
})();
