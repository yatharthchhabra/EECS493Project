//Event Script
var url = "http://localhost:8080/";
let data;


//Global Variables
let isLogIn = true;
let isScrollEnabled = true;
let eventList = [];
let eventCnt = 0;
let sportsFilter = {
    numFilter: 0,
    Football: false,
    Basketball: false,
    Hockey: false,
    Badminton: false,
    Cricket: false,
    Fitness: false
};

let green = "#ebfcdb";
let blue = "#d9eafa";



// Global Listener

window.onload = function() {
    
    
    // index.html
    if(window.location.href.match('index.html') != null){
        if(!sessionStorage.getItem("isLogedIn")) {
            window.location.href = "logIn.html";
        }
        else {
            fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                data = json;
                console.log('Webpage loaded!');
                initialEvent();
                if(sessionStorage.getItem("newTitle") !== null){
                    // Append new Event
                    loadCreatedEvent();
                }
                //load all event
                loadEvent();
                document.getElementById("welcomeName").innerText = "Hi, " + sessionStorage.getItem("username");
                
                //check LogIn
                // Still need implementation
                if(sessionStorage.getItem("isLogedIn")) {
                    console.log("logged in");
                }
            });
                
         }

        }
          
};

window.addEventListener('scroll', function(event) {
    if (!isScrollEnabled) {
        event.preventDefault();
        event.stopPropagation();
        window.scrollTo(0, 0);
    }
});

// User Function 

function initialEvent() {
    for (let i = 0; i < data.length; i++) {
        let event = data[i];
        var tmp_event = {
            title: event.title,
            type: event.type,
            date: event.description,
            time: event.time,
            location: event.location,
            capacity: event.capacity,
            index: 0,
            description: event.description
        };
        eventList.push(tmp_event);
    }
}

function loadEvent() {
    for(var i in eventList) {
        appendEvent(eventList[i]);
    }
    
    console.log(document.cookie)
}

function loadCreatedEvent() {
    console.log("Prepare to create new Event");
    // var newTitle = sessionStorage.getItem("newTitle");
    // var newType = sessionStorage.getItem("newType");
    // var newDescription = sessionStorage.getItem("newDescription");
    // var newLocation = sessionStorage.getItem("newLocation");
    // var newDate = sessionStorage.getItem("newDate");
    // var newTime = sessionStorage.getItem("newTime");
    // var newCapacity = sessionStorage.getItem("newCapacity");   
    var newEVENT = {
        title: sessionStorage.getItem("newTitle"),
        type: sessionStorage.getItem("newType"),
        date: sessionStorage.getItem("newDate"),
        time: sessionStorage.getItem("newTime"),
        location: sessionStorage.getItem("newLocation"),
        capacity: "1/" + sessionStorage.getItem("newCapacity") + " Full",
        index: eventCnt,
        description: sessionStorage.getItem("newDescription")
    }
    eventList.push(newEVENT);
    eventCnt++;
}

function appendEvent(event) {
    console.log("Add Event " + eventCnt);
    var container = document.getElementById("eventList");

    // 1. Event Block : Blue (even) / green (odd)
    var eventBlock = document.createElement('div');
    eventBlock.id = "event_" + event.index;
    if(eventCnt%2 == 0){
        eventBlock.className = 'event_blue';
    } else {
        eventBlock.className = 'event_green';
    }

    // 2. dateTime <text>
    var dateTime = document.createElement('text');
    dateTime.id = 'dateTime';
    dateTime.innerHTML = event.date + " - " + event.time;

    // 3. Upper eventRow
    var upperEventRow = document.createElement('div');
    upperEventRow.className = 'eventRow';
    // 3.1 event title
    var eventTitle = document.createElement('text');
    eventTitle.style.fontSize = 'xx-large';
    eventTitle.className = 'eventTextLeft';
    eventTitle.innerHTML = '<b>' + event.title + '</b>';

    // 4. ower eventRow
    var lowerEventRow = document.createElement('div');
    lowerEventRow.className = 'eventRow';
    // 4.1 The location Icon -- hardcode
    var locIcon = document.createElement('img');
    locIcon.src = 'locationIcon.png';
    locIcon.id = 'locationIcon';
    // 4.2 locationText : <text class="eventTextLeft" style="margin-left: 34px;">ARC</text>
    var locationText = document.createElement('text');
    locationText.className = 'eventTextLeft';
    locationText.style.marginLeft = '34px';
    locationText.innerHTML = event.location;
    // 4.3 capacity text 
    //<text class="eventTextMiddle">4/6 Full</text>
    var capText = document.createElement('text');
    capText.className = 'eventTextMiddle';
    capText.innerHTML = event.capacity;
    // 4.4 Learn more -- hardcode
    var learnMore = document.createElement('a');
    learnMore.className = 'eventTextRight';
    learnMore.style.color = "#5b6a75";
    learnMore.style.fontSize = "20px";
    learnMore.href = "eventPage.html";
    learnMore.innerHTML = "<u>Learn More</u>";


    //Start appending in order
    upperEventRow.appendChild(eventTitle);
    lowerEventRow.appendChild(locIcon);
    lowerEventRow.appendChild(locationText);
    lowerEventRow.appendChild(capText);
    lowerEventRow.appendChild(learnMore);
    eventBlock.appendChild(dateTime);
    eventBlock.appendChild(upperEventRow);
    eventBlock.appendChild(lowerEventRow);
    container.appendChild(eventBlock);

    eventCnt++;
}

function navToMyEvent() {
    // document.getElementById("myEvent").style.borderColor = "white";
    if(isLogIn) {
        window.location.href = "myEvents.html";
        document.getElementById("filterBlankPage").style.display = "none";
    } else {
        document.getElementById("blankPage").style.display = "flex";
        isScrollEnabled = false;
    }
    
}


function newEvent() {
    // click add new event button to redirect to create event page
    window.location.href = "createEvent.html";
    sessionStorage.setItem("eventList", eventList);
    sessionStorage.setItem("eventCnt", eventCnt);
}


function changeFilter() {
    if(document.getElementById("filterBlankPage").style.display == "flex"){
        document.getElementById("filterBlankPage").style.display = "none";
    } else {
        document.getElementById("filterBlankPage").style.display = "flex";
    }
}

function closeFilter() {
    document.getElementById("filterBlankPage").style.display = "none";
    filterEvent();
    updateFilterHeader();
}

function navToEventPage() {
    window.location.href = "eventPage.html";
}

function closeLogInWarning() {
    document.getElementById("blankPage").style.display = "none";
    isScrollEnabled = true;
}

function changeSportsFilterElt(sportName) {
    sportsFilter[sportName] = !sportsFilter[sportName];
    console.log(sportName + " " +sportsFilter[sportName]);
    // change bg color: #e1e6c8
    var button = document.getElementById(sportName + "FilterButton");
    if(sportsFilter[sportName]){
        button.style.backgroundColor = "#e1e6c8";
        sportsFilter["numFilter"]++;
    }else {
        button.style.backgroundColor = "#ebfcdb";
        sportsFilter["numFilter"]--;
    }
}

function filterEvent() {
    if(sportsFilter["numFilter"] == 0) {
        for(var i in eventList){
            var event = document.getElementById("event_" + eventList[i].index);
            event.style.display = "flex";
        }
    } else {
         for(var i in eventList){
            var event = document.getElementById("event_" + eventList[i].index);
            if(eventList[i].type == "other" || !sportsFilter[eventList[i].type]) {
                event.style.display = "none";
            }
            else {
                event.style.display = "flex";
            }
        }
    }
}

function updateFilterHeader() {
    for(var i in sportsFilter) {
        if(i != "numFilter" && sportsFilter[i]) {
            //add it to the filter header
            //<div class="filterButton" id = "FootballFilterButton" onclick="changeSportsFilterElt('Football')"> Football</div>
            var filterButton = document.createElement('div');
            filterButton.className = 'filterButton_header';
            filterButton.id = "filterButton_" + i;
            filterButton.innerHTML = i;
            filterButton.style.backgroundColor = "#d9eafa";

            var closeIcon = document.createElement('img');
            closeIcon.src = "closeIcon.png";
            closeIcon.className = "filterIcon";
            closeIcon.id = "filterIcon_" + i;
            closeIcon.addEventListener('click', deselectFilterIcon);
            filterButton.appendChild(closeIcon);
            document.getElementById("filterHeader").appendChild(filterButton);
            document.getElementById("filterIcon_" + i)
        }

    }
}

function deselectFilterIcon(event) {
    var filterButtonTmp = event.target;
    var idTmp = filterButtonTmp.id;
    var sportName = idTmp.substring(11, idTmp.length);
    console.log(sportName);
    sportsFilter[sportName] = false;
    sportsFilter["numFilter"]--;
    var removeFilter = document.getElementById("filterButton_"+sportName);
    removeFilter.remove();
    var insideFilterButton = document.getElementById(sportName+"FilterButton");
    insideFilterButton.style.backgroundColor = "#ebfcdb";
    filterEvent();
}

function changePasswordVisibility() {
    console.log(document.getElementById("logInPasswordInput").value);
    if(document.getElementById("logInPasswordInput").value.length > 0){
        if(document.getElementById("logInPasswordInput").type == "password"){
            document.getElementById("logInPasswordInput").type = "text";
        } else {
            document.getElementById("logInPasswordInput").type = "password";
        }
    }
}

function navToLogIn() {
    sessionStorage.setItem("isLoggedIn", false);
    sessionStorage.setItem("username", "");
    window.location.href = "logIn.html";
}

async function signInButton() {
    var email = document.getElementById("loginName").value;
    var pass = document.getElementById("logInPasswordInput").value;
    const verify = await verifyLogIn(email,pass);
    if(verify) {
        window.location.href = "index.html";
        sessionStorage.setItem("isLogedIn", true);
    } else {
        alert("Wrong Email or Password !");
    }
    
}

async function verifyLogIn(email, pass) {
    // this function is to check if the email and password is correct
    // hardcode it for now
    user_url = "http://localhost:8080/users";
    return fetch(user_url)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        data = json;
        var userFound = false;
        var name = "";

        for (var i=0; i < data.length; ++i) {
            var usr = data[i];
            console.log(typeof usr.email);
            console.log(typeof email)
            console.log(typeof pass)
            console.log(usr.password);
            if ((usr.email === email) && (usr.password === pass)) {
                userFound = true;
                console.log("bruh")
                name = usr.name;
                break;
            }
        }

        if (userFound) {
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("username", name);
            return true;
        }
        return false;
    });
    
}