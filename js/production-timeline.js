/**
 * production-timeline.js
 * GSAP ScrollTrigger logic for the salt solution mining case study.
 */

let flowTweens = [];
let initialized = false;

function buildTimelines() {
  // Hide all paths and objects initially
  const allEls = [
    '#prod-step1-box', '#prod-step2-box', '#prod-step3-box',
    '#prod-step4-box', '#prod-step5-box',
    '#prod-tanks', '#prod-pumps', '#prod-mixer', '#prod-facility',
    '#prod-yellowcake', '#prod-monitor-well',
    '#prod-pipe-prep', '#prod-pipe-mix',
    '#prod-inj-casing', '#prod-rec-casing',
    '#prod-inj-label', '#prod-rec-label',
    '#prod-mineral-zone', '#prod-ore-plume',
    '#prod-aquifer-arrows', '#prod-pls-label', '#prod-barren-label',
    '#prod-dash-inject', '#prod-dash-aquifer', '#prod-dash-recover', '#prod-dash-return',
    '#prod-pipe-inject-base', '#prod-pipe-aquifer-base',
    '#prod-pipe-recover-base', '#prod-pipe-return-base'
  ];
  gsap.set(allEls, { opacity: 0, clearProps: 'strokeDashoffset' });
  gsap.set('#prod-fill-inject', { strokeDashoffset: 1200 });
  gsap.set(['#prod-fill-aquifer', '#prod-fill-recover', '#prod-fill-return'], { strokeDashoffset: 800 });

  // Common config
  const stConfig = (triggerId) => ({
    trigger: triggerId,
    start: "top center",
    end: "bottom center",
    toggleClass: 'active-step'
  });

  // Step 1
  ScrollTrigger.create({
    ...stConfig('#scroll-step-1'),
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.to('#prod-tanks', { opacity: 1, duration: 0.6 })
        .to('#prod-pumps', { opacity: 1, duration: 0.6 }, "-=0.2")
        .to('#prod-mixer', { opacity: 1, duration: 0.6 }, "-=0.2")
        .to('#prod-pipe-prep', { opacity: 0.8, duration: 0.4 }, "-=0.1")
        .to('#prod-pipe-mix', { opacity: 0.8, duration: 0.4 }, "-=0.1");
    }
  });

  // Step 2
  ScrollTrigger.create({
    ...stConfig('#scroll-step-2'),
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.to('#prod-inj-casing', { opacity: 0.85, duration: 0.8 })
        .to('#prod-inj-label', { opacity: 1, duration: 0.5 }, "-=0.2")
        .to('#prod-pipe-inject-base', { opacity: 0.3, duration: 0.5 }, "-=0.2")
        .to('#prod-fill-inject', { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' })
        .to('#prod-dash-inject', { opacity: 1, duration: 0.3 });
      
      // Add continuous flow tween if not already added
      flowTweens.push(gsap.to('#prod-dash-inject', { strokeDashoffset: '-=30', duration: 1.2, ease: 'none', repeat: -1 }));
    }
  });

  // Step 3
  ScrollTrigger.create({
    ...stConfig('#scroll-step-3'),
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.to('#prod-mineral-zone', { opacity: 1, duration: 1.0 })
        .to('#prod-monitor-well', { opacity: 0.7, duration: 0.6 }, "-=0.4")
        .to('#prod-pipe-aquifer-base', { opacity: 0.3, duration: 0.5 }, "-=0.3")
        .to('#prod-aquifer-arrows', { opacity: 1, duration: 0.5 }, "-=0.2")
        .to('#prod-fill-aquifer', { strokeDashoffset: 0, duration: 2.0, ease: 'power1.inOut' })
        .to('#prod-ore-plume', { opacity: 0.6, duration: 1.5 }, "-=1.5")
        .to('#prod-dash-aquifer', { opacity: 1, duration: 0.3 });
        
      flowTweens.push(gsap.to('#prod-dash-aquifer', { strokeDashoffset: '-=30', duration: 1.5, ease: 'none', repeat: -1 }));
    }
  });

  // Step 4
  ScrollTrigger.create({
    ...stConfig('#scroll-step-4'),
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.to('#prod-rec-casing', { opacity: 0.85, duration: 0.8 })
        .to('#prod-rec-label', { opacity: 1, duration: 0.5 }, "-=0.2")
        .to('#prod-pipe-recover-base', { opacity: 0.3, duration: 0.5 }, "-=0.2")
        .to('#prod-fill-recover', { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' })
        .to('#prod-pls-label', { opacity: 1, duration: 0.5 }, "-=0.2")
        .to('#prod-dash-recover', { opacity: 1, duration: 0.3 });

      flowTweens.push(gsap.to('#prod-dash-recover', { strokeDashoffset: '-=30', duration: 1.2, ease: 'none', repeat: -1 }));
    }
  });

  // Step 5
  ScrollTrigger.create({
    ...stConfig('#scroll-step-5'),
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.to('#prod-facility', { opacity: 1, duration: 1.0 })
        .to('#prod-yellowcake', { opacity: 1, duration: 0.8 }, "-=0.3")
        .to('#prod-pipe-return-base', { opacity: 0.3, duration: 0.5 }, "-=0.3")
        .to('#prod-fill-return', { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' })
        .to('#prod-barren-label', { opacity: 1, duration: 0.5 }, "-=0.2")
        .to('#prod-dash-return', { opacity: 1, duration: 0.3 });

      flowTweens.push(gsap.to('#prod-dash-return', { strokeDashoffset: '-=20', duration: 1.5, ease: 'none', repeat: -1 }));
    }
  });
}

export function initScrollTelling() {
  if (initialized) return;
  initialized = true;
  buildTimelines();
  
  // Refresh ScrollTrigger calculations after showing container
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}
