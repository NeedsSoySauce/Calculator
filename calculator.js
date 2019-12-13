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

const inputDisplay = document.querySelector(".input-display");
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

let equation = [];

const buttonContainer = document.querySelector(".button-container");
buttonContainer.addEventListener("click", ({ target }) => {
    let char = target.innerText;

    if (target === clearButton) {
        equation = []

    } else if (target === equalsButton) {
        console.log("Calculate")

    } else if (target === pointButton) {
        let lastElement = equation[equation.length - 1];

        // We don't add a point if the last element ends in a point
        if (isNaN(lastElement)) {
            equation.push("0" + char);
        } else if (lastElement.charAt(lastElement.length - 1) !== char) {
            equation[equation.length - 1] += char;
        }

    } else if (numberButtons.includes(target) && !isNaN(equation[equation.length - 1])) {
        equation[equation.length - 1] += char;

    } else {
        equation.push(char)
    }
})