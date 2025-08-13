// ===== mini-me code =====
;(function () {
  try {
    function when(pred, fn) {
      if (pred()) return fn();
      var obs = new MutationObserver(function () {
        if (pred()) { obs.disconnect(); fn(); }
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
      var iv = setInterval(function () {
        if (pred()) { clearInterval(iv); fn(); }
      }, 300);
    }

  function start() {
    if ($('#nav-intelli-routing').length) return; // no duplicates

    let $template = $('#nav-music');
    if (!$template.length) $template = $('#nav-buttons').children('li').first();
    if (!$template.length) return;

    const $new = $template.clone(false, false);
    $new.attr('id', 'nav-intelli-routing');

    const $a = $new.find('a').first()
      .attr('id', 'nav-intelli-routing-link')
      .attr('href', '#')
      .attr('title', 'Intelli Routing');

    $new.find('.nav-text').text('Intelli Routing');

    $new.find('.nav-bg-image').css({
      '-webkit-mask-image': `url("${https://github.com/democlarityvoice-del/intellirouting-icon/raw/refs/heads/main/icon.svg")`,
      'mask-image':         `url("${https://github.com/democlarityvoice-del/intellirouting-icon/raw/refs/heads/main/icon.svg")`,
      '-webkit-mask-repeat':'no-repeat',
      'mask-repeat':        'no-repeat',
      '-webkit-mask-position':'center 48%',
      'mask-position':      'center 48%',
      '-webkit-mask-size':  '71% 71%',
      'mask-size':          '71% 71%',
      'background-color':   'rgba(255,255,255,0.92)'
    });

    // click → fire an event your overlay can listen for
    $a.off('click.intelli').on('click.intelli', (e) => {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('cv:intelli-routing:open'));
    });

    // actually insert it next to the template
    $new.insertAfter($template);
    console.log('Intelli Routing button inserted');
  }

  when(() => $('#nav-buttons').length > 0, start);
})();
