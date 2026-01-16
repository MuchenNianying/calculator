# 【开源项目】多功能在线计算器 - 集成个税、房贷、汇率等8大实用工具

## 📖 项目简介

在日常工作和生活中，我们经常需要进行各种计算：计算个税、规划房贷、转换汇率、换算单位等等。为了方便大家，我开发了一个**多功能在线计算器**，集成了8种常用的计算工具，无需下载安装，打开浏览器即可使用。

### 🌟 项目亮点

- **完全免费开源**：基于MIT协议，代码完全开源
- **无需安装**：纯前端实现，打开浏览器即可使用
- **响应式设计**：支持PC端和移动端访问
- **数据安全**：所有计算都在本地完成，不上传任何数据
- **部署便捷**：基于Cloudflare Workers，全球访问速度快
- **功能丰富**：涵盖个税、房贷、汇率、单位转换等8大功能

## 🚀 在线体验

**项目地址**：https://calculator.de5.net

**备用地址**：https://mcny.dpdns.org

> 💡 提示：建议使用Chrome浏览器访问以获得最佳体验

## 🎯 功能介绍

### 1️⃣ 个税计算器 🧮

**功能特点**：
- 支持工资薪金和年终奖两种计税方式
- 包含专项附加扣除计算（子女教育、继续教育、大病医疗、住房贷款利息、住房租金、赡养老人、3岁以下婴幼儿照护）
- 支持五险一金计算
- 自动计算应纳税所得额和应纳税额

**使用场景**：
- 月底工资条核对
- 年终奖税务规划
- 离职补偿金计算
- 自由职业者个税估算

### 2️⃣ 房贷计算器 🏠

**功能特点**：
- 支持三种贷款类型：商业贷款、公积金贷款、组合贷款
- 支持两种还款方式：等额本息、等额本金
- **还款计划明细功能**：
  - 弹出层展示详细还款计划，不占用主页面空间
  - 支持分页浏览（10/20/50/100条/页）
  - 组合贷款支持分别查看合计、商业贷款、公积金贷款明细
  - 包含期数、月供、本金、利息、剩余本金等详细信息
  - 分页功能固定在弹出层底部，不会因数据量变化而移动
  - 支持首页、上一页、下一页、末页、页码跳转和分页大小切换
- 计算结果包含：贷款总额、月供、还款总额、支付利息、还款月数

**使用场景**：
- 购房前贷款规划
- 提前还款计算
- 不同贷款方案对比
- 还款计划查看

### 3️⃣ 汇率转换 💱

**功能特点**：
- 支持全球多种主要货币（人民币、美元、欧元、日元、英镑等）
- 实时汇率转换
- 可搜索货币列表
- 支持双向转换

**使用场景**：
- 海外购物价格换算
- 出差费用预算
- 外汇投资参考
- 跨境贸易计算

### 4️⃣ 大写数字转换 🔢

**功能特点**：
- 将阿拉伯数字转换为中文大写数字
- 适用于财务、会计、合同、发票等正式场合
- 自动处理零的正确使用
- 支持整数和小数转换

**使用场景**：
- 财务票据填写
- 合同金额书写
- 发票金额转换
- 正式文档编写

### 5️⃣ 单位转换 📐

**支持9种物理量的单位转换**：
- **长度转换**：毫米、厘米、米、千米、英寸、英尺、码、英里
- **面积转换**：平方米、平方厘米、平方千米、英亩、公顷、平方英尺、平方英寸
- **体积转换**：毫升、升、立方米、加仑、品脱、夸脱
- **重量转换**：克、千克、吨、磅、盎司、英石
- **温度转换**：摄氏度、华氏度、开尔文
- **压强转换**：帕斯卡、千帕、兆帕、巴、磅/平方英寸、标准大气压
- **时间转换**：毫秒、秒、分钟、小时、天、周、月、年
- **速度转换**：米/秒、千米/小时、英里/小时、节
- **功率转换**：瓦特、千瓦、马力、公制马力

**使用场景**：
- 工程设计计算
- 科学研究
- 日常生活换算
- 跨国业务沟通

### 6️⃣ 程序员工具 💻

**功能特点**：
- **进制转换**：支持二进制、八进制、十进制、十六进制之间的相互转换
- **数据转换**：支持字节、千字节、兆字节、吉字节、太字节、拍字节的转换

**使用场景**：
- 程序开发调试
- 数据存储计算
- 网络带宽换算
- 系统配置优化

### 7️⃣ BMI计算器 📊

**功能特点**：
- 根据身高体重计算身体质量指数
- 提供健康评估建议
- 显示BMI标准范围

**使用场景**：
- 健康状况评估
- 减肥计划制定
- 健身目标设定
- 医疗参考

## 💻 技术实现

### 技术栈

- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **部署平台**：Cloudflare Workers
- **开发工具**：Wrangler CLI

### 项目结构

```
calculator/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # JavaScript逻辑
├── package.json        # 项目配置
├── wrangler.toml       # Cloudflare Workers配置
├── src/
│   ├── index.js        # Workers入口文件
│   └── ads.txt         # 广告配置
└── README.md           # 项目文档
```

### 核心功能实现

#### 1. 个税计算器实现

个税计算器基于最新的个人所得税法，实现了累计预扣法计算：

```javascript
function calculateIncomeTax() {
    // 获取输入参数
    const salary = parseFloat(document.getElementById('salary').value);
    const insurance = parseFloat(document.getElementById('insurance').value) || 0;
    const deduction = parseFloat(document.getElementById('deduction').value) || 0;
    
    // 计算应纳税所得额
    const taxableIncome = salary - insurance - 5000 - deduction;
    
    // 根据税率表计算应纳税额
    let tax = 0;
    if (taxableIncome > 0) {
        // 实现税率表逻辑
        // ...
    }
    
    return tax;
}
```

#### 2. 房贷计算器实现

房贷计算器实现了等额本息和等额本金两种还款方式的计算：

**等额本息公式**：
```
月供 = [贷款本金 × 月利率 × (1 + 月利率)^还款月数] ÷ [(1 + 月利率)^还款月数 - 1]
```

**等额本金公式**：
```
每月本金 = 贷款本金 ÷ 还款月数
每月利息 = (贷款本金 - 已还本金) × 月利率
每月还款 = 每月本金 + 每月利息
```

#### 3. 还款计划明细实现

还款计划明细功能采用了弹出层+分页的设计：

```javascript
function showScheduleModal() {
    const modal = document.getElementById('scheduleModal');
    modal.style.display = 'flex';
    
    // 根据贷款类型显示相应的数据
    const loanType = getCurrentLoanType();
    if (loanType === 'combination') {
        document.getElementById('modalCombinationButtons').style.display = 'flex';
    }
    
    // 初始化分页
    currentPage = 1;
    showModalCombinationSchedule(currentScheduleType);
}

function showModalCombinationSchedule(type) {
    // 获取对应类型的还款计划数据
    let scheduleData = getScheduleData(type);
    
    // 计算分页
    const totalPages = Math.ceil(scheduleData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = scheduleData.slice(startIndex, endIndex);
    
    // 渲染数据
    renderScheduleData(pageData);
    
    // 更新分页控件
    updatePaginationControls(totalPages);
}
```

#### 4. 汇率转换实现

汇率转换使用了实时汇率API：

```javascript
async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    // 获取实时汇率
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    
    // 计算转换结果
    const result = amount * exchangeRate;
    
    // 显示结果
    document.getElementById('result').textContent = result.toFixed(2);
}
```

#### 5. 大写数字转换实现

大写数字转换实现了完整的中文数字转换逻辑：

```javascript
function convertToChineseNumber(num) {
    const chineseNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const chineseUnits = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿'];
    
    // 实现转换逻辑
    // 处理整数部分
    // 处理小数部分
    // 处理零的特殊情况
    
    return chineseNumber;
}
```

## 📦 部署指南

### 前置要求

- Node.js (v16 或更高版本)
- npm 或 yarn
- Wrangler CLI

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 `http://localhost:8788` 查看应用。

### 部署到 Cloudflare Workers

```bash
npm run deploy
```

## 🎨 界面设计

### 设计理念

- **简洁明了**：界面设计简洁，操作流程清晰
- **响应式布局**：适配各种屏幕尺寸
- **用户友好**：提供清晰的操作提示和错误反馈
- **视觉舒适**：采用柔和的配色方案，减少视觉疲劳

### 核心界面

1. **首页**：展示所有计算工具的入口，采用卡片式布局
2. **计算页面**：每个计算器都有独立的页面，包含输入表单和结果显示区域
3. **结果展示**：计算结果以表格或列表形式展示，清晰易读
4. **弹出层**：还款计划明细等详细信息以弹出层形式展示

## 🔧 使用教程

### 个税计算器使用教程

1. 输入税前工资
2. 选择社保公积金缴纳方式（可选）
3. 输入专项附加扣除金额（可选）
4. 选择计税方式（工资薪金或年终奖）
5. 点击"计算"按钮获取结果

### 房贷计算器使用教程

1. 选择贷款类型（商业贷款、公积金贷款或组合贷款）
2. 输入贷款金额和年利率
3. 选择贷款年限和还款方式
4. 点击"计算"按钮获取计算结果
5. 点击"还款计划明细"按钮查看详细还款计划（仅在计算完成后可用）
6. 在弹出层中使用分页控件浏览还款计划

### 汇率转换使用教程

1. 输入要转换的金额
2. 选择原始货币
3. 选择目标货币
4. 点击"转换"按钮获取结果

### 大写数字转换使用教程

1. 输入要转换的数字
2. 点击"转换为大写"按钮获取结果

### 单位转换使用教程

1. 选择要转换的物理量类别
2. 输入数值
3. 选择原始单位和目标单位
4. 点击"转换"按钮获取结果

### 程序员工具使用教程

1. 选择工具类别（进制转换或数据转换）
2. 输入要转换的数值
3. 选择转换的源格式和目标格式
4. 点击"转换"按钮获取结果

### BMI计算器使用教程

1. 输入身高（厘米）
2. 输入体重（千克）
3. 点击"计算BMI"按钮获取结果

## 🌐 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 其他现代浏览器

## 📝 更新日志

### v1.0.0
- 初始版本发布
- 实现个税计算器
- 实现房贷计算器（含还款计划明细功能）
- 实现汇率转换
- 实现大写数字转换
- 实现单位转换
- 实现程序员工具
- 实现BMI计算器

## 🔮 未来规划

- [ ] 添加更多计算工具（如投资回报计算、退休规划等）
- [ ] 支持数据导出功能（PDF、Excel等格式）
- [ ] 添加计算历史记录功能
- [ ] 支持多语言界面
- [ ] 优化移动端体验
- [ ] 添加离线使用支持（PWA）

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 👨‍💻 作者

**MuchenNianying** - 项目开发者

## 📧 联系方式

- **GitHub**：https://github.com/MuchenNianying/calculator

## ⚠️ 免责声明

本工具提供的计算结果仅供参考，不构成任何投资、医疗、法律等专业建议。实际结果可能因各种因素而有所不同，请以官方渠道或专业人士的意见为准。本站不对因使用本站信息而导致的任何损失承担责任。

## 🙏 致谢

感谢所有为本项目做出贡献的开发者和用户！

---

**如果觉得这个项目对你有帮助，欢迎给个 ⭐ Star 支持一下！**

**项目地址**：https://calculator.de5.net

**备用地址**：https://mcny.dpdns.org

**GitHub地址**：https://github.com/MuchenNianying/calculator
