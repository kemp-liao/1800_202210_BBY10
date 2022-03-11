//Map Part
mapboxgl.accessToken = 'pk.eyJ1Ijoia2VtdHVtIiwiYSI6ImNsMDJ1cmRkMDB3dG0zb3J5ZG94bnl5MHMifQ.a3eJ7aW4pIu0NFXj70NMpQ';
const map = new mapboxgl.Map({
    container: 'map_small',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-123, 49.23],
    zoom: 9
});


// const marker = new mapboxgl.Marker() // Initialize a new marker
// .setLngLat([-122.25948, 37.87221]) // Marker [lng, lat] coordinates
// .addTo(map); // Add the marker to the map

const geocoder = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false, // Do not use the default marker style
    placeholder: 'Search for places in Vancouver', // Placeholder text for the search bar
    bbox: [-123.305121, 49, -122.5314327, 49.396669], // Boundary for Vancouver
    proximity: {
    longitude: -123.001814,
    latitude: 49.249324,
    // Coordinates of BCIT
    }
});

// Add the geocoder to the map
map.addControl(geocoder);

// After the map style has loaded on the page,
// add a source layer and default styling for a single point
map.on('load', () => {
    map.addSource('single-point', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': []
        }
    });

    map.addLayer({
        'id': 'point',
        'source': 'single-point',
        'type': 'circle',
        'paint': {
            'circle-radius': 10,
            'circle-color': '#448ee4'
        }
    });

    // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
    //  Add a marker at the result's coordinates
    geocoder.on('result', (event) => {
        map.getSource('single-point').setData(event.result.geometry);
        //const obj = JSON.parse(event.result.geometry);

        //Display the name of location in the input box
        document.getElementById("meeting-location").value = event.result.place_name;

        //Pass the data to local storage
        localStorage.setItem("mapname", event.result.place_name);
        localStorage.setItem("maplongitude", event.result.geometry.coordinates[0]);
        localStorage.setItem("maplatitude", event.result.geometry.coordinates[1]);
    

    });
});




//Read form.
const newMeeting = document.querySelector(".new-meeting");
const meetingTitle = document.querySelector("#meeting-title");
const meetingPeople = document.querySelector("#meeting-people");
const meetingDate = document.querySelector("#meeting-date");
const meetingTime = document.querySelector("#meeting-time");
const meetingDuration = document.querySelector("#meeting-duration");
const meetingDescription = document.querySelector("#meeting-description");
const submit = document.querySelector("#submit");
const closem = document.querySelector(".modal-close");
const subModal = document.querySelector(".submodal-wrap");
const subModal2 = document.querySelector(".submodal-wrap2");


//get the user name and show the name in the title.
function getName() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            //console.log(user.uid); //Get the UID
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    //console.log(n);
                    document.getElementById("name-goes-here").innerText = n;
                    document.getElementById("name_form").placeholder = n;
                })
        } else {
            // No user is signed in.
            window.location.replace("login.html");
        }
    });
}

getName();



//Add meeting
submit.addEventListener('click', (e) => {
    e.preventDefault();

    //Check if user logged in or just ask them to log in.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    //console.log(n);
                    db.collection('meetings').doc().set({
                        creator_id: user.uid,
                        date: meetingDate.value,
                        description: meetingDescription.value,
                        duration: meetingDuration.value,
                        latitude: localStorage.getItem("maplatitude"),
                        location: localStorage.getItem("mapname"),
                        logitude: localStorage.getItem("maplongitude"),
                        people: meetingPeople.value,
                        title: meetingTitle.value,
                        time: meetingTime.value,
                        creator: n,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()




                    }).then(() => {
                        newMeeting.reset();
                        subModal.classList.toggle("display-nonem");
                    });
                })
        } else {
            // subModal2.classList.toggle("display-nonem2");
        }
    });
});

closem.addEventListener('click', () => {
    subModal.classList.toggle("display-nonem");
});

