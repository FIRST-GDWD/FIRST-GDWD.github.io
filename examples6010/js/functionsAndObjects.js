// You've actually been using objects and functions
// in all your JavaScript so far.

// FUNCTIONS

// Functions are basically mini-programs that you
// write that can be executed or "called"
// whenever you want.

// If we think of variables as the NOUNS of JS,
// then functions are the VERBS of JS.
// They make things happen.

// Much like variables, functions need to be
// declared before they can be used.

// The way we do that with functions is to
// actually use a keyword called 'function'.
// A function declaration looks like this.

function doSomething() {
    // Write some code to do something here
}

// It starts with the 'function' keyword,
// followed by the name of the function,
// which is then followed by parentheses.
// After the parentheses, we have curly brackets.
// And much like in CSS, the curly brackets
// define what we call the 'function body'.
// This is where the code we want to execute goes.

// When we want to execute the function, 
// we have to specify the name of the function,
// followed by the parentheses.

// A function won't do anything unless
// we execute (or call) it.

// I find it helpful to think of functions
// like recipe cards; they don't actually 
// do anything on their own, but you can
// use them to make food in the kitchen.

// We can also use the parentheses to include
// what we call 'parameters', which are basically
// special input variables that we can 
// only use inside the function.

function doSomething(input1, input2) {
    // Write some code to do something here
}

// OBJECTS

// Objects are essentially code representations of 
// things in the real world (usually).
// You as a person can be described by 
//   - attributes and traits and information
//   - the things you can do

// Code objects contain the same types of data.
// The parts of objects that contain information
// (or even other objects) are called "properties".

// Another way to think of properties are
// variables stored within an object.



// console is a special variable containing 
// a reference to an object, 
// which itself contains console-related 
// functions, such as 'log'
console.log("Hello World!");

// document is a special variable containing
// a code representation of your web page.
var body = document.getElementById("bodyElement");
body.style.backgroundColor = "green";