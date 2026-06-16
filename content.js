/* ===========================================================
   Cashlo AI Academy — curriculum
   Aligned with carmelio-hq/LEARNING-AI.md and the riset:
   "Self-Improving Cash-Flow Forecaster for Cashlo"
   Every concept is taught through the coffee shop.
   =========================================================== */

const CURRICULUM = [
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
    color: "#6c5ce7",
    emoji: "⚙️",
    lockedUntil: "beginner",
    chapters: [
      { id: "ch3", emoji: "📈", title: "Chapter 3 — Your First Predictor", summary: "Regression on real Cashlo data. Train/test split. Overfitting, the villain.", lessons: [
        { id: "ch3-l1", title: "Unlocks as we learn", minutes: 5, blocks: [
          { type: "callout", variant: "tip", html: "<span class='lab'>🔒 Coming next</span>We build this together right after you finish Beginner. It maps to Stage 2 in your learning plan — your first model predicting Cashlo revenue." }
        ]}
      ]},
      { id: "ch4", emoji: "⏳", title: "Chapter 4 — Time Series & Forecasting", summary: "Trend, seasonality, and why you NEVER shuffle time. The heart of your riset.", lessons: [
        { id: "ch4-l1", title: "Unlocks as we learn", minutes: 5, blocks: [
          { type: "callout", variant: "tip", html: "<span class='lab'>🔒 Coming next</span>This is your riset's core (Stage 3). Forecasting cash flow 7 days ahead, backtested for real accuracy." }
        ]}
      ]},
      { id: "ch5", emoji: "🎯", title: "Chapter 5 — Measuring & Trusting a Model", summary: "MAE, RMSE, backtesting — proving your model actually works.", lessons: [
        { id: "ch5-l1", title: "Unlocks as we learn", minutes: 5, blocks: [
          { type: "callout", variant: "tip", html: "<span class='lab'>🔒 Coming next</span>How to honestly measure error — the section that makes your paper credible to reviewers." }
        ]}
      ]}
    ]
  },

  /* ============ LEVEL 3 — ADVANCED ============ */
  {
    id: "advanced",
    title: "Advanced — Self-Improving Systems",
    subtitle: "The RSI-inspired loop that makes your riset novel",
    color: "#e6486a",
    emoji: "🚀",
    lockedUntil: "intermediate",
    chapters: [
      { id: "ch6", emoji: "🌊", title: "Chapter 6 — Concept Drift", summary: "Detecting when reality changes and your model goes stale.", lessons: [
        { id: "ch6-l1", title: "Unlocks as we learn", minutes: 5, blocks: [
          { type: "callout", variant: "tip", html: "<span class='lab'>🔒 The novelty begins</span>When you add a new menu or Ramadan hits, your model's world shifts. Detecting that 'drift' is step one of self-improvement." }
        ]}
      ]},
      { id: "ch7", emoji: "🔁", title: "Chapter 7 — The Automated Retraining Loop", summary: "Monitor → detect drift → retrain → validate → deploy. Itself.", lessons: [
        { id: "ch7-l1", title: "Unlocks as we learn", minutes: 5, blocks: [
          { type: "callout", variant: "tip", html: "<span class='lab'>🔒 The heart of the paper</span>This loop IS the 'self-improving' contribution (Stage 4). The system that gets better without you touching it." }
        ]}
      ]},
      { id: "ch8", emoji: "🎓", title: "Chapter 8 — From Forecaster to Sinta 4 Paper", summary: "Turning the build into a publishable research paper.", lessons: [
        { id: "ch8-l1", title: "Unlocks as we learn", minutes: 5, blocks: [
          { type: "callout", variant: "tip", html: "<span class='lab'>🔒 The finish line</span>Structuring methodology, results, and writing — the path to skripsi exemption." }
        ]}
      ]}
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

