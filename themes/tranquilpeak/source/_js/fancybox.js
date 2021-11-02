(function($) {
  'use strict';

  // Run fancybox feature

  $(document).ready(function() {
    /**
     * Configure and run Fancybox plugin
     * @returns {void}
     */
    function fancyFox() {
      var thumbs = false;

      // disable navigation arrows and display thumbs on medium and large screens
      if ($(window).height() > 480) {
        thumbs = true;
      }

      $('.fancybox').fancybox({
        buttons: [
          'fullScreen',
          'thumbs',
          'share',
          'download',
          'zoom',
          'close'
        ],
        thumbs: {
          autoStart: thumbs,
          axis: 'x'
        }
      });
    }

    $('.post-content').each(function (i) {
      $(this).find('img').each(function () {
        if ($(this).parent().hasClass('fancybox') || $(this).parent().is('a')) return;

        var alt = this.alt;

        if (alt) $(this).after('<span class="caption">' + alt + '</span>');

        $(this).wrap('<a href="' + this.src + '" data-fancybox=\"gallery\" data-caption="' + alt + '"></a>')
      });

      $(this).find('.fancybox').each(function () {
        $(this).attr('rel', 'article' + i);
      });
    });

    fancyFox();

    $(window).smartresize(function() {
      fancyFox();
    });
  });
})(jQuery);
