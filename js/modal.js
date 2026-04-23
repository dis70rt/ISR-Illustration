import { elements } from './ui.js';
let typewriterTimeout = null;
const labelData = {
  barren: {
    title: 'Fresh Water Tank',
    color: '#58a6ff',
    description: 'The starting reservoir. Fresh water is stored here before being pumped underground through the injection well. In actual Austrian operations, the water quality is monitored to prevent unwanted chemical reactions with the salt body.'
  },
  injection: {
    title: 'Injection Well',
    color: '#58a6ff',
    description: 'Fresh water travels down this well under pressure, reaching the salt deposit below. The 18V motor driven pump simulates the high pressure injection systems used at sites like Hallstatt and Altaussee.'
  },
  overburden: {
    title: 'Overburden',
    color: '#6e7681',
    description: 'The rock and soil layers sitting above the salt deposit. Solution mining leaves this material completely undisturbed, which is one of the main environmental advantages over traditional shaft mining.'
  },
  ore: {
    title: 'Salt Deposit (Haselgebirge)',
    color: '#8b949e',
    description: 'The target zone. In the Austrian Alps this is the Haselgebirge Formation, a mixture of rock salt, clay, mudstone, and gypsum. Fresh water dissolves the salt component and leaves the insoluble materials behind.'
  },
  production: {
    title: 'Production Well',
    color: '#8b949e',
    description: 'The saturated brine (about 26% NaCl by weight) is pumped back to the surface through this well. Submersible pumps at the bottom of the well handle the lifting.'
  },
  pregnant: {
    title: 'Saturated Brine Tank',
    color: '#6e7681',
    description: 'Collects the salt laden brine returning from underground. From here the brine is piped to the processing facility where water is evaporated off, leaving behind high purity crystalline salt.'
  },
  'prod-barren-tank': {
    title: 'Water Supply Tanks',
    color: '#58a6ff',
    description: 'Storage for the fresh water and any additives used in the injection process. In Austrian operations, the water supply is carefully metered to control the rate of cavern growth underground.'
  },
  'prod-pump': {
    title: 'High Pressure Injection Pump',
    color: '#30363d',
    description: 'Pressurizes the water for injection underground. The pump must generate enough pressure to force water through the borehole and into the salt body at depths of up to 400 metres.'
  },
  'prod-mixer-info': {
    title: 'Mixing Station',
    color: '#8b949e',
    description: 'Blends fresh water with recycled brine at controlled ratios. The mixture is agitated continuously to ensure uniform concentration before it enters the injection well.'
  },
  'prod-injection': {
    title: 'Injection Wellhead',
    color: '#58a6ff',
    description: 'Surface control point where pressure and flow rate are monitored as water enters the borehole. Sensors here detect any anomalies that could indicate cavern instability.'
  },
  'prod-recovery': {
    title: 'Production Wellhead',
    color: '#3fb950',
    description: 'The saturated brine exits here. Submersible pumps at the well bottom lift the heavy brine to the surface. Flow rates are tracked to calculate dissolution progress.'
  },
  'prod-facility-info': {
    title: 'Saltworks (Processing Facility)',
    color: '#c9d1d9',
    description: 'At the Ebensee saltworks, raw brine undergoes the Schweizerhalle purification process to remove calcium and magnesium. Vacuum evaporation then crystallizes the salt to 99.9% NaCl purity.'
  },
  'prod-ore': {
    title: 'Salt Body',
    color: '#6e7681',
    description: 'The underground salt formation. As water dissolves the salt, an expanding cavern forms. The shape and growth of this cavern are carefully monitored to prevent subsidence at the surface.'
  },
  'prod-overburden': {
    title: 'Subsurface strata',
    color: '#30363d',
    description: 'Layers of soil, rock, and confining formations above the salt deposit. Solution mining targets only the salt zone, keeping these layers intact and protecting groundwater above.'
  },
  'prod-aquifer': {
    title: 'Salt formation zone',
    color: '#c9d1d9',
    description: 'The permeable zone where salt dissolution occurs. Water injected from the surface circulates through this zone, gradually expanding the cavern as salt is removed.'
  },
  'prod-yellowcake': {
    title: 'Refined Salt Output',
    color: '#f78166',
    description: 'The final product: vacuum evaporated salt at 99.9% purity. This is packaged for food grade, pharmaceutical, and industrial chemical markets. Salinen Austria AG produces about 1.2 million tonnes annually.'
  },
  'prod-monitor': {
    title: 'Monitoring Well',
    color: '#8b949e',
    description: 'Monitoring wells around the extraction zone continuously sample groundwater quality. They detect any brine migration beyond the intended production area, which would indicate a breach in the confining layers.'
  }
};
export function initModal() {
  window.handleLabelClick = function(id) {
    const data = labelData[id];
    if(!data) return;
    elements.modalIcon.style.backgroundColor = data.color;
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
      typewriterTimeout = setTimeout(type, 18);
    } else {
      elements.modalDesc.classList.add('done');
    }
  }
  type();
}
