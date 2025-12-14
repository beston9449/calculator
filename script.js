let display = document.querySelector('#display');
let digits = document.querySelectorAll('.digit');
let operators = document.querySelectorAll('.operator');
let equals = document.querySelector('#equals');
let clearBtn = document.querySelector('#clear');
let decimal = document.querySelector('#decimal');

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

function digitDisplay(digit) {
  if (waitingForSecondNumber) {
    display.textContent = digit;
    waitingForSecondNumber = false;
  } else if (display.textContent === '0') {
    display.textContent = digit;
  } else {
    display.textContent += digit;
  }
}

decimal.addEventListener('click', () => {
  if (!display.textContent.includes('.')) {
    digitDisplay(decimal.dataset.value);
  }
});

digits.forEach((btn) => {
  btn.addEventListener('click', () => {
    digitDisplay(btn.dataset.value);
  });
});

operators.forEach((btn) => {
  btn.addEventListener('click', () => {
    firstNumber = display.textContent;
    operator = btn.dataset.op;
    waitingForSecondNumber = true;
  });
});

equals.addEventListener('click', () => {
  if (!firstNumber || !operator) return;

  let secondNumber = display.textContent;

  let result;

  switch (operator) {
    case 'addition':
      result = Number(firstNumber) + Number(secondNumber);
      break;
    case 'subtraction':
      result = Number(firstNumber) - Number(secondNumber);
      break;
    case 'multiply':
      result = Number(firstNumber) * Number(secondNumber);
      break;
    case 'divide':
      result = Number(firstNumber) / Number(secondNumber);
      break;
  }

  display.textContent = result;
  firstNumber = result;
  waitingForSecondNumber = true;
});

clearBtn.addEventListener('click', () => {
  display.textContent = '0';
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = false;
});
