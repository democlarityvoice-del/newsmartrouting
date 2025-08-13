// ===== mini-me code =====
;(function () {
  const ICON = 'https://raw.githubusercontent.com/democlarityvoice-del/intellirouting-icon/main/icon.svg';

  function when(pred, fn) {
    if (pred()) return void fn();
    const obs = new MutationObserver(() => { if (pred()) { obs.disconnect(); fn(); } });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    const iv = setInterval(() => { if (pred()) { clearInterval(iv); fn(); } }, 300);
  }

  function start() {
    // avoid duplicates
    if ($('#nav-intelli-routing').length) return;

    const $container = $('#nav-buttons');
    if (!$container.length) return;

    // use a known tile as a template; fall back to first li
    let $template = $('#nav-music');
    if (!$template.length) $template = $container.children('li').first();
    if (!$template.length) return;

    const $new = $template.clone(false, false);
    $new.attr('id', 'nav-intelli-routing');

    const $a = $new.find('a').first();
    $a.attr('id', 'nav-intelli-routing-link')
      .attr('href', '#')
      .attr('title', 'Intelli Routing');

    // label
    $new.find('.nav-text').text('Intelli Routing');

    // icon (mask)
    $new.find('.nav-bg-image').css({
      '-webkit-mask-image': `url("${https://raw.githubusercontent.com/democlarityvoice-del/intellirouting-icon/main/icon.svg}")`,
      'mask-image':         `url("${https://raw.githubusercontent.com/democlarityvoice-del/intellirouting-icon/main/icon.svg}")`,
      '-webkit-mask-repeat':'no-repeat',
      'mask-repeat':        'no-repeat',
      '-webkit-mask-position':'center 48%',
      'mask-position':      'center 48%',
      '-webkit-mask-size':  '71% 71%',
      'mask-size':          '71% 71%',
      'background-color':   'rgba(255,255,255,0.92)'
    });

    // click → fire a custom event (hook your overlay/panel to this)
    $a.off('click.intelli').on('click.intelli', function (e) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('cv:intelli-routing:open'));
    });

    // insert after the template to keep styling/order
    $new.insertAfter($template);
  }

  // wait for nav to exist, then add button
  when(() => $('#nav-buttons').length > 0, start);
    }
