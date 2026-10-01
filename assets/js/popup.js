/**
 * Popup JS - Layer Popup Controller
 * Dependencies: jQuery, common.js
 */
(function ($) {
  'use strict';

  var Popup = {
    $overlay: null,
    $popups: null,
    activePopup: null,
    storageKey: 'popup_hide_until',

    init: function () {
      this.$overlay = $('.popup-overlay');
      this.$popups = $('.popup');

      if (!this.$popups.length) return;

      this.bindEvents();
      this.checkAutoOpen();
    },

    bindEvents: function () {
      var self = this;

      /* Open popup triggers */
      $(document).on('click', '[data-popup-open]', function (e) {
        e.preventDefault();
        var popupId = $(this).data('popup-open');
        self.open(popupId);
      });

      /* Close popup triggers */
      $(document).on('click', '[data-popup-close]', function (e) {
        e.preventDefault();
        self.close();
      });

      /* Overlay click to close */
      this.$overlay.on('click', function () {
        self.close();
      });

      /* ESC key to close */
      $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && self.activePopup) {
          self.close();
        }
      });

      /* Don't show today */
      $(document).on('change', '.popup__checkbox', function () {
        if ($(this).is(':checked')) {
          self.setHideToday();
        }
      });
    },

    open: function (popupId) {
      var $popup = $('#' + popupId);
      if (!$popup.length) return;

      this.activePopup = $popup;
      this.$overlay.addClass('is-active');
      $popup.addClass('is-active');
      App.utils.scrollLock(true);

      /* Focus trap - focus first focusable element */
      $popup.find('button, [href], input, select, textarea').first().focus();
    },

    close: function () {
      if (!this.activePopup) return;

      this.activePopup.removeClass('is-active');
      this.$overlay.removeClass('is-active');
      App.utils.scrollLock(false);
      this.activePopup = null;
    },

    checkAutoOpen: function () {
      var $autoPopup = $('.popup[data-auto-open="true"]');
      if (!$autoPopup.length) return;

      var canHideToday = $autoPopup.find('.popup__checkbox').length > 0;
      if (!canHideToday) {
        localStorage.removeItem(this.storageKey);
      } else if (this.shouldHideToday()) {
        return;
      }

      var self = this;
      setTimeout(function () {
        self.open($autoPopup.attr('id'));
      }, 500);
    },

    shouldHideToday: function () {
      var hideUntil = localStorage.getItem(this.storageKey);
      if (!hideUntil) return false;
      return new Date().getTime() < parseInt(hideUntil, 10);
    },

    setHideToday: function () {
      var tomorrow = new Date();
      tomorrow.setHours(23, 59, 59, 999);
      localStorage.setItem(this.storageKey, tomorrow.getTime().toString());
    }
  };

  window.App = window.App || {};
  App.popup = Popup;

  $(function () {
    Popup.init();
  });

})(jQuery);
