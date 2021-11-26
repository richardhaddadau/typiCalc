/* 

    Project: TypiCalc
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
        // Process 4: Split by Multiplication   [(14 + 3)], [5, 3], [16], [2], [5]
        // Process 5: Split by Parentheses      []

        calculationObj.ongoingTotal = calculationObj.resolveAddition(expression);
    },

    resolveParentheses: (expression, operator) => {
        // Set required required:
        // Parentheses Array to produce a new array for parsing
        // Parentheses Expression to store ongoing expression
        // Parentheses Tracker to check if we're in a parentheses block
        let prthsTracker = 0;
        let prthsExpression = '';
        let prthsArr = [];

        // Loop through the main expression passed in
        for (let count = 0; count < expression.length; count++) {

            // Track Parentheses
            // Originally I used a boolean value for Parentheses Tracker but this only allows for one level of parentheses
            // Using integers instead, allows for multiple levels of parentheses
            if (expression[i] == '(') {
                prthsTracker++;
            } else if (expression[i] == ')') {
                prthsTracker--;
            }

            // Check if Parentheses Tracker is back to 0 and if the current expression is the Operator we're parsing
            if (prthsTracker == 0 && expression[i] == operator) {

                // Push Parentheses Expression to the Parentheses Array
                prthsArr.push(prthsExpression);

                // Reset Parantheses Expression
                prthsExpression = '';

            } else {

                // If not, keep adding each character in the main expression to the ongoing expression
                prthsExpression += expression[i];

            }

        }

        // When we have reached the end of the expression
        // Check if there's anything in our ongoing expression
        if (prthsExpression != '') {
            
            // Add our ongoing expression to our Parentheses Array
            prthsArr.push(prthsExpression);

        }

        return prthsArr;
    },

    resolveAddition: (expression) => {
        // Create an Array by splitting the Expression using the Plus Symbol as the splitter
        // However, rather than use the JavaScript Array Split method
        // We use our own function which splits and strips from parentheses
        let stringArr = resolveParentheses(expression, '+');

        // Parse each value in our new split and stripped array
        let numberArr = stringArr.map(x => calculationObj.resolveSubtraction(x));

        // Process a Reduce method on our array adding each pair in the array
        let resolvedResult = numberArr.reduce((prev, current) => prev + current);

        // Return our resolved result
        return resolvedResult;
    },

    resolveSubtraction: (expression) => {
        // Create an Array by splitting the Expression using the Minus Symbol as the splitter
        // Using our own function which splits and strips from parentheses
        let stringArr = resolveParentheses(expression, '-');

        // Parse each value in our new split and stripped array
        let numberArr = stringArr.map(x => calculationObj.resolveDivision(x));

        // Process a Reduce method on our array subtracting each pair in the array
        let resolvedResult = numberArr.reduce((prev, current) => prev - current);

        // Return our resolved result
        return resolvedResult;
    },

    resolveDivision: (expression) => {
        // Create an Array by splitting the Expression using the Division Symbol as the splitter
        // Using our own function which splits and strips from parentheses
        let stringArr = resolveParentheses(expression, '/');

        // Parse each value in our new split and stripped array
        let numberArr = stringArr.map(x => calculationObj.resolveMultiplication(x));

        // Process a Reduce method on our array dividing each pair in the array
        let resolvedResult = numberArr.reduce((prev, current) => prev / current);

        // Return our resolved result
        return resolvedResult;
    },

    resolveMultiplication: (expression) => {
        // Create an Array by splitting the Expression using the Multiplication Symbol as the splitter
        // Using our own function which splits and strips from parentheses
        let stringArr = resolveParentheses(expression, '*');

        // Parse each value in our new split and stripped array
        let numberArr = stringArr.map(x => {

            // If current value in the array is an open parantheses
            // Strip current level parentheses and then run parsing again from Addition
            if (x[0] == '(') {

                return resolveAddition(x.subsr(1, x.length - 2));

            }
            
            return parseFloat(x);
        });

        // Process a Reduce method on our array multiplying each pair in the array
        let resolvedResult = numberArr.reduce((prev, current) => prev * current);

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

// Toggle Light/Dark Mode
const changeToDark = (option) => {
    // NEW UPDATED CODE
    // Create an Object for CSS Files
    const urlObj = {
        0: "css/light.css",
        1: "css/dark.css"
    };

    // Change the CSS link href attribute to the chosen option
    document.querySelector('#dark-mode-css').setAttribute("href", urlObj(option));

    
    // OLD ARCHIVED CODE
    // Set CSS Files to Variables
    // const lightUrl = "css/light.css";
    // const darkUrl = "css/dark.css";
    
    // Use Switch/Case to process this.
    // switch (option) {
    //     case 0:
    //         document.querySelector('#dark-mode-css').setAttribute("href", lightUrl);
    //         break;
    
    //     default:
    //         document.querySelector('#dark-mode-css').setAttribute("href", darkUrl);
    //         break;
    // }
};