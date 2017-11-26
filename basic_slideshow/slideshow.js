const slides = document.querySelectorAll('.slide'),
    pauseButton = document.getElementById('pause'),
    next = document.getElementById('next');
    previous = document.getElementById('previous');
let slideInterval = setInterval(showNextSlide, 3000),
    currentSlide = 0,
    isPlaying = true;

// show controls if javascript is available:
const controls = document.getElementById('controls');
controls.style.display = 'inline-block';

// show images as slideshow if javascript is available:
slides.forEach(s => s.style.position = 'fixed');

function pauseSlideshow() {
    pauseButton.innerHTML = '&#9658;';
    isPlaying = false;
    clearInterval(slideInterval);
}

function playSlideshow() {
    pauseButton.innerHTML = '&#10074;&#10074;';
    isPlaying = true;
    slideInterval = setInterval(showNextSlide, 3000);
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

pauseButton.addEventListener('click', function() {
    if (isPlaying) {
        pauseSlideshow();
  } else {
        playSlideshow();
  }
});

next.addEventListener('click', function() {
    pauseSlideshow();
    showNextSlide();
});

previous.addEventListener('click', function() {
    pauseSlideshow();
    showPreviousSlide();
});

function showSlide(slideNum) {
    slides[currentSlide].className = 'slide';
    // calcualte the current slide index: 6%5=1, 7%5=2, 8%5=3, 9%5=4, and 10%5=0
    currentSlide = (slides.length + slideNum) % slides.length;
    slides[currentSlide].className += ' active';
}