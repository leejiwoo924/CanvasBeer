/**
 * Header JS - Navigation, Scroll, Mobile Menu
 * Dependencies: jQuery, common.js
 */
(function ($) {
  'use strict';

  var Header = {
    $header: null,
    $menuBtn: null,
    $mobileNav: null,
    scrollThreshold: 50,

    init: function () {
      this.$header = $('.header');
      this.$menuBtn = $('.header__menu-btn');
      this.$mobileNav = $('.header__mobile-nav');

      if (!this.$header.length) return;

      this.bindEvents();
      this.handleScroll();
    },

    bindEvents: function () {
      var self = this;

      $(window).on('scroll', App.utils.throttle(function () {
        self.handleScroll();
      }, 100));

      this.$menuBtn.on('click', function () {
        self.toggleMobileMenu();
      });

      $('.header__mobile-nav-link').on('click', function () {
        self.closeMobileMenu();
      });

      $(window).on('resize', App.utils.debounce(function () {
        if (App.utils.getBreakpoint() === 'desktop') {
          self.closeMobileMenu();
        }
      }, 200));
    },

    handleScroll: function () {
      var scrollTop = $(window).scrollTop();
      this.$header.toggleClass('is-scrolled', scrollTop > this.scrollThreshold);
    },

    toggleMobileMenu: function () {
      var isOpen = this.$mobileNav.hasClass('is-open');
      this.$menuBtn.toggleClass('is-active', !isOpen);
      this.$mobileNav.toggleClass('is-open', !isOpen);
      App.utils.scrollLock(!isOpen);

      this.$menuBtn.attr('aria-expanded', !isOpen);
    },

    closeMobileMenu: function () {
      this.$menuBtn.removeClass('is-active').attr('aria-expanded', 'false');
      this.$mobileNav.removeClass('is-open');
      App.utils.scrollLock(false);
    }
  };

  $(function () {
    Header.init();
  });

})(jQuery);
