/* ===========================================================
   Cashlo AI Academy — app engine
   =========================================================== */

const LS_KEY = "cashlo_ai_academy_v1";
const GOAL = { small: 1, medium: 2, hard: 3 };
const HABIT_LABEL = {
  small: { tag: "Small", t: "🌱 Tiny win", d: "1 lesson today (~6 min). Atomic Habits: start so small you can't say no." },
  medium: { tag: "Medium", t: "🔥 Steady", d: "2 lessons today (~15 min). The habit is forming." },
  hard: { tag: "Hard", t: "⚡ Deep work", d: "3 lessons today (~25 min). For days you feel strong." }
};

/* ---------- date helpers ---------- */
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function yesterdayStr() {
  const d = new Date(); d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ---------- state ---------- */
function defaultState() {
  return { completed: [], xp: 0, habit: "small", roadmapDone: [], userName: "",
    streak: { count: 0, longest: 0, lastCredit: null },
    daily: { date: todayStr(), lessons: 0 } };
}
let state = loadState();

function loadState() {
  let s;
  try { s = JSON.parse(localStorage.getItem(LS_KEY)); } catch (e) { s = null; }
  if (!s) s = defaultState();
  if (!s.daily || s.daily.date !== todayStr()) s.daily = { date: todayStr(), lessons: 0 };
  if (!s.streak) s.streak = { count: 0, longest: 0, lastCredit: null };
  // break the streak if last credit wasn't today or yesterday
  if (s.streak.lastCredit !== todayStr() && s.streak.lastCredit !== yesterdayStr()) s.streak.count = 0;
  if (!Array.isArray(s.completed)) s.completed = [];
  if (!Array.isArray(s.roadmapDone)) s.roadmapDone = [];
  if (typeof s.xp !== "number") s.xp = 0;
  if (!s.habit) s.habit = "small";
  if (typeof s.userName !== "string") s.userName = "";
  return s;
}
function save() { localStorage.setItem(LS_KEY, JSON.stringify(state)); syncProgress(); }

/* ---------- cloud progress sync (Supabase) ----------
   Fire-and-forget upsert so learning progress is visible to Claude (mentor)
   in real time. No reads from the client; RLS = insert/update only. */
const SB_URL = "https://qhvzoahjlfffoiqufokb.supabase.co";
const SB_KEY = "sb_publishable_xJHcN64h-Oh2yGiEEfG2nA_H565KNNY";
let _lastSync = 0;
function syncProgress() {
  try {
    if (!state.deviceId) { state.deviceId = "dev-" + Math.random().toString(36).slice(2, 10); localStorage.setItem(LS_KEY, JSON.stringify(state)); }
    const now = Date.now();
    if (now - _lastSync < 8000) return;   // gentle throttle
    _lastSync = now;
    fetch(`${SB_URL}/rest/v1/progress?on_conflict=id`, {
      method: "POST",
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ id: state.deviceId, payload: {
        userName: state.userName || null, xp: state.xp, streak: state.streak.count,
        longest: state.streak.longest, habit: state.habit,
        completed: state.completed, roadmapDone: state.roadmapDone,
        lastLesson: state.completed[state.completed.length - 1] || null
      }, updated_at: new Date().toISOString() })
    }).catch(() => {});
  } catch (e) { /* offline / blocked — never break the app */ }
}

/* ---------- ranks (XP-based titles) ---------- */
const RANKS = [
  { min: 0, t: "Pemula", e: "🌱" },
  { min: 70, t: "Penjelajah", e: "🧭" },
  { min: 160, t: "Terampil", e: "⚙️" },
  { min: 300, t: "Mahir", e: "🚀" },
  { min: 500, t: "Ahli AI", e: "🧠" },
  { min: 800, t: "Master", e: "👑" },
];
function rankFor(xp) { let r = RANKS[0]; for (const x of RANKS) if (xp >= x.min) r = x; return r; }
function nextRank(xp) { return RANKS.find(x => x.min > xp) || null; }

/* ---------- lookups ---------- */
function allLessons(level) { return level.chapters.flatMap(c => c.lessons); }
function levelComplete(level) { return allLessons(level).every(l => state.completed.includes(l.id)); }
function isLevelLocked(level) {
  if (!level.lockedUntil) return false;
  const prereq = CURRICULUM.find(L => L.id === level.lockedUntil);
  return prereq ? !levelComplete(prereq) : false;
}
function chapterProgress(chap) {
  const done = chap.lessons.filter(l => state.completed.includes(l.id)).length;
  return { done, total: chap.lessons.length };
}
function findLesson(id) {
  for (const L of CURRICULUM) for (const c of L.chapters) {
    const les = c.lessons.find(x => x.id === id);
    if (les) return { level: L, chap: c, lesson: les };
  }
  return null;
}

/* ---------- top bar ---------- */
function renderTopbar() {
  document.getElementById("streakVal").textContent = state.streak.count;
  document.getElementById("xpVal").textContent = state.xp;
  const box = document.getElementById("rankBox");
  if (box) {
    const r = rankFor(state.xp), nx = nextRank(state.xp);
    const pct = nx ? Math.round((state.xp - r.min) / (nx.min - r.min) * 100) : 100;
    box.innerHTML =
      `<div class="rk-top"><span class="rk-emoji">${r.e}</span><span class="rk-title">${r.t}</span></div>` +
      `<div class="rk-bar"><div style="width:${pct}%"></div></div>` +
      `<div class="rk-next">${nx ? `${nx.min - state.xp} XP → ${nx.t}` : "Rank tertinggi! 👑"}</div>`;
  }
}

/* ---------- screens ---------- */
const screens = {};
function show(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- next incomplete lesson (for Resume) ---------- */
function firstIncomplete() {
  for (const level of CURRICULUM) {
    if (isLevelLocked(level)) continue;
    for (const chap of level.chapters) {
      for (const les of chap.lessons) {
        if (!state.completed.includes(les.id)) return { level, chap, lesson: les };
      }
    }
  }
  return null;
}

/* ---------- HOME ---------- */
function renderHome() {
  const goal = GOAL[state.habit];
  const todayDone = Math.min(state.daily.lessons, goal);
  const pct = Math.round((todayDone / goal) * 100);
  const next = firstIncomplete();
  const pool = collectPracticePool();

  let html = `
    <div class="hero">
      <div class="eyebrow">Your coffee shop, your classroom</div>
      <h1>Learn AI from the ground up</h1>
      <p>Every idea is taught through Cashlo — building, step by step, toward your self-improving cash-flow forecaster and a Sinta&nbsp;4 paper.</p>
    </div>
    ${next ? `
    <button class="chap" id="resumeCard" style="display:flex;align-items:center;gap:16px;width:100%;margin-bottom:18px;border-color:var(--espresso);background:linear-gradient(180deg,#fff,#fdfaf5)">
      <div style="font-size:30px">▶️</div>
      <div style="flex:1;min-width:0">
        <div class="eyebrow" style="color:var(--espresso)">Lanjut belajar · Continue</div>
        <div class="ctitle" style="margin:3px 0 2px">${next.lesson.title}</div>
        <div class="csum" style="min-height:0">${next.level.title} · ${next.chap.title}</div>
      </div>
      <span class="btn btn-primary" style="pointer-events:none;white-space:nowrap">Lanjut →</span>
    </button>` : ""}
    ${pool.length >= 3 ? `
    <button class="chap" id="practiceCard" style="display:flex;align-items:center;gap:16px;width:100%;margin-bottom:18px;border-color:var(--gold)">
      <div style="font-size:28px">🎲</div>
      <div style="flex:1;min-width:0">
        <div class="eyebrow" style="color:var(--gold)">Latihan Cepat · Active recall</div>
        <div class="ctitle" style="margin:3px 0 2px">5 soal acak dari yang sudah kamu pelajari</div>
        <div class="csum" style="min-height:0">+5 XP per jawaban benar · melatih ingatan jangka panjang</div>
      </div>
      <span class="btn btn-ghost" style="pointer-events:none;white-space:nowrap">Main →</span>
    </button>` : ""}

    <div class="habit">
      <h3>🎯 Today's habit ${state.daily.lessons >= goal ? "— done! 🎉" : ""}</h3>
      <div class="hint">James Clear's rule: start so small you can't say no. Scale up only when it sticks.</div>
      <div class="habit-row">
        ${["small","medium","hard"].map(k => `
          <button class="habit-opt ${state.habit===k?"active":""}" data-habit="${k}">
            <span class="tag">${HABIT_LABEL[k].tag}</span>
            <div class="t">${HABIT_LABEL[k].t}</div>
            <div class="d">${HABIT_LABEL[k].d}</div>
          </button>`).join("")}
      </div>
      <div class="habit-progress">
        <div class="todaybar"><div style="width:${pct}%"></div></div>
        <div class="habit-note">${todayDone} / ${goal} lessons today · 🔥 ${state.streak.count}-day streak · longest ${state.streak.longest} · ${state.xp} XP</div>
      </div>
    </div>

    <div class="section-title">Your journey</div>
    <div class="levels">`;

  for (const level of CURRICULUM) {
    const locked = isLevelLocked(level);
    const lessonsDone = allLessons(level).filter(l => state.completed.includes(l.id)).length;
    const lessonsTotal = allLessons(level).length;
    html += `
      <div class="level">
        <div class="level-head">
          <div class="level-badge" style="background:${level.color}">${level.emoji}</div>
          <div>
            <h2>${level.title}</h2>
            <div class="sub">${level.subtitle}</div>
          </div>
          <div class="lock">${locked ? `🔒 Finish ${level.lockedUntil}` : `${lessonsDone}/${lessonsTotal} lessons`}</div>
        </div>
        <div class="chapters">
          ${level.chapters.map(chap => {
            const p = chapterProgress(chap);
            const cpct = Math.round((p.done / p.total) * 100);
            const full = p.done === p.total && p.total > 0;
            return `
              <button class="chap ${locked ? "locked":""}" data-level="${level.id}" data-chap="${chap.id}" ${locked?"disabled":""}>
                ${full ? `<span class="done-pill">✓ done</span>` : ""}
                <div class="emoji">${chap.emoji}</div>
                <div class="ctitle">${chap.title}</div>
                <div class="csum">${chap.summary}</div>
                <div class="cbar"><div style="width:${cpct}%"></div></div>
                <div class="cmeta"><span>${p.done}/${p.total} lessons</span><span>${cpct}%</span></div>
              </button>`;
          }).join("")}
        </div>
      </div>`;
  }
  html += `</div>`;
  screens.home.innerHTML = html;

  screens.home.querySelectorAll("[data-habit]").forEach(b =>
    b.addEventListener("click", () => { state.habit = b.dataset.habit; save(); renderHome(); }));
  screens.home.querySelectorAll(".chap[data-chap]:not(.locked)").forEach(b =>
    b.addEventListener("click", () => openChapter(b.dataset.level, b.dataset.chap)));
  if (next) document.getElementById("resumeCard")?.addEventListener("click", () => openLesson(next.lesson.id));
  document.getElementById("practiceCard")?.addEventListener("click", startPractice);

  renderTopbar();
}

/* ---------- CHAPTER (lesson list) ---------- */
let currentChapter = null;
function openChapter(levelId, chapId) {
  const level = CURRICULUM.find(L => L.id === levelId);
  const chap = level.chapters.find(c => c.id === chapId);
  currentChapter = { level, chap };

  screens.chapter.innerHTML = `
    <div class="lesson-top">
      <button class="btn-back" id="chapBack">← Home</button>
      <div class="step-count">${chap.emoji} ${chap.title}</div>
    </div>
    <div class="lesson-card">
      <div class="kicker">${level.title}</div>
      <h2>${chap.title}</h2>
      <p class="block-text" style="margin:8px 0 18px;color:var(--ink-soft)">${chap.summary}</p>
      <div style="display:grid;gap:12px">
        ${chap.lessons.map((l, i) => {
          const done = state.completed.includes(l.id);
          return `
            <button class="habit-opt" data-lesson="${l.id}" style="display:flex;align-items:center;gap:14px">
              <div style="width:38px;height:38px;border-radius:12px;display:grid;place-items:center;font-weight:800;color:#fff;background:${done?"var(--teal)":"var(--primary)"}">${done?"✓":i+1}</div>
              <div style="flex:1">
                <div class="t" style="margin:0">${l.title}</div>
                <div class="d">~${l.minutes} min ${done?"· completed":""}</div>
              </div>
              <span style="font-weight:800;color:var(--primary)">${done?"Review":"Start"} →</span>
            </button>`;
        }).join("")}
      </div>
    </div>`;

  document.getElementById("chapBack").addEventListener("click", () => { renderHome(); show("home"); });
  screens.chapter.querySelectorAll("[data-lesson]").forEach(b =>
    b.addEventListener("click", () => openLesson(b.dataset.lesson)));
  show("chapter");
}

/* ---------- LESSON (step through blocks) ---------- */
let lessonCtx = null; // { lesson, steps, idx, answered:Set }

function buildSteps(blocks) {
  // merge consecutive text/callout blocks into one reading step; quiz & interactive stand alone
  const steps = []; let buffer = [];
  const flush = () => { if (buffer.length) { steps.push({ kind: "read", blocks: buffer }); buffer = []; } };
  for (const b of blocks) {
    if (b.type === "quiz") { flush(); steps.push({ kind: "quiz", block: b }); }
    else if (b.type === "interactive") { flush(); steps.push({ kind: "interactive", block: b }); }
    else buffer.push(b);
  }
  flush();
  return steps;
}

function openLesson(lessonId) {
  const ctx = findLesson(lessonId);
  lessonCtx = { ...ctx, steps: buildSteps(ctx.lesson.blocks), idx: 0, quizDone: {} };
  renderLessonStep();
  show("lesson");
}

function renderBlockHTML(b) {
  if (b.type === "text") return `<div class="block-text">${b.html}</div>`;
  if (b.type === "callout") return `<div class="callout ${b.variant}">${b.html}</div>`;
  return "";
}

function renderLessonStep() {
  const { lesson, steps, idx, level, chap } = lessonCtx;
  const step = steps[idx];
  const pct = Math.round(((idx) / steps.length) * 100);
  const last = idx === steps.length - 1;

  let body = "";
  if (step.kind === "read") {
    body = `<div class="kicker">${chap.title}</div><h2>${lesson.title}</h2>${step.blocks.map(renderBlockHTML).join("")}`;
  } else if (step.kind === "interactive") {
    body = `<div class="kicker">${chap.title}</div><h2>${lesson.title}</h2><div id="widgetHost"></div>`;
  } else if (step.kind === "quiz") {
    const q = step.block;
    body = `<div class="kicker">Quick check</div>
      <div class="quiz">
        <div class="q">${q.q}</div>
        <div class="quiz-grid" id="quizGrid">
          ${q.options.map((opt, i) => {
            const styles = ["red","blue","yellow","green"]; const shapes = ["▲","◆","●","■"];
            return `<button class="q-tile ${styles[i]}" data-i="${i}"><span class="shape">${shapes[i]}</span><span>${opt}</span></button>`;
          }).join("")}
        </div>
        <div class="quiz-feedback" id="quizFb"></div>
      </div>`;
  }

  const answeredThisQuiz = step.kind === "quiz" ? lessonCtx.quizDone[idx] : true;

  screens.lesson.innerHTML = `
    <div class="lesson-top">
      <button class="btn-back" id="lessonBack">← ${chap.title}</button>
      <div class="lesson-progress"><div style="width:${pct}%"></div></div>
      <div class="step-count">${idx + 1}/${steps.length}</div>
      <button class="btn-back" id="askClaude" title="Tanya Claude tentang lesson ini">🤖 Tanya</button>
    </div>
    <div class="lesson-card">${body}</div>
    <div class="lesson-nav">
      <button class="btn btn-ghost" id="prevBtn" ${idx === 0 ? "style='visibility:hidden'" : ""}>← Back</button>
      <button class="btn btn-primary" id="nextBtn" ${answeredThisQuiz ? "" : "disabled"}>${last ? "Finish lesson 🎉" : "Continue →"}</button>
    </div>`;

  document.getElementById("lessonBack").addEventListener("click", () => openChapter(level.id, chap.id));
  document.getElementById("askClaude").addEventListener("click", () => {
    const question = window.prompt("Mau tanya apa tentang lesson ini? (dikirim ke Claude dengan konteks lengkap)");
    if (question === null) return;
    const ctx = `Saya sedang belajar di Cashlo AI Academy (app belajar AI saya).\nLevel: ${level.title}\nChapter: ${chap.title}\nLesson: "${lesson.title}" (step ${idx + 1}/${steps.length}).\n\nTolong jawab dengan penjelasan yang jelas + visual/diagram kalau membantu.\nPertanyaan saya: ${question || "Tolong jelaskan lesson ini lebih dalam dengan contoh."}`;
    window.open("https://claude.ai/new?q=" + encodeURIComponent(ctx), "_blank");
  });
  document.getElementById("prevBtn").addEventListener("click", () => { lessonCtx.idx--; renderLessonStep(); });
  document.getElementById("nextBtn").addEventListener("click", () => {
    if (last) finishLesson();
    else { lessonCtx.idx++; renderLessonStep(); }
  });

  if (step.kind === "interactive" && step.block.widget === "fitLine") initFitLine();
  if (step.kind === "interactive" && step.block.widget === "gradientDescent") initGradientDescent();
  if (step.kind === "quiz") wireQuiz(step.block);
}

function wireQuiz(q) {
  const grid = document.getElementById("quizGrid");
  const fb = document.getElementById("quizFb");
  const tiles = [...grid.querySelectorAll(".q-tile")];
  const alreadyAnswered = lessonCtx.quizDone[lessonCtx.idx];

  if (alreadyAnswered) {
    tiles.forEach((t, i) => { t.disabled = true; if (i === q.answer) t.classList.add("reveal"); });
    fb.className = "quiz-feedback ok show";
    fb.innerHTML = `<b>✓ Correct:</b> ${q.explain}`;
    return;
  }

  tiles.forEach(tile => tile.addEventListener("click", () => {
    const pick = +tile.dataset.i;
    tiles.forEach(t => t.disabled = true);
    if (pick === q.answer) {
      tile.classList.add("correct");
      fb.className = "quiz-feedback ok show";
      fb.innerHTML = `<b>✓ Correct!</b> ${q.explain}`;
      state.xp += 10; save(); renderTopbar();
      burstConfetti(18);
    } else {
      tile.classList.add("wrong");
      tiles[q.answer].classList.add("reveal");
      fb.className = "quiz-feedback no show";
      fb.innerHTML = `<b>Not quite.</b> ${q.explain}`;
    }
    lessonCtx.quizDone[lessonCtx.idx] = true;
    document.getElementById("nextBtn").disabled = false;
  }));
}

/* ---------- finishing a lesson ---------- */
function finishLesson() {
  const id = lessonCtx.lesson.id;
  const firstTime = !state.completed.includes(id);
  if (firstTime) { state.completed.push(id); state.xp += 20; }
  // daily + streak
  state.daily.lessons++;
  const goal = GOAL[state.habit];
  let streakUp = false;
  if (state.daily.lessons >= goal && state.streak.lastCredit !== todayStr()) {
    state.streak.count = (state.streak.lastCredit === yesterdayStr()) ? state.streak.count + 1 : 1;
    state.streak.lastCredit = todayStr();
    state.streak.longest = Math.max(state.streak.longest, state.streak.count);
    streakUp = true;
  }
  // Did this lesson just complete a whole level? -> certificate moment.
  let doneLevel = null;
  if (firstTime) {
    const fl = findLesson(id);
    if (fl && levelComplete(fl.level)) doneLevel = fl.level;
  }
  save(); renderTopbar();
  if (doneLevel) showCertificate(doneLevel);
  else celebrate(firstTime, streakUp);
}

/* ---------- certificate (on completing a whole level) ---------- */
function showCertificate(level) {
  if (!state.userName) {
    const n = (typeof prompt === "function") ? prompt("Nama kamu untuk sertifikat:", "") : "";
    state.userName = (n && n.trim()) ? n.trim() : "Pelajar";
    save();
  }
  document.getElementById("certName").textContent = state.userName;
  document.getElementById("certLevel").textContent = level.title;
  document.getElementById("certDate").textContent =
    new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  document.getElementById("certOverlay").classList.add("show");
  burstConfetti(140);
}

/* ---------- celebration ---------- */
function celebrate(firstTime, streakUp) {
  const el = document.getElementById("celebrate");
  const goalMet = state.daily.lessons >= GOAL[state.habit];
  document.getElementById("celBig").textContent = streakUp ? "🔥" : "🎉";
  document.getElementById("celTitle").textContent = streakUp ? `${state.streak.count}-day streak!` : "Lesson complete!";
  document.getElementById("celMsg").innerHTML = firstTime
    ? `+20 XP earned.${goalMet ? " Today's habit is done — see you tomorrow to keep the streak alive." : ` ${GOAL[state.habit] - state.daily.lessons} more to hit today's goal.`}`
    : `Nice review. ${goalMet ? "Today's goal already met!" : ""}`;
  el.classList.add("show");
  burstConfetti(80);
}

/* ---------- confetti ---------- */
const confettiCanvas = document.getElementById("confetti");
const cctx = confettiCanvas.getContext("2d");
let parts = [];
function sizeConfetti() { confettiCanvas.width = innerWidth; confettiCanvas.height = innerHeight; }
addEventListener("resize", sizeConfetti); sizeConfetti();
function burstConfetti(n) {
  const colors = ["#6c5ce7", "#e6486a", "#f5a623", "#18b07b", "#2f6fed"];
  for (let i = 0; i < n; i++) parts.push({
    x: innerWidth / 2, y: innerHeight / 3,
    vx: (Math.random() - 0.5) * 12, vy: Math.random() * -10 - 3,
    g: 0.4, s: Math.random() * 7 + 4, c: colors[i % colors.length], life: 90, rot: Math.random() * 6
  });
  if (parts.length) runConfetti();
}
let rafOn = false;
function runConfetti() {
  if (rafOn) return; rafOn = true;
  (function frame() {
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    parts.forEach(p => { p.vy += p.g; p.x += p.vx; p.y += p.vy; p.life--; p.rot += 0.2;
      cctx.save(); cctx.translate(p.x, p.y); cctx.rotate(p.rot);
      cctx.fillStyle = p.c; cctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s); cctx.restore(); });
    parts = parts.filter(p => p.life > 0 && p.y < innerHeight + 30);
    if (parts.length) requestAnimationFrame(frame); else { rafOn = false; cctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height); }
  })();
}

/* ---------- interactive: fit the line ---------- */
function initFitLine() {
  const host = document.getElementById("widgetHost");
  host.innerHTML = `
    <div class="callout story" style="margin-top:0"><span class="lab">🎮 Fit the line</span>Move the sliders so the purple line hugs the dots. Smaller error = better fit.</div>
    <div class="fitline">
      <canvas id="flCanvas" width="640" height="300"></canvas>
      <div class="fl-controls">
        <div><label>Slope (m): <span id="mVal">1.0</span></label><input type="range" id="mSlide" min="0" max="4" step="0.1" value="1"></div>
        <div><label>Start (b): <span id="bVal">10</span></label><input type="range" id="bSlide" min="0" max="80" step="2" value="10"></div>
      </div>
      <div class="fl-error" id="flErr"></div>
    </div>`;

  // sample: foot traffic (x) vs revenue in Rp x10k (y).  true relation ≈ 1.8x + 28
  const data = [[22,70],[30,82],[38,95],[45,110],[52,118],[60,138],[68,150],[76,165],[85,182],[95,205]];
  const cv = document.getElementById("flCanvas");
  const ctx = cv.getContext("2d");
  const W = cv.width, H = cv.height, pad = 40;
  const xmax = 100, ymax = 240;
  const X = x => pad + (x / xmax) * (W - pad * 1.4);
  const Y = y => H - pad - (y / ymax) * (H - pad * 1.6);

  function draw(m, b) {
    ctx.clearRect(0, 0, W, H);
    // axes
    ctx.strokeStyle = "#dfe0f0"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad, H - pad); ctx.lineTo(W - 10, H - pad); ctx.moveTo(pad, H - pad); ctx.lineTo(pad, 14); ctx.stroke();
    ctx.fillStyle = "#9396b5"; ctx.font = "12px Segoe UI";
    ctx.fillText("foot traffic →", W - 110, H - pad + 24);
    ctx.save(); ctx.translate(14, 90); ctx.rotate(-Math.PI/2); ctx.fillText("revenue →", 0, 0); ctx.restore();
    // line
    ctx.strokeStyle = "#6c5ce7"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(X(0), Y(b)); ctx.lineTo(X(xmax), Y(m * xmax + b)); ctx.stroke();
    // error sticks + points
    let sse = 0;
    data.forEach(([x, y]) => {
      const pred = m * x + b; sse += (y - pred) ** 2;
      ctx.strokeStyle = "rgba(230,72,106,.5)"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(X(x), Y(y)); ctx.lineTo(X(x), Y(pred)); ctx.stroke();
      ctx.fillStyle = "#1f2140"; ctx.beginPath(); ctx.arc(X(x), Y(y), 5, 0, 7); ctx.fill();
    });
    const rmse = Math.sqrt(sse / data.length);
    const errEl = document.getElementById("flErr");
    errEl.innerHTML = `Error (avg miss): <b>${rmse.toFixed(1)}</b>`;
    if (rmse < 8) { errEl.classList.add("good"); errEl.innerHTML += " — great fit! 🎯"; }
    else errEl.classList.remove("good");
    return rmse;
  }

  const mS = document.getElementById("mSlide"), bS = document.getElementById("bSlide");
  let celebrated = false;
  function update() {
    const m = +mS.value, b = +bS.value;
    document.getElementById("mVal").textContent = m.toFixed(1);
    document.getElementById("bVal").textContent = b;
    const rmse = draw(m, b);
    if (rmse < 8 && !celebrated) { celebrated = true; burstConfetti(30); }
  }
  mS.addEventListener("input", update); bS.addEventListener("input", update);
  update();
}

/* ---------- interactive: gradient descent machine ---------- */
function initGradientDescent() {
  const host = document.getElementById("widgetHost");
  host.innerHTML = `
    <div class="callout story" style="margin-top:0"><span class="lab">🎮 The error valley</span>The curve is the model's ERROR. The ball is the current weight. Pick a learning rate, press <b>Step</b> — reach the bottom (error &lt; 45) without exploding!</div>
    <div class="fitline">
      <canvas id="gdCanvas" width="640" height="300"></canvas>
      <div class="fl-controls">
        <div><label>Learning rate: <span id="lrVal">0.10</span></label><input type="range" id="lrSlide" min="0.02" max="1.10" step="0.02" value="0.10"></div>
        <div style="display:flex;gap:10px;align-items:flex-end">
          <button class="btn btn-primary" id="gdStep" style="flex:1;padding:11px">⛷️ Step</button>
          <button class="btn btn-ghost" id="gdReset" style="padding:11px 16px">Reset</button>
        </div>
      </div>
      <div class="fl-error" id="gdErr"></div>
    </div>`;

  const cv = document.getElementById("gdCanvas"), ctx = cv.getContext("2d");
  const W = cv.width, H = cv.height;
  const f = x => 8 * (x - 3) ** 2 + 40;          // error valley, min at x=3 (error 40)
  const df = x => 16 * (x - 3);                  // its derivative
  const X = x => 60 + (x / 6.5) * (W - 90);
  const Y = e => H - 30 - ((e - 20) / 420) * (H - 60);
  let x = 0.4, steps = 0, done = false;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = "#dfe0f0"; ctx.beginPath(); ctx.moveTo(40, H - 30); ctx.lineTo(W - 10, H - 30); ctx.stroke();
    ctx.strokeStyle = "#7c4a63"; ctx.lineWidth = 3; ctx.beginPath();
    for (let xx = 0; xx <= 6.5; xx += 0.05) { const px = X(xx), py = Y(f(xx)); xx === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); }
    ctx.stroke();
    // minimum marker
    ctx.fillStyle = "#0f7a63"; ctx.font = "12px Segoe UI"; ctx.fillText("⬇ minimum", X(3) - 30, Y(40) + 24);
    // ball
    const e = f(x);
    ctx.fillStyle = "#c2543f"; ctx.beginPath(); ctx.arc(X(x), Y(e) - 8, 9, 0, 7); ctx.fill();
    const errEl = document.getElementById("gdErr");
    if (e > 1500) { errEl.innerHTML = `💥 <b>DIVERGED!</b> Error exploded after ${steps} steps — learning rate too big. Reset & try smaller.`; errEl.classList.remove("good"); done = true; }
    else if (e < 45) { errEl.innerHTML = `🎯 <b>Converged in ${steps} steps!</b> Error = ${e.toFixed(1)}. That's gradient descent.`; errEl.classList.add("good"); if (!done) { done = true; burstConfetti(40); } }
    else { errEl.innerHTML = `weight x = <b>${x.toFixed(2)}</b> · error = <b>${e.toFixed(1)}</b> · steps: ${steps}`; errEl.classList.remove("good"); }
  }
  document.getElementById("lrSlide").addEventListener("input", ev => document.getElementById("lrVal").textContent = (+ev.target.value).toFixed(2));
  document.getElementById("gdStep").addEventListener("click", () => {
    if (done) return;
    const lr = +document.getElementById("lrSlide").value;
    x = x - lr * df(x) / 6;                       // scaled: lr≈0.37 optimal, lr>0.75 diverges visibly
    steps++; draw();
  });
  document.getElementById("gdReset").addEventListener("click", () => { x = 0.4; steps = 0; done = false; draw(); });
  draw();
}

/* ---------- Latihan (practice / active recall) ---------- */
function collectPracticePool() {
  const pool = [];
  for (const L of CURRICULUM) for (const c of L.chapters) for (const les of c.lessons) {
    if (!state.completed.includes(les.id)) continue;
    for (const b of les.blocks) if (b.type === "quiz")
      pool.push({ q: b.q, options: b.options, answer: b.answer, explain: b.explain, from: c.title });
  }
  return pool;
}
let practiceCtx = null;
function startPractice() {
  const pool = collectPracticePool();
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  practiceCtx = { qs: pool.slice(0, 5), idx: 0, score: 0 };
  renderPracticeStep();
  show("lesson");
}
function renderPracticeStep() {
  const { qs, idx, score } = practiceCtx;
  if (idx >= qs.length) {
    const great = score >= Math.ceil(qs.length * 0.8);
    screens.lesson.innerHTML = `
      <div class="lesson-top">
        <button class="btn-back" id="prBack">← Home</button>
        <div class="lesson-progress"><div style="width:100%"></div></div>
        <div class="step-count">Selesai</div>
      </div>
      <div class="lesson-card" style="text-align:center">
        <div style="font-size:54px">${great ? "🏆" : "💪"}</div>
        <h2>Latihan selesai: ${score}/${qs.length}</h2>
        <p class="block-text" style="color:var(--ink-soft)">${great ? "Luar biasa — ingatanmu tajam!" : "Bagus! Soal yang salah bakal muncul lagi lain kali — begitulah otak belajar (active recall)."}</p>
        <button class="btn btn-primary" id="prDone" style="margin-top:18px">Kembali ke Home</button>
      </div>`;
    document.getElementById("prBack").addEventListener("click", goLearn);
    document.getElementById("prDone").addEventListener("click", goLearn);
    if (great) burstConfetti(60);
    return;
  }
  const q = qs[idx];
  const styles = ["red","blue","yellow","green"], shapes = ["▲","◆","●","■"];
  screens.lesson.innerHTML = `
    <div class="lesson-top">
      <button class="btn-back" id="prBack">← Keluar</button>
      <div class="lesson-progress"><div style="width:${Math.round(idx / qs.length * 100)}%"></div></div>
      <div class="step-count">🎲 ${idx + 1}/${qs.length}</div>
    </div>
    <div class="lesson-card">
      <div class="kicker">Latihan · dari: ${q.from}</div>
      <div class="quiz">
        <div class="q">${q.q}</div>
        <div class="quiz-grid" id="prGrid">
          ${q.options.map((opt, i) => `<button class="q-tile ${styles[i]}" data-i="${i}"><span class="shape">${shapes[i]}</span><span>${opt}</span></button>`).join("")}
        </div>
        <div class="quiz-feedback" id="prFb"></div>
      </div>
    </div>
    <div class="lesson-nav">
      <span></span>
      <button class="btn btn-primary" id="prNext" disabled>Lanjut →</button>
    </div>`;
  document.getElementById("prBack").addEventListener("click", goLearn);
  const tiles = [...document.querySelectorAll("#prGrid .q-tile")];
  const fb = document.getElementById("prFb");
  tiles.forEach(t => t.addEventListener("click", () => {
    const pick = +t.dataset.i;
    tiles.forEach(x => x.disabled = true);
    if (pick === q.answer) {
      t.classList.add("correct"); practiceCtx.score++;
      state.xp += 5; save(); renderTopbar();
      fb.className = "quiz-feedback ok show"; fb.innerHTML = `<b>✓ Benar! +5 XP.</b> ${q.explain}`;
      burstConfetti(12);
    } else {
      t.classList.add("wrong"); tiles[q.answer].classList.add("reveal");
      fb.className = "quiz-feedback no show"; fb.innerHTML = `<b>Belum tepat.</b> ${q.explain}`;
    }
    document.getElementById("prNext").disabled = false;
  }));
  document.getElementById("prNext").addEventListener("click", () => { practiceCtx.idx++; renderPracticeStep(); });
}

/* ---------- navigation ---------- */
function setNav(name) {
  document.getElementById("navLearn").classList.toggle("active", name === "learn");
  document.getElementById("navRoadmap").classList.toggle("active", name === "roadmap");
}
function goLearn() { setNav("learn"); renderHome(); show("home"); }
function goRoadmap() { setNav("roadmap"); renderRoadmap(); show("roadmap"); }

/* ---------- ROADMAP ---------- */
function renderRoadmap() {
  const total = CAREER_ROADMAP.length;
  const done = CAREER_ROADMAP.filter(m => state.roadmapDone.includes(m.id)).length;
  const pct = Math.round((done / total) * 100);

  let html = `
    <div class="eyebrow">The destination</div>
    <h1 class="page-h">Become a professional AI / ML / Prompt Engineer</h1>
    <p class="page-sub">Seven phases from today to a hireable engineer with a published paper. Each phase says what to <b>learn</b>, what to <b>build</b>, and how to <b>prove</b> it. Tick phases off as you finish — ${done}/${total} done (${pct}%).</p>
    <div class="todaybar" style="margin:18px 0 26px;max-width:420px"><div style="width:${pct}%"></div></div>
    <div class="road">
      <div class="road-line"></div>`;

  CAREER_ROADMAP.forEach(m => {
    const isDone = state.roadmapDone.includes(m.id);
    html += `
      <div class="milestone ${isDone ? "done" : ""}" data-ms="${m.id}">
        <div class="ms-dot">${isDone ? "✓" : m.icon}</div>
        <div class="ms-card">
          <div class="ms-head" data-toggle="${m.id}">
            <div>
              <div class="ms-phase">${m.phase} · ${m.time}</div>
              <div class="ms-title">${m.title}</div>
            </div>
            <button class="chk" data-check="${m.id}" title="Mark complete">✓</button>
            <span class="ms-toggle">▾</span>
          </div>
          <div class="ms-body">
            <div class="ms-grid">
              <div class="ms-col"><h4>📖 Learn</h4><ul>${m.learn.map(x => `<li>${x}</li>`).join("")}</ul></div>
              <div class="ms-col build"><h4>🛠️ Build</h4><ul>${m.build.map(x => `<li>${x}</li>`).join("")}</ul></div>
              <div class="ms-col prove"><h4>🎖️ Prove</h4><ul>${m.prove.map(x => `<li>${x}</li>`).join("")}</ul></div>
            </div>
          </div>
        </div>
      </div>`;
  });

  html += `</div>
    <div class="road-outcome">
      <div class="eyebrow">Outcome by graduation (2028)</div>
      <h3>A standout AI/ML engineer — not just a graduate</h3>
      <p>Published Sinta 4 research (skripsi-exempt), a real internship, competition record, a portfolio of 4+ shipped projects, and the prompt-engineering + MLOps skills companies actually pay for.</p>
    </div>`;

  screens.roadmap.innerHTML = html;

  // expand/collapse
  screens.roadmap.querySelectorAll("[data-toggle]").forEach(h =>
    h.addEventListener("click", e => {
      if (e.target.closest("[data-check]")) return;
      h.closest(".ms-card").classList.toggle("open");
    }));
  // check off
  screens.roadmap.querySelectorAll("[data-check]").forEach(b =>
    b.addEventListener("click", e => {
      e.stopPropagation();
      const id = b.dataset.check;
      const i = state.roadmapDone.indexOf(id);
      if (i >= 0) state.roadmapDone.splice(i, 1);
      else { state.roadmapDone.push(id); burstConfetti(24); }
      save(); renderRoadmap();
    }));
}

/* ---------- boot ---------- */
function boot() {
  screens.home = document.getElementById("screen-home");
  screens.chapter = document.getElementById("screen-chapter");
  screens.lesson = document.getElementById("screen-lesson");
  screens.roadmap = document.getElementById("screen-roadmap");
  document.getElementById("brandHome").addEventListener("click", goLearn);
  document.getElementById("navLearn").addEventListener("click", goLearn);
  document.getElementById("navRoadmap").addEventListener("click", goRoadmap);
  document.getElementById("celClose").addEventListener("click", () => {
    document.getElementById("celebrate").classList.remove("show");
    openChapter(lessonCtx.level.id, lessonCtx.chap.id);
  });
  document.getElementById("certPrint").addEventListener("click", () => window.print());
  document.getElementById("certClose").addEventListener("click", () => {
    document.getElementById("certOverlay").classList.remove("show");
    goLearn();
  });
  renderHome();
  show("home");
}
document.addEventListener("DOMContentLoaded", boot);
