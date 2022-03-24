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