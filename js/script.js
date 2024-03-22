// ---- Functions ----
function add(summand1, summand2) {
    return summand1 + summand2;
}

function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}

function multiply(multiplier, multiplicand) {
    return multiplier * multiplicand;
}

function divide(dividend, divisor) {
    if (divisor === 0) {
        return "Error"
    }
    return dividend / divisor;

}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

let numBefore = null;
let numCurrent = "0";
let operatorBefore = "";



// ---- Event listeners ----

const display = document.querySelector("#dsply");
display.textContent = numCurrent;

// -- Event listener: numbers
const numbersCalc = document.querySelectorAll(".num");
numbersCalc.forEach((oneNumber) => {
    oneNumber.addEventListener("click", () => {
        if (numBefore == "Error" || numCurrent == "Error") {
            return;
        };
        if (numCurrent === "0" ) {
            numCurrent = oneNumber.value;
        } else if (numCurrent.length < 12) {
            numCurrent = numCurrent + oneNumber.value;
        }
        if (numCurrent.length > 12) {
            numCurrent = numCurrent.slice(0,12);
        }
        display.textContent = numCurrent;
    })
})

// -- Event listener: operator
const operatorCalc = document.querySelectorAll(".operator");
operatorCalc.forEach((oneOperator) => {
    oneOperator.addEventListener("click", () => {
        if (numBefore == "Error" || numCurrent == "Error") {
            return;
        }
        if (numBefore == null) {
            numBefore = numCurrent;
            numCurrent = "0";
            operatorBefore = oneOperator.value;
        } else if (operatorBefore != "") {
            // Return the result as a number
            let result = operate(Number(numBefore), Number(numCurrent), operatorBefore);
            numBefore = String(result);
            numCurrent = "0";
            operatorBefore = oneOperator.value;
            if (numBefore.length > 12) {
                numBefore = numBefore.slice(0,12);
            }
            display.textContent = numBefore;
        // Handle operator after equal sign
        } else if (operatorBefore == "") {
            operatorBefore = oneOperator.value;
        }
    })
})

const allClear = document.querySelector("#AC");
allClear.addEventListener("click", () => {
    numBefore = null;
    numCurrent = "0";
    operatorBefore = "";
    display.textContent = numCurrent;
})

const equalSign = document.querySelector("#equal");
equalSign.addEventListener("click", () => {
    if (numBefore == "Error" || numCurrent == "Error") {
        return;
    }
    if (numBefore !== null) {
        let result = operate(Number(numBefore), Number(numCurrent), operatorBefore);
        numBefore = String(result);
        numCurrent = "0";
        operatorBefore = "";
        if (numBefore.length > 12) {
            numBefore = numBefore.slice(0,12);
        }
        display.textContent = numBefore;
    }
})

const backSpace = document.querySelector("#backspace");
backSpace.addEventListener("click", () => {
    if (numCurrent.length > 1) {
        numCurrent = numCurrent.slice(0,-1);
    } else if (numCurrent.length == 1) {
        numCurrent = "0";
    }
    display.textContent = numCurrent;
})

const changeSign = document.querySelector("#change-sign");
changeSign.addEventListener("click", () => {
    if (numCurrent != "0" && numCurrent[0] != "-") {
        numCurrent = "-" + numCurrent;
    } else if (numCurrent != "0" && numCurrent[0] == "-") {
        numCurrent = numCurrent.slice(1);
    }
    display.textContent = numCurrent;
} )


const addDecimal = document.querySelector("#decimal");
addDecimal.addEventListener("click", () => {
    if (numCurrent == "0" || numCurrent.indexOf(".") < 0) {
        numCurrent = numCurrent + ".";
    }
    display.textContent = numCurrent;
})

