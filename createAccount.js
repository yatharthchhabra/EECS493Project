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


async function checkUserExists(email) {
    //check if user with email already exists
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
            if ((usr.email === email)) {
                userFound = true;
                console.log("bruh")
                break;
            }
        }

        if (userFound) {
            return true;
        }
       return false;
        
    });

}

async function createAccountButton() {
    //check whether fields are empty
    if ((!document.getElementById('name').value) 
    || (!document.getElementById('email').value) 
    || (!document.getElementById('logInPasswordInput').value) 
    || (!document.getElementById('zipcode').value)) {
        alert("Fields cannot be empty");
        return false;
    }

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password  = document.getElementById('logInPasswordInput').value;
    var zipcode = document.getElementById('zipcode').value;

    var userExists = await checkUserExists(email);
    if (userExists) {

        alert("User with this email already exists!");
        return false;
    }
    var url = "http://localhost:8080/create?" + "name=" + name + "&email=" + email + "&password=" + password + "&zipcode=" + zipcode;
    console.log(url);
    fetch(url).then((response) => {
        console.log("created account");
        window.location.href = "login.html";
    });
    
}