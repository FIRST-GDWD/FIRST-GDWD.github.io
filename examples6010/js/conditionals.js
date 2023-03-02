let isLightMode = true;

let storedMode = localStorage.getItem("isLightMode") == "true";
if (storedMode != null) {
    isLightMode = storedMode;
}

let body = document.getElementById("body");
let header = document.getElementById("header");
let button = document.getElementById("modeToggle");

body.style.margin = "0px";
header.style.padding = "24px";

function displayMode() {
    if (isLightMode) {
        header.style.backgroundColor = "black";
        body.style.backgroundColor = "white";
        body.style.color = "black";
    } else {
        header.style.backgroundColor = "white";
        body.style.backgroundColor = "black";
        body.style.color = "white";
    }
}
displayMode();

function toggleMode() {
    isLightMode = !isLightMode;
    localStorage.setItem("isLightMode", isLightMode);
    displayMode();
}

button.onclick = toggleMode;