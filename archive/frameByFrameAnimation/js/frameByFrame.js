let frames = [
    "assets/images/Asset19.png",
    "assets/images/Asset20.png",
    "assets/images/Asset21.png",
    "assets/images/Asset22.png",
    "assets/images/Asset23.png",
    "assets/images/Asset24.png",
    "assets/images/Asset25.png",
    "assets/images/Asset26.png",
    "assets/images/Asset27.png"
];

const heart = document.getElementById("heart");

let frameIndex = 0;
function animate() {
    heart.src = frames[frameIndex];
    frameIndex++;
    if (frameIndex > frames.length - 1) {
        frameIndex = 0;
    }
}

setInterval(animate, 100);