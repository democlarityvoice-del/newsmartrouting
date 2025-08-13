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

  // ===== Intelli Routing overlay harness (no scroll) =====
(function () {
  // create (or return) the mount with shadow DOM
  function getMount() {
    var host = document.getElementById('cv-intelli-root');
    if (!host) {
      host = document.createElement('div');
      host.id = 'cv-intelli-root';
      host.style.all = 'initial';
      host.style.position = 'fixed';
      host.style.inset = '0';
      host.style.zIndex = '999999';
      host.style.display = 'none'; // hidden until opened
      document.body.appendChild(host);
      host.attachShadow({ mode: 'open' });
      var s = document.createElement('style');
      s.textContent = `
        .backdrop{position:fixed;inset:0;background:rgba(0,0,0,.25);}
        .panel{position:fixed;top:6%;left:50%;transform:translateX(-50%);
               width:960px;max-width:90vw;background:#fff;border-radius:12px;
               box-shadow:0 20px 80px rgba(0,0,0,.25);font:14px/1.4 system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;}
        .hdr{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #eee;font-weight:600}
        .body{padding:16px; max-height:72vh; overflow:auto;}
        .btn{cursor:pointer;border:none;background:#0050d0;color:#fff;padding:8px 10px;border-radius:8px}
        .x{cursor:pointer;background:transparent;border:none;font-size:20px;line-height:1}
      `;
      host.shadowRoot.appendChild(s);
      var wrap = document.createElement('div');
      wrap.innerHTML = `
        <div class="backdrop" part="backdrop"></div>
        <div class="panel" part="panel" role="dialog" aria-modal="true" aria-label="Intelli Routing">
          <div class="hdr">
            <div>Intelli Routing</div>
            <button class="x" title="Close">×</button>
          </div>
          <div class="body">
            <div id="mount">Loading…</div>
          </div>
        </div>
      `;
      host.shadowRoot.appendChild(wrap);
      // close on backdrop or X
      wrap.querySelector('.backdrop').addEventListener('click', function(){ host.style.display='none'; });
      wrap.querySelector('.x').addEventListener('click', function(){ host.style.display='none'; });
      // expose the inner mount to your app
      host._mountEl = wrap.querySelector('#mount');
    }
    return host;
  }

  // let your external script mount into our shell
  window.cvIntelliRoutingMount = window.cvIntelliRoutingMount || function (root) {
    // default stub if your script isn't loaded yet
    root.innerHTML = '<p style="margin:0">Overlay ready. Your app can mount here via <code>cvIntelliRoutingMount(root)</code>.</p>';
  };

  // open handler
  window.addEventListener('cv:intelli-routing:open', function () {
    var host = getMount();
    host.style.display = 'block';
    // hand a clean element to your app to render into
    var mount = host._mountEl;
    // if your script provided a real mount function, call it
    try { window.cvIntelliRoutingMount(mount); } catch (e) { console.error(e); }
  });

  console.log('Intelli harness ready');
})();

