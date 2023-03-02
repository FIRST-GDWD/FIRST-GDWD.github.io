const navButton = document.getElementById("nav-button");
const navArrow = document.getElementById("arrow");
const dropdown = document.getElementById("dropdown");
const page = document.getElementById("page");

navButton.addEventListener('click', function (e) {
    toggleDropdown();
});

  function toggleDropdown() {
    dropdown.classList.toggle('reveal');
    navArrow.classList.toggle('arrow-flip');
}

page.addEventListener('click', function (e) {
    if(dropdown.classList.contains('reveal')) {
        toggleDropdown();
    }
});

let positionsX = [];
let positionsY = [];
//const follower = document.getElementById("follower");
let followers = document.getElementsByClassName("follower");
document.addEventListener('mousemove', function (e) {
    
    let x = e.pageX - 25;
    let y = e.pageY - 25;
    if (positionsX.length > followers.length) {

        positionsX.pop();
        positionsY.pop();
    }
    positionsX.unshift(x);
    positionsY.unshift(y);

    let lastX = 0;
    let lastY = 0;
    for (let i = 0; i < followers.length; i++) {
        let follower = followers[i];
        if (i < positionsX.length) {
            lastX = positionsX[i];
            lastY = positionsY[i];
        }
        follower.style.top = lastY + "px";
        follower.style.left = lastX + "px";
    }
    
});