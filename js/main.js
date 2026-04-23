import { elements } from './ui.js';
import { state, runSequence, pauseSequence, resumeSequence, resetSimulation } from './simulation.js';
import { initModal } from './modal.js';
import { initCaseStudyScroll } from './case-study-scroll.js';

// Setup basic physical model
initModal();

// Setup scroll-triggered animations for the case study production diagram
initCaseStudyScroll();

elements.btnPlayPause.addEventListener('click', () => {
  if (!state.isRunning && !state.sequenceFinished) {
    runSequence();
    elements.btnPlayPause.textContent = "Pause System";
  } else if (state.isRunning) {
    pauseSequence();
    elements.btnPlayPause.textContent = "Resume System";
  } else {
    resumeSequence();
    elements.btnPlayPause.textContent = "Pause System";
  }
});
elements.btnRestart.addEventListener('click', () => {
  resetSimulation();
  elements.btnPlayPause.textContent = "Start System";
});

// Sidebar active state on scroll
const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('#sidebar-nav a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}
document.querySelector('.main-content').addEventListener('scroll', updateActiveNav);
window.addEventListener('scroll', updateActiveNav);

// Toggle expandable content (Environmental & Hydrogen)
const btnShowMore = document.getElementById('btn-show-more');
const expandableContent = document.getElementById('expandable-content');

if (btnShowMore && expandableContent) {
  btnShowMore.addEventListener('click', () => {
    const isOpen = expandableContent.classList.contains('open');
    expandableContent.classList.toggle('open');
    
    // Update button text and icon rotation
    const span = btnShowMore.querySelector('span');
    const svg = btnShowMore.querySelector('svg');
    
    if (isOpen) {
      span.textContent = 'Show more';
      svg.style.transform = 'rotate(0deg)';
    } else {
      span.textContent = 'Show less';
      svg.style.transform = 'rotate(180deg)';
      
      // Refresh ScrollTrigger as the page height changed
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }
  });
}
