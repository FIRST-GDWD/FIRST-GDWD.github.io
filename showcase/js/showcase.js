// showcaseURLs is defined in other js files

const gallery = document.getElementById("gallery");
const backWall = document.getElementById("backWall");
const leftWall = document.getElementById("leftWall");
const rightWall = document.getElementById("rightWall");
const ceiling = document.getElementById("ceiling");
const floor = document.getElementById("floor");
const showcaseArea = document.getElementById("showcaseArea");
//const tempElement = document.createElement('div');

let maxWidth = 600;
let position = 0;

if (showcaseURLs.length > 2) {
    maxWidth = (showcaseURLs.length*showcaseWidth);
    showcaseArea.style.width = maxWidth + "px";
    backWall.style.width = maxWidth + "px";
    ceiling.style.width = maxWidth + "px";
    floor.style.width = maxWidth + "px";
    leftWall.style.transform = `rotateY(90deg) translateZ(${maxWidth-300}px)`;

}

for (let showcaseURL of showcaseURLs) {
    generateAndAddShowcase(showcaseURL);
}

function generateAndAddShowcase(url) {
    let template = document.createElement('template');
    let showcaseHTML = `
        <div class="showcase">
            <a 
                href="${url}" 
                target="_blank"
            >
                <div class="showcaseFrame">
                    <div class="showcasePreview">
                        <iframe 
                            src="${url}" 
                            scrolling="no"></iframe>
                    </div>
                </div>
            </a>
            <div class="caption">
                <a href="${url}" target="_blank">
                    ${labelText}
                </a>
            </div>
        </div>
    `;
    template.innerHTML = showcaseHTML.trim();

    showcaseArea.appendChild(template.content.firstChild);
}

let xPercent = 0.5;
let xVel = 0;
let speed = 25;
document.addEventListener("mousemove", e => {
    xPercent = (e.clientX / window.innerWidth);
    if (Math.abs(xPercent-0.5) > 0.16) {
        if (xPercent > 0.5) {
            xVel = (xPercent-0.34 - 0.33) * speed;
        } else {
            xVel = (xPercent-0.34) * speed;
        }
    } else {
        xVel = 0;
    }
});

function moveViewerBasedOnMouse() {
    if (gallery && maxWidth > 600) {

        position += xVel;

        if (position < 0) {
            position = 0;
        } else if (position > maxWidth - 450) {
            position = maxWidth - 450;
        }
        gallery.style.transform = `translateZ(450px) translateY(-0px) translateX(-${position}px)`
    }
}

setInterval(moveViewerBasedOnMouse, 15);