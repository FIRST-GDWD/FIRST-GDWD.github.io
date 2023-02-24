// The DOM (Document Object Model)
// is the representation of your web page
// (including the HTML and CSS) in JavaScript

// This will get us a JS reference to the 
// the HTML element with the specified ID
// (remember, JS is case-sensitive!!!)
let body = document.getElementById("myBodyElement");

// The dot (.) operator lets us look inside
// whatever is on the left side
// to try to access whatever is on the right.

// 'style' happens to be a property inside
// HTML elements, which stores all of its
// CSS styles and properties.

// CSS properties in JS get their names converted.
// (so 'background-color' becomes 'backgroundColor')
body.style.backgroundColor = "lightgreen";

// 'innerHTML' is a property that contains
// all of the child HTML code inside that element.
// If we reassign a value to it, we will override
// any existing HTML with our own HTML.
// (Inspect your page to verify this!)
body.innerHTML = "<h1>Hello World!</h1>";

// We can also append HTML to 'innerHTML'
body.innerHTML = 
    body.innerHTML + 
    "<p id='myParagraph'>This was written with dynamic JS!</p>";

// The += operator is equivalent to the 
// code above
body.innerHTML += "<p>Here's another paragraph</p>";

// We can also get JS reference to HTML elements
// we added dynamically.
let myParagraph = document.getElementById("myParagraph");
myParagraph.style.color = "#3333FF";
myParagraph.style.fontWeight = "bold";

// We can combine what we learned to build
// a very simple 'day/night' mode for our page.
var isNightMode = false;
if (isNightMode) {
    body.style.backgroundColor = "#333333";
    body.style.color = "white";
} else {
    body.style.backgroundColor = "white";
    body.style.color = "#333333";
}