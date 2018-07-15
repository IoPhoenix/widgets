const body = document.querySelector('body');
const heading = document.querySelector("h3");
const [color1, color2] = document.getElementsByClassName('color');

function setGradient() {
    body.style.background = `linear-gradient(to right, ${color1.value}, ${color2.value}`;

    heading.textContent = `${body.style.background};`;
    heading.className = 'visible';
};

color1.addEventListener('input', setGradient);
color2.addEventListener('input', setGradient);

// BONUS: Add a random button which generates two random numbers for the colour inputs