mapboxgl.accessToken = 'pk.eyJ1Ijoia2VtdHVtIiwiYSI6ImNsMDJ1cmRkMDB3dG0zb3J5ZG94bnl5MHMifQ.a3eJ7aW4pIu0NFXj70NMpQ';
const map = new mapboxgl.Map({
container: 'map_small',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-123, 49.23],
zoom: 13
});
 
// Add the control to the map.
map.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
})
);

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// // Create a new marker.
// const marker = new mapboxgl.Marker()
//     .setLngLat([-123.2, 49.30])
//     .addTo(map);