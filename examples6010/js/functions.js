// Variable Review
var greeting = "Good evening";
console.log(greeting);

// Simple function
function greet() {
    console.log(greeting);
}

greet();

// Function with input parameter
function greetUser(username) {
    console.log(greeting + ", " + username);
}

greetUser("Ryan");
greetUser("Jamir");
greetUser("symphorian");

// Function with input parameter
// that modifies the page
function greetUserOnPage(username) {
    let greetingDisplay = document.getElementById("greetingDisplay");
    greetingDisplay.innerHTML = greeting + ", " + username;
}

greetUserOnPage("Ryan");

// Function that outputs (or "returns") a value
function getUserGreeting(username) {
    return greeting + ", " + username + "!";
}

getUserGreeting("ryan");
console.log(getUserGreeting("ryan"));

// Function using another function
// that modifies the page
function greetUserOnPageV2(username) {
    //let greetingDisplay = document.getElementById("greetingDisplay");
    greetingDisplay.innerHTML = getUserGreeting(username);
}

greetUserOnPageV2("Ryan");
