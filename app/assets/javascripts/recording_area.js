(function() {
  var mapEl;
  var map;

  var defaultLocation = { lat: 51.505, lng: -0.09 };

  window.noop = function() {};

  function initMap() {
    map = new google.maps.Map(mapEl, {
      zoom: 10,
      center: defaultLocation
    });
  }

  function init() {
    mapEl = document.getElementById('recording-area-map');

    initMap();
  }

  $(document).ready(init);
})();
