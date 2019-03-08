const projectItems = document.querySelectorAll('.nav-menu__item');
const projectImages = document.querySelectorAll('.nav-text__item');
const tagline = document.querySelector('.nav-text__tagline');


document.addEventListener('DOMContentLoaded', function() {
    projectImages.forEach(item => {
        item.classList.add('nav-text__item--hide')
    });

    projectItems.forEach(item => {
        console.log('item is: ', item);
        item.addEventListener('mouseover', showImage);
    });
});


function showImage() {
    tagline.classList.add('hide');
    
    const projectNum = +(this.getAttribute('data-name').slice(-1));

    projectImages[projectNum].classList.add('hide');
}