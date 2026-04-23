/**
 * case-study-scroll.js
 * GSAP ScrollTrigger animations for the Austrian case study production diagram.
 * Each process step card triggers corresponding SVG elements to animate in.
 */

export function initCaseStudyScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // All step cards start visually muted
  gsap.set('.process-step', { opacity: 0, y: 30 });

  const totalSteps = 5;
  let currentStep = 0;
  const stepRevealed = [false, false, false, false, false, false];

  const stepAnimations = {
    1: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.to('#prod-tanks', { opacity: 1, duration: 0.6 })
        .to('#prod-pumps', { opacity: 1, duration: 0.6 }, '-=0.3')
        .to('#prod-mixer', { opacity: 1, duration: 0.6 }, '-=0.3');
    },
    2: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.to('#prod-inj-casing', { opacity: 0.85, duration: 0.8 })
        .to('#prod-inj-label', { opacity: 1, duration: 0.5 }, '-=0.3')
        .to('#prod-pipe-inject', { opacity: 0.3, duration: 0.4 }, '-=0.2')
        .to('#prod-fill-inject', {
          strokeDashoffset: 0, duration: 1.5,
          ease: 'power1.inOut'
        })
        .to('#prod-dash-inject', { opacity: 1, duration: 0.3 });

      gsap.to('#prod-dash-inject', {
        strokeDashoffset: '-=30',
        duration: 1.2, ease: 'none', repeat: -1
      });
    },
    3: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.to('#prod-mineral-zone', { opacity: 1, duration: 0.8 })
        .to('#prod-monitor-well', { opacity: 0.7, duration: 0.5 }, '-=0.3')
        .to('#prod-pipe-aquifer', { opacity: 0.3, duration: 0.4 }, '-=0.2')
        .to('#prod-aquifer-arrows', { opacity: 1, duration: 0.5 }, '-=0.2')
        .to('#prod-fill-aquifer', {
          strokeDashoffset: 0, duration: 1.8,
          ease: 'power1.inOut'
        })
        .to('#prod-ore-plume', { opacity: 0.5, duration: 1.2 }, '-=1.2')
        .to('#prod-dash-aquifer', { opacity: 1, duration: 0.3 });

      gsap.to('#prod-dash-aquifer', {
        strokeDashoffset: '-=30',
        duration: 1.5, ease: 'none', repeat: -1
      });
    },
    4: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.to('#prod-rec-casing', { opacity: 0.85, duration: 0.8 })
        .to('#prod-rec-label', { opacity: 1, duration: 0.5 }, '-=0.3')
        .to('#prod-pipe-recover', { opacity: 0.3, duration: 0.4 }, '-=0.2')
        .to('#prod-fill-recover', {
          strokeDashoffset: 0, duration: 1.5,
          ease: 'power1.inOut'
        })
        .to('#prod-pls-label', { opacity: 1, duration: 0.5 }, '-=0.3')
        .to('#prod-dash-recover', { opacity: 1, duration: 0.3 });

      gsap.to('#prod-dash-recover', {
        strokeDashoffset: '-=30',
        duration: 1.2, ease: 'none', repeat: -1
      });
    },
    5: () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.to('#prod-facility', { opacity: 1, duration: 0.8 })
        .to('#prod-yellowcake', { opacity: 1, duration: 0.6 }, '-=0.3')
        .to('#prod-pipe-return', { opacity: 0.3, duration: 0.4 }, '-=0.2')
        .to('#prod-fill-return', {
          strokeDashoffset: 0, duration: 1.5,
          ease: 'power1.inOut'
        })
        .to('#prod-barren-label', { opacity: 1, duration: 0.5 }, '-=0.3')
        .to('#prod-dash-return', { opacity: 1, duration: 0.3 });

      gsap.to('#prod-dash-return', {
        strokeDashoffset: '-=20',
        duration: 1.5, ease: 'none', repeat: -1
      });
    }
  };

  function revealStep(stepIndex) {
    if (stepRevealed[stepIndex]) return;
    stepRevealed[stepIndex] = true;
    currentStep = Math.max(currentStep, stepIndex);

    const btnNext = document.getElementById('btn-next-step');
    if (currentStep >= totalSteps && btnNext) {
      btnNext.style.display = 'none';
    }

    const stepId = '#pstep-' + stepIndex;

    // Slide the carousel track
    const xOffset = -(stepIndex - 1) * 100;
    gsap.to('#steps-track', {
      xPercent: xOffset,
      duration: 0.6,
      ease: 'power2.inOut'
    });

    // Reveal the step card itself
    gsap.to(stepId, {
      opacity: 1, y: 0,
      duration: 0.5,
      delay: 0.2,
      ease: 'power2.out'
    });

    // Run the SVG animation
    if (stepAnimations[stepIndex]) {
      stepAnimations[stepIndex]();
    }
  }

  // Setup ScrollTrigger for the entire track to reveal step 1
  ScrollTrigger.create({
    trigger: '#steps-track',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      if (currentStep === 0) {
        revealStep(1);
      }
    }
  });

  // Setup Next button
  const btnNext = document.getElementById('btn-next-step');
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        const nextStep = currentStep + 1;
        revealStep(nextStep);
      }
    });
  }
}
