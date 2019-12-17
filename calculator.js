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
                // console.log("i", i);
                // console.log("L", ...temp.slice(0, i - 1));
                // console.log("R", ...temp.slice(i + 2));
                temp = [...temp.slice(0, i - 1), value, ...temp.slice(i + 2)];
                continue;
            }
            i++;
        }

    })

    return temp[0];

}

function updateDisplay() {
    if (equation.length !== 0) {
        equationDisplay.innerText = equation.join(" ");
    } else {
        equationDisplay.innerText = "";
    }

    resultDisplay.innerText = "" + result;
}

function handleClick(event) {

    if (result === "Undefined") {
        equation = [];
        result = 0;
        resultCalculated = false;
    }

    let { target } = event;
    let char = target.innerText;
    let lastElement = equation[equation.length - 1];

    if (target === clearButton) {
        equation = []
        result = 0;
        resultCalculated = false;

    } else if (target === clearEntryButton) {
        if (resultCalculated) {
            equation = [];
        } else {
            let lastElement = equation.pop();
            if (lastElement !== undefined && lastElement.length > 1) {
                equation.push(lastElement.slice(0, lastElement.length - 1));
            }
        }

    } else if (target === equalsButton) {

        // Remove trailing decimal points
        if (lastElement !== undefined && lastElement.charAt(lastElement.length - 1) === ".") {
            equation[equation.length - 1] = lastElement.slice(0, lastElement.length - 1);
        }

        if (equation.length === 0) {
            equation = ["0"];
        } else if (lastElement in operator) {
            // Duplicate the last operand
            let lastOperand = equation[equation.length - 2];
            equation.push(lastOperand);
        } else if (equation.join(" ").includes("0 / 0")) {
            // 0 divided by 0 is undefined
            result = "Undefined";
            return;
        } else if (resultCalculated) {
            // Repeat the last operation on the current result
            equation = [result, ...equation.slice(equation.length - 3, equation.length - 1)]
        }

        result = "" + evalulateEquation(parseEquation(equation));
        equation.push(char)
        resultCalculated = true;

    } else if (target === pointButton) {
        if (resultCalculated) {
            // Start a new equation
            equation = ["0" + char];
            resultCalculated = false;
        } else if (isNaN(lastElement)) {
            // If the last element was an operator, start a new operand
            equation.push("0" + char);
        } else if (!lastElement.includes(char)) {
            // We don't add a point if the last element already contains a point
            equation[equation.length - 1] += char;
        }

    } else if (numberButtons.includes(target)) {
        if (resultCalculated) {
            console.log("1")
            // If the result of a calculation is currently being stored
            // start a new equation
            equation = [char];
            resultCalculated = false;
        } else if (!isNaN(lastElement)) {
            console.log("2")
            // If a number was pressed and the last element was a number
            // append this number to it
            equation[equation.length - 1] += char;
        } else {
            console.log("3")
            equation.push(char);
        }

    } else if (operatorButtons.includes(target)) {
        if (equation.length === 0) {
            // If this operator is the first element being added, append a "0" before it
            equation.push("0", char);
        } else if (lastElement.charAt(lastElement.length - 1) === ".") {
            // If the last char of the last element was a decimal point, remove the decimal point
            // before pushing this operator
            equation[equation.length - 1] = lastElement.slice(0, lastElement.length - 1);
            equation.push(char);
        } else if (lastElement in operator) {
            // If an operator was pressed and the last element was an operator
            // replace the last operator
            equation[equation.length - 1] = char;
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

}

const equationDisplay = document.querySelector(".equation-display");
const resultDisplay = document.querySelector(".result-display");

// Calculator buttons
const clearButton = document.querySelector(".clear");
const clearEntryButton = document.querySelector(".clear-entry");

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
buttonContainer.addEventListener("click", event => {
    handleClick(event);
    updateDisplay();
});