function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('请输入有效的身高和体重');
        return;
    }
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    let category;
    if (bmi < 18.5) category = '偏瘦';
    else if (bmi < 24) category = '正常';
    else if (bmi < 28) category = '超重';
    else category = '肥胖';
    document.getElementById('bmiResult').innerHTML = `<h3>BMI计算结果</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody>
        <tr><td>身高</td><td>${height} cm</td></tr>
        <tr><td>体重</td><td>${weight} kg</td></tr>
        <tr><td>BMI指数</td><td>${bmi.toFixed(2)}</td></tr>
        <tr><td>身体状况</td><td>${category}</td></tr>
        </tbody></table>`;
}

function resetBMI() {
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('bmiResult').innerHTML = `<h3>BMI计算结果</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody>
        <tr><td>身高</td><td></td></tr>
        <tr><td>体重</td><td></td></tr>
        <tr><td>BMI指数</td><td></td></tr>
        <tr><td>身体状况</td><td></td></tr>
        </tbody></table>`;
}

function convertToChineseNumber() {
    const number = parseFloat(document.getElementById('numberInput').value);
    if (isNaN(number) || number < 0) {
        alert('请输入有效正数');
        return;
    }
    const result = numberToChineseAmount(number);
    document.getElementById('chineseNumberResult').innerHTML = `${number} = ${result}`;
    document.getElementById('chineseNumberResult').style.display = 'block';
}

function numberToChineseAmount(num) {
    if (num === 0) return '零元整';
    const units = ['', '拾', '佰', '仟'];
    const bigUnits = ['', '万', '亿'];
    const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100);
    let result = '';
    if (integerPart > 0) {
        let numStr = integerPart.toString();
        let groupCount = 0;
        while (numStr.length > 0) {
            const group = numStr.slice(-4).padStart(4, '0');
            numStr = numStr.slice(0, -4);
            if (parseInt(group) !== 0) {
                const groupChinese = convertFourDigitsToChinese(group, digits, units);
                result = groupChinese + (bigUnits[groupCount] || '') + result;
            } else if (result && !result.startsWith('零')) {
                result = '零' + result;
            }
            groupCount++;
        }
        result += '元';
    } else {
        result = '零元';
    }
    if (decimalPart > 0) {
        const jiao = Math.floor(decimalPart / 10);
        const fen = decimalPart % 10;
        if (jiao > 0) result += digits[jiao] + '角';
        if (fen > 0) result += digits[fen] + '分';
    } else {
        result += '整';
    }
    return result;
}

function convertFourDigitsToChinese(numStr, digits, units) {
    let result = '';
    let zeroCount = 0;
    for (let i = 0; i < numStr.length; i++) {
        const digit = parseInt(numStr[numStr.length - 1 - i]);
        if (digit === 0) {
            zeroCount++;
        } else {
            if (zeroCount > 0 && result) {
                result = digits[0] + result;
            }
            if (digit !== 0 || i === 0) {
                result = digits[digit] + units[i] + result;
            } else if (i > 0) {
                result = digits[digit] + result;
            }
            zeroCount = 0;
        }
    }
    if (result.endsWith('零') && result !== '零') {
        result = result.slice(0, -1);
    }
    return result;
}
