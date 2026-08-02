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

      this.setupMobileNav();
      this.bindEvents();
      this.handleScroll();
    },

    setupMobileNav: function () {
      if (!this.$mobileNav.length || this.$mobileNav.data('portaled')) return;

      this.$mobileNav.appendTo('body');

      if (this.$header.hasClass('header--main')) {
        this.$mobileNav.addClass('header__mobile-nav--main');
      }

      this.$mobileNav.attr('aria-hidden', 'true');
      this.$mobileNav.data('portaled', true);
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

      $(document).on('keydown.headerMenu', function (e) {
        if (e.key === 'Escape') {
          self.closeMobileMenu();
        }
      });
    },

    handleScroll: function () {
      var scrollTop = $(window).scrollTop();
      this.$header.toggleClass('is-scrolled', scrollTop > this.scrollThreshold);
    },

    toggleMobileMenu: function () {
      var isOpen = this.$mobileNav.hasClass('is-open');
      var willOpen = !isOpen;

      this.$menuBtn.toggleClass('is-active', willOpen);
      this.$mobileNav.toggleClass('is-open', willOpen);
      this.$header.toggleClass('is-menu-open', willOpen);
      App.utils.scrollLock(willOpen);

      this.$menuBtn.attr('aria-expanded', willOpen);
      this.$mobileNav.attr('aria-hidden', !willOpen);
    },

    closeMobileMenu: function () {
      this.$menuBtn.removeClass('is-active').attr('aria-expanded', 'false');
      this.$mobileNav.removeClass('is-open').attr('aria-hidden', 'true');
      this.$header.removeClass('is-menu-open');
      App.utils.scrollLock(false);
    }
  };

  $(function () {
    Header.init();
  });

})(jQuery);
