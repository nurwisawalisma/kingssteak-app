/* JavaScript extracted from KINGSindex.html */

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
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        document.getElementById('main-app').classList.add('flex');

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
        
        // Trigger all dashboard renders for synchronization
        setTimeout(() => {
            renderRiwayat();
            renderJurnalUmum();
            renderBukuBesar();
            renderNeracaSaldo();
            renderLaporanKeuangan();
            renderLaporanKas();
            renderLaporanModal();
            renderDiagram();
        }, 100);
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
window.menuInfoMap = {};

// Simple wrapper to save transaksi — original implementation in HTML used multiple variants; provide a safe consolidated version
async function simpanData() {
    try {
        const tipeTransaksi = document.getElementById('tipe-transaksi').value;
        const kategori = document.getElementById('kategori-transaksi').value;
        const nominal = parseFloat(document.getElementById('nominal-transaksi').value);

        const keteranganSelect = document.getElementById('keterangan-select');
        const keteranganInput = document.getElementById('keterangan-input');
        const keterangan = keteranganSelect.classList.contains('hidden') ? keteranganInput.value : keteranganSelect.value;

        if (!tipeTransaksi || !kategori || !nominal || nominal <= 0) { showToast('Mohon lengkapi semua field yang diperlukan!', 'error'); return; }

        if (transaksiList.length >= 999) { showToast('Maksimal 999 transaksi telah tercapai. Hapus beberapa transaksi terlebih dahulu.', 'error'); return; }

        const tanggal = new Date().toISOString();
        const transaksiBaru = { id: Date.now().toString(), tipe_transaksi: tipeTransaksi, kategori: kategori, nominal: nominal, keterangan: keterangan || '', tanggal: tanggal, created_at: new Date().toISOString() };

        if (kategori === 'Penjualan Makanan') {
            const jenisMenu = document.getElementById('jenis-menu').value;
            const pilihanSaus = document.getElementById('pilihan-saus').value;
            const unitTerjual = parseFloat(document.getElementById('unit-terjual').value) || 1;
            window.menuInfoMap[transaksiBaru.id] = { jenis: jenisMenu === 'grill' ? 'Grill' : 'Crispy', saus: pilihanSaus.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), unit: unitTerjual };
        }

        const btnSimpan = document.getElementById('btn-simpan-data'); if (btnSimpan) { btnSimpan.disabled = true; btnSimpan.textContent = 'Menyimpan...'; }

        transaksiList.push(transaksiBaru);
        try { localStorage.setItem('transaksiList', JSON.stringify(transaksiList)); } catch(e) { console.warn('localStorage error', e); }
        dataHandler.onDataChanged(transaksiList);

        const jurnalEntries = await buatJurnalOtomatis(keterangan, nominal, tanggal);
        for (const entry of jurnalEntries) { transaksiList.push(entry); try { localStorage.setItem('transaksiList', JSON.stringify(transaksiList)); } catch(e) {} dataHandler.onDataChanged(transaksiList); }

        document.getElementById('form-transaksi').reset(); document.getElementById('menu-container').classList.add('hidden'); document.getElementById('saus-container').classList.add('hidden'); document.getElementById('nominal-transaksi').readOnly = false; document.getElementById('nominal-transaksi').style.backgroundColor = '';
        showToast('Data tersimpan (lokal). Akan disinkronkan jika koneksi tersedia.', 'success');
        if (btnSimpan) { btnSimpan.disabled = false; btnSimpan.textContent = 'Simpan Data'; }
    } catch (e) { console.error(e); showToast('Terjadi kesalahan saat menyimpan', 'error'); }
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

    const downloadIds = ['btn-download-riwayat','btn-download-diagram','btn-download-jurnal-umum','btn-download-buku-besar','btn-download-neraca-saldo','btn-download-laporan-keuangan','btn-download-laporan-kas','btn-download-laporan-modal'];
    const downloadMap = {
        'btn-download-riwayat': downloadRiwayat,
        'btn-download-jurnal-umum': downloadJurnalUmum,
        'btn-download-buku-besar': downloadBukuBesar,
        'btn-download-neraca-saldo': downloadNeracaSaldo,
        'btn-download-laporan-keuangan': downloadLaporanKeuangan,
        'btn-download-laporan-kas': downloadLaporanKas,
        'btn-download-laporan-modal': downloadLaporanModal,
        'btn-download-diagram': () => showToast('Diagram download sedang dalam pengembangan','info')
    };
    downloadIds.forEach(id => { 
        const b = document.getElementById(id); 
        if (b && downloadMap[id]) b.addEventListener('click', downloadMap[id]); 
    });

    init();
});

// ============= RENDER FUNCTIONS WITH KOP/HEADER =============

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
    'Harga Pokok Penjualan': { nominal: 2000000, posisi: 'Debet' },
    'Beban Listrik dan Air': { nominal: 800000, posisi: 'Debet' },
    'Beban Sewa': { nominal: 500000, posisi: 'Debet' },
    'Beban Perlengkapan': { nominal: 600000, posisi: 'Debet' },
    'Beban Reparasi': { nominal: 500000, posisi: 'Debet' },
    'Beban Gaji dan Upah': { nominal: 3500000, posisi: 'Debet' },
    'Beban Lain-Lain': { nominal: 300000, posisi: 'Debet' },
    'Penjualan': { nominal: 715000, posisi: 'Kredit' },
    'Piutang Usaha': { nominal: 200000, posisi: 'Debet' },
    'Utang Gaji': { nominal: 200000, posisi: 'Kredit' },
    'Hutang Listrik dan Air': { nominal: 50000, posisi: 'Kredit' },
    'Sewa Dibayar di Muka': { nominal: 600000, posisi: 'Debet' },
    'Modal': { nominal: 30000000, posisi: 'Kredit' },
    'Prive': { nominal: 100000, posisi: 'Debet' }
};

function getPeriodeString() {
    return `Per ${getNamaBulan(currentPeriod.bulan)} ${currentPeriod.tahun}`;
}

function renderJurnalUmum() {
    const jurnalBody = document.getElementById('jurnal-umum-body');
    const jurnalEntries = transaksiList.filter(t => t.tipe_transaksi === 'Jurnal');

    if (jurnalEntries.length === 0) {
        jurnalBody.innerHTML = '<tr><td colspan="4" class="px-4 py-8 text-center text-gray-500">Belum ada data</td></tr>';
        return;
    }

    const sortedEntries = [...jurnalEntries].sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
    const groupedByTime = {};
    sortedEntries.forEach(entry => {
        const baseId = entry.id.split('-')[0];
        if (!groupedByTime[baseId]) groupedByTime[baseId] = [];
        groupedByTime[baseId].push(entry);
    });

    let html = '';
    Object.keys(groupedByTime).forEach(baseId => {
        const entries = groupedByTime[baseId];
        const firstEntry = entries[0];
        const transaksiAsli = transaksiList.find(t => !t.is_jurnal_otomatis && Math.abs(new Date(t.tanggal).getTime() - new Date(firstEntry.tanggal).getTime()) < 1000);
        const keteranganTransaksi = transaksiAsli ? transaksiAsli.keterangan : '';

        if (keteranganTransaksi) {
            html += `<tr class="border-t-2 border-gray-300 bg-blue-50"><td colspan="4" class="px-4 py-2 text-sm font-semibold text-blue-800">${keteranganTransaksi.toUpperCase()}</td></tr>`;
        }

        entries.forEach(entry => {
            html += `<tr class="border-t border-gray-200">
                <td class="px-4 py-3 text-sm text-gray-700">${new Date(entry.tanggal).toLocaleDateString('id-ID')}</td>
                <td class="px-4 py-3 text-sm text-gray-700 pl-8">${entry.keterangan}</td>
                <td class="px-4 py-3 text-sm text-right ${entry.posisi_jurnal === 'Debet' ? 'text-green-600 font-medium' : 'text-gray-400'}">
                    ${entry.posisi_jurnal === 'Debet' ? formatRupiah(entry.nominal) : '-'}
                </td>
                <td class="px-4 py-3 text-sm text-right ${entry.posisi_jurnal === 'Kredit' ? 'text-red-600 font-medium' : 'text-gray-400'}">
                    ${entry.posisi_jurnal === 'Kredit' ? formatRupiah(entry.nominal) : '-'}
                </td>
            </tr>`;
        });
    });

    jurnalBody.innerHTML = html;
}

function renderBukuBesar() {
    const container = document.getElementById('buku-besar-container');
    const pilihAkun = document.getElementById('pilih-akun-buku-besar').value;
    const jurnalEntries = transaksiList.filter(t => t.tipe_transaksi === 'Jurnal');

    if (!pilihAkun) {
        container.innerHTML = '<p class="text-center text-gray-500 py-8">Pilih akun untuk melihat buku besar</p>';
        return;
    }

    const entries = jurnalEntries.filter(e => e.akun_target === pilihAkun).sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

    let saldo = 0;
    if (saldoAwal[pilihAkun]) {
        saldo = saldoAwal[pilihAkun].posisi === 'Debet' ? saldoAwal[pilihAkun].nominal : -saldoAwal[pilihAkun].nominal;
    }

    let html = `<div class="bg-white p-4 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">BUKU BESAR</h3>
        <p class="text-sm font-medium text-gray-700 mb-4">Akun: ${pilihAkun}</p>
        <table class="w-full">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-600">Tanggal</th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-600">Debet</th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-600">Kredit</th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-600">Saldo</th>
                </tr>
            </thead>
            <tbody>`;

    if (saldoAwal[pilihAkun]) {
        html += `<tr class="border-t border-gray-100 bg-yellow-50">
            <td class="px-3 py-2 text-xs text-gray-700 font-semibold">Saldo Awal</td>
            <td class="px-3 py-2 text-xs text-right ${saldoAwal[pilihAkun].posisi === 'Debet' ? 'text-green-600 font-medium' : 'text-gray-400'}">
                ${saldoAwal[pilihAkun].posisi === 'Debet' ? formatRupiah(saldoAwal[pilihAkun].nominal) : '-'}
            </td>
            <td class="px-3 py-2 text-xs text-right ${saldoAwal[pilihAkun].posisi === 'Kredit' ? 'text-red-600 font-medium' : 'text-gray-400'}">
                ${saldoAwal[pilihAkun].posisi === 'Kredit' ? formatRupiah(saldoAwal[pilihAkun].nominal) : '-'}
            </td>
            <td class="px-3 py-2 text-xs text-right font-medium ${saldo >= 0 ? 'text-blue-600' : 'text-orange-600'}">
                ${formatRupiah(Math.abs(saldo))} ${saldo >= 0 ? '(D)' : '(K)'}
            </td>
        </tr>`;
    }

    entries.forEach(entry => {
        if (entry.posisi_jurnal === 'Debet') saldo += entry.nominal;
        else saldo -= entry.nominal;

        html += `<tr class="border-t border-gray-100">
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
        </tr>`;
    });

    html += `</tbody></table></div>`;
    container.innerHTML = html;
}

function renderNeracaSaldo() {
    const tbody = document.getElementById('neraca-saldo-body');
    const jurnalEntries = transaksiList.filter(t => t.tipe_transaksi === 'Jurnal');

    const saldoMap = {};
    Object.keys(saldoAwal).forEach(akun => {
        saldoMap[akun] = saldoAwal[akun].posisi === 'Debet' ? saldoAwal[akun].nominal : -saldoAwal[akun].nominal;
    });

    jurnalEntries.forEach(entry => {
        if (!saldoMap[entry.akun_target]) saldoMap[entry.akun_target] = 0;
        if (entry.posisi_jurnal === 'Debet') saldoMap[entry.akun_target] += entry.nominal;
        else saldoMap[entry.akun_target] -= entry.nominal;
    });

    const kategoriAkun = {
        'ASET': ['Kas di Tangan', 'Kas di Bank', 'Piutang Usaha', 'Persediaan Barang', 'Sewa Dibayar di Muka', 'Perlengkapan', 'Peralatan', 'Akumulasi Penyusutan Peralatan', 'Bangunan', 'Akumulasi Penyusutan Bangunan'],
        'HUTANG': ['Hutang Usaha', 'Utang Gaji', 'Hutang Listrik dan Air', 'Hutang Usaha Jangka Panjang'],
        'MODAL': ['Modal', 'Prive'],
        'PENDAPATAN': ['Penjualan'],
        'BEBAN': ['Harga Pokok Penjualan', 'Beban Gaji dan Upah', 'Beban Listrik dan Air', 'Beban Reparasi', 'Beban Perlengkapan', 'Beban Sewa', 'Beban Lain-Lain']
    };

    let totalDebet = 0, totalKredit = 0, html = '';

    for (const [kategori, akunList] of Object.entries(kategoriAkun)) {
        html += `<tr class="bg-blue-100"><td colspan="3" class="px-4 py-2 text-sm font-bold text-blue-800">${kategori}</td></tr>`;

        akunList.forEach(akun => {
            if (saldoMap[akun] !== undefined) {
                const saldo = saldoMap[akun];
                const debetValue = saldo >= 0 ? Math.abs(saldo) : 0;
                const kreditValue = saldo < 0 ? Math.abs(saldo) : 0;

                totalDebet += debetValue;
                totalKredit += kreditValue;

                html += `<tr class="border-t border-gray-200">
                    <td class="px-4 py-3 text-sm text-gray-700 pl-8">${akun}</td>
                    <td class="px-4 py-3 text-sm text-right ${debetValue > 0 ? 'text-green-600 font-medium' : 'text-gray-400'}">${debetValue > 0 ? formatRupiah(debetValue) : '-'}</td>
                    <td class="px-4 py-3 text-sm text-right ${kreditValue > 0 ? 'text-red-600 font-medium' : 'text-gray-400'}">${kreditValue > 0 ? formatRupiah(kreditValue) : '-'}</td>
                </tr>`;
            }
        });
    }

    html += `<tr class="border-t-2 border-gray-300 bg-gray-50 font-bold">
        <td class="px-4 py-3 text-sm text-gray-800">TOTAL</td>
        <td class="px-4 py-3 text-sm text-right text-green-700">${formatRupiah(totalDebet)}</td>
        <td class="px-4 py-3 text-sm text-right text-red-700">${formatRupiah(totalKredit)}</td>
    </tr>`;

    tbody.innerHTML = html;
}

function renderLaporanKeuangan() {
    const container = document.getElementById('laporan-keuangan-container');
    const jurnalEntries = transaksiList.filter(t => t.tipe_transaksi === 'Jurnal');

    const saldoMap = {};
    jurnalEntries.forEach(entry => {
        if (!saldoMap[entry.akun_target]) saldoMap[entry.akun_target] = 0;
        if (entry.posisi_jurnal === 'Debet') saldoMap[entry.akun_target] += entry.nominal;
        else saldoMap[entry.akun_target] -= entry.nominal;
    });

    const pendapatan = Math.abs(saldoMap['Penjualan'] || 0);
    const hpp = Math.abs(saldoMap['Harga Pokok Penjualan'] || 0);
    const bebanGaji = Math.abs(saldoMap['Beban Gaji dan Upah'] || 0);
    const bebanListrik = Math.abs(saldoMap['Beban Listrik dan Air'] || 0);
    const bebanReparasi = Math.abs(saldoMap['Beban Reparasi'] || 0);
    const bebanPerlengkapan = Math.abs(saldoMap['Beban Perlengkapan'] || 0);
    const bebanSewa = Math.abs(saldoMap['Beban Sewa'] || 0);

    const labaKotor = pendapatan - hpp;
    const totalBeban = bebanGaji + bebanListrik + bebanReparasi + bebanPerlengkapan + bebanSewa;
    const labaBersih = labaKotor - totalBeban;

    const kasTangan = saldoMap['Kas di Tangan'] || 0;
    const kasBank = saldoMap['Kas di Bank'] || 0;
    const piutang = saldoMap['Piutang Usaha'] || 0;
    const persediaan = saldoMap['Persediaan Barang'] || 0;
    const perlengkapan = saldoMap['Perlengkapan'] || 0;
    const peralatan = saldoMap['Peralatan'] || 0;
    const bangunan = saldoMap['Bangunan'] || 0;

    const totalAsetLancar = kasTangan + kasBank + piutang + persediaan + perlengkapan;
    const totalAsetTetap = peralatan + bangunan;
    const totalAset = totalAsetLancar + totalAsetTetap;

    const hutangUsaha = Math.abs(saldoMap['Hutang Usaha'] || 0);
    const hutangJangkaPanjang = Math.abs(saldoMap['Hutang Usaha Jangka Panjang'] || 0);
    const totalLiabilitas = hutangUsaha + hutangJangkaPanjang;

    const modal = saldoMap['Modal'] || 0;
    const prive = Math.abs(saldoMap['Prive'] || 0);
    const modalAkhir = modal + labaBersih - prive;

    container.innerHTML = `<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg border border-gray-200">
            <h3 class="text-xl font-bold text-gray-800 mb-2 text-center border-b-2 pb-2">LAPORAN LABA RUGI</h3>
            <p class="text-center text-gray-700 font-medium text-sm">Kings Steak</p>
            <p class="text-center text-gray-600 text-xs mb-4">${getPeriodeString()}</p>
            <div class="space-y-2 text-sm">
                <div class="flex justify-between font-semibold">Pendapatan Penjualan <span class="text-green-600">${formatRupiah(pendapatan)}</span></div>
                <div class="flex justify-between">(Harga Pokok Penjualan) <span class="text-red-600">(${formatRupiah(hpp)})</span></div>
                <div class="flex justify-between border-b-2 border-green-400 pb-2 font-bold">Laba Kotor <span class="text-green-600">${formatRupiah(labaKotor)}</span></div>
                <div class="pt-2"><div class="font-semibold mb-2">Beban Operasional:</div></div>
                <div class="flex justify-between pl-4">(Beban Gaji) <span class="text-red-600">(${formatRupiah(bebanGaji)})</span></div>
                <div class="flex justify-between pl-4">(Beban Listrik) <span class="text-red-600">(${formatRupiah(bebanListrik)})</span></div>
                <div class="flex justify-between pl-4">(Beban Reparasi) <span class="text-red-600">(${formatRupiah(bebanReparasi)})</span></div>
                <div class="flex justify-between pl-4">(Beban Perlengkapan) <span class="text-red-600">(${formatRupiah(bebanPerlengkapan)})</span></div>
                <div class="flex justify-between pl-4 border-b pb-2">(Beban Sewa) <span class="text-red-600">(${formatRupiah(bebanSewa)})</span></div>
                <div class="flex justify-between border-b-2 border-gray-300 pb-2 font-bold">Laba Bersih <span class="${labaBersih >= 0 ? 'text-green-600' : 'text-red-600'}">${formatRupiah(Math.abs(labaBersih))}</span></div>
            </div>
        </div>
        <div class="bg-white p-6 rounded-lg border border-gray-200">
            <h3 class="text-xl font-bold text-gray-800 mb-2 text-center border-b-2 pb-2">LAPORAN POSISI KEUANGAN</h3>
            <p class="text-center text-gray-700 font-medium text-sm">Kings Steak</p>
            <p class="text-center text-gray-600 text-xs mb-4">${getPeriodeString()}</p>
            <div class="space-y-2 text-sm">
                <div class="font-semibold mb-2">ASET</div>
                <div class="flex justify-between pl-4">Kas <span>${formatRupiah(kasTangan + kasBank)}</span></div>
                <div class="flex justify-between pl-4">Piutang <span>${formatRupiah(piutang)}</span></div>
                <div class="flex justify-between pl-4">Persediaan <span>${formatRupiah(persediaan)}</span></div>
                <div class="flex justify-between pl-4">Perlengkapan <span>${formatRupiah(perlengkapan)}</span></div>
                <div class="flex justify-between pl-4">Peralatan <span>${formatRupiah(peralatan)}</span></div>
                <div class="flex justify-between pl-4 border-b-2 pb-2 font-bold">Bangunan <span>${formatRupiah(bangunan)}</span></div>
                <div class="flex justify-between font-bold bg-blue-100 p-2 rounded">Total Aset <span>${formatRupiah(totalAset)}</span></div>
                <div class="font-semibold mt-3 mb-2">LIABILITAS</div>
                <div class="flex justify-between pl-4">Hutang Usaha <span>${formatRupiah(hutangUsaha)}</span></div>
                <div class="flex justify-between pl-4 border-b pb-2">Hutang Jangka Panjang <span>${formatRupiah(hutangJangkaPanjang)}</span></div>
                <div class="font-semibold mt-2">EKUITAS</div>
                <div class="flex justify-between pl-4">Modal <span>${formatRupiah(modal)}</span></div>
                <div class="flex justify-between pl-4">Laba Bersih <span>${formatRupiah(labaBersih)}</span></div>
                <div class="flex justify-between pl-4 border-b pb-2">(Prive) <span>(${formatRupiah(prive)})</span></div>
                <div class="flex justify-between font-bold pt-2 text-base">Modal Akhir <span>${formatRupiah(modalAkhir)}</span></div>
            </div>
        </div>
    </div>`;
}

function renderLaporanKas() {
    const container = document.getElementById('laporan-kas-container');
    const jurnalEntries = transaksiList.filter(t => t.tipe_transaksi === 'Jurnal');

    const saldoMap = {};
    jurnalEntries.forEach(entry => {
        if (!saldoMap[entry.akun_target]) saldoMap[entry.akun_target] = 0;
        if (entry.posisi_jurnal === 'Debet') saldoMap[entry.akun_target] += entry.nominal;
        else saldoMap[entry.akun_target] -= entry.nominal;
    });

    const kasTangan = saldoMap['Kas di Tangan'] || 0;
    const kasBank = saldoMap['Kas di Bank'] || 0;
    const totalKas = kasTangan + kasBank;

    container.innerHTML = `<div class="bg-white p-6 rounded-lg border border-gray-200 max-w-2xl mx-auto">
        <h3 class="text-xl font-bold text-gray-800 mb-2 text-center border-b-2 pb-2">LAPORAN PERUBAHAN KAS</h3>
        <p class="text-center text-gray-700 font-medium text-sm">Kings Steak</p>
        <p class="text-center text-gray-600 text-xs mb-4">${getPeriodeString()}</p>
        <div class="space-y-3 text-sm">
            <div class="flex justify-between"><span>Kas Awal Periode</span><span>${formatRupiah(0)}</span></div>
            <div class="flex justify-between font-bold bg-green-100 p-2 rounded mt-2">Kas Akhir Periode <span>${formatRupiah(totalKas)}</span></div>
            <div class="border-t pt-3 mt-3">
                <div class="font-medium mb-2">Komposisi Kas Akhir:</div>
                <div class="flex justify-between pl-4">Kas di Tangan <span>${formatRupiah(kasTangan)}</span></div>
                <div class="flex justify-between pl-4 border-b pb-2">Kas di Bank <span>${formatRupiah(kasBank)}</span></div>
                <div class="flex justify-between font-semibold mt-2">Total Kas <span>${formatRupiah(totalKas)}</span></div>
            </div>
        </div>
    </div>`;
}

function renderLaporanModal() {
    const container = document.getElementById('laporan-modal-container');
    const jurnalEntries = transaksiList.filter(t => t.tipe_transaksi === 'Jurnal');

    const saldoMap = {};
    jurnalEntries.forEach(entry => {
        if (!saldoMap[entry.akun_target]) saldoMap[entry.akun_target] = 0;
        if (entry.posisi_jurnal === 'Debet') saldoMap[entry.akun_target] += entry.nominal;
        else saldoMap[entry.akun_target] -= entry.nominal;
    });

    const pendapatan = Math.abs(saldoMap['Penjualan'] || 0);
    const hpp = Math.abs(saldoMap['Harga Pokok Penjualan'] || 0);
    const bebanGaji = Math.abs(saldoMap['Beban Gaji dan Upah'] || 0);
    const bebanListrik = Math.abs(saldoMap['Beban Listrik dan Air'] || 0);
    const bebanReparasi = Math.abs(saldoMap['Beban Reparasi'] || 0);
    const bebanPerlengkapan = Math.abs(saldoMap['Beban Perlengkapan'] || 0);
    const bebanSewa = Math.abs(saldoMap['Beban Sewa'] || 0);

    const labaKotor = pendapatan - hpp;
    const totalBeban = bebanGaji + bebanListrik + bebanReparasi + bebanPerlengkapan + bebanSewa;
    const labaBersih = labaKotor - totalBeban;

    const modal = saldoMap['Modal'] || 0;
    const prive = Math.abs(saldoMap['Prive'] || 0);
    const modalAkhir = modal + labaBersih - prive;

    container.innerHTML = `<div class="bg-white p-6 rounded-lg border border-gray-200 max-w-2xl mx-auto">
        <h3 class="text-xl font-bold text-gray-800 mb-2 text-center border-b-2 pb-2">LAPORAN PERUBAHAN MODAL</h3>
        <p class="text-center text-gray-700 font-medium text-sm">Kings Steak</p>
        <p class="text-center text-gray-600 text-xs mb-4">${getPeriodeString()}</p>
        <div class="space-y-3 text-sm">
            <div class="flex justify-between">Modal Awal Periode <span>${formatRupiah(0)}</span></div>
            <div class="border-t pt-2">
                <div class="font-medium mb-2">Penambahan Modal:</div>
                <div class="flex justify-between pl-4">Setoran Modal dari Owner <span>${formatRupiah(Math.abs(modal))}</span></div>
                <div class="flex justify-between pl-4">Laba Bersih <span>${formatRupiah(labaBersih)}</span></div>
            </div>
            <div class="border-t pt-2">
                <div class="font-medium mb-2">Pengurangan Modal:</div>
                <div class="flex justify-between pl-4">(Prive) <span>(${formatRupiah(prive)})</span></div>
            </div>
            <div class="border-t-2 pt-3 mt-3">
                <div class="flex justify-between font-bold bg-blue-100 p-3 rounded">Modal Akhir Periode <span>${formatRupiah(modalAkhir)}</span></div>
            </div>
        </div>
    </div>`;
}

function renderRiwayat() {
    const riwayatList = document.getElementById('riwayat-list');
    const transaksiKasir = transaksiList.filter(t => !t.is_jurnal_otomatis);

    if (transaksiKasir.length === 0) {
        riwayatList.innerHTML = '<p class="text-center text-gray-500 py-8">Belum ada transaksi</p>';
        return;
    }

    const sortedLainnya = [...transaksiKasir].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

    let html = sortedLainnya.map(t => `<div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-2">
        <div class="flex justify-between items-start mb-2">
            <div>
                <span class="px-2 py-1 text-xs rounded-full ${t.tipe_transaksi === 'Pemasukan' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">${t.tipe_transaksi}</span>
                <p class="text-sm font-medium text-gray-700 mt-2">${t.kategori}</p>
            </div>
            <p class="text-lg font-bold ${t.tipe_transaksi === 'Pemasukan' ? 'text-green-600' : 'text-red-600'}">${formatRupiah(t.nominal)}</p>
        </div>
        <p class="text-sm text-gray-600">${t.keterangan || '-'}</p>
        <p class="text-xs text-gray-400 mt-2">${new Date(t.tanggal).toLocaleString('id-ID')}</p>
    </div>`).join('');

    riwayatList.innerHTML = html;
}

function renderDiagram() {
    // Chart.js placeholder for diagrams
}

async function buatJurnalOtomatis(keterangan, nominal, tanggal) {
    const entries = [];
    const now = new Date(tanggal);
    
    // Penjualan Makanan - Penjualan Tunai
    if (keterangan === 'Penjualan Tunai') {
        entries.push(
            { id: `${Date.now()}-1`, tipe_transaksi: 'Jurnal', akun_target: 'Kas di Tangan', nominal: nominal, posisi_jurnal: 'Debet', keterangan: 'Penjualan', tanggal: now, is_jurnal_otomatis: true },
            { id: `${Date.now()}-2`, tipe_transaksi: 'Jurnal', akun_target: 'Penjualan', nominal: nominal, posisi_jurnal: 'Kredit', keterangan: 'Penjualan', tanggal: now, is_jurnal_otomatis: true }
        );
    }
    
    return entries;
}

function arsipkanHalaman(name){ showToast(name+' - arsip belum tersedia di mode terpisah','error'); }

// ============= DOWNLOAD FUNCTIONS =============

function downloadPDF(elementId, filename) {
    const element = document.getElementById(elementId);
    if (!element) {
        showToast('Konten tidak ditemukan', 'error');
        return;
    }

    const opt = {
        margin: 10,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(element).save();
    showToast(`${filename} berhasil diunduh`, 'success');
}

function downloadRiwayat() {
    const content = document.getElementById('riwayat-list').cloneNode(true);
    const wrapper = document.createElement('div');
    wrapper.className = 'p-6 bg-white';
    
    const header = document.createElement('div');
    header.className = 'mb-6 text-center border-b-2 pb-4';
    header.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-800">RIWAYAT TRANSAKSI</h2>
        <p class="text-gray-600 font-medium">Kings Steak</p>
        <p class="text-gray-500 text-sm">${getPeriodeString()}</p>
        <p class="text-gray-500 text-xs mt-2">Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</p>
    `;
    
    wrapper.appendChild(header);
    wrapper.appendChild(content);

    const opt = {
        margin: 10,
        filename: `Riwayat-Transaksi-${currentPeriod.bulan}-${currentPeriod.tahun}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(wrapper).save();
    showToast('Riwayat Transaksi berhasil diunduh', 'success');
}

function downloadJurnalUmum() {
    const jurnalBody = document.getElementById('jurnal-umum-body');
    if (!jurnalBody || jurnalBody.innerHTML.trim() === '') {
        showToast('Data Jurnal Umum kosong', 'error');
        return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'p-6 bg-white';
    
    const header = document.createElement('div');
    header.className = 'mb-6 text-center border-b-2 pb-4';
    header.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-800">JURNAL UMUM</h2>
        <p class="text-gray-600 font-medium">Kings Steak</p>
        <p class="text-gray-500 text-sm">${getPeriodeString()}</p>
        <p class="text-gray-500 text-xs mt-2">Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</p>
    `;
    
    const table = document.createElement('table');
    table.className = 'w-full border-collapse';
    table.innerHTML = `
        <thead>
            <tr class="border-b-2 border-gray-400 bg-gray-100">
                <th class="px-4 py-2 text-left font-bold text-sm border border-gray-300">Tanggal</th>
                <th class="px-4 py-2 text-left font-bold text-sm border border-gray-300">Keterangan</th>
                <th class="px-4 py-2 text-right font-bold text-sm border border-gray-300">Debet</th>
                <th class="px-4 py-2 text-right font-bold text-sm border border-gray-300">Kredit</th>
            </tr>
        </thead>
        <tbody>
            ${jurnalBody.innerHTML}
        </tbody>
    `;
    table.style.borderCollapse = 'collapse';
    
    wrapper.appendChild(header);
    wrapper.appendChild(table);

    const opt = {
        margin: 10,
        filename: `Jurnal-Umum-${currentPeriod.bulan}-${currentPeriod.tahun}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(wrapper).save();
    showToast('Jurnal Umum berhasil diunduh', 'success');
}

function downloadBukuBesar() {
    const container = document.getElementById('buku-besar-container');
    if (!container || container.innerHTML.trim() === '') {
        showToast('Pilih akun terlebih dahulu', 'error');
        return;
    }

    const content = container.cloneNode(true);
    const wrapper = document.createElement('div');
    wrapper.className = 'p-6 bg-white';
    
    const header = document.createElement('div');
    header.className = 'mb-6 text-center border-b-2 pb-4';
    header.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-800">BUKU BESAR</h2>
        <p class="text-gray-600 font-medium">Kings Steak</p>
        <p class="text-gray-500 text-sm">${getPeriodeString()}</p>
        <p class="text-gray-500 text-xs mt-2">Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</p>
    `;
    
    wrapper.appendChild(header);
    wrapper.appendChild(content);

    const opt = {
        margin: 10,
        filename: `Buku-Besar-${currentPeriod.bulan}-${currentPeriod.tahun}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(wrapper).save();
    showToast('Buku Besar berhasil diunduh', 'success');
}

function downloadNeracaSaldo() {
    const neracaBody = document.getElementById('neraca-saldo-body');
    if (!neracaBody || neracaBody.innerHTML.trim() === '') {
        showToast('Data Neraca Saldo kosong', 'error');
        return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'p-6 bg-white';
    
    const header = document.createElement('div');
    header.className = 'mb-6 text-center border-b-2 pb-4';
    header.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-800">NERACA SALDO</h2>
        <p class="text-gray-600 font-medium">Kings Steak</p>
        <p class="text-gray-500 text-sm">${getPeriodeString()}</p>
        <p class="text-gray-500 text-xs mt-2">Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</p>
    `;
    
    const table = document.createElement('table');
    table.className = 'w-full border-collapse';
    table.innerHTML = `
        <thead>
            <tr class="border-b-2 border-gray-400 bg-gray-100">
                <th class="px-4 py-2 text-left font-bold text-sm border border-gray-300">Nama Akun</th>
                <th class="px-4 py-2 text-right font-bold text-sm border border-gray-300">Debet</th>
                <th class="px-4 py-2 text-right font-bold text-sm border border-gray-300">Kredit</th>
            </tr>
        </thead>
        <tbody>
            ${neracaBody.innerHTML}
        </tbody>
    `;
    table.style.borderCollapse = 'collapse';
    
    wrapper.appendChild(header);
    wrapper.appendChild(table);

    const opt = {
        margin: 10,
        filename: `Neraca-Saldo-${currentPeriod.bulan}-${currentPeriod.tahun}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(wrapper).save();
    showToast('Neraca Saldo berhasil diunduh', 'success');
}

function downloadLaporanKeuangan() {
    const container = document.getElementById('laporan-keuangan-container');
    if (!container || container.innerHTML.trim() === '') {
        showToast('Data Laporan Keuangan kosong', 'error');
        return;
    }

    const content = container.cloneNode(true);
    const wrapper = document.createElement('div');
    wrapper.className = 'p-6 bg-white';
    
    const header = document.createElement('div');
    header.className = 'mb-6 text-center border-b-2 pb-4';
    header.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-800">LAPORAN KEUANGAN</h2>
        <p class="text-gray-600 font-medium">Kings Steak</p>
        <p class="text-gray-500 text-sm">${getPeriodeString()}</p>
        <p class="text-gray-500 text-xs mt-2">Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</p>
    `;
    
    wrapper.appendChild(header);
    wrapper.appendChild(content);

    const opt = {
        margin: 10,
        filename: `Laporan-Keuangan-${currentPeriod.bulan}-${currentPeriod.tahun}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(wrapper).save();
    showToast('Laporan Keuangan berhasil diunduh', 'success');
}

function downloadLaporanKas() {
    const container = document.getElementById('laporan-kas-container');
    if (!container || container.innerHTML.trim() === '') {
        showToast('Data Laporan Kas kosong', 'error');
        return;
    }

    const content = container.cloneNode(true);
    const wrapper = document.createElement('div');
    wrapper.className = 'p-6 bg-white';
    
    const header = document.createElement('div');
    header.className = 'mb-6 text-center border-b-2 pb-4';
    header.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-800">LAPORAN PERUBAHAN KAS</h2>
        <p class="text-gray-600 font-medium">Kings Steak</p>
        <p class="text-gray-500 text-sm">${getPeriodeString()}</p>
        <p class="text-gray-500 text-xs mt-2">Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</p>
    `;
    
    wrapper.appendChild(header);
    wrapper.appendChild(content);

    const opt = {
        margin: 10,
        filename: `Laporan-Kas-${currentPeriod.bulan}-${currentPeriod.tahun}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(wrapper).save();
    showToast('Laporan Perubahan Kas berhasil diunduh', 'success');
}

function downloadLaporanModal() {
    const container = document.getElementById('laporan-modal-container');
    if (!container || container.innerHTML.trim() === '') {
        showToast('Data Laporan Modal kosong', 'error');
        return;
    }

    const content = container.cloneNode(true);
    const wrapper = document.createElement('div');
    wrapper.className = 'p-6 bg-white';
    
    const header = document.createElement('div');
    header.className = 'mb-6 text-center border-b-2 pb-4';
    header.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-800">LAPORAN PERUBAHAN MODAL</h2>
        <p class="text-gray-600 font-medium">Kings Steak</p>
        <p class="text-gray-500 text-sm">${getPeriodeString()}</p>
        <p class="text-gray-500 text-xs mt-2">Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</p>
    `;
    
    wrapper.appendChild(header);
    wrapper.appendChild(content);

    const opt = {
        margin: 10,
        filename: `Laporan-Modal-${currentPeriod.bulan}-${currentPeriod.tahun}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(wrapper).save();
    showToast('Laporan Perubahan Modal berhasil diunduh', 'success');
}
async function resetData(){ showToast('Reset data tidak diimplementasikan di mode terpisah','error'); }

async function init(){ updateDateTime(); setInterval(updateDateTime,1000); updatePeriodeDisplay(); checkArchiveStatus(); setInterval(checkArchiveStatus,3600000);
    try{ const raw = localStorage.getItem('transaksiList'); if (raw){ transaksiList = JSON.parse(raw); dataHandler.onDataChanged(transaksiList); }}catch(e){console.warn('Gagal load local transaksi',e)}
    try{ await flushSync(); }catch(e){}
}
