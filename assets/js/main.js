// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Toggle Game Mode
const overlay = document.getElementById('overlay');
const openGame = document.getElementById('openGame');
const closeGame = document.getElementById('closeGame');
const skipGame = document.getElementById('skipGame');

openGame.addEventListener('click', () => {
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
});
closeGame.addEventListener('click', () => {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
});
skipGame.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
});
window.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape' && overlay.classList.contains('open')) closeGame.click();
});

// Simple RPS logic (one round unlocks links either way)
let humanScore = 0, computerScore = 0;
const log = document.getElementById('log');
const moves = Array.from(document.querySelectorAll('.moves button'));
const toProjects = document.getElementById('toProjects');
const toWriting  = document.getElementById('toWriting');

function computerChoice(){
  return ['rock','paper','scissors'][Math.floor(Math.random()*3)];
}
function winner(h, c){
  if (h===c) return 'tie';
  if ((h==='rock'&&c==='scissors')||(h==='paper'&&c==='rock')||(h==='scissors'&&c==='paper')) return 'you';
  return 'computer';
}
moves.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const h = btn.dataset.move;
    const c = computerChoice();
    const w = winner(h,c);
    if (w==='you') humanScore++; else if (w==='computer') computerScore++;
    log.textContent = `You chose ${h}. Computer chose ${c}. Result: ${w}. Score ${humanScore}-${computerScore}. Links unlocked below.`;
    toProjects.classList.remove('disabled');
    toWriting.classList.remove('disabled');
  });
});
/* ===== Utility: set copyright year ===== */
document.addEventListener('DOMContentLoaded', () => {
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
});

/* ===== Make any article.card with data-primary-href open on background click ===== */
document.addEventListener('click', (e) => {
  const card = e.target.closest('article.card[data-primary-href]');
  if (!card) return;

  // If user clicked a real interactive element, let it behave normally
  if (e.target.closest('a, button, input, textarea, select')) return;

  const url = card.getAttribute('data-primary-href');
  if (url) window.open(url, '_blank', 'noopener');
});

/* ===== Simple Game Mode overlay wiring (open/close/skip) ===== */
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const openBtn = document.getElementById('openGame');
  const closeBtn = document.getElementById('closeGame');
  const skipLink = document.getElementById('skipGame');
  const toProjects = document.getElementById('toProjects');
  const toWriting = document.getElementById('toWriting');
  const log = document.getElementById('log');

  const show = () => { if (overlay) { overlay.setAttribute('aria-hidden', 'false'); overlay.classList.add('open'); } };
  const hide = () => { if (overlay) { overlay.setAttribute('aria-hidden', 'true'); overlay.classList.remove('open'); } };

  if (openBtn) openBtn.addEventListener('click', show);
  if (closeBtn) closeBtn.addEventListener('click', hide);
  if (skipLink) skipLink.addEventListener('click', (e) => { e.preventDefault(); hide(); });

  // Very lightweight RPS logic
  const movesWrap = document.querySelector('.moves');
  const moves = ['rock','paper','scissors'];
  const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

  if (movesWrap && log) {
    movesWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-move]');
      if (!btn) return;
      const you = btn.dataset.move;
      const cpu = moves[Math.floor(Math.random() * moves.length)];
      let result = 'Tie!';
      if (beats[you] === cpu) result = 'You win!';
      else if (beats[cpu] === you) result = 'CPU wins!';
      log.textContent = `You: ${you} • CPU: ${cpu} → ${result}`;
    });
  }

  // Nav buttons inside overlay
  if (toProjects) toProjects.addEventListener('click', hide);
  if (toWriting) toWriting.addEventListener('click', hide);
});

