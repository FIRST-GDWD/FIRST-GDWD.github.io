var greeting = "Good evening";
console.log(greeting);

function greet() {
    console.log(greeting);
}

function greetUser(username) {
    console.log(greeting + ", " + username);
}

greetUser("Ryan");
greetUser("Jamir");
greetUser("symphorian");

function greetUserOnPage(username) {
    let greetingDisplay = document.getElementById("greetingDisplay");
    greetingDisplay.innerHTML = greeting + ", " + username;
}

greetUserOnPage("Ryan");

function getUserGreeting(username) {
    return greeting + ", " + username + "!";
}

getUserGreeting("ryan");
console.log(getUserGreeting("ryan"));

function greetUserOnPageV2(username) {
    //let greetingDisplay = document.getElementById("greetingDisplay");
    greetingDisplay.innerHTML = getUserGreeting(username);
}

greetUserOnPageV2("Ryan");
