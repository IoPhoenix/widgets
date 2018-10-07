/*
    Test cases:
    -user clicks one of the operations right away
    -user enters first number, clicks operation
    -user clicks operation after result is calculated
    -user resets the form
    -user tries to devide by 0
*/

// Variables
// =====================================================
let operation = '';
let result = 0;
let previousUserInput = 0;
let operationBtnWasClicked = false;


const form = document.getElementById('calculatorForm');
const input = form.elements["user-input"];
const operationButtons = document.querySelectorAll('.operation');
const [resetBtn, floatingPointBtn, submitBtn] = document.querySelectorAll('.action');

// Event Listeners
// =====================================================

input.addEventListener('input', checkUserInput);

operationButtons.forEach(button => {
    button.addEventListener('click', updateOperation);
});

resetBtn.addEventListener('click', resetForm);
floatingPointBtn.addEventListener('click', addFloatingPoint);
submitBtn.addEventListener('click', calculateResult);


// Functions
// =====================================================
function checkUserInput() {
    const regex = new RegExp(/[\d\.]/,'g');

    // if user input is not a number or dot, remove it from the input
    if (!regex.test(this.value[this.value.length -1])) {
        this.value = this.value.slice(0, -1);
    }
}


function updateOperation() {
    if (operationBtnWasClicked) {
        console.log('operation was clicked before');

        calculateResult();

        operation = this.getAttribute('data-operation');
        console.log('operation was updated to: ', operation);
    } else {
        console.log('operation clicked for the first time');
        operation = this.getAttribute('data-operation');

        previousUserInput = input.value === '' ? 0 : input.value;
        operationBtnWasClicked = true;
        input.select();
    }
}

function calculate(operationType, num1, num2) {
    switch (operationType) {
        case 'divide':
            result = divide(num1, num2);
            break;
        case 'multiply':
            result = multiply(num1, num2);
            break;
        case 'add':
            result = add(num1, num2);
            break;
        case 'substract':
            result = substract(num1, num2);
            break;
    }
}

function resetForm() {
    form.reset();
    previousUserInput = 0;
    result = 0;
    operationBtnWasClicked = false;
}


function addFloatingPoint() {
    // 1. input is empty, add 0 and floating point
    // 2. input has numbers, add floating point after these numbers
    // 3. if floating point already in the number, do not add it again

    if (input.value.indexOf('.') > -1) {
        input.focus();
        return;
    }

    input.value = input.value === '' ? '0.' : input.value + '.';
    input.focus();
}


function calculateResult() {
    // if equal sign was clicked without providing second number, do nothing:
    if (operationBtnWasClicked === false && previousUserInput === 0) return;

    calculate(operation, +previousUserInput, +input.value);
    input.value = result;

    // store the result as the last input value 
    previousUserInput = result;
    input.select();
}

function divide(a,b) {
    if (b === 0) return;

    return a / b;
}

function multiply(a,b) {
    return a * b;
}

function add(a,b) {
    return a + b;
}

function substract(a,b) {
    return a - b;
}