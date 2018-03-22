const letters = document.querySelectorAll('dt');

window.onscroll = () => {
    letters.forEach(letter => {
        if (letter.getBoundingClientRect().top === -1) {
            letter.className = 'is-sticky';
        } else {
            letter.className = '';
        }
    });
}
