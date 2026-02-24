let basicCalculatorHistory = [];

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = document.getElementById('display').value;
        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(expression);
        document.getElementById('display').value = result;
        basicCalculatorHistory.push({
            expression: expression,
            result: result,
            timestamp: new Date()
        });
    } catch (error) {
        document.getElementById('display').value = '错误';
    }
}

function appendToScientific(value) {
    if (value === 'π') value = Math.PI.toString();
    else if (value === 'e') value = Math.E.toString();
    document.getElementById('scientificDisplay').value += value;
}

function clearScientific() {
    document.getElementById('scientificDisplay').value = '';
}

function deleteLastScientific() {
    let display = document.getElementById('scientificDisplay');
    display.value = display.value.slice(0, -1);
}

function calculateScientific() {
    try {
        let expression = document.getElementById('scientificDisplay').value;
        expression = expression.replace(/sin\(/g, 'Math.sin(');
        expression = expression.replace(/cos\(/g, 'Math.cos(');
        expression = expression.replace(/tan\(/g, 'Math.tan(');
        expression = expression.replace(/log\(/g, 'Math.log10(');
        expression = expression.replace(/ln\(/g, 'Math.log(');
        expression = expression.replace(/√\(/g, 'Math.sqrt(');
        expression = expression.replace(/\^/g, '**');
        expression = expression.replace(/(\d+)!/g, function(match, num) {
            return factorial(parseInt(num));
        });
        let result = eval(expression);
        document.getElementById('scientificDisplay').value = result;
    } catch (error) {
        document.getElementById('scientificDisplay').value = '错误';
    }
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
