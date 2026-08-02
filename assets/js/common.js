/**
 * Common JS - Global utilities & initialization
 * Dependencies: jQuery
 */
(function ($) {
  'use strict';

  /* --------------------------------------------------------------------------
     Global Namespace
     -------------------------------------------------------------------------- */
  window.App = window.App || {};

  /* --------------------------------------------------------------------------
     Utility Functions
     -------------------------------------------------------------------------- */
  App.utils = {
    /** rem to px conversion (base: 16px) */
    remToPx: function (rem) {
      return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    },

    /** Debounce function */
    debounce: function (func, wait) {
      var timeout;
      return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          func.apply(context, args);
        }, wait);
      };
    },

    /** Throttle function */
    throttle: function (func, limit) {
      var inThrottle;
      return function () {
        var context = this;
        var args = arguments;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(function () {
            inThrottle = false;
          }, limit);
        }
      };
    },

    /** Get current breakpoint */
    getBreakpoint: function () {
      var width = window.innerWidth;
      if (width <= 767) return 'mobile';
      if (width <= 1024) return 'tablet';
      return 'desktop';
    },

    /** Scroll lock for popup/mobile menu */
    scrollLock: function (lock) {
      $('body').toggleClass('is-scroll-lock', lock);
    },

    /** Set active nav link based on current page */
    setActiveNav: function () {
      var currentPage = window.location.pathname.split('/').pop() || 'index.html';
      var pageMap = {
        'index.html': 'index.html',
        '': 'index.html',
        'brand.html': 'brand.html',
        'about.html': 'about.html',
        'collection.html': 'collection.html',
        'contact.html': 'contact.html',
        'art-to-beer.html': 'brand.html'
      };
      var activePage = pageMap[currentPage] || currentPage;

      $('.header__nav-link, .header__mobile-nav-link').each(function () {
        var href = $(this).attr('href');
        if (href === activePage) {
          $(this).addClass('is-active');
        }
      });
    }
  };

  /* --------------------------------------------------------------------------
     Document Ready
     -------------------------------------------------------------------------- */
  $(function () {
    App.utils.setActiveNav();
  });

})(jQuery);
