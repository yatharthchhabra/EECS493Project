let eventList = [];
let eventCnt = 0;


window.onload = function() {
    console.log('Create Page loaded!');
    eventList = sessionStorage.getItem("eventList");
    eventCnt = sessionStorage.getItem("eventCnt");
    console.log(eventCnt);
};

function navToMyEvent() {
    window.location.href = "myEvents.html";
}



function userCreateEvent() {
    var newEVENT = {};
    // event name
    var newTitle = "";
    var eventName = document.getElementById("inputEventName").value;
    if(eventName.length == 0) {
        alert("Please enter Event Name");
        return;
    } else {
        newTitle = document.getElementById("inputEventName").value;
    }

    // event type
    var newType = "";
    var eventType = document.getElementById("inputEventType").value;
    if(eventType.length == 0) {
        alert("Please enter Event Type");
        return;
    } else {
        newType = document.getElementById("inputEventType").value;
    }

    // event description
    var newDescription = "";
    var eventDescription = document.getElementById("inputEventDes").value;
    var placeHolder = "Add a short description of your event....";
    if(eventDescription == placeHolder) {
        alert("Please enter Event Description");
        return;
    } else {
        newDescription = document.getElementById("inputEventDes").value;
    }
    
    // event location
    var newLocation = "";
    var location = document.getElementById("inputEventAddress").value;
    if(location.length == 0) {
        alert("Please enter Event Location");
        return;
    } else {
        newLocation = document.getElementById("inputEventAddress").value;
    }

    // event date
    var newDate = "";
    var eventDate = document.getElementById("inputEventDate").value;
    console.log(eventDate);
    if(eventDate.length == 0) {
        alert("Please enter Event Date");
        return;
    } else {
        newDate = document.getElementById("inputEventDate").value.substr(5,10);
    }

    // event starting time
    var startTime;
    var eventStartTime = document.getElementById("inputEventStartTime").value;
    if(eventStartTime.length == 0) {
        alert("Please enter Event Start Time");
        return;
    } 
    else {
        startTime = document.getElementById("inputEventStartTime").value;
    }

    // event ending time
    var endTime;
    var eventEndTime = document.getElementById("inputEventEndTime").value;
    if(eventEndTime.length == 0) {
        alert("Please enter Event End Time");
        return;
    } 
    else {
        endTime = document.getElementById("inputEventEndTime").value;
    }

    var newTime = getTimefromStr(startTime, endTime);

    // event Max people
    var newCapacity;
    var eventMaxPpl = document.getElementById("inputEventMaxPpl").value;
    if(eventMaxPpl.length == 0) {
        alert("Please enter Max People");
        return;
    } else {
        newCapacity = document.getElementById("inputEventMaxPpl").value;
    }

    // Store new event in json

    var jsonEntry = new Object();
    jsonEntry.title  = newTitle;
    jsonEntry.type  = newType;
    jsonEntry.description  = newDescription;
    jsonEntry.capacity  = newCapacity;
    jsonEntry.location  = newLocation;
    jsonEntry.date  = newDate;
    jsonEntry.time  = newTime;
    var jsonString= JSON.stringify(jsonEntry);

    var tempCapacity = "1/" + newCapacity;
    console.log(newTitle);

    //change the url here to create new event!!!
    var url = "http://localhost:8080/newE?" + "index=" + 0 + "&title=" + newTitle + "&type=" + newType + "&description=" + newDescription + "&maxPeople=" + newCapacity + "&capacity=" + tempCapacity + "&location=" + newLocation + "&date=" + newDate + "&time=" + newTime;
    console.log(url);
    fetch(url).then((response) => {
        console.log("Request to append new event to json");
        window.location.href = "index.html";
    });
    
    // const fs = require("fs");
    // // writing the JSON string content to a file
    // fs.writeFile("events.json", jsonString, (error) => {
    // // throwing the error
    // // in case of a writing problem
    // if (error) {
    //   // logging the error
    //   console.error(error);
  
    //   throw error;
    // }
  
    // console.log("new event data written succesfully");
    // });

}

function getTimefromStr(str1, str2) {
    var time1 = parseInt(str1.substr(0,2));
    var time2 = parseInt(str2.substr(0,2));
    if(time2 < time1) {
        alert("Please Enter Valid End Time");
    }
    var APM = "am";
    if(parseInt(str2.substr(0,2)) >= 12) {
        APM = "pm";
        time1 -= 12;
        time2 -= 12;
    }

    return time1 + str1.substr(2,5) + "~" + time2 + str2.substr(2,5)+APM;

}

