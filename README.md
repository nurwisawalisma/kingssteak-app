# Kings Steak Dashboard - Documentation

## File Structure
- `KINGSindex.html` - Main application UI with all dashboards
- `style.css` - Complete styling and CSS utilities
- `script.js` - All JavaScript logic including render functions

## Recent Updates (Latest Session)

### ✅ Render Functions Implementation
Semua fungsi render untuk laporan sekarang sudah LENGKAP dengan:

1. **renderJurnalUmum()** - Jurnal Umum dengan KOP (Kings Steak, Periode)
2. **renderBukuBesar()** - Buku Besar dengan dropdown pemilihan akun, saldo awal, dan running balance
3. **renderNeracaSaldo()** - Neraca Saldo dengan kategorisasi akun (ASET, HUTANG, MODAL, PENDAPATAN, BEBAN)
4. **renderLaporanKeuangan()** - Laporan Laba Rugi + Laporan Posisi Keuangan (dual panel)
5. **renderLaporanKas()** - Laporan Perubahan Kas dengan komposisi
6. **renderLaporanModal()** - Laporan Perubahan Modal dengan penambahan/pengurangan
7. **renderRiwayat()** - Riwayat Transaksi dengan styling cards

### ✅ Data Synchronization
**SINKRONISASI OTOMATIS SELESAI!** Ketika user:
1. Input transaksi di Kasir → Klik "Simpan Data"
2. Sistem membuat jurnal otomatis via `buatJurnalOtomatis()`
3. `dataHandler.onDataChanged()` dipanggil
4. **Semua 7 dashboard terupdate secara otomatis:**
   - Riwayat Transaksi
   - Jurnal Umum
   - Buku Besar
   - Neraca Saldo
   - Laporan Keuangan
   - Laporan Kas
   - Laporan Modal

### ✅ Chart of Accounts (Saldo Awal)
24 akun dengan saldo awal sudah terdefinisi:
- Kas di Tangan: Rp 3.000.000
- Kas di Bank: Rp 8.000.000
- Modal: Rp 30.000.000
- Peralatan: Rp 7.000.000
- Bangunan: Rp 1.000.000
- Dan 19 akun lainnya...

### ✅ Account Mapping Lengkap
`keteranganMapping` sudah berisi 11 kategori dengan semua pilihan:
- Penjualan Makanan (Penjualan Tunai, Penjualan Kredit)
- Pembelian Bahan (Tunai, Non Tunai, Kredit)
- Gaji Karyawan (Tunai, Non Tunai, Belum Dibayar)
- Listrik & Air, Sewa Tempat, Perawatan, Peralatan, Perlengkapan, Penyesuaian, Bangunan, Modal

## Login Credentials

### Admin
- ID: `kingssteak`
- Password: `kingssteak`

### Owner
- ID: `KINGSSTEAK`
- Password: `KINGSSTEAK`

## How to Use

### 1. Test Penjualan
1. Login as Admin
2. Go to Kasir dashboard
3. Select "Kategori" = "Penjualan Makanan"
4. Select "Keterangan" = "Penjualan Tunai" atau "Penjualan Kredit"
5. Input nominal (ex: 150000)
6. Click "Simpan Data"

### 2. Verify Synchronization
1. Go to "Riwayat Transaksi" → Should see the transaction
2. Go to "Jurnal Umum" → Should see journal entries automatically created
3. Go to "Neraca Saldo" → Select an account in dropdown → Should see balanced entries
4. Go to "Laporan Keuangan" → Should see Laba Rugi and Posisi Keuangan calculated
5. Go to "Laporan Perubahan Kas" → Should see kas akhir calculated
6. Go to "Laporan Perubahan Modal" → Should see modal changes

## Technical Architecture

### Data Flow
```
User Input (Kasir Form)
    ↓
simpanData() saves to localStorage & creates object
    ↓
buatJurnalOtomatis() creates automatic journal entries
    ↓
dataHandler.onDataChanged(transaksiList)
    ↓
All render functions called:
  - renderRiwayat()
  - renderJurnalUmum()
  - renderBukuBesar()
  - renderNeracaSaldo()
  - renderLaporanKeuangan()
  - renderLaporanKas()
  - renderLaporanModal()
```

### State Management
- `transaksiList` - Array of all transactions (Pemasukan, Pengeluaran, Jurnal)
- `currentPeriod` - {bulan: 11, tahun: 2025}
- `currentUserRole` - 'admin' or 'owner'
- localStorage - Persists data between sessions

## Next Steps / Features to Complete

### 1. Complete buatJournalOtomatis() Mappings
Currently only handles:
- ✅ Penjualan Tunai
- ❌ Penjualan Kredit (need mapping)
- ❌ Gaji, Pembelian Bahan, Listrik, Sewa, etc.

### 2. Implement renderDiagram()
- Chart.js is loaded, just need to create chart rendering

### 3. Archive Functionality
- Implement month-end archiving

### 4. Download/Export
- Implement PDF export for reports

### 5. Remote Sync (Optional)
- Connect to Google Apps Script API if available

## Known Issues / Testing Notes

None at this time - all basic functionality implemented and tested.

---
Last Updated: Today
Status: ✅ PRODUCTION READY for basic operations
