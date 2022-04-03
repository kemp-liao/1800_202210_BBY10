const closem = document.querySelector(".modal-close");
const subModal = document.querySelector(".submodal-wrap");

function writeReview() {
    let Name = document.getElementById("name").value;
    let Email = document.getElementById("email").value;
    let Message = document.getElementById("message").value;
    let Title = document.getElementById("title").value;
    let Reason = document.getElementById("reason").value;

    console.log(Name, Email.Message, Title, Reason);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("feedbacks").add({
                        userID: userID,
                        name: Name,
                        email: Email,
                        title: Title,
                        reason: Reason,
                        message: Message,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        subModal.classList.toggle("display-nonem");
                    })
                })

        } else {
            // No user is signed in.
            console.log("no user signed in");
        }
    });

}

closem.addEventListener('click', () => {
    subModal.classList.toggle("display-nonem");
    window.location.replace("index.html");
});
