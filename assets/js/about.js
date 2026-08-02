/**
 * About Page JS
 * Dependencies: jQuery, GSAP, common.js
 */
(function ($) {
  'use strict';

  var About = {
    init: function () {
      this.initCopyAnimation();
      this.initInspirationAnimation();
      this.initIngredientsAnimation();
      this.initCraftingAnimation();
      this.initScrollAnimation();
    },

    initCopyAnimation: function () {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof SplitText === 'undefined') {
        return;
      }

      var section = document.querySelector('.about-copy');
      var target = document.querySelector('.about-copy__split-target');
      if (!section || !target) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      var runSplitReveal = function () {
        gsap.context(function () {
          SplitText.create(target, {
            type: 'lines, chars',
            autoSplit: true,
            aria: 'hidden',
            charsClass: 'about-copy__char',
            onSplit: function (self) {
              var charCount = self.chars.length;

              return gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  start: 'top 80%',
                  end: '+=' + Math.max(charCount * 14, 400),
                  scrub: 1
                }
              }).from(self.chars, {
                opacity: 0,
                y: 10,
                stagger: {
                  each: 1,
                  from: 'start'
                },
                ease: 'none'
              });
            }
          });
        }, section);
      };

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(runSplitReveal);
      } else {
        runSplitReveal();
      }
    },

    initInspirationAnimation: function () {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

      var section = document.querySelector('.about-inspiration');
      if (!section) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.about-inspiration__title, .about-inspiration__desc', {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        duration: 0.8,
        y: 60,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
      });
    },

    initIngredientsAnimation: function () {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

      var section = document.querySelector('.about-ingredients');
      if (!section) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.about-ingredients__title', {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        duration: 0.8,
        y: 60,
        opacity: 0,
        ease: 'power2.out'
      });

      gsap.utils.toArray('.about-ingredients__item').forEach(function (el, i) {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          duration: 0.8,
          y: 60,
          opacity: 0,
          delay: i * 0.15,
          ease: 'power2.out'
        });
      });
    },

    initCraftingAnimation: function () {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

      var section = document.querySelector('.about-crafting');
      if (!section) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.about-crafting__header', {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        duration: 0.8,
        y: 60,
        opacity: 0,
        ease: 'power2.out'
      });

      this.initCraftingSwiper();
    },

    initCraftingSwiper: function () {
      var el = document.querySelector('.about-crafting__swiper');
      if (!el || typeof Swiper === 'undefined') return;

      var section = el.closest('.about-crafting');
      if (!section) return;

      var prevBtns = section.querySelectorAll('.about-crafting__arrow--prev');
      var nextBtns = section.querySelectorAll('.about-crafting__arrow--next');

      var updateNavState = function (swiper) {
        prevBtns.forEach(function (btn) {
          btn.disabled = swiper.isBeginning;
        });
        nextBtns.forEach(function (btn) {
          btn.disabled = swiper.isEnd;
        });
      };

      new Swiper(el, {
        slidesPerView: 1,
        speed: 800,
        loop: false,
        autoHeight: true,
        navigation: {
          nextEl: '.about-crafting__arrow--next',
          prevEl: '.about-crafting__arrow--prev'
        },
        on: {
          init: function (swiper) {
            updateNavState(swiper);
            swiper.updateAutoHeight();
          },
          slideChange: function (swiper) {
            updateNavState(swiper);
            swiper.updateAutoHeight();
          },
          resize: function (swiper) {
            swiper.updateAutoHeight();
          }
        }
      });
    },

    initScrollAnimation: function () {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.about-intro__image', {
        scrollTrigger: {
          trigger: '.about-intro',
          start: 'top 80%'
        },
        duration: 0.8,
        x: -50,
        opacity: 0,
        ease: 'power2.out'
      });

      gsap.from('.about-intro__content', {
        scrollTrigger: {
          trigger: '.about-intro',
          start: 'top 80%'
        },
        duration: 0.8,
        x: 50,
        opacity: 0,
        ease: 'power2.out'
      });

      gsap.utils.toArray('.about-values__item').forEach(function (el, i) {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%'
          },
          duration: 0.6,
          y: 40,
          opacity: 0,
          delay: i * 0.15,
          ease: 'power2.out'
        });
      });

      gsap.utils.toArray('.about-timeline__item').forEach(function (el) {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%'
          },
          duration: 0.6,
          x: -30,
          opacity: 0,
          ease: 'power2.out'
        });
      });
    }
  };

  $(function () {
    About.init();
  });

})(jQuery);
