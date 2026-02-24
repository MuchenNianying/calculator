let mortgageScheduleData = [];
let commercialScheduleData = [];
let providentScheduleData = [];
let currentLoanType = '';
let currentPage = 1;
let itemsPerPage = 10;
let currentScheduleType = 'total';

function switchLoanType(type) {
    const options = document.querySelectorAll('.loan-type-option');
    options.forEach(opt => opt.classList.remove('active'));
    
    const activeOption = document.querySelector(`.loan-type-option[onclick="switchLoanType('${type}')"]`);
    if (activeOption) {
        activeOption.classList.add('active');
    }
    
    document.getElementById('commercialLoan').style.display = type === 'commercial' ? 'block' : 'none';
    document.getElementById('providentLoan').style.display = type === 'provident' ? 'block' : 'none';
    document.getElementById('combinationLoan').style.display = type === 'combination' ? 'block' : 'none';
    document.getElementById('commonLoanInputs').style.display = type === 'combination' ? 'none' : 'block';
    
    document.getElementById('mortgageResult').innerHTML = `
        <h3>计算结果</h3>
        <table class="schedule-table">
            <thead><tr><th>项目</th><th>数值</th></tr></thead>
            <tbody>
                <tr><td>贷款总额</td><td></td></tr>
                <tr><td>贷款类型</td><td></td></tr>
                <tr><td>还款方式</td><td></td></tr>
                <tr><td>月供</td><td></td></tr>
                <tr><td>还款总额</td><td></td></tr>
                <tr><td>支付利息</td><td></td></tr>
                <tr><td>还款月数</td><td></td></tr>
            </tbody>
        </table>
    `;
    document.getElementById('scheduleBtn').disabled = true;
}

function calculateMortgage() {
    const loanType = document.querySelector('.loan-type-option.active').getAttribute('onclick').match(/switchLoanType\('(.+?)'\)/)[1];
    currentLoanType = loanType;
    let loanYears, repaymentType;
    
    if (loanType === 'combination') {
        const commercialYears = parseInt(document.getElementById('commercialYears').value);
        const providentYears = parseInt(document.getElementById('providentYears').value);
        
        if (isNaN(commercialYears) || commercialYears <= 0 || commercialYears > 30) {
            alert('请输入有效的商业贷款年限（1-30年）');
            return;
        }
        if (isNaN(providentYears) || providentYears <= 0 || providentYears > 30) {
            alert('请输入有效的公积金贷款年限（1-30年）');
            return;
        }
        loanYears = Math.max(commercialYears, providentYears);
        repaymentType = null;
    } else {
        loanYears = parseInt(document.getElementById('loanYears').value);
        repaymentType = document.getElementById('repaymentType').value;
        
        if (isNaN(loanYears) || loanYears <= 0 || loanYears > 30) {
            alert('请输入有效的贷款年限（1-30年）');
            return;
        }
    }

    let loanAmountTotal, monthlyRate, totalMonths;
    let commercialLoanAmount = 0, commercialMonthlyRate = 0;
    let providentLoanAmount = 0, providentMonthlyRate = 0;

    if (loanType === 'commercial') {
        const loanAmount = parseFloat(document.getElementById('loanAmount').value);
        const annualRate = parseFloat(document.getElementById('interestRate').value);
        if (isNaN(loanAmount) || loanAmount <= 0) { alert('请输入有效的贷款金额'); return; }
        if (isNaN(annualRate) || annualRate <= 0) { alert('请输入有效的年利率'); return; }
        loanAmountTotal = loanAmount * 10000;
        monthlyRate = annualRate / 100 / 12;
    } else if (loanType === 'provident') {
        const providentAmount = parseFloat(document.getElementById('providentAmount').value);
        const providentRate = parseFloat(document.getElementById('providentRate').value);
        if (isNaN(providentAmount) || providentAmount <= 0) { alert('请输入有效的公积金贷款金额'); return; }
        if (isNaN(providentRate) || providentRate <= 0) { alert('请输入有效的公积金年利率'); return; }
        loanAmountTotal = providentAmount * 10000;
        monthlyRate = providentRate / 100 / 12;
    } else if (loanType === 'combination') {
        commercialLoanAmount = parseFloat(document.getElementById('commercialAmount').value);
        commercialMonthlyRate = parseFloat(document.getElementById('commercialRate').value) / 100 / 12;
        providentLoanAmount = parseFloat(document.getElementById('providentAmountComb').value);
        providentMonthlyRate = parseFloat(document.getElementById('providentRateComb').value) / 100 / 12;
        if (isNaN(commercialLoanAmount) || commercialLoanAmount <= 0) { alert('请输入有效的商业贷款金额'); return; }
        if (isNaN(providentLoanAmount) || providentLoanAmount <= 0) { alert('请输入有效的公积金贷款金额'); return; }
        if (isNaN(commercialMonthlyRate) || commercialMonthlyRate <= 0) { alert('请输入有效的商业贷款年利率'); return; }
        if (isNaN(providentMonthlyRate) || providentMonthlyRate <= 0) { alert('请输入有效的公积金贷款年利率'); return; }
        loanAmountTotal = (commercialLoanAmount + providentLoanAmount) * 10000;
        monthlyRate = null;
    }

    totalMonths = loanYears * 12;
    let monthlyPayment, totalPayment, totalInterest;
    let resultHTML = '';

    if (loanType === 'combination') {
        const commercialYears = parseInt(document.getElementById('commercialYears').value);
        const providentYears = parseInt(document.getElementById('providentYears').value);
        const commercialRepaymentType = document.getElementById('commercialRepaymentType').value;
        const providentRepaymentType = document.getElementById('providentRepaymentType').value;
        const commercialTotalMonths = commercialYears * 12;
        const providentTotalMonths = providentYears * 12;
        
        let commercialMonthlyPayment, commercialTotalPayment, commercialTotalInterest;
        let providentMonthlyPayment, providentTotalPayment, providentTotalInterest;
        commercialScheduleData = [];
        providentScheduleData = [];
        
        if (commercialRepaymentType === 'equal') {
            commercialMonthlyPayment = (commercialLoanAmount * 10000 * commercialMonthlyRate * Math.pow(1 + commercialMonthlyRate, commercialTotalMonths)) / (Math.pow(1 + commercialMonthlyRate, commercialTotalMonths) - 1);
            commercialTotalPayment = commercialMonthlyPayment * commercialTotalMonths;
            commercialTotalInterest = commercialTotalPayment - (commercialLoanAmount * 10000);
            let commercialRemaining = commercialLoanAmount * 10000;
            for (let i = 1; i <= commercialTotalMonths; i++) {
                const commercialInterest = commercialRemaining * commercialMonthlyRate;
                const commercialPrincipal = commercialMonthlyPayment - commercialInterest;
                commercialRemaining -= commercialPrincipal;
                if (commercialRemaining < 0) commercialRemaining = 0;
                commercialScheduleData.push({ month: i, payment: commercialMonthlyPayment, principal: commercialPrincipal, interest: commercialInterest, remaining: commercialRemaining });
            }
        } else {
            const commercialPrincipalPerMonth = (commercialLoanAmount * 10000) / commercialTotalMonths;
            commercialTotalPayment = 0;
            let commercialRemaining = commercialLoanAmount * 10000;
            for (let i = 1; i <= commercialTotalMonths; i++) {
                const commercialInterest = commercialRemaining * commercialMonthlyRate;
                const commercialPayment = commercialPrincipalPerMonth + commercialInterest;
                commercialTotalPayment += commercialPayment;
                commercialRemaining -= commercialPrincipalPerMonth;
                if (commercialRemaining < 0) commercialRemaining = 0;
                commercialScheduleData.push({ month: i, payment: commercialPayment, principal: commercialPrincipalPerMonth, interest: commercialInterest, remaining: commercialRemaining });
            }
            commercialMonthlyPayment = commercialTotalPayment / commercialTotalMonths;
            commercialTotalInterest = commercialTotalPayment - (commercialLoanAmount * 10000);
        }
        
        if (providentRepaymentType === 'equal') {
            providentMonthlyPayment = (providentLoanAmount * 10000 * providentMonthlyRate * Math.pow(1 + providentMonthlyRate, providentTotalMonths)) / (Math.pow(1 + providentMonthlyRate, providentTotalMonths) - 1);
            providentTotalPayment = providentMonthlyPayment * providentTotalMonths;
            providentTotalInterest = providentTotalPayment - (providentLoanAmount * 10000);
            let providentRemaining = providentLoanAmount * 10000;
            for (let i = 1; i <= providentTotalMonths; i++) {
                const providentInterest = providentRemaining * providentMonthlyRate;
                const providentPrincipal = providentMonthlyPayment - providentInterest;
                providentRemaining -= providentPrincipal;
                if (providentRemaining < 0) providentRemaining = 0;
                providentScheduleData.push({ month: i, payment: providentMonthlyPayment, principal: providentPrincipal, interest: providentInterest, remaining: providentRemaining });
            }
        } else {
            const providentPrincipalPerMonth = (providentLoanAmount * 10000) / providentTotalMonths;
            providentTotalPayment = 0;
            let providentRemaining = providentLoanAmount * 10000;
            for (let i = 1; i <= providentTotalMonths; i++) {
                const providentInterest = providentRemaining * providentMonthlyRate;
                const providentPayment = providentPrincipalPerMonth + providentInterest;
                providentTotalPayment += providentPayment;
                providentRemaining -= providentPrincipalPerMonth;
                if (providentRemaining < 0) providentRemaining = 0;
                providentScheduleData.push({ month: i, payment: providentPayment, principal: providentPrincipalPerMonth, interest: providentInterest, remaining: providentRemaining });
            }
            providentMonthlyPayment = providentTotalPayment / providentTotalMonths;
            providentTotalInterest = providentTotalPayment - (providentLoanAmount * 10000);
        }
        
        loanAmountTotal = (commercialLoanAmount + providentLoanAmount) * 10000;
        monthlyPayment = commercialMonthlyPayment + providentMonthlyPayment;
        totalPayment = commercialTotalPayment + providentTotalPayment;
        totalInterest = commercialTotalInterest + providentTotalInterest;
        
        mortgageScheduleData = [];
        const maxMonths = Math.max(commercialTotalMonths, providentTotalMonths);
        for (let i = 1; i <= maxMonths; i++) {
            const commercialData = commercialScheduleData[i - 1] || { payment: 0, principal: 0, interest: 0, remaining: 0 };
            const providentData = providentScheduleData[i - 1] || { payment: 0, principal: 0, interest: 0, remaining: 0 };
            mortgageScheduleData.push({ month: i, payment: commercialData.payment + providentData.payment, principal: commercialData.principal + providentData.principal, interest: commercialData.interest + providentData.interest, remaining: commercialData.remaining + providentData.remaining });
        }
        
        resultHTML = `<h3>组合贷款计算结果</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody>
            <tr><td>贷款总额</td><td>¥${loanAmountTotal.toLocaleString()}</td></tr>
            <tr><td>贷款类型</td><td>组合贷款</td></tr>
            <tr><td>还款方式</td><td>商业贷款：${commercialRepaymentType === 'equal' ? '等额本息' : '等额本金'}，公积金贷款：${providentRepaymentType === 'equal' ? '等额本息' : '等额本金'}</td></tr>
            <tr><td>${(commercialRepaymentType === 'equal' && providentRepaymentType === 'equal') ? '月供' : '平均月供'}</td><td>¥${monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            <tr><td>还款总额</td><td>¥${totalPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            <tr><td>支付利息</td><td>¥${totalInterest.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            </tbody></table>
            <h3>商业贷款明细</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody>
            <tr><td>商业贷款金额</td><td>¥${(commercialLoanAmount * 10000).toLocaleString()}</td></tr>
            <tr><td>商业贷款年利率</td><td>${(commercialMonthlyRate * 12 * 100).toFixed(2)}%</td></tr>
            <tr><td>商业贷款年限</td><td>${commercialYears} 年</td></tr>
            <tr><td>${commercialRepaymentType === 'equal' ? '商业贷款月供' : '商业贷款平均月供'}</td><td>¥${commercialMonthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            <tr><td>商业贷款还款总额</td><td>¥${commercialTotalPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            <tr><td>商业贷款支付利息</td><td>¥${commercialTotalInterest.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            </tbody></table>
            <h3>公积金贷款明细</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody>
            <tr><td>公积金贷款金额</td><td>¥${(providentLoanAmount * 10000).toLocaleString()}</td></tr>
            <tr><td>公积金贷款年利率</td><td>${(providentMonthlyRate * 12 * 100).toFixed(2)}%</td></tr>
            <tr><td>公积金贷款年限</td><td>${providentYears} 年</td></tr>
            <tr><td>${providentRepaymentType === 'equal' ? '公积金贷款月供' : '公积金贷款平均月供'}</td><td>¥${providentMonthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            <tr><td>公积金贷款还款总额</td><td>¥${providentTotalPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            <tr><td>公积金贷款支付利息</td><td>¥${providentTotalInterest.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            </tbody></table>`;
    } else {
        if (repaymentType === 'equal') {
            monthlyPayment = (loanAmountTotal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
            totalPayment = monthlyPayment * totalMonths;
            mortgageScheduleData = [];
            let remainingPrincipal = loanAmountTotal;
            for (let i = 1; i <= totalMonths; i++) {
                const interestPayment = remainingPrincipal * monthlyRate;
                const principalPayment = monthlyPayment - interestPayment;
                remainingPrincipal -= principalPayment;
                if (remainingPrincipal < 0) remainingPrincipal = 0;
                mortgageScheduleData.push({ month: i, payment: monthlyPayment, principal: principalPayment, interest: interestPayment, remaining: remainingPrincipal });
            }
        } else {
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
                mortgageScheduleData.push({ month: i, payment: paymentThisMonth, principal: principalPerMonth, interest: interestThisMonth, remaining: remainingPrincipal });
            }
            totalPayment = totalPaymentTemp;
            monthlyPayment = totalPayment / totalMonths;
        }
        totalInterest = totalPayment - loanAmountTotal;
        resultHTML = `<h3>计算结果</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody>
            <tr><td>贷款总额</td><td>¥${loanAmountTotal.toLocaleString()}</td></tr>
            <tr><td>贷款类型</td><td>${loanType === 'commercial' ? '商业贷款' : '公积金贷款'}</td></tr>
            <tr><td>还款方式</td><td>${repaymentType === 'equal' ? '等额本息' : '等额本金'}</td></tr>
            <tr><td>${repaymentType === 'equal' ? '月供' : '平均月供'}</td><td>¥${monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            <tr><td>还款总额</td><td>¥${totalPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            <tr><td>支付利息</td><td>¥${totalInterest.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>
            <tr><td>还款月数</td><td>${totalMonths} 月</td></tr>
            </tbody></table>`;
    }
    
    document.getElementById('mortgageResult').innerHTML = resultHTML;
    document.getElementById('scheduleBtn').disabled = false;
}

function resetMortgage() {
    document.getElementById('loanAmount').value = '';
    document.getElementById('interestRate').value = '3.5';
    document.getElementById('loanYears').value = '';
    document.getElementById('mortgageResult').innerHTML = `<h3>计算结果</h3><table class="schedule-table"><thead><tr><th>项目</th><th>数值</th></tr></thead><tbody><tr><td>贷款总额</td><td></td></tr><tr><td>贷款类型</td><td></td></tr><tr><td>还款方式</td><td></td></tr><tr><td>月供</td><td></td></tr><tr><td>还款总额</td><td></td></tr><tr><td>支付利息</td><td></td></tr><tr><td>还款月数</td><td></td></tr></tbody></table>`;
    document.getElementById('scheduleBtn').disabled = true;
}

function showScheduleModal() {
    const modal = document.getElementById('scheduleModal');
    modal.style.display = 'flex';
    const loanType = document.querySelector('.loan-type-option.active').getAttribute('onclick').match(/switchLoanType\('(.+?)'\)/)[1];
    if (loanType === 'combination') {
        document.getElementById('modalCombinationButtons').style.display = 'flex';
        currentScheduleType = 'total';
    } else {
        document.getElementById('modalCombinationButtons').style.display = 'none';
        currentScheduleType = 'total';
    }
    currentPage = 1;
    showModalCombinationSchedule(currentScheduleType);
}

function closeScheduleModal() {
    document.getElementById('scheduleModal').style.display = 'none';
}

function showModalCombinationSchedule(type) {
    currentScheduleType = type;
    let data;
    if (type === 'commercial') {
        data = commercialScheduleData;
    } else if (type === 'provident') {
        data = providentScheduleData;
    } else {
        data = mortgageScheduleData;
    }
    renderScheduleTable(data);
}

function renderScheduleTable(data) {
    const tbody = document.getElementById('modalScheduleBody');
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = data.slice(start, end);
    
    let html = '';
    pageData.forEach(item => {
        html += `<tr>
            <td>${item.month}</td>
            <td>¥${item.payment.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
            <td>¥${item.principal.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
            <td>¥${item.interest.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
            <td>¥${item.remaining.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
        </tr>`;
    });
    tbody.innerHTML = html;
    document.getElementById('pageInfo').textContent = `第 ${currentPage} 页 / 共 ${totalPages} 页`;
    document.getElementById('jumpToPage').value = currentPage;
    updatePaginationButtons(totalPages);
}

function updatePaginationButtons(totalPages) {
    const buttons = document.querySelectorAll('.btn-pagination');
    buttons.forEach(btn => btn.disabled = false);
}

function changePage(delta) {
    let data = currentScheduleType === 'commercial' ? commercialScheduleData : currentScheduleType === 'provident' ? providentScheduleData : mortgageScheduleData;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    currentPage = Math.max(1, Math.min(totalPages, currentPage + delta));
    renderScheduleTable(data);
}

function goToFirstPage() {
    currentPage = 1;
    let data = currentScheduleType === 'commercial' ? commercialScheduleData : currentScheduleType === 'provident' ? providentScheduleData : mortgageScheduleData;
    renderScheduleTable(data);
}

function goToLastPage() {
    let data = currentScheduleType === 'commercial' ? commercialScheduleData : currentScheduleType === 'provident' ? providentScheduleData : mortgageScheduleData;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    currentPage = totalPages;
    renderScheduleTable(data);
}

function jumpToPage() {
    const page = parseInt(document.getElementById('jumpToPage').value);
    let data = currentScheduleType === 'commercial' ? commercialScheduleData : currentScheduleType === 'provident' ? providentScheduleData : mortgageScheduleData;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderScheduleTable(data);
    }
}

function changePageSize() {
    itemsPerPage = parseInt(document.getElementById('pageSizeSelect').value);
    currentPage = 1;
    let data = currentScheduleType === 'commercial' ? commercialScheduleData : currentScheduleType === 'provident' ? providentScheduleData : mortgageScheduleData;
    renderScheduleTable(data);
}
