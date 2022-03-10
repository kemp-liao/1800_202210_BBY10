//Read form.
const newMeeting = document.querySelector(".new-meeting");
const meetingTitle = document.querySelector("#meeting-title");
const meetingLocation = document.querySelector("#meeting-location");
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
                        latitude: 49.274738,
                        location: meetingLocation.value,
                        logitude:  -122.921152,
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

