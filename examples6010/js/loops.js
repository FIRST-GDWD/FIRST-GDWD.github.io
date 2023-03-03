// some functions return Arrays.
// getElementsByTagName return an array of elements
// that match the tag name
const body = document.getElementsByTagName("body")[0];

// body.innerHTML += "<h2>Heading 1</h2>";
// body.innerHTML += "<h2>Heading 2</h2>";
// body.innerHTML += "<h2>Heading 3</h2>";
// body.innerHTML += "<h2>Heading 4</h2>";

// Loops make it MUCH easier to run 
// repeated code over and over again,
// but usually by writing it only once!

// for loops are some of the most
// frequently used loops.

// for loops have 3 main parts to set up:
// - initializing the counting variable
// - the condition to stop the loop
// - the code to update the counting variable


for (let i = 0; i < 10; i++) {
    body.innerHTML += "<h2>Heading " + (i + 1) + "</h2>";
}

