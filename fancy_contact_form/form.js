const form = document.getElementsByTagName('form')[0],
    inputs = document.querySelectorAll('.form-field input, .form-field textarea'),
    errors = [ nameError, mailError, messageError] = document.getElementsByClassName('error');


Array.from(inputs).forEach(i => {
    const parent = i.parentElement;
    i.addEventListener('focus', () => parent.classList.add('active'));
    i.addEventListener('blur', () => {
        parent.classList.remove('active');

        // select error field for current inout
        const error = document.getElementById(`${i.name}-error`);

        // leave label text at the top of input if input was filled by user
        if (i.value !== '') {
            parent.classList.remove('empty');
            parent.classList.add('filled');
        } else {
            parent.classList.remove('filled');
            parent.classList.add('empty');
        }

        // show error message if field was left empty
        if (i.value === '') {
            error.innerHTML = `Please enter your ${i.name}`;
            error.className = "error active";
        }

        // remove error message if field was filled
        i.addEventListener('input', () => {
            if (i.value !== '') {
                error.innerHTML = "";
                error.classList.remove('active');
            }
        });
    });
});