let currentOperand = "";
let previousOperand = "";
let operationType = null;

function appendNumber(number) {
  currentOperand += number;
  updateDisplay();
}

function operation(operator) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    calculate();
  }
  operationType = operator;
  if (operationType === "=") {
    previousOperand = currentOperand + operationType;
    currentOperand = "";
  } else {
    previousOperand = currentOperand + " " + operationType;
    currentOperand = "";
  }
  updateDisplay();
}

function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  if (operationType === "/" && current === 0) {
    currentOperand = "Error";
    previousOperand = "";
    operationType = null;
    updateDisplay();
    return;
  }
  switch (operationType) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  currentOperand = result.toString();
  previousOperand += " " + current + " =";
  operationType = "=";
  updateDisplay();
}

function squareRoot() {
  const current = parseFloat(currentOperand);
  if (isNaN(current)) return;
  currentOperand = Math.sqrt(current).toString();
  previousOperand = "";
  operationType = null;
  updateDisplay();
}

function percentage() {
  const current = parseFloat(currentOperand);
  if (isNaN(current)) return;
  currentOperand = (current / 100).toString();
  updateDisplay();
}

function sin() {
  const current = parseFloat(currentOperand);
  if (isNaN(current)) return;
  currentOperand = Math.sin(current * (Math.PI / 180)).toString();
  updateDisplay();
}

function cos() {
  const current = parseFloat(currentOperand);
  if (isNaN(current)) return;
  currentOperand = Math.cos(current * (Math.PI / 180)).toString();
  updateDisplay();
}

function tan() {
  const current = parseFloat(currentOperand);
  if (isNaN(current)) return;
  currentOperand = Math.tan(current * (Math.PI / 180)).toString();
  updateDisplay();
}

function clearLastEntry() {
  currentOperand = "";
  updateDisplay();
}

function clearDisplay() {
  currentOperand = "";
  previousOperand = "";
  operationType = null;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("display").value =
    previousOperand + " " + currentOperand;
}
