// An Array is basically a list of objects.
// Arrays are a type of 'data structure',
// which are constructs that hold data.

// Arrays can be created using square brackets
let emptyArray = []; // more can be added later

let numberArray = [27, 5, 8, 3, 142];
console.log(numberArray);

let stringArray = ["apple", "orange", "grapes", "pear"];

let mixedArray = ["cat", 2, 5, "dog", "platypus", 12];

let groceryList = [
    "milk", 
    "pretzels", 
    "chicken", 
    "cream soda", 
    "peanuts"
];
// tell me to get chicken from this list
// without saying chicken 

// Accessing data from an Array also uses square brackets.
// We use a number called an 'index' to specify
// which element in the array we want to get.
// One thing to remember: indices start counting at 0!

let firstGroceryItem = groceryList[0]; // milk
let thirdGroceryItem = groceryList[2]; // chicken

let firstNumber = numberArray[0]; // 27

let thirdString = stringArray[2]; // grapes

let lastMixed = mixedArray[5]; // 12 (NOTE: the max index is the length - 1)

// We can also add elements to an existing array
// by using the push function.

console.log(groceryList);
groceryList.push("ice cream"); // adds "ice cream" to the end
console.log(groceryList);