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
let userInput = 0;

const form = document.getElementById('calculatorForm');
const input = form.elements["user-input"];
const operationButtons = document.querySelectorAll('.operation');
const actionButtons = document.querySelectorAll('.action');


// Event Listeners
// =====================================================
operationButtons.forEach(button => {
    button.addEventListener('click', updateOperation);
});


// Functions
// =====================================================
function updateOperation() {
    console.log('From updateOperation, this: ', this);
    operation = this.getAttribute('data-operation');
}

function resetForm() {
    form.reset();
}

function addFloatingPoint() {

}

function calculateResult() {

}