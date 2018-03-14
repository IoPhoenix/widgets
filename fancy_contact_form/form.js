const form = document.getElementsByTagName('form')[0],
    inputs = [nameInput, emailInput, messageInput] = document.querySelectorAll('.form-field input, .form-field textarea'),
    errors = [nameError, emailError, messageError] = document.getElementsByClassName('error');


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

        const nameRegex = new RegExp(/^(\w{1,20}[\s\-]{0,1}\w{0,20})\s*(\w{0,20}[\s\-']{0,1}\w{0,20})$/, 'gi');
        if (nameRegex.test(nameInput.value) === false) {
            nameError.className = "error active";
            nameError.innerHTML = "Please provide correct name";
        }

        // show error message if email is incorrect
        if (!emailInput.validity.valid) {
            emailError.className = "error active";
            emailError.innerHTML = "Please provide correct email";
        }

        // show error message if any field was left empty
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


// check input fields for validity
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // if there are empty fields left or if there are any active errors,
    // show error message
    const atLeastOneInputEmpty = [...inputs].some(i => i.value === '');
    const atLeastOneErrorPresent = document.querySelector('.active');

    if (atLeastOneInputEmpty || atLeastOneErrorPresent) {
        console.log('Form is not validated!');
        return;
    }

    console.log('Form is validated!');
});