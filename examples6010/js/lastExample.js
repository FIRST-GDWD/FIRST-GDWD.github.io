const flexbox2 = document.getElementById("flexbox2");
const flexbox3 = document.getElementById("flexbox3");
const grid = document.getElementById("grid");
const heroLink = document.getElementById("heroLink");
const flexboxGridLink =
    document.getElementById("flexboxGridLink");
const gridLink = document.getElementById("gridLink");

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
heroLink.onclick = showHero;

function showFlexboxGrid() {
    hideAll();
    flexbox3.style.display = "";
}
flexboxGridLink.onclick = showFlexboxGrid;

function showGrid() {
    hideAll();
    grid.style.display = "";
}
gridLink.onclick = showGrid;