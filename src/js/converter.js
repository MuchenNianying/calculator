function convertLength() {
    const value = parseFloat(document.getElementById('lengthValue').value);
    const from = document.getElementById('lengthFrom').value;
    const to = document.getElementById('lengthTo').value;
    if (isNaN(value)) { alert('请输入有效数值'); return; }
    let meters;
    switch(from) {
        case 'mm': meters = value / 1000; break;
        case 'cm': meters = value / 100; break;
        case 'm': meters = value; break;
        case 'km': meters = value * 1000; break;
        case 'in': meters = value * 0.0254; break;
        case 'ft': meters = value * 0.3048; break;
        case 'yd': meters = value * 0.9144; break;
        case 'mi': meters = value * 1609.34; break;
        default: meters = value;
    }
    let result;
    switch(to) {
        case 'mm': result = meters * 1000; break;
        case 'cm': result = meters * 100; break;
        case 'm': result = meters; break;
        case 'km': result = meters / 1000; break;
        case 'in': result = meters / 0.0254; break;
        case 'ft': result = meters / 0.3048; break;
        case 'yd': result = meters / 0.9144; break;
        case 'mi': result = meters / 1609.34; break;
        default: result = meters;
    }
    document.getElementById('lengthResult').innerHTML = `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('lengthResult').style.display = 'block';
}

function convertArea() {
    const value = parseFloat(document.getElementById('areaValue').value);
    const from = document.getElementById('areaFrom').value;
    const to = document.getElementById('areaTo').value;
    if (isNaN(value)) { alert('请输入有效数值'); return; }
    let sqmeters;
    switch(from) {
        case 'sqm': sqmeters = value; break;
        case 'sqcm': sqmeters = value / 10000; break;
        case 'sqkm': sqmeters = value * 1000000; break;
        case 'acre': sqmeters = value * 4046.86; break;
        case 'hectare': sqmeters = value * 10000; break;
        case 'sqft': sqmeters = value * 0.092903; break;
        case 'sqin': sqmeters = value * 0.00064516; break;
        default: sqmeters = value;
    }
    let result;
    switch(to) {
        case 'sqm': result = sqmeters; break;
        case 'sqcm': result = sqmeters * 10000; break;
        case 'sqkm': result = sqmeters / 1000000; break;
        case 'acre': result = sqmeters / 4046.86; break;
        case 'hectare': result = sqmeters / 10000; break;
        case 'sqft': result = sqmeters / 0.092903; break;
        case 'sqin': result = sqmeters / 0.00064516; break;
        default: result = sqmeters;
    }
    document.getElementById('areaResult').innerHTML = `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('areaResult').style.display = 'block';
}

function convertVolume() {
    const value = parseFloat(document.getElementById('volumeValue').value);
    const from = document.getElementById('volumeFrom').value;
    const to = document.getElementById('volumeTo').value;
    if (isNaN(value)) { alert('请输入有效数值'); return; }
    let liters;
    switch(from) {
        case 'ml': liters = value / 1000; break;
        case 'l': liters = value; break;
        case 'm3': liters = value * 1000; break;
        case 'gal': liters = value * 3.78541; break;
        case 'pt': liters = value * 0.473176; break;
        case 'qt': liters = value * 0.946353; break;
        default: liters = value;
    }
    let result;
    switch(to) {
        case 'ml': result = liters * 1000; break;
        case 'l': result = liters; break;
        case 'm3': result = liters / 1000; break;
        case 'gal': result = liters / 3.78541; break;
        case 'pt': result = liters / 0.473176; break;
        case 'qt': result = liters / 0.946353; break;
        default: result = liters;
    }
    document.getElementById('volumeResult').innerHTML = `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('volumeResult').style.display = 'block';
}

function convertWeight() {
    const value = parseFloat(document.getElementById('weightValue').value);
    const from = document.getElementById('weightFrom').value;
    const to = document.getElementById('weightTo').value;
    if (isNaN(value)) { alert('请输入有效数值'); return; }
    let kg;
    switch(from) {
        case 'g': kg = value / 1000; break;
        case 'kg': kg = value; break;
        case 't': kg = value * 1000; break;
        case 'lb': kg = value * 0.453592; break;
        case 'oz': kg = value * 0.0283495; break;
        case 'st': kg = value * 6.35029; break;
        default: kg = value;
    }
    let result;
    switch(to) {
        case 'g': result = kg * 1000; break;
        case 'kg': result = kg; break;
        case 't': result = kg / 1000; break;
        case 'lb': result = kg / 0.453592; break;
        case 'oz': result = kg / 0.0283495; break;
        case 'st': result = kg / 6.35029; break;
        default: result = kg;
    }
    document.getElementById('weightResult').innerHTML = `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('weightResult').style.display = 'block';
}

function convertTemperature() {
    const value = parseFloat(document.getElementById('tempValue').value);
    const from = document.getElementById('tempFrom').value;
    const to = document.getElementById('tempTo').value;
    if (isNaN(value)) { alert('请输入有效数值'); return; }
    let celsius;
    switch(from) {
        case 'celsius': celsius = value; break;
        case 'fahrenheit': celsius = (value - 32) * 5/9; break;
        case 'kelvin': celsius = value - 273.15; break;
        default: celsius = value;
    }
    let result;
    switch(to) {
        case 'celsius': result = celsius; break;
        case 'fahrenheit': result = (celsius * 9/5) + 32; break;
        case 'kelvin': result = celsius + 273.15; break;
        default: result = celsius;
    }
    document.getElementById('tempResult').innerHTML = `${value}° ${getUnitName(from)} = ${result.toFixed(2)}° ${getUnitName(to)}`;
    document.getElementById('tempResult').style.display = 'block';
}

function convertPressure() {
    const value = parseFloat(document.getElementById('pressureValue').value);
    const from = document.getElementById('pressureFrom').value;
    const to = document.getElementById('pressureTo').value;
    if (isNaN(value)) { alert('请输入有效数值'); return; }
    let pa;
    switch(from) {
        case 'pa': pa = value; break;
        case 'kpa': pa = value * 1000; break;
        case 'mpa': pa = value * 1000000; break;
        case 'bar': pa = value * 100000; break;
        case 'psi': pa = value * 6894.76; break;
        case 'atm': pa = value * 101325; break;
        default: pa = value;
    }
    let result;
    switch(to) {
        case 'pa': result = pa; break;
        case 'kpa': result = pa / 1000; break;
        case 'mpa': result = pa / 1000000; break;
        case 'bar': result = pa / 100000; break;
        case 'psi': result = pa / 6894.76; break;
        case 'atm': result = pa / 101325; break;
        default: result = pa;
    }
    document.getElementById('pressureResult').innerHTML = `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('pressureResult').style.display = 'block';
}

function convertTime() {
    const value = parseFloat(document.getElementById('timeValue').value);
    const from = document.getElementById('timeFrom').value;
    const to = document.getElementById('timeTo').value;
    if (isNaN(value)) { alert('请输入有效数值'); return; }
    let seconds;
    switch(from) {
        case 'ms': seconds = value / 1000; break;
        case 's': seconds = value; break;
        case 'min': seconds = value * 60; break;
        case 'h': seconds = value * 3600; break;
        case 'd': seconds = value * 86400; break;
        case 'wk': seconds = value * 604800; break;
        case 'mo': seconds = value * 2629800; break;
        case 'y': seconds = value * 31557600; break;
        default: seconds = value;
    }
    let result;
    switch(to) {
        case 'ms': result = seconds * 1000; break;
        case 's': result = seconds; break;
        case 'min': result = seconds / 60; break;
        case 'h': result = seconds / 3600; break;
        case 'd': result = seconds / 86400; break;
        case 'wk': result = seconds / 604800; break;
        case 'mo': result = seconds / 2629800; break;
        case 'y': result = seconds / 31557600; break;
        default: result = seconds;
    }
    document.getElementById('timeResult').innerHTML = `${value} ${getUnitName(from)} = ${formatNumber(result)} ${getUnitName(to)}`;
    document.getElementById('timeResult').style.display = 'block';
}

function convertSpeed() {
    const value = parseFloat(document.getElementById('speedValue').value);
    const from = document.getElementById('speedFrom').value;
    const to = document.getElementById('speedTo').value;
    if (isNaN(value)) { alert('请输入有效数值'); return; }
    let mps;
    switch(from) {
        case 'mps': mps = value; break;
        case 'kmh': mps = value / 3.6; break;
        case 'mph': mps = value * 0.44704; break;
        case 'knot': mps = value * 0.514444; break;
        default: mps = value;
    }
    let result;
    switch(to) {
        case 'mps': result = mps; break;
        case 'kmh': result = mps * 3.6; break;
        case 'mph': result = mps / 0.44704; break;
        case 'knot': result = mps / 0.514444; break;
        default: result = mps;
    }
    document.getElementById('speedResult').innerHTML = `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('speedResult').style.display = 'block';
}

function convertPower() {
    const value = parseFloat(document.getElementById('powerValue').value);
    const from = document.getElementById('powerFrom').value;
    const to = document.getElementById('powerTo').value;
    if (isNaN(value)) { alert('请输入有效数值'); return; }
    let w;
    switch(from) {
        case 'w': w = value; break;
        case 'kw': w = value * 1000; break;
        case 'hp': w = value * 745.7; break;
        case 'ps': w = value * 735.5; break;
        default: w = value;
    }
    let result;
    switch(to) {
        case 'w': result = w; break;
        case 'kw': result = w / 1000; break;
        case 'hp': result = w / 745.7; break;
        case 'ps': result = w / 735.5; break;
        default: result = w;
    }
    document.getElementById('powerResult').innerHTML = `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('powerResult').style.display = 'block';
}

function convertData() {
    const value = parseFloat(document.getElementById('dataValue').value);
    const from = document.getElementById('dataFrom').value;
    const to = document.getElementById('dataTo').value;
    if (isNaN(value)) { alert('请输入有效数值'); return; }
    let bytes;
    switch(from) {
        case 'B': bytes = value; break;
        case 'KB': bytes = value * 1024; break;
        case 'MB': bytes = value * 1024 * 1024; break;
        case 'GB': bytes = value * 1024 * 1024 * 1024; break;
        case 'TB': bytes = value * Math.pow(1024, 4); break;
        case 'PB': bytes = value * Math.pow(1024, 5); break;
        default: bytes = value;
    }
    let result;
    switch(to) {
        case 'B': result = bytes; break;
        case 'KB': result = bytes / 1024; break;
        case 'MB': result = bytes / (1024 * 1024); break;
        case 'GB': result = bytes / (1024 * 1024 * 1024); break;
        case 'TB': result = bytes / Math.pow(1024, 4); break;
        case 'PB': result = bytes / Math.pow(1024, 5); break;
        default: result = bytes;
    }
    document.getElementById('dataResult').innerHTML = `${value} ${getUnitName(from)} = ${formatNumber(result)} ${getUnitName(to)}`;
    document.getElementById('dataResult').style.display = 'block';
}

function convertBase() {
    const input = document.getElementById('binaryInput').value;
    const fromBase = parseInt(document.getElementById('fromBase').value);
    const toBase = parseInt(document.getElementById('toBase').value);
    if (!input) { alert('请输入数值'); return; }
    try {
        const decimalValue = parseInt(input, fromBase);
        if (isNaN(decimalValue)) { throw new Error('无效输入'); }
        const result = decimalValue.toString(toBase).toUpperCase();
        document.getElementById('baseResult').innerHTML = `${input} (${fromBase}进制) = ${result} (${toBase}进制)<br>十进制值: ${decimalValue}`;
        document.getElementById('baseResult').style.display = 'block';
    } catch (error) {
        alert('转换错误: ' + error.message);
    }
}

function formatNumber(num) {
    if (Math.abs(num) < 1e-6 || Math.abs(num) > 1e15) {
        return num.toExponential(6);
    }
    if (Number.isInteger(num)) {
        return num.toString();
    }
    return num.toFixed(10).replace(/\.?0+$/, '');
}

function getUnitName(unitCode) {
    const unitNames = {
        'mm': '毫米', 'cm': '厘米', 'm': '米', 'km': '千米',
        'in': '英寸', 'ft': '英尺', 'yd': '码', 'mi': '英里',
        'sqm': '平方米', 'sqcm': '平方厘米', 'sqkm': '平方千米',
        'acre': '英亩', 'hectare': '公顷', 'sqft': '平方英尺', 'sqin': '平方英寸',
        'g': '克', 'kg': '千克', 't': '吨', 'lb': '磅', 'oz': '盎司', 'st': '英石',
        'ml': '毫升', 'l': '升', 'm3': '立方米', 'gal': '加仑', 'pt': '品脱', 'qt': '夸脱',
        'celsius': '摄氏度', 'fahrenheit': '华氏度', 'kelvin': '开尔文',
        'B': '字节', 'KB': '千字节', 'MB': '兆字节', 'GB': '吉字节', 'TB': '太字节', 'PB': '拍字节',
        'ms': '毫秒', 's': '秒', 'min': '分钟', 'h': '小时', 'd': '天', 'wk': '周', 'mo': '月', 'y': '年',
        'mps': '米/秒', 'kmh': '千米/小时', 'mph': '英里/小时', 'knot': '节',
        'pa': '帕斯卡', 'kpa': '千帕', 'mpa': '兆帕', 'bar': '巴', 'psi': '磅/平方英寸', 'atm': '标准大气压',
        'w': '瓦特', 'kw': '千瓦', 'hp': '马力', 'ps': '公制马力'
    };
    return unitNames[unitCode] || unitCode;
}

function resetLength() {
    document.getElementById('lengthFrom').value = '';
    document.getElementById('lengthFromUnit').value = 'm';
    document.getElementById('lengthTo').value = 'm';
    document.getElementById('lengthResult').innerHTML = '';
}

function resetArea() {
    document.getElementById('areaFrom').value = '';
    document.getElementById('areaFromUnit').value = 'sqm';
    document.getElementById('areaTo').value = 'sqm';
    document.getElementById('areaResult').innerHTML = '';
}

function resetVolume() {
    document.getElementById('volumeFrom').value = '';
    document.getElementById('volumeFromUnit').value = 'l';
    document.getElementById('volumeTo').value = 'l';
    document.getElementById('volumeResult').innerHTML = '';
}

function resetWeight() {
    document.getElementById('weightFrom').value = '';
    document.getElementById('weightFromUnit').value = 'kg';
    document.getElementById('weightTo').value = 'kg';
    document.getElementById('weightResult').innerHTML = '';
}

function resetTemperature() {
    document.getElementById('tempFrom').value = '';
    document.getElementById('tempFromUnit').value = 'celsius';
    document.getElementById('tempTo').value = 'celsius';
    document.getElementById('tempResult').innerHTML = '';
}

function resetPressure() {
    document.getElementById('pressureFrom').value = '';
    document.getElementById('pressureFromUnit').value = 'pa';
    document.getElementById('pressureTo').value = 'pa';
    document.getElementById('pressureResult').innerHTML = '';
}

function resetTime() {
    document.getElementById('timeFrom').value = '';
    document.getElementById('timeFromUnit').value = 's';
    document.getElementById('timeTo').value = 's';
    document.getElementById('timeResult').innerHTML = '';
}

function resetSpeed() {
    document.getElementById('speedFrom').value = '';
    document.getElementById('speedFromUnit').value = 'kmh';
    document.getElementById('speedTo').value = 'kmh';
    document.getElementById('speedResult').innerHTML = '';
}

function resetPower() {
    document.getElementById('powerFrom').value = '';
    document.getElementById('powerFromUnit').value = 'w';
    document.getElementById('powerTo').value = 'w';
    document.getElementById('powerResult').innerHTML = '';
}

function resetBase() {
    document.getElementById('baseFrom').value = '';
    document.getElementById('baseFromUnit').value = '10';
    document.getElementById('baseTo').value = '10';
    document.getElementById('baseResult').innerHTML = '';
}

function resetData() {
    document.getElementById('dataFrom').value = '';
    document.getElementById('dataFromUnit').value = 'B';
    document.getElementById('dataTo').value = 'B';
    document.getElementById('dataResult').innerHTML = '';
}
