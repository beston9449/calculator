let display = document.querySelector('#display');
let digits = document.querySelectorAll('.digit');
let operators = document.querySelectorAll('.operator');
let equals = document.querySelector('#equals');
let clearBtn = document.querySelector('#clear');
let decimal = document.querySelector('#decimal');
let backspace = document.querySelector('#backspace');

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
  if (waitingForSecondNumber) {
    display.textContent = '0.';
    waitingForSecondNumber = false;
    return;
  }

  if (!display.textContent.includes('.')) {
    digitDisplay(decimal.dataset.value);
  }
});

backspace.addEventListener('click', () => {
  display.textContent = display.textContent.slice(0, display.textContent.length - 1);
  if (display.textContent === '') display.textContent = '0';
});

digits.forEach((btn) => {
  btn.addEventListener('click', () => {
    digitDisplay(btn.dataset.value);
  });
});

function calculate(a, b, op) {
  switch (op) {
    case 'addition':
      return a + b;
    case 'subtraction':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      return b === 0 ? null : a / b;
  }
}

operators.forEach((btn) => {
  btn.addEventListener('click', () => {
    const currentValue = Number(display.textContent);

    if (operator && !waitingForSecondNumber) {
      let result = calculate(firstNumber, currentValue, operator);

      if (result === null) {
        // division by zero
        display.textContent = 'Impossible!';
        firstNumber = null;
        operator = null;
        waitingForSecondNumber = true;
        return;
      }

      result = Math.round(result * 100000000) / 100000000;
      display.textContent = result;
      firstNumber = result;
    } else {
      firstNumber = currentValue;
    }

    operator = btn.dataset.op;
    waitingForSecondNumber = true;
  });
});

equals.addEventListener('click', () => {
  if (!operator || firstNumber === null) return;

  const secondNumber = Number(display.textContent);
  let result = calculate(firstNumber, secondNumber, operator);

  if (result === null) {
    display.textContent = 'Impossible!';
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;
    return;
  }

  result = Math.round(result * 100000000) / 100000000;
  display.textContent = result;
  firstNumber = result;
  waitingForSecondNumber = true;
  operator = null; // reset operator after equals
});

clearBtn.addEventListener('click', () => {
  display.textContent = '0';
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = false;
});
