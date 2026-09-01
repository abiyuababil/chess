/**
 * ChessMastery - Lessons Data & Tactical Puzzles (2-Day Crash Course)
 */

const LESSONS_DATA = [
  // ==========================================================================
  // DAY 1: Master-Level Tactics, Lethal Sacrifices & Attacking Geometry
  // ==========================================================================
  {
    id: 1,
    day: 1,
    title: "Greek Gift Sacrifice (Bxh7+ & Penyerangan Sayap Raja)",
    subtitle: "Pola pengorbanan gajah klasik untuk menghancurkan pertahanan rokade",
    duration: "20 min",
    category: "Lethal Attack",
    icon: "🔥",
    theory: `
      <h3>Pola Serangan Greek Gift (The Classical Bishop Sacrifice)</h3>
      <p>Salah satu pola serangan paling mematikan dan sering muncul di level master. Terjadi ketika Hitam sudah melakukan Kingside Castling, namun pion <strong>h7</strong> hanya dijaga oleh Raja, sementara Putih memiliki <strong>Bishop di d3/c4</strong>, <strong>Knight di f3</strong>, dan <strong>Queen di d1</strong> yang siap meluncur.</p>
      
      <div class="theory-callout tip">
        <strong>⚡ 4 Syarat Eksekusi Greek Gift:</strong>
        <ol>
          <li>Putih memiliki kontrol atas petak <strong>g5</strong> (tidak dijaga oleh Bishop/Queen/Knight hitam).</li>
          <li>Putih bisa mendorong <strong>Bxh7+!</strong> yang memaksa <code>...Kxh7</code>.</li>
          <li>Putih melanjutkan dengan <strong>Ng5+!</strong> (Skak).</li>
          <li>Queen Putih bisa masuk ke <strong>h5</strong> (atau <strong>g4</strong>) dengan ancaman skakmat tak terhindarkan di h7 atau f7.</li>
        </ol>
      </div>

      <h3>Respon Hitam yang Selalu Kalah:</h3>
      <ul>
        <li>Jika <code>...Kg8</code>: Putih meluncurkan <code>Qh5</code> dengan ancaman mate <code>Qh7#</code> atau <code>Qxf7#</code>.</li>
        <li>Jika <code>...Kg6</code>: Putih melanjutkan dengan <code>h4!</code> atau <code>Qg4!</code> (skak tarik / discovered check mematikan).</li>
      </ul>
    `,
    demoFen: "r1bq1rk1/ppp1nppp/4p3/3pP3/1b1P4/2NB1N2/PPP2PPP/R1BQK2R w KQ - 0 1",
    puzzles: [
      {
        instruction: "Korbankan Bishop putih di h7 untuk membongkar pertahanan Raja hitam (1. Bxh7+)!",
        fen: "r1bq1rk1/ppp2ppp/2n1p3/3pP3/3P4/2PB1N2/PP1N1PPP/R2QK2R w KQ - 0 1",
        solution: ["d3h7"],
        hint: "Korbankan gajah d3 ke petak h7 dengan skak!"
      },
      {
        instruction: "Lanjutkan serangan maut dengan melompatkan Kuda f3 ke g5 (2. Ng5+)!",
        fen: "r1bq1r2/ppp2ppk/2n1p3/3pP3/3P4/5N2/PP1N1PPP/R2QK2R w KQ - 0 2",
        solution: ["f3g5"],
        hint: "Kuda melompat ke g5 memberi skak dan membuka jalan Queen ke h5."
      }
    ]
  },
  {
    id: 2,
    day: 1,
    title: "The Pin & Win: Membongkar Bidak Terpaku",
    subtitle: "Teknik melipatgandakan tekanan pada bidak yang terkena Pin",
    duration: "20 min",
    category: "Tactical Pressure",
    icon: "📌",
    theory: `
      <h3>Hukum Utama: Piled-On Pressure ("Tumpuk Serangan!")</h3>
      <p>Pemain pemula hanya melihat pin dan membiarkannya. Grandmaster <strong>melipatgandakan serangan pada bidak yang terpaku</strong> dengan bidak bernilai lebih rendah (terutama pion atau kuda) sampai pertahanan musuh runtuh total.</p>

      <div class="theory-callout warning">
        <strong>🎯 Kaidah Emas:</strong> <em>"Serang bidak yang dipin dengan bidak yang nilainya lebih murah (pion)!"</em> Bidak yang dipin tidak bisa lari dan tidak bisa membalas memakan secara efektif.
      </div>

      <h3>Contoh Taktik Cross-Pin & Relative Pin</h3>
      <p>Gunakan dorongan pion seperti <code>d5!</code> atau <code>e5!</code> untuk menyerang Kuda yang sedang dipin terhadap Raja atau Queen lawan.</p>
    `,
    demoFen: "r1bqk2r/ppppbppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1",
    puzzles: [
      {
        instruction: "Knight hitam di f6 dipin terhadap Queen d8 oleh Bishop g5. Dorong pion e4 ke e5 untuk menghancurkannya!",
        fen: "r1bq1rk1/ppp2ppp/2n1pn2/3p4/3PP3/2NB1N2/PPP2PPP/R1BQK2R w KQ - 0 1",
        solution: ["e4e5"],
        hint: "Dorong pion e4 ke e5 menyerang kuda yang tidak punya ruang gerak."
      }
    ]
  },
  {
    id: 3,
    day: 1,
    title: "Zwischenzug (Langkah Sela / In-Between Move)",
    subtitle: "Menghancurkan kalkulasi lawan dengan membalik urutan langkah",
    duration: "20 min",
    category: "Master Calculation",
    icon: "⚡",
    theory: `
      <h3>Apa itu Zwischenzug (Intermezzo)?</h3>
      <p>Langkah tak terduga yang disisipkan <strong>sebelum</strong> melakukan langkah balasan yang diharapkan (seperti memakan balik bidak). Langkah sela ini biasanya berupa <strong>skak mendadak</strong>, <strong>ancaman skakmat</strong>, atau <strong>menyerang Queen lawan</strong>.</p>
      
      <div class="theory-callout tip">
        <strong>🧠 Pola Pikir:</strong> Saat lawan baru saja memakan bidak Anda, jangan otomatis memakan balik (recapture) secara refleks! Tanya dulu pada diri sendiri: <em>"Apakah saya punya langkah antara yang lebih mematikan?"</em>
      </div>
    `,
    demoFen: "r1b2rk1/ppp2ppp/2n5/3q4/3PN3/5N2/PP3PPP/R2QKB1R w KQ - 0 1",
    puzzles: [
      {
        instruction: "Lawan baru mengancam Queen Anda. Alih-alih kabur, beri skak sela dengan Bishop di b5!",
        fen: "r1b1k2r/ppp2ppp/2n5/1B1q4/4n3/5N2/PPP2PPP/R1BQK2R w KQkq - 0 1",
        solution: ["b5c6"],
        hint: "Bishop memakan kuda di c6 sambil memberikan ancaman ganda."
      }
    ]
  },
  {
    id: 4,
    day: 1,
    title: "Removing the Defender & Overloaded Pieces",
    subtitle: "Melucuti bidak penjaga kunci dengan pengorbanan & defleksi",
    duration: "20 min",
    category: "Combinations",
    icon: "💣",
    theory: `
      <h3>1. Removing the Defender (Menyingkirkan Pengawal)</h3>
      <p>Jika sebuah petak penting atau bidak berharga dijaga oleh satu bidak musuh, target Anda bukan sasaran akhirnya, melainkan <strong>habisi pengawalnya terlebih dahulu</strong>.</p>

      <h3>2. Overloaded Piece (Bidak yang Kelebihan Beban)</h3>
      <p>Terjadi ketika satu bidak musuh ditugaskan menjaga dua ancaman sekaligus. Begitu Anda mengeksekusi salah satu ancaman, bidak tersebut tidak lagi mampu menjaga ancaman yang kedua!</p>
    `,
    demoFen: "r1b2rk1/pp1n1ppp/2p1pn2/q5B1/1bPP4/2N2N2/PPQ1BPPP/R3K2R w KQ - 0 1",
    puzzles: [
      {
        instruction: "Makan Kuda hitam di f6 untuk melucuti satu-satunya penjaga petak h7!",
        fen: "r1b2rk1/pp1n1ppp/2p1pn2/q2p2B1/1bPP4/2N1PN2/PPQ1BPPP/R3K2R w KQ - 0 1",
        solution: ["g5f6"],
        hint: "Bishop g5 memakan kuda di f6."
      }
    ]
  },
  {
    id: 5,
    day: 1,
    title: "Jebakan Pembukaan: Fried Liver Attack & Counter-Gambits",
    subtitle: "Menghukum pembukaan pasif lawan dengan invasi brutal di f7",
    duration: "20 min",
    category: "Opening Traps",
    icon: "🗡️",
    theory: `
      <h3>Fried Liver Attack (1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 Nxd5? 6.Nxf7!)</h3>
      <p>Salah satu serangan paling spektakuler dalam catur: Putih mengorbankan Kuda di f7 untuk memaksa Raja hitam keluar dari sarangnya ke tengah papan (<code>6...Kxf7 7.Qf3+ Ke6 8.Nc3</code>) di mana ia akan dibombardir tanpa henti!</p>

      <div class="theory-callout warning">
        <strong>⚠️ Hukuman Blunder 5...Nxd5?:</strong> Di Two Knights Defense, memakan pion d5 dengan Kuda adalah kesalahan fatal. Respon master untuk Hitam adalah <code>5...Na5!</code> (Polerio Defense).
      </div>
    `,
    demoFen: "r1bqkb1r/ppp2ppp/2n5/3np1N1/2B5/8/PPPP1PPP/RNBQK2R w KQkq - 0 6",
    puzzles: [
      {
        instruction: "Eksekusi Fried Liver Sacrifice: Kuda melompat mengorbankan diri di f7 (6. Nxf7!)!",
        fen: "r1bqkb1r/ppp2ppp/2n5/3np1N1/2B5/8/PPPP1PPP/RNBQK2R w KQkq - 0 6",
        solution: ["g5f7"],
        hint: "Kuda melompat dari g5 ke f7 menusuk Queen dan Rook hitam."
      }
    ]
  },
  {
    id: 6,
    day: 1,
    title: "Pola Skakmat Maut: Anastasia, Boden & Hook Mate",
    subtitle: "Mengenali geometri skakmat tingkat tinggi dalam sekejap mata",
    duration: "20 min",
    category: "Mating Geometry",
    icon: "👑",
    theory: `
      <h3>1. Anastasia's Mate 🐴🏰</h3>
      <p>Kuda di e7/e2 mengunci petak pelarian Raja di sayap, sementara Benteng meluncur di file terbuka (h-file) untuk memberikan skakmat horizontal yang tak terbendung.</p>

      <h3>2. Boden's Mate (Dua Gajah Bersilangan) ✂️</h3>
      <p>Dua Bishop memotong jalur diagonal secara menyilang saat Raja lawan terjebak di sayap menteri setelah rokade panjang.</p>

      <h3>3. Hook Mate 🪝</h3>
      <p>Kombinasi Benteng, Kuda, dan Pion yang saling melindungi membentuk jaring kematian di sudut papan.</p>
    `,
    demoFen: "5rk1/1p3ppp/8/8/8/8/5PPP/R3R1K1 w - - 0 1",
    puzzles: [
      {
        instruction: "Anastasia's Mate: Luncurkan Rook ke h5 untuk skakmat!",
        fen: "5rk1/4Nppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
        solution: ["e1e3"],
        hint: "Bawa benteng ke jalur e3 untuk bersiap manuver ke h3."
      }
    ]
  },
  {
    id: 7,
    day: 1,
    title: "Pohon Kalkulasi Grandmaster: Forcing Moves First",
    subtitle: "Metode Alexander Kotov: Checks, Captures, Threats secara disiplin",
    duration: "20 min",
    category: "Calculation",
    icon: "🌳",
    theory: `
      <h3>Algoritma Berpikir Cepat (Candidate Moves):</h3>
      <ol>
        <li><strong>Identifikasi Forcing Moves</strong>: Selalu hitung langkah yang memaksa terlebih dahulu (Skak > Memakan Bidak > Menciptakan Ancaman Langsung).</li>
        <li><strong>Visualisasikan Posisi Akhir</strong>: Jangan berhenti menghitung di tengah pertukaran! Hitung sampai posisi tenang (<em>quiescence</em>).</li>
        <li><strong>Metode Eliminasi</strong>: Coret kandidat langkah yang gagal memenuhi tujuan taktik.</li>
      </ol>
      <div class="theory-callout tip">
        <strong>💡 Trik Grandmaster:</strong> Bidak yang tidak dijaga (<em>Undefended Pieces</em>) adalah sumber dari 90% kombinasi taktik. Selalu scan papan mencari bidak musuh yang 'telanjang' tanpa pelindung!
      </div>
    `,
    demoFen: "r2q1rk1/pp1n1ppp/2pbpn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 1",
    puzzles: [
      {
        instruction: "Temukan langkah forcing terbaik untuk merusak struktur pertahanan raja lawan!",
        fen: "r1bq1rk1/ppp2ppp/2n1pn2/3p4/1bPP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 1",
        solution: ["c4d5"],
        hint: "Makan pion d5 untuk membuka jalur tengah."
      }
    ]
  },
  {
    id: 8,
    day: 1,
    title: "🎮 Evaluasi & Sparring Taktis Day 1",
    subtitle: "Uji insting membunuh Anda melawan Bot Level 2/3 dengan taktik menyerang",
    duration: "30 min",
    category: "Sparring Challenge",
    icon: "⚔️",
    theory: `
      <h3>Target Pertandingan Day 1:</h3>
      <ul>
        <li>Cari peluang pengorbanan taktis (Greek Gift, Deflection, atau Discovered Attack).</li>
        <li>Manfaatkan pin pada bidak lawan dengan mendorong pion penekan.</li>
        <li>Hindari langkah pasif: selalu cari <em>Forcing Moves</em> di setiap giliran.</li>
        <li>Gunakan tombol <strong>AI Coach Hint</strong> jika Anda ragu apakah ada kombinasi taktik yang tersembunyi!</li>
      </ul>
    `,
    demoFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    puzzles: [
      {
        instruction: "Selesaikan sparring puzzle dengan memakan Queen lawan melalui serangan kombinasi!",
        fen: "r1b1k2r/ppppqppp/2n5/4P3/2B1n3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 1",
        solution: ["c4f7"],
        hint: "Korbankan bishop di f7 dengan skak!"
      }
    ]
  },

  // ==========================================================================
  // DAY 2: Positional Mastery, Prophylaxis, Repertoires & Deep Endgame
  // ==========================================================================
  {
    id: 9,
    day: 2,
    title: "Profilaksis: Seni Menghentikan Rencana Lawan",
    subtitle: "Gaya bermain Anatoly Karpov & Tigran Petrosian: Cegah sebelum terjadi",
    duration: "20 min",
    category: "Prophylaxis",
    icon: "🛡️",
    theory: `
      <h3>Apa itu Berpikir Profilaksis (Prophylactic Thinking)?</h3>
      <p>Pemain medioker hanya memikirkan rencananya sendiri. <strong>Grandmaster kelas dunia selalu bertanya: <em>"Apa yang ingin dilakukan lawan saya pada langkah berikutnya?"</em></strong> lalu menetralisir ide tersebut sebelum lawan sempat memulainya.</p>

      <div class="theory-callout tip">
        <strong>🎯 Contoh Profilaksis Paling Sering:</strong>
        <ul>
          <li>Memainkan <code>h3!</code> atau <code>a3!</code> untuk mencegah pinning Bishop/Knight lawan di g4 atau b4.</li>
          <li>Menggeser Raja ke <code>Kh1</code> atau <code>Kh8</code> untuk keluar dari pin diagonal sebelum membuka file tengah.</li>
          <li>Memasang benteng di file yang <em>akan</em> dibuka oleh lawan pada langkah berikutnya.</li>
        </ul>
      </div>
    `,
    demoFen: "r1bqk2r/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQK2R w KQkq - 0 1",
    puzzles: [
      {
        instruction: "Mainkan langkah profilaksis 1. h3 untuk mencegah gajah lawan melompat ke g4!",
        fen: "r1bqk2r/ppp2ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 1",
        solution: ["h2h3"],
        hint: "Dorong pion h2 ke h3 untuk mengontrol petak g4."
      }
    ]
  },
  {
    id: 10,
    day: 2,
    title: "Pawn Breaks & Menguasai Ruang (Space Advantage)",
    subtitle: "Cara mendobrak posisi terkunci dan mengonversi keunggulan ruang",
    duration: "20 min",
    category: "Pawn Play",
    icon: "🧱",
    theory: `
      <h3>1. The Pawn Lever / Break (Dobrak Pion)</h3>
      <p>Ketika posisi tertutup, Anda tidak bisa menyerang dengan perwira saja. Anda <strong>wajib melakukan dorongan pion (pawn break)</strong> seperti <code>f4-f5</code>, <code>c4-c5</code>, atau <code>d4-d5</code> untuk membuka jalur bagi Benteng dan Menteri Anda.</p>

      <h3>2. Hukum Rantai Pion (Attack the Base)</h3>
      <p>Selalu serang <strong>pangkal rantai pion (the base of the pawn chain)</strong>, bukan ujungnya! Jika rantai pion putih adalah <code>c3-d4-e5</code>, serang pion <code>c3</code> atau <code>d4</code> dengan dorongan <code>...c5!</code> atau <code>...f6!</code>.</p>
    `,
    demoFen: "r1bq1rk1/pp1n1pbp/2pp1np1/4p3/2PPP3/2N1BP2/PP1QN1PP/R3KB1R w KQ - 0 1",
    puzzles: [
      {
        instruction: "Lakukan pawn break di pusat dengan mendorong pion d4 ke d5!",
        fen: "r1bq1rk1/pp1n1pbp/2pp1np1/4p3/2PPP3/2N1BP2/PP1QN1PP/R3KB1R w KQ - 0 1",
        solution: ["d4d5"],
        hint: "Majukan pion d4 ke d5 untuk mengunci dan merebut keunggulan ruang."
      }
    ]
  },
  {
    id: 11,
    day: 2,
    title: "Outposts Monster, Weak Squares & Color Complexes",
    subtitle: "Mengeksploitasi kelemahan petak satu warna (Light/Dark-Square Weakness)",
    duration: "20 min",
    category: "Positional Mastery",
    icon: "🏰",
    theory: `
      <h3>1. Outpost Abadi untuk Kuda</h3>
      <p>Petak di baris ke-5 atau ke-6 yang dijaga oleh pion Anda dan <em>tidak bisa lagi diusir oleh pion lawan</em> (karena pion tetangga lawan sudah terdorong maju). Kuda di outpost sentral (seperti d5 atau e5) mendominasi seluruh papan!</p>

      <h3>2. Color Complex Weakness</h3>
      <p>Jika lawan memajukan semua pionnya ke petak terang dan menukar Bishop petak gelapnya, maka <strong>seluruh petak gelap di teritorinya menjadi lubang hitam</strong> yang bisa Anda masuki tanpa perlawanan.</p>
    `,
    demoFen: "r1b2rk1/pp2qppp/2n1pn2/3p4/2PP4/2N2N2/PP2BPPP/R2Q1RK1 w - - 0 1",
    puzzles: [
      {
        instruction: "Tancapkan Kuda putih ke Outpost monster di e5!",
        fen: "r1b2rk1/pp2qppp/2n1pn2/3p4/3P4/2N2N2/PPP1BPPP/R2Q1RK1 w - - 0 1",
        solution: ["f3e5"],
        hint: "Kuda melompat dari f3 ke petak sentral e5."
      }
    ]
  },
  {
    id: 12,
    day: 2,
    title: "Benteng di Baris ke-7 (Rook on the 7th Rank)",
    subtitle: "The Blind Pigs: Menguasai jalur horizontal musuh dengan sepasang benteng",
    duration: "20 min",
    category: "Rook Power",
    icon: "🚂",
    theory: `
      <h3>Kekuatan Mutlak Benteng di Baris ke-7 (atau baris 2 untuk Hitam)</h3>
      <p>Di baris ke-7, Benteng Anda menyerang seluruh pion lawan dari samping, membatasi ruang Raja lawan, dan sering kali menghasilkan ancaman skakmat horizontal berkelanjutan (<em>Perpetual check</em> atau <em>Mating net</em>).</p>

      <div class="theory-callout tip">
        <strong>🐷 The Blind Pigs (Babi Buta):</strong> Istilah catur klasik untuk <strong>dua Benteng yang ditumpuk di baris ke-7</strong>. Kekuatannya hampir selalu memenangkan partai karena mampu menyapu bersih seluruh bidak lawan!
      </div>
    `,
    demoFen: "2r3k1/1p3ppp/8/8/8/8/1R3PPP/1R4K1 w - - 0 1",
    puzzles: [
      {
        instruction: "Luncurkan Benteng kedua ke baris ke-7 (Rb7) untuk membentuk dominasi mutlak!",
        fen: "2r3k1/1p3ppp/8/8/8/8/1R3PPP/1R4K1 w - - 0 1",
        solution: ["b1b7"],
        hint: "Makan pion di b7 dengan benteng b1."
      }
    ]
  },
  {
    id: 13,
    day: 2,
    title: "Mastering Repertoires: Sicilian Defense & London Fortress",
    subtitle: "Rencana strategis mendalam menghadapi 1.e4 dan 1.d4 di level turnamen",
    duration: "20 min",
    category: "Repertoire Mastery",
    icon: "📖",
    theory: `
      <h3>1. Sicilian Defense (1.e4 c5) — Senjata Serangan Balik Terkuat</h3>
      <p>Hitam tidak membalas simetris (1...e5), melainkan menukar pion sayap (c-pion) dengan pion pusat putih (d-pion) via <code>...cxd4</code>. Rencana Hitam: Menguasai semi-open c-file dengan Benteng dan melancarkan serangan di sayap menteri.</p>

      <h3>2. London System (1.d4 d5 2.Bf4) — Piramida Baja Putih</h3>
      <p>Menempatkan Bishop di luar rantai pion (f4) sebelum menutup formasi segitiga <code>c3-d4-e3</code>. Sangat stabil melawan serangan agresif lawan.</p>
    `,
    demoFen: "r1bqkbnr/pp1ppppp/2n5/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 2",
    puzzles: [
      {
        instruction: "Buka Open Sicilian dengan dorongan 3. d4!",
        fen: "r1bqkbnr/pp1ppppp/2n5/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 2",
        solution: ["d2d4"],
        hint: "Dorong pion d2 ke d4 untuk membuka pusat."
      }
    ]
  },
  {
    id: 14,
    day: 2,
    title: "Endgame Tingkat Lanjut: Lucena Bridge & Philidor Defense",
    subtitle: "Teknik wajib menang dan teknik wajib remis pada babak akhir Benteng",
    duration: "20 min",
    category: "Deep Endgame",
    icon: "🌉",
    theory: `
      <h3>1. Posisi Lucena (Building a Bridge / Membangun Jembatan)</h3>
      <p>Jika pion Anda di baris ke-7 dan Raja Anda di petak promosi di depannya:</p>
      <ol>
        <li>Tempatkan Benteng Anda di <strong>baris ke-4</strong> (misal <code>Rf4</code>).</li>
        <li>Keluarkan Raja Anda untuk memberi jalan bagi promosi pion.</li>
        <li>Saat Benteng lawan memberi rentetan skak vertikal, lindungi Raja dengan <strong>memotong skak menggunakan Benteng di baris ke-4 (Rd4 / Re4)</strong>!</li>
      </ol>

      <h3>2. Posisi Philidor (Pertahanan Baris ke-6)</h3>
      <p>Ketika bertahan: Jaga Benteng di baris ke-6 untuk mencegah Raja lawan maju. Saat pion lawan akhirnya didorong, segera turunkan Benteng ke baris 1 dan beri skak dari belakang!</p>
    `,
    demoFen: "1K1k4/1P6/8/8/5R2/8/8/2r5 w - - 0 1",
    puzzles: [
      {
        instruction: "Beri Skak dengan Benteng f4 ke d4 untuk mengusir Raja hitam menjauh dari pion!",
        fen: "1K1k4/1P6/8/8/5R2/8/8/2r5 w - - 0 1",
        solution: ["f4d4"],
        hint: "Benteng meluncur ke d4 memberi skak vertikal."
      }
    ]
  },
  {
    id: 15,
    day: 2,
    title: "Minor Piece Endgame: Zugzwang & Benteng Anti-Kalah",
    subtitle: "Memaksa lawan membuat langkah bunuh diri saat kehabisan opsi",
    duration: "15 min",
    category: "Endgame Geometry",
    icon: "🎯",
    theory: `
      <h3>1. Konsep Zugzwang (Paksaan Melangkah yang Merugikan)</h3>
      <p>Kondisi unik dalam catur di mana <em>setiap langkah legal yang tersedia akan memperburuk posisi pemain yang giliran melangkah</em>. Jika Anda menempatkan lawan dalam Zugzwang di babak akhir, mereka terpaksa menyerahkan pion atau petak penting!</p>

      <h3>2. Opposite-Colored Bishops (Gajah Beda Warna)</h3>
      <p>Di <strong>Endgame</strong>, Bishop beda warna sangat sering berakhir <strong>Draw (Remis)</strong> meski tertinggal 1-2 pion karena benteng pertahanan yang tak tertembus. Namun di <strong>Middlegame</strong>, Bishop beda warna justru menguntungkan pihak penyerang karena lawan tidak memiliki bidak yang bisa menjaga petak warna Anda!</p>
    `,
    demoFen: "8/8/8/4k3/8/4K3/4P3/8 w - - 0 1",
    puzzles: [
      {
        instruction: "Pegang Oposisi langsung: majukan Raja putih ke e4 untuk menempatkan hitam dalam posisi terjepit!",
        fen: "8/8/8/4k3/8/4K3/8/8 w - - 0 1",
        solution: ["e3e4"],
        hint: "Raja maju ke e4 memegang oposisi frontal."
      }
    ]
  },
  {
    id: 16,
    day: 2,
    title: "🏆 Master Graduation: Full Classical Match vs Bot",
    subtitle: "Uji seluruh perbendaharaan taktik dan posisional Anda melawan Bot Level 4/5!",
    duration: "45 min",
    category: "Master Boss",
    icon: "👑",
    theory: `
      <h3>Ujian Kelulusan Crash Course 2 Hari! 🎓</h3>
      <p>Anda kini telah mempelajari prinsip taktis, kalkulasi Forcing Moves, profilaksis, struktur pion, hingga teknik Lucena Endgame yang setara dengan pemahaman pemain klub/turnamen!</p>
      
      <div class="theory-callout tip">
        <strong>📋 Grandmaster Execution Protocol:</strong>
        <ol>
          <li><strong>Opening</strong>: Kontrol pusat & selesaikan development dalam 8 langkah.</li>
          <li><strong>Middlegame</strong>: Cari outposts, identifikasi weak squares, dan selalu cek C-C-T (Checks, Captures, Threats).</li>
          <li><strong>Tactics</strong>: Waspadai Greek Gift, Pins, Zwischenzug, dan Hanging Pieces.</li>
          <li><strong>Prophylaxis</strong>: Antisipasi ancaman lawan sebelum menyerang.</li>
          <li><strong>Endgame</strong>: Aktifkan Raja Anda dan terapkan teknik jembatan Lucena!</li>
        </ol>
      </div>
    `,
    demoFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    puzzles: [
      {
        instruction: "Selesaikan ujian kelulusan dengan skakmat telak di h7!",
        fen: "r1b2rk1/pp1n1ppp/2p1p3/q2p2N1/2PP4/2N1P3/PPQ2PPP/R3KB1R w KQ - 0 1",
        solution: ["c2h7"],
        hint: "Queen putih meluncur ke h7 mengeksekusi skakmat dibantu kuda g5."
      }
    ]
  }
];

// 100 Comprehensive Tactical Puzzles covering all major tactical motifs (Rating 500 - 2000)
const TACTICS_PUZZLES = [
  // 1-10: Fork Motifs
  { id: 1, title: "Royal Knight Fork", motif: "Fork", difficulty: "Easy", rating: 550, fen: "r1bqk2r/pppp1ppp/2n5/4p3/1b2n3/2NP1N2/PPP1BPPP/R1BQK2R w KQkq - 0 6", solution: ["c3e4"], instruction: "Putih melangkah dan menghukum perwira musuh yang tidak terjaga!", explanation: "Kuda Putih memakan Kuda hitam di e4 yang menggantung." },
  { id: 2, title: "Knight Fork King & Queen", motif: "Fork", difficulty: "Easy", rating: 650, fen: "r1b1k2r/ppp2ppp/8/3qp3/3n4/3P1N2/PPP1BPPP/R2QK2R w KQkq - 0 1", solution: ["f3d4"], instruction: "Lumpuhkan kuda aktif hitam di d4!", explanation: "Kuda putih memakan d4 untuk merebut inisiatif." },
  { id: 3, title: "Family Fork on c7", motif: "Fork", difficulty: "Medium", rating: 850, fen: "r1bqkb1r/pppp1ppp/2n5/4N3/4n3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 5", solution: ["d1e2"], instruction: "Tekan kuda lawan di e4 dengan pin & fork!", explanation: "Queen ke e2 menekan kuda hitam di e4 yang sejajar dengan Raja." },
  { id: 4, title: "Pawn Fork on Center", motif: "Fork", difficulty: "Easy", rating: 600, fen: "r1bqk2r/ppp2ppp/2n5/3p4/1b1PP3/2N2N2/PPP3PP/R1BQKB1R w KQkq - 0 7", solution: ["e4d5"], instruction: "Bongkar pusat dan menangkan tempo!", explanation: "Pion memakan d5 dan membuka jalur serangan." },
  { id: 5, title: "Queen Double Attack", motif: "Fork", difficulty: "Medium", rating: 900, fen: "r1b1kb1r/ppp2ppp/2n5/4q3/4N3/8/PPPP1PPP/R1BQKB1R w KQkq - 0 8", solution: ["d1e2"], instruction: "Selamatkan Kuda dan ikat Queen lawan!", explanation: "Queen e2 melindungi kuda sekaligus mem-pin Queen hitam." },
  { id: 6, title: "Bishop Forking Rooks", motif: "Fork", difficulty: "Medium", rating: 950, fen: "r4rk1/ppp2ppp/8/4B3/8/8/PPP2PPP/R4RK1 w - - 0 1", solution: ["e5c7"], instruction: "Ambil pion gratis di c7!", explanation: "Gajah memakan c7 dengan aman." },
  { id: 7, title: "Knight Fork on f7", motif: "Fork", difficulty: "Medium", rating: 1000, fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 4 4", solution: ["c4f7"], instruction: "Lakukan serangan Fried Liver ke f7!", explanation: "Gajah memakan f7 dengan skak telak merusak hak rokade hitam." },
  { id: 8, title: "Rook Fork on 7th Rank", motif: "Fork", difficulty: "Hard", rating: 1200, fen: "r4rk1/1R3ppp/8/8/8/8/5PPP/5RK1 w - - 0 1", solution: ["f1b1"], instruction: "Gandakan Benteng di jalur terbuka!", explanation: "Menguasai open b-file." },
  { id: 9, title: "Queen Fork King & Loose Bishop", motif: "Fork", difficulty: "Easy", rating: 700, fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4", solution: ["c4f7"], instruction: "Beri skak pengorbanan di f7!", explanation: "Bxh7+ atau Bxf7+ membongkar Raja lawan." },
  { id: 10, title: "Endgame Knight Fork", motif: "Fork", difficulty: "Medium", rating: 1100, fen: "8/5k2/8/4N3/8/3K4/8/8 w - - 0 1", solution: ["d3e4"], instruction: "Aktifkan Raja ke pusat!", explanation: "Raja menuju e4 untuk mendominasi endgame." },

  // 11-20: Pin & Absolute Pin
  { id: 11, title: "Absolute Pin on Queen", motif: "Pin", difficulty: "Easy", rating: 650, fen: "r1b1k2r/pppp1ppp/2n5/4q3/1b2B3/2N5/PPP2PPP/R1BQK2R w KQkq - 0 9", solution: ["e1g1"], instruction: "Rokade untuk mengamankan Raja dan mengaktifkan Benteng!", explanation: "O-O melepaskan pin dan mengancam Re1 memaku Queen." },
  { id: 12, title: "Pin & Pile On Pressure", motif: "Pin", difficulty: "Medium", rating: 950, fen: "r1bqk2r/ppppbppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5", solution: ["c1g5"], instruction: "Paku Kuda f6 terhadap Queen hitam!", explanation: "Bg5 menciptakan pin mutlak pada sayap raja." },
  { id: 13, title: "Rook Pins Queen on e-file", motif: "Pin", difficulty: "Easy", rating: 750, fen: "4k3/4q3/8/8/8/8/4R3/4K3 w - - 0 1", solution: ["e2e7"], instruction: "Ambil Queen yang terpaku di jalur e!", explanation: "Rook memakan Queen hitam yang tidak bisa kabur." },
  { id: 14, title: "Bishop Pinning Knight to King", motif: "Pin", difficulty: "Medium", rating: 900, fen: "r1b1k2r/pppp1ppp/5n2/4b3/4N3/1B1P4/PPP2PPP/R1BQK2R w KQkq - 0 9", solution: ["c1g5"], instruction: "Tambah tekanan pada sayap raja!", explanation: "Bg5 memaku pertahanan hitam." },
  { id: 15, title: "Pin Breakthrough", motif: "Pin", difficulty: "Hard", rating: 1300, fen: "r2qk2r/ppp1bppp/2n2n2/3p4/3P4/2N2B2/PPP2PPP/R1BQR1K1 w kq - 0 10", solution: ["c1g5"], instruction: "Kembangkan perwira terakhir dengan pin aktif!", explanation: "Bg5 memberi tekanan maksimal pada f6 dan d5." },
  { id: 16, title: "Double Pin Exploitation", motif: "Pin", difficulty: "Hard", rating: 1400, fen: "3rr1k1/ppp2ppp/8/3q4/8/3B4/PPP2PPP/R2QR1K1 w - - 0 1", solution: ["e1e8"], instruction: "Tukarkan benteng untuk memenangkan tempo!", explanation: "Rxe8+ memaksa Rxe8 lalu Qxd5 memenangkan partai." },
  { id: 17, title: "Cross-Pin Tactic", motif: "Pin", difficulty: "Medium", rating: 1050, fen: "r1b1r1k1/ppp2ppp/2n5/3q4/3P4/2B2N2/PP3PPP/R2Q1RK1 w - - 0 1", solution: ["f1e1"], instruction: "Kuasai jalur terbuka e-file!", explanation: "Re1 menantang penguasaan e-file." },
  { id: 18, title: "Pinning the Defender of Mate", motif: "Pin", difficulty: "Hard", rating: 1350, fen: "r1b2rk1/pp3ppp/2n5/q7/4B3/5N2/PPP2PPP/R2Q1RK1 w - - 0 1", solution: ["d1d3"], instruction: "Bentuk baterai Queen-Bishop mengancam h7!", explanation: "Qd3 mengincar pion h7 yang lemah." },
  { id: 19, title: "Pin against the Uncastled King", motif: "Pin", difficulty: "Easy", rating: 700, fen: "r1bqk2r/pppp1ppp/2n5/4p3/2B1n3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5", solution: ["d3e4"], instruction: "Makan Kuda e4 yang tidak terjaga!", explanation: "dxe4 memenangkan satu perwira penuh." },
  { id: 20, title: "Defending Against Pin", motif: "Pin", difficulty: "Medium", rating: 850, fen: "r1bqkb1r/pppp1ppp/2n5/1B2p3/4n3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5", solution: ["d3e4"], instruction: "Ambil kuda musuh sekarang!", explanation: "dxe4 memenangkan kuda gratis." },

  // 21-30: Skewer & Discovered Attack
  { id: 21, title: "Queen Skewers Rook and King", motif: "Skewer", difficulty: "Easy", rating: 750, fen: "4r1k1/ppp2ppp/8/8/8/2B5/PPP2PPP/4Q1K1 w - - 0 1", solution: ["e1e8"], instruction: "Manfaatkan back-rank yang lemah!", explanation: "Qxe8# menghasilkan skakmat langsung di baris belakang." },
  { id: 22, title: "Rook Skewer on 8th Rank", motif: "Skewer", difficulty: "Medium", rating: 950, fen: "k7/8/1R6/8/8/8/7r/1K6 w - - 0 1", solution: ["b6a6"], instruction: "Beri skak horizontal pada raja lawan!", explanation: "Ra6+ memaksa Kb8 lalu Ra8." },
  { id: 23, title: "Discovered Check on Queen", motif: "Discovered Attack", difficulty: "Easy", rating: 800, fen: "r1bqk2r/pppp1ppp/2n2n2/4N3/1b2P3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 5", solution: ["e5c6"], instruction: "Bongkar posisi dengan memakan kuda c6!", explanation: "Nxc6 membuka serangan ganda pada Queen." },
  { id: 24, title: "Discovered Double Check", motif: "Discovered Attack", difficulty: "Medium", rating: 1100, fen: "r1b2rk1/ppp2ppp/2N5/3q4/8/2B5/PPP2PPP/R2QK2R w KQ - 0 1", solution: ["d1d5"], instruction: "Makan Queen hitam yang menggantung!", explanation: "Qxd5 memenangkan menteri bersih." },
  { id: 25, title: "Discovered Attack on Loose Bishop", motif: "Discovered Attack", difficulty: "Medium", rating: 1000, fen: "r1b1k2r/pppp1ppp/2n5/2b1N3/7q/8/PPPPBPPP/RNBQK2R w KQkq - 0 6", solution: ["e5g4"], instruction: "Tutup ancaman skakmat lawan!", explanation: "Ng4 memblokade jalur queen hitam." },
  { id: 26, title: "Windmill Discovered Tactic", motif: "Discovered Attack", difficulty: "Hard", rating: 1500, fen: "6k1/5ppp/8/8/8/1B6/5PPP/R5K1 w - - 0 1", solution: ["a1a8"], instruction: "Eksekusi Back-Rank Skakmat!", explanation: "Ra8# skakmat karena gajah b3 memotong pelarian." },
  { id: 27, title: "Queen Skewer Endgame", motif: "Skewer", difficulty: "Medium", rating: 1150, fen: "8/8/8/3k4/8/Q7/8/1K5r w - - 0 1", solution: ["a3f3"], instruction: "Skak Raja d5 sekaligus mengincar Benteng h1!", explanation: "Qf3+ skak tusuk memakan benteng h1." },
  { id: 28, title: "Discovered Check & Mate", motif: "Discovered Attack", difficulty: "Easy", rating: 700, fen: "r1bq1rk1/pppp1ppp/2n5/3NP1N1/2B5/8/PPP2PPP/R1BQK2R w KQ - 0 9", solution: ["d1h5"], instruction: "Serang h7 dengan ancaman mate!", explanation: "Qh5 mengancam Qxh7#." },
  { id: 29, title: "Bishop Skewer on King and Queen", motif: "Skewer", difficulty: "Hard", rating: 1300, fen: "r3k2r/pp3ppp/8/8/3B4/8/PPP2PPP/R3K2R w KQkq - 0 1", solution: ["d4g7"], instruction: "Makan pion g7 dan serang benteng h8!", explanation: "Bxg7 menyerang benteng di sayap raja." },
  { id: 30, title: "Discovered Threat on f7", motif: "Discovered Attack", difficulty: "Medium", rating: 1050, fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 4", solution: ["e1g1"], instruction: "Amankan Raja Anda sekarang!", explanation: "O-O menyelesaikan development pembukaan." },

  // 31-40: Back-Rank Mate & Smothered Mate
  { id: 31, title: "Classic Back Rank Mate", motif: "Back Rank Mate", difficulty: "Easy", rating: 600, fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1", solution: ["e1e8"], instruction: "Berikan skakmat di baris ke-8!", explanation: "Re8# menghasilkan skakmat baris belakang." },
  { id: 32, title: "Queen Sacrifice Back Rank", motif: "Back Rank Mate", difficulty: "Medium", rating: 950, fen: "3r2k1/5ppp/8/8/8/8/4QPPP/6K1 w - - 0 1", solution: ["e2e7"], instruction: "Kuasai baris ke-7 dan serang benteng d8!", explanation: "Qe7 mengancam Qxe8# dan menyerang pertahanan hitam." },
  { id: 33, title: "Philidor's Legacy (Smothered Mate)", motif: "Smothered Mate", difficulty: "Hard", rating: 1450, fen: "6k1/5Npp/8/8/8/8/5PPP/4Q1K1 w - - 0 1", solution: ["e1e8"], instruction: "Selesaikan permainan dengan skakmat!", explanation: "Qe8# skakmat." },
  { id: 34, title: "Rook Sacrifice for Back Rank", motif: "Back Rank Mate", difficulty: "Medium", rating: 1100, fen: "2r3k1/5ppp/8/8/8/8/1R3PPP/6K1 w - - 0 1", solution: ["b2b8"], instruction: "Paku benteng hitam ke baris belakang!", explanation: "Rb8 memaksa pertukaran benteng dan skakmat." },
  { id: 35, title: "Corridor Mate on h-file", motif: "Back Rank Mate", difficulty: "Easy", rating: 700, fen: "7k/7p/8/8/8/8/7R/6K1 w - - 0 1", solution: ["h2g2"], instruction: "Potong petak kabur raja lawan!", explanation: "Rg2 mengunci raja hitam di sudut." },
  { id: 36, title: "Double Rook Elevator Mate", motif: "Back Rank Mate", difficulty: "Easy", rating: 650, fen: "8/8/8/8/8/5k2/1R6/R5K1 w - - 0 1", solution: ["a1a3"], instruction: "Beri skak bertingkat pada Raja hitam!", explanation: "Ra3+ memaksa Raja mundur ke baris belakang." },
  { id: 37, title: "Smothered Mate with Knight", motif: "Smothered Mate", difficulty: "Hard", rating: 1400, fen: "6rk/6pp/7N/8/8/8/8/6K1 w - - 0 1", solution: ["h6f7"], instruction: "Lakukan Smothered Mate dengan satu kuda!", explanation: "Nf7# skakmat mati lemas karena raja terkunci bidaknya sendiri." },
  { id: 38, title: "Back-Rank Deflection", motif: "Back Rank Mate", difficulty: "Hard", rating: 1350, fen: "3r2k1/p4ppp/8/8/8/4Q3/P4PPP/3R2K1 w - - 0 1", solution: ["d1d8"], instruction: "Ambil benteng hitam dan lakukan skakmat!", explanation: "Rxd8# memenangkan permainan secara mutlak." },
  { id: 39, title: "Opera House Mate Pattern", motif: "Back Rank Mate", difficulty: "Medium", rating: 1200, fen: "4kb1r/p2n1ppp/4p3/8/8/2B5/P1P2PPP/1R4K1 w k - 0 1", solution: ["b1b7"], instruction: "Invasi baris ke-7 dengan benteng!", explanation: "Rb7 menyapu pion sayap menteri." },
  { id: 40, title: "Boden's Mate Cross Bishops", motif: "Boden's Mate", difficulty: "Hard", rating: 1550, fen: "2kr4/ppp2ppp/8/8/8/2B5/PPP2PPP/2K5 w - - 0 1", solution: ["c3g7"], instruction: "Makan pion g7 dan pecah rantai pion!", explanation: "Bxg7 menguasai keunggulan poin." },

  // 41-50: Deflection & Overload
  { id: 41, title: "Deflection of Queen Guard", motif: "Deflection", difficulty: "Medium", rating: 1100, fen: "r1b2rk1/ppp2ppp/8/3q4/8/3B4/PPP2PPP/R2Q1RK1 w - - 0 1", solution: ["d3h7"], instruction: "Korbankan gajah di h7 untuk memenangkan Queen d5!", explanation: "Bxh7+ skak discovered attack, lalu Qxd5 memenangkan menteri!" },
  { id: 42, title: "Overloaded Defender Exploitation", motif: "Overload", difficulty: "Hard", rating: 1300, fen: "r4rk1/ppp2ppp/2n5/4p3/4B3/3P1N2/PPP2PPP/R2Q1RK1 w - - 0 1", solution: ["e4c6"], instruction: "Hancurkan struktur pion hitam di c6!", explanation: "Bxc6 merusak struktur pion sayap menteri." },
  { id: 43, title: "Deflecting the King from Castling", motif: "Deflection", difficulty: "Easy", rating: 800, fen: "r1bqk2r/pppp1Bpp/2n2n2/4p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 4", solution: ["e8f7"], instruction: "Makan gajah f7 dengan raja!", explanation: "Kxf7 memakan perwira musuh." },
  { id: 44, title: "Removing the Only Guard", motif: "Overload", difficulty: "Medium", rating: 1050, fen: "r1b1k2r/ppp2ppp/2n5/3qp3/1b1P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6", solution: ["c1d2"], instruction: "Bebaskan pin pada kuda c3!", explanation: "Bd2 memblokade ancaman gajah b4." },
  { id: 45, title: "Deflecting Rook from Back Rank", motif: "Deflection", difficulty: "Hard", rating: 1400, fen: "3r2k1/ppp2ppp/8/8/3q4/8/PPP2PPP/R3Q1K1 w - - 0 1", solution: ["e1e7"], instruction: "Serang baris ke-7 dan kuasai inisiatif!", explanation: "Qe7 mengancam Qxe8# dan c7." },
  { id: 46, title: "Overloaded Queen Sacrifice", motif: "Overload", difficulty: "Hard", rating: 1500, fen: "r4rk1/ppp2ppp/8/3P4/8/2B5/PPP2PPP/R2Q1RK1 w - - 0 1", solution: ["d1d4"], instruction: "Bentuk baterai mengancam Qxg7# skakmat!", explanation: "Qd4 mengancam mate tak tertahan di g7." },
  { id: 47, title: "Deflecting Pawn with Knight Sac", motif: "Deflection", difficulty: "Hard", rating: 1450, fen: "r1bqk2r/ppp2ppp/2np1n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 5", solution: ["g5f7"], instruction: "Serang f7 dengan Fork Queen & Rook!", explanation: "Nxf7 melakukan fork pada menteri dan benteng hitam." },
  { id: 48, title: "Overloaded King in Pawn Endgame", motif: "Overload", difficulty: "Medium", rating: 1150, fen: "8/5k2/5p2/5P2/6K1/8/8/8 w - - 0 1", solution: ["g4h5"], instruction: "Maju menembus sayap raja!", explanation: "Kh5 mengincar pion f6." },
  { id: 49, title: "Deflecting Bishop Guard", motif: "Deflection", difficulty: "Easy", rating: 850, fen: "r1b1k2r/pppp1ppp/5n2/4q3/1b2P3/2NB4/PPP2PPP/R1BQK2R w KQkq - 0 7", solution: ["c1d2"], instruction: "Kembangkan gajah d2 mengamankan posisi!", explanation: "Bd2 menyelesaikan koordinasi pertahanan." },
  { id: 50, title: "Overloaded Knight on c6", motif: "Overload", difficulty: "Medium", rating: 1000, fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 4", solution: ["f3g5"], instruction: "Beri tekanan ganda pada f7!", explanation: "Ng5 menekan petak terlemah f7." },

  // 51-60: Zwischenzug (In-Between Moves)
  { id: 51, title: "Zwischenzug Check Before Recapture", motif: "Zwischenzug", difficulty: "Medium", rating: 1100, fen: "r1bqk2r/ppp2ppp/2n5/3np3/1bBP4/2N2N2/PPP2PPP/R1BQK2R w KQkq - 0 6", solution: ["c4d5"], instruction: "Makan kuda d5 sebelum merespon gajah b4!", explanation: "Bxd5 langkah sela yang mempertahankan keunggulan perwira." },
  { id: 52, title: "Intermediate Threat on Queen", motif: "Zwischenzug", difficulty: "Hard", rating: 1350, fen: "r1b1k2r/ppp2ppp/2n5/3qp3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6", solution: ["c3d5"], instruction: "Makan Queen lawan secara langsung!", explanation: "Nxd5 memenangkan Queen hitam." },
  { id: 53, title: "In-Between Pawn Push", motif: "Zwischenzug", difficulty: "Medium", rating: 1050, fen: "r1bqk2r/ppp2ppp/2n2n2/3pp3/1bPP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 5", solution: ["c4d5"], instruction: "Makan pion d5 dan buka ruang di pusat!", explanation: "cxd5 merusak rantai pion hitam." },
  { id: 54, title: "In-Between Check to Save Piece", motif: "Zwischenzug", difficulty: "Hard", rating: 1400, fen: "r1bqkb1r/pppp1ppp/2n5/4P3/1bB1n3/2N2N2/PPP2PPP/R1BQK2R w KQkq - 0 6", solution: ["c4f7"], instruction: "Beri skak sela di f7 sebelum memakan e4!", explanation: "Bxf7+ memaksa Kxf7 lalu Nxe4." },
  { id: 55, title: "Zwischenzug to Avoid Stalemate", motif: "Zwischenzug", difficulty: "Hard", rating: 1500, fen: "7k/5Q2/8/8/8/8/6PP/7K w - - 0 1", solution: ["g2g4"], instruction: "Cegah stalemate dengan mendorong pion g4!", explanation: "g4 memberi ruang langkah bagi hitam." },
  { id: 56, title: "In-Between Exchange on c6", motif: "Zwischenzug", difficulty: "Medium", rating: 1200, fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQK2R w KQkq - 0 5", solution: ["e1g1"], instruction: "Selesaikan rokade sekarang!", explanation: "O-O mengamankan Raja di sayap raja." },
  { id: 57, title: "Intermediate Queen Check", motif: "Zwischenzug", difficulty: "Medium", rating: 1150, fen: "r1bqk2r/pppp1ppp/2n5/4p3/2B1n3/2P2N2/PPP2PPP/R1BQK2R w KQkq - 0 6", solution: ["d1d5"], instruction: "Ancam skakmat di f7 sekaligus serang kuda e4!", explanation: "Qd5 menciptakan ancaman ganda fatal Qxf7# dan Qxe4." },
  { id: 58, title: "Zwischenzug Clearance", motif: "Zwischenzug", difficulty: "Hard", rating: 1450, fen: "r1b1k2r/ppp2ppp/2n5/3pP3/1b1P3q/2N2N2/PPP3PP/R1BQKB1R w KQkq - 0 7", solution: ["f3h4"], instruction: "Makan Queen hitam yang memberi skak!", explanation: "Nxh4 memenangkan menteri musuh." },
  { id: 59, title: "In-Between Rook Activation", motif: "Zwischenzug", difficulty: "Medium", rating: 1000, fen: "r1b2rk1/ppp2ppp/2n5/3q4/3P4/5N2/PP3PPP/R1BQR1K1 w - - 0 1", solution: ["c1e3"], instruction: "Kembangkan gajah dan lindungi pion d4!", explanation: "Be3 memperkuat sentral d4." },
  { id: 60, title: "Zwischenzug Pin Escape", motif: "Zwischenzug", difficulty: "Hard", rating: 1300, fen: "r1bqk2r/pppp1ppp/2n5/1B2p3/4n3/3P1N2/PPP2PPP/RNBQ1RK1 w kq - 0 5", solution: ["d3e4"], instruction: "Ambil kuda lawan sekarang!", explanation: "dxe4 memenangkan satu perwira penuh." },

  // 61-70: Greek Gift & Attacking Sacrifices
  { id: 61, title: "Greek Gift Classic Bxh7+", motif: "Greek Gift", difficulty: "Medium", rating: 1200, fen: "r1bq1rk1/ppp2ppp/2n1p3/3pP3/3P4/2PB1N2/PP1N1PPP/R2QK2R w KQ - 0 1", solution: ["d3h7"], instruction: "Korbankan gajah d3 ke h7 dengan skak!", explanation: "Bxh7+ memicu kombinasi serangan maut Greek Gift." },
  { id: 62, title: "Greek Gift Follow-Up Ng5+", motif: "Greek Gift", difficulty: "Medium", rating: 1250, fen: "r1bq1r2/ppp2ppk/2n1p3/3pP3/3P4/5N2/PP1N1PPP/R2QK2R w KQ - 0 2", solution: ["f3g5"], instruction: "Lompatkan kuda ke g5 dengan skak!", explanation: "Ng5+ memaksa Raja mundur ke g8 atau maju ke g6." },
  { id: 63, title: "Greek Gift Queen Entry Qh5", motif: "Greek Gift", difficulty: "Medium", rating: 1300, fen: "r1bq1rk1/ppp2pp1/2n1p3/3pP1N1/3P4/8/PP1N1PPP/R2QK2R w KQ - 0 3", solution: ["d1h5"], instruction: "Bawa Queen ke h5 mengancam Qh7#!", explanation: "Qh5 mengancam skakmat tak tertahankan di h7." },
  { id: 64, title: "Anastasia's Mate Setup", motif: "Anastasia Mate", difficulty: "Hard", rating: 1500, fen: "5rk1/ppp2ppp/4N3/8/8/8/PPP2PPP/4R1K1 w - - 0 1", solution: ["e6f8"], instruction: "Ambil benteng hitam di f8!", explanation: "Nxf8 memenangkan pertukaran kualitas." },
  { id: 65, title: "Hook Mate Geometry", motif: "Hook Mate", difficulty: "Hard", rating: 1550, fen: "5rk1/5ppp/5N2/8/8/8/5PPP/4R1K1 w - - 0 1", solution: ["f6d7"], instruction: "Bawa Kuda ke d7 mengunci petak kunci!", explanation: "Nd7 bermanuver mengontrol sentral." },
  { id: 66, title: "Lethal f7 Sacrifice (Fried Liver)", motif: "Fried Liver", difficulty: "Medium", rating: 1100, fen: "r1bqk2r/pppp1Npp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4", solution: ["e8e7"], instruction: "Selamatkan Raja Anda!", explanation: "Ke7 satu-satunya petak legal." },
  { id: 67, title: "Sacrifice on e6 to Open King", motif: "Greek Gift", difficulty: "Hard", rating: 1600, fen: "r1bqkb1r/pppn1ppp/4pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 5", solution: ["f1d3"], instruction: "Kembangkan gajah d3 mengincar h7!", explanation: "Bd3 mempersiapkan serangan Greek Gift." },
  { id: 68, title: "Double Bishop Sacrifice", motif: "Greek Gift", difficulty: "Hard", rating: 1700, fen: "r1bq1rk1/ppp2ppp/2n1pn2/3p4/1bPP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 6", solution: ["e1g1"], instruction: "Lakukan rokade pendek!", explanation: "O-O mengamankan Raja sebelum menyerang." },
  { id: 69, title: "H-file Pawn Storm Mate", motif: "Lethal Attack", difficulty: "Medium", rating: 1150, fen: "r1bq1rk1/ppp2ppp/2n5/4p3/3P4/2PB1N2/PP1N1PPP/R2Q1RK1 w - - 0 1", solution: ["f3e5"], instruction: "Makan pion e5 dan buka posisi!", explanation: "Nxe5 mendominasi petak pusat." },
  { id: 70, title: "Queen Penetration on f7", motif: "Lethal Attack", difficulty: "Easy", rating: 750, fen: "r1bqkb1r/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 3", solution: ["h5f7"], instruction: "Lakukan Scholar's Mate (Skakmat 4 Langkah)!", explanation: "Qxf7# skakmat instan." },

  // 71-80: Endgame Tactics & Pawn Promotion
  { id: 71, title: "Lucena Position Bridge Building", motif: "Endgame Technique", difficulty: "Hard", rating: 1650, fen: "1K1k4/1P6/8/8/8/8/5R2/7r w - - 0 1", solution: ["f2d2"], instruction: "Potong Raja lawan dengan Rd2+!", explanation: "Rd2+ mengusir Raja lawan dari c-file sebelum membangun jembatan." },
  { id: 72, title: "The Rule of the Square", motif: "Endgame Technique", difficulty: "Easy", rating: 700, fen: "8/8/8/3P4/8/8/4k3/4K3 w - - 0 1", solution: ["d5d6"], instruction: "Dorong pion bebas menuju promosi Queen!", explanation: "d6 tak terkejar oleh raja lawan." },
  { id: 73, title: "Opposition in King & Pawn Endgame", motif: "Endgame Technique", difficulty: "Medium", rating: 1000, fen: "8/8/8/4k3/8/4K3/4P3/8 w - - 0 1", solution: ["e3d3"], instruction: "Ambil oposisi diagonal/vertikal!", explanation: "Kd3 memimpin pion menuju promosi." },
  { id: 74, title: "Rook Cut-Off on Rank", motif: "Endgame Technique", difficulty: "Medium", rating: 950, fen: "8/8/8/8/3R4/4K3/8/4k3 w - - 0 1", solution: ["d4d2"], instruction: "Kunci Raja hitam di baris pertama!", explanation: "Rd2 memaksa Raja ke sudut." },
  { id: 75, title: "Pawn Breakthrough 3 vs 3", motif: "Endgame Technique", difficulty: "Hard", rating: 1550, fen: "8/ppp5/8/8/8/8/PPP5/4K2k w - - 0 1", solution: ["b2b4"], instruction: "Dorong sayap menteri untuk menciptakan pion bebas!", explanation: "b4 memulai perebutan ruang di sayap menteri." },
  { id: 76, title: "Philidor Rook Defense (6th Rank)", motif: "Endgame Technique", difficulty: "Hard", rating: 1600, fen: "4k3/8/8/3P4/8/8/8/3K3r w - - 0 1", solution: ["d1e2"], instruction: "Dekati benteng lawan!", explanation: "Ke2 mengusir benteng h1." },
  { id: 77, title: "Shouldering the Enemy King", motif: "Endgame Technique", difficulty: "Medium", rating: 1100, fen: "8/8/8/3k4/8/2K5/3P4/8 w - - 0 1", solution: ["c3d3"], instruction: "Ambil direct vertical opposition!", explanation: "Kd3 menghalau raja hitam masuk." },
  { id: 78, title: "Promoting Passed Pawn with Check", motif: "Endgame Technique", difficulty: "Easy", rating: 800, fen: "8/4P3/8/8/8/8/8/k1K5 w - - 0 1", solution: ["e7e8q"], instruction: "Promosikan pion menjadi Queen!", explanation: "e8=Q memenangkan permainan." },
  { id: 79, title: "Zugzwang in Minor Piece Endgame", motif: "Endgame Technique", difficulty: "Hard", rating: 1700, fen: "8/8/8/4k3/8/4B3/8/4K3 w - - 0 1", solution: ["e3d2"], instruction: "Tunggu langkah hitam dengan Bd2!", explanation: "Bd2 manuver menunggu (tempo move)." },
  { id: 80, title: "Trapping the Enemy Rook", motif: "Trapped Piece", difficulty: "Medium", rating: 1050, fen: "r7/ppp2ppp/8/3k4/8/2B5/PPP2PPP/4K3 w - - 0 1", solution: ["c3g7"], instruction: "Ambil pion gratis di g7!", explanation: "Bxg7 memenangkan keunggulan material." },

  // 81-90: Trapped Pieces & Clearance Sacrifices
  { id: 81, title: "Trapping Queen on Center", motif: "Trapped Piece", difficulty: "Medium", rating: 1150, fen: "r1b1k2r/ppp2ppp/2n5/3q4/1b1P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6", solution: ["a2a3"], instruction: "Usir gajah b4!", explanation: "a3 menguji gajah hitam." },
  { id: 82, title: "Trapping Bishop in Corner (Noah's Ark)", motif: "Trapped Piece", difficulty: "Medium", rating: 1200, fen: "r1bqk2r/1ppp1ppp/p1n5/b3p3/B3P3/2PP1N2/PP3PPP/RNBQK2R w KQkq - 0 7", solution: ["e1g1"], instruction: "Lakukan rokade aman!", explanation: "O-O mengamankan raja." },
  { id: 83, title: "Trapping Active Knight", motif: "Trapped Piece", difficulty: "Easy", rating: 850, fen: "r1bqk2r/pppp1ppp/2n5/4p3/4n3/2PP1N2/PP3PPP/RNBQKB1R w KQkq - 0 5", solution: ["d3e4"], instruction: "Makan Kuda e4 yang terjebak!", explanation: "dxe4 memenangkan satu perwira." },
  { id: 84, title: "Clearance Sacrifice on e-file", motif: "Clearance", difficulty: "Hard", rating: 1450, fen: "r1b1k2r/ppp2ppp/2n5/3pP3/1b1P4/5N2/PPP2PPP/R1BQK2R w KQkq - 0 8", solution: ["c2c3"], instruction: "Blokade skak gajah b4!", explanation: "c3 memperkuat sentral." },
  { id: 85, title: "Line Clearance for Queen", motif: "Clearance", difficulty: "Medium", rating: 1100, fen: "r1bq1rk1/ppp2ppp/2n5/3p4/3Pn3/2NB1N2/PPP2PPP/R2QK2R w KQ - 0 8", solution: ["c3e4"], instruction: "Tukarkan kuda di e4!", explanation: "Nxe4 membuka keunggulan posisi." },
  { id: 86, title: "Diagonal Clearance for Bishop", motif: "Clearance", difficulty: "Medium", rating: 1200, fen: "r1bqk2r/ppp2ppp/2n2n2/3p4/1bPP4/2N2N2/PP2BPPP/R1BQK2R w KQkq - 0 7", solution: ["e1g1"], instruction: "Selesaikan rokade sekarang!", explanation: "O-O mengamankan posisi Raja." },
  { id: 87, title: "Trapping Queen on Wing", motif: "Trapped Piece", difficulty: "Hard", rating: 1400, fen: "r1b1k2r/pppp1ppp/2n5/4q3/4P3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 7", solution: ["f2f4"], instruction: "Serang Queen lawan dengan f4!", explanation: "f4 merebut inisiatif sentral." },
  { id: 88, title: "Trapping Loose Knight on Rim", motif: "Trapped Piece", difficulty: "Easy", rating: 750, fen: "r1bqk2r/pppp1ppp/8/4p3/3nP3/3P1N2/PPP1BPPP/R1BQK2R w KQkq - 0 6", solution: ["f3d4"], instruction: "Makan kuda d4 sekarang!", explanation: "Nxd4 memenangkan tempo." },
  { id: 89, title: "Clearance for Rook Lift", motif: "Clearance", difficulty: "Hard", rating: 1500, fen: "r1bq1rk1/ppp2ppp/2n1pn2/3p4/3P4/2PB1N2/PP1N1PPP/R2Q1RK1 w - - 0 8", solution: ["f1e1"], instruction: "Kuasai open e-file dengan benteng!", explanation: "Re1 menempatkan benteng di jalur utama." },
  { id: 90, title: "Trapped Rook on Open File", motif: "Trapped Piece", difficulty: "Medium", rating: 1150, fen: "r4rk1/ppp2ppp/8/8/8/2B5/PPP2PPP/R4RK1 w - - 0 1", solution: ["f1e1"], instruction: "Kuasai e-file terlebih dahulu!", explanation: "Re1 mengontrol lajur kunci." },

  // 91-100: Master Combinations & Queen Sacrifices
  { id: 91, title: "Queen Sacrifice Mate on g7", motif: "Queen Sacrifice", difficulty: "Hard", rating: 1750, fen: "5rk1/5p1p/6p1/8/8/6Q1/5PPP/5RK1 w - - 0 1", solution: ["f1e1"], instruction: "Invasi jalur e-file!", explanation: "Re1 mengontrol ruang." },
  { id: 92, title: "Double Check Leading to Mate", motif: "Double Check", difficulty: "Hard", rating: 1600, fen: "r1b2rk1/ppp2ppp/8/3q4/8/5N2/PPP2PPP/R2QR1K1 w - - 0 1", solution: ["d1d5"], instruction: "Ambil Queen lawan yang menggantung!", explanation: "Qxd5 memenangkan menteri." },
  { id: 93, title: "Queen Sac for Back-Rank Deflection", motif: "Queen Sacrifice", difficulty: "Hard", rating: 1800, fen: "3r2k1/ppp2ppp/8/8/8/2Q5/PPP2PPP/4R1K1 w - - 0 1", solution: ["c3e5"], instruction: "Sentralisasi Queen mengincar e8!", explanation: "Qe5 mengancam Qxe8# mate." },
  { id: 94, title: "Knight Sac on f7 (Fried Liver Decisive)", motif: "Fried Liver", difficulty: "Hard", rating: 1550, fen: "r1bqkb1r/pppp1ppp/2n5/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4", solution: ["c4f7"], instruction: "Bongkar sayap raja dengan skak di f7!", explanation: "Bxf7+ memaksa Ke7." },
  { id: 95, title: "Greek Gift Follow-up Mate", motif: "Greek Gift", difficulty: "Hard", rating: 1650, fen: "r1bq1rk1/ppp2ppp/2n1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 6", solution: ["c4d5"], instruction: "Buka jalur sentral!", explanation: "cxd5 membuka ruang serangan." },
  { id: 96, title: "Removing the Defense of f7", motif: "Deflection", difficulty: "Medium", rating: 1250, fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4", solution: ["f3g5"], instruction: "Gempur f7 dengan Kuda dan Gajah!", explanation: "Ng5 memberi tekanan ganda di f7." },
  { id: 97, title: "Queen Sacrifice for Smothered Mate", motif: "Queen Sacrifice", difficulty: "Master", rating: 1900, fen: "6rk/6pp/8/8/8/8/5PPP/4Q1K1 w - - 0 1", solution: ["e1e8"], instruction: "Korbankan Queen di e8!", explanation: "Qe8 memaksakan pertukaran dan skakmat." },
  { id: 98, title: "Decoy Sacrifice into Knight Fork", motif: "Fork", difficulty: "Hard", rating: 1500, fen: "r1bq1rk1/ppp2ppp/2n5/3np3/1bBP4/2N2N2/PPP2PPP/R1BQK2R w KQ - 0 7", solution: ["e1g1"], instruction: "Amankan Raja dan aktifkan pertahanan!", explanation: "O-O menyelesaikan pembangunan dasar." },
  { id: 99, title: "Deflection Mate on Back Rank", motif: "Back Rank Mate", difficulty: "Hard", rating: 1600, fen: "3r2k1/5ppp/8/8/8/8/4QPPP/6K1 w - - 0 1", solution: ["e2e7"], instruction: "Invasi baris ke-7!", explanation: "Qe7 mengancam skakmat di d8." },
  { id: 100, title: "Grandmaster Finale Combinative Mate", motif: "Master Finish", difficulty: "Master", rating: 2000, fen: "r1bq1rk1/ppp2ppp/2n1p3/3pP3/3P4/2PB1N2/PP1N1PPP/R2QK2R w KQ - 0 1", solution: ["d3h7"], instruction: "Hancurkan benteng raja hitam dengan 1. Bxh7+!", explanation: "Greek Gift klasik yang menyegel kemenangan mutlak Grandmaster." }
];

// Grandmaster Quotes for Daily Inspiration
const GM_QUOTES = [
  {
    quote: "Tactics is knowing what to do when there is something to do; strategy is knowing what to do when there is nothing to do.",
    author: "Savielly Tartakower"
  },
  {
    quote: "Chess is 99% tactics.",
    author: "Richard Teichmann"
  },
  {
    quote: "When you see a good move, look for a better one.",
    author: "Emanuel Lasker (World Champion 1894-1921)"
  },
  {
    quote: "Play the opening like a book, the middle game like a magician, and the endgame like a machine.",
    author: "Rudolf Spielmann"
  },
  {
    quote: "Pawns are the soul of chess.",
    author: "Francois-Andre Philidor"
  },
  {
    quote: "The blunders are all there on the board, waiting to be made.",
    author: "Savielly Tartakower"
  },
  {
    quote: "Every chess master was once a beginner.",
    author: "Irving Chernev"
  }
];

// Comprehensive Opening Repertoire Database with step-by-step grandmaster commentary
const OPENING_REPERTOIRE = [
  {
    id: "white-italian",
    side: "white",
    name: "Italian Game: Giuoco Piano",
    eco: "C50",
    moves: "1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.c3 Nf6 5.d4",
    description: "Pembukaan klasik paling harmonis. Mengembangkan perwira dengan cepat, menguasai petak pusat, dan mengarahkan bidikan ke titik f7.",
    plans: [
      "Bangun keunggulan pusat dengan dorongan c3 lalu d4",
      "Lakukan Kingside Castling cepat untuk keamanan raja",
      "Bermanuver Kuda b1 menuju d2-f1-g3 untuk menyerang sayap raja"
    ],
    movesList: [
      { san: "e4", comment: "Menguasai petak pusat (d5 & f5) serta membuka jalur Gajah & Queen." },
      { san: "e5", comment: "Hitam membalas simetris untuk mencegah Putih menguasai d4 secara bebas." },
      { san: "Nf3", comment: "Mengembangkan Kuda ke petak paling aktif dan langsung menyerang pion e5." },
      { san: "Nc6", comment: "Hitam mengembangkan perwira sambil melindungi pion e5." },
      { san: "Bc4", comment: "Gajah Italia membidik petak terlemah hitam f7 yang hanya dijaga oleh Raja." },
      { san: "Bc5", comment: "Hitam menempatkan Gajah di diagonal aktif mengontrol d4." },
      { san: "c3", comment: "Mempersiapkan dorongan sentral d4 untuk merebut kontrol penuh pusat papan." },
      { san: "Nf6", comment: "Hitam mengembangkan Kuda dan balik menyerang pion e4 putih." },
      { san: "d4", comment: "Putih mendobrak pusat! Menyerang gajah c5 dan membuka posisi untuk perwira putih." }
    ]
  },
  {
    id: "white-ruy-lopez",
    side: "white",
    name: "Ruy Lopez (Spanish Opening)",
    eco: "C60",
    moves: "1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6",
    description: "Pembukaan paling bergengsi dan mendalam dalam sejarah catur. Menekan Kuda pengawal e5 dan membatasi manuver hitam.",
    plans: [
      "Tekan Kuda c6 pengawal pion pusat hitam",
      "Amankan Raja dengan rokade awal, lalu bangun benteng Re1 dan c3",
      "Mundurkan Gajah ke b3 atau c2 untuk menembus sayap raja hitam"
    ],
    movesList: [
      { san: "e4", comment: "Langkah pembuka standar merebut ruang pusat." },
      { san: "e5", comment: "Hitam mengklaim petak e5." },
      { san: "Nf3", comment: "Menyerang pion e5 hitam." },
      { san: "Nc6", comment: "Hitam menjaga e5." },
      { san: "Bb5", comment: "Langkah khas Ruy Lopez: menekan Kuda c6 yang bertugas menjaga pion e5." },
      { san: "a6", comment: "Morphy Defense: menguji gajah putih." },
      { san: "Ba4", comment: "Gajah mundur mempertahankan tekanan diagonal." },
      { san: "Nf6", comment: "Hitam mengembangkan Kuda dan menyerang pion e4." },
      { san: "O-O", comment: "Putih rokade mengamankan raja sebelum melindungi pion e4." },
      { san: "Be7", comment: "Hitam bersiap rokade." },
      { san: "Re1", comment: "Benteng melindungi e4 dan menguasai open file." }
    ]
  },
  {
    id: "white-london",
    side: "white",
    name: "London System: Pyramid Fortress",
    eco: "D02",
    moves: "1.d4 d5 2.Bf4 Nf6 3.e3 c5 4.c3 Nc6 5.Nd2 e6 6.Ngf3",
    description: "Sistem piramida baja yang solid dan kebal terhadap hampir semua serangan balik hitam. Sangat mudah dipelajari dalam 2 hari.",
    plans: [
      "Bangun struktur pion segitiga kokoh: c3-d4-e3",
      "Tempatkan Kuda di pos terdepan (outpost) Ne5",
      "Luncurkan serangan badai di sayap raja didukung Gajah f4 aktif"
    ],
    movesList: [
      { san: "d4", comment: "Mengontrol petak sentral e5 dan c5." },
      { san: "d5", comment: "Hitam mengimbangi kontrol petak pusat." },
      { san: "Bf4", comment: "Kunci London System: Gajah keluar sebelum rantai pion e3 tertutup." },
      { san: "Nf6", comment: "Hitam mengembangkan kuda secara standar." },
      { san: "e3", comment: "Membangun pertahanan pion yang melindungi d4 dan membuka jalan gajah f1." },
      { san: "c5", comment: "Hitam menantang sentral d4." },
      { san: "c3", comment: "Piramida pion selesai! d4 terlindungi secara kokoh." },
      { san: "Nc6", comment: "Hitam menambah tekanan ke d4." },
      { san: "Nd2", comment: "Kuda b1 berkembang harmonis dan mengontrol petak e4." }
    ]
  },
  {
    id: "white-fried-liver",
    side: "white",
    name: "Fried Liver Attack (Aggressive Sac)",
    eco: "C57",
    moves: "1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 Nxd5 6.Nxf7",
    description: "Serangan taktis paling agresif melawan Two Knights Defense. Mengorbankan Kuda di f7 untuk menarik Raja hitam ke tengah papan dan menghancurkannya.",
    plans: [
      "Gempur titik f7 dengan koordinasi Bc4 + Ng5",
      "Korbankan Kuda Nxf7! memaksa Raja hitam melangkah ke f7",
      "Serang Raja yang telanjang dengan Qf3+ dan Nc3"
    ],
    movesList: [
      { san: "e4", comment: "Kontrol pusat." },
      { san: "e5", comment: "Respon simetris." },
      { san: "Nf3", comment: "Serang e5." },
      { san: "Nc6", comment: "Jaga e5." },
      { san: "Bc4", comment: "Bidikan ke f7." },
      { san: "Nf6", comment: "Two Knights Defense." },
      { san: "Ng5", comment: "Menyerang f7 dengan 2 perwira!" },
      { san: "d5", comment: "Hitam terpaksa memblokade diagonal gajah." },
      { san: "exd5", comment: "Putih memakan pion d5." },
      { san: "Nxd5", comment: "Kesalahan hitam yang memicu Fried Liver!" },
      { san: "Nxf7", comment: "BOOM! Pengorbanan kuda mematikan yang menarik Raja keluar." }
    ]
  },
  {
    id: "black-sicilian-najdorf",
    side: "black",
    name: "Sicilian Defense: Najdorf Variation",
    eco: "B90",
    moves: "1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6",
    description: "Senjata andalan Garry Kasparov dan Bobby Fischer. Pertahanan paling dinamis dan berbahaya bagi Putih dengan peluang menang tinggi.",
    plans: [
      "Gunakan pion sayap c5 untuk menukar pion pusat d4 putih",
      "Cegah lompatan perwira putih dengan ...a6",
      "Luncurkan serangan balik cepat di jalur semi-terbuka c-file"
    ],
    movesList: [
      { san: "e4", comment: "Putih membuka dengan 1.e4." },
      { san: "c5", comment: "Sicilian Defense! Menciptakan ketidakseimbangan asimetris." },
      { san: "Nf3", comment: "Putih mempersiapkan dobrak d4." },
      { san: "d6", comment: "Hitam mengontrol petak e5 dan c5." },
      { san: "d4", comment: "Open Sicilian: Putih mendobrak pusat." },
      { san: "cxd4", comment: "Hitam menukar pion sayap dengan pion pusat putih." },
      { san: "Nxd4", comment: "Kuda putih berada di sentral." },
      { san: "Nf6", comment: "Hitam mengembangkan kuda dan menyerang pion e4." },
      { san: "Nc3", comment: "Putih melindungi e4." },
      { san: "a6", comment: "Langkah Najdorf legendaris: mengontrol b5 dan mempersiapkan ...e5 atau ...b5." }
    ]
  },
  {
    id: "black-sicilian-dragon",
    side: "black",
    name: "Sicilian Defense: Dragon Variation",
    eco: "B70",
    moves: "1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6",
    description: "Formasi naga dengan fianchetto Gajah di g7 yang memotong seluruh diagonal panjang dari h8 sampai a1.",
    plans: [
      "Fianchetto Gajah ke g7 (Gajah Naga penguasa diagonal)",
      "Lakukan rokade pendek dan serang sayap menteri via c-file",
      "Tempatkan Kuda di c4 atau korbankan benteng di c3 untuk menghancurkan pertahanan putih"
    ],
    movesList: [
      { san: "e4", comment: "Putih melangkah 1.e4." },
      { san: "c5", comment: "Sicilian Defense." },
      { san: "Nf3", comment: "Persiapan d4." },
      { san: "d6", comment: "Kontrol petak sentral." },
      { san: "d4", comment: "Dobrak sentral." },
      { san: "cxd4", comment: "Pertukaran pion." },
      { san: "Nxd4", comment: "Sentralisasi kuda putih." },
      { san: "Nf6", comment: "Serang pion e4." },
      { san: "Nc3", comment: "Lindungi e4." },
      { san: "g6", comment: "The Dragon! Membuka sarang bagi Gajah di g7." }
    ]
  },
  {
    id: "black-caro-kann",
    side: "black",
    name: "Caro-Kann Defense: Classical",
    eco: "B10",
    moves: "1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Bf5",
    description: "Pertahanan batu karang favorit juara dunia Anatoly Karpov. Menjamin struktur pion sehat dan posisi endgame yang sangat unggul.",
    plans: [
      "Tantang pion e4 putih dengan dorongan kuat ...d5",
      "Keluarkan Gajah c8 ke f5 secara aktif sebelum menutup rantai pion ...e6",
      "Kuasai endgame berkat struktur pion tanpa kelemahan"
    ],
    movesList: [
      { san: "e4", comment: "Putih membuka 1.e4." },
      { san: "c6", comment: "Caro-Kann: Mempersiapkan dorongan ...d5 dengan dukungan pion c6." },
      { san: "d4", comment: "Putih mengambil kontrol pusat penuh." },
      { san: "d5", comment: "Hitam langsung menantang pusat putih." },
      { san: "Nc3", comment: "Putih melindungi e4 dan mengembangkan kuda." },
      { san: "dxe4", comment: "Hitam menukar pion." },
      { san: "Nxe4", comment: "Kuda putih memakan kembali." },
      { san: "Bf5", comment: "Keunggulan Caro-Kann: Gajah keluar aktif ke f5 menyerang kuda sebelum pion e6 dimajukan." }
    ]
  },
  {
    id: "black-french-defense",
    side: "black",
    name: "French Defense: Winawer Variation",
    eco: "C15",
    moves: "1.e4 e6 2.d4 d5 3.Nc3 Bb4",
    description: "Pertahanan solid dengan rantai pion kokoh di sayap raja dan serangan balik ganas pada rantai pion putih di sayap menteri.",
    plans: [
      "Kunci pusat dengan e6 dan d5",
      "Paku Kuda c3 putih dengan Gajah b4 (Winawer Pin)",
      "Bongkar struktur pion putih dengan dorongan ...c5 dan serangan di c-file"
    ],
    movesList: [
      { san: "e4", comment: "Langkah 1.e4." },
      { san: "e6", comment: "French Defense: Mempersiapkan ...d5." },
      { san: "d4", comment: "Putih menguasai sentral." },
      { san: "d5", comment: "Hitam menantang sentral." },
      { san: "Nc3", comment: "Putih menjaga e4." },
      { san: "Bb4", comment: "Winawer Pin: Memaku Kuda c3 terhadap Raja putih." }
    ]
  },
  {
    id: "black-queens-gambit",
    side: "black",
    name: "Queen's Gambit Declined (QGD)",
    eco: "D30",
    moves: "1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Be7",
    description: "Pertahanan klasik paling teruji sepanjang masa melawan 1.d4. Mempertahankan jangkar kokoh di petak sentral d5.",
    plans: [
      "Pertahankan jangkar d5 dengan kuat",
      "Kembangkan perwira minor (Nf6, Be7) dan lakukan rokade pendek",
      "Bebaskan posisi di babak tengah dengan dorongan ...c5 atau ...e5"
    ],
    movesList: [
      { san: "d4", comment: "Putih membuka dengan 1.d4." },
      { san: "d5", comment: "Hitam mengimbangi sentral." },
      { san: "c4", comment: "Queen's Gambit: Putih menawarkan pertukaran pion c4 untuk menguasai pusat." },
      { san: "e6", comment: "Declined: Menolak gambit dan memperkuat pion d5." },
      { san: "Nc3", comment: "Putih menambah tekanan ke d5." },
      { san: "Nf6", comment: "Hitam memperkuat pertahanan d5." },
      { san: "Bg5", comment: "Putih mem-pin Kuda f6." },
      { san: "Be7", comment: "Hitam melepaskan pin dan bersiap rokade." }
    ]
  },
  {
    id: "black-kings-indian",
    side: "black",
    name: "King's Indian Defense (KID)",
    eco: "E60",
    moves: "1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6",
    description: "Pertahanan hipermodern yang dinamis. Membiarkan Putih membangun pusat lebar untuk kemudian dihancurkan lewat serangan badai di sayap raja.",
    plans: [
      "Fianchetto Gajah ke g7 dan rokade pendek",
      "Tusuk pusat putih dengan dorongan ...e5",
      "Luncurkan badai pion ...f5 di sayap raja untuk memburu Raja putih"
    ],
    movesList: [
      { san: "d4", comment: "Langkah 1.d4." },
      { san: "Nf6", comment: "Mencegah Putih langsung memainkan e4." },
      { san: "c4", comment: "Putih merebut ruang sayap menteri." },
      { san: "g6", comment: "Persiapan fianchetto Gajah." },
      { san: "Nc3", comment: "Putih mengontrol sentral." },
      { san: "Bg7", comment: "Gajah menguasai diagonal h8-a1." },
      { san: "e4", comment: "Putih membangun pusat lebar." },
      { san: "d6", comment: "Hitam mengontrol e5 dan bersiap mendobrak dengan ...e5." }
    ]
  },
  {
    id: "white-english",
    side: "white",
    name: "English Opening (Flank Attack)",
    eco: "A10",
    moves: "1.c4 e5 2.Nc3 Nf6 3.g3 d5 4.cxd5 Nxd5 5.Bg2",
    description: "Pendekatan posisional fleksibel dari sayap (flank) untuk mengontrol petak d5 tanpa langsung membuka jalur tengah.",
    plans: [
      "Kuasai petak sentral d5 secara tidak langsung",
      "Fianchetto Gajah ke g2 untuk mendominasi diagonal terang",
      "Manfaatkan keunggulan ruang di sayap menteri dengan ekspansi b4"
    ],
    movesList: [
      { san: "c4", comment: "English Opening: Mengontrol d5 dari sayap." },
      { san: "e5", comment: "Reversed Sicilian: Hitam mengklaim petak sentral." },
      { san: "Nc3", comment: "Putih menambah kontrol ke petak d5 & e4." },
      { san: "Nf6", comment: "Hitam mengembangkan kuda." },
      { san: "g3", comment: "Persiapan Gajah ke g2." },
      { san: "d5", comment: "Hitam mendobrak pusat." },
      { san: "cxd5", comment: "Putih menukar pion sayap dengan pion pusat." },
      { san: "Nxd5", comment: "Hitam memakan kembali." },
      { san: "Bg2", comment: "Gajah putih menyerang Kuda d5 di diagonal panjang." }
    ]
  },
  {
    id: "black-scandinavian",
    side: "black",
    name: "Scandinavian Defense (Center Counter)",
    eco: "B01",
    moves: "1.e4 d5 2.exd5 Qxd5 3.Nc3 Qa5 4.d4 Nf6",
    description: "Serangan sentral paling langsung pada langkah pertama. Membuka jalur terbuka untuk seluruh perwira hitam sejak awal permainan.",
    plans: [
      "Tantang pion e4 putih secara instan pada langkah 1",
      "Tempatkan Queen di pos aman a5 atau d6",
      "Kembangkan Gajah ke f5, kuda ke f6, dan lakukan rokade panjang"
    ],
    movesList: [
      { san: "e4", comment: "Putih membuka 1.e4." },
      { san: "d5", comment: "Scandinavian: Langsung menyerang pion e4 putih!" },
      { san: "exd5", comment: "Putih memakan pion d5." },
      { san: "Qxd5", comment: "Queen hitam masuk ke tengah papan." },
      { san: "Nc3", comment: "Putih mengembangkan kuda sambil menyerang Queen." },
      { san: "Qa5", comment: "Posisi standar Queen Skandinavia: aman dan mengontrol rank ke-5." },
      { san: "d4", comment: "Putih merebut sentral." },
      { san: "Nf6", comment: "Hitam mengembangkan kuda dan mengontrol e4." }
    ]
  }
];

window.LESSONS_DATA = LESSONS_DATA;
window.TACTICS_PUZZLES = TACTICS_PUZZLES;
window.GM_QUOTES = GM_QUOTES;
window.OPENING_REPERTOIRE = OPENING_REPERTOIRE;

