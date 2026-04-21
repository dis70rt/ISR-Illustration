import { elements } from './ui.js';
import { state, runSequence, pauseSequence, resumeSequence, resetSimulation } from './simulation.js';
import { initModal } from './modal.js';
import { initProduction, resetProduction } from './production-timeline.js';

initModal();
initProduction();

export let currentMode = 'demo';
elements.labelDemo.classList.add('active');

const demoControls = document.getElementById('demo-controls');
const prodControls = document.getElementById('prod-controls');
const narrationCard = document.getElementById('narration-card');

elements.modeToggle.addEventListener('change', (e) => {
  resetSimulation(); // ensure clean demo state
  currentMode = e.target.checked ? 'production' : 'demo';
  
  if (currentMode === 'demo') {
    elements.svgContainer.style.display = 'block';
    elements.prodContainer.style.display = 'none';
    elements.labelDemo.classList.add('active');
    elements.labelProd.classList.remove('active');
    demoControls.style.display = '';
    prodControls.style.display = 'none';
    narrationCard.style.display = 'none';
  } else {
    elements.svgContainer.style.display = 'none';
    elements.prodContainer.style.display = 'block';
    elements.labelProd.classList.add('active');
    elements.labelDemo.classList.remove('active');
    demoControls.style.display = 'none';
    prodControls.style.display = '';
    narrationCard.style.display = '';
    resetProduction();
  }
});

elements.btnPlayPause.addEventListener('click', () => {
  if (!state.isRunning && !state.sequenceFinished) {
    runSequence();
  } else if (state.isRunning) {
    pauseSequence();
  } else {
    resumeSequence();
  }
});
elements.btnRestart.addEventListener('click', resetSimulation);
