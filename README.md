## SportsGo! (COMP1800 Project)

* [General info](#general-info)
* [Technologies](#technologies)
* [References](#references)
* [Contents](#contents)

## General Info
Our app, SportsGo!, serves as a community hub and a search engine for modern busy individuals to find people to play sports together. Modern people are too busy with their lives that it is quite hard to gather friends or family whenever they have leisure time. This app will help users to find random people to play sports together to balance and enjoy their lives. Users can post sports meetings or free learning & teaching sessions, and socialize with other people.

Co-founder & Coder - Kemp Liao

Co-founder & Designer - Wendy Kong

Demo URL - https://sportsgo-682a6.web.app/
	
## Technologies
Technologies used for this project:
* HTML
* CSS
* JavaScript
* Bootstrap
* Mapbox Map API

## References
* Mapbox API  
We use Mapbox API to display map, search text address, and convert text address to geo-coordinates.  

* Flaticon  
Most of the icons in our website are from Flaticon, the sources are marked in the contents section.  

* Bootstrap  
Most of the responsive part are using Bootstrap v5.1.  

* Firebase  
We use firebase to store the data, manage authentications, and deploy the website.  

## Contents
Content of the project folder:

 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── about-us.html            # about us page
├── add-new-meeting.html     # allow user to add new meeting to the database
├── add-new-thread.html      # allow user to add new thread to the database
├── bookmarks.html           # allow user to view the meetings they marked as favorite
├── community-hub.html       # the main page of community hub, list all the threads
├── contact-us.html          # allow the user to leave us feedbacks
├── edit-my-post.html        # the page that allow the user to modify their old posts
├── list-view-learning.html  # only show learning session meetings
├── list-view-regular.html   # only show regular meetings
├── list-view.html           # the list view that shows all the meetings
├── login.html               # the login page allows the user to log in
├── my-meetings.html         # the page that shows all the meetings the user joined
├── thread.html              # the thread details page, will display all the related replies
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /add.png                 # Add icon (Src: Flaticon)
    /cancel.png              # Cancel picture (Src: Flaticon)
    /checked.png             # Checked picture (Src: Flaticon)
    /filter.png              # Filter icon (Src: Flaticon)
    /Kemp.png                # Kemp's photo
    /l.png                   # Learning session icon (Src: Flaticon)
    /list.png                # List icon (Src: Flaticon)
    /logo.png                # SportsGo! Logo
    /map.png                 # Map icon (Src: Flaticon)
    /user.png                # User icon (Src: Flaticon)
    /Wendy.jpg               # Wendy's photo

├── scripts                  # Folder for scripts
    /add-new-meeting.js      # add-new-meeting.html javascript file
    /add-new-thread.js       # add-new-thread.html javascript file
    /authentication.js       # Sign up authentication javascript file
    /bookmarks.js            # bookmarks.html javascript file
    /community-hub.js        # community-hub.html javascript file
    /contact-us.js           # contact-us.html javascript file
    /edit-my-post.js         # edit-my-post.html javascript file
    /firebaseAPI_SportsGo!.js# firebase api storage file
    /listview-learning.js    # list-view-learning.html javascript file
    /listview-regular.js     # list-view-regular.html javascript file
    /listview.js             # list-view.html javascript file
    /map.js                  # index.html javascript file
    /my-meetings.js          # my-meetings.html javascript file
    /profile.js              # profile.html javascript file
    /skeleton.js             # skeleton javascript file for entire site
    /thread.js               # thread.html javascript file

├── styles                   # Folder for styles
    /aboutus.css             # CSS file for about us page
    /contact.css             # CSS file for contact us page
    /footer.css              # CSS file for footer
    /login.css               # CSS file for login page
    /profile.css             # CSS file for profile page
    /style.css               # Main CSS file

├── components               # Folder for header and footer
    /footer.html             # Footer
    /nav.html                # Nav bar

Firebase hosting files: 
├── .firebase
├── .firebaserc
├── 404.html
├── firebase.json
├── firestore.indexes.json
├── firestore.rules

VScode files:
├── .vscode
