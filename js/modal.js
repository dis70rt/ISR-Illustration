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
  },
  'prod-barren-tank': {
    title: 'Lixiviant Storage Tanks',
    color: '#3b82f6',
    description: 'Storage for the base chemicals (acid or bicarbonate) and water used to create the lixiviant solution. These tanks ensure a steady supply of leaching agents for the continuous ISR process.'
  },
  'prod-pump': {
    title: 'High-Pressure Injection Pump',
    color: '#455A64',
    description: 'A heavy-duty industrial pump that pressurizes the lixiviant solution, providing the necessary force to drive the fluid deep underground and through the porous ore body.'
  },
  'prod-mixer-info': {
    title: 'Precision Mixer',
    color: '#90A4AE',
    description: 'The mixer blends water, chemicals, and recycled barren lixiviant at exact ratios. Constant agitation ensures a uniform solution before it is sent to the injection wells.'
  },
  'prod-injection': {
    title: 'Injection Wellhead',
    color: '#60a5fa',
    description: 'The entry point to the subsurface. The wellhead monitors pressure and flow rates as the lixiviant is injected into the target aquifer layer.'
  },
  'prod-recovery': {
    title: 'Recovery Wellhead',
    color: '#4ade80',
    description: 'Submersible pumps located at the bottom of the recovery well lift the pregnant solution back to the surface. It is designed to capture the plume created by the injection wells.'
  },
  'prod-facility-info': {
    title: 'Uranium Processing Facility',
    color: '#CFD8DC',
    description: 'The heart of the surface operation. Here, Ion Exchange (IX) or Solvent Extraction (SX) processes strip the uranium from the solution, producing yellowcake (U3O8) and regenerating the lixiviant for reuse.'
  },
  'prod-ore': {
    title: 'Uranium Ore Body',
    color: '#166534',
    description: 'A sandstone aquifer hosted between impermeable clay or shale layers. The uranium minerals reside on the sand grains and are dissolved as the lixiviant flow passes through.'
  },
  'prod-overburden': {
    title: 'Subsurface Strata',
    color: '#8B7355',
    description: 'Various layers of dirt, rock, and confining shale. ISR mining targets only the specific ore zone, leaving the surrounding overburden undisturbed and protecting upper water tables.'
  },
  'prod-aquifer': {
    title: 'Ore Body Aquifer',
    color: '#D4C5A0',
    description: 'A permeable sandstone layer that holds the uranium deposit. Its permeability allows lixiviant to circulate through the rock, reaching the minerals for dissolution.'
  },
  'prod-yellowcake': {
    title: 'Yellowcake (U₃O₈)',
    color: '#F9A825',
    description: 'The final product of ISR mining. After Ion Exchange and Solvent Extraction strip uranium from the Pregnant Leach Solution, the concentrate is precipitated, filtered, dried, and packaged as yellowcake — a bright-yellow uranium oxide powder (U₃O₈). It is then shipped to conversion facilities for further enrichment.'
  },
  'prod-monitor': {
    title: 'Monitoring Well',
    color: '#78909C',
    description: 'Monitoring wells are drilled around the wellfield perimeter to continuously sample groundwater quality. They detect any excursion of mining fluids beyond the production zone, ensuring environmental compliance and protecting surrounding aquifers.'
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
