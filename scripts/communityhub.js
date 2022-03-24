function displayThreads(collection) {
    let ThreadsTemplate = document.getElementById("thread-list-template");

    db.collection(collection)
        .orderBy("timestamp")
        .get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().title;   
                var creator = doc.data().creator;
                var date = doc.data().timestamp.toDate();
                var details = doc.data().details;

                let newcard = ThreadsTemplate.content.cloneNode(true);

                //update meetings list
                newcard.querySelector('#title').innerHTML = title;
                newcard.querySelector('#creator').innerHTML = creator;
                newcard.querySelector('#date').innerHTML = date;
                newcard.querySelector('#details').innerHTML = details;

                // //update modal description
                // newcard.querySelector("#modallable").innerHTML = title;
                // newcard.querySelector("#span1").innerHTML = creator;
                // newcard.querySelector("#span2").innerHTML = date;
                // newcard.querySelector("#span3").innerHTML = time;
                // newcard.querySelector("#span4").innerHTML = duration;
                // newcard.querySelector("#span5").innerHTML = people;
                // newcard.querySelector("#span6").innerHTML = location;
                // newcard.querySelector("#span7").innerHTML = description;


                // //give unique ids list cards and modals
                // newcard.querySelector('#brief-list').setAttribute("id", "brief-list" + i);
                // newcard.querySelector('#detail-modal').setAttribute("id", "detail-modal" + i);
                // newcard.querySelector('#detailbutton').setAttribute("data-bs-target", "#detail-modal" + i);

                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayThreads("threads");
