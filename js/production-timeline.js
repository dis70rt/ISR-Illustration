/**
 * production-timeline.js
 * Master GSAP timeline for the 5-step ISR Production animation.
 * Coordinates are pixel-matched to the rebuilt SVG in index.html.
 */

const STEP_DATA = [
  {
    num: 0,
    title: 'Ready',
    description: 'Press "Next Step" to begin the ISR (In-Situ Recovery) walkthrough. Each step reveals a stage of the uranium mining process.'
  },
  {
    num: 1,
    title: 'Step 1 — Surface Plant Preparation',
    description: 'Mild acid or bicarbonate solution is stored in tanks and mixed with water and oxidants in the MIXER to create the Barren Lixiviant — a fortified solution designed to dissolve uranium from sandstone. Injection pumps pressurise the fluid for transport underground.'
  },
  {
    num: 2,
    title: 'Step 2 — Down the Injection Well',
    description: 'The pressurised Barren Lixiviant is pumped DOWN the injection well, through the impermeable Upper Confining Layer (shale), and into the permeable Ore Body Aquifer (porous sandstone) below.'
  },
  {
    num: 3,
    title: 'Step 3 — The Leaching Zone',
    description: 'Inside the aquifer, the lixiviant flows laterally through the porous sandstone, dissolving uranium minerals. A "Cone of Depression" forms as uranium-enriched Pregnant Leach Solution (PLS) migrates toward the recovery well.'
  },
  {
    num: 4,
    title: 'Step 4 — Up the Recovery Well',
    description: 'Submersible pumps draw the uranium-rich Pregnant Leach Solution (PLS) back UP through the recovery well to the surface for processing.'
  },
  {
    num: 5,
    title: 'Step 5 — Extraction & Recycling',
    description: 'The PLS enters the Processing Facility where Ion Exchange and Solvent Extraction strip out the uranium. The stripped Barren Lixiviant is recycled back to the mixer, completing the closed loop. Recovered minerals are dried and packaged as yellowcake (U₃O₈).'
  }
];

let masterTL = null;
let currentStep = 0;
let flowTweens = [];
let isTransitioning = false;

// DOM refs
const els = {
  narrationCard: document.getElementById('narration-card'),
  stepNum: document.getElementById('narration-step-num'),
  stepTitle: document.getElementById('narration-step-title'),
  narrationText: document.getElementById('narration-text'),
  btnNext: document.getElementById('btn-next-step'),
  btnPrev: document.getElementById('btn-prev-step'),
  btnReset: document.getElementById('btn-reset-prod'),
};

function updateNarration(step) {
  const data = STEP_DATA[step];
  els.stepNum.textContent = data.num === 0 ? '—' : data.num;
  els.stepTitle.textContent = data.title;
  els.narrationText.textContent = data.description;

  // Button states
  els.btnPrev.disabled = step <= 0;
  els.btnNext.disabled = step >= 5;
  if (step >= 5) {
    els.btnNext.textContent = 'Complete ✓';
    els.btnNext.style.background = '#16a34a';
  } else {
    els.btnNext.textContent = 'Next Step →';
    els.btnNext.style.background = '';
  }
}

function buildTimeline() {
  if (masterTL) {
    masterTL.kill();
  }
  // Kill lingering flow tweens
  flowTweens.forEach(t => t.kill());
  flowTweens = [];

  masterTL = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.out' }
  });

  // ═══════════ STEP 1: Surface Plant Preparation ═══════════
  masterTL.addLabel('step1', 0);

  // Step 1 callout
  masterTL.to('#prod-step1-box', { opacity: 1, duration: 0.6 }, 'step1');

  // Tanks appear with shadow
  masterTL.to('#prod-tanks', { opacity: 1, duration: 0.8, ease: 'power3.out' }, 'step1+=0.15');

  // Pumps appear
  masterTL.to('#prod-pumps', { opacity: 1, duration: 0.6 }, 'step1+=0.4');

  // Mixer appears
  masterTL.to('#prod-mixer', { opacity: 1, duration: 0.8, ease: 'back.out(1.4)' }, 'step1+=0.35');

  // Surface pipes (inside pump/mixer groups — just show the base pipes for continuity)
  masterTL.to('#prod-pipe-prep', { opacity: 0.8, duration: 0.4 }, 'step1+=0.6');
  masterTL.to('#prod-pipe-mix', { opacity: 0.8, duration: 0.4 }, 'step1+=0.8');

  masterTL.addLabel('step1end', '+=0.1');

  // ═══════════ STEP 2: Down the Injection Well ═══════════
  masterTL.addLabel('step2');

  // Step 2 callout
  masterTL.to('#prod-step2-box', { opacity: 1, duration: 0.6 }, 'step2');

  // Injection well casing appears
  masterTL.to('#prod-inj-casing', { opacity: 0.85, duration: 0.8, ease: 'power2.inOut' }, 'step2+=0.1');
  masterTL.to('#prod-inj-label', { opacity: 1, duration: 0.5 }, 'step2+=0.5');

  // Injection base pipe fades in
  masterTL.to('#prod-pipe-inject-base', { opacity: 0.3, duration: 0.5 }, 'step2+=0.2');

  // Animated fill (stroke reveal)
  masterTL.to('#prod-fill-inject', {
    strokeDashoffset: 0,
    duration: 2.5,
    ease: 'power1.inOut'
  }, 'step2+=0.5');

  // Start continuous dash flow
  masterTL.to('#prod-dash-inject', { opacity: 1, duration: 0.3 }, 'step2+=3.0');
  masterTL.add(() => {
    const t = gsap.to('#prod-dash-inject', {
      strokeDashoffset: '-=30',
      duration: 1.2,
      ease: 'none',
      repeat: -1
    });
    flowTweens.push(t);
  }, 'step2+=3.0');

  masterTL.addLabel('step2end', '+=0.1');

  // ═══════════ STEP 3: The Leaching Zone ═══════════
  masterTL.addLabel('step3');

  // Step 3 callout
  masterTL.to('#prod-step3-box', { opacity: 1, duration: 0.6 }, 'step3');

  // Mineral zone
  masterTL.to('#prod-mineral-zone', { opacity: 1, duration: 1.2, ease: 'power2.inOut' }, 'step3+=0.2');

  // Aquifer base pipe
  masterTL.to('#prod-pipe-aquifer-base', { opacity: 0.3, duration: 0.5 }, 'step3+=0.2');

  // Aquifer arrows & labels
  masterTL.to('#prod-aquifer-arrows', { opacity: 1, duration: 0.8 }, 'step3+=0.5');

  // Ore plume (cone of depression)
  masterTL.to('#prod-ore-plume', {
    opacity: 0.4,
    duration: 2.0,
    ease: 'power2.inOut'
  }, 'step3+=0.8');

  // Aquifer fill line
  masterTL.to('#prod-fill-aquifer', {
    strokeDashoffset: 0,
    duration: 2.5,
    ease: 'power1.inOut'
  }, 'step3+=1.0');

  // Continuous aquifer dash
  masterTL.to('#prod-dash-aquifer', { opacity: 1, duration: 0.3 }, 'step3+=3.5');
  masterTL.add(() => {
    const t = gsap.to('#prod-dash-aquifer', {
      strokeDashoffset: '-=30',
      duration: 1.5,
      ease: 'none',
      repeat: -1
    });
    flowTweens.push(t);
  }, 'step3+=3.5');

  masterTL.addLabel('step3end', '+=0.1');

  // ═══════════ STEP 4: Up the Recovery Well ═══════════
  masterTL.addLabel('step4');

  // Step 4 callout
  masterTL.to('#prod-step4-box', { opacity: 1, duration: 0.6 }, 'step4');

  // Recovery well casing
  masterTL.to('#prod-rec-casing', { opacity: 0.85, duration: 0.8, ease: 'power2.inOut' }, 'step4+=0.1');
  masterTL.to('#prod-rec-label', { opacity: 1, duration: 0.5 }, 'step4+=0.5');

  // Recovery base pipe
  masterTL.to('#prod-pipe-recover-base', { opacity: 0.3, duration: 0.5 }, 'step4+=0.2');

  // Recovery fill
  masterTL.to('#prod-fill-recover', {
    strokeDashoffset: 0,
    duration: 2.0,
    ease: 'power1.inOut'
  }, 'step4+=0.5');

  // PLS label
  masterTL.to('#prod-pls-label', { opacity: 1, duration: 0.6 }, 'step4+=1.5');

  // Continuous recovery dash
  masterTL.to('#prod-dash-recover', { opacity: 1, duration: 0.3 }, 'step4+=2.5');
  masterTL.add(() => {
    const t = gsap.to('#prod-dash-recover', {
      strokeDashoffset: '-=30',
      duration: 1.2,
      ease: 'none',
      repeat: -1
    });
    flowTweens.push(t);
  }, 'step4+=2.5');

  masterTL.addLabel('step4end', '+=0.1');

  // ═══════════ STEP 5: Extraction & Recycling ═══════════
  masterTL.addLabel('step5');

  // Step 5 callout
  masterTL.to('#prod-step5-box', { opacity: 1, duration: 0.6 }, 'step5');

  // Processing facility
  masterTL.to('#prod-facility', { opacity: 1, duration: 1.0, ease: 'power3.out' }, 'step5+=0.2');

  // Return base pipe
  masterTL.to('#prod-pipe-return-base', { opacity: 0.3, duration: 0.5 }, 'step5+=0.5');

  // Return fill
  masterTL.to('#prod-fill-return', {
    strokeDashoffset: 0,
    duration: 2.0,
    ease: 'power1.inOut'
  }, 'step5+=0.7');

  // Barren Lixiviant label
  masterTL.to('#prod-barren-label', { opacity: 1, duration: 0.5 }, 'step5+=1.5');

  // Continuous return dash
  masterTL.to('#prod-dash-return', { opacity: 1, duration: 0.3 }, 'step5+=2.7');
  masterTL.add(() => {
    const t = gsap.to('#prod-dash-return', {
      strokeDashoffset: '-=20',
      duration: 1.5,
      ease: 'none',
      repeat: -1
    });
    flowTweens.push(t);
  }, 'step5+=2.7');

  masterTL.addLabel('step5end', '+=0.1');

  return masterTL;
}

export function nextStep() {
  if (currentStep >= 5 || isTransitioning) return;
  isTransitioning = true;
  currentStep++;
  const endLabel = `step${currentStep}end`;
  updateNarration(currentStep);

  masterTL.tweenTo(masterTL.labels[endLabel], {
    ease: 'none',
    onComplete: () => { isTransitioning = false; }
  });
}

export function prevStep() {
  if (currentStep <= 0 || isTransitioning) return;
  isTransitioning = true;

  // Kill active flow tweens before reversing
  flowTweens.forEach(t => t.kill());
  flowTweens = [];

  const label = `step${currentStep}`;
  masterTL.tweenTo(masterTL.labels[label], {
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      currentStep--;
      updateNarration(currentStep);
      isTransitioning = false;
    }
  });
}

export function resetProduction() {
  currentStep = 0;
  isTransitioning = false;

  // Kill flow tweens
  flowTweens.forEach(t => t.kill());
  flowTweens = [];

  if (masterTL) {
    masterTL.pause(0);
    masterTL.kill();
  }

  // Reset all SVG elements to initial state
  const allAnimatedEls = [
    '#prod-step1-box', '#prod-step2-box', '#prod-step3-box',
    '#prod-step4-box', '#prod-step5-box',
    '#prod-tanks', '#prod-pumps', '#prod-mixer', '#prod-facility',
    '#prod-pipe-prep', '#prod-pipe-mix',
    '#prod-inj-casing', '#prod-rec-casing',
    '#prod-inj-label', '#prod-rec-label',
    '#prod-mineral-zone', '#prod-ore-plume',
    '#prod-aquifer-arrows', '#prod-pls-label', '#prod-barren-label',
    '#prod-dash-inject', '#prod-dash-aquifer', '#prod-dash-recover', '#prod-dash-return',
    '#prod-pipe-inject-base', '#prod-pipe-aquifer-base',
    '#prod-pipe-recover-base', '#prod-pipe-return-base'
  ];
  gsap.set(allAnimatedEls, { opacity: 0, clearProps: 'strokeDashoffset' });

  gsap.set('#prod-fill-inject', { strokeDashoffset: 1200 });
  gsap.set(['#prod-fill-aquifer', '#prod-fill-recover', '#prod-fill-return'], { strokeDashoffset: 800 });

  // Rebuild
  buildTimeline();
  updateNarration(0);
}

export function initProduction() {
  buildTimeline();
  updateNarration(0);

  els.btnNext.addEventListener('click', nextStep);
  els.btnPrev.addEventListener('click', prevStep);
  els.btnReset.addEventListener('click', resetProduction);
}
