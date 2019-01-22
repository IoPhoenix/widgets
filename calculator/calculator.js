// Source code: https://codepen.io/prampcontent/pen/jvNyKR

/* Edge cases:
  -handle multiple point signs in a single number
  -handle incorrect numbers
*/

// Variables
// =====================================================
$(function() {

    const input = $('#user-input');
    const operators =$('.operators div');
    const numbers = $('.numbers div:not(.clear-result)'); 
    const clearInputBtn = $('.clear-result');
    const calculateResultBtn = $('.calculate-result');
    let isResultDisplayed = false; // track the result on the screen
    
    const operations = {
        '÷': (a,b) => a / b,
        '×': (a,b) => a * b,
        '-': (a,b) => a - b,
        '+': (a,b) => parseFloat(a) + parseFloat(b)
    }
    
    const operatorKeys = Object.keys(operations);
    
    
    
    // Event Listeners
    // =====================================================
    
    numbers.on('click', handleNumberClick);
    operators.on('click', handleOperatorClick);
    calculateResultBtn.on('click', calculateResult);
    clearInputBtn.on('click', clearInput);
    
    
    // Functions
    // =====================================================
    
    function handleNumberClick(e) {
        console.log('Number is clicked! Number is ', $(e.target).text());

        // select last char in the input string:
        const userInput = input.val();
        const lastChar = userInput[userInput.length - 1];
        const targetValue = $(e.target).text();

        //  if result is not yet diplayed, add input to current input value
        if (!isResultDisplayed) {

            // do not allow multiple points in a row
            if (targetValue === '.' && lastChar === '.') {
                return;
            } else {
                input.val(input.val() + targetValue);
            }

        } else if (isResultDisplayed) {

            // if result is displayed, replace it with new value
            isResultDisplayed = false;
            input.val(targetValue);
        }
    }
    
    
    function handleOperatorClick(e) {
        console.log('Operator  is clicked! Operator is ', $(e.target).text());
        
        // select the last char
        const userInput = input.val();
        const lastChar = userInput[userInput.length - 1];
        const targetValue = $(e.target).text();

        // if last char is an operator, replace it with the current input
        if (operatorKeys.indexOf(lastChar) >= 0) {
            const newString = userInput.substring(0, userInput.length - 1) + targetValue;
            input.val(newString);
            
        // if this isn't the first key pressed
        } else if (userInput.length) {
            
            // else just add the operator pressed to the input
            input.val(input.val() + targetValue);
        }
    }
    


    function calculateResult() {
        
        const userInput = input.val();
        console.log('userInput: ', userInput);
        
        if (!userInput.length) return;
        
        // create array of numbers, remove empty strings:
        const numbers = userInput.split(/\+|\-|\×|\÷/g).filter(Boolean);
        console.log('numbers: ', numbers);
        
        // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
        // first we replace all the numbers and dot with empty string and then split
        const operators = userInput.replace(/[0-9]|\./g, '').split('');
        console.log('operators: ', operators);
        
        // is user entered only one number, no calculations are needed:
        if (numbers.length < 2) return;
        
        
        // loop through the numbers and do one operation at a time.
        //  operations will execute according to their order in the operatorKeys array
        // as we move change the original numbers and operators array
        // the final element remaining in the array will be the output

        for (let i = 0; i < operatorKeys.length; i++) {
            
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
        
        input.val(numbers[0]); // show the result
        isResultDisplayed = true; 
    }
    
    function clearInput() {
        input.val('');
    }
});