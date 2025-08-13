// ===== mini-me code =====
;(() => {
  const ICON = 'https://raw.githubusercontent.com/democlarityvoice-del/intellirouting-icon/main/icon.svg';

  function when(pred, fn) {
    if (pred()) return void fn();
    const obs = new MutationObserver(() => { if (pred()) { obs.disconnect(); fn(); } });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    const iv = setInterval(() => { if (pred()) { clearInterval(iv); fn(); } }, 300);
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
      '-webkit-mask-image': `url("${ICON}")`,
      'mask-image':         `url("${ICON}")`,
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
