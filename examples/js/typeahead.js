let typeahead = document.getElementById("typeahead");

let typeaheadContent = [
    "",
    "H",
    "HE",
    "HEL",
    "HELL",
    "HELLO",
    "HELLO ",
    "HELLO W",
    "HELLO WO",
    "HELLO WOR",
    "HELLO WORL",
    "HELLO WORLD",
    "HELLO WORLD!",
    "HELLO WORLD!",
    "HELLO WORLD!",
    "HELLO WORLD!",
    "HELLO WORLD!",
    "HELLO WORLD!",
    "HELLO WORLD",
    "HELLO WORL",
    "HELLO WOR",
    "HELLO WO",
    "HELLO W",
    "HELLO ",
    "HELLO",
    "HELL",
    "HEL",
    "HE",
    "H",
    "",
];

let typeaheadIndex = 0;

function displayTypeahead() {
    let currentString = typeaheadContent[typeaheadIndex];

    typeahead.innerHTML = currentString;

    typeaheadIndex++;
    if (typeaheadIndex >= typeaheadContent.length) {
        typeaheadIndex = 0;
    }
}

setInterval(displayTypeahead, 100);