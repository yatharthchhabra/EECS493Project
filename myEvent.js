let userList = [];
var url = "http://localhost:8080/users";

window.onload = function() {
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        userList = json;
        console.log('myEvent page loaded!');
        document.getElementById("welcomeName").innerText = "Hi, " + sessionStorage.getItem("username");
    });
}

function navToHome() {
    window.location.href = "index.html";
}

function navToLogIn() {
    sessionStorage.setItem("isLoggedIn", false);
    sessionStorage.setItem("username", "");
    window.location.href = "logIn.html";
}