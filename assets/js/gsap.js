/**
 * GSAP JS - Global GSAP Configuration
 * Dependencies: GSAP, ScrollTrigger, ScrollSmoother, SplitText
 */
(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  gsap.config({
    nullTargetWarn: false
  });

  gsap.defaults({
    ease: 'power2.out',
    duration: 0.8
  });

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
      toggleActions: 'play none none none'
    });
  }

  if (typeof ScrollSmoother !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollSmoother);

    var smoothWrapper = document.querySelector('#smooth-wrapper');
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (smoothWrapper && !prefersReducedMotion) {
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.2,
        smoothTouch: 0.1,
        effects: false
      });
    }
  }

  if (typeof SplitText !== 'undefined') {
    gsap.registerPlugin(SplitText);
  }

  if (typeof ScrollTrigger !== 'undefined') {
    window.addEventListener('resize', function () {
      ScrollTrigger.refresh();
    });
  }

})();
