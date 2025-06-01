document.addEventListener('DOMContentLoaded', () => {

    // === ELEMEN UMUM ===
    const visitorView = document.getElementById('visitor-view');
    const adminView = document.getElementById('admin-view');
    const switchToAdminBtn = document.getElementById('switch-to-admin');
    const switchToVisitorBtn = document.getElementById('switch-to-visitor');

    // === ELEMEN PENGUNJUNG ===
    const entryFormSection = document.getElementById('entry-form-section');
    const waitingSection = document.getElementById('waiting-section');
    const chatSection = document.getElementById('chat-section');
    const entryForm = document.getElementById('entry-form');

    // === ELEMEN ADMIN ===
    const callNextBtn = document.getElementById('call-next-btn');
    const adminCurrentService = document.getElementById('admin-current-service');
    const adminQueueList = document.getElementById('admin-queue-list');


    // --- FUNGSI-FUNGSI ---

    // 1. Simulasi Pengunjung Masuk Antrean
    entryForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah form reload halaman
        
        const visitorName = document.getElementById('visitor-name').value;
        if (!visitorName) {
            alert('Nama tidak boleh kosong!');
            return;
        }

        // Sembunyikan form awal, tampilkan status antrean
        entryFormSection.classList.add('hidden');
        waitingSection.classList.remove('hidden');

        // Di aplikasi nyata, data ini akan datang dari server
        console.log(`Pengunjung ${visitorName} masuk antrean.`);
        
        // Placeholder untuk logika real-time (misalnya, koneksi WebSocket)
        // connectToQueue(visitorName);
    });

    // 2. Simulasi Admin Memanggil Pengunjung Berikutnya
    callNextBtn.addEventListener('click', () => {
        const nextVisitor = adminQueueList.querySelector('li');
        
        if (nextVisitor) {
            const visitorInfo = nextVisitor.innerHTML;
            adminCurrentService.innerHTML = `
                <p>Saat ini melayani:</p>
                <div class="queue-list-item">${visitorInfo}</div>
            `;
            
            // Hapus dari daftar antrean
            nextVisitor.remove();
            
            // Di aplikasi nyata, ini akan mengirim sinyal ke pengunjung
            console.log('Memanggil pengunjung berikutnya...');
            // sendCallSignal(visitorId);

            // --- Simulasi di sisi pengunjung ---
            // Tampilan pengunjung akan berubah menjadi chat
            showChatForVisitor();
            
        } else {
            adminCurrentService.innerHTML = `<p>Semua antrean telah selesai dilayani.</p>`;
            alert('Tidak ada lagi antrean.');
        }
    });

    // Fungsi untuk menampilkan chat di sisi pengunjung (simulasi)
    function showChatForVisitor() {
        const callStatus = document.getElementById('call-status');
        
        // Ubah status menjadi "dipanggil"
        callStatus.innerHTML = `<p style="color: #28a745; font-weight: 600;">Anda sedang dipanggil! Menyiapkan ruang obrolan...</p>`;

        // Setelah beberapa saat, ganti ke tampilan chat
        setTimeout(() => {
            waitingSection.classList.add('hidden');
            chatSection.classList.remove('hidden');
        }, 2000); // Tunggu 2 detik
    }

    // 3. Logika untuk Ganti Tampilan (Hanya untuk Simulasi)
    switchToAdminBtn.addEventListener('click', () => {
        visitorView.classList.remove('active');
        visitorView.classList.add('hidden');
        adminView.classList.remove('hidden');
        adminView.classList.add('active');
        
        switchToAdminBtn.classList.add('hidden');
        switchToVisitorBtn.classList.remove('hidden');
    });

    switchToVisitorBtn.addEventListener('click', () => {
        adminView.classList.remove('active');
        adminView.classList.add('hidden');
        visitorView.classList.remove('hidden');
        visitorView.classList.add('active');

        switchToVisitorBtn.classList.add('hidden');
        switchToAdminBtn.classList.remove('hidden');
    });
});

