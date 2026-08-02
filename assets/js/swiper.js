/**
 * Swiper JS - Slider Initialization
 * Dependencies: Swiper library
 */
(function () {
  'use strict';

  var SwiperInit = {
    init: function () {
      this.initVisualSwiper();
      this.initGallerySwiper();
      this.initCollectionDetailSwiper();
    },

    initVisualSwiper: function () {
      var el = document.querySelector('.visual__swiper');
      if (!el || typeof Swiper === 'undefined') return;

      new Swiper(el, {
        loop: true,
        speed: 800,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        pagination: {
          el: '.visual .swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.visual .swiper-button-next',
          prevEl: '.visual .swiper-button-prev'
        },
        a11y: {
          prevSlideMessage: '이전 슬라이드',
          nextSlideMessage: '다음 슬라이드',
          paginationBulletMessage: '{{index}}번째 슬라이드'
        }
      });
    },

    initGallerySwiper: function () {
      var el = document.querySelector('.art-beer-gallery__swiper');
      if (!el || typeof Swiper === 'undefined') return;

      new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.art-beer-gallery .swiper-pagination',
          clickable: true
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 24
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32
          }
        }
      });
    },

    initCollectionDetailSwiper: function () {
      var el = document.querySelector('.collection-detail__swiper');
      if (!el || typeof Swiper === 'undefined') return;

      new Swiper(el, {
        loop: true,
        pagination: {
          el: '.collection-detail__swiper .swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.collection-detail__swiper .swiper-button-next',
          prevEl: '.collection-detail__swiper .swiper-button-prev'
        }
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    SwiperInit.init();
  });

})();
