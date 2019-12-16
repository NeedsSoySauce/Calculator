function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function isEquationValid(equation) {
    let lastElement = equation[equation.length - 1];
    if (lastElement in operator) {
        return false;
    }
    return true;
}

function parseEquation(equation) {
    let parsed = equation.map(value => {
        if (!isNaN(value)) {
            return Number.parseFloat(value);
        }
        return value;
    })
    return parsed;
}

function evalulateEquation(equation) {
    let temp = [...equation];

    order.forEach(symbols => {

        let i = 1;
        while (i < temp.length) {
            let symbol = temp[i];
            let a = temp[i - 1];
            let b = temp[i + 1];

            if (symbols.includes(symbol)) {
                let value = operator[symbol](a, b);
                console.log("i", i);
                console.log("L", ...temp.slice(0, i - 1));
                console.log("R", ...temp.slice(i + 2));
                temp = [...temp.slice(0, i - 1), value, ...temp.slice(i + 2)];
                continue;
            }
            i++;
        }

    })

    return temp[0];

}

const equationDisplay = document.querySelector(".equation-display");
const resultDisplay = document.querySelector(".result-display");

// Calculator buttons
const clearButton = document.querySelector(".clear");

const sevenButton = document.querySelector(".seven");
const eightButton = document.querySelector(".eight");
const nineButton = document.querySelector(".nine");
const addButton = document.querySelector(".add");

const fourButton = document.querySelector(".four");
const fiveButton = document.querySelector(".five");
const sixButton = document.querySelector(".six");
const subtractButton = document.querySelector(".subtract");

const oneButton = document.querySelector(".one");
const twoButton = document.querySelector(".two");
const threeButton = document.querySelector(".three");
const multiplyButton = document.querySelector(".multiply");

const pointButton = document.querySelector(".point");
const zeroButton = document.querySelector(".zero");
const equalsButton = document.querySelector(".equals");
const divideButton = document.querySelector(".divide");

const numberButtons = [
    zeroButton, oneButton, twoButton, threeButton,
    fourButton, fiveButton, sixButton, sevenButton,
    eightButton, nineButton
]

const operatorButtons = [
    addButton, subtractButton, multiplyButton, divideButton
]

const order = [["*", "/"], ["+", "-"]];

const operator = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide
}

let equation = [];
let result = 0;
let resultCalculated = false;

const buttonContainer = document.querySelector(".button-container");
buttonContainer.addEventListener("click", ({ target }) => {
    let char = target.innerText;
    let lastElement = equation[equation.length - 1];

    if (target === clearButton) {
        equation = []
        result = 0;
        resultCalculated = false;

    } else if (target === equalsButton) {
        if (isEquationValid(equation)) {
            if (resultCalculated) {
                // Repeat the last operation on the current result
                equation = [result, ...equation.slice(equation.length - 3, equation.length - 1)]
            }
            result = evalulateEquation(parseEquation(equation));
            equation.push(char)
            resultCalculated = true;
        }

    } else if (target === pointButton) {
        // We don't add a point if the last element ends in a point
        if (isNaN(lastElement)) {
            equation.push("0" + char);
        } else if (lastElement.charAt(lastElement.length - 1) !== char) {
            equation[equation.length - 1] += char;
        }

    } else if (numberButtons.includes(target)) {
        if (resultCalculated) {
            // If the result of a calculation is currently being stored
            // start a new equation
            equation = [char];
            resultCalculated = false;
        } else if (!isNaN(lastElement)) {
            // If a number was pressed and the last element was a number
            // append this number to it
            equation[equation.length - 1] += char;
        } else {
            equation.push(char);
        }

    } else if (operatorButtons.includes(target)) {
        if (lastElement in operator) {
            // If an operator was pressed and the last element was an operator
            // replace the last operator
            equation[equation.length - 1] = char;
        } else if (equation.length === 0) {
            // If this operator is the first element being added, append a "0" before it
            equation.push("0", char);
        } else if (resultCalculated) {
            // If the result of a calculation is currently being stored
            // start a new equation with the result as the first operand
            equation = [result, char];
            resultCalculated = false;
        } else {
            equation.push(char)
        }

    } else {
        console.log("Unhandled button: ", target);
    }

    if (equation.length !== 0) {
        equationDisplay.innerText = equation.join(" ");
    } else {
        equationDisplay.innerText = "";
    }

    resultDisplay.innerText = "" + result;

})