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
let operationWasClicked = false;

const form = document.getElementById('calculatorForm');
const input = form.elements["user-input"];
const operationButtons = document.querySelectorAll('.operation');
const [resetBtn, floatingPointBtn, submitBtn] = document.querySelectorAll('.action');


// Event Listeners
// =====================================================
operationButtons.forEach(button => {
    button.addEventListener('click', updateOperation);
});

resetBtn.addEventListener('click', resetForm);
floatingPointBtn.addEventListener('click', addFloatingPoint);
submitBtn.addEventListener('click', calculateResult);


// Functions
// =====================================================
function updateOperation() {
    operation = this.getAttribute('data-operation');
    console.log('operation: ', operation);
    console.log('user input: ', input.value);
    console.log('operationWasClicked: ', operationWasClicked);

    if (operationWasClicked) {
        // perform relevant calulation and update result variable
        calculate(operation, +previousUserInput, +input.value);
        
        // show result to the user
        input.value = result;

        // update user input variable
        previousUserInput = result;
    } else {
        previousUserInput = input.value;
        operationWasClicked = true;
    }
    input.select();
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
    userInput = 0;
    result = 0;
    operationWasClicked = false;
}

function addFloatingPoint() {

}

function calculateResult() {
    calculate(operation, +previousUserInput, +input.value);
    input.value = result;
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