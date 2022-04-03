//Read form
let params = new URL(window.location.href);
const newReply = document.querySelector(".new-reply");
const submit = document.querySelector("#submit");
const reply = document.querySelector("#reply");
const closem = document.querySelector(".modal-close");
const subModal = document.querySelector(".submodal-wrap");
const subModal2 = document.querySelector(".submodal-wrap2");
const threadID = params.searchParams.get("id");
const threadTitle = params.searchParams.get("name");



function displayThreads(collection) {
    document.title = "Sports Go! - " + threadTitle;

    let ThreadsTemplate = document.getElementById("thread-list-template");

    db.collection(collection)
        .doc(threadID)
        .get()
        .then(doc => {
            var title = doc.data().title;
            var creator = doc.data().creator;
            var date = doc.data().timestamp.toDate().toDateString();
            var details = doc.data().details;

            let newcard = ThreadsTemplate.content.cloneNode(true);

            //update meetings list
            newcard.querySelector('#title').innerHTML = title;
            newcard.querySelector('#creator').innerHTML = creator;
            newcard.querySelector('#date').innerHTML = date;
            newcard.querySelector('#details').innerHTML = details;

            document.getElementById(collection + "-go-here").appendChild(newcard);
        })

}

displayThreads("threads");

function displayReplies(collection) {
    let ThreadsTemplate = document.getElementById("reply-list-template");

    db.collection(collection)
        .orderBy("timestamp", "desc")
        .get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc  
                var tID = doc.data().threadID;

                if (tID == threadID) {

                    var creator = doc.data().creator;
                    var date = doc.data().timestamp.toDate().toDateString();
                    var details = doc.data().details;


                    let newcard = ThreadsTemplate.content.cloneNode(true);

                    //update meetings list
                    newcard.querySelector('#creator').innerHTML = creator;
                    newcard.querySelector('#date').innerHTML = date;
                    newcard.querySelector('#details').innerHTML = details;
                    newcard.querySelector('#card-number').innerHTML = i;

                    document.getElementById(collection + "-go-here").appendChild(newcard);
                    i++;
                }

            })
        })
}

displayReplies("thread_replies");

//Reply to the thread
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
                    db.collection('thread_replies').doc().set({
                        creator_id: user.uid,
                        threadID: threadID,
                        details: reply.value,
                        creator: n,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        thread_title: threadTitle
                    }).then(() => {
                        newReply.reset();
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
    location.reload()
});
