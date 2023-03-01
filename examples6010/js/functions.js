// variable review
let greeting = "Good evening";
console.log(greeting);

// Simple Function
function greet() {
    console.log(greeting);
}

greet();

// Function with an input parameter
function greetUser(username) {
    let userGreeting = greeting + ", " + username;
    console.log(userGreeting);
}

greetUser("Ryan");
greetUser("Jamir");
greetUser("Erica");

// Function with input parameter
// that modifies the page
function greetUserOnPage(username) {
    let greetingDisplay = document.getElementById("greetingDisplay");
    greetingDisplay.innerHTML = greeting + ", " + username;
}

greetUserOnPage("Ryan");

// Function that outputs (or "returns") a value
function getUserGreeting(username) {
    return greeting + ", " + username + "! How can I help you?";
}

getUserGreeting("Ryan");
console.log(
    getUserGreeting("Ryan")
);

// Function using another function
// that modifies the page
function greetUserOnPageV2(username) {
    let greetingDisplay = document.getElementById("greetingDisplay");
    greetingDisplay.innerHTML = getUserGreeting(username);
}

greetUserOnPageV2("Ryan Charles Reid");