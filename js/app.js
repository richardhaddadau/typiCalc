/* 

    Project: Quick Calc
    Developer: Richard Haddad

    Start Date: 04.10.2021
    Last Modified: XX.XX.2021

    File Purpose: Main JavaScript file

*/

let calculationObj = {
    calcArr: [],

    calcString: '',

    ongoingTotal: 0,

    availableActions: {
        percent: 'percent',
        divide: '/',
        times: '*',
        minus: '-',
        plus: '+'
    },

    addNumber: (num) => {
        if ( isNaN(calculationObj.calcArr[calculationObj.calcArr.length - 1]) && (calculationObj.calcArr[calculationObj.calcArr.length - 1] !== '') ) {
            calculationObj.calcArr.push(parseFloat(num));
        } else {
            tempString = String(calculationObj.calcArr[calculationObj.calcArr.length - 1]);
            tempString += num;

            calculationObj.calcArr[calculationObj.calcArr.length - 1] = parseFloat(tempString);
        }

        calculationObj.calcString += num;
        
        calculationObj.sendToConsole();
    },

    addParenthesis: () => {
        
    },

    addAction: (action) => {
        if (calculationObj.availableActions.hasOwnProperty(action)) {
            if ( calculationObj.availableActions.hasOwnProperty(calculationObj.calcArr[calculationObj.calcArr.length - 1]) ) {
                calculationObj.calcArr.pop();
                calculationObj.calcString.substring(0, calculationObj.calcString.length -1);
            }

            calculationObj.calcArr.push(action);
            calculationObj.calcString += calculationObj.availableActions[action];
        }
        
        calculationObj.sendToConsole();
    },

    switchSign: () => {
        calculationObj.calcArr[calculationObj.calcArr.length - 1] = calculationObj.calcArr[calculationObj.calcArr.length - 1] * (-1);
        calculationObj.calcString += calculationObj.calcArr[calculationObj.calcArr.length - 1];
        console.log(calculationObj.calcArr);

        calculationObj.sendToConsole();
    },

    sendToConsole: () => {
        calculationObj.resolve(calculationObj.calcString);

        console.log('Here: ' + calculationObj.calcString);

        console.log(calculationObj.calcArr + ", or String: " + calculationObj.calcString + ", Total: " + calculationObj.ongoingTotal);
    },

    resolve: (expression) => {
        // To resolve our expression, we will parse through 5 different processes
        // Let's take as an example: (14 + 4) - 5 * 3 + 16 / 2 - 5
        // Following in reverse Order of Operations: PEMDAS (Parentheses, Exponents, Multiplication, Division, Addition, Subtraction)
        // Process 1: Split by Addition         [(14 + 4) - 5 * 3, 16 / 2 - 5]
        // Process 2: Split by Subtraction      [(14 + 4), 5 * 3], [16 / 2, 5]
        // Process 3: Split by Division         [(14 + 4)], [5 * 3], [16, 2], [5]
        // Process 4: Split by Multiplication   [14, 3], [16], [2], [5]
        // Process 5: Split by Parentheses      []

        calculationObj.ongoingTotal = calculationObj.resolveAddition(expression);
    },

    resolveAddition: (expression) => {
        // Create an Array by splitting the Expression using the Plus Symbol as the splitter
        let stringArr = expression.split('+');

        let numberArr = stringArr.map(x => calculationObj.resolveSubtraction(x));

        // Set an Initial Value of 0 for the Reduce Method
        const initialValue = 0.0;

        // Process a Reduce method on our array adding each pair in the array
        let resolvedResult = numberArr.reduce((prev, current) => prev + current, initialValue);

        // Return our resolved result
        return resolvedResult;
    },

    resolveSubtraction: (expression) => {
        // Create an Array by splitting the Expression using the Minus Symbol as the splitter
        let stringArr = expression.split('-');

        let numberArr = stringArr.map(x => calculationObj.resolveDivision(x));

        // Process a Reduce method on our array subtracting each pair in the array
        let resolvedResult = numberArr.reduce((prev, current) => prev - current);

        // Return our resolved result
        return resolvedResult;
    },

    resolveDivision: (expression) => {
        // Create an Array by splitting the Expression using the Division Symbol as the splitter
        let stringArr = expression.split('/');

        let numberArr = stringArr.map(x => calculationObj.resolveMultiplication(x));

        // Process a Reduce method on our array dividing each pair in the array
        let resolvedResult = numberArr.reduce((prev, current) => prev / current);

        // Return our resolved result
        return resolvedResult;
    },

    resolveMultiplication: (expression) => {
        // Create an Array by splitting the Expression using the Multiplication Symbol as the splitter
        let stringArr = expression.split('*');

        let numberArr = stringArr.map(x => parseFloat(x));

        // Set an Initial Value of 1 for the Reduce Method
        const initialValue = 1.0;

        // Process a Reduce method on our array multiplying each pair in the array
        let resolvedResult = numberArr.reduce((prev, current) => prev * current, initialValue);

        // Return our resolved result
        return resolvedResult;
    },

    clearLast: () => {
        
    },

    clearAll: () => {
        calculationObj.calcArr.length = 0;
        calculationObj.calcString = '';
        calculationObj.ongoingTotal = 0;
    }
};

const changeToDark = (option) => {
    lightUrl = "css/light.css";
    darkUrl = "css/dark.css";

    switch (option) {
        case 0:
            document.querySelector('#dark-mode-css').setAttribute("href", lightUrl);
            break;
    
        default:
            document.querySelector('#dark-mode-css').setAttribute("href", darkUrl);
            break;
    }
};