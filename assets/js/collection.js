/**
 * Collection Page JS
 * Dependencies: jQuery, common.js, popup.js
 */
(function ($) {
  'use strict';

  var Collection = {
    popupId: 'popup-collection-detail',

    products: {
      sunset: {
        name: 'Sunset Ale',
        image: 'assets/images/collection/Sunset Ale.png',
        flavor: '처음에는 잘 익은 오렌지과 살구의 달콤함이 느껴지고,\n뒤이어 은은한 카라멜 몰트가 부드럽게 이어집니다.\n마지막에는 가벼운 홉의 쌉쌀함이 균형을 잡아\n깔끔하게 마무리됩니다.',
        pairing: ['새우 크림 파스타', '그릴드 치킨', '크루아상 샌드위치'],
        tags: ['오렌지', '살구', '꿀', '은은한 꽃향']
      },
      forest: {
        name: 'Forest IPA',
        image: 'assets/images/collection/Forest IPA.png',
        flavor: '울창한 숲속을 걸을 때 느껴지는\n신선한 공기와 나무 향을 표현했습니다.\n홉이 가진 풍부한 향과 싱그러운 시트러스 품미가\n자연 속에 있는 듯한 경험을 선사합니다.',
        pairing: ['스테이크', '체더 치즈', '버섯 리소토'],
        tags: ['솔잎', '자몽', '오렌지', '허브']
      },
      ocean: {
        name: 'Ocean Lager',
        image: 'assets/images/collection/Ocean Lager.png',
        flavor: '깨끗한 몰트의 풍미와 함께\n레몬 껍질을 연상시키는 산뜻한 향이 퍼집니다.\n은은한 허브 향이 뒤를 받쳐주며\n청량한 탄산감이 입안을 상쾌하게 정리합니다.',
        pairing: ['새우구이', '피시앤칩스', '시저 샐러드'],
        tags: ['레몬', '라임', '허브', '신선한 곡물']
      },
      midnight: {
        name: 'Midnight Stout',
        image: 'assets/images/collection/Midnight Stout.png',
        flavor: '로스팅된 몰트의 깊은 풍미가 중심을 이루며,\n다크 초콜릿과 에스프레소의 진한 맛이 천천히 퍼집니다.\n은은한 바닐라와 카라멜이 조화를 이루며\n부드럽고 긴 여운을 남깁니다.',
        pairing: ['티라미수', '숙성 체더 치즈', '훈제 스테이크'],
        tags: ['다크 초콜릿', '에스프레소', '바닐라', '토피']
      }
    },

    init: function () {
      this.bindEvents();
    },

    bindEvents: function () {
      var self = this;

      $(document).on('click', '[data-collection-open]', function (e) {
        e.preventDefault();
        var productId = $(this).data('collection-open');
        self.openProduct(productId);
      });
    },

    openProduct: function (productId) {
      var product = this.products[productId];
      if (!product) return;

      this.renderPopup(product);

      if (typeof App.popup !== 'undefined') {
        App.popup.open(this.popupId);
      }
    },

    renderPopup: function (product) {
      var $popup = $('#' + this.popupId);
      var $pairing = $('#popup-collection-pairing');
      var $tags = $('#popup-collection-tags');

      $popup.find('#popup-collection-title').text(product.name);
      $popup.find('#popup-collection-img').attr({
        src: product.image,
        alt: product.name
      });
      $popup.find('#popup-collection-flavor').text(product.flavor);

      $pairing.empty();
      product.pairing.forEach(function (item) {
        $pairing.append($('<li>').text(item));
      });

      $tags.empty();
      product.tags.forEach(function (tag) {
        $tags.append($('<li>').addClass('collection-popup__tag typo--caption-02').text(tag));
      });
    }
  };

  $(function () {
    Collection.init();
  });

})(jQuery);
