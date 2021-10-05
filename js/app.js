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

        console.log(calculationObj.calcArr);
    },

    sendToConsole: () => {
        calculationObj.resolve(calculationObj.calcString);
        console.log(calculationObj.calcArr + ", or String: " + calculationObj.calcString + ", Total: " + calculationObj.ongoingTotal);
    },

    resolve: (expression) => {
        calculationObj.ongoingTotal = calculationObj.resolveAddition(expression);
        // calculationObj.resolveMultiplication();
        // calculationObj.resolveSubtraction();
        // calculationObj.resolveDivision();
    },

    resolveAddition: (expression) => {
        let stringArr = expression.split('+');

        let numberArr = stringArr.map(x => calculationObj.resolveMultiplication(x));

        const initialValue = 0.0;

        let resolvedResult = numberArr.reduce((prev, current) => prev + current, initialValue);

        return resolvedResult;
    },

    resolveMultiplication: (expression) => {
        let stringArr = expression.split('*');

        let numberArr = stringArr.map(x => parseFloat(x));

        const initialValue = 1.0;

        let resolvedResult = numberArr.reduce((prev, current) => prev * current, initialValue);

        return resolvedResult;
    },

    resolveSubtraction: (expression) => {
        
    },

    resolveDivision: (expression) => {
        
    },

    clearLast: () => {
        
    },

    clearAll: () => {
        calculationObj.calcArr.length = 0;
        calculationObj.calcString = '';
        calculationObj.ongoingTotal = 0;
    }
}