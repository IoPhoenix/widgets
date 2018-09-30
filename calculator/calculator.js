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