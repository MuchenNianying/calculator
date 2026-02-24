let exchangeRates = {};
let currencyOptions = [];
let selectedFromCurrency = 'CNY';
let selectedToCurrency = 'USD';

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
    'USD': 0.14326,
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

    const fromRate = exchangeRates[from];
    const toRate = exchangeRates[to];
    const result = amount * (toRate / fromRate);

    document.getElementById('currencyResult').innerHTML =
        `${amount} ${from} = ${result.toFixed(4)} ${to} (汇率: 1 ${from} = ${(toRate / fromRate).toFixed(6)} ${to})`;
    document.getElementById('currencyResult').style.display = 'block';
}

function resetCurrency() {
    document.getElementById('currencyAmount').value = '';
    document.getElementById('currencyResult').style.display = 'none';
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('.searchable-select')) {
        closeAllCurrencyDropdowns();
    }
});
