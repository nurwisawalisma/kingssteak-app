# Live Server (Debugging Lokal)

Jika ingin menjalankan aplikasi secara lokal dan melakukan debugging di Chrome menggunakan Live Server + `launch.json` yang sudah disertakan:

- **Install** extension `Live Server` di VS Code.
- Buka folder workspace `c:\Users\RIDHO\SIA` di VS Code.
- Klik `Go Live` (pojok kanan bawah) atau buka perintah `Live Server: Open with Live Server`.
- URL default: `http://127.0.0.1:5500/index.html`.
- Untuk debug dengan Chrome via `launch.json`:

```powershell
# 1) Pastikan Live Server aktif dan serving di 127.0.0.1:5500
# 2) Tekan F5 atau jalankan konfigurasi "Launch Chrome (Live Server)" di Run and Debug
```

Catatan: jika belum punya `Live Server`, install dari marketplace. Jika port berbeda, edit `url` di `.vscode/launch.json` sesuai alamat Live Server Anda.
