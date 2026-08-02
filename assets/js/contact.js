/**
 * Contact Page JS - Form Validation & Submit
 * Dependencies: jQuery, common.js
 */
(function ($) {
  'use strict';

  var Contact = {
    $form: null,

    init: function () {
      this.$form = $('.contact-form');

      if (!this.$form.length) return;

      this.bindEvents();
    },

    bindEvents: function () {
      var self = this;

      this.$form.on('submit', function (e) {
        e.preventDefault();
        if (self.validate()) {
          self.submit();
        }
      });

      /* Real-time validation on blur */
      this.$form.find('.contact-form__input, .contact-form__textarea').on('blur', function () {
        self.validateField($(this));
      });

      /* Clear error on input */
      this.$form.find('.contact-form__input, .contact-form__textarea').on('input', function () {
        self.clearError($(this));
      });
    },

    validate: function () {
      var self = this;
      var isValid = true;

      this.$form.find('[required]').each(function () {
        if (!self.validateField($(this))) {
          isValid = false;
        }
      });

      /* Privacy checkbox */
      var $privacy = this.$form.find('.contact-form__checkbox');
      if ($privacy.length && !$privacy.is(':checked')) {
        isValid = false;
        $privacy.closest('.contact-form__checkbox-wrap').addClass('is-error');
      }

      return isValid;
    },

    validateField: function ($field) {
      var value = $.trim($field.val());
      var type = $field.attr('type') || $field.prop('tagName').toLowerCase();
      var isValid = true;
      var message = '';

      if ($field.prop('required') && !value) {
        isValid = false;
        message = '필수 입력 항목입니다.';
      }

      if (type === 'email' && value) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          message = '올바른 이메일 형식을 입력해주세요.';
        }
      }

      if (type === 'tel' && value) {
        var phoneRegex = /^[0-9-+\s()]{8,20}$/;
        if (!phoneRegex.test(value)) {
          isValid = false;
          message = '올바른 전화번호 형식을 입력해주세요.';
        }
      }

      if (isValid) {
        this.clearError($field);
      } else {
        this.showError($field, message);
      }

      return isValid;
    },

    showError: function ($field, message) {
      $field.addClass('is-error');
      var $error = $field.siblings('.contact-form__error');
      $error.text(message).addClass('is-visible');
    },

    clearError: function ($field) {
      $field.removeClass('is-error');
      $field.siblings('.contact-form__error').removeClass('is-visible');
    },

    submit: function () {
      var $submitBtn = this.$form.find('.contact-form__submit');
      var $submitText = $submitBtn.find('.contact-form__submit-text');
      $submitBtn.prop('disabled', true);
      $submitText.text('Sending...');

      /* API 연동 시 fetch/ajax로 교체 */
      setTimeout(function () {
        alert('문의가 성공적으로 접수되었습니다.');
        $submitBtn.prop('disabled', false);
        $submitText.text('Get In Touch');
        Contact.$form[0].reset();
      }, 1000);
    }
  };

  $(function () {
    Contact.init();
  });

})(jQuery);
