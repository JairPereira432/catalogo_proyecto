if (
  !window.CONFIG ||
  !window.CONFIG.GOOGLE_MAPS_API_KEY ||
  window.CONFIG.GOOGLE_MAPS_API_KEY === "TU_API_KEY_AQUI"
) {
  console.error(
    "Error: La configuración de Google Maps no está disponible o la API key no está configurada."
  );
  alert(
    "Error: Es necesario configurar la API key de Google Maps en el archivo config-map.js"
  );
} else {
  let map;
  let marker;

  loadGoogleMapsApi();

  function loadGoogleMapsApi() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${window.CONFIG.GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onerror = function () {
      console.error(
        "Error al cargar la API de Google Maps. Verifica tu API key."
      );
      document.getElementById("map").innerHTML =
        '<div style="color: red; padding: 20px; text-align: center;">' +
        "<h3>Error al cargar el mapa</h3>" +
        "<p>No se pudo cargar Google Maps. Por favor verifica la API key.</p>" +
        "</div>";
    };
  }
}

window.initMap = function () {
  const mapDiv = document.getElementById("map");

  map = new google.maps.Map(mapDiv, {
    center: { lat: window.CONFIG.DEFAULT_LAT, lng: window.CONFIG.DEFAULT_LNG },
    zoom: window.CONFIG.DEFAULT_ZOOM,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    gestureHandling: "cooperative",
  });

  marker = new google.maps.Marker({
    position: {
      lat: window.CONFIG.DEFAULT_LAT,
      lng: window.CONFIG.DEFAULT_LNG,
    },
    map: map,
    title: "Carlos's Store - Visítanos",
    animation: google.maps.Animation.DROP,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `
            <div style="padding: 10px; max-width: 200px;">
                <h3 style="margin: 0 0 5px 0; color: #333;">Carlos's Store</h3>
                <p style="margin: 0 0 5px 0;">¡Visítanos en nuestra Tienda Principal!</p>
                <p style="margin: 0;">Horario: Lun-Sáb 10am-8pm</p>
            </div>
        `,
  });

  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });
};
