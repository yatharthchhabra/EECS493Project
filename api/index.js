const express = require('express');
const app = express();
const fetch = require("node-fetch");
var fs = require('fs');
var cors = require('cors');

app.use(cors({
    origin: '*'
}));
app.get("/", (req,res) => {
    var filePath = "./data/events.json";
    var data = "";
    fs.readFile(filePath, function (error, content) {
        data = JSON.parse(content);
        console.log(data);
        res.json(data);
    });
    
});

app.get("/users", (req,res) => {
    var filePath = "./data/users.json";
    var data = "";
    fs.readFile(filePath, function (error, content) {
        data = JSON.parse(content);
        console.log(data);
        res.json(data);
    });
});

app.get("/create", (req, res) => {

    var filePath = "./data/users.json";
    var obj = new Object();
    obj.name = req.query.name;
    obj.email = req.query.email;
    obj.password = req.query.password;
    obj.zipcode = req.query.zipcode;
    var newEntry = JSON.stringify(obj);
    console.log(newEntry);
    fs.readFile(filePath, function (err, data) {
        var json = JSON.parse(data)
        json.push(JSON.parse(newEntry))
    
        fs.writeFile(filePath, JSON.stringify(json), function(err, result) {
            if(err) console.log('error', err);
          });
    });
    res.send("Created")


});

app.get("/newE", (req, res) => {

    var filePath = "./data/events.json";
    var obj = new Object();
    //"index=" + 0 + "&title=" + newTitle + "&type=" + newType + "&description=" + newDescription + "&maxPeople=" + newCapacity + "&capacity=" + tempCapacity + "&location=" + newLocation + "&date=" + newDate + "&time=" + newTime;
    obj.index = req.query.index;
    obj.title  = req.query.title;
    obj.type  = req.query.type;
    obj.description  = req.query.description;
    obj.maxPeople = req.query.maxPeople;
    obj.capacity  = req.query.capacity;
    obj.location  = req.query.location;
    obj.date  = req.query.date;
    obj.time  = req.query.time;
    var newEntry = JSON.stringify(obj);
    console.log(newEntry);
    fs.readFile(filePath, function (err, data) {
        var json = JSON.parse(data)
        json.push(JSON.parse(newEntry))
    
        fs.writeFile(filePath, JSON.stringify(json), function(err, result) {
            if(err) console.log('error', err);
          });
    });
    res.send("Created")


});

app.listen(8080, () => {
    console.log("listening on port 8080");
})

