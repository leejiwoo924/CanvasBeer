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
            type: 'lines, words',
            autoSplit: true,
            aria: 'hidden',
            wordsClass: 'about-copy__word',
            onSplit: function (self) {
              var wordCount = self.words.length;

              gsap.set(self.words, { color: 'rgba(12, 12, 12, 0.36)' });

              return gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  start: 'top 75%',
                  end: '+=' + Math.max(wordCount * 40, 450),
                  scrub: 1.2
                }
              }).to(self.words, {
                color: '#0c0c0c',
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
      var section = document.querySelector('.about-crafting');
      var mediaSwiperEl = section ? section.querySelector('.about-crafting__media-swiper') : null;
      if (!section || !mediaSwiperEl || typeof Swiper === 'undefined') return;

      var sources = section.querySelectorAll('.about-crafting__slide-source');
      var contentEl = section.querySelector('.about-crafting__content');
      var titleEl = section.querySelector('.about-crafting__content .about-crafting__slide-title');
      var leadEl = section.querySelector('.about-crafting__content .about-crafting__slide-lead');
      var descEl = section.querySelector('.about-crafting__content .about-crafting__slide-desc');
      var fractionEl = section.querySelector('.about-crafting__fraction');
      var prevBtns = section.querySelectorAll('.about-crafting__arrow--prev');
      var nextBtns = section.querySelectorAll('.about-crafting__arrow--next');

      if (!sources.length || !contentEl || !titleEl || !leadEl || !descEl || !fractionEl) return;

      var slides = Array.prototype.map.call(sources, function (source) {
        return {
          title: source.querySelector('.about-crafting__slide-title').innerHTML,
          lead: source.querySelector('.about-crafting__slide-lead').innerHTML,
          desc: source.querySelector('.about-crafting__slide-desc').innerHTML
        };
      });

      var updateContent = function (index, animate) {
        var slide = slides[index];
        if (!slide) return;

        fractionEl.textContent = (index + 1) + ' / ' + slides.length;

        var applyContent = function () {
          titleEl.innerHTML = slide.title;
          leadEl.innerHTML = slide.lead;
          descEl.innerHTML = slide.desc;
        };

        if (!animate || typeof gsap === 'undefined') {
          applyContent();
          contentEl.style.opacity = '1';
          return;
        }

        gsap.to(contentEl, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
          onComplete: function () {
            applyContent();
            gsap.to(contentEl, {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        });
      };

      var updateNavState = function (swiper) {
        prevBtns.forEach(function (btn) {
          btn.disabled = swiper.isBeginning;
        });
        nextBtns.forEach(function (btn) {
          btn.disabled = swiper.isEnd;
        });
      };

      new Swiper(mediaSwiperEl, {
        slidesPerView: 1,
        speed: 800,
        loop: false,
        navigation: {
          nextEl: section.querySelector('.about-crafting__arrow--next'),
          prevEl: section.querySelector('.about-crafting__arrow--prev')
        },
        on: {
          init: function (swiper) {
            updateNavState(swiper);
            updateContent(swiper.activeIndex, false);
          },
          slideChange: function (swiper) {
            updateNavState(swiper);
            updateContent(swiper.activeIndex, true);
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
