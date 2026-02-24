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
    if (sectionId === 'currency') {
        if (Object.keys(exchangeRates).length === 0) {
            loadExchangeRates();
        }
    }
}

function initializeResultTables() {
    document.getElementById('bmiResult').innerHTML = `<h3>BMI计算结果</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody><tr><td>身高</td><td></td></tr><tr><td>体重</td><td></td></tr><tr><td>BMI指数</td><td></td></tr><tr><td>身体状况</td><td></td></tr></tbody></table>`;
    document.getElementById('mortgageResult').innerHTML = `<h3>计算结果</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody><tr><td>贷款总额</td><td></td></tr><tr><td>贷款类型</td><td></td></tr><tr><td>还款方式</td><td></td></tr><tr><td>月供</td><td></td></tr><tr><td>还款总额</td><td></td></tr><tr><td>支付利息</td><td></td></tr><tr><td>还款月数</td><td></td></tr></tbody></table>`;
    document.getElementById('taxResult').innerHTML = `<h3>工资薪金个税计算结果</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody><tr><td>月收入</td><td></td></tr><tr><td>当前月份</td><td></td></tr><tr><td>专项附加扣除</td><td></td></tr><tr><td>五险一金扣除</td><td></td></tr><tr><td>累计收入</td><td></td></tr><tr><td>累计五险一金</td><td></td></tr><tr><td>累计专项附加扣除</td><td></td></tr><tr><td>累计减除费用</td><td></td></tr><tr><td>应纳税所得额(累计)</td><td></td></tr><tr><td>适用税率</td><td></td></tr><tr><td>速算扣除数</td><td></td></tr><tr><td>累计应纳税额</td><td></td></tr><tr><td>累计已缴纳税额</td><td></td></tr><tr><td>当月个税(应补税额)</td><td></td></tr><tr><td>税后收入(月)</td><td></td></tr></tbody></table>`;
}

document.addEventListener('DOMContentLoaded', function() {
    basicCalculatorHistory = [];
    document.querySelector('.nav-tab').classList.add('active');
    loadExchangeRates();
    updateDeductionAmount('childEdu', 2000);
    updateDeductionAmount('continueEdu', 400);
    updateDeductionAmount('medical', 0);
    updateDeductionAmount('mortgageInterest', 1000);
    updateDeductionAmount('rent', 1500);
    updateDeductionAmount('supportElderly', 2000);
    updateDeductionAmount('infantCare', 2000);
    const currentMonth = new Date().getMonth() + 1;
    document.getElementById('currentMonth').value = currentMonth;
    initializeResultTables();
    const commercialRepaymentType = document.getElementById('commercialRepaymentType');
    const providentRepaymentType = document.getElementById('providentRepaymentType');
    if (commercialRepaymentType) {
        commercialRepaymentType.addEventListener('change', function() {
            const scheduleBtn = document.getElementById('scheduleBtn');
            if (!scheduleBtn.disabled) {
                calculateMortgage();
            }
        });
    }
    if (providentRepaymentType) {
        providentRepaymentType.addEventListener('change', function() {
            const scheduleBtn = document.getElementById('scheduleBtn');
            if (!scheduleBtn.disabled) {
                calculateMortgage();
            }
        });
    }
});
