import { elements } from './ui.js';

let masterDemoTL = null;
let flowTweens = [];

export let state = {
  isRunning: false,
  sequenceFinished: false
};

function buildDemoTimeline() {
  if (masterDemoTL) {
    masterDemoTL.kill();
  }
  flowTweens.forEach(t => t.kill());
  flowTweens = [];

  masterDemoTL = gsap.timeline({
    paused: true,
    onComplete: () => {
      state.sequenceFinished = true;
      elements.btnPlayPause.disabled = false;
      elements.btnPlayPause.textContent = 'Process Complete';
      elements.btnPlayPause.style.background = '#10b981';
      elements.btnPlayPause.disabled = true; // Block playback once finished
    }
  });

  // Step 1: Green fill and barren liquid
  masterDemoTL.to('#green-fill-overlay', { strokeDashoffset: 0, duration: 4, ease: 'none' }, 0);
  masterDemoTL.to('#barren-liquid', { attr: { y: 380, height: 120 }, duration: 4, ease: 'power2.inOut' }, 0);
  
  // Step 2: Ore interaction
  masterDemoTL.to('#ore-color-fill', { opacity: 0.85, duration: 1, ease: 'power2.inOut' }, 4);
  
  // Step 3: Orange fill
  masterDemoTL.to('#orange-fill-overlay', { strokeDashoffset: 0, duration: 1, ease: 'none' }, 5);
  
  // Step 4: Pregnant liquid filling
  masterDemoTL.to('#pregnant-liquid', { attr: { y: 350, height: 150 }, duration: 4, ease: 'power2.inOut' }, 6);
  
  // Step 5: Continuous flow loop starts
  masterDemoTL.add(() => {
    // This callback is triggered when we surpass time=10s
    // If not seeking backwards:
    gsap.to('.continuous-flow', { opacity: 1, duration: 0.5 });
    
    // Green flow 
    flowTweens.push(
      gsap.to('.flow-green', { strokeDashoffset: '-=40', duration: 3, ease: 'none', repeat: -1 })
    );
    // Orange flow
    flowTweens.push(
      gsap.to('.flow-orange', { strokeDashoffset: '-=40', duration: 3.6, ease: 'none', repeat: -1 })
    );
  }, 10);

  return masterDemoTL;
}

export function runSequence() {
  if (state.isRunning) return;
  state.isRunning = true;
  
  if (!state.sequenceFinished) {
    elements.btnPlayPause.textContent = 'Pause Flow';
    
    if (!masterDemoTL) {
      buildDemoTimeline();
    }
    masterDemoTL.play();
    flowTweens.forEach(t => t.play());
  }
}

export function pauseSequence() {
  if (!state.sequenceFinished) {
    state.isRunning = false;
    if (masterDemoTL) masterDemoTL.pause();
    flowTweens.forEach(t => t.pause());
    elements.btnPlayPause.textContent = 'Resume Flow';
    elements.btnPlayPause.style.background = '#64748b';
  }
}

export function resumeSequence() {
  if (!state.sequenceFinished) {
    state.isRunning = true;
    if (masterDemoTL) masterDemoTL.play();
    flowTweens.forEach(t => t.play());
    elements.btnPlayPause.textContent = 'Pause Flow';
    elements.btnPlayPause.style.background = 'var(--primary)';
  }
}

export function resetSimulation() {
  state.isRunning = false;
  state.sequenceFinished = false;
  
  if (masterDemoTL) {
    masterDemoTL.pause(0); // Reset playhead to the beginning
    masterDemoTL.kill();
    masterDemoTL = null;
  }
  flowTweens.forEach(t => t.kill());
  flowTweens = [];
  
  elements.btnPlayPause.disabled = false;
  elements.btnPlayPause.textContent = 'Start Process';
  elements.btnPlayPause.style.background = 'var(--primary)';
  
  // Reset elements to initial states using GSAP
  gsap.set('#green-fill-overlay', { strokeDashoffset: 1000 });
  gsap.set('#orange-fill-overlay', { strokeDashoffset: 1000 });
  gsap.set('#barren-liquid', { attr: { y: 250, height: 250 } });
  gsap.set('#pregnant-liquid', { attr: { y: 500, height: 0 } });
  gsap.set('#ore-color-fill', { opacity: 0 });
  gsap.set('.continuous-flow', { opacity: 0 });
}
