/* JavaScript extracted from KINGSindex.html */
const API_URL = "https://script.google.com/macros/s/AKfycbwyFF1oidtXkciNuADDFwqFVyr5P4r7tZifMvY751KbNXgV6VLQD8RUc64qdNFkz8vglw/exec";

// Test manual
const el = document.getElementById('riwayat-list');
console.log('Element:', el);
console.log('Visible?', el.offsetWidth, el.offsetHeight);
console.log('Has content?', el.innerHTML.length);
console.log('Content preview:', el.innerHTML.substring(0, 200));

let chartLabaRugi = null;
let chartAset = null;
let chartBeban = null;
let chartLiabilitas = null;

async function loadData() {
    const res = await fetch(API_URL);
    const json = await res.json();
    return json.data || [];
}

async function loadAllDashboards() {
    const data = await loadData();

    renderRiwayat(data);
    renderDiagram(data);
    renderJurnalUmum(data);
    renderBukuBesar(data);
    renderNeracaSaldo(data);
    renderLaporanKeuangan(data);
    renderLaporanKas(data);
    renderLaporanModal(data);
}

function renderRiwayat(data) {
    const list = document.getElementById("riwayat-list");
    list.innerHTML = "";

    data.forEach(trx => {
        const div = document.createElement("div");
        div.className = "p-3 border bg-white rounded";
        div.textContent = trx.tanggal + " - " + trx.keterangan + " - Rp " + trx.nominal;
        list.appendChild(div);
    });
}
function renderDiagram(data) {
    const list = document.getElementById("diagram-list");
    list.innerHTML = "";

    data.forEach(trx => {
        const div = document.createElement("div");
        div.className = "p-3 border bg-white rounded";
        div.textContent = trx.tanggal + " - " + trx.keterangan + " - Rp " + trx.nominal;
        list.appendChild(div);
    });
}

function renderJurnalUmum(data) {
    const list = document.getElementById("jurnal-umum-list");
    list.innerHTML = "";

    data.forEach(trx => {
        const div = document.createElement("div");
        div.className = "p-3 border bg-white rounded";
        div.textContent = trx.tanggal + " - " + trx.keterangan + " - Rp " + trx.nominal;
        list.appendChild(div);
    });
}

function renderBukuBesar(data) {
    const list = document.getElementById("buku-besar-list");
    list.innerHTML = "";

    data.forEach(trx => {
        const div = document.createElement("div");
        div.className = "p-3 border bg-white rounded";
        div.textContent = trx.tanggal + " - " + trx.keterangan + " - Rp " + trx.nominal;
        list.appendChild(div);
    });
}function renderNeracaSaldo(data) {
    const list = document.getElementById("neraca-saldo-list");
    list.innerHTML = "";

    data.forEach(trx => {
        const div = document.createElement("div");
        div.className = "p-3 border bg-white rounded";
        div.textContent = trx.tanggal + " - " + trx.keterangan + " - Rp " + trx.nominal;
        list.appendChild(div);
    });
}

function renderLaporanKeuangan(data) {
    const list = document.getElementById("laporan-keuangan-list");
    list.innerHTML = "";

    data.forEach(trx => {
        const div = document.createElement("div");
        div.className = "p-3 border bg-white rounded";
        div.textContent = trx.tanggal + " - " + trx.keterangan + " - Rp " + trx.nominal;
        list.appendChild(div);
    });
}

function renderLaporanKas(data) {
    const list = document.getElementById("laporan-kas-list");
    list.innerHTML = "";

    data.forEach(trx => {
        const div = document.createElement("div");
        div.className = "p-3 border bg-white rounded";
        div.textContent = trx.tanggal + " - " + trx.keterangan + " - Rp " + trx.nominal;
        list.appendChild(div);
    });
}

function renderLaporanModal(data) {
    const list = document.getElementById("laporan-modal-list");
    list.innerHTML = "";

    data.forEach(trx => {
        const div = document.createElement("div");
        div.className = "p-3 border bg-white rounded";
        div.textContent = trx.tanggal + " - " + trx.keterangan + " - Rp " + trx.nominal;
        list.appendChild(div);
    });
}

// Login credentials
const ADMIN_ID = 'kingssteak';
const ADMIN_PASSWORD = 'kingssteak';
const OWNER_ID = 'KINGSSTEAK';
const OWNER_PASSWORD = 'KINGSSTEAK';

// Variable untuk menyimpan role user yang login
let currentUserRole = null;

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Fungsi login
function handleLogin(event) {
    event.preventDefault();

    const loginRole = document.getElementById('login-role').value;
    const loginId = document.getElementById('login-id').value.trim();
    const loginPassword = document.getElementById('login-password').value;

    if (!loginRole) {
        showToast('Pilih role terlebih dahulu!', 'error');
        return;
    }

    let isValid = false;

    if (loginRole === 'admin') {
        if (loginId === ADMIN_ID && loginPassword === ADMIN_PASSWORD) {
            isValid = true;
            currentUserRole = 'admin';
        }
    } else if (loginRole === 'owner') {
        if (loginId === OWNER_ID && loginPassword === OWNER_PASSWORD) {
            isValid = true;
            currentUserRole = 'owner';
        }
    }

    if (isValid) {
        // Sembunyikan login screen
        document.getElementById('login-screen').classList.add('hidden');
        
        // Tampilkan main app
        const mainApp = document.getElementById('main-app');
        mainApp.classList.remove('hidden');
        mainApp.classList.add('flex', 'flex-col');

        setupMenuByRole();

        showToast(`Login berhasil! Selamat datang ${currentUserRole === 'admin' ? 'Admin' : 'Owner'}.`, 'success');

        document.getElementById('form-login').reset();
    } else {
        showToast('Role, ID atau Password salah!', 'error');
        document.getElementById('login-password').value = '';
    }
}

// Fungsi untuk setup menu berdasarkan role
function setupMenuByRole() {
    if (currentUserRole === 'admin') {
        document.getElementById('tab-riwayat').style.display = 'none';
        document.getElementById('tab-rekap').style.display = 'none';
        document.getElementById('tab-jurnal-akuntansi').style.display = 'none';

        const tipeTransaksi = document.getElementById('tipe-transaksi');
        tipeTransaksi.innerHTML = `
            <option value="">Pilih Tipe Transaksi</option>
            <option value="Pemasukan">Pemasukan</option>
        `;

        const kategoriTransaksi = document.getElementById('kategori-transaksi');
        kategoriTransaksi.innerHTML = `
            <option value="">Pilih Kategori</option>
            <option value="Penjualan Makanan">Penjualan Makanan</option>
        `;

        const ringkasanSection = document.querySelector('#dashboard-kasir .bg-white.border.border-gray-200.rounded-lg.shadow-lg > .p-6:last-child');
        if (ringkasanSection) { ringkasanSection.style.display = 'none'; }

        switchDashboard('dashboard-kasir');
    } else if (currentUserRole === 'owner') {
        document.getElementById('tab-riwayat').style.display = 'block';
        document.getElementById('tab-rekap').style.display = 'block';
        document.getElementById('tab-jurnal-akuntansi').style.display = 'block';

        const tipeTransaksi = document.getElementById('tipe-transaksi');
        tipeTransaksi.innerHTML = `
            <option value="">Pilih Tipe Transaksi</option>
            <option value="Pemasukan">Pemasukan</option>
            <option value="Pengeluaran">Pengeluaran</option>
        `;

        const kategoriTransaksi = document.getElementById('kategori-transaksi');
        kategoriTransaksi.innerHTML = `
            <option value="">Pilih Kategori</option>
            <option value="Pembelian Bahan">Pembelian Bahan</option>
            <option value="Gaji Karyawan">Gaji Karyawan</option>
            <option value="Listrik & Air">Listrik & Air</option>
            <option value="Sewa Tempat">Sewa Tempat</option>
            <option value="Perawatan">Perawatan</option>
            <option value="Peralatan">Peralatan</option>
            <option value="Perlengkapan">Perlengkapan</option>
            <option value="Penyesuaian">Penyesuaian</option>
            <option value="Bangunan">Bangunan</option>
            <option value="Modal">Modal</option>
            <option value="Lainnya">Lainnya</option>
        `;

        const ringkasanSection = document.querySelector('#dashboard-kasir .bg-white.border.border-gray-200.rounded-lg.shadow-lg > .p-6:last-child');
        if (ringkasanSection) { ringkasanSection.style.display = 'block'; }
    }
}

// Fungsi logout
function handleLogout() {
    document.getElementById('main-app').classList.add('hidden');
    document.getElementById('main-app').classList.remove('flex');
    document.getElementById('login-screen').classList.remove('hidden');
    showToast('Logout berhasil.', 'success');

    currentUserRole = null;
    switchDashboard('dashboard-kasir');

    document.getElementById('tab-riwayat').style.display = 'block';
    document.getElementById('tab-rekap').style.display = 'block';
    document.getElementById('tab-jurnal-akuntansi').style.display = 'block';
}

// State aplikasi
let transaksiList = [];

// State untuk tracking periode dan arsip
let currentPeriod = { bulan: 11, tahun: 2025 };
let lastArchiveDate = null;
let hasArchivedThisMonth = false;

// Data handler untuk SDK
const dataHandler = {
    onDataChanged(data) {
        transaksiList = data;
        updateRingkasan();
        checkArchiveStatus();
        
        // Update semua dashboard saat data berubah
        renderRiwayat();
        renderJurnalUmum();
        renderBukuBesar();
        renderNeracaSaldo();
        renderLaporanKeuangan();
        renderLaporanKas();
        renderLaporanModal();
        renderDiagram();
    }
};

// Fungsi utilitas
function formatRupiah(angka) {
    return 'Rp ' + angka.toLocaleString('id-ID');
}

function updateDateTime() {
    const now = new Date();
    const elTanggal = document.getElementById('tanggal');
    const elWaktu = document.getElementById('waktu');
    if (elTanggal) elTanggal.textContent = now.toLocaleDateString('id-ID');
    if (elWaktu) elWaktu.textContent = now.toLocaleTimeString('id-ID');
}

function isEndOfMonth() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.getDate() === 1;
}

function checkArchiveStatus() {
    const today = new Date();
    const todayStr = today.toDateString();

    if (lastArchiveDate) {
        const lastArchive = new Date(lastArchiveDate);
        if (lastArchive.getMonth() !== today.getMonth() || lastArchive.getFullYear() !== today.getFullYear()) {
            hasArchivedThisMonth = false;
            lastArchiveDate = null;
        }
    }

    updateButtonStates();
}

function updateButtonStates() {
    const isLastDay = isEndOfMonth();

    const arsipButtons = [
        'btn-arsip-riwayat','btn-arsip-diagram','btn-arsip-jurnal-umum','btn-arsip-buku-besar','btn-arsip-neraca-saldo','btn-arsip-laporan-keuangan','btn-arsip-laporan-kas','btn-arsip-laporan-modal'
    ];
    const resetButtons = [
        'btn-reset-riwayat','btn-reset-diagram','btn-reset-jurnal-umum','btn-reset-buku-besar','btn-reset-neraca-saldo','btn-reset-laporan-keuangan','btn-reset-laporan-kas','btn-reset-laporan-modal'
    ];

    arsipButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            if (isLastDay && !hasArchivedThisMonth) {
                btn.disabled = false;
                btn.classList.remove('opacity-50','cursor-not-allowed');
            } else {
                btn.disabled = true;
                btn.classList.add('opacity-50','cursor-not-allowed');
                if (!isLastDay) btn.title = 'Arsip hanya dapat dilakukan di akhir bulan';
                else if (hasArchivedThisMonth) btn.title = 'Arsip bulan ini sudah dilakukan';
            }
        }
    });

    resetButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            if (hasArchivedThisMonth) {
                btn.disabled = false;
                btn.classList.remove('opacity-50','cursor-not-allowed');
            } else {
                btn.disabled = true;
                btn.classList.add('opacity-50','cursor-not-allowed');
                btn.title = 'Reset hanya dapat dilakukan setelah arsip';
            }
        }
    });
}

function getNamaBulan(bulan) {
    const namaBulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    return namaBulan[bulan-1];
}

function getPeriodeString() { return `Per ${getNamaBulan(currentPeriod.bulan)} ${currentPeriod.tahun}`; }

function updatePeriodeDisplay() {
    const periodeString = getPeriodeString();
    const periodeElements = document.querySelectorAll('.periode-display');
    periodeElements.forEach(el => el.textContent = periodeString);
}

function isToday(dateString) { const today = new Date(); const date = new Date(dateString); return date.toDateString() === today.toDateString(); }

function updateRingkasan() {
    const hariIni = transaksiList.filter(t => isToday(t.tanggal) && !t.is_jurnal_otomatis);

    const totalPemasukan = hariIni.filter(t => t.tipe_transaksi === 'Pemasukan').reduce((total,t)=> total + t.nominal, 0);
    const totalPengeluaran = hariIni.filter(t => t.tipe_transaksi === 'Pengeluaran').reduce((total,t)=> total + t.nominal, 0);
    const saldoBersih = totalPemasukan - totalPengeluaran;

    const elPemasukan = document.getElementById('total-pemasukan');
    const elPengeluaran = document.getElementById('total-pengeluaran');
    const elSaldo = document.getElementById('saldo-bersih');
    if (elPemasukan) elPemasukan.textContent = formatRupiah(totalPemasukan);
    if (elPengeluaran) elPengeluaran.textContent = formatRupiah(totalPengeluaran);
    if (elSaldo) elSaldo.textContent = formatRupiah(saldoBersih);

    if (elSaldo) elSaldo.className = saldoBersih >= 0 ? 'text-xl font-bold text-green-600' : 'text-xl font-bold text-red-600';
}

const keteranganMapping = {
    'Penjualan Makanan': ['Penjualan Tunai', 'Penjualan Non Tunai', 'Penjualan Kredit'],
    'Pembelian Bahan': ['Pembelian Bahan Baku Tunai', 'Pembelian Bahan Baku Non Tunai', 'Pembelian Bahan Baku Kredit'],
    'Gaji Karyawan': ['Membayar Gaji Tunai', 'Membayar Gaji Non Tunai', 'Belum Membayar Gaji'],
    'Listrik & Air': ['Membayar Listrik dan Air Tunai', 'Membayar Listrik dan Air Non Tunai', 'Belum Membayar Listrik dan Air'],
    'Sewa Tempat': ['Membayar Sewa Tempat Tunai', 'Membayar Sewa Tempat Non Tunai', 'Membayar Sewa Tempat Kredit'],
    'Perawatan': ['Membayar Perawatan Tunai', 'Membayar Perawatan Non Tunai', 'Membayar Perawatan Kredit'],
    'Peralatan': ['Membeli Peralatan Tunai', 'Membeli Peralatan Non Tunai', 'Membeli Peralatan Kredit'],
    'Perlengkapan': ['Membeli Perlengkapan Tunai', 'Membeli Perlengkapan Non Tunai', 'Membeli Perlengkapan Kredit'],
    'Penyesuaian': ['Penyesuaian Perlengkapan', 'Penyesuaian Peralatan', 'Penyesuaian Bangunan', 'Penyesuaian Sewa Tempat'],
    'Bangunan': ['Membeli Bangunan Tunai', 'Membeli Bangunan Non Tunai', 'Membeli Bangunan Kredit'],
    'Modal': ['Setoran Modal dari Owner', 'Setoran Modal dari Pinjaman', 'Prive']
};

function updateKeteranganOptions() {
    const kategori = document.getElementById('kategori-transaksi').value;
    const keteranganSelect = document.getElementById('keterangan-select');
    const keteranganInput = document.getElementById('keterangan-input');

    if (kategori === 'Lainnya') {
        keteranganSelect.classList.add('hidden');
        keteranganInput.classList.remove('hidden');
        keteranganInput.required = true;
        keteranganSelect.required = false;
    } else if (keteranganMapping[kategori]) {
        keteranganSelect.classList.remove('hidden');
        keteranganInput.classList.add('hidden');
        keteranganSelect.required = true;
        keteranganInput.required = false;
        keteranganSelect.innerHTML = '<option value="">Pilih Keterangan</option>';
        keteranganMapping[kategori].forEach(ket => {
            const option = document.createElement('option'); option.value = ket.toLowerCase(); option.textContent = ket; keteranganSelect.appendChild(option);
        });
    } else {
        keteranganSelect.classList.remove('hidden');
        keteranganInput.classList.add('hidden');
        keteranganSelect.innerHTML = '<option value="">Pilih Keterangan</option>';
    }
}

function toggleMenuFields() {
    const kategori = document.getElementById('kategori-transaksi').value;
    const menuContainer = document.getElementById('menu-container');
    const sausContainer = document.getElementById('saus-container');
    const nominalInput = document.getElementById('nominal-transaksi');
    updateKeteranganOptions();
    if (kategori === 'Penjualan Makanan') {
        menuContainer.classList.remove('hidden');
        nominalInput.readOnly = true; nominalInput.style.backgroundColor = '#f3f4f6'; nominalInput.placeholder = 'Otomatis terisi dari harga × unit';
    } else {
        menuContainer.classList.add('hidden'); sausContainer.classList.add('hidden'); nominalInput.readOnly = false; nominalInput.style.backgroundColor = ''; nominalInput.placeholder = '0';
        document.getElementById('jenis-menu').value = ''; document.getElementById('pilihan-saus').value = ''; document.getElementById('harga-satuan').value = ''; document.getElementById('unit-terjual').value = '';
    }
}

function toggleSausDropdown() {
    const jenisMenu = document.getElementById('jenis-menu').value;
    const sausContainer = document.getElementById('saus-container');
    if (jenisMenu === 'grill' || jenisMenu === 'crispy') sausContainer.classList.remove('hidden'); else { sausContainer.classList.add('hidden'); document.getElementById('pilihan-saus').value = ''; document.getElementById('harga-satuan').value = ''; }
    updateHargaSatuan();
}

function updateHargaSatuan() {
    const jenisMenu = document.getElementById('jenis-menu').value;
    const pilihanSaus = document.getElementById('pilihan-saus').value;
    const hargaSatuanInput = document.getElementById('harga-satuan');
    if (!jenisMenu || !pilihanSaus) { hargaSatuanInput.value = ''; hitungNominalOtomatis(); return; }
    let harga = 0; if (jenisMenu === 'grill') harga = 25000; else if (jenisMenu === 'crispy') harga = 18000;
    hargaSatuanInput.value = harga; hitungNominalOtomatis();
}

function hitungNominalOtomatis() { const harga = parseFloat(document.getElementById('harga-satuan').value) || 0; const unit = parseFloat(document.getElementById('unit-terjual').value) || 0; const nominal = harga * unit; document.getElementById('nominal-transaksi').value = nominal; }

function switchDashboard(dashboardName) {
    const dashboards = ['dashboard-kasir','dashboard-riwayat','dashboard-rekap','dashboard-jurnal-umum','dashboard-buku-besar','dashboard-neraca-saldo','dashboard-laporan-keuangan','dashboard-laporan-kas','dashboard-laporan-modal'];
    dashboards.forEach(d => { const el = document.getElementById(d); if (el) el.classList.add('hidden'); });
    const target = document.getElementById(dashboardName); if (target) target.classList.remove('hidden');
    const tabs = ['tab-kasir','tab-riwayat','tab-rekap','tab-jurnal-akuntansi']; tabs.forEach(t => { const tab = document.getElementById(t); if (tab) tab.className = 'w-full text-left px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors'; });
    const submenus = ['sub-jurnal-umum','sub-buku-besar','sub-neraca-saldo','sub-laporan-keuangan','sub-laporan-kas','sub-laporan-modal']; submenus.forEach(s => { const sub = document.getElementById(s); if (sub) sub.className = 'w-full text-left px-3 py-2 bg-gray-50 text-gray-600 rounded text-xs hover:bg-gray-100 transition-colors'; });
    const activeTabMap = { 'dashboard-kasir':'tab-kasir','dashboard-riwayat':'tab-riwayat','dashboard-rekap':'tab-rekap','dashboard-jurnal-umum':'sub-jurnal-umum','dashboard-buku-besar':'sub-buku-besar','dashboard-neraca-saldo':'sub-neraca-saldo','dashboard-laporan-keuangan':'sub-laporan-keuangan','dashboard-laporan-kas':'sub-laporan-kas','dashboard-laporan-modal':'sub-laporan-modal' };
    const activeElement = document.getElementById(activeTabMap[dashboardName]); if (activeElement) { if (activeElement.id.startsWith('tab-')) activeElement.className = 'w-full text-left px-4 py-3 bg-slate-600 text-white rounded-lg font-medium text-sm hover:bg-slate-700 transition-colors'; else activeElement.className = 'w-full text-left px-3 py-2 bg-slate-600 text-white rounded text-xs hover:bg-slate-700 transition-colors'; }

    const submenuJurnal = document.getElementById('submenu-jurnal'); const jurnalDashboards = ['dashboard-jurnal-umum','dashboard-buku-besar','dashboard-neraca-saldo','dashboard-laporan-keuangan','dashboard-laporan-kas','dashboard-laporan-modal'];
    if (jurnalDashboards.includes(dashboardName)) { if (submenuJurnal) submenuJurnal.classList.remove('hidden'); const tabj = document.getElementById('tab-jurnal-akuntansi'); if (tabj) tabj.className = 'w-full text-left px-4 py-3 bg-slate-600 text-white rounded-lg font-medium text-sm hover:bg-slate-700 transition-colors'; } else { if (submenuJurnal) submenuJurnal.classList.add('hidden'); }

    if (dashboardName === 'dashboard-riwayat') renderRiwayat(); else if (dashboardName === 'dashboard-jurnal-umum') renderJurnalUmum(); else if (dashboardName === 'dashboard-buku-besar') renderBukuBesar(); else if (dashboardName === 'dashboard-neraca-saldo') renderNeracaSaldo(); else if (dashboardName === 'dashboard-laporan-keuangan') renderLaporanKeuangan(); else if (dashboardName === 'dashboard-laporan-kas') renderLaporanKas(); else if (dashboardName === 'dashboard-laporan-modal') renderLaporanModal(); else if (dashboardName === 'dashboard-rekap') renderDiagram();
}

// ... Due to file size and readability, helper functions for charts, jurnal rendering, buku besar, neraca, laporan, arsip, sync, etc. are preserved in the HTML original.
// For convenience in this extracted file we call the original implementations when available. If some functions are missing, they will be implemented progressively.

// Map untuk menyimpan info menu penjualan
if (!window.menuInfoMap) {
    window.menuInfoMap = {};
}

// Simple wrapper to save transaksi — original implementation in HTML used multiple variants; provide a safe consolidated version
async function simpanData() {
    try {
        const tipeTransaksi = document.getElementById('tipe-transaksi').value;
        const kategori = document.getElementById('kategori-transaksi').value;
        const nominal = parseFloat(document.getElementById('nominal-transaksi').value);

        const keteranganSelect = document.getElementById('keterangan-select');
        const keteranganInput = document.getElementById('keterangan-input');
        const keterangan = keteranganSelect.classList.contains('hidden') ? keteranganInput.value : keteranganSelect.value;

        if (!tipeTransaksi || !kategori || !nominal || nominal <= 0) {
            showToast('Mohon lengkapi semua field yang diperlukan!', 'error');
            return;
        }

        if (!keterangan || keterangan.trim() === '') {
            showToast('Mohon pilih atau isi keterangan!', 'error');
            return;
        }

        const tanggal = new Date().toISOString();
        const transaksiBaru = {
            id: Date.now().toString(),
            tipe_transaksi: tipeTransaksi,
            kategori: kategori,
            nominal: nominal,
            keterangan: keterangan || '',
            tanggal: tanggal,
            created_at: new Date().toISOString()
        };

        // Simpan info menu jika penjualan makanan
        if (kategori === 'Penjualan Makanan') {
            const jenisMenu = document.getElementById('jenis-menu').value;
            const pilihanSaus = document.getElementById('pilihan-saus').value;
            const unitTerjual = parseFloat(document.getElementById('unit-terjual').value) || 1;
            
            if (!jenisMenu || !pilihanSaus) {
                showToast('Mohon lengkapi jenis menu dan pilihan saus!', 'error');
                return;
            }
            
            window.menuInfoMap[transaksiBaru.id] = {
                jenis: jenisMenu === 'grill' ? 'Grill' : 'Crispy',
                saus: pilihanSaus.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                unit: unitTerjual
            };
        }

        const btnSimpan = document.getElementById('btn-simpan-data');
        if (btnSimpan) {
            btnSimpan.disabled = true;
            btnSimpan.textContent = 'Menyimpan...';
        }

        // Simpan transaksi utama ke array
        transaksiList.push(transaksiBaru);
        
        // Simpan ke localStorage
        try {
            localStorage.setItem('transaksiList', JSON.stringify(transaksiList));
            localStorage.setItem('menuInfoMap', JSON.stringify(window.menuInfoMap || {}));
        } catch(e) {
            console.warn('localStorage error', e);
        }

        // Buat entri jurnal otomatis
        console.log('Creating jurnal entries for:', keterangan);
        const jurnalEntries = await buatJurnalOtomatis(keterangan, nominal, tanggal);
        
        console.log('Jurnal entries created:', jurnalEntries.length);
        
        // Tambahkan semua jurnal entries ke transaksiList
        for (const entry of jurnalEntries) {
            transaksiList.push(entry);
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        
        // Simpan kembali setelah jurnal ditambahkan
        try {
            localStorage.setItem('transaksiList', JSON.stringify(transaksiList));
        } catch(e) {
            console.warn('localStorage error', e);
        }

        console.log('Total transactions after save:', transaksiList.length);

        // ✅ PENTING: Update ringkasan dashboard kasir
        updateRingkasan();
        
        // ✅ PENTING: Render SEMUA dashboard dengan data terbaru
        console.log('Rendering all dashboards...');
        renderRiwayat();
        renderJurnalUmum();
        renderBukuBesar();
        renderNeracaSaldo();
        renderLaporanKeuangan();
        renderLaporanKas();
        renderLaporanModal();
        renderDiagram();
        console.log('All dashboards rendered');

        // Reset form
        document.getElementById('form-transaksi').reset();
        document.getElementById('menu-container').classList.add('hidden');
        document.getElementById('saus-container').classList.add('hidden');
        document.getElementById('nominal-transaksi').readOnly = false;
        document.getElementById('nominal-transaksi').style.backgroundColor = '';
        document.getElementById('nominal-transaksi').placeholder = '0';

        showToast('Data berhasil disimpan dan tersinkronisasi ke semua dashboard!', 'success');

        if (btnSimpan) {
            btnSimpan.disabled = false;
            btnSimpan.textContent = 'Simpan Data';
        }
    } catch (e) {
        console.error('Error in simpanData:', e);
        showToast('Terjadi kesalahan saat menyimpan: ' + e.message, 'error');
        
        const btnSimpan = document.getElementById('btn-simpan-data');
        if (btnSimpan) {
            btnSimpan.disabled = false;
            btnSimpan.textContent = 'Simpan Data';
        }
    }
}
// Toggle password visibility
document.addEventListener('click', function(e){ if (e.target && e.target.id === 'toggle-password'){
    const passwordInput = document.getElementById('login-password'); const eyeIcon = document.getElementById('eye-icon'); const eyeSlashIcon = document.getElementById('eye-slash-icon');
    if (passwordInput.type === 'password') { passwordInput.type = 'text'; eyeIcon.classList.add('hidden'); eyeSlashIcon.classList.remove('hidden'); } else { passwordInput.type = 'password'; eyeIcon.classList.remove('hidden'); eyeSlashIcon.classList.add('hidden'); }
}});

// Attach core event listeners after DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login'); if (formLogin) formLogin.addEventListener('submit', handleLogin);
    const btnLogout = document.getElementById('btn-logout'); if (btnLogout) btnLogout.addEventListener('click', handleLogout);
    const kategoriEl = document.getElementById('kategori-transaksi'); if (kategoriEl) kategoriEl.addEventListener('change', toggleMenuFields);
    const jenisMenuEl = document.getElementById('jenis-menu'); if (jenisMenuEl) jenisMenuEl.addEventListener('change', toggleSausDropdown);
    const pilihanSausEl = document.getElementById('pilihan-saus'); if (pilihanSausEl) pilihanSausEl.addEventListener('change', updateHargaSatuan);
    const unitTerjualEl = document.getElementById('unit-terjual'); if (unitTerjualEl) unitTerjualEl.addEventListener('input', hitungNominalOtomatis);
    const btnSimpan = document.getElementById('btn-simpan-data'); if (btnSimpan) btnSimpan.addEventListener('click', simpanData);

    // Tabs
    const tabKasir = document.getElementById('tab-kasir'); if (tabKasir) tabKasir.addEventListener('click', () => switchDashboard('dashboard-kasir'));
    const tabRiwayat = document.getElementById('tab-riwayat'); if (tabRiwayat) tabRiwayat.addEventListener('click', () => switchDashboard('dashboard-riwayat'));
    const tabRekap = document.getElementById('tab-rekap'); if (tabRekap) tabRekap.addEventListener('click', () => switchDashboard('dashboard-rekap'));
    const tabJurnal = document.getElementById('tab-jurnal-akuntansi'); if (tabJurnal) tabJurnal.addEventListener('click', () => { const submenu = document.getElementById('submenu-jurnal'); if (submenu) submenu.classList.toggle('hidden'); });

    const subMap = { 'sub-jurnal-umum':'dashboard-jurnal-umum','sub-buku-besar':'dashboard-buku-besar','sub-neraca-saldo':'dashboard-neraca-saldo','sub-laporan-keuangan':'dashboard-laporan-keuangan','sub-laporan-kas':'dashboard-laporan-kas','sub-laporan-modal':'dashboard-laporan-modal' };
    Object.keys(subMap).forEach(id => { const el = document.getElementById(id); if (el) el.addEventListener('click', () => switchDashboard(subMap[id])); });

    const pilihAkun = document.getElementById('pilih-akun-buku-besar'); if (pilihAkun) pilihAkun.addEventListener('change', renderBukuBesar);

    // Archive/reset/download handlers wiring (they call functions implemented in original code)
    const archiveBindings = [ ['btn-arsip-riwayat','Riwayat Transaksi'], ['btn-arsip-diagram','Diagram Keuangan'], ['btn-arsip-jurnal-umum','Jurnal Umum'], ['btn-arsip-buku-besar','Buku Besar'], ['btn-arsip-neraca-saldo','Neraca Saldo'], ['btn-arsip-laporan-keuangan','Laporan Keuangan'], ['btn-arsip-laporan-kas','Laporan Kas'], ['btn-arsip-laporan-modal','Laporan Modal'] ];
    archiveBindings.forEach(([btnId,name]) => { const b = document.getElementById(btnId); if (b) b.addEventListener('click', () => arsipkanHalaman(name)); });

    const resetIds = ['btn-reset-riwayat','btn-reset-diagram','btn-reset-jurnal-umum','btn-reset-buku-besar','btn-reset-neraca-saldo','btn-reset-laporan-keuangan','btn-reset-laporan-kas','btn-reset-laporan-modal'];
    resetIds.forEach(id => { const b = document.getElementById(id); if (b) b.addEventListener('click', resetData); });

    // Event listeners untuk download PDF
const downloadHandlers = {
    'btn-download-riwayat': () => downloadPDFWithHeader('riwayat-list', 'Riwayat_Transaksi', 'RIWAYAT TRANSAKSI'),
    'btn-download-diagram': () => downloadPDFWithHeader('dashboard-rekap', 'Diagram_Keuangan', 'DIAGRAM KEUANGAN'),
    'btn-download-jurnal-umum': () => downloadPDFWithHeader('dashboard-jurnal-umum', 'Jurnal_Umum', 'JURNAL UMUM'),
    'btn-download-buku-besar': () => downloadPDFWithHeader('buku-besar-container', 'Buku_Besar', 'BUKU BESAR'),
    'btn-download-neraca-saldo': () => downloadPDFWithHeader('dashboard-neraca-saldo', 'Neraca_Saldo', 'NERACA SALDO'),
    'btn-download-laporan-keuangan': () => downloadPDFWithHeader('laporan-keuangan-container', 'Laporan_Keuangan', 'LAPORAN KEUANGAN'),
    'btn-download-laporan-kas': () => downloadPDFWithHeader('laporan-kas-container', 'Laporan_Kas', 'LAPORAN PERUBAHAN KAS'),
    'btn-download-laporan-modal': () => downloadPDFWithHeader('laporan-modal-container', 'Laporan_Modal', 'LAPORAN PERUBAHAN MODAL')
};

Object.keys(downloadHandlers).forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.addEventListener('click', downloadHandlers[btnId]);
    }
});

    init();
});

// Minimal implementations or placeholders for functions referenced earlier but kept concise here.
async function buatJurnalOtomatis(keterangan, nominal, tanggal) {
    const entries = [];
    const ket = keterangan.toLowerCase();
    
    // Penjualan Tunai
    if (ket === 'penjualan tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Tangan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Tangan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Penjualan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Penjualan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-3',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal * 0.8, // HPP 80% dari harga jual
                keterangan: 'Harga Pokok Penjualan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Harga Pokok Penjualan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-4',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal * 0.8,
                keterangan: 'Persediaan Barang (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Persediaan Barang',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
        );
    }
     // Penjualan Tunai
    if (ket === 'penjualan tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Tangan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Tangan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Penjualan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Penjualan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-3',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal * 0.8, // HPP 80% dari harga jual
                keterangan: 'Harga Pokok Penjualan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Harga Pokok Penjualan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-4',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal * 0.8,
                keterangan: 'Persediaan Barang (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Persediaan Barang',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
        );
    }
    // Penjualan non Tunai
    if (ket === 'penjualan Non tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Bank (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Bank',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Penjualan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Penjualan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-3',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal * 0.8, // HPP 80% dari harga jual
                keterangan: 'Harga Pokok Penjualan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Harga Pokok Penjualan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-4',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal * 0.8,
                keterangan: 'Persediaan Barang (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Persediaan Barang',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
        );
    }
   
    // Penjualan Non Tunai
    else if (ket === 'penjualan non tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Bank (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Bank',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Penjualan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Penjualan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-3',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal * 0.8,
                keterangan: 'Harga Pokok Penjualan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Harga Pokok Penjualan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-4',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal * 0.8,
                keterangan: 'Persediaan Barang (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Persediaan Barang',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
        );
    }
     // Penjualan Kredit
    if (ket === 'penjualan kredit') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Piutang Usaha (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Piutang Usaha',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Penjualan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Penjualan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-3',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal * 0.8, // HPP 80% dari harga jual
                keterangan: 'Harga Pokok Penjualan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Harga Pokok Penjualan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-4',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal * 0.8,
                keterangan: 'Persediaan Barang (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Persediaan Barang',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
        );
    }
   
    // Pembelian Bahan Baku Tunai
    else if (ket === 'pembelian bahan baku tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Persediaan Barang (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Persediaan Barang',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Tangan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Tangan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
        );
    }
    // Pembelian Bahan Baku Non Tunai
    else if (ket === 'pembelian bahan baku non tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Persediaan Barang (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Persediaan Barang',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Bank (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Bank',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
        );
    }
    // Pembelian Bahan Baku kredit
    else if (ket === 'pembelian bahan baku kredit') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Persediaan Barang (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Persediaan Barang',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Hutang Usaha (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Hutang Usaha',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
        );
    }
    // Membayar Gaji Tunai
    else if (ket === 'membayar gaji tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Beban Gaji dan Upah (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Beban Gaji dan Upah',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Tangan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Tangan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
        );
    }
    // Membayar Gaji Non Tunai
    else if (ket === 'membayar gaji Non tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Beban Gaji dan Upah (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Beban Gaji dan Upah',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Bank (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Bank',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
        );
    }
// Membayar Gaji Kredit
    else if (ket === 'Belum membayar gaji dan Upah') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Beban Gaji dan Upah (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Beban Gaji dan Upah',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Hutang Gaji dan Upah (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Hutang Gaji dan Upah',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
        );
    }
    // Membayar Listrik dan Air Tunai
    else if (ket === 'membayar listrik dan air tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Beban Listrik dan Air (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Beban Listrik dan Air',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Tangan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Tangan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
    // Membayar Listrik dan Air Non Tunai
    else if (ket === 'membayar listrik dan air Non tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Beban Listrik dan Air (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Beban Listrik dan Air',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Bank (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Bank',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
    // Membayar Listrik dan Air kredit
    else if (ket === 'Belum membayar listrik dan air') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Beban Listrik dan Air (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Beban Listrik dan Air',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Hutang Listrik dan Air (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Hutang Listrik dan Air',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membayar Sewa Tempat Tunai
    else if (ket === 'membayar Sewa Tempat tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Sewa Dibayar Di Muka (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Sewa Dibayar Di Muka',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Tangan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Tangan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membayar Sewa Tempat Non Tunai
    else if (ket === 'membayar Sewa Tempat Non tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Sewa Dibayar Di Muka (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Sewa Dibayar Di Muka',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Bank (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Bank',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membayar Sewa Tempat Kredit
    else if (ket === 'membayar Sewa Tempat kredit') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Sewa Dibayar Di Muka (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Sewa Dibayar Di Muka',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Hutang Usaha(K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Hutang Usaha',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membayar Perawatan Tunai
    else if (ket === 'membayar Perawatan tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Beban Perawatan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Beban Perawatan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Tangan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Tangan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membayar Perawatan Non Tunai
    else if (ket === 'membayar Perawatan Non tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Beban Perawatan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Beban Perawatan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Bank (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Bank',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membayar Perawatan kredit
    else if (ket === 'membayar Perawatan kredit') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Beban Perawatan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Beban Perawatan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Hutang Usaha (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Hutang Usaha',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membeli Peralatan Tunai
    else if (ket === 'membeli Peralatan tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Peralatan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Peralatan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Tangan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Tangan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membeli Peralatan Non Tunai
    else if (ket === 'membeli Peralatan non tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Peralatan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Peralatan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di bank (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di bank',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membeli Peralatan kredit
    else if (ket === 'membeli Peralatan kredit') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Peralatan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Peralatan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Hutang Usaha (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Hutang Usaha',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membeli Perlengkapan Tunai
    else if (ket === 'membeli Perlengkapan tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Perlengkapan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Perlengkapan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Tangan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Tangan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membeli Perlengkapan Non Tunai
    else if (ket === 'membeli Perlengkapan non tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Perlengkapan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Perlengkapan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Bank (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Bank',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membeli Perlengkapan kredit
    else if (ket === 'membeli Perlengkapan kredit') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Perlengkapan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Perlengkapan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Hutang Usaha (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Hutang Usaha',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membeli bangunan Tunai
    else if (ket === 'membeli bangunan tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Bangunan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Bangunan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Tangan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Tangan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membeli bangunan non Tunai
    else if (ket === 'membeli bangunan non tunai') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Bangunan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Bangunan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas di Bank (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas di Bank',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Membeli bangunan Kredit
    else if (ket === 'membeli bangunan kredit') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Bangunan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'BangunanK',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Hutang Usaha (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Hutang Usaha',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Setoran Modal Dari Owner
    else if (ket === 'Setoran Modal Dari Owner') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas Di Bank(D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas Di Bank',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Modal (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Modal',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Setoran Modal Dari Pinjaman
    else if (ket === 'Setoran Modal Dari Pinjaman') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas Di Bank(D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas Di Bank',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Hutang Usaha Jangka Panjang (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Hutang Usaha Jangka Panjang',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Prive
    else if (ket === 'Prive') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Prive(D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Prive',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Kas Di Tangan (K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Kas Di Tangan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Penyesuaian Perlengkapan
    else if (ket === 'Penyesuaian Perlengkapan') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Beban Perlengkapan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Beban Perlengkapan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Perlengkapan(K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Perlengkapan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Penyesuaian Peralatan
    else if (ket === 'Penyesuaian Peralatan') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Beban Penyusutan Peralatan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Beban Penyusutan Peralatan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Akumulasi Penyusutan Peralatan(K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Akumulasi Penyusutan Peralatan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Penyesuaian Bangunan
    else if (ket === 'Penyesuaian Bangunan') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Beban Penyusutan Bangunan (D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Beban Penyusutan Bangunan',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Akumulasi Penyusutan Bangunan(K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Akumulasi Penyusutan Bangunan',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }
// Penyesuaian Sewa Tempat
    else if (ket === 'Penyesuaian Sewa Tempat') {
        entries.push(
            {
                id: Date.now().toString() + '-1',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Beban Sewa(D)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Beban Sewa',
                posisi_jurnal: 'Debet',
                is_jurnal_otomatis: true
            },
            {
                id: Date.now().toString() + '-2',
                tipe_transaksi: 'Jurnal',
                kategori: 'Jurnal Otomatis',
                nominal: nominal,
                keterangan: 'Sewa Dibayar Di muka(K)',
                tanggal: tanggal,
                created_at: new Date().toISOString(),
                akun_target: 'Sewa Dibayar Di Muka',
                posisi_jurnal: 'Kredit',
                is_jurnal_otomatis: true
            }
            
        );
    }


    return entries;
}
function renderRiwayat() {
    const riwayatList = document.getElementById('riwayat-list');
    
    if (!riwayatList) return;
    
    // Filter hanya transaksi dari kasir (bukan jurnal otomatis)
    const transaksiKasir = transaksiList.filter(t => !t.is_jurnal_otomatis);
    
    if (transaksiKasir.length === 0) {
        riwayatList.innerHTML = '<p class="text-center text-gray-500 py-8">Belum ada transaksi</p>';
        return;
    }
    
    // Pisahkan transaksi penjualan makanan dan lainnya
    const penjualanMakanan = transaksiKasir.filter(t => t.kategori === 'Penjualan Makanan');
    const transaksiLainnya = transaksiKasir.filter(t => t.kategori !== 'Penjualan Makanan');
    
    const sortedPenjualan = [...penjualanMakanan].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    const sortedLainnya = [...transaksiLainnya].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    
    let html = '';
    
    // Section Penjualan Makanan
    if (sortedPenjualan.length > 0) {
        html += '<div class="mb-6"><h3 class="text-lg font-bold text-gray-800 mb-3 bg-green-100 p-2 rounded">Transaksi Penjualan Makanan</h3>';
        html += sortedPenjualan.map(t => {
            const menuInfo = window.menuInfoMap ? window.menuInfoMap[t.id] : null;
            let detailMenu = '';
            if (menuInfo) {
                detailMenu = `<p class="text-xs text-blue-600 mt-1">Menu: ${menuInfo.jenis} - ${menuInfo.saus} (${menuInfo.unit}x)</p>`;
            }
            
            return `
            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-2">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                            ${t.tipe_transaksi}
                        </span>
                        <p class="text-sm font-medium text-gray-700 mt-2">${t.kategori}</p>
                        ${detailMenu}
                    </div>
                    <p class="text-lg font-bold text-green-600">
                        ${formatRupiah(t.nominal)}
                    </p>
                </div>
                <p class="text-sm text-gray-600">${t.keterangan || '-'}</p>
                <p class="text-xs text-gray-400 mt-2">${new Date(t.tanggal).toLocaleString('id-ID')}</p>
            </div>
        `;
        }).join('');
        html += '</div>';
    }
    
    // Section Transaksi Lainnya
    if (sortedLainnya.length > 0) {
        html += '<div class="mb-6"><h3 class="text-lg font-bold text-gray-800 mb-3 bg-blue-100 p-2 rounded">Transaksi Lainnya</h3>';
        html += sortedLainnya.map(t => `
            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-2">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <span class="px-2 py-1 text-xs rounded-full ${
                            t.tipe_transaksi === 'Pemasukan' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                        }">
                            ${t.tipe_transaksi}
                        </span>
                        <p class="text-sm font-medium text-gray-700 mt-2">${t.kategori}</p>
                    </div>
                    <p class="text-lg font-bold ${
                        t.tipe_transaksi === 'Pemasukan' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                    }">
                        ${formatRupiah(t.nominal)}
                    </p>
                </div>
                <p class="text-sm text-gray-600">${t.keterangan || '-'}</p>
                <p class="text-xs text-gray-400 mt-2">${new Date(t.tanggal).toLocaleString('id-ID')}</p>
            </div>
        `).join('');
        html += '</div>';
    }
    
    // Rekapitulasi
    const totalPemasukan = transaksiKasir.filter(t => t.tipe_transaksi === 'Pemasukan').reduce((sum, t) => sum + t.nominal, 0);
    const totalPengeluaran = transaksiKasir.filter(t => t.tipe_transaksi === 'Pengeluaran').reduce((sum, t) => sum + t.nominal, 0);
    const saldoBersih = totalPemasukan - totalPengeluaran;
    
    html += `<div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200 mt-6">`;
    html += '<h3 class="text-xl font-bold text-gray-800 mb-4 text-center">📊 Rekapitulasi Transaksi</h3>';
    html += `<div class="bg-white p-4 rounded-lg border-2 border-blue-300">
        <div class="flex justify-between text-sm py-1">
            <span>Total Pemasukan</span>
            <span class="font-semibold text-green-600">${formatRupiah(totalPemasukan)}</span>
        </div>
        <div class="flex justify-between text-sm py-1">
            <span>Total Pengeluaran</span>
            <span class="font-semibold text-red-600">${formatRupiah(totalPengeluaran)}</span>
        </div>
        <div class="flex justify-between text-lg font-bold pt-2 mt-2 border-t-2">
            <span>Saldo Bersih</span>
            <span class="${saldoBersih >= 0 ? 'text-green-600' : 'text-red-600'}">${formatRupiah(Math.abs(saldoBersih))}</span>
        </div>
    </div>`;
    html += '</div>';
    
    riwayatList.innerHTML = html;
}
function renderJurnalUmum() {
    const jurnalBody = document.getElementById('jurnal-umum-body');
    
    if (!jurnalBody) return;
    
    const jurnalEntries = transaksiList.filter(t => t.tipe_transaksi === 'Jurnal');
    
    if (jurnalEntries.length === 0) {
        jurnalBody.innerHTML = '<tr><td colspan="4" class="px-4 py-8 text-center text-gray-500">Belum ada data</td></tr>';
        return;
    }
    
    const sortedEntries = [...jurnalEntries].sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
    
    // Group by transaksi asli
    const groupedByTime = {};
    sortedEntries.forEach(entry => {
        const baseId = entry.id.split('-')[0];
        if (!groupedByTime[baseId]) {
            groupedByTime[baseId] = [];
        }
        groupedByTime[baseId].push(entry);
    });
    
    let html = '';
    Object.keys(groupedByTime).forEach(baseId => {
        const entries = groupedByTime[baseId];
        const firstEntry = entries[0];
        
        // Cari transaksi asli
        const transaksiAsli = transaksiList.find(t => 
            !t.is_jurnal_otomatis && 
            Math.abs(new Date(t.tanggal).getTime() - new Date(firstEntry.tanggal).getTime()) < 1000
        );
        
        const keteranganTransaksi = transaksiAsli ? transaksiAsli.keterangan : '';
        
        // Header keterangan
        if (keteranganTransaksi) {
            html += `
                <tr class="border-t-2 border-gray-300 bg-blue-50">
                    <td colspan="4" class="px-4 py-2 text-sm font-semibold text-blue-800">
                        ${keteranganTransaksi.toUpperCase()}
                    </td>
                </tr>
            `;
        }
        
        // Entri jurnal
        entries.forEach(entry => {
            html += `
                <tr class="border-t border-gray-200 hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm text-gray-700">${new Date(entry.tanggal).toLocaleDateString('id-ID')}</td>
                    <td class="px-4 py-3 text-sm text-gray-700 pl-8">${entry.keterangan}</td>
                    <td class="px-4 py-3 text-sm text-right ${entry.posisi_jurnal === 'Debet' ? 'text-green-600 font-medium' : 'text-gray-400'}">
                        ${entry.posisi_jurnal === 'Debet' ? formatRupiah(entry.nominal) : '-'}
                    </td>
                    <td class="px-4 py-3 text-sm text-right ${entry.posisi_jurnal === 'Kredit' ? 'text-red-600 font-medium' : 'text-gray-400'}">
                        ${entry.posisi_jurnal === 'Kredit' ? formatRupiah(entry.nominal) : '-'}
                    </td>
                </tr>
            `;
        });
    });
    
    jurnalBody.innerHTML = html;
}
// Saldo awal akun
const saldoAwal = {
    'Kas di Tangan': { nominal: 3000000, posisi: 'Debet' },
    'Kas di Bank': { nominal: 8000000, posisi: 'Debet' },
    'Persediaan Barang': { nominal: 5500000, posisi: 'Debet' },
    'Perlengkapan': { nominal: 1500000, posisi: 'Debet' },
    'Peralatan': { nominal: 7000000, posisi: 'Debet' },
    'Bangunan': { nominal: 1000000, posisi: 'Debet' },
    'Akumulasi Penyusutan Peralatan': { nominal: 700000, posisi: 'Kredit' },
    'Akumulasi Penyusutan Bangunan': { nominal: 100000, posisi: 'Kredit' },
    'Hutang Usaha': { nominal: 500000, posisi: 'Kredit' },
    'Hutang Usaha Jangka Panjang': { nominal: 7000000, posisi: 'Kredit' },
    'Modal': { nominal: 30000000, posisi: 'Kredit' },
    'Prive': { nominal: 100000, posisi: 'Debet' }
};

function renderBukuBesar() {
    const container = document.getElementById('buku-besar-container');
    const pilihAkun = document.getElementById('pilih-akun-buku-besar');
    
    if (!container || !pilihAkun) return;
    
    const selectedAkun = pilihAkun.value;
    
    if (!selectedAkun) {
        container.innerHTML = '<p class="text-center text-gray-500 py-8">Pilih akun untuk melihat buku besar</p>';
        return;
    }
    
    const jurnalEntries = transaksiList.filter(t => t.tipe_transaksi === 'Jurnal');
    const entries = jurnalEntries.filter(e => e.akun_target === selectedAkun)
                                 .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
    
    let saldo = 0;
    if (saldoAwal[selectedAkun]) {
        saldo = saldoAwal[selectedAkun].posisi === 'Debet' 
            ? saldoAwal[selectedAkun].nominal 
            : -saldoAwal[selectedAkun].nominal;
    }
    
    let html = `
        <div class="bg-white p-4 rounded-lg border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">${selectedAkun}</h3>
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-600">Tanggal</th>
                        <th class="px-3 py-2 text-right text-xs font-medium text-gray-600">Debet</th>
                        <th class="px-3 py-2 text-right text-xs font-medium text-gray-600">Kredit</th>
                        <th class="px-3 py-2 text-right text-xs font-medium text-gray-600">Saldo</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Saldo awal
    if (saldoAwal[selectedAkun]) {
        html += `
            <tr class="border-t border-gray-100 bg-yellow-50">
                <td class="px-3 py-2 text-xs text-gray-700 font-semibold">Saldo Awal</td>
                <td class="px-3 py-2 text-xs text-right ${saldoAwal[selectedAkun].posisi === 'Debet' ? 'text-green-600 font-medium' : 'text-gray-400'}">
                    ${saldoAwal[selectedAkun].posisi === 'Debet' ? formatRupiah(saldoAwal[selectedAkun].nominal) : '-'}
                </td>
                <td class="px-3 py-2 text-xs text-right ${saldoAwal[selectedAkun].posisi === 'Kredit' ? 'text-red-600 font-medium' : 'text-gray-400'}">
                    ${saldoAwal[selectedAkun].posisi === 'Kredit' ? formatRupiah(saldoAwal[selectedAkun].nominal) : '-'}
                </td>
                <td class="px-3 py-2 text-xs text-right font-medium ${saldo >= 0 ? 'text-blue-600' : 'text-orange-600'}">
                    ${formatRupiah(Math.abs(saldo))} ${saldo >= 0 ? '(D)' : '(K)'}
                </td>
            </tr>
        `;
    }
    
    entries.forEach(entry => {
        if (entry.posisi_jurnal === 'Debet') {
            saldo += entry.nominal;
        } else {
            saldo -= entry.nominal;
        }
        
        html += `
            <tr class="border-t border-gray-100 hover:bg-gray-50">
                <td class="px-3 py-2 text-xs text-gray-700">${new Date(entry.tanggal).toLocaleDateString('id-ID')}</td>
                <td class="px-3 py-2 text-xs text-right ${entry.posisi_jurnal === 'Debet' ? 'text-green-600' : 'text-gray-400'}">
                    ${entry.posisi_jurnal === 'Debet' ? formatRupiah(entry.nominal) : '-'}
                </td>
                <td class="px-3 py-2 text-xs text-right ${entry.posisi_jurnal === 'Kredit' ? 'text-red-600' : 'text-gray-400'}">
                    ${entry.posisi_jurnal === 'Kredit' ? formatRupiah(entry.nominal) : '-'}
                </td>
                <td class="px-3 py-2 text-xs text-right font-medium ${saldo >= 0 ? 'text-blue-600' : 'text-orange-600'}">
                    ${formatRupiah(Math.abs(saldo))} ${saldo >= 0 ? '(D)' : '(K)'}
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}
function renderNeracaSaldo() {
    const tbody = document.getElementById('neraca-saldo-body');
    
    if (!tbody) return;
    
    const jurnalEntries = transaksiList.filter(t => t.tipe_transaksi === 'Jurnal');
    
    // Hitung saldo per akun
    const saldoMap = {};
    
    // Inisialisasi dengan saldo awal
    Object.keys(saldoAwal).forEach(akun => {
        saldoMap[akun] = 0;
        if (saldoAwal[akun].posisi === 'Debet') {
            saldoMap[akun] = saldoAwal[akun].nominal;
        } else {
            saldoMap[akun] = -saldoAwal[akun].nominal;
        }
    });
    
    // Tambahkan transaksi jurnal
    jurnalEntries.forEach(entry => {
        if (!saldoMap[entry.akun_target]) {
            saldoMap[entry.akun_target] = 0;
        }
        
        if (entry.posisi_jurnal === 'Debet') {
            saldoMap[entry.akun_target] += entry.nominal;
        } else {
            saldoMap[entry.akun_target] -= entry.nominal;
        }
    });
    
    // Kategorisasi akun
    const kategoriAkun = {
        'ASET': ['Kas di Tangan', 'Kas di Bank', 'Piutang Usaha', 'Persediaan Barang', 'Sewa Dibayar di Muka', 
                 'Perlengkapan', 'Peralatan', 'Akumulasi Penyusutan Peralatan', 'Bangunan', 'Akumulasi Penyusutan Bangunan'],
        'HUTANG': ['Hutang Usaha', 'Utang Gaji', 'Hutang Listrik dan Air', 'Hutang Usaha Jangka Panjang'],
        'MODAL': ['Modal', 'Prive'],
        'PENDAPATAN': ['Penjualan'],
        'BEBAN': ['Harga Pokok Penjualan', 'Beban Gaji dan Upah', 'Beban Listrik dan Air', 'Beban Reparasi', 
                  'Beban Perlengkapan', 'Beban Sewa', 'Beban Lain-Lain', 'Penyusutan Peralatan', 'Penyusutan Bangunan']
    };
    
    let totalDebet = 0;
    let totalKredit = 0;
    let html = '';
    
    // Render per kategori
    for (const [kategori, akunList] of Object.entries(kategoriAkun)) {
        html += `<tr class="bg-blue-100"><td colspan="3" class="px-4 py-2 text-sm font-bold text-blue-800">${kategori}</td></tr>`;
        
        akunList.forEach(akun => {
            if (saldoMap[akun] !== undefined) {
                const saldo = saldoMap[akun];
                const debetValue = saldo >= 0 ? Math.abs(saldo) : 0;
                const kreditValue = saldo < 0 ? Math.abs(saldo) : 0;
                
                totalDebet += debetValue;
                totalKredit += kreditValue;
                
                html += `
                    <tr class="border-t border-gray-200 hover:bg-gray-50">
                        <td class="px-4 py-3 text-sm text-gray-700 pl-8">${akun}</td>
                        <td class="px-4 py-3 text-sm text-right ${debetValue > 0 ? 'text-green-600 font-medium' : 'text-gray-400'}">${debetValue > 0 ? formatRupiah(debetValue) : '-'}</td>
                        <td class="px-4 py-3 text-sm text-right ${kreditValue > 0 ? 'text-red-600 font-medium' : 'text-gray-400'}">${kreditValue > 0 ? formatRupiah(kreditValue) : '-'}</td>
                    </tr>
                `;
            }
        });
    }
    
    html += `
        <tr class="border-t-2 border-gray-300 bg-gray-50 font-bold">
            <td class="px-4 py-3 text-sm text-gray-800">TOTAL</td>
            <td class="px-4 py-3 text-sm text-right text-green-700">${formatRupiah(totalDebet)}</td>
            <td class="px-4 py-3 text-sm text-right text-red-700">${formatRupiah(totalKredit)}</td>
        </tr>
    `;
    
    tbody.innerHTML = html;
}
function renderLaporanKeuangan() {
    const container = document.getElementById('laporan-keuangan-container');
    
    if (!container) return;
    
    const jurnalEntries = transaksiList.filter(t => t.tipe_transaksi === 'Jurnal');
    
    if (jurnalEntries.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 py-8">Belum ada data jurnal</p>';
        return;
    }
    
    // Hitung saldo per akun
    const saldoMap = {};
    jurnalEntries.forEach(entry => {
        if (!saldoMap[entry.akun_target]) {
            saldoMap[entry.akun_target] = 0;
        }
        
        if (entry.posisi_jurnal === 'Debet') {
            saldoMap[entry.akun_target] += entry.nominal;
        } else {
            saldoMap[entry.akun_target] -= entry.nominal;
        }
    });
    
    // LAPORAN LABA RUGI
    const pendapatan = Math.abs(saldoMap['Penjualan'] || 0);
    const hpp = Math.abs(saldoMap['Harga Pokok Penjualan'] || 0);
    const bebanGaji = Math.abs(saldoMap['Beban Gaji dan Upah'] || 0);
    const bebanListrik = Math.abs(saldoMap['Beban Listrik dan Air'] || 0);
    const bebanReparasi = Math.abs(saldoMap['Beban Reparasi'] || 0);
    const bebanPerlengkapan = Math.abs(saldoMap['Beban Perlengkapan'] || 0);
    const bebanSewa = Math.abs(saldoMap['Beban Sewa'] || 0);
    const bebanLainLain = Math.abs(saldoMap['Beban Lain-Lain'] || 0);
    const penyusutanPeralatan = Math.abs(saldoMap['Penyusutan Peralatan'] || 0);
    const penyusutanBangunan = Math.abs(saldoMap['Penyusutan Bangunan'] || 0);
    
    const labaKotor = pendapatan - hpp;
    const totalBeban = bebanGaji + bebanListrik + bebanReparasi + bebanPerlengkapan + bebanSewa + bebanLainLain + penyusutanPeralatan + penyusutanBangunan;
    const labaBersih = labaKotor - totalBeban;
    
    // LAPORAN POSISI KEUANGAN
    const kasTangan = saldoMap['Kas di Tangan'] || 0;
    const kasBank = saldoMap['Kas di Bank'] || 0;
    const piutang = saldoMap['Piutang Usaha'] || 0;
    const persediaan = saldoMap['Persediaan Barang'] || 0;
    const sewaDibayarDimuka = saldoMap['Sewa Dibayar di Muka'] || 0;
    const perlengkapan = saldoMap['Perlengkapan'] || 0;
    
    const peralatan = saldoMap['Peralatan'] || 0;
    const akumPenyPeralatan = Math.abs(saldoMap['Akumulasi Penyusutan Peralatan'] || 0);
    const bangunan = saldoMap['Bangunan'] || 0;
    const akumPenyBangunan = Math.abs(saldoMap['Akumulasi Penyusutan Bangunan'] || 0);
    
    const totalAsetLancar = kasTangan + kasBank + piutang + persediaan + sewaDibayarDimuka + perlengkapan;
    const peralatanNetto = peralatan - akumPenyPeralatan;
    const bangunanNetto = bangunan - akumPenyBangunan;
    const totalAsetTetap = peralatanNetto + bangunanNetto;
    const totalAset = totalAsetLancar + totalAsetTetap;
    
    const hutangUsaha = Math.abs(saldoMap['Hutang Usaha'] || 0);
    const utangGaji = Math.abs(saldoMap['Utang Gaji'] || 0);
    const hutangListrik = Math.abs(saldoMap['Hutang Listrik dan Air'] || 0);
    const hutangJangkaPanjang = Math.abs(saldoMap['Hutang Usaha Jangka Panjang'] || 0);
    
    const totalLiabilitas = hutangUsaha + utangGaji + hutangListrik + hutangJangkaPanjang;
    
    const modal = Math.abs(saldoMap['Modal'] || 0);
    const prive = Math.abs(saldoMap['Prive'] || 0);
    const modalAkhir = modal + labaBersih - prive;
    const totalEkuitas = modalAkhir;
    
    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- LAPORAN LABA RUGI -->
            <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 class="text-xl font-bold text-gray-800 mb-2 text-center border-b-2 pb-2">LAPORAN LABA RUGI</h3>
                <p class="text-center text-gray-700 font-medium text-sm">Kings Steak</p>
                <p class="text-center text-gray-600 text-xs mb-4">${getPeriodeString()}</p>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="text-sm font-semibold">Pendapatan:</span>
                    </div>
                    <div class="flex justify-between pl-4">
                        <span class="text-sm">Pendapatan Penjualan</span>
                        <span class="text-sm">${formatRupiah(pendapatan)}</span>
                    </div>
                    <div class="flex justify-between border-b pb-2">
                        <span class="text-sm">Harga Pokok Penjualan</span>
                        <span class="text-sm">(${formatRupiah(hpp)})</span>
                    </div>
                    <div class="flex justify-between border-b-2 border-gray-400 pb-2 font-semibold bg-green-50">
                        <span class="text-sm">Laba Kotor</span>
                        <span class="text-sm">${formatRupiah(labaKotor)}</span>
                    </div>
                    
                    <div class="flex justify-between pt-2">
                        <span class="text-sm font-semibold">Beban Operasional:</span>
                    </div>
                    <div class="flex justify-between pl-4">
                        <span class="text-sm">Beban Gaji dan Upah</span>
                        <span class="text-sm">(${formatRupiah(bebanGaji)})</span>
                    </div>
                    <div class="flex justify-between pl-4">
                        <span class="text-sm">Beban Listrik dan Air</span>
                        <span class="text-sm">(${formatRupiah(bebanListrik)})</span>
                    </div>
                    <div class="flex justify-between pl-4">
                        <span class="text-sm">Beban Reparasi</span>
                        <span class="text-sm">(${formatRupiah(bebanReparasi)})</span>
                    </div>
                    <div class="flex justify-between pl-4">
                        <span class="text-sm">Beban Perlengkapan</span>
                        <span class="text-sm">(${formatRupiah(bebanPerlengkapan)})</span>
                    </div>
                    <div class="flex justify-between pl-4">
                        <span class="text-sm">Beban Sewa</span>
                        <span class="text-sm">(${formatRupiah(bebanSewa)})</span>
                    </div>
                    <div class="flex justify-between pl-4">
                        <span class="text-sm">Beban Lain-Lain</span>
                        <span class="text-sm">(${formatRupiah(bebanLainLain)})</span>
                    </div>
                    <div class="flex justify-between pl-4">
                        <span class="text-sm">Penyusutan Peralatan</span>
                        <span class="text-sm">(${formatRupiah(penyusutanPeralatan)})</span>
                    </div>
                    <div class="flex justify-between pl-4 border-b pb-2">
                        <span class="text-sm">Penyusutan Bangunan</span>
                        <span class="text-sm">(${formatRupiah(penyusutanBangunan)})</span>
                    </div>
                    <div class="flex justify-between border-b-2 border-gray-400 pb-2">
                        <span class="text-sm font-medium">Total Beban Operasional</span>
                        <span class="text-sm font-medium">(${formatRupiah(totalBeban)})</span>
                    </div>
                    <div class="flex justify-between pt-2 text-lg font-bold ${labaBersih >= 0 ? 'bg-green-100' : 'bg-red-100'} p-2 rounded">
                        <span>Laba Bersih</span>
                        <span class="${labaBersih >= 0 ? 'text-green-600' : 'text-red-600'}">${formatRupiah(Math.abs(labaBersih))}</span>
                    </div>
                </div>
            </div>

            <!-- LAPORAN POSISI KEUANGAN -->
            <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 class="text-xl font-bold text-gray-800 mb-2 text-center border-b-2 pb-2">LAPORAN POSISI KEUANGAN</h3>
                <p class="text-center text-gray-700 font-medium text-sm">Kings Steak</p>
                <p class="text-center text-gray-600 text-xs mb-4">${getPeriodeString()}</p>
                <div class="space-y-2">
                    <!-- ASET -->
                    <div class="font-semibold text-sm mb-2">ASET</div>
                    
                    <div class="pl-2">
                        <div class="text-sm font-medium mb-1">Aset Lancar:</div>
                        <div class="flex justify-between pl-4 text-xs">
                            <span>Kas di Tangan</span>
                            <span>${formatRupiah(kasTangan)}</span>
                        </div>
                        <div class="flex justify-between pl-4 text-xs">
                            <span>Kas di Bank</span>
                            <span>${formatRupiah(kasBank)}</span>
                        </div>
                        <div class="flex justify-between pl-4 text-xs">
                            <span>Piutang Usaha</span>
                            <span>${formatRupiah(piutang)}</span>
                        </div>
                        <div class="flex justify-between pl-4 text-xs">
                            <span>Persediaan Barang</span>
                            <span>${formatRupiah(persediaan)}</span>
                        </div>
                        <div class="flex justify-between pl-4 text-xs">
                            <span>Sewa Dibayar di Muka</span>
                            <span>${formatRupiah(sewaDibayarDimuka)}</span>
                        </div>
                        <div class="flex justify-between pl-4 text-xs border-b pb-1">
                            <span>Perlengkapan</span>
                            <span>${formatRupiah(perlengkapan)}</span>
                        </div>
                        <div class="flex justify-between pl-2 text-sm font-medium border-b-2 pb-1 mb-2">
                            <span>Total Aset Lancar</span>
                            <span>${formatRupiah(totalAsetLancar)}</span>
                        </div>
                    </div>
                    
                    <div class="pl-2">
                        <div class="text-sm font-medium mb-1">Aset Tetap:</div>
                        <div class="flex justify-between pl-4 text-xs">
                            <span>Peralatan</span>
                            <span>${formatRupiah(peralatan)}</span>
                        </div>
                        <div class="flex justify-between pl-4 text-xs border-b pb-1">
                            <span>Akumulasi Penyusutan</span>
                            <span>(${formatRupiah(akumPenyPeralatan)})</span>
                        </div>
                        <div class="flex justify-between pl-6 text-xs font-medium mb-1">
                            <span>Peralatan (Netto)</span>
                            <span>${formatRupiah(peralatanNetto)}</span>
                        </div>
                        <div class="flex justify-between pl-4 text-xs">
                            <span>Bangunan</span>
                            <span>${formatRupiah(bangunan)}</span>
                        </div>
                        <div class="flex justify-between pl-4 text-xs border-b pb-1">
                            <span>Akumulasi Penyusutan</span>
                            <span>(${formatRupiah(akumPenyBangunan)})</span>
                        </div>
                        <div class="flex justify-between pl-6 text-xs font-medium border-b pb-1">
                            <span>Bangunan (Netto)</span>
                            <span>${formatRupiah(bangunanNetto)}</span>
                        </div>
                        <div class="flex justify-between pl-2 text-sm font-medium border-b-2 pb-1 mb-2">
                            <span>Total Aset Tetap</span>
                            <span>${formatRupiah(totalAsetTetap)}</span>
                        </div>
                    </div>
                    
                    <div class="flex justify-between font-bold text-base bg-blue-100 p-2 rounded mb-3">
                        <span>TOTAL ASET</span>
                        <span>${formatRupiah(totalAset)}</span>
                    </div>
                    
                    <!-- LIABILITAS DAN EKUITAS -->
                    <div class="font-semibold text-sm mb-2 mt-4">LIABILITAS DAN EKUITAS</div>
                    
                    <div class="pl-2">
                        <div class="text-sm font-medium mb-1">Liabilitas:</div>
                        <div class="flex justify-between pl-4 text-xs">
                            <span>Hutang Usaha</span>
                            <span>${formatRupiah(hutangUsaha)}</span>
                        </div>
                        <div class="flex justify-between pl-4 text-xs">
                            <span>Utang Gaji</span>
                            <span>${formatRupiah(utangGaji)}</span>
                        </div>
                        <div class="flex justify-between pl-4 text-xs">
                            <span>Hutang Listrik dan Air</span>
                            <span>${formatRupiah(hutangListrik)}</span>
                        </div>
                        <div class="flex justify-between pl-4 text-xs border-b pb-1">
                            <span>Hutang Jangka Panjang</span>
                            <span>${formatRupiah(hutangJangkaPanjang)}</span>
                        </div>
                        <div class="flex justify-between pl-2 text-sm font-medium border-b-2 pb-1 mb-2">
                            <span>Total Liabilitas</span>
                            <span>${formatRupiah(totalLiabilitas)}</span>
                        </div>
                    </div>
                    
                    <div class="pl-2">
                        <div class="text-sm font-medium mb-1">Ekuitas:</div>
                        <div class="flex justify-between pl-4 text-xs border-b pb-1">
                            <span>Modal Akhir</span>
                            <span>${formatRupiah(modalAkhir)}</span>
                        </div>
                        <div class="flex justify-between pl-2 text-sm font-medium border-b-2 pb-1 mb-2">
                            <span>Total Ekuitas</span>
                            <span>${formatRupiah(totalEkuitas)}</span>
                        </div>
                    </div>
                    
                    <div class="flex justify-between font-bold text-base bg-blue-100 p-2 rounded">
                        <span>TOTAL LIABILITAS & EKUITAS</span>
                        <span>${formatRupiah(totalLiabilitas + totalEkuitas)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}
function renderLaporanKas() {
    const container = document.getElementById('laporan-kas-container');
    
    if (!container) return;
    
    const jurnalEntries = transaksiList.filter(t => t.tipe_transaksi === 'Jurnal');
    
    if (jurnalEntries.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 py-8">Belum ada data jurnal</p>';
        return;
    }
    
    // Hitung saldo per akun
    const saldoMap = {};
    jurnalEntries.forEach(entry => {
        if (!saldoMap[entry.akun_target]) {
            saldoMap[entry.akun_target] = 0;
        }
        
        if (entry.posisi_jurnal === 'Debet') {
            saldoMap[entry.akun_target] += entry.nominal;
        } else {
            saldoMap[entry.akun_target] -= entry.nominal;
        }
    });
    
    // Hitung laba bersih
    const pendapatan = Math.abs(saldoMap['Penjualan'] || 0);
    const hpp = Math.abs(saldoMap['Harga Pokok Penjualan'] || 0);
    const bebanGaji = Math.abs(saldoMap['Beban Gaji dan Upah'] || 0);
    const bebanListrik = Math.abs(saldoMap['Beban Listrik dan Air'] || 0);
    const bebanReparasi = Math.abs(saldoMap['Beban Reparasi'] || 0);
    const bebanPerlengkapan = Math.abs(saldoMap['Beban Perlengkapan'] || 0);
    const bebanSewa = Math.abs(saldoMap['Beban Sewa'] || 0);
    const bebanLainLain = Math.abs(saldoMap['Beban Lain-Lain'] || 0);
    const penyusutanPeralatan = Math.abs(saldoMap['Penyusutan Peralatan'] || 0);
    const penyusutanBangunan = Math.abs(saldoMap['Penyusutan Bangunan'] || 0);
    
    const labaKotor = pendapatan - hpp;
    const totalBeban = bebanGaji + bebanListrik + bebanReparasi + bebanPerlengkapan + bebanSewa + bebanLainLain + penyusutanPeralatan + penyusutanBangunan;
    const labaBersih = labaKotor - totalBeban;
    
    // Aktivitas Operasi
    const penambahanPiutang = saldoMap['Piutang Usaha'] || 0;
    const penambahanPersediaan = saldoMap['Persediaan Barang'] || 0;
    const penambahanPerlengkapan = saldoMap['Perlengkapan'] || 0;
    const penambahanSewaDimuka = saldoMap['Sewa Dibayar di Muka'] || 0;
    const hutangUsaha = Math.abs(saldoMap['Hutang Usaha'] || 0);
    const utangGaji = Math.abs(saldoMap['Utang Gaji'] || 0);
    const hutangListrik = Math.abs(saldoMap['Hutang Listrik dan Air'] || 0);
    
    const kasOperasi = labaBersih + penyusutanPeralatan + penyusutanBangunan - penambahanPiutang - penambahanPersediaan - penambahanPerlengkapan - penambahanSewaDimuka + hutangUsaha + utangGaji + hutangListrik;
    
    // Aktivitas Investasi
    const pembelianPeralatan = saldoMap['Peralatan'] || 0;
    const pembelianBangunan = saldoMap['Bangunan'] || 0;
    const kasInvestasi = -(pembelianPeralatan + pembelianBangunan);
    
    // Aktivitas Pendanaan
    const modalMasuk = Math.abs(saldoMap['Modal'] || 0);
    const hutangJangkaPanjang = Math.abs(saldoMap['Hutang Usaha Jangka Panjang'] || 0);
    const prive = Math.abs(saldoMap['Prive'] || 0);
    const kasPendanaan = modalMasuk + hutangJangkaPanjang - prive;
    
    const kasAwal = (saldoAwal['Kas di Tangan']?.nominal || 0) + (saldoAwal['Kas di Bank']?.nominal || 0);
    const perubahanKas = kasOperasi + kasInvestasi + kasPendanaan;
    
    const kasTangan = saldoMap['Kas di Tangan'] || 0;
    const kasBank = saldoMap['Kas di Bank'] || 0;
    const totalKas = kasTangan + kasBank;
    
    container.innerHTML = `
        <div class="bg-white p-6 rounded-lg border border-gray-200 max-w-3xl mx-auto shadow-sm">
            <h3 class="text-xl font-bold text-gray-800 mb-4 text-center border-b-2 pb-2">LAPORAN PERUBAHAN KAS</h3>
            <p class="text-center text-gray-700 font-medium text-sm">Kings Steak</p>
            <p class="text-center text-gray-600 text-xs mb-4">${getPeriodeString()}</p>
            <div class="space-y-3">
                <!-- Aktivitas Operasi -->
                <div class="border-b pb-3">
                    <div class="font-semibold text-sm mb-2">Aktivitas Operasi:</div>
                    <div class="flex justify-between pl-4 text-sm">
                        <span>Laba Bersih</span>
                        <span>${formatRupiah(labaBersih)}</span>
                    </div>
                    <div class="flex justify-between pl-4 text-sm">
                        <span>Penyesuaian:</span>
                    </div>
                    <div class="flex justify-between pl-8 text-xs">
                        <span>Penyusutan Peralatan</span>
                        <span>${formatRupiah(penyusutanPeralatan)}</span>
                    </div>
                    <div class="flex justify-between pl-8 text-xs">
                        <span>Penyusutan Bangunan</span>
                        <span>${formatRupiah(penyusutanBangunan)}</span>
                    </div>
                    <div class="flex justify-between pl-8 text-xs">
                        <span>Kenaikan Piutang</span>
                        <span>(${formatRupiah(Math.abs(penambahanPiutang))})</span>
                    </div>
                    <div class="flex justify-between pl-8 text-xs">
                        <span>Kenaikan Persediaan</span>
                        <span>(${formatRupiah(Math.abs(penambahanPersediaan))})</span>
                    </div>
                    <div class="flex justify-between pl-8 text-xs">
                        <span>Kenaikan Perlengkapan</span>
                        <span>(${formatRupiah(Math.abs(penambahanPerlengkapan))})</span>
                    </div>
                    <div class="flex justify-between pl-8 text-xs">
                        <span>Kenaikan Sewa Dibayar di Muka</span>
                        <span>(${formatRupiah(Math.abs(penambahanSewaDimuka))})</span>
                    </div>
                    <div class="flex justify-between pl-8 text-xs">
                        <span>Kenaikan Hutang Usaha</span>
                        <span>${formatRupiah(hutangUsaha)}</span>
                    </div>
                    <div class="flex justify-between pl-8 text-xs">
                        <span>Kenaikan Utang Gaji</span>
                        <span>${formatRupiah(utangGaji)}</span>
                    </div>
                    <div class="flex justify-between pl-8 text-xs">
                        <span>Kenaikan Hutang Listrik & Air</span>
                        <span>${formatRupiah(hutangListrik)}</span>
                    </div>
                    <div class="flex justify-between pl-4 text-sm font-semibold bg-blue-50 p-2 rounded mt-2">
                        <span>Kas dari Aktivitas Operasi</span>
                        <span>${formatRupiah(kasOperasi)}</span>
                    </div>
                </div>
                
                <!-- Aktivitas Investasi -->
                <div class="border-b pb-3">
                    <div class="font-semibold text-sm mb-2">Aktivitas Investasi:</div>
                    <div class="flex justify-between pl-4 text-sm">
                        <span>Pembelian Peralatan</span>
                        <span>(${formatRupiah(Math.abs(pembelianPeralatan))})</span>
                    </div>
                    <div class="flex justify-between pl-4 text-sm">
                        <span>Pembelian Bangunan</span>
                        <span>(${formatRupiah(Math.abs(pembelianBangunan))})</span>
                    </div>
                    <div class="flex justify-between pl-4 text-sm font-semibold bg-blue-50 p-2 rounded mt-2">
                        <span>Kas dari Aktivitas Investasi</span>
                        <span>${formatRupiah(kasInvestasi)}</span>
                    </div>
                </div>
                
                <!-- Aktivitas Pendanaan -->
                <div class="border-b pb-3">
                    <div class="font-semibold text-sm mb-2">Aktivitas Pendanaan:</div>
                    <div class="flex justify-between pl-4 text-sm">
                        <span>Penambahan Modal</span>
                        <span>${formatRupiah(modalMasuk)}</span>
                    </div>
                    <div class="flex justify-between pl-4 text-sm">
                        <span>Pinjaman Jangka Panjang</span>
                        <span>${formatRupiah(hutangJangkaPanjang)}</span>
                    </div>
                    <div class="flex justify-between pl-4 text-sm">
                        <span>Prive</span>
                        <span>(${formatRupiah(prive)})</span>
                    </div>
                    <div class="flex justify-between pl-4 text-sm font-semibold bg-blue-50 p-2 rounded mt-2">
                        <span>Kas dari Aktivitas Pendanaan</span>
                        <span>${formatRupiah(kasPendanaan)}</span>
                    </div>
                </div>
                
                <!-- Summary -->
                <div class="pt-2">
                    <div class="flex justify-between text-sm">
                        <span>Kas Awal Periode</span>
                        <span>${formatRupiah(kasAwal)}</span>
                    </div>
                    <div class="flex justify-between text-sm font-medium">
                        <span>Kenaikan (Penurunan) Kas</span>
                        <span>${formatRupiah(perubahanKas)}</span>
                    </div>
                    <div class="flex justify-between text-base font-bold bg-green-100 p-2 rounded mt-2">
                        <span>Kas Akhir Periode</span>
                        <span>${formatRupiah(totalKas)}</span>
                    </div>
                </div>
                
                <!-- Komposisi Kas -->
                <div class="border-t pt-3 mt-3">
                    <div class="text-sm font-medium mb-2">Komposisi Kas Akhir:</div>
                    <div class="flex justify-between pl-4 text-sm">
                        <span>Kas di Tangan</span>
                        <span>${formatRupiah(kasTangan)}</span>
                    </div>
                    <div class="flex justify-between pl-4 text-sm border-b pb-2">
                        <span>Kas di Bank</span>
                        <span>${formatRupiah
                            (kasBank)}</span>
</div>
<div class="flex justify-between text-sm font-semibold mt-2">
<span>Total Kas</span>
<span>${formatRupiah(totalKas)}</span>
</div>
</div>
</div>
</div>
`;
}
function renderLaporanModal() {
    const container = document.getElementById('laporan-modal-container');
    
    if (!container) return;
    
    const jurnalEntries = transaksiList.filter(t => t.tipe_transaksi === 'Jurnal');
    
    if (jurnalEntries.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 py-8">Belum ada data jurnal</p>';
        return;
    }
    
    // Hitung saldo per akun
    const saldoMap = {};
    jurnalEntries.forEach(entry => {
        if (!saldoMap[entry.akun_target]) {
            saldoMap[entry.akun_target] = 0;
        }
        
        if (entry.posisi_jurnal === 'Debet') {
            saldoMap[entry.akun_target] += entry.nominal;
        } else {
            saldoMap[entry.akun_target] -= entry.nominal;
        }
    });
    
    // Hitung laba bersih
    const pendapatan = Math.abs(saldoMap['Penjualan'] || 0);
    const hpp = Math.abs(saldoMap['Harga Pokok Penjualan'] || 0);
    const bebanGaji = Math.abs(saldoMap['Beban Gaji dan Upah'] || 0);
    const bebanListrik = Math.abs(saldoMap['Beban Listrik dan Air'] || 0);
    const bebanReparasi = Math.abs(saldoMap['Beban Reparasi'] || 0);
    const bebanPerlengkapan = Math.abs(saldoMap['Beban Perlengkapan'] || 0);
    const bebanSewa = Math.abs(saldoMap['Beban Sewa'] || 0);
    const bebanLainLain = Math.abs(saldoMap['Beban Lain-Lain'] || 0);
    const penyusutanPeralatan = Math.abs(saldoMap['Penyusutan Peralatan'] || 0);
    const penyusutanBangunan = Math.abs(saldoMap['Penyusutan Bangunan'] || 0);
    
    const labaKotor = pendapatan - hpp;
    const totalBeban = bebanGaji + bebanListrik + bebanReparasi + bebanPerlengkapan + bebanSewa + bebanLainLain + penyusutanPeralatan + penyusutanBangunan;
    const labaBersih = labaKotor - totalBeban;
    
    const modalAwal = saldoAwal['Modal']?.nominal || 0;
    const penambahanModal = Math.abs(saldoMap['Modal'] || 0);
    const prive = Math.abs(saldoMap['Prive'] || 0);
    const modalAkhir = modalAwal + penambahanModal + labaBersih - prive;
    
    container.innerHTML = `
        <div class="bg-white p-6 rounded-lg border border-gray-200 max-w-2xl mx-auto shadow-sm">
            <h3 class="text-xl font-bold text-gray-800 mb-4 text-center border-b-2 pb-2">LAPORAN PERUBAHAN MODAL</h3>
            <p class="text-center text-gray-700 font-medium text-sm">Kings Steak</p>
            <p class="text-center text-gray-600 text-xs mb-4">${getPeriodeString()}</p>
            <div class="space-y-3">
                <div class="flex justify-between text-sm">
                    <span>Modal Awal Periode</span>
                    <span>${formatRupiah(modalAwal)}</span>
                </div>
                
                <div class="border-t pt-2">
                    <div class="text-sm font-medium mb-2">Penambahan Modal:</div>
                    <div class="flex justify-between pl-4 text-sm">
                        <span>Setoran Modal dari Owner</span>
                        <span>${formatRupiah(penambahanModal)}</span>
                    </div>
                    <div class="flex justify-between pl-4 text-sm">
                        <span>Laba Bersih</span>
                        <span>${formatRupiah(labaBersih)}</span>
                    </div>
                    <div class="flex justify-between text-sm font-semibold bg-green-50 p-2 rounded mt-2">
                        <span>Total Penambahan</span>
                        <span>${formatRupiah(penambahanModal + labaBersih)}</span>
                    </div>
                </div>
                
                <div class="border-t pt-2">
                    <div class="text-sm font-medium mb-2">Pengurangan Modal:</div>
                    <div class="flex justify-between pl-4 text-sm">
                        <span>Prive</span>
                        <span>(${formatRupiah(prive)})</span>
                    </div>
                    <div class="flex justify-between text-sm font-semibold bg-red-50 p-2 rounded mt-2">
                        <span>Total Pengurangan</span>
                        <span>(${formatRupiah(prive)})</span>
                    </div>
                </div>
                
                <div class="border-t-2 pt-3 mt-3">
                    <div class="flex justify-between text-base font-bold bg-blue-100 p-3 rounded">
                        <span>Modal Akhir Periode</span>
                        <span>${formatRupiah(modalAkhir)}</span>
                    </div>
                </div>
                
                <div class="bg-gray-50 p-3 rounded text-xs text-gray-600 mt-4">
                    <div class="font-medium mb-1">Catatan:</div>
                    <div>Modal Akhir = Modal Awal + Penambahan Modal + Laba Bersih - Prive</div>
                    <div>Modal Akhir = ${formatRupiah(modalAwal)} + ${formatRupiah(penambahanModal)} + ${formatRupiah(labaBersih)} - ${formatRupiah(prive)}</div>
                    <div class="font-medium">Modal Akhir = ${formatRupiah(modalAkhir)}</div>
                </div>
            </div>
        </div>
    `;
}
function renderDiagram() {
    console.log('renderDiagram called');
    
    const jurnalEntries = transaksiList.filter(t => t.tipe_transaksi === 'Jurnal');
    
    if (jurnalEntries.length === 0) {
        console.log('No jurnal entries');
        return;
    }
    
    // Hitung saldo per akun
    const saldoMap = {};
    jurnalEntries.forEach(entry => {
        if (!saldoMap[entry.akun_target]) {
            saldoMap[entry.akun_target] = 0;
        }
        
        if (entry.posisi_jurnal === 'Debet') {
            saldoMap[entry.akun_target] += entry.nominal;
        } else {
            saldoMap[entry.akun_target] -= entry.nominal;
        }
    });
    
    console.log('Saldo Map:', saldoMap);
    
    // Data untuk Laba Rugi
    const pendapatan = Math.abs(saldoMap['Penjualan'] || 0);
    const hpp = Math.abs(saldoMap['Harga Pokok Penjualan'] || 0);
    const bebanGaji = Math.abs(saldoMap['Beban Gaji dan Upah'] || 0);
    const bebanListrik = Math.abs(saldoMap['Beban Listrik dan Air'] || 0);
    const bebanReparasi = Math.abs(saldoMap['Beban Reparasi'] || 0);
    const bebanPerlengkapan = Math.abs(saldoMap['Beban Perlengkapan'] || 0);
    const bebanSewa = Math.abs(saldoMap['Beban Sewa'] || 0);
    const penyusutanPeralatan = Math.abs(saldoMap['Penyusutan Peralatan'] || 0);
    const penyusutanBangunan = Math.abs(saldoMap['Penyusutan Bangunan'] || 0);
    
    const labaKotor = pendapatan - hpp;
    const totalBeban = bebanGaji + bebanListrik + bebanReparasi + bebanPerlengkapan + bebanSewa + penyusutanPeralatan + penyusutanBangunan;
    const labaBersih = labaKotor - totalBeban;
    
    console.log('Data Laba Rugi:', { pendapatan, hpp, labaKotor, totalBeban, labaBersih });
    
    // Destroy existing charts
    if (chartLabaRugi) {
        chartLabaRugi.destroy();
        chartLabaRugi = null;
    }
    if (chartAset) {
        chartAset.destroy();
        chartAset = null;
    }
    if (chartBeban) {
        chartBeban.destroy();
        chartBeban = null;
    }
    if (chartLiabilitas) {
        chartLiabilitas.destroy();
        chartLiabilitas = null;
    }
    
    // Tunggu sebentar untuk memastikan Chart.js loaded
    setTimeout(() => {
        // Chart Laba Rugi (Bar)
        const ctxLabaRugi = document.getElementById('chartLabaRugi');
        console.log('Canvas Laba Rugi:', ctxLabaRugi);
        
        if (ctxLabaRugi && typeof Chart !== 'undefined') {
            try {
                chartLabaRugi = new Chart(ctxLabaRugi.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ['Pendapatan', 'HPP', 'Laba Kotor', 'Total Beban', 'Laba Bersih'],
                        datasets: [{
                            label: 'Nominal (Rp)',
                            data: [pendapatan, hpp, labaKotor, totalBeban, labaBersih],
                            backgroundColor: [
                                'rgba(34, 197, 94, 0.8)',
                                'rgba(239, 68, 68, 0.8)',
                                'rgba(59, 130, 246, 0.8)',
                                'rgba(251, 146, 60, 0.8)',
                                'rgba(168, 85, 247, 0.8)'
                            ],
                            borderColor: [
                                'rgb(34, 197, 94)',
                                'rgb(239, 68, 68)',
                                'rgb(59, 130, 246)',
                                'rgb(251, 146, 60)',
                                'rgb(168, 85, 247)'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                display: false
                            },
                            title: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return 'Rp ' + value.toLocaleString('id-ID');
                                    }
                                }
                            }
                        }
                    }
                });
                console.log('Chart Laba Rugi created successfully');
            } catch (e) {
                console.error('Error creating chartLabaRugi:', e);
            }
        } else {
            console.error('Canvas not found or Chart.js not loaded');
        }
        
        // Data untuk Aset
        const kasTangan = Math.abs(saldoMap['Kas di Tangan'] || 0);
        const kasBank = Math.abs(saldoMap['Kas di Bank'] || 0);
        const piutang = Math.abs(saldoMap['Piutang Usaha'] || 0);
        const persediaan = Math.abs(saldoMap['Persediaan Barang'] || 0);
        const peralatan = Math.abs(saldoMap['Peralatan'] || 0);
        const bangunan = Math.abs(saldoMap['Bangunan'] || 0);
        
        // Chart Aset (Pie)
        const ctxAset = document.getElementById('chartAset');
        if (ctxAset && typeof Chart !== 'undefined') {
            try {
                chartAset = new Chart(ctxAset.getContext('2d'), {
                    type: 'pie',
                    data: {
                        labels: ['Kas Tangan', 'Kas Bank', 'Piutang', 'Persediaan', 'Peralatan', 'Bangunan'],
                        datasets: [{
                            data: [kasTangan, kasBank, piutang, persediaan, peralatan, bangunan],
                            backgroundColor: [
                                'rgba(34, 197, 94, 0.8)',
                                'rgba(59, 130, 246, 0.8)',
                                'rgba(251, 146, 60, 0.8)',
                                'rgba(168, 85, 247, 0.8)',
                                'rgba(236, 72, 153, 0.8)',
                                'rgba(250, 204, 21, 0.8)'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return context.label + ': Rp ' + context.parsed.toLocaleString('id-ID');
                                    }
                                }
                            }
                        }
                    }
                });
                console.log('Chart Aset created successfully');
            } catch (e) {
                console.error('Error creating chartAset:', e);
            }
        }
        
        // Chart Beban (Bar)
        const ctxBeban = document.getElementById('chartBeban');
        if (ctxBeban && typeof Chart !== 'undefined') {
            try {
                chartBeban = new Chart(ctxBeban.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ['Gaji', 'Listrik', 'Reparasi', 'Perlengkapan', 'Sewa', 'Peny. Alat', 'Peny. Bang'],
                        datasets: [{
                            label: 'Beban (Rp)',
                            data: [bebanGaji, bebanListrik, bebanReparasi, bebanPerlengkapan, bebanSewa, penyusutanPeralatan, penyusutanBangunan],
                            backgroundColor: 'rgba(239, 68, 68, 0.8)',
                            borderColor: 'rgb(239, 68, 68)',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return 'Rp ' + value.toLocaleString('id-ID');
                                    }
                                }
                            }
                        }
                    }
                });
                console.log('Chart Beban created successfully');
            } catch (e) {
                console.error('Error creating chartBeban:', e);
            }
        }
        
        // Data untuk Liabilitas & Ekuitas
        const hutangUsaha = Math.abs(saldoMap['Hutang Usaha'] || 0);
        const hutangJangkaPanjang = Math.abs(saldoMap['Hutang Usaha Jangka Panjang'] || 0);
        const modal = Math.abs(saldoMap['Modal'] || 0);
        const prive = Math.abs(saldoMap['Prive'] || 0);
        const modalAkhir = modal + labaBersih - prive;
        
        // Chart Liabilitas & Ekuitas (Pie)
        const ctxLiabilitas = document.getElementById('chartLiabilitas');
        if (ctxLiabilitas && typeof Chart !== 'undefined') {
            try {
                chartLiabilitas = new Chart(ctxLiabilitas.getContext('2d'), {
                    type: 'pie',
                    data: {
                        labels: ['Hutang Usaha', 'Hutang Jk Panjang', 'Ekuitas/Modal'],
                        datasets: [{
                            data: [hutangUsaha, hutangJangkaPanjang, modalAkhir],
                            backgroundColor: [
                                'rgba(239, 68, 68, 0.8)',
                                'rgba(251, 146, 60, 0.8)',
                                'rgba(34, 197, 94, 0.8)'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return context.label + ': Rp ' + context.parsed.toLocaleString('id-ID');
                                    }
                                }
                            }
                        }
                    }
                });
                console.log('Chart Liabilitas created successfully');
            } catch (e) {
                console.error('Error creating chartLiabilitas:', e);
            }
        }
    }, 300); // Delay 300ms untuk memastikan Chart.js ready
}
function arsipkanHalaman(name){ showToast(name+' - arsip belum tersedia di mode terpisah','error'); }
async function flushSync(){return}
async function resetData(){ showToast('Reset data tidak diimplementasikan di mode terpisah','error'); }

async function init() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    updatePeriodeDisplay();
    checkArchiveStatus();
    setInterval(checkArchiveStatus, 3600000);
    
    // ✅ PERBAIKAN: Cek apakah localStorage kosong
    try {
        const savedTransaksi = localStorage.getItem('transaksiList');
        const savedMenuInfo = localStorage.getItem('menuInfoMap');
        
        // Jika tidak ada data, gunakan data awal
        if (!savedTransaksi || savedTransaksi === '[]') {
            console.log('Tidak ada data, memuat data awal...');
            
            // Load data awal dari initialData.js
            if (typeof initialTransaksi !== 'undefined') {
                transaksiList = [...initialTransaksi];
                window.menuInfoMap = {...initialMenuInfo};
                
                // Simpan ke localStorage
                localStorage.setItem('transaksiList', JSON.stringify(transaksiList));
                localStorage.setItem('menuInfoMap', JSON.stringify(window.menuInfoMap));
                
                console.log('Data awal dimuat:', transaksiList.length, 'transaksi');
            } else {
                console.warn('initialData.js belum dimuat');
                transaksiList = [];
                window.menuInfoMap = {};
            }
        } else {
            // Load dari localStorage
            transaksiList = JSON.parse(savedTransaksi);
            console.log('Loaded', transaksiList.length, 'transactions from localStorage');
        }
        
        if (savedMenuInfo) {
            window.menuInfoMap = JSON.parse(savedMenuInfo);
            console.log('Loaded menu info map from localStorage');
        }
        
        // ✅ Generate jurnal otomatis untuk data awal
        const needsJurnal = transaksiList.filter(t => !t.is_jurnal_otomatis);
        const existingJurnal = transaksiList.filter(t => t.is_jurnal_otomatis);
        
        if (needsJurnal.length > 0 && existingJurnal.length === 0) {
            console.log('Generating jurnal entries for initial data...');
            
            for (const trx of needsJurnal) {
                const jurnalEntries = await buatJurnalOtomatis(
                    trx.keterangan, 
                    trx.nominal, 
                    trx.tanggal
                );
                
                transaksiList.push(...jurnalEntries);
            }
            
            // Simpan kembali dengan jurnal
            localStorage.setItem('transaksiList', JSON.stringify(transaksiList));
            console.log('Jurnal entries generated:', transaksiList.length, 'total entries');
        }
        
        // ✅ Render semua dashboard
        if (transaksiList.length > 0) {
            console.log('Rendering dashboards with', transaksiList.length, 'entries...');
            updateRingkasan();
            renderRiwayat();
            renderJurnalUmum();
            renderBukuBesar();
            renderNeracaSaldo();
            renderLaporanKeuangan();
            renderLaporanKas();
            renderLaporanModal();
            renderDiagram();
            console.log('All dashboards rendered successfully');
        }
    } catch(e) {
        console.error('Error in init():', e);
        showToast('Gagal memuat data: ' + e.message, 'error');
    }
}

/**
 * Download konten dashboard sebagai PDF
 * @param {string} elementId - ID elemen yang akan di-download
 * @param {string} filename - Nama file PDF (tanpa ekstensi)
 */

/**
 * Download PDF dengan header khusus untuk laporan
 * @param {string} elementId - ID elemen konten
 * @param {string} filename - Nama file
 * @param {string} title - Judul laporan
 */

/**
 * Download PDF dengan header khusus untuk laporan
 * @param {string} elementId - ID elemen konten
 * @param {string} filename - Nama file
 * @param {string} title - Judul laporan
 */
/**
 * Download PDF dengan header khusus untuk laporan
 * @param {string} elementId - ID elemen konten
 * @param {string} filename - Nama file
 * @param {string} title - Judul laporan
 */
/**
 * Download PDF dengan header khusus untuk laporan
 * @param {string} elementId - ID elemen konten
 * @param {string} filename - Nama file
 * @param {string} title - Judul laporan
 */
function downloadPDFWithHeader(elementId, filename, title) {
    const element = document.getElementById(elementId);
    
    if (!element) {
        showToast('Elemen tidak ditemukan!', 'error');
        return;
    }
    
    // Buat window baru untuk print
    const printWindow = window.open('', '_blank');
    
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; margin-bottom: 20px; border-bottom: 3px solid #1e40af; padding-bottom: 15px; }
                .header h1 { font-size: 24px; color: #1e40af; margin: 0; }
                button { display: none !important; }
                @media print {
                    button, .hidden { display: none !important; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${title}</h1>
                <p>Kings Steak</p>
                <p>Jl. Taman Siswa, Gunung Pati</p>
                <p>${getPeriodeString()}</p>
                <p>Dicetak: ${new Date().toLocaleString('id-ID')}</p>
            </div>
            ${element.innerHTML}
        </body>
        </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
        showToast('Silakan pilih "Save as PDF" di dialog print', 'success');
    }, 500);
}
// Panggil saat page load
window.addEventListener('load', () => {
    setTimeout(() => {
        testPDFLibrary();
    }, 2000);
});

// ========== EXPORT DATA ==========
function exportData() {
    const allData = {};

    // Ambil semua data localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        allData[key] = localStorage.getItem(key);
    }

    // Convert ke JSON
    const dataStr = JSON.stringify(allData, null, 2);

    // Simpan sebagai file
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "kings_steak_backup.json";
    a.click();
    URL.revokeObjectURL(url);

    alert("Export berhasil! File JSON sudah diunduh.");
}


// ========== IMPORT DATA ==========
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            // Parse file JSON
            const importedData = JSON.parse(e.target.result);

            // Masukkan ke localStorage
            for (let key in importedData) {
                localStorage.setItem(key, importedData[key]);
            }

            alert("Import data berhasil! Refresh halaman.");
            location.reload();

        } catch (error) {
            alert("Gagal membaca file. Pastikan file JSON benar.");
        }
    };

    reader.readAsText(file);
}
