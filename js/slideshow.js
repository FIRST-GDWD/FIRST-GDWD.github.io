let currentSlideIndex = 0;

function showSlide() {
  debugger;
  let slide1 = document.getElementById('slide1');
  let slide2 = document.getElementById('slide2');
  let slide3 = document.getElementById('slide3');
  let slide4 = document.getElementById('slide4');

  // this creates an array of <img> elements
  let slides = [slide1, slide2, slide3, slide4];

  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }

  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }

  for (let i = 0; i < slides.length; i++) {
    let loopSlide = slides[i];
    if (i != currentSlideIndex) {
      loopSlide.style.display = 'none';
    } else {
      loopSlide.style.display = 'block';
    }
  }
}

function showNextSlide() {
  currentSlideIndex += 1;
  showSlide();
}

function showPreviousSlide() {
  currentSlideIndex -= 1;
  showSlide();
}

showSlide();
