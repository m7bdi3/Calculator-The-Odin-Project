let firstOp = '';
let secondOp = '';
let currentOp = null;
let shouldResert = false;


const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const equalBtn = document.getElementById('equalBtn');
const pointBtn = document.getElementById('pointBtn');
const deleteBtn = document.getElementById('deleteBtn');
const clearBtn = document.getElementById('clearBtn');
const lastOperationScreen = document.getElementById('lastOpScreen');
const currentOperationScreen = document.getElementById('currentOpScreen');


equalBtn.addEventListener('click', evaluata);
pointBtn.addEventListener('click', appendPoint);
deleteBtn.addEventListener('click', deleteNumber);
clearBtn.addEventListener('click', clear);
window.addEventListener('keydown', handleKeyInput);


numberBtn.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorBtn.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
);

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResert)
        resetScreen()
    currentOperationScreen.textContent += number
}

function resetScreen() {
    currentOperationScreen.textContent = '';
    shouldResert = false;
}

function clear() {
    currentOperationScreen.textContent = '';
    lastOperationScreen.textContent = '';
    firstOp = '';
    secondOp = '';
    currentOp = null;
}

function appendPoint() {
    if (shouldResert) resetScreen();
    if (currentOperationScreen.textContent === '')
        currentOperationScreen.textContent = '0';
    if (currentOperationScreen.textContent.includes('.'))
        return currentOperationScreen.textContent += '.'
}

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1)
}

function setOperation(operator) {
    if (currentOp !== null) evaluate()
    firstOp = currentOperationScreen.textContent
    currentOp = operator
    lastOperationScreen.textContent = `${firstOp} ${currentOp}`
    shouldResert = true
}

function evaluata() {
    if(currentOp === null || shouldResert) return 
    if (currentOp === '/' && currentOperationScreen.textContent === '0') {
        alert("Can't divide by Zero!")
        return
    }

    secondOp = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(
        operate(currentOp, firstOp, secondOp)
    )
    lastOperationScreen.textContent = `${firstOp} ${currentOp} ${secondOp} = `
    currentOp = null
}

function roundResult(number){
    return Math.round(number * 1000) / 1000
}

function handleKeyInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if(e.key === '.') appendPoint();
    if(e.key === '=' || e.key === 'Enter') evaluata();
    if(e.key === 'BackSpace') deleteNumber();
    if(e.key === 'Escape') clear();
    if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperation(convertop(e.key));
}

function convertop(keyboardOp) {
    if (keyboardOp === '/') return '/'
    if (keyboardOp === '*') return '*'
    if (keyboardOp === '-') return '-'
    if (keyboardOp === '+') return '+'

}

function add(x, y) {
    return x+y
}

function sub(x,y){
    return x-y
}

function multiply(x,y){
    return x*y
}

function divide(x,y){
    return x / y
}

function operate(operator, x, y){
    x = Number(x)
    y = Number(y)
    switch (operator) {
        case '+' :
            return add(x,y);
        case '-' :
            return sub(x, y);
        case '*' :
            return multiply(x, y);
        case '/' :
            if (y === 0) return null
            else return divide(x,y)
        default:
            return null
    }
}