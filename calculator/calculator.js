// Source: https://codepen.io/prampcontent/pen/jvNyKR

// Variables
// =====================================================

const input = document.getElementById('user-input');
const operators = document.querySelectorAll('operators div');
const numbers = document.querySelectorAll('.numbers div:not(.action)'); 
const [clearInputBtn, calculateResultBtn] = document.querySelectorAll('.action');
let isResultDisplayed = false; // to track the result on the screen

const operations = {
   '÷': (a,b) => a / b,
   '×': (a,b) => a * b,
   '-': (a,b) => a - b,
   '+': (a,b) => parseFloat(a) + parseFloat(b)
}

const operatorKeys = Object.keys(operations);



// Event Listeners
// =====================================================

numbers.forEach(number => number.addEventListener('click', handleNumberClick));
operators.forEach(operator => operator.addEventListener('click', handleOperatorClick));
calculateResultBtn.addEventListener('click', calculateResult);
clearInputBtn.addEventListener('click', clearInput);



// Functions
// =====================================================

function handleNumberClick(e) {
    console.log('Number is clicked!');
    console.log('e.target.innerHTML: ', e.target.innerHTML);

    // select last char in the input string:
    const currentInput = input.innerHTML;
    const lastChar = currentInput[currentInput.length - 1];

    //  if result is not yet diplayed, add input
     if (isResultDisplayed === false) {
        input.innerHTML += e.target.innerHTML;

     // if result is currently displayed and user pressed an operator
    } else if (isResultDisplayed && operatorKeys.indexOf(lastChar) >= 0) {

         // we need to keep on adding to the string for next operation
         isResultDisplayed = false;
        input.innerHTML += e.target.innerHTML;

    // if result is displayed and user pressed a number
    } else {
    
        // clear the input string, add new input to start the new operation
        isResultDisplayed = false;
        input.innerHTML = e.target.innerHTML;
    }
}
     

function handleOperatorClick(e) {

     // select the last char
     var currentString = input.innerHTML;
     var lastChar = currentString[currentString.length - 1];

    // if last char is an operator, replace it with the currently pressed one
    if (operatorKeys.indexOf(lastChar) >= 0) {
        var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
        input.innerHTML = newString;
    
    // if this isn't the first key pressed
    } else if (currentString.length !== 0) {
    
        // else just add the operator pressed to the input
        input.innerHTML += e.target.innerHTML;
    }
}

function calculateResult() {

  var inputString = input.innerHTML;
  console.log('inputString: ', inputString);

  if (!inputString.length) return;

  // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
  var numbers = inputString.split(/\+|\-|\×|\÷/g);
  console.log('numbers: ', numbers);

  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // first we replace all the numbers and dot with empty string and then split
  var operators = inputString.replace(/[0-9]|\./g, "").split("");
    console.log('operators: ', operators);


  // now we are looping through the array and doing one operation at a time.
  // the operations will execute according to their order in the operatorKeys array
  // as we move we are alterning the original numbers and operators array
  // the final element remaining in the array will be the output
  var operatorKeys = Object.keys(operations);

  for (var i = 0; i < operatorKeys.length; i++) {

    var currentOperator = operatorKeys[i];
    var currentOperation = operations[currentOperator];
    var nextOperationToExecute = operators.indexOf(currentOperator);

    while (nextOperationToExecute !== -1) {
      var nextResult = currentOperation(numbers[nextOperationToExecute], numbers[nextOperationToExecute + 1]);
      numbers.splice(nextOperationToExecute, 2, nextResult);
      operators.splice(nextOperationToExecute, 1);
      var nextOperationToExecute = operators.indexOf(currentOperator);
    }
  }
    
  input.innerHTML = numbers[0]; // display the output
  isResultDisplayed = true; 
}

function clearInput() {
    input.innerHTML = '';
}