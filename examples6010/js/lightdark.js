let mode = "dark";

let storedMode = localStorage.getItem("mode");
if (storedMode != null) {
    mode = storedMode;
}

const body = document.getElementById("body");
const header = document.getElementById("header");
const button = document.getElementById("modeToggle");

body.style.margin = "0px";
header.style.padding = "24px";

function displayMode() {
    // Conditional Example
    if (mode == "light") {
        header.style.backgroundColor = "black";
        body.style.backgroundColor = "white";
        body.style.color = "black";
    } else if (mode == "dark") {
        header.style.backgroundColor = "white";
        body.style.backgroundColor = "black";
        body.style.color = "white";
    } else if (mode == "sepia") {
        header.style.backgroundColor = "black";
        body.style.backgroundColor = "#704214";
        body.style.color = "black";
    } else {
        
    }
}

function displayModeV2() {
    switch (mode) {
        case "light":
            header.style.backgroundColor = "black";
            body.style.backgroundColor = "white";
            body.style.color = "black";
            break;
        case "dark":
            header.style.backgroundColor = "white";
            body.style.backgroundColor = "black";
            body.style.color = "white";
            break;
        case "sepia":
            header.style.backgroundColor = "black";
            body.style.backgroundColor = "#704214";
            body.style.color = "black";
            break;
        default:
            break;
    }
}

displayModeV2();

function toggleMode() {
    if (mode == "light") {
        mode = "dark";
    } else if (mode == "dark") {
        mode = "sepia";
    } else if (mode == "sepia") {
        mode = "light";
    }
    localStorage.setItem("mode", mode);
    displayModeV2();
}

button.onclick = toggleMode;