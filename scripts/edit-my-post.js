//
//Display the meetings the user posted
//
var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        let MeetingsTemplate = document.getElementById("meeting-list-template");


        db.collection("meetings")
            .orderBy("timestamp")
            .get()
            .then(snap => {
                var i = 1;
                snap.forEach(doc => { //iterate thru each doc
                    var creator_id = doc.data().creator_id;
                    if(creator_id == userID){
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
                        newcard.querySelector('#duration').innerHTML = duration;
                        if(learning){
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
                        if(learning){
                            newcard.querySelector('#learning-session-mark-modal').style.display = "block";
                        }
                        //give unique ids list cards and modals
                        newcard.querySelector('#brief-list').setAttribute("id", "brief-list" + i);
                        newcard.querySelector('#detail-modal').setAttribute("id", "detail-modal" + i);
                        newcard.querySelector('#detailbutton').setAttribute("data-bs-target", "#detail-modal" + i);
        
                        //Delete meetings
                        newcard.querySelector('.delete-button').onclick = () => deleteMeeting(meetingID);
                        newcard.querySelector('.delete-button').id = 'delete-' + meetingID;
        
                        document.getElementById("meetings-go-here").appendChild(newcard);
                        i++;
                    }

                })
            })
        
    } else {
        console.log("No user is signed in");
    }
});

//Delete meeting function
function deleteMeeting(meetingID){
    console.log(meetingID);
    db.collection("meetings").doc(meetingID).delete()
    .then( () => {
        console.log("Meeting has been deleted");
        var buttonID = 'delete-' + meetingID;
        document.getElementById(buttonID).innerText = "Deleted Successfully";
        document.getElementById(buttonID).className = "btn btn-success delete-button"
        const timeout = setTimeout(() =>{
            location.reload()
        }, 2000);
    });
}


///////////////////////////////////////
//Display the threads the user posted//
///////////////////////////////////////

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        let ThreadsTemplate = document.getElementById("thread-list-template");


        db.collection("threads")
            .orderBy("timestamp")
            .get()
            .then(snap => {
                snap.forEach(doc => { //iterate thru each doc
                    var creator_id = doc.data().creator_id;
                    if(creator_id == userID){
                        var title = doc.data().title;   
                        var creator = doc.data().creator;
                        var date = doc.data().timestamp.toDate().toDateString();
                        var details = doc.data().details;
                        var threadID = doc.id;
        
                        let newcard = ThreadsTemplate.content.cloneNode(true);
        
                        //update meetings list
                        newcard.querySelector('#title').innerHTML = title;
                        newcard.querySelector('#creator').innerHTML = creator;
                        newcard.querySelector('#date').innerHTML = date;
                        newcard.querySelector('#details').innerHTML = details;
        
                        //Delete thread
                        newcard.querySelector('.delete-thread-button').onclick = () => deleteThread(threadID);
                        newcard.querySelector('.delete-thread-button').id = 'delete-' + threadID;

                        newcard.querySelector('.thread-t').href = "Thread.html?name=" + title + "&id=" + threadID;
        
                        document.getElementById("threads-go-here").appendChild(newcard);
                    }

                })
            })
        
    } else {
        console.log("No user is signed in");
    }
});

//Delete thread function
function deleteThread(threadID){
    console.log(threadID);
    db.collection("thread_replies")
    .get()
    .then(snap => {
        snap.forEach(doc => {
            var tID = doc.data().threadID;
            var rID = doc.id;
            if (tID == threadID){
                db.collection("thread_replies").doc(rID).delete()
            }
        })
    });
    db.collection("threads").doc(threadID).delete()
    .then( () => {
        console.log("Thread has been deleted");
        var buttonID = 'delete-' + threadID;
        document.getElementById(buttonID).innerText = "Deleted Successfully";
        document.getElementById(buttonID).className = "btn btn-success delete-button"
        const timeout = setTimeout(() =>{
            location.reload()
        }, 2000);
    });
}

///////////////////////////////////////
//Display the replies the user posted//
///////////////////////////////////////

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        let ThreadsTemplate = document.getElementById("reply-list-template");


        db.collection("thread_replies")
            .orderBy("timestamp")
            .get()
            .then(snap => {
                snap.forEach(doc => { //iterate thru each doc
                    var cID = doc.data().creator_id;
                    if (userID == cID) {
    
                        var creator = doc.data().creator;
                        var date = doc.data().timestamp.toDate().toDateString();
                        var details = doc.data().details;
                        var thread_title = doc.data().thread_title;
                        var replyID = doc.id;
    
    
                        let newcard = ThreadsTemplate.content.cloneNode(true);
    
                        //update meetings list
                        newcard.querySelector('#creator').innerHTML = creator;
                        newcard.querySelector('#date').innerHTML = date;
                        newcard.querySelector('#details').innerHTML = details;
                        newcard.querySelector("#thread-name").innerHTML = thread_title;

                        //Delete reply
                        newcard.querySelector('.delete-reply-button').onclick = () => deleteReply(replyID);
                        newcard.querySelector('.delete-reply-button').id = 'delete-' + replyID;
        
                        document.getElementById("thread_replies-go-here").appendChild(newcard);
                    }

                })
            })
        
    } else {
        console.log("No user is signed in");
    }
});

//Delete reply function
function deleteReply(replyID){
    console.log(replyID);
    db.collection("thread_replies").doc(replyID).delete()
    .then( () => {
        console.log("Reply has been deleted");
        var buttonID = 'delete-' + replyID;
        document.getElementById(buttonID).innerText = "Deleted Successfully";
        document.getElementById(buttonID).className = "btn btn-success delete-button"
        const timeout = setTimeout(() =>{
            location.reload()
        }, 2000);
    });
}