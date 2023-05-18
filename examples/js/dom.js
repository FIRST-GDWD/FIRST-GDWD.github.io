// let variableName = variableValue;
let page = document.getElementById("page");
// page.style.backgroundColor = "#723654";
// page.style.color = "white";

let heading = document.getElementById("heading");
heading.style.fontSize = "60px";
heading.innerHTML = "<i>Hello</i> World!";

/* LIGHT/DARK Demo */

let mode = "dark";
function displayMode() {
    if (mode == "dark") {
        page.style.backgroundColor = "#222222";
        page.style.color = "#DDDDDD";
    } else if (mode == "light") {
        page.style.backgroundColor = "#DDDDDD";
        page.style.color = "#222222";
    } else {
        page.style.backgroundColor = "red";
        page.style.color = "yellow";
    }
}
displayMode();

let toggleButton = 
    document.getElementById("toggleButton");

function toggleMode() {
    if (mode == "dark") {
        mode = "light";
    } else if (mode == "light") {
        mode = "dark";
    }
    displayMode();
}
toggleButton.onclick = toggleMode;