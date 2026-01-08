// 汇率数据存储
let exchangeRates = {};
let currencyOptions = [];
let selectedFromCurrency = 'CNY';
let selectedToCurrency = 'USD';

// 备用汇率数据（当API不可用时使用）- 基于CNY的汇率
const fallbackExchangeRates = {
    'CNY': 1,
    'AED': 0.524993,
    'AFN': 9.440454,
    'ALL': 11.792168,
    'AMD': 54.487942,
    'ANG': 0.255885,
    'AOA': 134.3205,
    'ARS': 207.602802,
    'AUD': 0.212789,
    'AWG': 0.255885,
    'AZN': 0.243088,
    'BAM': 0.239124,
    'BBD': 0.285905,
    'BDT': 17.471576,
    'BGN': 1.102239,
    'BHD': 0.05375,
    'BIF': 424.233316,
    'BMD': 0.142953,
    'BND': 0.183029,
    'BOB': 0.989262,
    'BRL': 0.773455,
    'BSD': 0.142953,
    'BTN': 12.908389,
    'BWP': 2.005831,
    'BYN': 0.420353,
    'BZD': 0.285905,
    'CAD': 0.19716,
    'CDF': 320.170039,
    'CHF': 0.113665,
    'CLF': 0.003272,
    'CLP': 129.346996,
    'CNH': 0.999138,
    'COP': 536.649963,
    'CRC': 71.063818,
    'CUP': 3.430861,
    'CVE': 13.48126,
    'CZK': 2.95421,
    'DJF': 25.405665,
    'DKK': 0.912124,
    'DOP': 9.026716,
    'DZD': 18.565368,
    'EGP': 6.760207,
    'ERN': 2.144288,
    'ETB': 22.035341,
    'EUR': 0.122263,
    'FJD': 0.325264,
    'FKP': 0.10585,
    'FOK': 0.912124,
    'GBP': 0.105851,
    'GEL': 0.38546,
    'GHS': 1.524621,
    'GIP': 0.10585,
    'GMD': 10.5596,
    'GNF': 1248.963106,
    'GTQ': 1.095524,
    'GYD': 29.896714,
    'HKD': 1.113161,
    'HNL': 3.769843,
    'HRK': 0.921186,
    'HTG': 18.711715,
    'HUF': 46.882325,
    'IDR': 2392.344498,
    'ILS': 0.452524,
    'INR': 12.908389,
    'IQD': 187.333862,
    'IRR': 6087.306581,
    'ISK': 17.972008,
    'JMD': 22.710857,
    'JOD': 0.101353,
    'JPY': 22.395125,
    'KES': 18.4716,
    'KGS': 12.495129,
    'KHR': 574.052813,
    'KMF': 60.14914,
    'KRW': 207.210941,
    'KWD': 0.043945,
    'KYD': 0.119127,
    'KZT': 72.938613,
    'LAK': 3100.767957,
    'LBP': 12794.250817,
    'LKR': 44.3656,
    'LRD': 25.467146,
    'LSL': 2.336065,
    'LYD': 0.775445,
    'MAD': 1.312776,
    'MDL': 2.404868,
    'MGA': 657.017724,
    'MKD': 7.535698,
    'MMK': 300.610144,
    'MNT': 509.164969,
    'MOP': 1.146549,
    'MRU': 5.700446,
    'MUR': 6.581108,
    'MVR': 2.208711,
    'MWK': 249.306888,
    'MXN': 2.560819,
    'MYR': 0.580552,
    'MZN': 9.137036,
    'NAD': 2.336065,
    'NGN': 203.73455,
    'NIO': 5.256014,
    'NOK': 1.434941,
    'NPR': 20.653423,
    'NZD': 0.247925,
    'OMR': 0.054965,
    'PAB': 0.142953,
    'PEN': 0.480415,
    'PGK': 0.614145,
    'PHP': 8.453085,
    'PKR': 40.070524,
    'PLN': 0.514681,
    'PYG': 950.872536,
    'QAR': 0.520347,
    'RON': 0.621714,
    'RSD': 14.323159,
    'RUB': 11.600928,
    'RWF': 208.476125,
    'SAR': 0.536072,
    'SBD': 1.157557,
    'SCR': 1.989041,
    'SDG': 64.25338,
    'SEK': 1.315114,
    'SGD': 0.183032,
    'SHP': 0.10585,
    'SLE': 3.429819,
    'SLL': 3429.805711,
    'SOS': 81.736682,
    'SRD': 5.468016,
    'SSP': 674.798679,
    'STN': 2.995428,
    'SYP': 1029.759043,
    'SZL': 2.336065,
    'THB': 4.46819,
    'TJS': 1.319462,
    'TMT': 0.500327,
    'TND': 0.435,
    'TOP': 0.329,
    'TRY': 4.95,
    'TTD': 0.969,
    'TWD': 4.65,
    'TZS': 360,
    'UAH': 5.95,
    'UGX': 530,
    'USD': 0.142953,
    'UYU': 5.85,
    'UZS': 1750,
    'VEF': 1.5,
    'VND': 3500,
    'VUV': 17,
    'WST': 0.38,
    'XAF': 80,
    'XCD': 0.386,
    'XDR': 0.105,
    'XOF': 80,
    'XPF': 14.5,
    'YER': 35.8,
    'ZAR': 2.65,
    'ZMW': 3.8,
    'ZWL': 46
};

// 基本计算器缓存功能
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

        // 添加到历史记录
        basicCalculatorHistory.push({
            expression: expression,
            result: result,
            timestamp: new Date()
        });
    } catch (error) {
        document.getElementById('display').value = '错误';
    }
}

// 科学计算器功能
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

// 汇率转换功能
async function loadExchangeRates() {
    const loadingEl = document.getElementById('currencyLoading');
    if (!loadingEl) return;
    
    loadingEl.style.display = 'block';
    loadingEl.innerHTML = '正在加载汇率数据...';

    try {
        const apiUrl = 'https://api.nxvav.cn/api/exchange-rate';
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('网络请求失败');
        }
        
        const data = await response.json();
        
        if (data && data.code === 200 && data.data && Array.isArray(data.data.rates)) {
            exchangeRates = {};
            data.data.rates.forEach(item => {
                if (item.currency && typeof item.rate === 'number') {
                    exchangeRates[item.currency] = item.rate;
                }
            });
        } else {
            throw new Error('API返回数据格式错误');
        }

        updateCurrencyOptions();

        const count = Object.keys(exchangeRates).length;
        loadingEl.innerHTML = `✓ 汇率数据已加载 (${count}种货币)`;
        setTimeout(() => { loadingEl.style.display = 'none'; }, 1500);

    } catch (error) {
        console.error('获取汇率数据失败:', error);
        exchangeRates = { ...fallbackExchangeRates };
        updateCurrencyOptions();
        loadingEl.innerHTML = '⚠ 使用离线汇率数据';
        setTimeout(() => { loadingEl.style.display = 'none'; }, 2000);
    }
}

function updateCurrencyOptions() {
    const fromDropdown = document.getElementById('fromCurrencyDropdown');
    const toDropdown = document.getElementById('toCurrencyDropdown');

    let fromHtml = `
        <div class="dropdown-search">
            <input type="text" placeholder="搜索货币..." oninput="filterCurrencyOptions('from', this.value)" onclick="event.stopPropagation()">
        </div>
    `;
    let toHtml = `
        <div class="dropdown-search">
            <input type="text" placeholder="搜索货币..." oninput="filterCurrencyOptions('to', this.value)" onclick="event.stopPropagation()">
        </div>
    `;

    for (const currency in exchangeRates) {
        const name = getCurrencyName(currency);
        const isFromSelected = currency === selectedFromCurrency;
        const isToSelected = currency === selectedToCurrency;

        fromHtml += `<div class="dropdown-item ${isFromSelected ? 'selected' : ''}" 
                      onclick="selectCurrency('from', '${currency}', '${name}')">
                      ${currency} (${name})</div>`;

        toHtml += `<div class="dropdown-item ${isToSelected ? 'selected' : ''}" 
                    onclick="selectCurrency('to', '${currency}', '${name}')">
                    ${currency} (${name})</div>`;
    }

    fromDropdown.innerHTML = fromHtml;
    toDropdown.innerHTML = toHtml;

    const fromInput = document.getElementById('fromCurrency');
    const toInput = document.getElementById('toCurrency');
    if (fromInput) {
        fromInput.value = `${selectedFromCurrency} (${getCurrencyName(selectedFromCurrency)})`;
    }
    if (toInput) {
        toInput.value = `${selectedToCurrency} (${getCurrencyName(selectedToCurrency)})`;
    }
}

function toggleCurrencyDropdown(type) {
    event.stopPropagation();
    const fromDropdown = document.getElementById('fromCurrencyDropdown');
    const toDropdown = document.getElementById('toCurrencyDropdown');

    if (type === 'from') {
        const isVisible = fromDropdown.style.display === 'block';
        fromDropdown.style.display = isVisible ? 'none' : 'block';
        toDropdown.style.display = 'none';
    } else {
        const isVisible = toDropdown.style.display === 'block';
        toDropdown.style.display = isVisible ? 'none' : 'block';
        fromDropdown.style.display = 'none';
    }
}

function selectCurrency(type, currency, name) {
    const input = document.getElementById(type + 'Currency');
    const dropdown = document.getElementById(type + 'CurrencyDropdown');

    input.value = `${currency} (${name})`;
    dropdown.style.display = 'none';

    if (type === 'from') {
        selectedFromCurrency = currency;
    } else {
        selectedToCurrency = currency;
    }

    updateCurrencyOptions();
}

function filterCurrencyOptions(type, searchText) {
    const dropdown = document.getElementById(type + 'CurrencyDropdown');
    const items = dropdown.querySelectorAll('.dropdown-item:not(.dropdown-search)');

    searchText = searchText.toLowerCase();

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchText)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function closeAllCurrencyDropdowns() {
    document.getElementById('fromCurrencyDropdown').style.display = 'none';
    document.getElementById('toCurrencyDropdown').style.display = 'none';
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('.searchable-select')) {
        closeAllCurrencyDropdowns();
    }
});

function getCurrencyName(code) {
    const names = {
        'AED': '阿联酋迪拉姆', 'AFN': '阿富汗尼', 'ALL': '阿尔巴尼亚列克', 'AMD': '亚美尼亚 dram',
        'ANG': '荷属安特尔古德群岛盾', 'AOA': '安哥拉宽扎', 'ARS': '阿根廷比索', 'AUD': '澳元',
        'AWG': '阿鲁巴弗罗林', 'AZN': '阿塞拜疆马纳特', 'BAM': '波黑可兑换马克', 'BBD': '巴巴多斯元',
        'BDT': '孟加拉塔卡', 'BGN': '保加利亚列弗', 'BHD': '巴林第纳尔', 'BIF': '布隆迪法郎',
        'BMD': '百慕大元', 'BND': '文莱元', 'BOB': '玻利维亚诺', 'BRL': '巴西雷亚尔',
        'BSD': '巴哈马元', 'BTN': '不丹努尔特鲁姆', 'BWP': '博茨瓦纳普拉', 'BYN': '白俄罗斯卢布',
        'BZD': '伯利兹元', 'CAD': '加元', 'CDF': '刚果法郎', 'CHF': '瑞士法郎',
        'CLF': '智利UF', 'CLP': '智利比索', 'CNH': '离岸人民币', 'COP': '哥伦比亚比索',
        'CRC': '哥斯达黎加科朗', 'CUP': '古巴比索', 'CVE': '佛得角埃斯库多', 'CZK': '捷克克朗',
        'DJF': '吉布提法郎', 'DKK': '丹麦克朗', 'DOP': '多米尼加比索', 'DZD': '阿尔及利亚第纳尔',
        'EGP': '埃及镑', 'ERN': '厄立特里亚纳克法', 'ETB': '埃塞俄比亚比尔', 'EUR': '欧元',
        'FJD': '斐济元', 'FKP': '福克兰群岛镑', 'FOK': '法罗群岛克朗', 'GBP': '英镑',
        'GEL': '格鲁吉亚拉里', 'GGP': '根西岛镑', 'GHS': '加纳塞地', 'GIP': '直布罗陀镑',
        'GMD': '冈比亚达拉西', 'GNF': '几内亚法郎', 'GTQ': '危地马拉格查尔', 'GYD': '圭亚那元',
        'HKD': '港元', 'HNL': '洪都拉斯伦皮拉', 'HRK': '克罗地亚库纳', 'HTG': '海地古德',
        'HUF': '匈牙利福林', 'IDR': '印尼卢比', 'ILS': '以色列新谢克尔', 'IMP': '马恩岛镑',
        'INR': '印度卢比', 'IQD': '伊拉克第纳尔', 'IRR': '伊朗里亚尔', 'ISK': '冰岛克朗',
        'JEP': '泽西岛镑', 'JMD': '牙买加元', 'JOD': '约旦第纳尔', 'JPY': '日元',
        'KES': '肯尼亚先令', 'KGS': '吉尔吉斯斯坦索姆', 'KHR': '柬埔寨瑞尔', 'KID': '基里巴斯元',
        'KMF': '科摩罗法郎', 'KRW': '韩元', 'KWD': '科威特第纳尔', 'KYD': '开曼群岛元',
        'KZT': '哈萨克斯坦坚戈', 'LAK': '老挝基普', 'LBP': '黎巴嫩镑', 'LKR': '斯里兰卡卢比',
        'LRD': '利比里亚元', 'LSL': '莱索托洛蒂', 'LYD': '利比亚第纳尔', 'MAD': '摩洛哥迪拉姆',
        'MDL': '摩尔多瓦列伊', 'MGA': '马达加斯加阿里亚里', 'MKD': '马其顿代纳尔', 'MMK': '缅甸元',
        'MNT': '蒙古图格里克', 'MOP': '澳门元', 'MRU': '毛里塔尼亚乌吉亚', 'MUR': '毛里求斯卢比',
        'MVR': '马尔代夫卢菲亚', 'MWK': '马拉维克瓦查', 'MXN': '墨西哥比索', 'MYR': '马来西亚林吉特',
        'MZN': '莫桑比克梅蒂卡尔', 'NAD': '纳米比亚元', 'NGN': '尼日利亚奈拉', 'NIO': '尼加拉瓜科多巴',
        'NOK': '挪威克朗', 'NPR': '尼泊尔卢比', 'NZD': '新西兰元', 'OMR': '阿曼里亚尔',
        'PAB': '巴拿马巴波亚', 'PEN': '秘鲁索尔', 'PGK': '巴布亚新几内亚基那', 'PHP': '菲律宾比索',
        'PKR': '巴基斯坦卢比', 'PLN': '波兰兹罗提', 'PYG': '巴拉圭瓜拉尼', 'QAR': '卡塔尔里亚尔',
        'RON': '罗马尼亚列伊', 'RSD': '塞尔维亚第纳尔', 'RUB': '俄罗斯卢布', 'RWF': '卢旺达法郎',
        'SAR': '沙特里亚尔', 'SBD': '所罗门群岛元', 'SCR': '塞舌尔卢比', 'SDG': '苏丹镑',
        'SEK': '瑞典克朗', 'SGD': '新加坡元', 'SHP': '圣赫勒拿镑', 'SLE': '塞拉利昂利昂',
        'SLL': '塞拉利昂利昂(旧)', 'SOS': '索马里先令', 'SRD': '苏里南元', 'SSP': '南苏丹镑',
        'STN': '圣多美和普林西比多布拉', 'SYP': '叙利亚镑', 'SZL': '斯威士兰里兰吉尼',
        'THB': '泰铢', 'TJS': '塔吉克斯坦索莫尼', 'TMT': '土库曼斯坦马纳特', 'TND': '突尼斯第纳尔',
        'TOP': '汤加潘加', 'TRY': '土耳其里拉', 'TTD': '特立尼达和多巴哥元', 'TWD': '新台币',
        'TZS': '坦桑尼亚先令', 'UAH': '乌克兰格里夫纳', 'UGX': '乌干达先令', 'USD': '美元',
        'UYU': '乌拉圭比索', 'UZS': '乌兹别克斯坦苏姆', 'VEF': '委内瑞拉玻利瓦尔', 'VES': '委内瑞拉主权玻利瓦尔',
        'VND': '越南盾', 'VUV': '瓦努阿图瓦图', 'WST': '萨摩亚塔拉', 'XAF': '中非金融合作法郎',
        'XAG': '银', 'XAU': '金', 'XCD': '东加勒比元', 'XDR': '特别提款权', 'XOF': '西非金融共同体法郎',
        'XPF': '太平洋法郎', 'YER': '也门里亚尔', 'ZAR': '南非兰特', 'ZMW': '赞比亚克瓦查',
        'ZWL': '津巴布韦元', 'CNY': '人民币'
    };
    return names[code] || code;
}

function convertCurrency() {
    const amount = parseFloat(document.getElementById('currencyAmount').value);
    const from = selectedFromCurrency;
    const to = selectedToCurrency;

    if (isNaN(amount)) {
        alert('请输入有效金额');
        return;
    }

    if (!exchangeRates[from] || !exchangeRates[to]) {
        alert('汇率数据未加载完成，请稍后重试');
        return;
    }

    // 汇率转换逻辑：通过人民币作为中间货币
    // 1单位from货币 = exchangeRates[from]人民币
    // 1人民币 = 1/exchangeRates[to]单位to货币
    // 所以 1单位from货币 = exchangeRates[from]/exchangeRates[to]单位to货币
    const fromRate = exchangeRates[from];
    const toRate = exchangeRates[to];
    const result = amount * (fromRate / toRate);

    document.getElementById('currencyResult').innerHTML =
        `${amount} ${from} = ${result.toFixed(4)} ${to} (汇率: 1 ${from} = ${(fromRate / toRate).toFixed(6)} ${to})`;
    document.getElementById('currencyResult').style.display = 'block';
}

// 全局变量存储还款计划
let mortgageScheduleData = [];

// 显示/隐藏还款计划
function toggleSchedule() {
    const scheduleContent = document.getElementById('scheduleContent');
    scheduleContent.style.display = scheduleContent.style.display === 'none' ? 'block' : 'none';
}

// 渲染还款计划表格
function renderSchedule() {
    const tbody = document.getElementById('scheduleBody');
    tbody.innerHTML = '';

    mortgageScheduleData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.month}</td>
            <td>¥${row.payment.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
            <td>¥${row.principal.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
            <td>¥${row.interest.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
            <td>¥${row.remaining.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('mortgageSchedule').style.display = 'block';
}

// 房贷计算功能
function calculateMortgage() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value);
    const loanYears = parseInt(document.getElementById('loanYears').value);
    const repaymentType = document.getElementById('repaymentType').value;

    // 输入验证
    if (isNaN(loanAmount) || loanAmount <= 0) {
        alert('请输入有效的贷款金额');
        return;
    }
    if (isNaN(annualRate) || annualRate <= 0) {
        alert('请输入有效的年利率');
        return;
    }
    if (isNaN(loanYears) || loanYears <= 0 || loanYears > 30) {
        alert('请输入有效的贷款年限（1-30年）');
        return;
    }

    const loanAmountTotal = loanAmount * 10000; // 转换为元
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = loanYears * 12;

    let monthlyPayment, totalPayment, totalInterest;

    if (repaymentType === 'equal') {
        // 等额本息计算
        monthlyPayment = (loanAmountTotal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);
        totalPayment = monthlyPayment * totalMonths;

        // 生成每月还款明细
        mortgageScheduleData = [];
        let remainingPrincipal = loanAmountTotal;
        for (let i = 1; i <= totalMonths; i++) {
            const interestPayment = remainingPrincipal * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;
            remainingPrincipal -= principalPayment;
            if (remainingPrincipal < 0) remainingPrincipal = 0;

            mortgageScheduleData.push({
                month: i,
                payment: monthlyPayment,
                principal: principalPayment,
                interest: interestPayment,
                remaining: remainingPrincipal
            });
        }
    } else {
        // 等额本金计算
        const principalPerMonth = loanAmountTotal / totalMonths;
        let totalPaymentTemp = 0;
        mortgageScheduleData = [];
        let remainingPrincipal = loanAmountTotal;

        for (let i = 1; i <= totalMonths; i++) {
            const interestThisMonth = remainingPrincipal * monthlyRate;
            const paymentThisMonth = principalPerMonth + interestThisMonth;
            totalPaymentTemp += paymentThisMonth;
            remainingPrincipal -= principalPerMonth;
            if (remainingPrincipal < 0) remainingPrincipal = 0;

            mortgageScheduleData.push({
                month: i,
                payment: paymentThisMonth,
                principal: principalPerMonth,
                interest: interestThisMonth,
                remaining: remainingPrincipal
            });
        }
        totalPayment = totalPaymentTemp;
        monthlyPayment = totalPayment / totalMonths; // 平均月供
    }

    totalInterest = totalPayment - loanAmountTotal;

    let firstMonthInterest = '';
    if (repaymentType === 'equal' && mortgageScheduleData.length > 0) {
        firstMonthInterest = `<p><strong>首月利息:</strong> ¥${mortgageScheduleData[0].interest.toLocaleString(undefined, {maximumFractionDigits: 2})}（逐月递减）</p>`;
    }

    // 渲染结果和还款计划
    document.getElementById('mortgageResult').innerHTML = `
            <h3>计算结果</h3>
            <p><strong>贷款总额:</strong> ¥${loanAmountTotal.toLocaleString()}</p>
            <p><strong>还款方式:</strong> ${repaymentType === 'equal' ? '等额本息' : '等额本金'}</p>
            <p><strong>月供:</strong> ¥${monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
            <p><strong>还款总额:</strong> ¥${totalPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
            <p><strong>支付利息:</strong> ¥${totalInterest.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
            <p><strong>还款月数:</strong> ${totalMonths} 个月</p>
            ${firstMonthInterest}
        `;
    document.getElementById('mortgageResult').style.display = 'block';
    renderSchedule();
}

// 专项扣除金额更新
function updateDeductionAmount(id, defaultValue) {
    const checkbox = document.getElementById(id);
    const amountInput = document.getElementById(id + 'Amount');

    if (checkbox.checked) {
        amountInput.disabled = false;
        if (amountInput.value === '' || amountInput.value === '0') {
            amountInput.value = defaultValue;
        }
    } else {
        amountInput.disabled = true;
    }
}

function toggleInsuranceCalcType() {
    const calcType = document.getElementById('insuranceCalcType').value;
    const rateInputs = document.getElementById('insuranceRateInputs');
    const amountInputs = document.getElementById('insuranceAmountInputs');
    
    if (calcType === 'rate') {
        rateInputs.style.display = 'block';
        amountInputs.style.display = 'none';
    } else {
        rateInputs.style.display = 'none';
        amountInputs.style.display = 'block';
    }
}

// 个税计算功能
function switchTaxMode(mode) {
    const salaryTax = document.getElementById('salaryTax');
    const bonusTax = document.getElementById('bonusTax');
    const salaryOption = document.querySelector('.tax-option:nth-child(1)');
    const bonusOption = document.querySelector('.tax-option:nth-child(2)');

    if (mode === 'salary') {
        salaryTax.style.display = 'block';
        bonusTax.style.display = 'none';
        salaryOption.classList.add('active');
        bonusOption.classList.remove('active');

        // 显示工资薪金备注，隐藏年终奖备注
        document.getElementById('salaryNotes').style.display = 'block';
        document.getElementById('bonusNotes').style.display = 'none';

        // 清除计算结果
        document.getElementById('taxResult').style.display = 'none';

        // 设置当前月份为当前月份
        const currentMonth = new Date().getMonth() + 1;
        document.getElementById('currentMonth').value = currentMonth;
    } else {
        salaryTax.style.display = 'none';
        bonusTax.style.display = 'block';
        salaryOption.classList.remove('active');
        bonusOption.classList.add('active');

        // 显示年终奖备注，隐藏工资薪金备注
        document.getElementById('salaryNotes').style.display = 'none';
        document.getElementById('bonusNotes').style.display = 'block';

        // 清除计算结果
        document.getElementById('taxResult').style.display = 'none';
    }
}

function calculateTax() {
    const activeTaxMode = document.querySelector('.tax-option.active').textContent.includes('工资') ? 'salary' : 'bonus';

    if (activeTaxMode === 'salary') {
        calculateSalaryTax();
    } else {
        calculateBonusTax();
    }
}

function calculateSalaryTax() {
    const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
    const currentMonth = parseInt(document.getElementById('currentMonth').value);

    // 专项附加扣除
    let deductionTotal = 0;
    if (document.getElementById('childEdu').checked) {
        deductionTotal += parseFloat(document.getElementById('childEduAmount').value) || 0;
    }
    if (document.getElementById('continueEdu').checked) {
        deductionTotal += parseFloat(document.getElementById('continueEduAmount').value) || 0;
    }
    if (document.getElementById('medical').checked) {
        const medicalAmount = parseFloat(document.getElementById('medicalAmount').value) || 0;
        deductionTotal += Math.min(medicalAmount, 80000);
    }
    if (document.getElementById('mortgageInterest').checked) {
        deductionTotal += parseFloat(document.getElementById('mortgageInterestAmount').value) || 0;
    }
    if (document.getElementById('rent').checked) {
        deductionTotal += parseFloat(document.getElementById('rentAmount').value) || 0;
    }
    if (document.getElementById('supportElderly').checked) {
        deductionTotal += parseFloat(document.getElementById('supportElderlyAmount').value) || 0;
    }
    if (document.getElementById('infantCare').checked) {
        deductionTotal += parseFloat(document.getElementById('infantCareAmount').value) || 0;
    }

    // 五险一金扣除
    const insuranceCalcType = document.getElementById('insuranceCalcType').value;
    let monthlyInsuranceDeduction;
    
    if (insuranceCalcType === 'rate') {
        const housingFundRate = parseFloat(document.getElementById('housingFundRate').value) || 0;
        const medicalRate = parseFloat(document.getElementById('medicalRate').value) || 0;
        const pensionRate = parseFloat(document.getElementById('pensionRate').value) || 0;
        const unemploymentRate = parseFloat(document.getElementById('unemploymentRate').value) || 0;
        const injuryRate = parseFloat(document.getElementById('injuryRate').value) || 0;
        const maternityRate = parseFloat(document.getElementById('maternityRate').value) || 0;

        const totalInsuranceRate = housingFundRate + medicalRate + pensionRate + unemploymentRate + injuryRate + maternityRate;
        monthlyInsuranceDeduction = monthlyIncome * totalInsuranceRate / 100;
    } else {
        const housingFundAmount = parseFloat(document.getElementById('housingFundAmount').value) || 0;
        const medicalInsuranceAmount = parseFloat(document.getElementById('medicalInsuranceAmount').value) || 0;
        const pensionAmount = parseFloat(document.getElementById('pensionAmount').value) || 0;
        const unemploymentAmount = parseFloat(document.getElementById('unemploymentAmount').value) || 0;
        const injuryAmount = parseFloat(document.getElementById('injuryAmount').value) || 0;
        const maternityAmount = parseFloat(document.getElementById('maternityAmount').value) || 0;

        monthlyInsuranceDeduction = housingFundAmount + medicalInsuranceAmount + pensionAmount + unemploymentAmount + injuryAmount + maternityAmount;
    }

    // 检查输入有效性
    if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
        alert('请输入有效的月收入');
        return;
    }

    if (currentMonth < 1 || currentMonth > 12) {
        alert('当前月份必须在1-12之间');
        return;
    }

    // 累计计算（当前月份的累计值）
    let cumulativeIncome = 0;
    let cumulativeInsurance = 0;
    let cumulativeDeduction = 0;
    let cumulativeThreshold = 0;

    for (let month = 1; month <= currentMonth; month++) {
        cumulativeIncome += monthlyIncome;
        cumulativeInsurance += monthlyInsuranceDeduction;
        cumulativeDeduction += deductionTotal;
        cumulativeThreshold += 5000; // 每月5000的减除费用
    }

    // 应纳税所得额 = 累计收入 - 累计五险一金 - 累计专项附加扣除 - 累计减除费用
    const cumulativeTaxableIncome = Math.max(0, cumulativeIncome - cumulativeInsurance - cumulativeDeduction - cumulativeThreshold);

    // 确定税率和速算扣除数
    let taxRate, quickDeduction;
    if (cumulativeTaxableIncome <= 36000) {
        taxRate = 0.03;
        quickDeduction = 0;
    } else if (cumulativeTaxableIncome <= 144000) {
        taxRate = 0.10;
        quickDeduction = 2520;
    } else if (cumulativeTaxableIncome <= 300000) {
        taxRate = 0.20;
        quickDeduction = 16920;
    } else if (cumulativeTaxableIncome <= 420000) {
        taxRate = 0.25;
        quickDeduction = 31920;
    } else if (cumulativeTaxableIncome <= 660000) {
        taxRate = 0.30;
        quickDeduction = 52920;
    } else if (cumulativeTaxableIncome <= 960000) {
        taxRate = 0.35;
        quickDeduction = 85920;
    } else {
        taxRate = 0.45;
        quickDeduction = 181920;
    }

    const cumulativeTax = cumulativeTaxableIncome * taxRate - quickDeduction;

    // 计算当月应纳税额（需要累计已缴税额，这里假设为0或上月累计税额）
    // 简化计算：假设每月收入相同，且无前期累计税额
    // 实际应用中，cumulativeTaxPrevMonth 需要从历史记录中获取
    let cumulativeTaxPrevMonth = 0;
    for (let month = 1; month < currentMonth; month++) {
        let prevCumulativeIncome = monthlyIncome * month;
        let prevCumulativeInsurance = monthlyInsuranceDeduction * month;
        let prevCumulativeDeduction = deductionTotal * month;
        let prevCumulativeThreshold = 5000 * month;
        let prevCumulativeTaxableIncome = Math.max(0, prevCumulativeIncome - prevCumulativeInsurance - prevCumulativeDeduction - prevCumulativeThreshold);

        let prevTaxRate, prevQuickDeduction;
        if (prevCumulativeTaxableIncome <= 36000) {
            prevTaxRate = 0.03;
            prevQuickDeduction = 0;
        } else if (prevCumulativeTaxableIncome <= 144000) {
            prevTaxRate = 0.10;
            prevQuickDeduction = 2520;
        } else if (prevCumulativeTaxableIncome <= 300000) {
            prevTaxRate = 0.20;
            prevQuickDeduction = 16920;
        } else if (prevCumulativeTaxableIncome <= 420000) {
            prevTaxRate = 0.25;
            prevQuickDeduction = 31920;
        } else if (prevCumulativeTaxableIncome <= 660000) {
            prevTaxRate = 0.30;
            prevQuickDeduction = 52920;
        } else if (prevCumulativeTaxableIncome <= 960000) {
            prevTaxRate = 0.35;
            prevQuickDeduction = 85920;
        } else {
            prevTaxRate = 0.45;
            prevQuickDeduction = 181920;
        }

        cumulativeTaxPrevMonth = prevCumulativeTaxableIncome * prevTaxRate - prevQuickDeduction;
    }

    const monthlyTax = cumulativeTax - cumulativeTaxPrevMonth;
    const netIncome = monthlyIncome - monthlyTax - monthlyInsuranceDeduction;

    document.getElementById('taxResult').innerHTML = `
            <h3>工资薪金个税计算结果</h3>
            <p><strong>月收入:</strong> ¥${monthlyIncome.toLocaleString()}</p>
            <p><strong>当前月份:</strong> ${currentMonth} 月</p>
            <p><strong>专项附加扣除:</strong> ¥${deductionTotal.toLocaleString()}</p>
            <p><strong>五险一金扣除:</strong> ¥${monthlyInsuranceDeduction.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
            <p><strong>累计收入:</strong> ¥${cumulativeIncome.toLocaleString()}</p>
            <p><strong>累计五险一金:</strong> ¥${cumulativeInsurance.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
            <p><strong>累计专项附加扣除:</strong> ¥${cumulativeDeduction.toLocaleString()}</p>
            <p><strong>累计减除费用:</strong> ¥${cumulativeThreshold.toLocaleString()}</p>
            <p><strong>应纳税所得额(累计):</strong> ¥${cumulativeTaxableIncome.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
            <p><strong>适用税率:</strong> ${(taxRate * 100).toFixed(1)}%</p>
            <p><strong>速算扣除数:</strong> ¥${quickDeduction.toLocaleString()}</p>
            <p><strong>累计应纳税额:</strong> ¥${cumulativeTax.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
            <p><strong>累计已缴纳税额:</strong> ¥${cumulativeTaxPrevMonth.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
            <p><strong>当月个税(应补税额):</strong> ¥${monthlyTax.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
            <p><strong>税后收入(月):</strong> ¥${netIncome.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
        `;
    document.getElementById('taxResult').style.display = 'block';
}

function calculateBonusTax() {
    const annualBonus = parseFloat(document.getElementById('annualBonus').value);
    const taxMethod = document.getElementById('bonusTaxMethod').value;

    if (isNaN(annualBonus) || annualBonus <= 0) {
        alert('请输入有效的年终奖金');
        return;
    }

    let result;
    if (taxMethod === 'separate') {
        // 单独计税：年终奖金除以12个月，按月度税率表确定税率和速算扣除数
        const monthlyBonus = annualBonus / 12;
        let taxRate, quickDeduction;

        if (monthlyBonus <= 3000) {
            taxRate = 0.03;
            quickDeduction = 0;
        } else if (monthlyBonus <= 12000) {
            taxRate = 0.10;
            quickDeduction = 210;
        } else if (monthlyBonus <= 25000) {
            taxRate = 0.20;
            quickDeduction = 1410;
        } else if (monthlyBonus <= 35000) {
            taxRate = 0.25;
            quickDeduction = 2660;
        } else if (monthlyBonus <= 55000) {
            taxRate = 0.30;
            quickDeduction = 4410;
        } else if (monthlyBonus <= 80000) {
            taxRate = 0.35;
            quickDeduction = 7160;
        } else {
            taxRate = 0.45;
            quickDeduction = 15160;
        }

        const tax = annualBonus * taxRate - quickDeduction;
        const netBonus = annualBonus - tax;

        result = `
                <h3>年终奖金个税计算结果（单独计税）</h3>
                <p><strong>年终奖金:</strong> ¥${annualBonus.toLocaleString()}</p>
                <p><strong>月均奖金:</strong> ¥${monthlyBonus.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
                <p><strong>适用税率:</strong> ${(taxRate * 100).toFixed(1)}%</p>
                <p><strong>速算扣除数:</strong> ¥${quickDeduction.toLocaleString()}</p>
                <p><strong>应缴个税:</strong> ¥${tax.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
                <p><strong>税后奖金:</strong> ¥${netBonus.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
            `;
    } else {
        // 并入当年综合所得计税：需要考虑其他综合所得
        result = `
                <h3>年终奖金个税计算结果（并入当年综合所得）</h3>
                <p><strong>年终奖金:</strong> ¥${annualBonus.toLocaleString()}</p>
                <p><strong>说明:</strong> 并入当年综合所得计税需要考虑全年其他综合所得，按年度税率表计算。此模式下，年终奖金将与工资薪金合并计算个税。</p>
                <p><strong>建议:</strong> 如需精确计算，请使用工资薪金模式并输入全年收入总额。</p>
            `;
    }

    document.getElementById('taxResult').innerHTML = result;
    document.getElementById('taxResult').style.display = 'block';
}

// 大写数字转换
function convertToChineseNumber() {
    const number = parseFloat(document.getElementById('numberInput').value);
    if (isNaN(number) || number < 0) {
        alert('请输入有效正数');
        return;
    }

    const result = numberToChineseAmount(number);
    document.getElementById('chineseNumberResult').innerHTML =
        `${number} = ${result}`;
    document.getElementById('chineseNumberResult').style.display = 'block';
}

function numberToChineseAmount(num) {
    if (num === 0) return '零元整';

    const units = ['', '拾', '佰', '仟'];
    const bigUnits = ['', '万', '亿'];
    const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];

    // 分离整数和小数部分
    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100);

    let result = '';

    // 转换整数部分
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

    // 转换小数部分
    if (decimalPart > 0) {
        const jiao = Math.floor(decimalPart / 10);
        const fen = decimalPart % 10;

        if (jiao > 0) {
            result += digits[jiao] + '角';
        }

        if (fen > 0) {
            result += digits[fen] + '分';
        }
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
            if (digit !== 0 || i === 0) { // 对于个位，即使为0也要加上单位
                result = digits[digit] + units[i] + result;
            } else if (i > 0) { // 对于非个位的0，只添加数字不添加单位
                result = digits[digit] + result;
            }
            zeroCount = 0;
        }
    }

    // 处理特殊情况：如10 -> 壹拾，而不是壹拾零
    if (result.endsWith('零') && result !== '零') {
        result = result.slice(0, -1);
    }

    return result;
}

// 单位转换函数
function convertLength() {
    const value = parseFloat(document.getElementById('lengthValue').value);
    const from = document.getElementById('lengthFrom').value;
    const to = document.getElementById('lengthTo').value;

    if (isNaN(value)) {
        alert('请输入有效数值');
        return;
    }

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

    document.getElementById('lengthResult').innerHTML =
        `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('lengthResult').style.display = 'block';
}

function convertArea() {
    const value = parseFloat(document.getElementById('areaValue').value);
    const from = document.getElementById('areaFrom').value;
    const to = document.getElementById('areaTo').value;

    if (isNaN(value)) {
        alert('请输入有效数值');
        return;
    }

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

    document.getElementById('areaResult').innerHTML =
        `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('areaResult').style.display = 'block';
}

function convertVolume() {
    const value = parseFloat(document.getElementById('volumeValue').value);
    const from = document.getElementById('volumeFrom').value;
    const to = document.getElementById('volumeTo').value;

    if (isNaN(value)) {
        alert('请输入有效数值');
        return;
    }

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

    document.getElementById('volumeResult').innerHTML =
        `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('volumeResult').style.display = 'block';
}

function convertWeight() {
    const value = parseFloat(document.getElementById('weightValue').value);
    const from = document.getElementById('weightFrom').value;
    const to = document.getElementById('weightTo').value;

    if (isNaN(value)) {
        alert('请输入有效数值');
        return;
    }

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

    document.getElementById('weightResult').innerHTML =
        `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('weightResult').style.display = 'block';
}

function convertTemperature() {
    const value = parseFloat(document.getElementById('tempValue').value);
    const from = document.getElementById('tempFrom').value;
    const to = document.getElementById('tempTo').value;

    if (isNaN(value)) {
        alert('请输入有效数值');
        return;
    }

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

    document.getElementById('tempResult').innerHTML =
        `${value}° ${getUnitName(from)} = ${result.toFixed(2)}° ${getUnitName(to)}`;
    document.getElementById('tempResult').style.display = 'block';
}

function convertPressure() {
    const value = parseFloat(document.getElementById('pressureValue').value);
    const from = document.getElementById('pressureFrom').value;
    const to = document.getElementById('pressureTo').value;

    if (isNaN(value)) {
        alert('请输入有效数值');
        return;
    }

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

    document.getElementById('pressureResult').innerHTML =
        `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('pressureResult').style.display = 'block';
}

function convertTime() {
    const value = parseFloat(document.getElementById('timeValue').value);
    const from = document.getElementById('timeFrom').value;
    const to = document.getElementById('timeTo').value;

    if (isNaN(value)) {
        alert('请输入有效数值');
        return;
    }

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

    document.getElementById('timeResult').innerHTML =
        `${value} ${getUnitName(from)} = ${formatNumber(result)} ${getUnitName(to)}`;
    document.getElementById('timeResult').style.display = 'block';
}

function convertSpeed() {
    const value = parseFloat(document.getElementById('speedValue').value);
    const from = document.getElementById('speedFrom').value;
    const to = document.getElementById('speedTo').value;

    if (isNaN(value)) {
        alert('请输入有效数值');
        return;
    }

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

    document.getElementById('speedResult').innerHTML =
        `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('speedResult').style.display = 'block';
}

function convertPower() {
    const value = parseFloat(document.getElementById('powerValue').value);
    const from = document.getElementById('powerFrom').value;
    const to = document.getElementById('powerTo').value;

    if (isNaN(value)) {
        alert('请输入有效数值');
        return;
    }

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

    document.getElementById('powerResult').innerHTML =
        `${value} ${getUnitName(from)} = ${result.toFixed(6)} ${getUnitName(to)}`;
    document.getElementById('powerResult').style.display = 'block';
}

function convertData() {
    const value = parseFloat(document.getElementById('dataValue').value);
    const from = document.getElementById('dataFrom').value;
    const to = document.getElementById('dataTo').value;

    if (isNaN(value)) {
        alert('请输入有效数值');
        return;
    }

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

    document.getElementById('dataResult').innerHTML =
        `${value} ${getUnitName(from)} = ${formatNumber(result)} ${getUnitName(to)}`;
    document.getElementById('dataResult').style.display = 'block';
}

// 格式化数字，避免科学计数法
function formatNumber(num) {
    if (Math.abs(num) < 1e-6 || Math.abs(num) > 1e15) {
        return num.toExponential(6);
    }
    if (Number.isInteger(num)) {
        return num.toString();
    }
    return num.toFixed(10).replace(/\.?0+$/, '');
}

function convertBase() {
    const input = document.getElementById('binaryInput').value;
    const fromBase = parseInt(document.getElementById('fromBase').value);
    const toBase = parseInt(document.getElementById('toBase').value);

    if (!input) {
        alert('请输入数值');
        return;
    }

    try {
        const decimalValue = parseInt(input, fromBase);
        if (isNaN(decimalValue)) {
            throw new Error('无效输入');
        }

        const result = decimalValue.toString(toBase).toUpperCase();

        document.getElementById('baseResult').innerHTML =
            `${input} (${fromBase}进制) = ${result} (${toBase}进制)<br>
                 十进制值: ${decimalValue}`;
        document.getElementById('baseResult').style.display = 'block';
    } catch (error) {
        alert('转换错误: ' + error.message);
    }
}

// BMI计算器
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

    if (bmi < 18.5) {
        category = '偏瘦';
    } else if (bmi < 24) {
        category = '正常';
    } else if (bmi < 28) {
        category = '超重';
    } else {
        category = '肥胖';
    }

    document.getElementById('bmiResult').innerHTML = `
            <h3>BMI计算结果</h3>
            <p><strong>身高:</strong> ${height} cm</p>
            <p><strong>体重:</strong> ${weight} kg</p>
            <p><strong>BMI指数:</strong> ${bmi.toFixed(2)}</p>
            <p><strong>身体状况:</strong> ${category}</p>
        `;
    document.getElementById('bmiResult').style.display = 'block';
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

function showSection(sectionId) {
    const sections = document.querySelectorAll('.calculator-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');

    const clickedElement = window.event ? window.event.target : null;
    if (clickedElement && clickedElement.classList.contains('nav-tab')) {
        clickedElement.classList.add('active');
    } else {
        const allTabs = document.querySelectorAll('.nav-tab');
        for (let tab of allTabs) {
            if (tab.textContent.includes(sectionId.charAt(0).toUpperCase() + sectionId.slice(1))) {
                tab.classList.add('active');
                break;
            }
        }
    }

    // 当切换到汇率页面时加载汇率数据
    if (sectionId === 'currency') {
        if (Object.keys(exchangeRates).length === 0) {
            loadExchangeRates();
        }
    }
}

// 页面加载时重置基本计算器历史记录
document.addEventListener('DOMContentLoaded', function() {
    basicCalculatorHistory = [];
    document.querySelector('.nav-tab').classList.add('active');

    // 初始化时加载汇率数据
    loadExchangeRates();

    // 初始化专项扣除金额输入框状态
    updateDeductionAmount('childEdu', 2000);
    updateDeductionAmount('continueEdu', 400);
    updateDeductionAmount('medical', 0);
    updateDeductionAmount('mortgageInterest', 1000);
    updateDeductionAmount('rent', 1500);
    updateDeductionAmount('supportElderly', 2000);
    updateDeductionAmount('infantCare', 2000);

    // 设置当前月份为当前月份
    const currentMonth = new Date().getMonth() + 1;
    document.getElementById('currentMonth').value = currentMonth;
});
