const flexbox2 = document.getElementById("flexbox2");
const flexbox3 = document.getElementById("flexbox3");
const grid = document.getElementById("grid");

function hideAll() {
    flexbox2.style.display = "none";
    flexbox3.style.display = "none";
    grid.style.display = "none";
}
hideAll();

function showHero() {
    hideAll();
    flexbox2.style.display = "";
}
function showFlexboxGrid() {
    hideAll();
    flexbox3.style.display = "";
}
function showGrid() {
    hideAll();
    grid.style.display = "";
}

const heroLink = document.getElementById("heroLink");
heroLink.onclick = showHero;
const flexboxGridLink = document.getElementById("flexboxGridLink");
flexboxGridLink.onclick = showFlexboxGrid;
const gridLink = document.getElementById("gridLink");
gridLink.onclick = showGrid;