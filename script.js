// Simulation State
let isRunning = false;
let sequenceFinished = false;
let typewriterTimeout = null;

// DOM Elements
const svgContainer = document.getElementById('diagram');
const btnPlayPause = document.getElementById('btn-play-pause');
const btnRestart = document.getElementById('btn-restart');

// Animation Targets
const greenFillOverlay = document.getElementById('green-fill-overlay');
const orangeFillOverlay = document.getElementById('orange-fill-overlay');
const barrenLiquid = document.getElementById('barren-liquid');
const pregnantLiquid = document.getElementById('pregnant-liquid');
const oreColorFill = document.getElementById('ore-color-fill');

const continuousFlows = document.querySelectorAll('.continuous-flow');

// Helper for delays
const delay = ms => new Promise(res => setTimeout(res, ms));

// Sequence Logic
async function runSequence() {
  if (isRunning) return;
  isRunning = true;
  
  if (!sequenceFinished) {
    btnPlayPause.disabled = true;
    btnPlayPause.textContent = 'Sequencing...';

    // Step 1: Fill Green Pipe & Drain Barren Tank
    greenFillOverlay.classList.add('pipe-filling');
    barrenLiquid.setAttribute('y', '380');
    barrenLiquid.setAttribute('height', '120');
    await delay(4000); // Fast initial fill

    // Step 2: Form Pregnant Liquid in Ore (Greenish Yellow overlay) - RAPID
    oreColorFill.classList.add('active');
    await delay(1000);

    // Step 3: Draw out through Orange Pipe - RAPID
    orangeFillOverlay.classList.add('pipe-filling-fast');
    await delay(1000);

    // Step 4: Fill Pregnant Tank
    pregnantLiquid.setAttribute('y', '350');
    pregnantLiquid.setAttribute('height', '150');
    await delay(4000);

    // Finish sequence, start continuous flow indicator dashes
    continuousFlows.forEach(el => el.classList.add('active'));
    sequenceFinished = true;
  }

  // Allow pausing of the continuous flow at the end
  btnPlayPause.disabled = false;
  btnPlayPause.textContent = 'Pause Flow';
  svgContainer.classList.remove('paused');
}

function pauseSequence() {
  // We only allow pausing the continuous dashes once sequence finishes
  if (sequenceFinished) {
    isRunning = false;
    svgContainer.classList.add('paused');
    btnPlayPause.textContent = 'Resume Flow';
    btnPlayPause.style.background = '#64748b';
  }
}

function resumeSequence() {
  if (sequenceFinished) {
    isRunning = true;
    svgContainer.classList.remove('paused');
    btnPlayPause.textContent = 'Pause Flow';
    btnPlayPause.style.background = 'var(--primary)';
  } else {
    runSequence();
  }
}

// Controls
btnPlayPause.addEventListener('click', () => {
  if (!isRunning && !sequenceFinished) {
    runSequence();
  } else if (isRunning) {
    pauseSequence();
  } else {
    resumeSequence();
  }
});

btnRestart.addEventListener('click', () => {
  isRunning = false;
  sequenceFinished = false;
  
  // Reset Button
  btnPlayPause.disabled = false;
  btnPlayPause.textContent = 'Start Process';
  btnPlayPause.style.background = 'var(--primary)';

  // Reset SVG elements
  greenFillOverlay.classList.remove('pipe-filling');
  orangeFillOverlay.classList.remove('pipe-filling-fast', 'pipe-filling');
  
  // Temporary disable transitions to snap back to full/empty immediately
  barrenLiquid.style.transition = 'none';
  pregnantLiquid.style.transition = 'none';
  
  barrenLiquid.setAttribute('y', '250');
  barrenLiquid.setAttribute('height', '250');
  
  pregnantLiquid.setAttribute('y', '500');
  pregnantLiquid.setAttribute('height', '0');
  
  // Force a reflow to apply the snap before re-enabling transitions
  barrenLiquid.offsetHeight; 
  
  barrenLiquid.style.transition = '';
  pregnantLiquid.style.transition = '';
  
  oreColorFill.classList.remove('active');
  oreColorFill.style.opacity = '';
  
  continuousFlows.forEach(el => el.classList.remove('active'));
  svgContainer.classList.remove('paused');
});

// Modal Logic
const modal = document.getElementById('modal');
const modalClose = document.getElementById('btn-close-modal');
const modalTitle = document.getElementById('modal-title');
const modalIcon = document.getElementById('modal-icon');
const modalDesc = document.getElementById('modal-desc');

const labelData = {
  barren: {
    title: 'Barren Lixiviant Tank',
    color: '#10b981',
    description: 'The starting point. Barren lixiviant (a mixture of water and oxidant/complexing agent) is prepared here before being pumped into the ground.'
  },
  injection: {
    title: 'Injection Well',
    color: '#34d399',
    description: 'The lixiviant is pumped down the injection well and forced through the porous uranium ore body.'
  },
  overburden: {
    title: 'Overburden',
    color: '#64748b',
    description: 'The rock and soil layers above the ore deposit. Because of ISR, this material is not removed or disturbed, minimizing environmental impact.'
  },
  ore: {
    title: 'Uranium Ore Body',
    color: '#b45309',
    description: 'The target zone. As the lixiviant flows through the porous rock, it dissolves the uranium minerals, turning into \'pregnant\' lixiviant.'
  },
  production: {
    title: 'Production Well',
    color: '#f59e0b',
    description: 'Submersible pumps draw the uranium-rich (pregnant) solution back to the surface for processing.'
  },
  pregnant: {
    title: 'Pregnant Lixiviant Tank',
    color: '#d97706',
    description: 'Collects the uranium-laden solution. From here, the fluid goes to the processing plant where the uranium is extracted, and the fluid is recycled back to the barren tank.'
  }
};

window.handleLabelClick = function(id) {
  const data = labelData[id];
  if(!data) return;

  modalIcon.style.backgroundColor = data.color;
  modalIcon.style.boxShadow = `0 0 15px ${data.color}80`;
  modalTitle.textContent = data.title;
  modal.classList.add('active');
  
  typewriterEffect(data.description);
};

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  if(typewriterTimeout) clearTimeout(typewriterTimeout);
});

modal.addEventListener('click', (e) => {
  if(e.target === modal) modalClose.click();
});

function typewriterEffect(text) {
  if(typewriterTimeout) clearTimeout(typewriterTimeout);
  modalDesc.textContent = '';
  modalDesc.classList.remove('done');
  
  let i = 0;
  function type() {
    if (i < text.length) {
      modalDesc.textContent += text.charAt(i);
      i++;
      typewriterTimeout = setTimeout(type, 20); 
    } else {
      modalDesc.classList.add('done');
    }
  }
  type();
}
