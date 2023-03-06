// How to create a snake cursor

// This variable contains the number of
// 'follower' nodes we want on our "snake"
const max = 255;

// This code creates our followers
for (let i = 0; i < max; i++) {
    document.body.innerHTML += "<div class='follower'></div>";
}

// This code stores the positions 
// we want the followers to be at.
// However, we don't want to continually store
// them forever, so we pop off the oldest one
// if it gets too long
let positions = [];
function storePosition(x, y) {
    positions.unshift([x, y]);
    if (positions.length > max) {
        positions.pop();
    }
}

// Testing out storePosition
// storePosition(50, 100);
// storePosition(150, 23);
// storePosition(345, 25);
// storePosition(475, 33);
// console.log(positions);

function getPosition(i) {
    let adjustedIndex = i;
    const maxIndex = positions.length - 1;
    if (i > maxIndex) {
        adjustedIndex = maxIndex;
    }
    return positions[adjustedIndex];
}

// This function gets all the elements with the 'follower' class.
// Then it uses a for loop to 'iterate' through all of them,
// one at a time, and positions them based on their matching position
// via the counting variable i (which we use as an index)
function placeFollowers() {
    const followers = document.getElementsByClassName("follower");
    for (let i = 0; i < followers.length; i++) {
        let follower = followers[i];
        let position = getPosition(i);
        follower.style.left = position[0] + "px"; //position[0] is the x value
        follower.style.top = position[1] + "px"; //position[1] is the y value

        // BONUS: OPTIONAL COLOR CHANGES
        // Version 1: using the CSS filter Property
        // - works well as long as max is under 100 or so
        // follower.style.filter = "hue-rotate(" + i + "deg)";

        // Version 2: manually modifying the background's
        // radial gradient, using the string formatting 
        // syntax with backquotes (`)
        // - works well with any size
        follower.style.background = 
            `radial-gradient(rgb(${i},150,${255-i}), rgba(255,255,255,0) 50%)`;
    }
}

// Testing out placeFollowers()
// (requires multiple executions of storePosition() 
// to run first)
// placeFollowers();

// In our event listener, we record the
// current position of the mouse, and
// then update the positions of the followers
document.addEventListener("mousemove", function(e) {
    let x = e.pageX - 25;
    let y = e.pageY - 25;
    storePosition(x, y);
    placeFollowers();
});