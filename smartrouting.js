// ===== mini-me code =====
;(function () {
  try {
    function when(pred, fn) {
      if (pred()) return void fn();
      var obs = new MutationObserver(function () { if (pred()) { obs.disconnect(); fn(); } });
      obs.observe(document.documentElement, { childList: true, subtree: true });
      var iv = setInterval(function () { if (pred()) { clearInterval(iv); fn(); } }, 300);
    }

    function start() {
      if ($('#nav-intelli-routing').length) return; // no duplicates
      var $template = $('#nav-music');
      if (!$template.length) $template = $('#nav-buttons').children('li').first();
      if (!$template.length) return;

      var $new = $template.clone(false, false);
      $new.attr('id', 'nav-intelli-routing');

      var $a = $new.find('a').first()
        .attr('id', 'nav-intelli-routing-link')
        .attr('href', '#')
        .attr('title', 'Intelli Routing');

      $new.find('.nav-text').text('Intelli Routing');

      // keeping the existing icon; no CSS mask changes

      // click → fire an event your overlay can listen for
      $a.off('click.intelli').on('click.intelli', function (e) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('cv:intelli-routing:open'));
      });

      // actually insert it next to the template
      $new.insertAfter($template);
      console.log('Intelli Routing button inserted');
    }

    when(function () { return $('#nav-buttons').length > 0; }, start);
  } catch (e) {
    console.error('Intelli button script error:', e && e.message ? e.message : e);
  }
})();
