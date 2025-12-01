// initialData.js - Data awal untuk demo
const initialTransaksi = [
    // Penjualan Makanan
    {
        id: '1701430800000',
        tipe_transaksi: 'Pemasukan',
        kategori: 'Penjualan Makanan',
        nominal: 18000,
        keterangan: 'penjualan tunai',
        tanggal: '2025-11-15T10:30:00.000Z',
        created_at: '2025-11-15T10:30:00.000Z'
    },
    {
        id: '1701430800001',
        tipe_transaksi: 'Pemasukan',
        kategori: 'Penjualan Makanan',
        nominal: 26000,
        keterangan: 'penjualan non tunai',
        tanggal: '2025-11-15T14:20:00.000Z',
        created_at: '2025-11-15T14:20:00.000Z'
    },
    {
        id: '1701430800002',
        tipe_transaksi: 'Pemasukan',
        kategori: 'Penjualan Makanan',
        nominal: 50000,
        keterangan: 'penjualan tunai',
        tanggal: '2025-11-20T11:00:00.000Z',
        created_at: '2025-11-20T11:00:00.000Z'
    },
    
    // Pembelian Bahan
    {
        id: '1701430800003',
        tipe_transaksi: 'Pengeluaran',
        kategori: 'Pembelian Bahan',
        nominal: 200000,
        keterangan: 'pembelian bahan baku tunai',
        tanggal: '2025-11-16T09:00:00.000Z',
        created_at: '2025-11-16T09:00:00.000Z'
    },
    
    // Gaji Karyawan
    {
        id: '1701430800004',
        tipe_transaksi: 'Pengeluaran',
        kategori: 'Gaji Karyawan',
        nominal: 500000,
        keterangan: 'membayar gaji tunai',
        tanggal: '2025-11-25T15:00:00.000Z',
        created_at: '2025-11-25T15:00:00.000Z'
    },
    
    // Listrik & Air
    {
        id: '1701430800005',
        tipe_transaksi: 'Pengeluaran',
        kategori: 'Listrik & Air',
        nominal: 150000,
        keterangan: 'membayar listrik dan air tunai',
        tanggal: '2025-11-28T10:00:00.000Z',
        created_at: '2025-11-28T10:00:00.000Z'
    }
];

const initialMenuInfo = {
    '1701430800000': { jenis: 'Grill', saus: 'Bbq Sauce', unit: 1 },
    '1701430800001': { jenis: 'Crispy', saus: 'Mushroom Sauce', unit: 1 },
    '1701430800002': { jenis: 'Grill', saus: 'Black Pepper', unit: 2 }
};