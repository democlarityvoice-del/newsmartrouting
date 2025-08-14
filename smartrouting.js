// ===== Intelli Routing bootstrap (no scrolling) ===== iframe
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
})(); // <—— missing close was here

/* ===== Intelli Routing — IFRAME mount (match EngageCX pattern) ===== */
;(function(){
  var DEFAULT_ACCENT = '#f89406';
  var DEFAULT_TINT   = '#FDE8CC';

  // ---- nav active + centered title ----
  var _origNavTitle = null;
  function setActive(on){
    try {
      var $ = window.jQuery || window.$;
      if ($ && $.fn) {
        $('#nav-buttons li').removeClass('nav-link-current');
        if (on) $('#nav-intelli-routing').addClass('nav-link-current');
        return;
      }
    } catch(_) {}
    var lis = document.querySelectorAll('#nav-buttons li');
    for (var i=0;i<lis.length;i++) lis[i].classList.remove('nav-link-current');
    if (on) { var me=document.getElementById('nav-intelli-routing'); if (me) me.classList.add('nav-link-current'); }
  }
  function setTitle(on){
    var el = document.querySelector('.navigation-title'); if (!el) return;
    if (on) { if (_origNavTitle==null) _origNavTitle = (el.textContent||'').trim(); el.textContent = 'Intelli Routing'; }
    else if (_origNavTitle!=null) { el.textContent=_origNavTitle; _origNavTitle=null; }
  }

  // ---- open/close ----
  function openIntelli(){
    setActive(true);
    setTitle(true);

    var content = document.getElementById('content') || document.querySelector('#page-content') || document.body;

    var slot = document.getElementById('intelli-slot');
    if (!slot) { slot = document.createElement('div'); slot.id='intelli-slot'; content.innerHTML=''; content.appendChild(slot); }
    else { slot.innerHTML=''; }

    var iframe = document.createElement('iframe');
    iframe.id = 'intelliFrame';
    iframe.setAttribute('scrolling','yes');
    iframe.style.cssText = 'border:none;width:100%;height:calc(100vh - 240px);min-height:800px;overflow:auto;';
    slot.appendChild(iframe);

    iframe.onload = function(){
      var doc = iframe.contentDocument;
      doc.open();
      doc.write(
        '<!doctype html><html><head><meta charset="utf-8"><title>Intelli Routing</title>' +
        '<style id="cv-intelli-style">' + iCss(DEFAULT_ACCENT, DEFAULT_TINT) + '</style>' +
        '</head><body style="margin:0;padding:16px;background:#fff">' +
        '<div id="cv-intelli-mount">Loading…</div>' +
        '</body></html>'
      );
      doc.close();

      // Wait for your mount function to exist, then render into the iframe.
      waitForMountThenRender(doc);
    };

    iframe.src = 'about:blank'; // keep same-origin
  }

  function waitForMountThenRender(doc){
    var tries = 0, maxTries = 40; // ~6s total
    (function tick(){
      if (typeof window.cvIntelliRoutingMount === 'function') {
        try { window.cvIntelliRoutingMount(doc.getElementById('cv-intelli-mount')); }
        catch(e){
          console.error('[Intelli] mount error:', e);
          doc.getElementById('cv-intelli-mount').textContent = 'Mount error: '+(e && e.message || e);
        }
        return;
      }
      if (++tries > maxTries) {
        doc.getElementById('cv-intelli-mount').textContent = 'Mount function not found.';
        return;
      }
      setTimeout(tick, 150);
    })();
  }

  function closeIntelli(){
    setActive(false);
    setTitle(false);
    // let the portal re-render #content on its own
  }

  // ---- minimal CSS used by your mount (scoped inside iframe) ----
  function iCss(ACC, TINT){
    return [
      ':root{--cv-accent:',ACC,';--cv-tint:',TINT,'}',
      'body{font:14px/1.4 system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111}',
      '.ir{display:flex;gap:16px;min-height:420px}',
      '.ir-left{width:340px;flex:0 0 340px}',
      '.ir-right{flex:1;min-width:0}',
      '.ir-h1{font-weight:600;margin:0 0 8px}',
      '.ir-search{width:100%;padding:8px 10px;border:1px solid #ddd;border-radius:10px}',
      '.ir-search:focus{outline:none;box-shadow:0 0 0 3px rgba(229,112,39,.35);border-color:var(--cv-accent)}',
      '.ir-filters{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 10px}',
      '.chip{font-size:12px;padding:4px 8px;border:1px solid #e5e5e5;border-radius:999px;background:#fafafa;cursor:pointer}',
      '.chip:hover{background:#f6f7fb}',
      '.chip.active{background:var(--cv-tint);border-color:var(--cv-accent);color:#4a2a00}',
      '.list-outer{border:1px solid #eee;border-radius:10px;background:#fff}',
      '.card{position:relative;border:1px solid #eee;border-radius:12px;background:#fff;box-shadow:0 8px 30px rgba(0,0,0,.06);margin-bottom:12px}',
      '.card .left-bar{position:absolute;left:0;top:0;bottom:0;width:6px;border-top-left-radius:12px;border-bottom-left-radius:12px;background:var(--cv-accent)}',
      '.card-h{position:relative;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 14px 12px 20px;border-bottom:1px solid #eee;background:#fafafa;border-top-left-radius:12px;border-top-right-radius:12px}',
      '.card-title{font-weight:600;line-height:1.2}',
      '.hdr-left{display:flex;align-items:center;gap:8px;min-width:0}',
      '.hdr-right{display:flex;align-items:center;gap:10px;flex-shrink:0}',
      '.count-badge{font-size:12px;background:var(--cv-tint);color:#4a2a00;border:1px solid var(--cv-accent);border-radius:999px;padding:2px 8px;white-space:nowrap}',
      '.dest-badge{font-size:12px;padding:2px 6px;border-radius:6px;background:var(--cv-tint);border:1px solid var(--cv-accent);white-space:nowrap}',
      '.card-b{padding:12px 14px}',
      '.rows{position:relative;height:220px;overflow:auto;border:1px solid #f2f2f2;border-radius:8px;background:#fff}',
      '.vpad{height:0}',
      '.row{display:flex;align-items:center;justify-content:space-between;height:40px;padding:0 10px;border-bottom:1px solid #f6f6f6;font-variant-numeric:tabular-nums}',
      '.row:hover{background:#fff7f2}',
      '.row-num{font-variant-numeric:tabular-nums}',
      '.muted{color:#666}',
      '.controls{display:flex;gap:8px;align-items:center;margin:0 0 10px}',
      '.sel{padding:6px 8px;border:1px solid #ddd;border-radius:8px;background:#fff}',
      '.sel:focus{outline:none;box-shadow:0 0 0 3px rgba(229,112,39,.35);border-color:var(--cv-accent)}',
      '.btn{cursor:pointer;border:none;background:var(--cv-accent);color:#fff;padding:8px 12px;border-radius:10px;line-height:1;font-weight:600}',
      '.btn:hover{filter:brightness(.95)}',
      '.pill{font-size:12px;padding:2px 8px;border:1px solid #ddd;border-radius:999px;background:#fafafa}'
    ].join('');
  }

  // open via your existing event
  window.addEventListener('cv:intelli-routing:open', openIntelli, false);

  // close when any other nav tile is clicked
  (function wireNavClose(){
    var $ = window.jQuery || window.$;
    if ($ && $.fn) {
      $(document).off('click.intelli-navclose')
        .on('click.intelli-navclose', '#nav-buttons li:not(#nav-intelli-routing) a', function(){ closeIntelli(); });
    } else {
      document.addEventListener('click', function(e){
        var nav = document.getElementById('nav-buttons');
        if (!nav || !nav.contains(e.target)) return;
        var li = e.target.closest('li');
        if (!li || li.id === 'nav-intelli-routing') return;
        closeIntelli();
      }, true);
    }
  })();
})();
/* ===== Intelli Routing — Mount (iframe-safe, no globals) ===== */
;(function () {
  if (typeof window.cvIntelliRoutingMount === 'function') return; // guard

  window.cvIntelliRoutingMount = function (root) {
    try {
      if (!root) { console.error('[Intelli] mount: missing root'); return; }
      var doc = root.ownerDocument;

      // ——— minimal scoped styles inside the iframe document
      var st = doc.getElementById('cv-intelli-iframe-style');
      if (!st) {
        st = doc.createElement('style');
        st.id = 'cv-intelli-iframe-style';
        st.textContent = [
          '.ir-wrap{font:14px/1.45 system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#222}',
          '.ir-top{padding:10px 12px;border-bottom:1px solid #e5e7eb;background:#fafafa;font-weight:600}',
          '.ir-body{display:flex;gap:16px;padding:12px}',
          '.ir-left{flex:0 0 340px}',
          '.ir-right{flex:1;min-width:0}',
          '.ir-h1{font-weight:600;margin:0 0 8px}',
          '.ir-card{border:1px solid #eee;border-radius:10px;background:#fff;box-shadow:0 8px 24px rgba(0,0,0,.06);margin-bottom:12px}',
          '.ir-card-h{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid #eee;background:#fafafa;border-top-left-radius:10px;border-top-right-radius:10px}',
          '.ir-card-b{padding:10px 12px}',
          '.ir-chip{display:inline-block;font-size:12px;padding:4px 8px;margin:0 6px 6px 0;border:1px solid #e5e5e5;border-radius:999px;background:#fafafa;cursor:pointer}',
          '.ir-chip.active{background:#FDE8CC;border-color:#f89406;color:#4a2a00}',
          '.ir-search{width:100%;padding:8px 10px;border:1px solid #ddd;border-radius:10px}',
          '.ir-btn{cursor:pointer;border:none;background:#f89406;color:#fff;padding:8px 12px;border-radius:10px;line-height:1;font-weight:600}'
        ].join('\n');
        doc.head.appendChild(st);
      }

      // ——— layout
      root.innerHTML = '';
      var wrap = doc.createElement('div');
      wrap.className = 'ir-wrap';
      wrap.innerHTML =
        '<div class="ir-top">Intelli Routing</div>' +
        '<div class="ir-body">' +
        '  <div class="ir-left">' +
        '    <div class="ir-h1">Destinations</div>' +
        '    <input class="ir-search" placeholder="Search destination or number…">' +
        '    <div style="margin:8px 0 10px">' +
        '      <span class="ir-chip active">All</span>' +
        '      <span class="ir-chip">User</span>' +
        '      <span class="ir-chip">Queue</span>' +
        '      <span class="ir-chip">Auto Attendant</span>' +
        '      <span class="ir-chip">External</span>' +
        '      <span class="ir-chip">Voicemail</span>' +
        '    </div>' +
        '    <div class="ir-card"><div class="ir-card-h">Marketing Router <button class="ir-btn" id="ir-demo-expand">Expand</button></div><div class="ir-card-b">Click expand to preview demo numbers…</div></div>' +
        '  </div>' +
        '  <div class="ir-right">' +
        '    <div class="ir-h1">Details</div>' +
        '    <div class="ir-card"><div class="ir-card-b" id="ir-detail">Expand a destination on the left to view numbers and previews.</div></div>' +
        '  </div>' +
        '</div>';
      root.appendChild(wrap);

      // ——— tiny demo interaction so you can verify it’s alive
      var btn = doc.getElementById('ir-demo-expand');
      if (btn) {
        btn.addEventListener('click', function () {
          var detail = doc.getElementById('ir-detail');
          detail.innerHTML = 'This is a demo preview with 100 numbers. (Wiring confirmed ✔)';
        });
      }
    } catch (e) {
      try { root.textContent = 'Mount error: ' + (e && e.message ? e.message : e); } catch (_) {}
      console.error('[Intelli] mount failed:', e);
    }
  };
})();
