// How to create a snake cursor

// This code creates our followers
const max = 100;
for (let i = 0; i < max; i++) {
    //body.innerHTML += "<h2>Heading " + (i + 1) + "</h2>";
    body.innerHTML += "<div class='follower'></div>";
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

// storePosition(50, 100);
// storePosition(150, 23);
// storePosition(345, 25);
// storePosition(475, 33);
// console.log(positions);

// This function returns the position matching
// the input index 'i'; however, if we
// don't have a position for 'i',
// then that would throw an exception (error).
// So we have to account for it that happens,
// and prevent it.
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
    }
}
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