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