
//Read form.
const newThread = document.querySelector(".new-thread");
const threadTitle = document.querySelector("#thread-title");
const threadDetails = document.querySelector("#thread-details");
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



//Add new thread
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
                    db.collection('threads').doc().set({
                        creator_id: user.uid,
                        details: threadDetails.value,
                        title: threadTitle.value,
                        creator: n,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        newThread.reset();
                        subModal.classList.toggle("display-nonem");
                    });
                })
        } else {
        }
    });
});

//Display modal
closem.addEventListener('click', () => {
    subModal.classList.toggle("display-nonem");
    window.location.replace("community-hub.html");
});

