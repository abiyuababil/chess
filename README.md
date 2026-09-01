# ♟️ ChessMastery

**ChessMastery** adalah web aplikasi pelatihan catur komprehensif untuk pemula hingga pemain menengah/master dalam kurikulum intensif 2 hari. Dilengkapi dengan mesin catur AI (Minimax), analisis pasca-game (deteksi blunder & akurasi), asisten pelatih (AI Coach Hint), dan taktik interaktif.

![ChessMastery](https://img.shields.io/badge/Chess-Mastery-10b981?style=for-the-badge&logo=lichess&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Mobile%20Responsive-38bdf8?style=for-the-badge)

---

## 🌟 Fitur Utama

- **🗓️ 2-Day Crash Course (16 Pelajaran Master-Level)**:
  - *Day 1*: Taktik tingkat lanjut, pengorbanan mematikan (Greek Gift `Bxh7+`, `Nxf7` Fried Liver), langkah sela (Zwischenzug), removing the defender, dan geometri skakmat (Anastasia, Boden, Hook).
  - *Day 2*: Profilaksis ala Karpov, pawn breaks, outposts abadi, repertoar Sicilian & London, dan endgame mendalam (Lucena Bridge & Philidor Defense).
- **🤖 Sparring Lawan Bot AI (5 Tingkat Kesulitan)**:
  - Bertenaga algoritma **Minimax + Alpha-Beta Pruning** dan **Piece-Square Tables (PST)**.
  - Level 1 (Pemula ~400) s/d Level 5 (Master ~1800).
- **🧠 AI Chess Coach (Bantuan Langkah Terbaik)**:
  - Memberikan rekomendasi langkah terbaik secara visual (highlight petak asal & tujuan) dan penjelasan taktis dalam Bahasa Indonesia saat bermain.
- **🔍 Post-Game Game Analysis (Deteksi Blunder & Akurasi)**:
  - Analisis mendalam setelah pertandingan usai: mendeteksi **🔴 Blunder**, **🟠 Mistake**, **🟡 Inaccuracy**, dan **🟢 Best Moves**.
  - Review board interaktif untuk memeriksa posisi kritis langkah demi langkah.
- **🧩 Tactics Lab**:
  - Puluhan puzzle taktik interaktif dengan rating dan petunjuk (*hint*).
- **📱 Mobile-First Responsive Design**:
  - Bottom navigation bar ergonomis, fluid chessboard, dan touch optimization.
- **🔊 Web Audio API**:
  - Efek suara langkah, capture, check, dan victory yang disintesis langsung tanpa file eksternal.

---

## 🚀 Cara Menjalankan

Aplikasi ini dibuat murni menggunakan **HTML5, CSS3, dan Vanilla JavaScript (ES6+)** tanpa perlu instalasi backend atau `npm`.

1. Clone repositori ini:
   ```bash
   git clone https://github.com/abiyuababil/chess.git
   ```
2. Buka file `index.html` di browser favorit Anda (Chrome, Edge, Firefox, Safari).

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Dark Glassmorphism Theme), Vanilla JavaScript (ES6+)
- **Chess Rules Engine**: [chess.js](https://github.com/jhlywa/chess.js) (CDN)
- **AI Engine**: Custom Minimax with Alpha-Beta Pruning
- **Sound**: Web Audio API Synthesizer
- **Storage**: Browser LocalStorage for progress tracking
