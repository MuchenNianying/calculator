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

function selectAllDeductions() {
    const deductions = ['childEdu', 'continueEdu', 'medical', 'mortgageInterest', 'rent', 'supportElderly', 'infantCare'];
    const defaultValues = { 'childEdu': 2000, 'continueEdu': 400, 'medical': 0, 'mortgageInterest': 1000, 'rent': 1500, 'supportElderly': 2000, 'infantCare': 2000 };
    deductions.forEach(id => {
        const checkbox = document.getElementById(id);
        checkbox.checked = true;
        updateDeductionAmount(id, defaultValues[id]);
    });
}

function deselectAllDeductions() {
    const deductions = ['childEdu', 'continueEdu', 'medical', 'mortgageInterest', 'rent', 'supportElderly', 'infantCare'];
    const defaultValues = { 'childEdu': 2000, 'continueEdu': 400, 'medical': 0, 'mortgageInterest': 1000, 'rent': 1500, 'supportElderly': 2000, 'infantCare': 2000 };
    deductions.forEach(id => {
        const checkbox = document.getElementById(id);
        checkbox.checked = !checkbox.checked;
        if (checkbox.checked) {
            updateDeductionAmount(id, defaultValues[id]);
        } else {
            updateDeductionAmount(id, 0);
        }
    });
}

function resetDeductions() {
    const deductions = ['childEdu', 'continueEdu', 'medical', 'mortgageInterest', 'rent', 'supportElderly', 'infantCare'];
    const defaultValues = { 'childEdu': 2000, 'continueEdu': 400, 'medical': 0, 'mortgageInterest': 1000, 'rent': 1500, 'supportElderly': 2000, 'infantCare': 2000 };
    deductions.forEach(id => {
        const checkbox = document.getElementById(id);
        const amountInput = document.getElementById(id + 'Amount');
        checkbox.checked = false;
        amountInput.disabled = true;
        amountInput.value = defaultValues[id];
    });
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

function toggleIncomeCalcType() {
    const calcType = document.getElementById('incomeCalcType').value;
    const monthlyInput = document.getElementById('monthlyIncomeInput');
    const yearlyInput = document.getElementById('yearlyIncomeInput');
    if (calcType === 'monthly') {
        monthlyInput.style.display = 'block';
        yearlyInput.style.display = 'none';
    } else {
        monthlyInput.style.display = 'none';
        yearlyInput.style.display = 'block';
    }
}

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
        document.getElementById('salaryNotes').style.display = 'block';
        document.getElementById('bonusNotes').style.display = 'none';
        document.getElementById('taxResult').style.display = 'block';
        document.getElementById('taxResult').innerHTML = `<h3>工资薪金个税计算结果</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody><tr><td>月收入</td><td></td></tr><tr><td>当前月份</td><td></td></tr><tr><td>专项附加扣除</td><td></td></tr><tr><td>五险一金扣除</td><td></td></tr><tr><td>累计收入</td><td></td></tr><tr><td>累计五险一金</td><td></td></tr><tr><td>累计专项附加扣除</td><td></td></tr><tr><td>累计减除费用</td><td></td></tr><tr><td>应纳税所得额(累计)</td><td></td></tr><tr><td>适用税率</td><td></td></tr><tr><td>速算扣除数</td><td></td></tr><tr><td>累计应纳税额</td><td></td></tr><tr><td>累计已缴纳税额</td><td></td></tr><tr><td>当月个税(应补税额)</td><td></td></tr><tr><td>税后收入(月)</td><td></td></tr></tbody></table>`;
        const currentMonth = new Date().getMonth() + 1;
        document.getElementById('currentMonth').value = currentMonth;
    } else {
        salaryTax.style.display = 'none';
        bonusTax.style.display = 'block';
        salaryOption.classList.remove('active');
        bonusOption.classList.add('active');
        document.getElementById('salaryNotes').style.display = 'none';
        document.getElementById('bonusNotes').style.display = 'block';
        document.getElementById('taxResult').style.display = 'block';
        document.getElementById('taxResult').innerHTML = `<h3>年终奖金个税计算结果</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody><tr><td>年终奖金</td><td></td></tr><tr><td>计税方式</td><td></td></tr><tr><td>适用税率</td><td></td></tr><tr><td>速算扣除数</td><td></td></tr><tr><td>应缴个税</td><td></td></tr><tr><td>税后奖金</td><td></td></tr></tbody></table>`;
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
    const incomeCalcType = document.getElementById('incomeCalcType').value;
    if (incomeCalcType === 'monthly') {
        calculateMonthlySalaryTax();
    } else {
        calculateYearlySalaryTax();
    }
}

function calculateMonthlySalaryTax() {
    const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);
    const currentMonth = parseInt(document.getElementById('currentMonth').value);
    let deductionTotal = 0;
    if (document.getElementById('childEdu').checked) deductionTotal += parseFloat(document.getElementById('childEduAmount').value) || 0;
    if (document.getElementById('continueEdu').checked) deductionTotal += parseFloat(document.getElementById('continueEduAmount').value) || 0;
    if (document.getElementById('medical').checked) {
        const medicalAmount = parseFloat(document.getElementById('medicalAmount').value) || 0;
        deductionTotal += Math.min(medicalAmount, 80000);
    }
    if (document.getElementById('mortgageInterest').checked) deductionTotal += parseFloat(document.getElementById('mortgageInterestAmount').value) || 0;
    if (document.getElementById('rent').checked) deductionTotal += parseFloat(document.getElementById('rentAmount').value) || 0;
    if (document.getElementById('supportElderly').checked) deductionTotal += parseFloat(document.getElementById('supportElderlyAmount').value) || 0;
    if (document.getElementById('infantCare').checked) deductionTotal += parseFloat(document.getElementById('infantCareAmount').value) || 0;

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

    if (isNaN(monthlyIncome) || monthlyIncome <= 0) { alert('请输入有效的月收入'); return; }
    if (currentMonth < 1 || currentMonth > 12) { alert('当前月份必须在1-12之间'); return; }

    let cumulativeIncome = 0, cumulativeInsurance = 0, cumulativeDeduction = 0, cumulativeThreshold = 0;
    for (let month = 1; month <= currentMonth; month++) {
        cumulativeIncome += monthlyIncome;
        cumulativeInsurance += monthlyInsuranceDeduction;
        cumulativeDeduction += deductionTotal;
        cumulativeThreshold += 5000;
    }

    const cumulativeTaxableIncome = Math.max(0, cumulativeIncome - cumulativeInsurance - cumulativeDeduction - cumulativeThreshold);
    let taxRate, quickDeduction;
    if (cumulativeTaxableIncome <= 36000) { taxRate = 0.03; quickDeduction = 0; }
    else if (cumulativeTaxableIncome <= 144000) { taxRate = 0.10; quickDeduction = 2520; }
    else if (cumulativeTaxableIncome <= 300000) { taxRate = 0.20; quickDeduction = 16920; }
    else if (cumulativeTaxableIncome <= 420000) { taxRate = 0.25; quickDeduction = 31920; }
    else if (cumulativeTaxableIncome <= 660000) { taxRate = 0.30; quickDeduction = 52920; }
    else if (cumulativeTaxableIncome <= 960000) { taxRate = 0.35; quickDeduction = 85920; }
    else { taxRate = 0.45; quickDeduction = 181920; }

    const cumulativeTax = cumulativeTaxableIncome * taxRate - quickDeduction;
    let cumulativeTaxPrevMonth = 0;
    for (let month = 1; month < currentMonth; month++) {
        let prevCumulativeIncome = monthlyIncome * month;
        let prevCumulativeInsurance = monthlyInsuranceDeduction * month;
        let prevCumulativeDeduction = deductionTotal * month;
        let prevCumulativeThreshold = 5000 * month;
        let prevCumulativeTaxableIncome = Math.max(0, prevCumulativeIncome - prevCumulativeInsurance - prevCumulativeDeduction - prevCumulativeThreshold);
        let prevTaxRate, prevQuickDeduction;
        if (prevCumulativeTaxableIncome <= 36000) { prevTaxRate = 0.03; prevQuickDeduction = 0; }
        else if (prevCumulativeTaxableIncome <= 144000) { prevTaxRate = 0.10; prevQuickDeduction = 2520; }
        else if (prevCumulativeTaxableIncome <= 300000) { prevTaxRate = 0.20; prevQuickDeduction = 16920; }
        else if (prevCumulativeTaxableIncome <= 420000) { prevTaxRate = 0.25; prevQuickDeduction = 31920; }
        else if (prevCumulativeTaxableIncome <= 660000) { prevTaxRate = 0.30; prevQuickDeduction = 52920; }
        else if (prevCumulativeTaxableIncome <= 960000) { prevTaxRate = 0.35; prevQuickDeduction = 85920; }
        else { prevTaxRate = 0.45; prevQuickDeduction = 181920; }
        cumulativeTaxPrevMonth = prevCumulativeTaxableIncome * prevTaxRate - prevQuickDeduction;
    }

    const monthlyTax = cumulativeTax - cumulativeTaxPrevMonth;
    const netIncome = monthlyIncome - monthlyTax - monthlyInsuranceDeduction;

    document.getElementById('taxResult').innerHTML = `<h3>工资薪金个税计算结果</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody>
        <tr><td>月收入</td><td>¥${monthlyIncome.toLocaleString()}</td></tr>
        <tr><td>当前月份</td><td>${currentMonth} 月</td></tr>
        <tr><td>专项附加扣除</td><td>¥${deductionTotal.toLocaleString()}</td></tr>
        <tr><td>五险一金扣除</td><td>¥${monthlyInsuranceDeduction.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        <tr><td>累计收入</td><td>¥${cumulativeIncome.toLocaleString()}</td></tr>
        <tr><td>累计五险一金</td><td>¥${cumulativeInsurance.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        <tr><td>累计专项附加扣除</td><td>¥${cumulativeDeduction.toLocaleString()}</td></tr>
        <tr><td>累计减除费用</td><td>¥${cumulativeThreshold.toLocaleString()}</td></tr>
        <tr><td>应纳税所得额(累计)</td><td>¥${cumulativeTaxableIncome.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        <tr><td>适用税率</td><td>${(taxRate * 100).toFixed(1)}%</td></tr>
        <tr><td>速算扣除数</td><td>¥${quickDeduction.toLocaleString()}</td></tr>
        <tr><td>累计应纳税额</td><td>¥${cumulativeTax.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        <tr><td>累计已缴纳税额</td><td>¥${cumulativeTaxPrevMonth.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        <tr><td>当月个税(应补税额)</td><td>¥${monthlyTax.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        <tr><td>税后收入(月)</td><td>¥${netIncome.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        </tbody></table>`;
}

function calculateYearlySalaryTax() {
    const yearlyIncome = parseFloat(document.getElementById('yearlyIncome').value);
    let deductionTotal = 0;
    if (document.getElementById('childEdu').checked) deductionTotal += parseFloat(document.getElementById('childEduAmount').value) || 0;
    if (document.getElementById('continueEdu').checked) deductionTotal += parseFloat(document.getElementById('continueEduAmount').value) || 0;
    if (document.getElementById('medical').checked) {
        const medicalAmount = parseFloat(document.getElementById('medicalAmount').value) || 0;
        deductionTotal += Math.min(medicalAmount, 80000);
    }
    if (document.getElementById('mortgageInterest').checked) deductionTotal += parseFloat(document.getElementById('mortgageInterestAmount').value) || 0;
    if (document.getElementById('rent').checked) deductionTotal += parseFloat(document.getElementById('rentAmount').value) || 0;
    if (document.getElementById('supportElderly').checked) deductionTotal += parseFloat(document.getElementById('supportElderlyAmount').value) || 0;
    if (document.getElementById('infantCare').checked) deductionTotal += parseFloat(document.getElementById('infantCareAmount').value) || 0;

    const yearlyDeduction = deductionTotal * 12;
    const insuranceCalcType = document.getElementById('insuranceCalcType').value;
    let yearlyInsuranceDeduction;
    if (insuranceCalcType === 'rate') {
        const housingFundRate = parseFloat(document.getElementById('housingFundRate').value) || 0;
        const medicalRate = parseFloat(document.getElementById('medicalRate').value) || 0;
        const pensionRate = parseFloat(document.getElementById('pensionRate').value) || 0;
        const unemploymentRate = parseFloat(document.getElementById('unemploymentRate').value) || 0;
        const injuryRate = parseFloat(document.getElementById('injuryRate').value) || 0;
        const maternityRate = parseFloat(document.getElementById('maternityRate').value) || 0;
        const totalInsuranceRate = housingFundRate + medicalRate + pensionRate + unemploymentRate + injuryRate + maternityRate;
        yearlyInsuranceDeduction = yearlyIncome * totalInsuranceRate / 100;
    } else {
        const housingFundAmount = parseFloat(document.getElementById('housingFundAmount').value) || 0;
        const medicalInsuranceAmount = parseFloat(document.getElementById('medicalInsuranceAmount').value) || 0;
        const pensionAmount = parseFloat(document.getElementById('pensionAmount').value) || 0;
        const unemploymentAmount = parseFloat(document.getElementById('unemploymentAmount').value) || 0;
        const injuryAmount = parseFloat(document.getElementById('injuryAmount').value) || 0;
        const maternityAmount = parseFloat(document.getElementById('maternityAmount').value) || 0;
        yearlyInsuranceDeduction = (housingFundAmount + medicalInsuranceAmount + pensionAmount + unemploymentAmount + injuryAmount + maternityAmount) * 12;
    }

    if (isNaN(yearlyIncome) || yearlyIncome <= 0) { alert('请输入有效的年收入'); return; }

    const yearlyThreshold = 5000 * 12;
    const taxableIncome = Math.max(0, yearlyIncome - yearlyInsuranceDeduction - yearlyDeduction - yearlyThreshold);
    let taxRate, quickDeduction;
    if (taxableIncome <= 36000) { taxRate = 0.03; quickDeduction = 0; }
    else if (taxableIncome <= 144000) { taxRate = 0.10; quickDeduction = 2520; }
    else if (taxableIncome <= 300000) { taxRate = 0.20; quickDeduction = 16920; }
    else if (taxableIncome <= 420000) { taxRate = 0.25; quickDeduction = 31920; }
    else if (taxableIncome <= 660000) { taxRate = 0.30; quickDeduction = 52920; }
    else if (taxableIncome <= 960000) { taxRate = 0.35; quickDeduction = 85920; }
    else { taxRate = 0.45; quickDeduction = 181920; }

    const yearlyTax = taxableIncome * taxRate - quickDeduction;
    const netIncome = yearlyIncome - yearlyTax - yearlyInsuranceDeduction;
    const avgMonthlyIncome = yearlyIncome / 12;
    const avgMonthlyTax = yearlyTax / 12;
    const avgMonthlyNet = netIncome / 12;

    document.getElementById('taxResult').innerHTML = `<h3>工资薪金个税计算结果（年收入）</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody>
        <tr><td>年收入总额</td><td>¥${yearlyIncome.toLocaleString()}</td></tr>
        <tr><td>月均收入</td><td>¥${avgMonthlyIncome.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        <tr><td>专项附加扣除（月）</td><td>¥${deductionTotal.toLocaleString()}</td></tr>
        <tr><td>专项附加扣除（年）</td><td>¥${yearlyDeduction.toLocaleString()}</td></tr>
        <tr><td>五险一金扣除（年）</td><td>¥${yearlyInsuranceDeduction.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        <tr><td>减除费用（年）</td><td>¥${yearlyThreshold.toLocaleString()}</td></tr>
        <tr><td>应纳税所得额</td><td>¥${taxableIncome.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        <tr><td>适用税率</td><td>${(taxRate * 100).toFixed(1)}%</td></tr>
        <tr><td>速算扣除数</td><td>¥${quickDeduction.toLocaleString()}</td></tr>
        <tr><td>全年应纳税额</td><td>¥${yearlyTax.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        <tr><td>月均个税</td><td>¥${avgMonthlyTax.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        <tr><td>税后年收入</td><td>¥${netIncome.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        <tr><td>税后月均收入</td><td>¥${avgMonthlyNet.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
        <tr><td>实际税负率</td><td>${(yearlyTax / yearlyIncome * 100).toFixed(2)}%</td></tr>
        </tbody></table>`;
}

function calculateBonusTax() {
    const annualBonus = parseFloat(document.getElementById('annualBonus').value);
    const taxMethod = document.getElementById('bonusTaxMethod').value;
    if (isNaN(annualBonus) || annualBonus <= 0) { alert('请输入有效的年终奖金'); return; }

    let result;
    if (taxMethod === 'separate') {
        const monthlyBonus = annualBonus / 12;
        let taxRate, quickDeduction;
        if (monthlyBonus <= 3000) { taxRate = 0.03; quickDeduction = 0; }
        else if (monthlyBonus <= 12000) { taxRate = 0.10; quickDeduction = 210; }
        else if (monthlyBonus <= 25000) { taxRate = 0.20; quickDeduction = 1410; }
        else if (monthlyBonus <= 35000) { taxRate = 0.25; quickDeduction = 2660; }
        else if (monthlyBonus <= 55000) { taxRate = 0.30; quickDeduction = 4410; }
        else if (monthlyBonus <= 80000) { taxRate = 0.35; quickDeduction = 7160; }
        else { taxRate = 0.45; quickDeduction = 15160; }
        const tax = annualBonus * taxRate - quickDeduction;
        const netBonus = annualBonus - tax;
        result = `<h3>年终奖金个税计算结果（单独计税）</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody>
            <tr><td>年终奖金</td><td>¥${annualBonus.toLocaleString()}</td></tr>
            <tr><td>月均奖金</td><td>¥${monthlyBonus.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            <tr><td>适用税率</td><td>${(taxRate * 100).toFixed(1)}%</td></tr>
            <tr><td>速算扣除数</td><td>¥${quickDeduction.toLocaleString()}</td></tr>
            <tr><td>应缴个税</td><td>¥${tax.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            <tr><td>税后奖金</td><td>¥${netBonus.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            </tbody></table>`;
    } else {
        result = `<h3>年终奖金个税计算结果（并入当年综合所得）</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody>
            <tr><td>年终奖金</td><td>¥${annualBonus.toLocaleString()}</td></tr>
            <tr><td>说明</td><td>并入当年综合所得计税需要考虑全年其他综合所得，按年度税率表计算。此模式下，年终奖金将与工资薪金合并计算个税。</td></tr>
            <tr><td>建议</td><td>如需精确计算，请使用工资薪金模式并输入全年收入总额。</td></tr>
            </tbody></table>`;
    }
    document.getElementById('taxResult').innerHTML = result;
}

function resetTax() {
    const activeTaxMode = document.querySelector('.tax-option.active').textContent.includes('工资') ? 'salary' : 'bonus';
    if (activeTaxMode === 'salary') {
        document.getElementById('monthlyIncome').value = '';
        document.getElementById('currentMonth').value = '1';
        document.getElementById('childEdu').checked = false;
        document.getElementById('childEduAmount').value = '1000';
        document.getElementById('continueEdu').checked = false;
        document.getElementById('continueEduAmount').value = '400';
        document.getElementById('medical').checked = false;
        document.getElementById('medicalAmount').value = '0';
        document.getElementById('mortgageInterest').checked = false;
        document.getElementById('mortgageInterestAmount').value = '1000';
        document.getElementById('rent').checked = false;
        document.getElementById('rentAmount').value = '1500';
        document.getElementById('supportElderly').checked = false;
        document.getElementById('supportElderlyAmount').value = '2000';
        document.getElementById('infantCare').checked = false;
        document.getElementById('infantCareAmount').value = '2000';
        document.getElementById('insuranceCalcType').value = 'rate';
        document.getElementById('housingFundRate').value = '8';
        document.getElementById('insuranceRate').value = '2';
        document.getElementById('pensionRate').value = '8';
        document.getElementById('unemploymentRate').value = '0.5';
        document.getElementById('injuryRate').value = '0';
        document.getElementById('maternityRate').value = '0';
        document.getElementById('monthlyInsuranceDeduction').value = '';
        document.getElementById('taxResult').innerHTML = `<h3>工资薪金个税计算结果</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody><tr><td>月收入</td><td></td></tr><tr><td>当前月份</td><td></td></tr><tr><td>专项附加扣除</td><td></td></tr><tr><td>五险一金扣除</td><td></td></tr><tr><td>累计收入</td><td></td></tr><tr><td>累计五险一金</td><td></td></tr><tr><td>累计专项附加扣除</td><td></td></tr><tr><td>累计减除费用</td><td></td></tr><tr><td>应纳税所得额(累计)</td><td></td></tr><tr><td>适用税率</td><td></td></tr><tr><td>速算扣除数</td><td></td></tr><tr><td>累计应纳税额</td><td></td></tr><tr><td>累计已缴纳税额</td><td></td></tr><tr><td>当月个税(应补税额)</td><td></td></tr><tr><td>税后收入(月)</td><td></td></tr></tbody></table>`;
    } else {
        document.getElementById('annualBonus').value = '';
        document.getElementById('bonusTaxMethod').value = 'separate';
        document.getElementById('taxResult').innerHTML = `<h3>年终奖金个税计算结果</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody><tr><td>年终奖金</td><td></td></tr><tr><td>适用税率</td><td></td></tr><tr><td>速算扣除数</td><td></td></tr><tr><td>应纳税额</td><td></td></tr><tr><td>税后奖金</td><td></td></tr></tbody></table>`;
    }
}
