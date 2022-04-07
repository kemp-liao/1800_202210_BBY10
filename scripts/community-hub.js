//Populate the threads
function displayThreads(collection) {
    let ThreadsTemplate = document.getElementById("thread-list-template");

    db.collection(collection)
        .orderBy("timestamp", "desc")
        .get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().title;   
                var creator = doc.data().creator;
                var date = doc.data().timestamp.toDate().toDateString();
                var details = doc.data().details;
                var threadID = doc.id;

                let newcard = ThreadsTemplate.content.cloneNode(true);

                //update threads list
                newcard.querySelector('#title').innerHTML = title;
                newcard.querySelector('#creator').innerHTML = creator;
                newcard.querySelector('#date').innerHTML = date;
                newcard.querySelector('#details').innerHTML = details;

                newcard.querySelector('.thread-t').href = "thread.html?name=" + title + "&id=" + threadID;

                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayThreads("threads");
