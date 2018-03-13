let inputs = document.querySelectorAll('.form-field input, .form-field textarea');

Array.from(inputs).forEach(i => {
    const parent = i.parentElement;
    i.addEventListener('focus', () => parent.classList.add('active'));
    i.addEventListener('blur', () => {
        parent.classList.remove('active');

        // leave label text at the top of input if input was filled by user
        if (i.value !== '') {
            parent.classList.remove('no-text');
            parent.classList.add('has-text');
        } else {
            parent.classList.remove('has-text');
            parent.classList.add('no-text');
        }
    });
});