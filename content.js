/* ===========================================================
   Cashlo AI Academy — curriculum
   Aligned with carmelio-hq/LEARNING-AI.md and the riset:
   "Self-Improving Cash-Flow Forecaster for Cashlo"
   Every concept is taught through the coffee shop.
   =========================================================== */

const CURRICULUM = [
  /* ============ LEVEL 0 — PAKAI AI (Bahasa, entry track — built from Indonesia user research) ============ */
  {
    id: "pakai-ai",
    title: "Pakai AI — Mulai di Sini",
    subtitle: "Cara praktis pakai AI buat belajar & kerja (Bahasa Indonesia)",
    color: "#2f7280",
    emoji: "💬",
    chapters: [
      {
        id: "p1", emoji: "🚀",
        title: "Bab 1 — Mulai Pakai AI",
        summary: "Apa yang AI bisa & nggak bisa, dan cara nyuruh yang bener.",
        lessons: [
          {
            id: "p1-l1", title: "AI itu jago apa, lemah apa?", minutes: 5,
            blocks: [
              { type: "text", html: "<p>AI kayak ChatGPT, Claude, atau Gemini itu <b>jago</b>: meringkas bacaan, menjelaskan konsep susah, brainstorm ide, memperbaiki tulisan, latihan bahasa.</p><p>Tapi <b>lemah</b> di: fakta terbaru/akurat (bisa ngarang!), hitungan rumit, dan apa pun yang butuh data pribadi atau real-time toko kamu.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 Cara mikirnya</span>Anggap AI = asisten pintar yang kadang <i>sok tahu</i>. Hebat buat draft & ide — tapi keputusan & cek fakta tetap di tangan kamu." },
              { type: "quiz", q: "Tugas mana yang paling cocok dikasih ke AI?", options: ["Kasih tahu angka penjualan tokomu hari ini", "Meringkas & menjelaskan bab kuliah", "Mutusin keputusan besar hidupmu", "Menjamin fakta 100% benar"], answer: 1, explain: "AI hebat buat menjelaskan & meringkas. Dia nggak tahu data real-time tokomu, dan jangan dijadikan penjamin fakta atau pengambil keputusan." }
            ]
          },
          {
            id: "p1-l2", title: "Prompt pertama yang bagus", minutes: 6,
            blocks: [
              { type: "text", html: "<p><b>Prompt</b> = perintah yang kamu kasih ke AI. Hasil jelek biasanya karena prompt-nya jelek.</p><p>Prompt jelek: <code>buatin tugas</code>. Prompt bagus kasih <b>konteks + tujuan + format</b>:</p><span class='formula'>Aku mahasiswa Informatika sem 5. Jelaskan 'overfitting' pakai analogi sederhana, maks 5 kalimat, Bahasa Indonesia.</span>" },
              { type: "callout", variant: "tip", html: "<span class='lab'>⚙️ Rumus cepat</span>[Kamu siapa] + [maunya apa] + [format/batasan]. Makin jelas promptnya, makin pas jawabannya." },
              { type: "quiz", q: "Mana prompt yang bakal kasih hasil paling bagus?", options: ["jelasin database", "Jelaskan konsep database relasional buat pemula, pakai analogi lemari arsip, maks 4 poin", "tolong bantu tugasku", "database itu apa sih"], answer: 1, explain: "Yang menang kasih konteks (pemula), format (4 poin), dan cara (analogi). Spesifik = jawaban jauh lebih berguna." }
            ]
          },
          {
            id: "p1-l3", title: "3 cara langsung kepake hari ini", minutes: 6,
            blocks: [
              { type: "text", html: "<p><b>1. Belajar:</b> minta AI jelasin konsep susah pakai analogi, terus suruh dia <i>kasih kuis</i> ke kamu.<br><b>2. Tugas (etis):</b> minta <i>outline</i> atau <i>feedback</i> — bukan jawaban jadi buat di-copy.<br><b>3. Komunikasi:</b> minta AI perbaiki pesan ke dosen biar sopan, jelas, dan rapi.</p>" },
              { type: "callout", variant: "story", html: "<span class='lab'>📊 Kamu nggak sendirian</span>Menurut data OpenAI, cara #1 mahasiswa Indonesia pakai ChatGPT adalah <b>belajar</b> — persis 3 hal di atas." },
              { type: "quiz", q: "Cara pakai AI yang sehat buat tugas kuliah?", options: ["Suruh AI kerjain semua, langsung submit", "Minta AI bikin outline & kasih feedback, kamu yang nulis", "Copy-paste tanpa dibaca", "Pakai diam-diam biar nggak ketahuan"], answer: 1, explain: "AI buat bantu mikir (outline, feedback), bukan ganti mikir. Itu yang bikin kamu makin pinter, bukan makin malas." }
            ]
          }
        ]
      },
      {
        id: "p2", emoji: "🎯",
        title: "Bab 2 — Jago Prompt & Tetap Aman",
        summary: "Kasih konteks, ngobrol bolak-balik, dan jangan ketipu jawaban AI.",
        lessons: [
          {
            id: "p2-l1", title: "Bikin AI ngerti maksudmu", minutes: 6,
            blocks: [
              { type: "text", html: "<p>Dua trik yang bikin jawaban AI naik kelas:</p><p><b>Kasih peran:</b> 'Jadilah tutor yang sabar buat pemula.'<br><b>Kasih contoh:</b> tunjukin 1–2 contoh format yang kamu mau, biar AI niru gayanya.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 Peran + contoh</span>Ngasih AI sebuah peran dan satu contoh = jawaban yang jauh lebih nyambung sama kebutuhanmu." },
              { type: "quiz", q: "Kenapa ngasih contoh ke AI itu ngebantu?", options: ["Biar promptnya panjang", "Biar AI niru format & gaya yang kamu mau", "Nggak ngaruh", "Biar AI bingung"], answer: 1, explain: "Contoh (few-shot) ngasih AI pola yang harus diikuti — hasilnya jadi konsisten sama yang kamu bayangin." }
            ]
          },
          {
            id: "p2-l2", title: "Ngobrol, bukan sekali tembak", minutes: 5,
            blocks: [
              { type: "text", html: "<p>Jawaban pertama jarang langsung sempurna — dan itu wajar. Lanjutin aja: <code>terlalu panjang, ringkas dong</code>, <code>kasih contoh konteks Indonesia</code>, <code>ubah jadi tabel</code>. AI inget obrolan sebelumnya.</p>" },
              { type: "callout", variant: "tip", html: "<span class='lab'>⚙️ Iterasi</span>Anggap kayak ngobrol sama asisten: kasih koreksi bertahap. 2–3 kali bolak-balik biasanya ngalahin satu prompt panjang." },
              { type: "quiz", q: "Jawaban AI kepanjangan dan kurang pas. Langkah terbaik?", options: ["Nyerah, tulis sendiri dari nol", "Bales: 'ringkas jadi 3 poin, fokus ke X'", "Kirim ulang prompt yang sama persis", "Ganti aplikasi"], answer: 1, explain: "Iterasi. AI inget konteks — tinggal arahin: lebih pendek, lebih fokus, format beda. Itu skill prompt yang sebenarnya." }
            ]
          },
          {
            id: "p2-l3", title: "Jangan ketipu AI", minutes: 6,
            blocks: [
              { type: "text", html: "<p>Ini pelajaran terpenting. AI bisa <b>ngarang dengan pede</b> — namanya <b>halusinasi</b>. Dia bisa bikin kutipan, sumber, angka, atau fakta yang <i>kelihatan</i> meyakinkan padahal salah/palsu.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 Aturan emas</span>AI buat <b>DRAFT & IDE</b>. Otak kamu buat <b>KEPUTUSAN & VERIFIKASI</b>. Hal penting (angka, sumber, hukum, medis) selalu cek ke sumber asli. Jangan matiin nalar kritismu." },
              { type: "callout", variant: "story", html: "<span class='lab'>📊 Kenapa ini penting</span>Riset pendidikan di Indonesia: kekhawatiran #1 soal AI = ketergantungan & turunnya berpikir kritis. Lesson ini obatnya." },
              { type: "quiz", q: "AI ngasih kutipan jurnal yang kelihatan rapi & meyakinkan buat tugasmu. Kamu...", options: ["Langsung pakai, kelihatan valid", "Cek dulu jurnalnya beneran ada sebelum dipakai", "Percaya karena rapi", "Minta AI bikin lebih banyak kutipan"], answer: 1, explain: "AI sering mengarang sumber (halusinasi). Selalu verifikasi kutipan ke database asli — kalau nggak ketemu, jangan dipakai." }
            ]
          }
        ]
      }
    ]
  },

  /* ============ LEVEL 1 — BEGINNER ============ */
  {
    id: "beginner",
    title: "Beginner — Foundations",
    subtitle: "The intuition + the math behind every AI",
    color: "#18b07b",
    emoji: "🌱",
    chapters: [
      {
        id: "ch0",
        emoji: "📐",
        title: "Chapter 0 — The Math of AI",
        summary: "The 4 math ideas every forecaster stands on. Intuition first, no scary symbols.",
        lessons: [
          {
            id: "ch0-l1",
            title: "The typical day (average & spread)",
            minutes: 6,
            blocks: [
              { type: "text", html: "<p>Before a machine can predict your coffee sales, it has to answer a simpler question: <b>what is a normal day?</b></p><p>If last week you sold <code>40, 42, 38, 41, 39</code> cups, you instantly feel the 'typical' is around 40. That feeling has a name: the <b>mean</b> (average) — add them up, divide by how many.</p><span class='formula'>mean = (40 + 42 + 38 + 41 + 39) / 5 = 40</span>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 Key idea</span>The mean is a model's first, dumbest guess: 'tomorrow ≈ the average.' Every fancier model has to beat this baseline to be worth anything." },
              { type: "text", html: "<p>But the average hides something. Compare two shops that both average 40 cups:</p><p>Shop A: <code>39, 40, 41, 40, 40</code> — calm and predictable.<br>Shop B: <code>10, 70, 15, 65, 40</code> — wild swings.</p><p>Same mean, totally different risk. The size of the swings is the <b>spread</b> (statisticians call it <i>variance</i> / <i>standard deviation</i>). High spread = hard to forecast.</p>" },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ For your riset</span>Your cash-flow model lives or dies on spread. A steady shop is easy to predict; a spiky one needs the model to find <i>why</i> it spikes (weekends? payday? rain?). That 'why' is the next lesson." },
              { type: "quiz", q: "Two days both average 50 cups. Day-type A swings between 48–52, Day-type B between 10–90. Which is harder to forecast accurately?", options: ["A — small spread", "B — large spread", "Same, equal means", "Impossible to say"], answer: 1, explain: "Equal means, but B's large spread means more uncertainty. Spread, not the average, is what makes forecasting hard." }
            ]
          },
          {
            id: "ch0-l2",
            title: "Do things move together? (correlation)",
            minutes: 7,
            blocks: [
              { type: "text", html: "<p>Your gut already does this: 'when it rains, fewer people come.' You've noticed two things <b>move together</b>. That relationship is <b>correlation</b>.</p><p>Correlation runs from <code>-1</code> to <code>+1</code>:</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 Reading correlation</span><b>+1</b> = move together perfectly (more foot traffic → more sales). <b>0</b> = unrelated (shoe size → sales). <b>−1</b> = opposite (more rain → fewer sales)." },
              { type: "text", html: "<p>A model finds the columns in your Cashlo data that correlate with revenue, and leans on them to predict. Day-of-week, holidays, promotions — these become the model's <b>features</b> (its clues).</p>" },
              { type: "callout", variant: "tip", html: "<span class='lab'>⚠️ The classic trap</span>Correlation is <b>not</b> causation. Ice-cream sales and drowning rise together — not because ice cream drowns people, but because both rise in summer. Always ask 'is there a hidden third cause?'" },
              { type: "quiz", q: "In your data, 'number of staff on shift' correlates +0.9 with daily revenue. What's the safest conclusion?", options: ["More staff causes more sales — hire everyone!", "They move together, but a hidden cause (busy days) may drive both", "Revenue causes staffing", "Correlation this high must be causation"], answer: 1, explain: "You schedule more staff on days you EXPECT to be busy. The busy day causes both. Mistaking correlation for causation is the #1 rookie research error — reviewers pounce on it." }
            ]
          },
          {
            id: "ch0-l3",
            title: "The line that fits (y = mx + b)",
            minutes: 9,
            blocks: [
              { type: "text", html: "<p>Here's the single most important picture in classic AI. Plot your data as dots — say <b>foot traffic</b> (x) vs <b>revenue</b> (y). The dots roughly trend upward. A model tries to draw the <b>straight line that best passes through them</b>.</p><span class='formula'>revenue = m · (foot traffic) + b</span><p><b>m</b> is the slope (how steeply sales rise per extra visitor). <b>b</b> is where the line starts. Find good <code>m</code> and <code>b</code>, and you can predict revenue for <i>any</i> foot-traffic number — even one you've never seen.</p>" },
              { type: "callout", variant: "story", html: "<span class='lab'>🎮 Your turn — play with it</span>Drag the sliders below. Move the line until it hugs the dots. Watch the <b>error</b> number drop. You are literally doing by hand what a model does automatically." },
              { type: "interactive", widget: "fitLine" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 What just happened</span>You minimized the <b>error</b> — the total distance between your line and the real dots. 'Training a model' is just a computer searching for the <code>m</code> and <code>b</code> that make that error as small as possible. That's it. That's the secret." },
              { type: "quiz", q: "When you found the best-fitting line, what were you actually minimizing?", options: ["The slope m", "The number of data points", "The total error between the line and the real dots", "The starting value b"], answer: 2, explain: "Training = searching for the line (the m and b) with the smallest total error. Every model, from this line to a neural network, is doing a version of this search." }
            ]
          },
          {
            id: "ch0-l4",
            title: "Which way is downhill? (gradient)",
            minutes: 8,
            blocks: [
              { type: "text", html: "<p>Last lesson you nudged the sliders by feel. But how does a computer with millions of settings know which way to nudge? It uses the <b>gradient</b>.</p><p>Imagine the 'error' is a valley, and your current line is a ball sitting on the slope. The <b>gradient is the direction of steepest uphill</b>. So to reduce error, the computer steps in the <i>opposite</i> direction — downhill — over and over. This is <b>gradient descent</b>.</p>" },
              { type: "callout", variant: "story", html: "<span class='lab'>🏔️ The mountain in fog</span>You're on a foggy mountain, want the bottom. You can't see far, but you can feel which way the ground slopes under your feet. You take a step downhill, feel again, step again. Slowly you reach the valley. The model learns the exact same way — one small step at a time." },
              { type: "callout", variant: "tip", html: "<span class='lab'>⚙️ Step size matters</span>Steps too big → you overshoot the valley and bounce around. Too small → it takes forever. That step size has a name you'll meet constantly: the <b>learning rate</b>." },
              { type: "quiz", q: "In gradient descent, which way does the model step to reduce its error?", options: ["In the direction of the gradient (uphill)", "Opposite the gradient (downhill)", "Randomly until it works", "It never moves"], answer: 1, explain: "The gradient points uphill (toward MORE error), so the model steps the opposite way — downhill — to shrink error. 'Descent' = going down the error valley." }
            ]
          },
          {
            id: "ch0-l5",
            title: "Checkpoint: the math of AI",
            minutes: 5,
            blocks: [
              { type: "text", html: "<p>You now hold the four pillars every forecaster stands on. Let's lock them in.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 The whole chapter in 4 lines</span>1. <b>Mean & spread</b> — what's normal, and how risky.<br>2. <b>Correlation</b> — which clues move with sales.<br>3. <b>The fitted line</b> — turn clues into predictions.<br>4. <b>Gradient descent</b> — how the machine finds the best fit by stepping downhill." },
              { type: "quiz", q: "A model 'learns' by repeatedly adjusting itself to do what?", options: ["Memorize every past day exactly", "Make its prediction error smaller, step by step", "Increase correlation to 1", "Maximize the spread"], answer: 1, explain: "Learning = iteratively shrinking error via gradient descent. NOT memorizing — a model that just memorizes the past fails on new days (you'll meet this villain, 'overfitting', in the Intermediate level)." },
              { type: "quiz", q: "Why is the plain average a useful thing to compute first?", options: ["It's the final answer", "It's the baseline every smarter model must beat", "It removes correlation", "It is the gradient"], answer: 1, explain: "Always compute the dumb baseline first. If your fancy model can't beat 'tomorrow = the average', it isn't earning its complexity — a key honesty check in your research." }
            ]
          }
        ]
      },
      {
        id: "ch1",
        emoji: "🧱",
        title: "Chapter 1 — Thinking in Data",
        summary: "Rows, columns, features, labels — how Cashlo's sales become something a machine can read.",
        lessons: [
          {
            id: "ch1-l1",
            title: "Your data is a table",
            minutes: 6,
            blocks: [
              { type: "text", html: "<p>Remember the <b>🤖 Export ML</b> button we added to Cashlo? It produces a table: one <b>row</b> per day, many <b>columns</b> (date, revenue, transactions, day_of_week...).</p><p>In ML language: each <b>column the model uses to predict</b> is a <b>feature</b>. The <b>column you want to predict</b> (revenue) is the <b>label</b> or <b>target</b>.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 Features → Label</span>Features are the clues (day_of_week, was_holiday, transactions). The label is the answer (tomorrow's revenue). A model learns the mapping: <b>features → label</b>." },
              { type: "quiz", q: "In your daily Cashlo export, you want to predict revenue from day_of_week and weather. Which is the label?", options: ["day_of_week", "weather", "revenue", "the date"], answer: 2, explain: "The label/target is what you predict — revenue. day_of_week and weather are features (the clues used to predict it)." }
            ]
          },
          {
            id: "ch1-l2",
            title: "Enough, not big (how much data?)",
            minutes: 6,
            blocks: [
              { type: "text", html: "<p>People hear \"AI\" and think you need <b>big data</b> — millions of rows. For your forecaster, that's the wrong target.</p><p><b>Big data</b> is the world of LLMs (ChatGPT, Claude) trained on the whole internet. Your cash-flow model is a small, focused model — it needs <b>enough, relevant, clean</b> data, not big data.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 Big vs enough</span>LLMs need <i>billions</i> of examples. Your forecaster needs <i>enough relevant</i> ones — even ~3–6 months of clean daily Cashlo rows is a real starting point." },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ Good news for you</span>You don't need to be a giant tech company. You need <i>your shop's honest history</i> — which you already have." },
              { type: "quiz", q: "What does your coffee-shop forecaster mainly need?", options: ["Millions of rows (big data)", "Enough relevant, clean data", "More columns than rows", "No data — just rules"], answer: 1, explain: "Classic ML forecasting needs ENOUGH relevant, clean data — not 'big data'. Big data / pretraining is the LLM world, a different animal." }
            ]
          },
          {
            id: "ch1-l3",
            title: "Garbage in, garbage out",
            minutes: 6,
            blocks: [
              { type: "text", html: "<p>The single most important rule in all of ML:</p><span class='formula'>garbage in → garbage out</span><p>A model is only as good as the data you feed it. A day you forgot to record, a typo'd Rp amount, a duplicate row — the model learns those mistakes as if they were real patterns.</p>" },
              { type: "callout", variant: "tip", html: "<span class='lab'>⚠️ The 80% nobody warns you about</span>In real ML jobs, ~80% of the work is <b>cleaning data</b> — fixing missing days, obvious typos, duplicates — not the fancy model. Students always underestimate this. You won't." },
              { type: "quiz", q: "Your sales export has a day where revenue was typed as 5,000,000 instead of 50,000. If you train on it as-is, what happens?", options: ["Nothing, models ignore outliers", "The model learns a false pattern and predicts worse", "It improves accuracy", "It fixes itself"], answer: 1, explain: "Bad data → bad model. That one typo drags the model's sense of a 'normal day' way off. Clean first, model second." }
            ]
          }
        ]
      },
      {
        id: "ch2",
        emoji: "🤔",
        title: "Chapter 2 — What Even Is Machine Learning?",
        summary: "The difference between writing rules and letting a machine learn them.",
        lessons: [
          {
            id: "ch2-l1",
            title: "Rules vs. learning",
            minutes: 6,
            blocks: [
              { type: "text", html: "<p>Old way (you, the programmer): write the rule. <code>if weekend: sales = sales * 1.3</code>. You have to know the rule and hand-code every one.</p><p>ML way: you show the machine thousands of past days, and <b>it discovers the rules itself</b> — including ones you'd never spot, like 'rainy paydays behave oddly.'</p>" },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ Why this matters for you</span>You can't hand-code every pattern in your sales. But you HAVE the data. ML flips the problem: from 'know all the rules' to 'have good examples.' Cashlo gives you the examples — that's your unfair advantage." },
              { type: "quiz", q: "What's the core shift from traditional programming to machine learning?", options: ["From slow code to fast code", "From writing the rules yourself to learning rules from data", "From small data to big data only", "From Python to JavaScript"], answer: 1, explain: "Traditional: human writes rules. ML: machine infers rules from examples (data). That's the whole paradigm shift." }
            ]
          },
          {
            id: "ch2-l2",
            title: "Generalization — ready for the unseen",
            minutes: 7,
            blocks: [
              { type: "text", html: "<p>Here's the goal of machine learning, in one word: <b>generalization</b>.</p><p>It does <i>not</i> mean memorizing every past day. It means learning the underlying pattern well enough to handle a situation it has <b>never seen exactly before</b> — like a day that's summer <i>and</i> a holiday <i>and</i> raining, even if that exact combo never happened.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 Generalization vs memorizing</span>A model that memorizes the past perfectly but flops on new days is <b>overfitting</b>. The whole game is being <i>versatile</i> on data you've never seen." },
              { type: "callout", variant: "tip", html: "<span class='lab'>⚠️ Honest limit</span>ML generalizes to new <i>combinations</i> of things it has signals for — but a truly unprecedented shock (a pandemic, going viral overnight) breaks every forecaster. No model is magic." },
              { type: "quiz", q: "A model scores 100% on past days but predicts badly on new ones. What's wrong?", options: ["Great generalization", "Overfitting — poor generalization", "Too much correlation", "Not enough columns"], answer: 1, explain: "Memorizing the past ≠ understanding the pattern. That's overfitting — the opposite of the generalization you actually want." }
            ]
          },
          {
            id: "ch2-l3",
            title: "Why good models go stale",
            minutes: 6,
            blocks: [
              { type: "text", html: "<p>Even a great model decays over time — because the <b>world changes</b>. A new menu, Ramadan, a competitor opening next door: the data your model learned from no longer matches today's reality.</p><p>This slow mismatch has a name: <b>concept drift</b>.</p>" },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ This is your whole riset</span>No model trained once stays correct forever. The fix is a system that <b>watches its own errors grow and re-learns</b> — your self-improving loop. You'll build exactly this in the Advanced level." },
              { type: "quiz", q: "Your model was accurate for months, then a new café opened next door and accuracy dropped. This is…", options: ["Overfitting", "Concept drift — the world changed", "Too little data", "A coding bug"], answer: 1, explain: "The model didn't break — reality shifted, so old patterns no longer hold. That's concept drift, and detecting it is step one of a self-improving system." }
            ]
          }
        ]
      }
    ]
  },

  /* ============ MATH FOR AI — the mathematical mindset track ============ */
  {
    id: "math-ai",
    title: "Math for AI — The Mindset",
    subtitle: "Linear algebra, calculus, probability — the three languages every model speaks",
    color: "#7c4a63",
    emoji: "📐",
    chapters: [
      {
        id: "chM1", emoji: "🧮",
        title: "Math 1 — Linear Algebra: the language of data",
        summary: "Vectors, dot products, matrices — why every dataset is secretly a grid of numbers.",
        lessons: [
          {
            id: "chM1-l1", title: "A vector is just a row of your data", minutes: 7,
            blocks: [
              { type: "text", html: "<p>Forget arrows in physics class. In AI, a <b>vector</b> is simply <b>a list of numbers describing one thing</b>.</p><p>One day at your coffee shop: <code>[transactions=12, items=31, revenue=350000, is_weekend=1]</code>. That's a vector. Your whole ML export? A stack of these — one vector per day.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 The mental shift</span>Every row of data = a vector = <b>a point in space</b>. A day with 4 numbers is a point in 4-dimensional space. 'Similar days' are literally points that sit close together. ML lives in that space." },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ Why you care</span>When a model says 'this Saturday looks like past Saturdays', mathematically it means: this day's vector is close to those days' vectors. Distance between vectors = similarity between days." },
              { type: "quiz", q: "In ML, one row of your daily sales export (5 columns) is best thought of as…", options: ["A sentence", "A vector — a point in 5-dimensional space", "A random number", "An image"], answer: 1, explain: "Each row = a vector; each column = a dimension. 'Similar days' = nearby points. This one idea unlocks half of machine learning." }
            ]
          },
          {
            id: "chM1-l2", title: "The dot product — one number for 'how aligned?'", minutes: 8,
            blocks: [
              { type: "text", html: "<p>The most-used operation in all of AI. Take two vectors, multiply matching entries, add them up:</p><span class='formula'>[2, 3] · [4, 1] = 2×4 + 3×1 = 11</span><p>What does it MEAN? It measures <b>agreement</b>: big positive = the vectors point the same way; zero = unrelated; negative = opposed.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 You've already used it!</span>A prediction from your Stage-2 model was literally <code>features · weights</code> — the dot product of the day's clue-vector with the learned weight-vector. Every neural network is millions of dot products. That's the whole trick.</span>" },
              { type: "quiz", q: "A linear model predicts revenue by computing features · weights. This operation is…", options: ["A dot product", "A division", "A sorting", "A random guess"], answer: 0, explain: "prediction = w1·x1 + w2·x2 + … = the dot product. From your from-scratch regression to GPT, this is the atomic operation of AI." }
            ]
          },
          {
            id: "chM1-l3", title: "Matrices — many vectors at once", minutes: 7,
            blocks: [
              { type: "text", html: "<p>Stack your 137 day-vectors on top of each other → a <b>matrix</b> (137 rows × 5 columns). Your CSV <i>is</i> a matrix.</p><p><b>Matrix multiplication</b> = doing many dot products at once: multiply the data matrix by the weight vector and you get <b>all 137 predictions in one operation</b>.</p>" },
              { type: "callout", variant: "tip", html: "<span class='lab'>⚙️ Why GPUs exist</span>Graphics cards happen to be matrix-multiplication machines. That's the entire reason AI runs on GPUs — training a model is trillions of dot products, and GPUs do them in parallel." },
              { type: "quiz", q: "Multiplying your (137×5) data matrix by a (5×1) weight vector gives…", options: ["One number", "137 predictions at once", "5 new features", "An error"], answer: 1, explain: "Each row's dot product with the weights = that day's prediction; the matrix does all rows at once. Batch prediction = one matrix multiply." }
            ]
          }
        ]
      },
      {
        id: "chM2", emoji: "⛷️",
        title: "Math 2 — Calculus: the engine of learning",
        summary: "Derivatives, gradients, learning rate — play with a real gradient-descent machine.",
        lessons: [
          {
            id: "chM2-l1", title: "The derivative — 'if I nudge this, what happens?'", minutes: 7,
            blocks: [
              { type: "text", html: "<p>Forget limit notation for a moment. A <b>derivative</b> answers one everyday question: <b>if I change the input a tiny bit, how much does the output change?</b></p><p>Raise your latte price by Rp 500 → daily profit changes by how much? That sensitivity — <i>change out per change in</i> — is a derivative.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 In ML</span>The question becomes: <i>if I nudge this weight, does the ERROR go up or down, and how fast?</i> The derivative of error with respect to each weight tells the model exactly which knob to turn and which way. That's all 'learning' is." },
              { type: "quiz", q: "In training, the derivative of the error with respect to a weight tells the model…", options: ["The final answer", "Which direction (and how strongly) to adjust that weight", "How much data it has", "Nothing useful"], answer: 1, explain: "Positive derivative → error rises if weight rises → lower the weight (and vice versa). Learning = following these sensitivities downhill." }
            ]
          },
          {
            id: "chM2-l2", title: "Drive the gradient descent machine", minutes: 9,
            blocks: [
              { type: "text", html: "<p>The <b>gradient</b> is just the collection of all those derivatives — the 'downhill direction' on the error mountain. <b>Gradient descent</b>: step downhill, repeat.</p><p>The <b>learning rate</b> controls step size — and it's the most temperamental dial in AI. Feel it yourself:</p>" },
              { type: "interactive", widget: "gradientDescent" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 What you just felt</span>Small learning rate = safe but slow crawl. Big = fast but overshoots and bounces. Too big = explodes (error gets WORSE each step). Every AI engineer alive has burned hours on exactly this dial." },
              { type: "quiz", q: "You set the learning rate too high. What happens to the error during training?", options: ["Converges faster, no downside", "Bounces past the minimum, may get worse each step", "Nothing changes", "The data gets deleted"], answer: 1, explain: "Giant steps overshoot the valley and can climb the other side — divergence. You saw the ball do it. Tuning learning rate = balancing speed vs stability." }
            ]
          },
          {
            id: "chM2-l3", title: "Why 'deep' learning is just chained derivatives", minutes: 6,
            blocks: [
              { type: "text", html: "<p>A neural network stacks layers: output of one feeds the next. To train it, you need <i>how does the error change if I nudge a weight 5 layers back?</i></p><p>The <b>chain rule</b> answers it: multiply the sensitivities along the path. Applied backwards through the network, it's called <b>backpropagation</b> — the algorithm behind every deep model, GPT included.</p>" },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ Perspective</span>ChatGPT's training = the same loop you just drove: compute error → chain-rule the gradients → step downhill → repeat. Just with ~10¹² knobs instead of 2. Same math, more GPUs." },
              { type: "quiz", q: "Backpropagation is essentially…", options: ["A database technique", "The chain rule applied backwards to get every weight's gradient", "A way to store models", "Random search"], answer: 1, explain: "Backprop = chain rule + bookkeeping. It efficiently computes 'nudge sensitivity' for every weight so gradient descent can update them all." }
            ]
          }
        ]
      },
      {
        id: "chM3", emoji: "🎲",
        title: "Math 3 — Probability: the language of uncertainty",
        summary: "Distributions, conditioning, and honest forecasts — a number ± how sure you are.",
        lessons: [
          {
            id: "chM3-l1", title: "Distributions — the shape of your days", minutes: 7,
            blocks: [
              { type: "text", html: "<p>List all 137 daily revenues and count how often each range happens → that shape is a <b>distribution</b>. Its center = the <b>mean</b> (Rp 279k for your open days). Its width = the <b>variance/standard deviation</b> — how wild the swings are.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 Two shops, same mean</span>Shop A: swings Rp 250–310k. Shop B: swings Rp 50–600k. Same average — utterly different businesses. The mean without the spread is HALF the story. (Reviewers reject papers that report means without spread!)" },
              { type: "quiz", q: "Two forecasters both predict 'Rp 280k tomorrow'. Forecaster A's errors have small spread, B's are wild. Who do you trust?", options: ["Both equally — same prediction", "A — low spread means consistent reliability", "B — wild is exciting", "Neither"], answer: 1, explain: "The point prediction is identical; the DISTRIBUTION of errors is what tells you reliability. Uncertainty is information." }
            ]
          },
          {
            id: "chM3-l2", title: "Conditional probability — clues change odds", minutes: 7,
            blocks: [
              { type: "text", html: "<p><b>P(busy day)</b> at your shop might be 30%. But <b>P(busy day | it's Saturday)</b> — the probability GIVEN a clue — jumps to 60%. That bar '|' means <i>given that I know…</i></p><p>This is the soul of prediction: <b>every feature is a clue that reshapes the odds.</b> Your day-of-week average forecaster is literally 'the expected revenue GIVEN the weekday'.</p>" },
              { type: "callout", variant: "tip", html: "<span class='lab'>⚠️ The classic trap</span>P(wet street | rain) ≈ 100%, but P(rain | wet street) is lower (maybe someone washed a car). Flipping conditionals is the most common probability error in the world — Bayes' rule exists to flip them CORRECTLY." },
              { type: "quiz", q: "Your dow-average forecaster ('expected revenue given it's Saturday') is an example of…", options: ["A conditional expectation — prediction given a clue", "A random guess", "Overfitting", "A matrix"], answer: 0, explain: "E[revenue | weekday] — expectation conditioned on a feature. Fancier models just condition on MORE clues at once." }
            ]
          },
          {
            id: "chM3-l3", title: "Honest forecasts: a number ± how sure", minutes: 7,
            blocks: [
              { type: "text", html: "<p>Amateur forecast: 'tomorrow = Rp 257k.' Professional forecast: 'tomorrow = Rp 257k, <b>and 80% of the time it'll land between 180k–330k</b>.' That range is a <b>prediction interval</b> — the honest version of a forecast.</p><p>Your MAE (~Rp 98k) already tells you the typical miss — that's the raw material for intervals.</p>" },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ Remember your instinct?</span>In our very first math conversation you kept reaching for the word 'probability' when guessing tomorrow's sales. This lesson is that instinct, formalized: real forecasters ship a number AND its uncertainty. Put intervals in the riset paper — reviewers love it." },
              { type: "quiz", q: "What makes 'Rp 257k ± (180k–330k, 80%)' better than just 'Rp 257k'?", options: ["It's longer", "It communicates uncertainty, so decisions can account for risk", "Big numbers impress people", "It hides errors"], answer: 1, explain: "A point + interval = honest forecasting. The owner can stock for the range, not a false single number. And it's publishable practice." }
            ]
          }
        ]
      }
    ]
  },

  /* ============ LEVEL 2 — INTERMEDIATE ============ */
  {
    id: "intermediate",
    title: "Intermediate — Building Models",
    subtitle: "From a line to a real forecaster on your own data",
    color: "#b07d2b",
    emoji: "⚙️",
    lockedUntil: "beginner",
    chapters: [
      {
        id: "ch3", emoji: "📈",
        title: "Chapter 3 — Your First Predictor",
        summary: "Regression on real Cashlo data, the train/test split, and overfitting — the villain.",
        lessons: [
          {
            id: "ch3-l1", title: "From a line to a predictor", minutes: 7,
            blocks: [
              { type: "text", html: "<p>Remember the line you dragged in Chapter 0? <span class='formula'>revenue = m · (foot traffic) + b</span>That fitted line <i>is</i> a model — specifically <b>linear regression</b>. Once you've found a good <code>m</code> and <code>b</code>, you feed in a new foot-traffic number and out comes a revenue prediction.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 More clues = more dimensions</span>Real forecasting uses many features at once (day_of_week, is_holiday, transactions…). The math just adds a slope per feature: <code>revenue = m1·x1 + m2·x2 + … + b</code>. Same idea, more clues." },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ On your data</span>Your first real model: predict daily Cashlo revenue from a handful of columns. It won't be perfect — but if it beats the dumb average, you've built something real." },
              { type: "quiz", q: "Linear regression with several features predicts by…", options: ["Memorizing past days", "Adding up each feature times its own slope, plus a baseline", "Picking the most common value", "Sorting the data"], answer: 1, explain: "Each feature gets a weight (slope); the model sums feature×weight plus an intercept. Training = finding the weights that minimize error (gradient descent, from Ch0)." }
            ]
          },
          {
            id: "ch3-l2", title: "Don't grade your own homework", minutes: 7,
            blocks: [
              { type: "text", html: "<p>Here's the rule that separates real ML from self-deception. You must <b>split your data</b>: train the model on most of it (the <b>training set</b>), then test it on data it has <b>never seen</b> (the <b>test set</b>).</p>" },
              { type: "callout", variant: "tip", html: "<span class='lab'>⚠️ Why it matters</span>If you measure accuracy on the same days the model trained on, of course it looks amazing — it already saw the answers. That's grading your own homework. The test set is the honest exam." },
              { type: "quiz", q: "Why hold out a test set the model never trained on?", options: ["To have more data", "To get an honest estimate of how it performs on the future", "To make training faster", "It's optional"], answer: 1, explain: "Accuracy on training data is inflated (it saw the answers). The held-out test set estimates real-world performance — the only number you can trust." }
            ]
          },
          {
            id: "ch3-l3", title: "Overfitting — the villain", minutes: 7,
            blocks: [
              { type: "text", html: "<p>Back in Chapter 2 you met <b>generalization</b>. Its enemy has a name: <b>overfitting</b> — when a model memorizes the training data (even its random noise) instead of learning the real pattern.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 How to spot it</span>Overfitting looks like: <b>great</b> on the training set, <b>bad</b> on the test set. The gap between the two is the tell. The fix: simpler model, more data, or fewer features." },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ Coffee example</span>A model that learns 'on March 3rd last year sales were exactly 47' has memorized a fluke. A model that learns 'Saturdays are ~60% busier' has learned a pattern. You want the second." },
              { type: "quiz", q: "A model scores 99% on training data but 60% on the test set. This is…", options: ["A great model", "Overfitting", "Underfitting", "Concept drift"], answer: 1, explain: "Big train–test gap = overfitting: it memorized instead of generalizing. Simplify the model or add data." }
            ]
          }
        ]
      },
      {
        id: "ch4", emoji: "⏳",
        title: "Chapter 4 — Time Series & Forecasting",
        summary: "Trend, seasonality, and why you NEVER shuffle time. The heart of your riset.",
        lessons: [
          {
            id: "ch4-l1", title: "Time is special — never shuffle it", minutes: 7,
            blocks: [
              { type: "text", html: "<p>Forecasting has one iron rule that normal ML doesn't: <b>never shuffle time</b>. You train on the <i>past</i> and test on the <i>future</i> — always in chronological order.</p>" },
              { type: "callout", variant: "tip", html: "<span class='lab'>⚠️ Data leakage</span>If you randomly shuffle days into train/test, the model gets to 'see' future days while training — it's basically cheating by peeking. Your accuracy looks brilliant and then collapses in real life. Split by date: e.g. train on Jan–Oct, test on Nov–Dec." },
              { type: "quiz", q: "For a cash-flow forecaster, how should you split train vs test?", options: ["Randomly shuffle the days", "Chronologically — past for training, later dates for testing", "Alphabetically", "Doesn't matter"], answer: 1, explain: "Time series must be split by time. Random shuffling leaks the future into training and gives a dangerously optimistic score." }
            ]
          },
          {
            id: "ch4-l2", title: "Trend & seasonality", minutes: 7,
            blocks: [
              { type: "text", html: "<p>Most sales data is made of three things stacked together:</p><p><b>Trend</b> — the slow direction (is the shop growing month over month?). <b>Seasonality</b> — repeating cycles (weekly: weekends busy; yearly: Ramadan, holidays). <b>Noise</b> — the random leftover.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 Why split them out</span>If you can describe the trend and the seasonal pattern, you've explained most of the predictable part of your sales. What's left (noise) is the part no model can nail — and that's okay." },
              { type: "quiz", q: "Your café sells more every weekend and even more during Ramadan. Those repeating patterns are called…", options: ["Trend", "Seasonality", "Noise", "Overfitting"], answer: 1, explain: "Repeating cycles (weekly, yearly, holidays) = seasonality. The slow long-term direction is trend; the random leftover is noise." }
            ]
          },
          {
            id: "ch4-l3", title: "Beat the baseline first", minutes: 7,
            blocks: [
              { type: "text", html: "<p>Before any fancy model, build the dumb ones — your <b>baselines</b>:</p><p><b>Naive:</b> 'tomorrow = today.' <b>Seasonal-naive:</b> 'next Saturday = last Saturday.' (You invented this one yourself!)</p>" },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ The honesty gate</span>A fancy model is only worth its complexity if it <b>beats</b> these baselines. Many real-world 'AI forecasts' quietly lose to seasonal-naive. Always report the comparison — it's what makes your riset credible." },
              { type: "callout", variant: "tip", html: "<span class='lab'>⚙️ Lag features</span>The trick that lets a normal model do time series: feed it the recent past as columns — yesterday's sales, last week's same-day sales. Those 'lag features' turn history into clues." },
              { type: "quiz", q: "Why build naive & seasonal-naive baselines before a real model?", options: ["They're the final answer", "To prove your real model actually adds value by beating them", "To use more data", "They train faster"], answer: 1, explain: "Baselines are the bar to clear. If your model can't beat 'next Saturday = last Saturday', the complexity isn't earning its keep — a key check reviewers look for." }
            ]
          }
        ]
      },
      {
        id: "ch5", emoji: "🎯",
        title: "Chapter 5 — Measuring & Trusting a Model",
        summary: "MAE, RMSE, MAPE, backtesting — proving your model actually works.",
        lessons: [
          {
            id: "ch5-l1", title: "How wrong is wrong? (MAE & RMSE)", minutes: 7,
            blocks: [
              { type: "text", html: "<p>To improve a model you must measure its error. Two staples:</p><p><b>MAE</b> (mean absolute error) — the average miss, in rupiah. Easy to explain: 'on average we're off by Rp 80k.' <b>RMSE</b> — similar, but it <b>punishes big misses harder</b> (it squares the errors).</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 Which to use</span>Use <b>MAE</b> when all errors hurt equally. Use <b>RMSE</b> when a few huge misses are especially bad (e.g. badly underestimating a busy day and running out of stock)." },
              { type: "quiz", q: "You really want to avoid occasional huge prediction misses. Which metric fits?", options: ["MAE", "RMSE (it penalizes large errors more)", "Neither", "Accuracy"], answer: 1, explain: "RMSE squares errors, so big misses dominate the score — exactly what you want when large errors are the costly ones." }
            ]
          },
          {
            id: "ch5-l2", title: "Backtesting — honest accuracy over time", minutes: 7,
            blocks: [
              { type: "text", html: "<p>A single train/test split gives one number. <b>Backtesting</b> (walk-forward validation) does better: train on data up to a point, predict the next stretch, slide forward, repeat. You get accuracy across <i>many</i> periods, not just one lucky one.</p>" },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ Why your riset needs it</span>Backtesting is how you prove the forecaster works <i>consistently</i> — and later, it's how you'll show the <b>self-improving loop</b> getting better over time. It's the evidence in your paper." },
              { type: "quiz", q: "What does backtesting (walk-forward) give you over a single split?", options: ["A faster model", "Accuracy measured across many time periods, not one", "More training data", "A simpler model"], answer: 1, explain: "Walk-forward validation tests the model repeatedly as time advances, so your accuracy estimate is robust — not a fluke of one chosen split." }
            ]
          }
        ]
      }
    ]
  },

  /* ============ LEVEL 3 — ADVANCED ============ */
  {
    id: "advanced",
    title: "Advanced — Self-Improving Systems",
    subtitle: "The RSI-inspired loop that makes your riset novel",
    color: "#c2543f",
    emoji: "🚀",
    lockedUntil: "intermediate",
    chapters: [
      {
        id: "ch6", emoji: "🌊",
        title: "Chapter 6 — Concept Drift",
        summary: "Detecting when reality changes and your model goes stale. Taught with YOUR shop's real data.",
        lessons: [
          {
            id: "ch6-l1", title: "When the world moves under your model", minutes: 7,
            blocks: [
              { type: "text", html: "<p>A model learns patterns from history. But reality keeps changing: a new menu, a competitor opening, Ramadan, a viral TikTok. When today's world no longer matches the world the model learned from, the model quietly goes wrong. That mismatch is <b>concept drift</b>.</p>" },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ This happened to YOUR shop</span>In the real Cashlo data (Dec 2025–Jun 2026), the shop closed 10/10 days for Lebaran (mudik), then reopened into a <i>different</i> sales regime. A model trained before Lebaran was suddenly forecasting a world that no longer existed." },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 Two flavors</span><b>Sudden drift</b> — an abrupt break (Lebaran closure, new competitor). <b>Gradual drift</b> — slow change (the shop growing month by month: Rp 1.1M in Dec → Rp 9.5M in April). Your data had BOTH." },
              { type: "quiz", q: "Your model was accurate for months, then a competitor opened and error keeps climbing. What is this?", options: ["Overfitting", "Concept drift — reality changed", "A bug in the code", "Not enough features"], answer: 1, explain: "The model didn't change — the WORLD did. Patterns it learned no longer hold. That's concept drift, and no static model survives it forever." }
            ]
          },
          {
            id: "ch6-l2", title: "How a model watches itself", minutes: 7,
            blocks: [
              { type: "text", html: "<p>You can't see drift directly — but you can see its shadow: <b>the model's own error starts rising</b>. So a self-aware system tracks its recent errors and compares them to its normal level.</p><span class='formula'>if (recent 14-day error) &gt; 1.5 × (normal error) → DRIFT ALARM</span><p>That simple rule is a real drift detector. The research literature has fancier ones — <b>DDM</b>, <b>ADWIN</b>, Page-Hinkley — but they all share this soul: <i>watch the error, react when it jumps.</i></p>" },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ It worked on real data</span>Running exactly this monitor over the Cashlo history, it raised its hand on <b>31 March 2026</b> — right after the Lebaran closure, exactly when the sales regime shifted. The machine noticed the world changed before anyone told it." },
              { type: "quiz", q: "How does a deployed model 'notice' concept drift?", options: ["It reads the news", "Its recent prediction error rises above its normal level", "It can't — impossible", "The database tells it"], answer: 1, explain: "Drift shows up as a sustained jump in the model's own error. Monitors like DDM/ADWIN formalize 'recent error >> normal error' — the same logic as our 1.5× rule." }
            ]
          }
        ]
      },
      {
        id: "ch7", emoji: "🔁",
        title: "Chapter 7 — The Self-Improving Loop",
        summary: "Monitor → detect drift → retrain → validate. The riset's contribution, with the real numbers.",
        lessons: [
          {
            id: "ch7-l1", title: "Static vs adaptive — the experiment", minutes: 8,
            blocks: [
              { type: "text", html: "<p>The core question of the riset: does a model that <b>keeps retraining</b> beat one trained <b>once and frozen</b>?</p><p>The experiment (on 137 real days of Cashlo sales): <b>STATIC</b> = train a day-of-week forecaster on the first 45 days, freeze it. <b>ADAPTIVE</b> = retrain on all data so far, every single day (an expanding window). Score both on the same 92 unseen days.</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 The real result</span>STATIC: MAE Rp 123,188. ADAPTIVE: MAE Rp 106,473 → the self-improving loop was <b>14% more accurate</b>. And month by month you can watch the static model rot: by May it was Rp 124k wrong per day while adaptive was Rp 95k." },
              { type: "callout", variant: "tip", html: "<span class='lab'>⚠️ Honest footnote</span>In June (a tiny partial month) the static model happened to win. Real research reports that too — one awkward month doesn't erase the trend, but hiding it would be dishonest." },
              { type: "quiz", q: "Why did the ADAPTIVE forecaster beat the STATIC one on this data?", options: ["It used a fancier algorithm", "It kept learning as the shop grew and patterns shifted", "It had fewer features", "Luck"], answer: 1, explain: "Same algorithm! The only difference: adaptive retrains on new data, so it tracked the shop's growth and post-Lebaran shift. Freshness beat cleverness — 14% better MAE." }
            ]
          },
          {
            id: "ch7-l2", title: "Anatomy of the loop", minutes: 7,
            blocks: [
              { type: "text", html: "<p>The full self-improving loop has four organs:</p><p><b>1. MONITOR</b> — log every prediction vs reality.<br><b>2. DETECT</b> — drift alarm when recent error jumps (Ch6).<br><b>3. RETRAIN</b> — refit on data that includes the new reality.<br><b>4. VALIDATE</b> — only deploy the new model if it actually beats the old one on recent data (champion vs challenger).</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 Why step 4 matters</span>Blind retraining can make things WORSE (retrain during a weird week and you learn noise). The champion/challenger gate means the system can never downgrade itself — improvement is one-way." },
              { type: "callout", variant: "story", html: "<span class='lab'>☕ Why this is the riset (not just 'a model')</span>Chapter 4–5 proved a hard truth: on small noisy data, fancy models often LOSE to simple baselines. So the contribution isn't a cleverer model — it's a SYSTEM that keeps whatever model honest and current. That reframe is what makes the paper defensible." },
              { type: "quiz", q: "Before deploying a freshly retrained model, the loop should…", options: ["Deploy immediately — newer is better", "Validate it beats the current model on recent data first", "Delete the old model", "Wait a year"], answer: 1, explain: "Champion vs challenger: the new model must PROVE itself on held-out recent data before taking over. That gate is what makes self-improvement safe." }
            ]
          }
        ]
      },
      {
        id: "ch8", emoji: "🎓",
        title: "Chapter 8 — From Forecaster to Paper",
        summary: "Turning the build into a publishable article — luaran rules, IMRaD, and honest evaluation.",
        lessons: [
          {
            id: "ch8-l1", title: "What the campus actually requires", minutes: 6,
            blocks: [
              { type: "text", html: "<p>Know the rules you're playing by (UNESA MBKM riset pedoman):</p><p>The riset needs <b>ONE luaran wajib</b> — a <b>prototype/implementation</b> counts, and so does an article at <b>minimum Sinta 3–6 with just 'submitted/under review' status</b>. The LPPM student-research grant (up to Rp 5jt) has the same 'under review' bar.</p>" },
              { type: "callout", variant: "tip", html: "<span class='lab'>⚠️ Don't confuse two bars</span>PASSING the riset = easy (the prototype already exists). <b>Skripsi exemption</b> = a separate prodi policy with a higher bar (likely Sinta 4, possibly published). Always confirm the exemption rule with your dosen — never assume.</span>" },
              { type: "quiz", q: "To satisfy the riset BKP's luaran wajib, an article must be…", options: ["Published in Scopus Q1", "At minimum Sinta 3–6 with submitted/under-review status (or a prototype instead)", "Sinta 1 published", "There's no output requirement"], answer: 1, explain: "The pedoman accepts a prototype OR an article at min Sinta 3–6 where 'submit/under review' already counts. The Sinta-4-published bar belongs to the separate skripsi-exemption policy." }
            ]
          },
          {
            id: "ch8-l2", title: "IMRaD — the shape of every paper", minutes: 7,
            blocks: [
              { type: "text", html: "<p>Nearly every scientific paper has the same skeleton — <b>IMRaD</b>:</p><p><b>I</b>ntroduction (why this problem matters + the gap) → <b>M</b>ethod (what you did, reproducibly) → <b>R</b>esults (what happened — tables, numbers) → <b>D</b>iscussion (what it means + limitations).</p><p>Your riset already maps onto it: UMKM cash-flow problem (I), data + baselines + loop design (M), 14% improvement + drift detection (R), 'freshness beats cleverness on small data' + partial-June caveat (D).</p>" },
              { type: "callout", variant: "key", html: "<span class='lab'>🔑 What reviewers reward</span>Honest baselines, a fair test the model can't cheat (walk-forward), reported limitations, and comparisons to established methods (cite DDM/ADWIN for drift). You already practice all four — that's why the honest failures in Stage 2 were worth more than fake wins." },
              { type: "quiz", q: "In IMRaD, the honest sentence 'our June sample was too small to conclude' belongs in…", options: ["Introduction", "Method", "Results", "Discussion (limitations)"], answer: 3, explain: "Limitations live in the Discussion. Reviewers TRUST papers that state their own weaknesses — hiding them is the fastest way to rejection." }
            ]
          }
        ]
      }
    ]
  }
];

/* ===========================================================
   CAREER ROADMAP — Carmelio → professional AI/ML/Prompt Engineer
   Phases tie directly to the riset, the courses, and real proof.
   =========================================================== */
const CAREER_ROADMAP = [
  {
    id: "rm-foundations", icon: "🧱", phase: "Phase 1 · now", time: "Jun – Aug 2026",
    title: "Foundations & Tooling",
    learn: ["Python data stack (pandas, NumPy)", "Stats & math intuition (Academy Ch.0)", "Git & GitHub workflow", "Clean data thinking"],
    build: ["Cashlo sales analysis notebook", "Public GitHub + first repo"],
    prove: ["Kaggle Python + Pandas certs", "Green commit history"]
  },
  {
    id: "rm-classml", icon: "📊", phase: "Phase 2", time: "Aug – Oct 2026",
    title: "Classical Machine Learning",
    learn: ["Supervised learning: regression & classification", "Train/test split, overfitting", "Metrics: MAE, RMSE, R²", "scikit-learn"],
    build: ["Cashlo next-day revenue predictor", "Model comparison write-up"],
    prove: ["Kaggle Intro + Intermediate ML", "Dicoding ML path (via IDCamp)"]
  },
  {
    id: "rm-timeseries", icon: "⏳", phase: "Phase 3 · riset core", time: "Sep – Dec 2026",
    title: "Time Series & Forecasting",
    learn: ["Trend, seasonality, stationarity", "ARIMA, Prophet, XGBoost on lags", "Backtesting (never shuffle time!)"],
    build: ["7-day cash-flow forecaster for Cashlo", "Backtested accuracy report"],
    prove: ["Kaggle Time Series cert", "Riset MVP demoable to dosen"]
  },
  {
    id: "rm-deeplearning", icon: "🧠", phase: "Phase 4", time: "Dec 2026 – Feb 2027",
    title: "Deep Learning",
    learn: ["Neural nets from scratch (intuition)", "PyTorch / TensorFlow basics", "LSTM for sequences", "Regularization & training loops"],
    build: ["LSTM vs XGBoost on Cashlo data", "Notebook with visual results"],
    prove: ["DeepLearning.AI / fast.ai", "TensorFlow Developer (optional)"]
  },
  {
    id: "rm-llm", icon: "💬", phase: "Phase 5 · prompt engineering", time: "Feb – Apr 2027",
    title: "LLMs & Prompt Engineering",
    learn: ["How transformers work (intuition)", "Prompt patterns: few-shot, chain-of-thought, structured output", "RAG & function/tool calling", "Evals: measuring prompt quality"],
    build: ["Natural-language analytics assistant for Cashlo (Claude API)", "Prompt-eval harness with a scoring rubric"],
    prove: ["Anthropic / DeepLearning.AI prompt courses", "Public prompt-engineering repo + blog"]
  },
  {
    id: "rm-mlops", icon: "🔁", phase: "Phase 6 · the novelty", time: "Apr – Jun 2027",
    title: "MLOps & Self-Improving Systems",
    learn: ["Concept/data drift detection", "Automated retraining pipelines", "Deployment, monitoring, champion/challenger", "Online learning (river)"],
    build: ["The self-improving loop (riset contribution)", "Dashboard showing accuracy improving over time"],
    prove: ["DeepLearning.AI MLOps", "Working deployed system"]
  },
  {
    id: "rm-career", icon: "🏆", phase: "Phase 7 · go pro", time: "2027 – 2028",
    title: "Publish, Intern, Get Hired",
    learn: ["Research writing (IMRaD)", "System design for ML", "Interview prep (ML + coding)", "Personal brand"],
    build: ["Sinta 4 paper from the riset → skripsi exemption", "Portfolio site + 4 flagship repos"],
    prove: ["Magang Berdampak (sem 6) / industry internship", "GEMASTIK / competition record", "Job offer as AI/ML Engineer"]
  }
];

