let display = '0';
let prevValue = null;
let operator = null;
let waitingForOperand = false;

const inputDisplay = document.getElementById('input-display');
const operationDisplay = document.getElementById('operation-display');

function updateDisplay() {
    inputDisplay.textContent = display;
    
    if (prevValue !== null && operator) {
        operationDisplay.textContent = `${prevValue} ${operator}`;
    } else {
        operationDisplay.textContent = '';
    }
}

function inputDigit(digit) {
    if (waitingForOperand) {
        display = String(digit);
        waitingForOperand = false;
    } else {
        display = display === '0' ? String(digit) : display + digit;
    }
    updateDisplay();
}

function inputDecimal() {
    if (waitingForOperand) {
        display = '0.';
        waitingForOperand = false;
        updateDisplay();
        return;
    }

    if (display.indexOf('.') === -1) {
        display = display + '.';
        updateDisplay();
    }
}

function clearAll() {
    display = '0';
    prevValue = null;
    operator = null;
    waitingForOperand = false;
    updateDisplay();
}

function clearDisplay() {
    display = '0';
    updateDisplay();
}

function toggleSign() {
    const newValue = parseFloat(display) * -1;
    display = String(newValue);
    updateDisplay();
}

function inputPercent() {
    const currentValue = parseFloat(display);
    const newValue = currentValue / 100;
    display = String(newValue);
    updateDisplay();
}

function performOperation(nextOperator) {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
        prevValue = inputValue;
    } else if (operator) {
        const currentValue = prevValue || 0;
        let newValue;

        switch (operator) {
            case '+':
                newValue = currentValue + inputValue;
                break;
            case '-':
                newValue = currentValue - inputValue;
                break;
            case '×':
                newValue = currentValue * inputValue;
                break;
            case '÷':
                newValue = currentValue / inputValue;
                break;
            default:
                newValue = inputValue;
        }

        prevValue = newValue;
        display = String(newValue);
    }

    waitingForOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function handleKeypad(key) {
    switch (key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            inputDigit(parseInt(key, 10));
            break;
        case '.':
            inputDecimal();
            break;
        case 'C':
            clearDisplay();
            break;
        case 'AC':
            clearAll();
            break;
        case '+/-':
            toggleSign();
            break;
        case '%':
            inputPercent();
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            performOperation(key);
            break;
        case '=':
            performOperation(null);
            break;
        default:
            break;
    }
}

// Initialize display
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
});

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/^\d$/.test(key)) {
        handleKeypad(key);
        event.preventDefault();
    } else {
        switch (key) {
            case '.':
                handleKeypad('.');
                event.preventDefault();
                break;
            case '+':
                handleKeypad('+');
                event.preventDefault();
                break;
            case '-':
                handleKeypad('-');
                event.preventDefault();
                break;
            case '*':
                handleKeypad('×');
                event.preventDefault();
                break;
            case '/':
                handleKeypad('÷');
                event.preventDefault();
                break;
            case 'Enter':
                handleKeypad('=');
                event.preventDefault();
                break;
            case 'Escape':
                handleKeypad('AC');
                event.preventDefault();
                break;
            case '%':
                handleKeypad('%');
                event.preventDefault();
                break;
            case 'Backspace':
                // Simple backspace functionality
                if (display.length > 1 && !waitingForOperand) {
                    display = display.slice(0, -1);
                } else {
                    display = '0';
                }
                updateDisplay();
                event.preventDefault();
                break;
        }
    }
});