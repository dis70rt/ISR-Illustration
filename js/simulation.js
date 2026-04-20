import { elements, delay } from './ui.js';
export let state = {
  isRunning: false,
  sequenceFinished: false
};
export async function runSequence() {
  if (state.isRunning) return;
  state.isRunning = true;
  
  if (!state.sequenceFinished) {
    elements.btnPlayPause.disabled = true;
    elements.btnPlayPause.textContent = 'Sequencing...';
    elements.greenFillOverlay.classList.add('pipe-filling');
    elements.barrenLiquid.setAttribute('y', '380');
    elements.barrenLiquid.setAttribute('height', '120');
    await delay(4000);
    elements.oreColorFill.classList.add('active');
    await delay(1000);
    elements.orangeFillOverlay.classList.add('pipe-filling-fast');
    await delay(1000);
    elements.pregnantLiquid.setAttribute('y', '350');
    elements.pregnantLiquid.setAttribute('height', '150');
    await delay(4000);
    elements.continuousFlows.forEach(el => el.classList.add('active'));
    state.sequenceFinished = true;
  }
  elements.btnPlayPause.disabled = false;
  elements.btnPlayPause.textContent = 'Pause Flow';
  elements.svgContainer.classList.remove('paused');
}
export function pauseSequence() {
  if (state.sequenceFinished) {
    state.isRunning = false;
    elements.svgContainer.classList.add('paused');
    elements.btnPlayPause.textContent = 'Resume Flow';
    elements.btnPlayPause.style.background = '#64748b';
  }
}
export function resumeSequence() {
  if (state.sequenceFinished) {
    state.isRunning = true;
    elements.svgContainer.classList.remove('paused');
    elements.btnPlayPause.textContent = 'Pause Flow';
    elements.btnPlayPause.style.background = 'var(--primary)';
  } else {
    runSequence();
  }
}
export function resetSimulation() {
  state.isRunning = false;
  state.sequenceFinished = false;
  
  elements.btnPlayPause.disabled = false;
  elements.btnPlayPause.textContent = 'Start Process';
  elements.btnPlayPause.style.background = 'var(--primary)';
  elements.greenFillOverlay.classList.remove('pipe-filling');
  elements.orangeFillOverlay.classList.remove('pipe-filling-fast', 'pipe-filling');
  
  elements.barrenLiquid.style.transition = 'none';
  elements.pregnantLiquid.style.transition = 'none';
  
  elements.barrenLiquid.setAttribute('y', '250');
  elements.barrenLiquid.setAttribute('height', '250');
  
  elements.pregnantLiquid.setAttribute('y', '500');
  elements.pregnantLiquid.setAttribute('height', '0');
  
  elements.barrenLiquid.offsetHeight; 
  
  elements.barrenLiquid.style.transition = '';
  elements.pregnantLiquid.style.transition = '';
  
  elements.oreColorFill.classList.remove('active');
  elements.oreColorFill.style.opacity = '';
  
  elements.continuousFlows.forEach(el => el.classList.remove('active'));
  elements.svgContainer.classList.remove('paused');
}
