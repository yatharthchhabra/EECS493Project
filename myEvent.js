
window.onload = function() {
    document.getElementById("userIcon").innerText = "Hi, " + sessionStorage.getItem("username");

}

function navToHome() {
    // document.getElementById("myEvent").style.borderColor = "white";
    
    window.location.href = "index.html";
}