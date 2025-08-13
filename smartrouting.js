// ===== Intelli Routing bootstrap (no scrolling) =====
;(function () {
  try {
    // wait until the nav exists
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
      if (document.getElementById('nav-intelli-routing')) return; // no duplicates

      var $container = $('#nav-buttons');
      if (!$container.length) return;

      // choose a template tile to clone
      var $template = $('#nav-music');
      if (!$template.length) $template = $container.children('li').first();
      if (!$template.length) return;

      var $new = $template.clone(false, false);
      $new.attr('id', 'nav-intelli-routing');

      var $a = $new.find('a').first()
        .attr('id', 'nav-intelli-routing-link')
        .attr('href', '#')
        .attr('title', 'Intelli Routing');

      // label
      $new.find('.nav-text').text('Intelli Routing');

      // icon (your URL exactly as requested)
      $new.find('.nav-bg-image').css({
        '-webkit-mask-image': "url('https://raw.githubusercontent.com/democlarityvoice-del/intellirouting-icon/refs/heads/main/icon.svg')",
        'mask-image':         "url('https://raw.githubusercontent.com/democlarityvoice-del/intellirouting-icon/refs/heads/main/icon.svg')",
        '-webkit-mask-repeat':'no-repeat',
        'mask-repeat':        'no-repeat',
        '-webkit-mask-position':'center 48%',
        'mask-position':      'center 48%',
        '-webkit-mask-size':  '71% 71%',
        'mask-size':          '71% 71%',
        'background-color':   'rgba(255,255,255,0.92)'
      });

      // click → lazy-load your Smart Routing script once, then signal open
      $a.off('click.intelli').on('click.intelli', function (e) {
        e.preventDefault();
        if (!window.__cvIntelliLoaded) {
          var s = document.createElement('script');
          s.id = 'cv-intelli-loader';
          // cache-bust so you see your latest changes during dev
          s.src = 'https://democlarityvoice-del.github.io/newsmartrouting/smartrouting.js?v=' + Date.now();
          s.onload = function () {
            window.__cvIntelliLoaded = true;
            window.dispatchEvent(new CustomEvent('cv:intelli-routing:open'));
          };
          s.onerror = function () {
            console.error('Failed to load Intelli Routing script');
            alert('Could not load Intelli Routing. Check network or script URL.');
          };
          document.head.appendChild(s);
        } else {
          window.dispatchEvent(new CustomEvent('cv:intelli-routing:open'));
        }
      });

      // position: after Call History if present, else at end
      var $after = $('#nav-callhistory');
      if ($after.length) $new.insertAfter($after); else $new.appendTo($container);

      console.log('Intelli Routing button inserted');
    }

    when(function () { return $('#nav-buttons').length > 0; }, start);
  } catch (e) {
    console.error('Intelli button script error:', e && e.message ? e.message : e);
  }
})();
