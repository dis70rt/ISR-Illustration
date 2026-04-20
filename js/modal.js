import { elements } from './ui.js';
let typewriterTimeout = null;
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
export function initModal() {
  window.handleLabelClick = function(id) {
    const data = labelData[id];
    if(!data) return;
    elements.modalIcon.style.backgroundColor = data.color;
    elements.modalIcon.style.boxShadow = `0 0 15px ${data.color}80`;
    elements.modalTitle.textContent = data.title;
    elements.modal.classList.add('active');
    
    typewriterEffect(data.description);
  };
  elements.modalClose.addEventListener('click', () => {
    elements.modal.classList.remove('active');
    if(typewriterTimeout) clearTimeout(typewriterTimeout);
  });
  elements.modal.addEventListener('click', (e) => {
    if(e.target === elements.modal) elements.modalClose.click();
  });
}
function typewriterEffect(text) {
  if(typewriterTimeout) clearTimeout(typewriterTimeout);
  elements.modalDesc.textContent = '';
  elements.modalDesc.classList.remove('done');
  
  let i = 0;
  function type() {
    if (i < text.length) {
      elements.modalDesc.textContent += text.charAt(i);
      i++;
      typewriterTimeout = setTimeout(type, 20); 
    } else {
      elements.modalDesc.classList.add('done');
    }
  }
  type();
}
