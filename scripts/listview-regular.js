//Populate meetings
var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        console.log(currentUser);
    } else {
        console.log("No user is signed in");
    }
});

function displayMeetings(collection) {
    let MeetingsTemplate = document.getElementById("meeting-list-template");

    db.collection(collection).get()
    db.collection(collection)
        .orderBy("timestamp", "desc")
        .get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var learningCheck = doc.data().learning;

                if (!learningCheck) {
                    var meetingID = doc.id;
                    var title = doc.data().title;
                    var creator = doc.data().creator;
                    var date = doc.data().date;
                    var time = doc.data().time;
                    var duration = doc.data().duration;
                    var location = doc.data().location;
                    var people = doc.data().people;
                    var description = doc.data().description;
                    var learning = doc.data().learning;
                    let newcard = MeetingsTemplate.content.cloneNode(true);



                    //update meetings list
                    newcard.querySelector('#title').innerHTML = title;
                    newcard.querySelector('#creator').innerHTML = creator;
                    newcard.querySelector('#date').innerHTML = date;
                    newcard.querySelector('#time').innerHTML = time;
                    newcard.querySelector('#list-location').innerHTML = location;
                    if (learning) {
                        newcard.querySelector('#learning-session-mark').style.display = "block";
                    }


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


                    //give unique ids list cards and modals
                    newcard.querySelector('#brief-list').setAttribute("id", "brief-list" + i);
                    newcard.querySelector('#detail-modal').setAttribute("id", "detail-modal" + i);
                    newcard.querySelector('#detailbutton').setAttribute("data-bs-target", "#detail-modal" + i);

                    //Join function
                    newcard.querySelector('.join-button').onclick = () => join(meetingID);
                    newcard.querySelector('.join-button').id = 'joined-' + meetingID;

                    //Save bookmarks
                    newcard.querySelector('i').id = 'saved-' + meetingID;
                    newcard.querySelector('i').onclick = () => saveBookmark(meetingID);

                    document.getElementById(collection + "-go-here").appendChild(newcard);
                    i++;
                }
            })
        })
}

displayMeetings("meetings");

//Join button function
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

//Bookmark function
function saveBookmark(meetingID) {
    console.log(meetingID);
    currentUser.set({
        bookmarks: firebase.firestore.FieldValue.arrayUnion(meetingID)
    }, {
        merge: true
    })
        .then(() => {
            console.log("Meeting has been saved");
            var iconID = 'saved-' + meetingID;
            document.getElementById(iconID).innerText = 'bookmark';
        });
}

//Display modals
const subModal = document.querySelector(".submodal-wrap");
const subModal2 = document.querySelector(".submodal-wrap2");

function popupFilter() {
    subModal.classList.toggle("display-nonem");
}