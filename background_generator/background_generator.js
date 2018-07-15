const body = document.querySelector('body');
const heading = document.querySelector("h3");
const generateGradient = document.querySelector('.generate-gradient');
const [color1, color2] = document.getElementsByClassName('color');

function setGradient() {
    body.style.background = `linear-gradient(to right, ${color1.value}, ${color2.value}`;
    displayBackgroundCSS();
};

function displayBackgroundCSS() {
    heading.textContent = `${body.style.background};`;
    heading.className = 'visible';
}

function generateRandomHexColor() {
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  let randomColor = '';

  while (randomColor.length < 6) {
      randomColor += data[Math.floor(Math.random() * 16)];
  }
  return `#${randomColor}`;
}

function setRandomGradient() {
    const firstRandomColor = generateRandomHexColor();
    const secondRandomColor = generateRandomHexColor();

    body.style.background = `linear-gradient(to right, ${firstRandomColor}, ${secondRandomColor}`;
    color1.value = firstRandomColor;
    color2.value = secondRandomColor; 
    
    displayBackgroundCSS();
}

color1.addEventListener('input', setGradient);
color2.addEventListener('input', setGradient);
generateGradient.addEventListener('click', setRandomGradient);
