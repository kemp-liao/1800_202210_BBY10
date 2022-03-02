mapboxgl.accessToken = 'pk.eyJ1Ijoia2VtdHVtIiwiYSI6ImNsMDJ1cmRkMDB3dG0zb3J5ZG94bnl5MHMifQ.a3eJ7aW4pIu0NFXj70NMpQ';
const map = new mapboxgl.Map({
container: 'map_small', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [-123, 49.23], // starting position
zoom: 9 // starting zoom
});
 
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());