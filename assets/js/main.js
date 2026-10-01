/**
 * Main Page JS
 * Dependencies: jQuery, GSAP, ScrollTrigger, ScrollSmoother, SplitText, common.js, popup.js
 */

(function ($) {
  'use strict';

  var Main = {
    init: function () {
      this.initHeroAnimation();
      this.initVisualAnimation();
      this.initBrandVideo();
      this.initScrollAnimation();
    },

    initHeroAnimation: function () {
      if (typeof gsap === 'undefined') return;

      var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero__title', {
        duration: 1,
        y: 60,
        opacity: 0
      })
      .from('.hero__desc', {
        duration: 0.8,
        y: 40,
        opacity: 0
      }, '-=0.5');
    },

    initVisualAnimation: function () {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof SplitText === 'undefined') {
        return;
      }

      var section = document.querySelector('.visual');
      var target = document.querySelector('.visual__split-target');
      if (!section || !target) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      var runSplitReveal = function () {
        gsap.context(function () {
          SplitText.create(target, {
            type: 'lines, words',
            autoSplit: true,
            aria: 'hidden',
            wordsClass: 'visual__word',
            onSplit: function (self) {
              var wordCount = self.words.length;

              gsap.set(self.words, { color: 'rgba(255, 255, 255, 0.36)' });

              return gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  start: 'top 75%',
                  end: '+=' + Math.max(wordCount * 25, 280),
                  scrub: 1.2
                }
              }).to(self.words, {
                color: '#ffffff',
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

    initBrandVideo: function () {
      var section = document.querySelector('.brand-video');
      var video = section ? section.querySelector('.brand-video__media') : null;
      if (!video) return;

      var playVideo = function () {
        var promise = video.play();
        if (promise !== undefined) {
          promise.catch(function () {});
        }
      };

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              playVideo();
            } else {
              video.pause();
            }
          });
        }, { threshold: 0.25 });

        observer.observe(video);
      } else {
        playVideo();
      }

      this.initBrandVideoAnimation();
    },

    initBrandVideoAnimation: function () {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

      var section = document.querySelector('.brand-video');
      if (!section) return;

      var revealItems = section.querySelectorAll('.brand-video__reveal-inner');
      if (!revealItems.length) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.set(revealItems, { xPercent: -100, opacity: 0 });

      gsap.to(revealItems, {
        xPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    },

    initScrollAnimation: function () {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

      gsap.registerPlugin(ScrollTrigger);

      gsap.from('.collection-preview__header', {
        scrollTrigger: {
          trigger: '.collection-preview__header',
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        duration: 0.8,
        y: 40,
        opacity: 0,
        ease: 'power2.out'
      });

      gsap.utils.toArray('.collection-preview__item').forEach(function (el, i) {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          duration: 0.6,
          y: 40,
          opacity: 0,
          delay: i * 0.1,
          ease: 'power2.out'
        });
      });
    }
  };

  $(function () {
    Main.init();
  });

})(jQuery);
