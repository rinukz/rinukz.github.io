// Mock Data for the General Ledger Simulator
const generalLedgerData = [
  { date: '2026-07-01', code: 'JV-001', account: 'เงินสด (Cash)', desc: 'ยอดยกมาจากงวดก่อน', debit: 150000, credit: 0, type: 'deposit' },
  { date: '2026-07-02', code: 'RV-001', account: 'รายได้จากการขาย (Sales Revenue)', desc: 'รับเงินค่าขายสินค้าบริการ', debit: 45000, credit: 0, type: 'deposit' },
  { date: '2026-07-03', code: 'PV-001', account: 'เจ้าหนี้การค้า (Accounts Payable)', desc: 'ชำระหนี้ค่าวัตถุดิบงวดก่อน', debit: 0, credit: 25000, type: 'withdraw' },
  { date: '2026-07-04', code: 'JV-002', account: 'อุปกรณ์สำนักงาน (Office Equipment)', desc: 'ซื้อคอมพิวเตอร์ทำงานใหม่', debit: 32000, credit: 0, type: 'deposit' },
  { date: '2026-07-04', code: 'PV-002', account: 'เงินสด (Cash)', desc: 'ซื้ออุปกรณ์สำนักงานเป็นเงินสด', debit: 0, credit: 32000, type: 'withdraw' },
  { date: '2026-07-05', code: 'RV-002', account: 'ลูกหนี้การค้า (Accounts Receivable)', desc: 'ตั้งลูกหนี้บริการจัดทำบัญชีรายเดือน', debit: 18000, credit: 0, type: 'deposit' },
  { date: '2026-07-05', code: 'JV-003', account: 'รายได้ค่าบริการ (Service Revenue)', desc: 'ตั้งรายได้บริการค้างรับ', debit: 0, credit: 18000, type: 'withdraw' },
  { date: '2026-07-06', code: 'PV-003', account: 'ค่าสาธารณูปโภค (Utility Expense)', desc: 'จ่ายค่าน้ำค่าไฟฟ้าสำนักงาน', debit: 4800, credit: 0, type: 'deposit' },
  { date: '2026-07-06', code: 'PV-003', account: 'เงินสด (Cash)', desc: 'จ่ายค่าสาธารณูปโภคเป็นเงินสด', debit: 0, credit: 4800, type: 'withdraw' },
  { date: '2026-07-07', code: 'RV-003', account: 'เงินสด (Cash)', desc: 'รับชำระหนี้จากลูกหนี้การค้า', debit: 10000, credit: 0, type: 'deposit' }
];

const balanceSheetData = [
  { date: '2026-07-07', code: 'ASSET-01', account: 'เงินสดและรายการเทียบเท่าเงินสด', desc: 'ยอดคงเหลือสินทรัพย์หมุนเวียน', debit: 168200, credit: 0, type: 'deposit' },
  { date: '2026-07-07', code: 'ASSET-02', account: 'ลูกหนี้การค้าสุทธิ', desc: 'ยอดคงเหลือลูกหนี้การค้าหักค่าเผื่อ', debit: 8000, credit: 0, type: 'deposit' },
  { date: '2026-07-07', code: 'ASSET-03', account: 'อุปกรณ์สำนักงานสุทธิ', desc: 'ราคาทุนหักค่าเสื่อมราคาสะสม', debit: 32000, credit: 0, type: 'deposit' },
  { date: '2026-07-07', code: 'LIAB-01', account: 'เจ้าหนี้การค้า', desc: 'ยอดค้างชำระเจ้าหนี้การค้า', debit: 0, credit: 0, type: 'draft' },
  { date: '2026-07-07', code: 'EQUITY-01', account: 'ทุนเรือนหุ้น / กำไรสะสม', desc: 'ส่วนของเจ้าของ', debit: 0, credit: 208200, type: 'withdraw' }
];

const incomeStatementData = [
  { date: '2026-07-07', code: 'REV-01', account: 'รายได้จากการขายสินค้า', desc: 'รายได้สะสมประจำงวด', debit: 0, credit: 45000, type: 'withdraw' },
  { date: '2026-07-07', code: 'REV-02', account: 'รายได้จากการบริการ', desc: 'รายได้บริการจัดทำบัญชีสะสม', debit: 0, credit: 18000, type: 'withdraw' },
  { date: '2026-07-07', code: 'EXP-01', account: 'ต้นทุนขายและการบริการ', desc: 'ต้นทุนการผลิตและบริการสะสม', debit: 25000, credit: 0, type: 'deposit' },
  { date: '2026-07-07', code: 'EXP-02', account: 'ค่าสาธารณูปโภคสำนักงาน', desc: 'ค่าน้ำค่าไฟสำนักงานสะสม', debit: 4800, credit: 0, type: 'deposit' },
  { date: '2026-07-07', code: 'NET-01', account: 'กำไรสุทธิประจำงวด (Net Profit)', desc: 'รายได้สุทธิหลังหักค่าใช้จ่าย', debit: 0, credit: 33200, type: 'draft' }
];

// Current State
let currentTab = 'gl'; // 'gl', 'bs', 'is'
let currentFilter = 'all'; // 'all', 'deposit', 'withdraw'
let searchQuery = '';

// DOM Elements
let tableBody, searchInput, filterButtons, tabButtons, emailBox, copyToast;

// Format Currency
function formatCurrency(amount) {
  if (amount === 0) return '-';
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
}

// Get active data array
function getActiveData() {
  switch (currentTab) {
    case 'bs': return balanceSheetData;
    case 'is': return incomeStatementData;
    case 'gl':
    default:
      return generalLedgerData;
  }
}

// Render Table Data
function renderTable() {
  if (!tableBody) return;
  
  const rawData = getActiveData();
  
  // Filter and search
  const filteredData = rawData.filter(item => {
    // 1. Filter type
    if (currentFilter !== 'all' && item.type !== currentFilter) {
      return false;
    }
    // 2. Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchAccount = item.account.toLowerCase().includes(query);
      const matchDesc = item.desc.toLowerCase().includes(query);
      const matchCode = item.code.toLowerCase().includes(query);
      return matchAccount || matchDesc || matchCode;
    }
    return true;
  });

  // Generate HTML
  if (filteredData.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">
          ไม่พบรายการข้อมูลบัญชีที่ค้นหา
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filteredData.map(item => `
    <tr>
      <td class="numbers">${item.date}</td>
      <td class="numbers" style="color: var(--text-muted); font-weight: 500;">${item.code}</td>
      <td style="font-weight: 500; color: var(--text-primary);">${item.account}</td>
      <td>${item.desc}</td>
      <td>
        <span class="badge badge-${item.type}">
          ${item.type === 'deposit' ? 'เดบิต / สินทรัพย์' : item.type === 'withdraw' ? 'เครดิต / หนี้สิน' : 'ยอดสะสม/ปรับปรุง'}
        </span>
      </td>
      <td class="number-cell number-debit">${formatCurrency(item.debit)}</td>
      <td class="number-cell number-credit">${formatCurrency(item.credit)}</td>
    </tr>
  `).join('');
}

// Set up UI listeners
document.addEventListener('DOMContentLoaded', () => {
  // Bind Elements
  tableBody = document.getElementById('ledger-table-body');
  searchInput = document.getElementById('search-input');
  filterButtons = document.querySelectorAll('.filter-btn');
  tabButtons = document.querySelectorAll('.tab-btn');
  emailBox = document.getElementById('email-copy-box');
  copyToast = document.getElementById('copy-toast');

  // Search logic
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderTable();
    });
  }

  // Filter type buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderTable();
    });
  });

  // Report tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      
      // Reset filter status
      currentFilter = 'all';
      filterButtons.forEach(b => {
        if (b.dataset.filter === 'all') b.classList.add('active');
        else b.classList.remove('active');
      });
      
      renderTable();
    });
  });

  // Copy Email Logic
  if (emailBox) {
    emailBox.addEventListener('click', () => {
      const email = 'rinukzstore@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        // Show Toast
        if (copyToast) {
          copyToast.classList.add('show');
          setTimeout(() => {
            copyToast.classList.remove('show');
          }, 2500);
        }
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // Initial render
  renderTable();
});
