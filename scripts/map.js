//Start a map
mapboxgl.accessToken = 'pk.eyJ1Ijoia2VtdHVtIiwiYSI6ImNsMDJ1cmRkMDB3dG0zb3J5ZG94bnl5MHMifQ.a3eJ7aW4pIu0NFXj70NMpQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-123, 49.23], // starting position
    zoom: 10 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());



map.on('load', () => {

    // Load an image from an external URL.
    map.loadImage(
        'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage('pin', image);

            // Add a layer to use the image to represent the data.
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'point', // reference the data source
                'layout': {
                    'icon-image': 'pin', // reference the image
                    'icon-size': 0.25
                }
            });
        }
    );
    // Add a layer showing the places.
    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'icon-image': 'pin',
            'icon-size': 0.1,
            'icon-allow-overlap': true
        }
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'places', (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
    });
});

//
//Meeting details function
//

const closem = document.querySelector(".modal-close");
const subModal = document.querySelector(".submodal-wrap");
const subModal2 = document.querySelector(".submodal-wrap2");

var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        console.log(currentUser);
    } else {
        console.log("No user is signed in");
        subModal.classList.toggle("display-nonem");
    }
});

closem.addEventListener('click', () => {
    subModal.classList.toggle("display-nonem");
});

function displayMeetings(collection) {
    let MeetingsTemplate = document.getElementById("meeting-list-template");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;

            snap.forEach(doc => { //iterate thru each doc
                var meetingID = doc.id;
                var title = doc.data().title;
                var creator = doc.data().creator;
                var date = doc.data().date;
                var time = doc.data().time;
                var duration = doc.data().duration;
                var location = doc.data().location;
                var people = doc.data().people;
                var description = doc.data().description;
                var logitude = doc.data().logitude;
                var latitude = doc.data().latitude;
                var learning = doc.data().learning;
                //var timestamp = doc.data().timestamp;
                let newcard = MeetingsTemplate.content.cloneNode(true);

                //create modal via js
                var myModal = new bootstrap.Modal(newcard.querySelector("#detail-modal"));

                //update modal description
                newcard.querySelector("#modallable").innerHTML = title;
                newcard.querySelector("#span1").innerHTML = creator;
                newcard.querySelector("#span2").innerHTML = date;
                newcard.querySelector("#span3").innerHTML = time;
                newcard.querySelector("#span4").innerHTML = duration;
                newcard.querySelector("#span5").innerHTML = people;
                newcard.querySelector("#span6").innerHTML = location;
                newcard.querySelector("#span7").innerHTML = description;
                if (learning) {
                    newcard.querySelector('#learning-session-mark-modal').style.display = "block";
                }
                //newcard.querySelector("#time-stamp").innerHTML = timestamp;

                //Join function
                newcard.querySelector('.join-button').onclick = () => join(meetingID);
                newcard.querySelector('.join-button').id = 'joined-' + meetingID;

                //give unique ids list cards and modals
                //newcard.querySelector('#brief-list').setAttribute("id", "brief-list" + i);
                //newcard.querySelector('#detail-modal').setAttribute("id", "detail-modal" + i);

                document.getElementById(collection + "-go-here").appendChild(newcard);

                //add markers to the map
                const marker = new mapboxgl.Marker({
                        color: "#0031DD",
                        draggable: false

                    }).setLngLat([logitude, latitude])
                    .setPopup(new mapboxgl.Popup({
                        closeOnClick: true,
                        closeButton: false,
                        className: 'card-body',
                    }).on('open', () => {
                        console.log('popup was opened');
                        myModal.toggle(); // toggle the modal
                    }))
                    .addTo(map);


                i++;
            })
        })
}

displayMeetings("meetings");


function join(meetingID) {
    console.log(meetingID);
    currentUser.set({
            meetingsJoined: firebase.firestore.FieldValue.arrayUnion(meetingID)
        }, {
            merge: true
        })
        .then(() => {
            console.log("Meeting has been joined");
            var buttonID = 'joined-' + meetingID;
            document.getElementById(buttonID).innerText = "Joined";
            document.getElementById(buttonID).className = "btn btn-success join-button"
        });
}