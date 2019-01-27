// Source code: https://codepen.io/prampcontent/pen/jvNyKR

/* Edge cases:
  -handle multiple point signs in a single number
  -handle calculations in ()
  -handle numbers starting with -
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

        // if user is using '-' operator as minus sign
        if (!userInput.length && targetValue === '-') {
            console.log('test');
            input.val(input.val() + targetValue);
        }

        // if last char is an operator, replace it with the current input
        else if (operatorKeys.indexOf(lastChar) >= 0) {
            const newString = userInput.substring(0, userInput.length - 1) + targetValue;
            input.val(newString);
            
       
        } else if (userInput.length) {
            
            // else just add the operator pressed to the input
            input.val(input.val() + targetValue);
        }
    }
    


    function calculateResult() {
        
        let userInput = input.val();

        // is user input is empty, do not proceed
        if (!userInput.length) return;

        const lastChar = userInput[userInput.length - 1];

        // if last char entered is an operator, show error
        if (operatorKeys.indexOf(lastChar) !== -1) {
            input.val(0);
            return;
        }
        
        
        // create array of numbers, remove empty strings:
        const numbers = userInput.split(/\+|\-|\×|\÷/g).filter(Boolean);
        
        // create array of operators, e.g. ["+", "+", "-", "*", "/"]
        // first replace all the numbers and dot with empty string and then split
        const operators = userInput.replace(/[0-9]|\./g, '').split('');
        
        if (userInput[0] === '-') {
            numbers[0] = -numbers[0];
            operators.splice(0,1);
        }

        console.log('userInput: ', userInput, 'numbers: ', numbers, 'operators: ', operators);

        // is user entered only one number, no calculations are needed:
        if (numbers.length < 2) return;
        

        // loop through the operators and do one operation at a time.
        //  operations will execute according to their order in the operatorKeys array
        // by doing calculations on at a time, replace the original numbers with new resilt
        // and remove operators that have been already used.
        // the final element remaining in the array will be the output

        for (let i = 0; i < operatorKeys.length; i++) {
            
            const currentOperator = operatorKeys[i]; 
            const currentOperation = operations[currentOperator]; 
            let indexOfNextOperationToExecute = operators.indexOf(currentOperator);

            console.log('currentOperator: ', currentOperator, 'currentOperation: ', currentOperation, 'indexOfNextOperationToExecute: ', indexOfNextOperationToExecute);
            
            // while operator is present in the users input:
            while (indexOfNextOperationToExecute !== -1) {
                const nextResult = currentOperation(numbers[indexOfNextOperationToExecute], numbers[indexOfNextOperationToExecute + 1]);
                numbers.splice(indexOfNextOperationToExecute, 2, nextResult);
                console.log('numbers spliced: ', numbers);
                operators.splice(indexOfNextOperationToExecute, 1);
                console.log('operators spliced: ', operators);
                indexOfNextOperationToExecute = operators.indexOf(currentOperator);
                console.log('indexOfNextOperationToExecute next: ', indexOfNextOperationToExecute);
            }
        }
        
        input.val(numbers[0]); // show the result
        isResultDisplayed = true; 
    }
    
    function clearInput() {
        input.val('');
    }
});