// Some functions will return an Array.
// getElementsByTagName will return an array
// of elements that match the tag name.

// const body = document.getElementsByTagName("body")[0];
const elementsArray = 
    document.getElementsByTagName("body");
const body = elementsArray[0];

body.innerHTML += "<h2>Heading 1</h2>";
body.innerHTML += "<h2>Heading 2</h2>";
body.innerHTML += "<h2>Heading 3</h2>";
body.innerHTML += "<h2>Heading 4</h2>";

// for loop
// there are three main set-up part of a for loop
// - initializing the counting variable
// - the condition to stop the loop
// - the code to update the counting variable

for (let i = 4; i < 10; i++) {
    body.innerHTML += "<h2>Heading " + (i+1) + "</h2>";
    for (let j = 0; j < 4; j++) {
        body.innerHTML += "<h3>Subheading " + (j+1) + "</h3>";
    }
}
