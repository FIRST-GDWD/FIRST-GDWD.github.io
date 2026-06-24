let lightboxContainer = document.getElementById('lightboxContainer');
let lightbox = document.getElementById('lightbox');

let images = document.querySelectorAll('.centered img');
for (let img of images) {
    img.addEventListener('click', () => {
        lightboxContainer.classList.add('display');
        lightbox.src = img.src;
        lightbox.alt = img.alt;
    });
    img.setAttribute('title', 'Click to open in larger view!');
}

let closers = document.querySelectorAll('.closer');
for (let closer of closers) {
    closer.addEventListener('click', () => {
        lightboxContainer.classList.remove('display');
        lightbox.src = '';
        lightbox.alt = '';
    });
}