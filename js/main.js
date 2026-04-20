import { elements } from './ui.js';
import { state, runSequence, pauseSequence, resumeSequence, resetSimulation } from './simulation.js';
import { initModal } from './modal.js';
initModal();
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
