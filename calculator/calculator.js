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
    const regex = new RegExp(/\D+/,'g');

    // if user input is not a number, remove it from the input field:
    if (regex.test(this.value)) {
        this.value = this.value.slice(0, -1);
    }
}
function updateOperation() {

    if (operationBtnWasClicked) {
        // perform relevant calulation and update result variable
        calculate(operation, +previousUserInput, +input.value);
        
        // show result to the user
        input.value = result;
    
        // update user input variable
        previousUserInput = result;

        operation = this.getAttribute('data-operation');
       
        input.select();
    } else {
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
    if (input.value === '') input.value = '0.';
    input.focus();
}

function calculateResult() {
    calculate(operation, +previousUserInput, +input.value);
    input.value = result;

    // store the result as the last input value 
    previousUserInput = result;
    input.select();
    operationBtnWasClicked = false;
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