/* 
    This code gets us access to the elements
    we want to modify or change.
*/
let noButton = document.getElementById("no");
let yesButton = document.getElementById("yes");
let page = document.getElementById("page");

/* 
    This code is some examples of how we can
    use JavaScript to modify an element's CSS
*/
// noButton.style.backgroundColor = "blue";
// noButton.style.padding = "100px";

/*
    This code tracks and stores the current
    padding value to use for growing the button
*/
let currentPadding = 24;

/*
    This code creates a function to make the
    button grow when it's clicked.

    A function is like a recipe, that gives
    instructions for what to do to the program.
*/
function onNoButtonClick() {
    currentPadding += 12;
    yesButton.style.fontSize = currentPadding + "px";
    yesButton.style.padding =
        `${currentPadding}px ${currentPadding*2}px`;
}

/*
    If we wanted to manually trigger the function
    above, we could "execute" or "run" the function
    using the code below
*/
// onNoButtonClick();

/*
    This line of code assigns our 'onNoButtonClick'
    function to the 'onclick' event listener.

    An event listener "listens" for an event to
    occur, like a click, and then executes the
    function that is assigned to it, which is
    called an event handler.
*/
noButton.onclick = onNoButtonClick;

/*
    This event listener for the yesButton is
    assigned an anonymous function (a different
    way to create functions, usually for one-off
    scenarios).

    When clicked, the yesButton erases the current
    HTML inside of the 'page' element, and replaces
    it with a gif from the images folder.
*/
yesButton.onclick = () => {
    page.innerHTML =
        "<img id='gif' src='images/kittylove.gif'>";
    
    // new stuff i did for fun which wasn't
    // in the after class demo :-P
    setInterval(bounce, 10);
}


/*
    This is some new code I added to make the
    gif bounce around. There's a LOT more complex
    stuff going on here than we covered after class.

    Consider this a teaser of something fun you 
    could do with JavaScript. :-D
*/
let x = 0;
let y = 0;
let speed = 4;
let edge = 250;
let xVelocity = Math.random()*speed;
let yVelocity = Math.random()*speed;
function bounce() {
    x += xVelocity;
    y += yVelocity;
    if (x > edge || x < -edge) {
        xVelocity *= -1;
    }
    if (y > edge || y < -edge) {
        yVelocity *= -1;
    }
    let gif = document.getElementById("gif");
    gif.style.transform = 
        `translate(${x}px, ${y}px)`;
}