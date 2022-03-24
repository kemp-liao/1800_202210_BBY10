function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userGender = userDoc.data().Gender;
                    var userCity = userDoc.data().city;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userGender != null) {
                        document.querySelector('input[name="Gender"]:checked').value = userGender;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    userName = document.getElementById('nameInput').value; //get the value of the field with id="nameInput"
    userGender = document.querySelector('input[name="Gender"]:checked').value; //get the value of the field with id="schoolInput"
    userCity = document.getElementById('cityInput').value; //get the value of the field with id="cityInput"

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)

            currentUser.update({
                name: userName,
                gender: userGender,
                city: userCity
            })
                .then(() => {
                    console.log("Document successfully updated!");
                    document.getElementById('personalInfoFields').disabled = true;
                })
        }
    })
}


///////////////////////////
//Display joined meetings//
///////////////////////////
var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        db.collection("users").doc(user.uid)
            .get()
            .then(function (doc) {
                var joinedList = doc.data().meetingsJoined;
                //Pass the data to local storage
                localStorage.setItem("joinedList", joinedList);
            })
        console.log(currentUser);
    } else {
        console.log("No user is signed in");
    }
});

function displayMeetings(collection) {
    let MeetingsTemplate = document.getElementById("meeting-list-template");

    var jl = localStorage.getItem("joinedList").split(',');
    console.log(jl);
    var i;
    for (i = 0; i < jl.length; i++) {

        db.collection(collection)
            // .orderBy("timestamp")
            .doc(jl[i])
            .get()
            .then(doc => {
                var meetingID = doc.id;
                var title = doc.data().title;
                var creator = doc.data().creator;
                var date = doc.data().date;
                var time = doc.data().time;
                var duration = doc.data().duration;
                var location = doc.data().location;
                var people = doc.data().people;
                var description = doc.data().description;
                let newcard = MeetingsTemplate.content.cloneNode(true);



                //update meetings list
                newcard.querySelector('#title').innerHTML = title;
                newcard.querySelector('#creator').innerHTML = creator;
                newcard.querySelector('#date').innerHTML = date;
                newcard.querySelector('#time').innerHTML = time;
                newcard.querySelector('#duration').innerHTML = duration;

                //update modal description
                newcard.querySelector("#modallable").innerHTML = title;
                newcard.querySelector("#span1").innerHTML = creator;
                newcard.querySelector("#span2").innerHTML = date;
                newcard.querySelector("#span3").innerHTML = time;
                newcard.querySelector("#span4").innerHTML = duration;
                newcard.querySelector("#span5").innerHTML = people;
                newcard.querySelector("#span6").innerHTML = location;
                newcard.querySelector("#span7").innerHTML = description;


                //give unique ids list cards and modals
                newcard.querySelector('#brief-list').setAttribute("id", "brief-list" + i);
                newcard.querySelector('#detail-modal').setAttribute("id", "detail-modal" + i);
                newcard.querySelector('#detailbutton').setAttribute("data-bs-target", "#detail-modal" + i);


                document.getElementById(collection + "-go-here").appendChild(newcard);
            })

    }


}

displayMeetings("meetings");