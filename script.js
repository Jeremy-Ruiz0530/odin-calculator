let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetScreen = false;

const display = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const decimalButton = document.getElementById("decimal");

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? null : a / b; }

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        default: return null;
    }
}

function appendNumber(number) {
    if (display.textContent === "0" || shouldResetScreen) {
        display.textContent = number;
        shouldResetScreen = false;
    } else {
        display.textContent += number;
    }
}

function appendDecimal() {
    if (shouldResetScreen) {
        display.textContent = "0";
        shouldResetScreen = false;
    }
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
}

function resetScreen() {
    display.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    shouldResetScreen = false;
}

function deleteNumber() {
    if (shouldResetScreen) return;
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === "") {
        display.textContent = "0";
    }
}

function setOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstOperand = display.textContent;
    currentOperator = operator;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetScreen) return;
    if (currentOperator === "/" && display.textContent === "0") {
        alert("Nice try! You can't divide by zero.");
        resetScreen();
        return;
    }

    secondOperand = display.textContent;
    const result = operate(currentOperator, firstOperand, secondOperand);
    
    display.textContent = Math.round(result * 1000) / 1000;
    currentOperator = null;
}

numberButtons.forEach(button => {
    button.addEventListener("click", () => appendNumber(button.dataset.number));
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => setOperator(button.dataset.operator));
});

equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", resetScreen);
deleteButton.addEventListener("click", deleteNumber);
decimalButton.addEventListener("click", appendDecimal);