const input = document.getElementById("num");

function calculateAddition(num) {
  let result = "";
  for (let i = 1; i <= 10; i++) {
    result += `${i} + ${num} = ${i + num}\n`;
  }
  document.getElementById("addition").textContent = result;
}

function calculateSubtraction(num) {
  let result = "";
  let i = 1;
  while (i <= 10) {
    result += `${i} - ${num} = ${i - num}\n`;
    i++;
  }
  document.getElementById("subtraction").textContent = result;
}

function calculateMultiplication(num) {
  let result = "";
  let i = 1;
  do {
    result += `${i} * ${num} = ${i * num}\n`;
    i++;
  } while (i <= 10);
  document.getElementById("multiplication").textContent = result;
}

function calculateDivision(num) {
  let result = "";
  for (let i = 1; i <= 10; i++) {
    result += `${i} / ${num} = ${(i / num).toFixed(2)}\n`;
  }
  document.getElementById("division").textContent = result;
}

function runAllCalculations() {
  const value = parseFloat(input.value);
  if (!isNaN(value)) {
    calculateAddition(value);
    calculateSubtraction(value);
    calculateMultiplication(value);
    calculateDivision(value);
  }
}

document.getElementById("calcBtn").addEventListener("click", runAllCalculations);
