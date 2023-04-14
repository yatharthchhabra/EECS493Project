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

app.listen(8080, () => {
    console.log("listening on port 8080");
})

