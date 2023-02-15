const digits = [
  ["AC", "+/-", "%"],
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [0, "."],
];
const operator = ["+", "-", "*", "/", "="];

//FUNCTIONS
function operate() {
  const currVal = parseInt(getDisplayContainerValue());
  const operationResult = getOperation(selectedOperation)(
    previousDisplayVal,
    currVal
  );
  setDisplayValue(operationResult);
}

function sub(a, b) {
  return a - b;
}
function add(a, b) {
  return a + b;
}
function divide(a, b) {
  return a / b;
}
function multiply(a, b) {
  return a * b;
}

function getDisplayContainerValue() {
  return displayContainer.innerHTML;
}
function setDisplayValue(value) {
  displayContainer.textContent = value;
}
function clearDisplay() {
  displayContainer.innerHTML = "";
}

//VARIABLES
let previousDisplayVal = 0;
let selectedOperation = "";

//SELECTORS

const displayContainer = document.querySelector("#display-container");
const numbContainer = document.querySelector("#number-container");
const operatorContainer = document.querySelector("#operator-container");

//RENDERS

function makeButton(number, buttonType) {
  const button = document.createElement("div");
  button.textContent = number;
  button.classList.add(buttonType);
  return button;
}

function makeRow() {
  const row = document.createElement("div");
  row.classList.add("row");

  return row;
}

digits.forEach((valArr) => {
  const row = makeRow();

  valArr.forEach((value) => {
    const button = makeButton(
      value,
      value === 0 ? "zero-button" : "number-button"
    );

    button.addEventListener("click", setButtonEvent(value));

    row.appendChild(button);
  });

  numbContainer.append(row);
});

operator.forEach((val) => {
  const btn = makeButton(val, "operator-button");
  btn.addEventListener("click", () => {
    if (val !== "=") {
      previousDisplayVal = parseInt(getDisplayContainerValue(), 10);
      selectedOperation = val;
      clearDisplay();
    } else {
      operate();
    }
  });
  return operatorContainer.append(btn);
});

function setButtonEvent(value) {
  const typeOfValue = typeof value;
  if (typeOfValue === "number") {
    return () => {
      const currVal = getDisplayContainerValue();
      const newVal = currVal + value;
      setDisplayValue(newVal);
    };
  }

  if (typeOfValue === "string") {
    switch (value) {
      case "AC":
        return () => {
          clearDisplay();
        };
      default:
        return () => {};
    }
  }
}

function getOperation(value) {
  switch (value) {
    case "*":
      return multiply;
    case "+":
      return add;
    case "-":
      return sub;
    case "/":
      return divide;
  }
}
