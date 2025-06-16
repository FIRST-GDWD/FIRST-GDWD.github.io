const showcaseURLs = [
    "https://sammiballs.github.io/projects/alley-posters/",
    "https://quisdofeles.github.io/projects/alley-posters/",
    "http://liliannaboyer.github.io/projects/studio-gallery-v2/",
    "https://evaortiz71.github.io/projects/studio-gallery-v2/",
    "https://antionejh.github.io/2025/projects/studio-gallery-v2/",
    "https://shamariaking7.github.io/projects/studio-gallery-v2/",
    "https://saga-laha.github.io/projects/studio-gallery-v2/",
    "https://aaroncortez764.github.io/aaroncortez769.github.io/projects/studio-gallery-v2/",
    "https://tatyanna-first.github.io/exercicses/alley-posters-v2/",
    "https://moonstar25.github.io/projects/box-farming/",
    "https://dstyen.github.io/projects/studio-gallery-v2/",
    "https://deontwitty.github.io/projects/studio-gallery-v2/index.html",
    "https://sheilawilliamson37.github.io/sheilawilliamson37.github.io-skeleton-code-/projects/studio-gallery-v2/",
    "https://mzuroff.github.io/projects/studio-gallery-v2/"
];
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
    maxWidth = (showcaseURLs.length*425);
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
                    Visit Showcase Webpage
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