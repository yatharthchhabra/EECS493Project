// eventPage javaScript
var url = "http://localhost:8080/";
// let data;
let eventList;


window.onload = function() {
    console.log('event Page loaded!');

    fetch(url)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        eventList = json;
        console.log(eventList);
        console.log('Event Page loaded!');

        //update the event information
        loadEventInfo(eventList[id]);
    });

    var id = sessionStorage.getItem("learnMoreId");
    console.log("onclick event id = " + id);

};

function initialEvent() {
    var event_1 = {
        title: "Basketball 3V3",
        type: "Basketball",
        date: "03-14",
        time: "1:00~3:00pm",
        location: "ARC",
        capacity: "4/6 Full",
        index: 0,
        description: "None"
    };
    var event_2 = {
        title: "Tennis",
        type: "Tennis",
        date: "03-14",
        time: "2:00~3:30pm",
        location: "ARC",
        capacity: "1/4 Full",
        index: 1,
        description: "None"
    };
    var event_3 = {
        title: "Football",
        type: "Football",
        date: "03-14",
        time: "3:00~5:00pm",
        location: "ARC",
        capacity: "4/10 Full",
        index : 2,
        description: "None"
    };
    var event_4 = {
        title: "Zumba",
        type: "Fitness",
        date: "03-14",
        time: "8:00~9:30pm",
        location: "Intramural",
        capacity: "9/10 Full",
        index: 3,
        description: "None"
    };
    eventList.push(event_1);
    eventList.push(event_2);
    eventList.push(event_3);
    eventList.push(event_4);
}

function navToMyEvent() {
    // document.getElementById("myEvent").style.borderColor = "white";
    // if(isLogIn) {
    //     window.location.href = "myEvents.html";
    //     document.getElementById("filterBlankPage").style.display = "none";
    // } else {
    //     document.getElementById("blankPage").style.display = "flex";
    //     isScrollEnabled = false;
    // }
    window.location.href = "myEvents.html";
}

function loadEventInfo(event) {
    console.log("onclick event = " + event);
    console.log("load event info for event = " + event.index);

    document.getElementById("eventTITLE").innerHTML = event.title;
    document.getElementById("eventCAP").innerHTML = event.capacity;
    document.getElementById("eventLocation").innerHTML = event.location;
    document.getElementById("eventDateTime").innerHTML = event.date + "  " + event.time;

}

function navToHOME() {
    console.log("click back button!");
    window.location.href = "index.html";

}

function joinEvent() {
    var currCapStr = document.getElementById("eventCAP").innerHTML;
    if(document.getElementById("joinEventButton").innerHTML == "Join") {
        var newNum = parseInt(currCapStr.charAt(0)) + 1;
        document.getElementById("eventCAP").innerHTML = newNum + currCapStr.substring(1,currCapStr.length);
        document.getElementById("joinEventButton").innerHTML = "Leave";
    }
    else if(document.getElementById("joinEventButton").innerHTML == "Leave"){
        var newNum = parseInt(currCapStr.charAt(0)) - 1;
        document.getElementById("eventCAP").innerHTML = newNum + currCapStr.substring(1,currCapStr.length);
        document.getElementById("joinEventButton").innerHTML = "Join";
    }
    else{
        console.log("Invalid Join button state");
    }
}