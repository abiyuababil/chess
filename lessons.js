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

// Tactical Puzzles Database for Tactics Lab
const TACTICS_PUZZLES = [
  {
    id: "p1",
    title: "Royal Knight Fork",
    motif: "Fork",
    difficulty: "Easy",
    rating: 600,
    fen: "r1b1k2r/ppp2ppp/8/3N4/8/8/PPP2PPP/R3K2R w KQkq - 0 1",
    solution: ["d5c7", "e8e7", "c7a8"],
    instruction: "Putih melangkah dan memenangkan benteng!",
    explanation: "Knight melompat ke c7 memberi skak kepada Raja dan menyerang Benteng di a8 secara bersamaan."
  },
  {
    id: "p2",
    title: "Absolute Pin on Queen",
    motif: "Pin",
    difficulty: "Easy",
    rating: 700,
    fen: "r3k2r/ppp1qppp/8/8/8/4B3/PPP2PPP/R3K2R w KQkq - 0 1",
    solution: ["e1g1"],
    instruction: "Mainkan langkah terbaik mengamankan raja dan memanfaatkan pin!",
    explanation: "Memanfaatkan posisi pin untuk mengkonsolidasi keunggulan."
  },
  {
    id: "p3",
    title: "Classic Back-Rank Checkmate",
    motif: "Back-Rank",
    difficulty: "Easy",
    rating: 800,
    fen: "3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
    solution: ["d1d8"],
    instruction: "Putih melangkah dan langsung skakmat!",
    explanation: "Benteng meluncur ke d8. Raja hitam terperangkap di belakang pionnya sendiri."
  },
  {
    id: "p4",
    title: "Smothered Mate in Corner",
    motif: "Smothered",
    difficulty: "Medium",
    rating: 1100,
    fen: "6rk/5Npp/8/8/8/8/8/7K w - - 0 1",
    solution: ["f7h6"],
    instruction: "Kuda putih melompat menciptakan ancaman mati lemas!",
    explanation: "Kuda menyerang Raja yang terkepung rapat oleh pasukannya sendiri."
  },
  {
    id: "p5",
    title: "Queen & Bishop Battery",
    motif: "Battery",
    difficulty: "Medium",
    rating: 1150,
    fen: "r4rk1/pp1b1ppp/1qn1p3/3pP3/3P4/bP1B1N2/P2B1PPP/R2Q1RK1 w - - 0 1",
    solution: ["d3h7", "g8h7", "f3g5"],
    instruction: "Greek Gift Sacrifice! Korbankan Bishop di h7 untuk serangan telak!",
    explanation: "Pengorbanan gajah klasik di h7 membuka pertahanan raja hitam untuk serangan Kuda dan Queen."
  },
  {
    id: "p6",
    title: "Discovered Attack on the Queen",
    motif: "Discovered Attack",
    difficulty: "Medium",
    rating: 1200,
    fen: "r1bqk2r/pp1p1ppp/2n5/3pP3/3P4/3B1N2/PP1N1PPP/R2QK2R w KQkq - 0 1",
    solution: ["d3b5"],
    instruction: "Langkahkan gajah membuka jalur serangan tersembunyi!",
    explanation: "Langkah bidak membuka ancaman dari bidak di belakangnya."
  },
  {
    id: "p7",
    title: "Pawn Promotion Breakthrough",
    motif: "Endgame",
    difficulty: "Medium",
    rating: 1300,
    fen: "8/5p2/4P3/8/8/4k3/8/4K3 w - - 0 1",
    solution: ["e6f7"],
    instruction: "Makan pion f7 dan pastikan promosi menjadi Queen!",
    explanation: "Pion berhasil menerobos dan tidak bisa dihentikan untuk promosi."
  },
  {
    id: "p8",
    title: "Skewer on Queen and Rook",
    motif: "Skewer",
    difficulty: "Easy",
    rating: 750,
    fen: "4r1k1/ppp2ppp/8/8/8/2B5/PPP2PPP/4Q1K1 w - - 0 1",
    solution: ["e1e8"],
    instruction: "Putih melangkah dan memanfaatkan jalur terbuka!",
    explanation: "Queen menyapu benteng di baris belakang."
  }
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

// Opening Repertoire Data
const OPENING_REPERTOIRE = [
  {
    id: "white-italian",
    side: "white",
    name: "Italian Game (Giuoco Piano)",
    eco: "C50",
    moves: "1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5",
    description: "Pembukaan klasik paling direkomendasikan untuk pemula hingga master. Mengembangkan bidak secara harmonis dan membidik titik f7.",
    plans: [
      "Kuasai pusat dengan c3 dan d4",
      "Lakukan Kingside castling cepat",
      "Bawa Knight b1 ke d2 lalu ke f1 dan g3"
    ],
    status: "mastered"
  },
  {
    id: "white-london",
    side: "white",
    name: "London System",
    eco: "D02",
    moves: "1.d4 d5 2.Bf4 Nf6 3.e3 c5 4.c3",
    description: "Sistem solid seperti benteng piramida. Sangat aman dan bisa dimainkan melawan hampir semua respons hitam.",
    plans: [
      "Bangun segitiga pion c3-d4-e3",
      "Tempatkan Kuda di outpost Ne5",
      "Serang sayap raja lawan dengan bantuan Bishop f4"
    ],
    status: "learning"
  },
  {
    id: "black-caro-kann",
    side: "black",
    name: "Caro-Kann Defense",
    eco: "B10",
    moves: "1.e4 c6 2.d4 d5",
    description: "Pertahanan favorit Grandmaster. Sangat solid, struktur pion sehat, dan Bishop petak terang bebas berkembang.",
    plans: [
      "Tantang pion e4 putih dengan d5",
      "Keluarkan Bishop c8 ke f5 atau g4 sebelum menutup e6",
      "Manfaatkan endgame yang menguntungkan karena struktur pion solid"
    ],
    status: "learning"
  },
  {
    id: "black-qgd",
    side: "black",
    name: "Queen's Gambit Declined",
    eco: "D30",
    moves: "1.d4 d5 2.c4 e6",
    description: "Pertahanan klasik terhadap 1.d4. Mempertahankan pijakan kuat di petak pusat d5.",
    plans: [
      "Pertahankan titik sentral d5 dengan kokoh",
      "Kembangkan Be7, Nf6, dan rokade pendek",
      "Bebaskan posisi dengan dorongan c5 atau e5 nanti"
    ],
    status: "learning"
  }
];

window.LESSONS_DATA = LESSONS_DATA;
window.TACTICS_PUZZLES = TACTICS_PUZZLES;
window.GM_QUOTES = GM_QUOTES;
window.OPENING_REPERTOIRE = OPENING_REPERTOIRE;
