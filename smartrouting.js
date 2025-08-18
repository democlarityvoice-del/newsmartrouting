// ===== Intelli Routing bootstrap (no scrolling) ===== iframe- fixed
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

// ===== Intelli Routing bootstrap (no scrolling) ===== iframe- fixed
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

// ===== Intelli Routing bootstrap (no scrolling) ===== iframe- fixed
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

    // SAFE predicate (no $) so it never crashes if jQuery isn't ready yet
    when(function () {
      try {
        var c = document.querySelector('#nav-buttons');
        return !!(c && (document.getElementById('nav-music') || c.querySelector('li')));
      } catch (_) { return false; }
    }, start);
  } catch (e) {
    console.error('Intelli button script error:', e && e.message ? e.message : e);
  }
})(); // <—— missing close was here

/* --- SAFETY FALLBACK: robust, jQuery-free reinserter --- */
;(function(){
  function findNavContainer(){
    var sels = [
      '#nav-buttons',
      'ul#nav-buttons',
      '.nav-buttons',
      'nav #nav-buttons',
      '#navigation #nav-buttons'
    ];
    for (var i=0;i<sels.length;i++){
      var el = document.querySelector(sels[i]);
      if (el) return el;
    }
    return null;
  }

  function insertIfMissing(){
    if (document.getElementById('nav-intelli-routing')) return;
    var container = findNavContainer();
    if (!container) return;

    var template = document.getElementById('nav-music') || container.querySelector('li');
    if (!template) return;

    var el = template.cloneNode(true);
    el.id = 'nav-intelli-routing';

    var a = el.querySelector('a');
    if (!a) { a = document.createElement('a'); el.appendChild(a); }
    a.id = 'nav-intelli-routing-link';
    a.href = '#';
    a.title = 'Intelli Routing';
    // vanilla click handler (works even without jQuery)
    a.addEventListener('click', function(e){
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('cv:intelli-routing:open'));
    });

    var txt = el.querySelector('.nav-text'); if (txt) txt.textContent = 'Intelli Routing';
    var bg  = el.querySelector('.nav-bg-image'); if (bg){
      bg.style.webkitMaskImage = "url('https://raw.githubusercontent.com/democlarityvoice-del/intellirouting-icon/refs/heads/main/icon.svg')";
      bg.style.maskImage       = "url('https://raw.githubusercontent.com/democlarityvoice-del/intellirouting-icon/refs/heads/main/icon.svg')";
      bg.style.webkitMaskRepeat= 'no-repeat'; bg.style.maskRepeat='no-repeat';
      bg.style.webkitMaskPosition='center 48%'; bg.style.maskPosition='center 48%';
      bg.style.webkitMaskSize='71% 71%'; bg.style.maskSize='71% 71%';
      bg.style.backgroundColor='rgba(255,255,255,0.92)';
    }

    var after = document.getElementById('nav-callhistory');
    if (after && after.parentNode===container) container.insertBefore(el, after.nextSibling);
    else container.appendChild(el);

    console.log('Intelli Routing button inserted (fallback)');
  }

  // run now, on DOM ready, and on any DOM mutation (SPA-safe)
  insertIfMissing();
  if (document.readyState==='loading') {
    document.addEventListener('DOMContentLoaded', insertIfMissing);
  }
  new MutationObserver(insertIfMissing).observe(document.documentElement,{childList:true,subtree:true});
})();

/* ===== Intelli Routing — Overlay (dock; scoped; banner/title swap; active state) ===== */
;(function(){
  var DEFAULT_ACCENT = '#f89406';
  var DEFAULT_TINT   = '#FDE8CC';

  function ensureStyle(){
    if (document.getElementById('cv-intelli-style')) return;
    var css = [
      '#cv-intelli-root{display:none; --cv-accent:'+DEFAULT_ACCENT+'; --cv-tint:'+DEFAULT_TINT+';}',
      '#cv-intelli-root.dock{position:absolute; inset:0; z-index:9999}',
      '#cv-intelli-root.float{position:fixed; inset:0; z-index:999999}',
      '#cv-intelli-root .cv-back{position:absolute; inset:0; background:#fff; opacity:1}', /* solid backdrop */
      '#cv-intelli-root .cv-panel{position:absolute; inset:0; background:#fff; box-sizing:border-box; font:14px/1.4 system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif}',
      '#cv-intelli-root.float .cv-panel{margin:4% auto; max-width:960px; height:auto; border-radius:12px; box-shadow:0 8px 40px rgba(0,0,0,.12)}',
      '#cv-intelli-root .cv-h{display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:linear-gradient(180deg, var(--cv-tint), #fff); border-bottom:1px solid rgba(229,112,39,.22); font-weight:600}',
      '#cv-intelli-root .cv-x{cursor:pointer; background:transparent; border:none; font-size:20px; line-height:1}',
      '#cv-intelli-root .cv-b{padding:16px; height:calc(100% - 52px); overflow:auto}',

      /* ===== scoped UI ===== */
      '#cv-intelli-root .ir{display:flex; gap:16px; min-height:420px}',
      '#cv-intelli-root .ir-left{width:340px; flex:0 0 340px}',
      '#cv-intelli-root .ir-right{flex:1; min-width:0}',
      '#cv-intelli-root .ir-h1{font-weight:600; margin:0 0 8px}',
      '#cv-intelli-root .ir-search{width:100%; padding:8px 10px; border:1px solid #ddd; border-radius:10px}',
      '#cv-intelli-root .ir-search:focus{outline:none; box-shadow:0 0 0 3px rgba(229,112,39,.35); border-color:var(--cv-accent)}',
      '#cv-intelli-root .ir-filters{display:flex; gap:6px; flex-wrap:wrap; margin:8px 0 10px}',
      '#cv-intelli-root .chip{font-size:12px; padding:4px 8px; border:1px solid #e5e5e5; border-radius:999px; background:#fafafa; cursor:pointer}',
      '#cv-intelli-root .chip:hover{background:#f6f7fb}',
      '#cv-intelli-root .chip.active{background:var(--cv-tint); border-color:var(--cv-accent); color:#4a2a00}',
      '#cv-intelli-root .list-outer{border:1px solid #eee; border-radius:10px; background:#fff}',
      '#cv-intelli-root .card{position:relative; border:1px solid #eee; border-radius:12px; background:#fff; box-shadow:0 8px 30px rgba(0,0,0,.06); margin-bottom:12px}',
      '#cv-intelli-root .card .left-bar{position:absolute; left:0; top:0; bottom:0; width:6px; border-top-left-radius:12px; border-bottom-left-radius:12px; background:var(--cv-accent)}',
      '#cv-intelli-root .card-h{position:relative; display:flex; justify-content:space-between; align-items:center; gap:12px; padding:12px 14px 12px 20px; border-bottom:1px solid #eee; background:#fafafa; border-top-left-radius:12px; border-top-right-radius:12px}',
      '#cv-intelli-root .card-title{font-weight:600; line-height:1.2}',
      '#cv-intelli-root .hdr-left{display:flex; align-items:center; gap:8px; min-width:0}',
      '#cv-intelli-root .hdr-right{display:flex; align-items:center; gap:10px; flex-shrink:0}',
      '#cv-intelli-root .count-badge{font-size:12px; background:var(--cv-tint); color:#4a2a00; border:1px solid var(--cv-accent); border-radius:999px; padding:2px 8px; white-space:nowrap}',
      '#cv-intelli-root .dest-badge{font-size:12px; padding:2px 6px; border-radius:6px; background:var(--cv-tint); border:1px solid var(--cv-accent); white-space:nowrap}',
      '#cv-intelli-root .card-b{padding:12px 14px}',
      '#cv-intelli-root .rows{position:relative; height:220px; overflow:auto; border:1px solid #f2f2f2; border-radius:8px; background:#fff}',
      '#cv-intelli-root .vpad{height:0}',
      '#cv-intelli-root .row{display:flex; align-items:center; justify-content:space-between; height:40px; padding:0 10px; border-bottom:1px solid #f6f6f6; font-variant-numeric:tabular-nums}',
      '#cv-intelli-root .row:hover{background:#fff7f2}',
      '#cv-intelli-root .row-num{font-variant-numeric:tabular-nums}',
      '#cv-intelli-root .muted{color:#666}',
      '#cv-intelli-root .controls{display:flex; gap:8px; align-items:center; margin:0 0 10px}',
      '#cv-intelli-root .sel{padding:6px 8px; border:1px solid #ddd; border-radius:8px; background:#fff}',
      '#cv-intelli-root .sel:focus{outline:none; box-shadow:0 0 0 3px rgba(229,112,39,.35); border-color:var(--cv-accent)}',
      '#cv-intelli-root .btn{cursor:pointer; border:none; background:var(--cv-accent); color:#fff; padding:8px 12px; border-radius:10px; line-height:1; font-weight:600}',
      '#cv-intelli-root .btn:hover{filter:brightness(.95)}',
      '#cv-intelli-root .pill{font-size:12px; padding:2px 8px; border:1px solid #ddd; border-radius:999px; background:#fafafa}',

      /* ===== AA dial pad (right side) ===== */
      '#cv-intelli-root .dial{border:1px solid #eee; border-radius:12px; background:#fff; overflow:hidden}',
      '#cv-intelli-root .dial-h{padding:10px 12px; background:#fafafa; border-bottom:1px solid #eee; font-weight:600}',
      '#cv-intelli-root .dial-keys{display:flex; gap:10px; align-items:center; flex-wrap:wrap; padding:12px}',
      '#cv-intelli-root .dial-key{width:42px; height:42px; border-radius:50%; border:1px solid #ddd; display:flex; align-items:center; justify-content:center; cursor:pointer; user-select:none}',
      '#cv-intelli-root .dial-key:hover{border-color:var(--cv-accent); box-shadow:0 0 0 3px rgba(229,112,39,.18)}',
      '#cv-intelli-root .dial-next{padding:12px; border-top:1px dashed #e5e5e5}',
      '#cv-intelli-root .route-row{display:flex; align-items:center; gap:8px; padding:6px 0}',
      '#cv-intelli-root .route-badge{font-size:12px; padding:2px 6px; border:1px solid var(--cv-accent); border-radius:6px; background:var(--cv-tint)}'
    ].join('\n');
    var st=document.createElement('style'); st.id='cv-intelli-style'; st.type='text/css';
    st.appendChild(document.createTextNode(css)); document.head.appendChild(st);
  }

  function setAccent(accentHex, tintHex){
    var root = document.getElementById('cv-intelli-root');
    if (!root) return;
    if (accentHex) root.style.setProperty('--cv-accent', accentHex);
    if (tintHex)   root.style.setProperty('--cv-tint',   tintHex);
  }
  window.cvIntelliSetAccent = setAccent;

  function findDockHost(){
    var sels=['#page-content','#content','#contentArea','#main-content','#portal-content',
              '#container','#content_wrap','#contentWrap','#workarea','#inner-content','#engagecx-slot'];
    for(var i=0;i<sels.length;i++){ var el=document.querySelector(sels[i]); if(el && el.offsetParent!==null && el.offsetHeight>200) return el; }
    return null;
  }

  function ensureRoot(){
    ensureStyle();
    var host = findDockHost();
    var mode = host ? 'dock' : 'float';

    var root = document.getElementById('cv-intelli-root');
    if (!root){
      root = document.createElement('div');
      root.id = 'cv-intelli-root';
      root.innerHTML =
        '<div class="cv-back"></div>'
      + '<div class="cv-panel" role="dialog" aria-modal="true" aria-label="Intelli Routing">'
      + '  <div class="cv-h"><div>Intelli Routing</div><button class="cv-x" title="Close">×</button></div>'
      + '  <div class="cv-b"><div id="cv-intelli-mount">Loading…</div></div>'
      + '</div>';

      (host || document.body).appendChild(root);
      function close(){ root.style.display='none'; swapBanner(false); swapNavTitle(false); setNavActiveIntelli(false); }
      root.querySelector('.cv-back').addEventListener('click', close);
      root.querySelector('.cv-x').addEventListener('click', close);
    } else {
      var parent = host || document.body;
      if (root.parentNode !== parent) parent.appendChild(root);
    }

    root.className = mode;
    if (host && getComputedStyle(host).position === 'static'){ host.style.position = 'relative'; }
    return root;
  }

  /* ------- Banner / Title helpers ------- */
  var _bannerEls = [], _origBannerTexts = [];
  function collectBannerEls(){
    _bannerEls = []; _origBannerTexts = [];
    var sels = [
      '#page-title h1','#pageTitle','.page-title h1','.pageTitle',
      '.content-title h1','.section-title h1','.titlebar h1',
      '.breadcrumbs + h1','.breadcrumb .active',
      '.module-title h1','.module-title','.tab-title','.tabs .current',
      '.home h1','#home h1','#content h1','#content h2'
    ];
    var seen = new Set();
    for (var i=0;i<sels.length;i++){
      var nodes = document.querySelectorAll(sels[i]);
      for (var j=0;j<nodes.length;j++){
        var el = nodes[j]; if (seen.has(el)) continue;
        var txt = (el.textContent||'').trim();
        var b = el.getBoundingClientRect();
        var vis = el.offsetParent !== null && b.width > 100 && b.top < 260;
        if (txt && vis) { _bannerEls.push(el); _origBannerTexts.push(txt); seen.add(el); }
      }
    }
    if (!_bannerEls.length){
      var all = document.querySelectorAll('h1,h2,.title,.titlebar,.tab-title,.module-title');
      for (var k=0;k<all.length;k++){
        var t=(all[k].textContent||'').trim();
        var bb=all[k].getBoundingClientRect();
        if (t==='Home' && all[k].offsetParent!==null && bb.top<260 && bb.width>100){
          _bannerEls.push(all[k]); _origBannerTexts.push(t);
        }
      }
    }
  }
  function swapBanner(on){
    if (on) { _bannerEls = []; _origBannerTexts = []; }
    if (!_bannerEls.length) collectBannerEls();
    for (var i=0;i<_bannerEls.length;i++){
      var el=_bannerEls[i]; if (!el) continue;
      el.textContent = on ? 'Intelli Routing' : (_origBannerTexts[i] || el.textContent);
    }
  }
  var _navTitleEl = null, _origNavTitle = null;
  function swapNavTitle(on){
    var el = _navTitleEl || document.querySelector('.navigation-title');
    if (!el) return;
    _navTitleEl = el;
    if (on) { if (_origNavTitle == null) _origNavTitle = (el.textContent || '').trim(); el.textContent = 'Intelli Routing'; }
    else if (_origNavTitle != null) { el.textContent = _origNavTitle; _origNavTitle = null; }
  }
  function setNavActiveIntelli(on){
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
  function closeIntelliOverlay(){
    var root = document.getElementById('cv-intelli-root');
    if (root) root.style.display = 'none';
    swapBanner(false); swapNavTitle(false); setNavActiveIntelli(false);
  }
  (function wireNavClose(){
    var $ = window.jQuery || window.$;
    if ($ && $.fn) {
      $(document).off('click.intelli-navclose')
        .on('click.intelli-navclose', '#nav-buttons li:not(#nav-intelli-routing) a', function(){ closeIntelliOverlay(); });
    } else {
      document.addEventListener('click', function(e){
        var nav = document.getElementById('nav-buttons');
        if (!nav || !nav.contains(e.target)) return;
        var li = e.target.closest('li');
        if (!li || li.id === 'nav-intelli-routing') return;
        closeIntelliOverlay();
      }, true);
    }
  })();

  function openOverlay(){
    var root = ensureRoot();
    root.style.display = 'block';
    setNavActiveIntelli(true);
    swapBanner(true);
    swapNavTitle(true);

    var mount = document.getElementById('cv-intelli-mount');
    if (typeof window.cvIntelliRoutingMount === 'function') {
      try { window.cvIntelliRoutingMount(mount); } catch(e){ console.error('[Intelli] mount error:', e); }
    } else {
      console.warn('[Intelli] cvIntelliRoutingMount not a function yet');
    }
  }

  window.addEventListener('cv:intelli-routing:open', openOverlay, false);
  window.cvIntelliOpen = openOverlay;
})();

/* ===== Smart Routing+ — Group by Destination (Portal-safe, vanilla JS) ===== */
;(function(){
  window.cvIntelliRoutingMount = function(root){
    try {
      root.innerHTML = '';

      // ---- helper (scoped) ----
      function make(tag, cls, html){ var el=document.createElement(tag); if(cls) el.className=cls; if(html!=null) el.innerHTML=html; return el; }

      // ---------- helpers ----------
      function groupByDestination(rows){
        var map={}, out=[];
        for (var i=0;i<rows.length;i++){
          var r=rows[i], key=(r.destType||'')+':'+(r.destId||'');
          if(!map[key]) map[key]={ key:key, type:r.destType||'External', id:r.destId||'', name:r.destName||'', numbers:[] };
          map[key].numbers.push({ id:r.id, number:r.number, label:r.label||'' });
        }
        for (var k in map){ if (map.hasOwnProperty(k)){ map[k].count = map[k].numbers.length; out.push(map[k]); } }
        out.sort(function(a,b){ return b.count - a.count || (a.type > b.type ? 1 : -1); });
        return out;
      }
      function mountVirtualList(container, items, rowH){
        container.innerHTML=''; container.className='rows';
        var pad=make('div','vpad'); pad.style.height=(items.length*rowH)+'px';
        var rows=make('div'); rows.style.position='absolute'; rows.style.left=0; rows.style.right=0; rows.style.top=0;
        container.appendChild(pad); container.appendChild(rows);
        function draw(){
          var top=container.scrollTop, h=container.clientHeight;
          var start=Math.max(0, Math.floor(top/rowH)-4);
          var end=Math.min(items.length, start+Math.ceil(h/rowH)+8);
          rows.style.transform='translateY('+(start*rowH)+'px)'; rows.innerHTML='';
          for(var i=start;i<end;i++){
            var it=items[i], row=make('div','row');
            var left=make('div',null,'<div class="row-num">'+it.number+'</div>'+(it.label?'<div class="muted">'+it.label+'</div>':''));
            var right=make('div','muted','#'+(it.id||'').toString().slice(-4));
            row.appendChild(left); row.appendChild(right); rows.appendChild(row);
          }
        }
        container.addEventListener('scroll', draw); draw(); return { redraw: draw };
      }
      // ----------------------------------------------

      // ---- layout scaffold
      var wrap = make('div','ir');
      wrap.innerHTML =
        '<div class="ir-left">'
      +   '<div class="ir-h1">Destinations</div>'
      +   '<input id="ir-q" class="ir-search" placeholder="Search destination or number…"/>'
      +   '<div class="ir-filters">'
      +     '<span data-ft="all" class="chip active">All</span>'
      +     '<span data-ft="User" class="chip">User</span>'
      +     '<span data-ft="Queue" class="chip">Queue</span>'
      +     '<span data-ft="AA" class="chip">Auto Attendant</span>'
      +     '<span data-ft="External" class="chip">External</span>'
      +     '<span data-ft="VM" class="chip">Voicemail</span>'
      +   '</div>'
      +   '<div class="list-outer"><div id="ir-groups"></div></div>'
      +   '<div id="ir-count" class="muted" style="margin-top:6px"></div>'
      + '</div>'
      + '<div class="ir-right">'
      +   '<div class="ir-h1">Details</div>'
      +   '<div class="controls">'
      +     '<label class="muted">When</label>'
      +     '<select id="ir-when" class="sel"><option value="now">Now</option><option value="custom">Pick date/time…</option></select>'
      +     '<input id="ir-dt" type="datetime-local" class="sel" style="display:none"/>'
      +     '<span class="pill" id="ir-mode">Grouping: First Hop</span>'
      +   '</div>'
      +   '<div id="ir-detail" class="muted">Expand a destination on the left to view numbers and previews.</div>'
      + '</div>';
      root.appendChild(wrap);

// ===== REAL numbers inventory: auto-detect endpoint (override with window.cvIntelliNumbersUrl) =====
// ===== REAL numbers inventory: API + iframe fallback =====
var NUMBERS_URL = window.cvIntelliNumbersUrl || null;

function addParam(url, key, val){
  try {
    var u = new URL(url, location.origin);
    if (!u.searchParams.has(key)) u.searchParams.set(key, val);
    return u.pathname + u.search;
  } catch (_) {
    return url + (url.indexOf('?') === -1 ? '?' : '&') + encodeURIComponent(key) + '=' + encodeURIComponent(val);
  }
}

async function fetchJSON(url){
  const r = await fetch(url, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
  const ct = (r.headers.get('content-type') || '').toLowerCase();
  if (!r.ok) throw new Error('HTTP '+r.status+' on '+url);
  if (ct.includes('application/json') || ct.includes('text/json')) return r.json();
  const txt = await r.text();
  throw new Error('Non-JSON response from '+url+(r.redirected ? ' (redirected to '+r.url+')' : '')+' — first 80 chars: '+txt.slice(0,80));
}

async function probeNumbersUrl(){
  if (NUMBERS_URL) return NUMBERS_URL;
  const candidates = [
    '/portal/api/numbers',
    '/portal/api/v1/numbers',
    '/portal/ajax/numbers',
    '/portal/ajax/dids',
    '/portal/inventory/numbers',
    '/portal/inventory/dids',
    '/portal/inventory/tns',
    '/api/numbers',
    '/ns-api/numbers',
    '/portal/number/list'
  ];
  for (var i=0;i<candidates.length;i++){
    try {
      const data = await fetchJSON(addParam(candidates[i], 'limit', '25'));
      const list = Array.isArray(data) ? data : (data.items || data.results || data.data || data.numbers);
      if (Array.isArray(list)) { console.log('[Intelli] numbers endpoint:', candidates[i]); NUMBERS_URL = candidates[i]; return NUMBERS_URL; }
    } catch(_){ /* try next */ }
  }
  // none gave JSON → we’ll scrape the UI.
  throw new Error('No JSON endpoint; falling back to iframe scrape.');
}

function formatTN(s){
  s = (s||'').replace(/[^\d]/g,'');
  if (s.length===11 && s[0]==='1') s = s.slice(1);
  if (s.length===10) return '('+s.slice(0,3)+') '+s.slice(3,6)+'-'+s.slice(6);
  return s || '';
}
function _norm(v){ return (v||'').toString().toLowerCase(); }
function mapDestType(t){
  t = _norm(t);
  if (/^(user|person|extension)$/.test(t)) return 'User';
  if (/^(queue|callqueue|acd)$/.test(t))   return 'Queue';
  if (/^(aa|auto.?attendant|ivr)$/.test(t)) return 'AA';
  if (/^(vm|voicemail)$/.test(t))          return 'VM';
  if (/^(external|pstn|sip|route|number)$/.test(t)) return 'External';
  return (t && t[0].toUpperCase()+t.slice(1)) || 'External';
}
function mapDestName(x, t){
  t = mapDestType(t);
  if (t==='User')  return x.user_name || x.owner_name || x.name || ('User '  +(x.owner_id||x.user_id||''));
  if (t==='Queue') return x.queue_name|| x.owner_name || x.name || ('Queue ' +(x.owner_id||x.queue_id||''));
  if (t==='AA')    return x.aa_name   || x.owner_name || x.name || ('Auto Attendant ' +(x.owner_id||x.aa_id||''));
  if (t==='VM')    return x.vm_name   || x.owner_name || x.name || ('Voicemail ' +(x.owner_id||x.vm_id||''));
  return x.route_name || x.trunk_name || x.dest || x.name || 'External';
}

/* ---------- iframe scraper (Inventory page DataTable) ---------- */
function scrapeInventoryViaIframe(){
  return new Promise(function(resolve, reject){
    try{
      var frame = document.getElementById('cv-intelli-invframe');
      if (frame && frame.parentNode) frame.parentNode.removeChild(frame);
      frame = document.createElement('iframe');
      frame.id = 'cv-intelli-invframe';
      frame.src = '/portal/inventory';
      frame.setAttribute('aria-hidden','true');
      frame.style.position='fixed'; frame.style.left='-9999px'; frame.style.top='-9999px';
      frame.style.width='1px'; frame.style.height='1px'; frame.style.opacity='0';
      document.body.appendChild(frame);

      var killed=false, timeout=setTimeout(function(){ cleanup(); reject(new Error('Inventory iframe timed out')); }, 45000);
      function cleanup(){ if (killed) return; killed=true; clearTimeout(timeout); if (frame && frame.parentNode) frame.parentNode.removeChild(frame); }

      frame.onload = function(){
        try{
          var win = frame.contentWindow, doc = win.document, tries=0;
          (function waitDT(){
            tries++;
            var $ = win.jQuery || win.$;
            var table = doc.querySelector('table.dataTable') || doc.querySelector('table');
            if ($ && $.fn && $.fn.dataTable && table) hook($, table);
            else if (tries<160) setTimeout(waitDT, 250);
            else { cleanup(); reject(new Error('Inventory table not found')); }
          })();

          function hook($, table){
            var dt = $(table).DataTable ? $(table).DataTable() :
                     ($(table).dataTable && $(table).dataTable().api ? $(table).dataTable().api() : null);
            if (!dt){ cleanup(); return reject(new Error('DataTables not active on inventory table')); }

            try{ dt.page.len(100).draw(false); }catch(_){}
            var out=[], seen=new Set();

            function collectPage(){
              dt.rows({page:'current'}).every(function(){
                var tr = this.node();
                var tds = tr && tr.querySelectorAll ? tr.querySelectorAll('td') : [];
                var num='', label='', type='', name='';
                if (tds.length){
                  num = (tds[0].textContent||'').trim();
                  label = (tds[1] && tds[1].textContent || '').trim();
                  for (var i=2;i<tds.length;i++){
                    var t=(tds[i].textContent||'').trim();
                    var m=t.match(/(User|Queue|Auto Attendant|AA|Voicemail|VM|External)/i);
                    if(m){ type=m[1]; name=t.replace(m[0],'').replace(/^\s*[:\-–]\s*/,'').trim(); break; }
                  }
                }
                var key = (num || '').replace(/[^\d]/g,'');
                if (key && !seen.has(key)){
                  seen.add(key);
                  out.push({
                    id: 'n'+key.slice(-8),
                    number: formatTN(num),
                    label:  label,
                    destType: mapDestType(type||'External'),
                    destId: '',
                    destName: name || ''
                  });
                }
              });
            }

            $(table).on('draw.dt', function(){
              collectPage();
              var info = dt.page.info();
              if (info.page < info.pages - 1){
                dt.page('next').draw(false);
              } else {
                cleanup();
                resolve(out);
              }
            });

            // kick off
            collectPage();
            dt.draw(false);
          }
        }catch(e){ cleanup(); reject(e); }
      };
    }catch(ex){ reject(ex); }
  });
}

/* ---------- main loader ---------- */
async function loadInventory(){
  try{
    // try JSON API first
    var base = await probeNumbersUrl();
    var raw  = await fetchJSON(addParam(base,'limit','5000'));
    var list = Array.isArray(raw) ? raw : (raw.items || raw.results || raw.data || raw.numbers || []);
    if (!Array.isArray(list) || !list.length) throw new Error('Endpoint returned no items: ' + base);
    return list.map(function(x, i){
      var destType = x.dest_type || x.owner_type || x.type || x.destination_type;
      var destId   = x.dest_id   || x.owner_id   || x.destination_id;
      var destName = x.dest_name || x.owner_name || x.destination_name;
      return {
        id:       x.id || x.uuid || ('num'+i),
        number:   formatTN(x.number || x.tn || x.did || x.dnis || x.e164 || x.phone || ''),
        label:    x.label || x.alias || x.description || x.name || '',
        destType: mapDestType(destType),
        destId:   String(destId || ''),
        destName: destName || mapDestName(x, destType)
      };
    });
  }catch(apiErr){
    console.warn('[Intelli] API numbers failed — falling back to iframe scrape:', apiErr && apiErr.message ? apiErr.message : apiErr);
    return await scrapeInventoryViaIframe();
  }
}
// ===== /REAL numbers inventory =====

// ===== /REAL numbers inventory =====

      // ---- AA side-open detail (stub) ----
      function getAAConfig(destId){
        return {
          '1': { type:'Queue', name:'Sales' },
          '2': { type:'Queue', name:'Support' },
          '3': { type:'AA',    name:'Spanish Menu' },
          '0': { type:'User',  name:'Operator (User 300)' },
          '*': { type:'VM',    name:'Main Voicemail' },
          '#': { type:'Repeat',name:'Repeat Menu' },
          't': { type:'Timeout', name:'Main VM (60s)' }
        };
      }
      function renderAADetail(group, host){
        host.className=''; host.innerHTML='';
        var box = make('div','dial');
        var head = make('div','dial-h','Dial Pad Menu');
        var keys = make('div','dial-keys');
        var next = make('div','dial-next','<div class="muted">Click a key to preview its routing.</div>');
        box.appendChild(head); box.appendChild(keys); box.appendChild(next); host.appendChild(box);
        var order = ['1','2','3','4','5','6','7','8','9','0','*','#'];
        var cfg = getAAConfig(group.id);
        order.forEach(function(k){
          var btn = make('div','dial-key', k);
          btn.title = 'Key '+k;
          btn.addEventListener('click', function(){
            var route = cfg[k];
            if (!route){ next.innerHTML = '<div class="muted">Key '+k+' is not assigned.</div>'; return; }
            var rows = [];
            rows.push('<div class="route-row"><span class="route-badge">'+route.type+'</span> '+route.name+'</div>');
            if (route.type==='Queue') rows.push('<div class="route-row muted">Strategy: round-robin · Ring 60s → VM Sales</div>');
            if (route.type==='User')  rows.push('<div class="route-row muted">Rings user, then → User VM</div>');
            if (route.type==='AA')    rows.push('<div class="route-row muted">Press 1 for Sales · 2 for Support · 0 Operator</div>');
            if (k==='t')              rows.push('<div class="route-row muted">Timeout: 5s of silence → Main VM</div>');
            next.innerHTML = '<div style="font-weight:600;margin-bottom:6px">Key '+k+'</div>'+rows.join('');
          });
          keys.appendChild(btn);
        });
      }
      function renderNonAADetail(group, host){
        host.className=''; host.innerHTML =
          '<div class="card">'
        + '  <div class="card-h"><div class="hdr-left"><div class="card-title">'+group.name+'</div><span class="dest-badge">'+group.type+'</span></div></div>'
        + '  <div class="card-b">This destination has <b>'+group.count+'</b> numbers.<br/><span class="muted">Use Export CSV in the left card for the full list. “When” affects trace later.</span></div>'
        + '</div>';
      }

      // ---- renderers ----
      var groups=[], viewGroups=[], activeDetail=null;

      function renderCard(g){
        var card = make('div','card'); card.appendChild(make('div','left-bar'));
        var hdr = make('div','card-h');
        var left = make('div','hdr-left');
        left.appendChild(make('div','card-title', g.name));
        left.appendChild(make('span','dest-badge', g.type));
        hdr.appendChild(left);

        var right = make('div','hdr-right');
        right.appendChild(make('span','count-badge', g.count + ' number' + (g.count===1?'':'s')));
        var btn = make('button','btn', activeDetail===g.key ? 'Collapse' : 'Expand');
        right.appendChild(btn); hdr.appendChild(right);
        card.appendChild(hdr);

        var body = make('div','card-b');
        if (activeDetail===g.key) {
          var preview = make('div','muted','');
          if (g.type==='User'){ preview.innerHTML='<b>User:</b> top rule <i>Business Hours</i> → AA <b>Main Menu</b>'; }
          else if (g.type==='Queue'){ preview.innerHTML='<b>Queue:</b> round-robin, timeout 60s → VM <b>Sales VM</b>'; }
          else if (g.type==='AA'){ preview.innerHTML='<b>AA keys:</b> 1: Sales · 2: Support · timeout: Main VM'; }
          else { preview.innerHTML='<b>Direct:</b> '+g.type; }
          body.appendChild(preview);

          var acts = make('div','card-actions');
          var exportBtn = make('button','btn','Export CSV');
          exportBtn.onclick = function(){
            var csv='Number,Label\n', i, n, lbl;
            for(i=0;i<g.numbers.length;i++){ n=g.numbers[i]; lbl=(n.label||'').replace(/"/g,'""'); csv+='"'+n.number+'","'+lbl+'"\n'; }
            var blob=new Blob([csv],{type:'text/csv'}), url=URL.createObjectURL(blob), a=document.createElement('a');
            a.href=url; a.download=(g.type+' '+g.name+' numbers.csv').replace(/\s+/g,'_'); a.click(); setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
          };
          acts.appendChild(exportBtn);
          body.appendChild(acts);

          var rows = make('div','rows'); body.appendChild(rows);
          mountVirtualList(rows, g.numbers, 40);
        } else {
          body.appendChild(make('div','muted','Click expand to view numbers and previews.'));
        }
        card.appendChild(body);

        btn.onclick = function(){
          activeDetail = (activeDetail===g.key) ? null : g.key;
          applyFilters();
          var detail=document.getElementById('ir-detail');
          if(activeDetail===g.key){
            if (g.type==='AA') renderAADetail(g, detail); else renderNonAADetail(g, detail);
          } else if(!activeDetail){
            detail.className='muted';
            detail.innerHTML = 'Expand a destination on the left to view numbers and previews.';
          }
        };

        return card;
      }

      function renderGroups(){
        var host=document.getElementById('ir-groups'); host.innerHTML='';
        for(var i=0;i<viewGroups.length;i++){ host.appendChild(renderCard(viewGroups[i])); }
        document.getElementById('ir-count').textContent = viewGroups.length + ' destination group' + (viewGroups.length===1?'':'s');
        var found = viewGroups.find(function(g){ return g.key===activeDetail; });
        var detail=document.getElementById('ir-detail');
        if (found){
          if (found.type==='AA') renderAADetail(found, detail); else renderNonAADetail(found, detail);
        } else if (!activeDetail){
          detail.className='muted';
          detail.innerHTML='Expand a destination on the left to view numbers and previews.';
        }
      }

      function applyFilters(){
        var term=(document.getElementById('ir-q').value||'').toLowerCase().trim();
        var chips=document.querySelectorAll('#cv-intelli-root .chip'), i, type='all';
        for(i=0;i<chips.length;i++){ if(chips[i].classList.contains('active')){ type=chips[i].getAttribute('data-ft'); break; } }
        viewGroups=[];
        for(i=0;i<groups.length;i++){
          var g=groups[i]; if(type!=='all' && g.type!==type) continue;
          var match=!term || (g.name && g.name.toLowerCase().indexOf(term)>=0);
          if(!match && /[0-9]/.test(term)){
            for(var j=0;j<g.numbers.length;j++){ if(g.numbers[j].number.toLowerCase().indexOf(term)>=0){ match=true; break; } }
          }
          if(match) viewGroups.push(g);
        }
        renderGroups();
      }

      // state + boot
      var groups=[], viewGroups=[], activeDetail=null;

      document.getElementById('ir-q').addEventListener('input', function(){ activeDetail=null; applyFilters(); });
      var chips = root.querySelectorAll('.chip');
      for(var i=0;i<chips.length;i++){
        chips[i].addEventListener('click', function(){
          for(var j=0;j<chips.length;j++) chips[j].classList.remove('active');
          this.classList.add('active'); activeDetail=null; applyFilters();
        });
      }
      document.getElementById('ir-when').addEventListener('change', function(){
        document.getElementById('ir-dt').style.display = this.value==='custom' ? '' : 'none';
      });

      // NOTE: detailEl was missing in your last paste; restored here
      var detailEl = document.getElementById('ir-detail');
      detailEl.innerHTML='Loading inventory…';
loadInventory().then(async function(rows){
  groups = groupByDestination(rows || []);

  // try to resolve real User names (non-fatal if users endpoint isn’t available)
  try {
    const dir = await loadUserDirectory();
    groups.forEach(g => { if (g.type === 'User') g.name = nameForUserGroup(g, dir); });
  } catch(e){
    console.warn('[Intelli] user names not resolved:', e && e.message ? e.message : e);
  }

  applyFilters();
  detailEl.className='muted';
  detailEl.innerHTML='Expand a destination on the left to view numbers and previews.';
}).catch(function(err){
  console.error('[Intelli] inventory error:', err);
  detailEl.className='';
  detailEl.innerHTML =
    '<div style="color:#a00; border:1px solid #f3c2b8; background:#fff3f0; padding:10px; border-radius:8px;">'
    + '<div style="font-weight:600; margin-bottom:6px;">Could not load phone number inventory</div>'
    + '<div style="margin-bottom:6px;">' + (err && err.message ? err.message : err) + '</div>'
    + '<div style="font-size:12px;">If you know the endpoint, run in console:<br>'
    + '<code>window.cvIntelliNumbersUrl = "/exact/path/here";</code> and/or '
    + '<code>window.cvIntelliUsersUrl = "/users/path/here";</code><br>then click the Intelli Routing tile again.</div>'
    + '</div>';
});

    } catch(e){
      try { root.innerHTML = '<div style="color:#a00">Mount error: '+(e && e.message ? e.message : e)+'</div>'; } catch(_) {}
      console.error(e);
    }
  };
})();

// ===== User directory (names) — auto-detect endpoint (override with window.cvIntelliUsersUrl) =====
var USERS_URL = window.cvIntelliUsersUrl || null;

async function probeUsersUrl(){
  if (USERS_URL) return USERS_URL;
  const candidates = [
    '/portal/api/users',
    '/portal/api/v1/users',
    '/portal/ajax/users',
    '/portal/ajax/user/list',
    '/api/users',
    '/ns-api/users'
  ];
  for (let i = 0; i < candidates.length; i++){
    try {
      const test = addParam(candidates[i], 'limit', '1');
      const data = await fetchJSON(test);
      const list = Array.isArray(data) ? data : (data.items || data.results || data.data || data.users);
      if (Array.isArray(list)) { console.log('[Intelli] users endpoint:', candidates[i]); USERS_URL = candidates[i]; return USERS_URL; }
    } catch(_) {}
  }
  throw new Error('No users endpoint responded with JSON. Set window.cvIntelliUsersUrl manually.');
}

function mkUserDisplay(u){
  const ext   = String(u.ext || u.extension || u.exten || u.login || u.username || '').trim();
  const first = (u.first_name || u.first || '').trim();
  const last  = (u.last_name  || u.last  || '').trim();
  const base  = (u.display_name || u.full_name || u.name || ((first||last) ? (first+' '+last).trim() : '') || '').trim();
  const id    = String(u.id || u.user_id || u.uuid || u.uid || ext).trim();
  const label = base || ('User ' + (ext || id));
  return { id, ext, label: ext ? (label + ' ('+ext+')') : label };
}

async function loadUserDirectory(){
  const url  = await probeUsersUrl();
  const raw  = await fetchJSON(addParam(url, 'limit', '5000'));
  const list = Array.isArray(raw) ? raw : (raw.items || raw.results || raw.data || raw.users || []);
  const byId = Object.create(null), byExt = Object.create(null);
  list.forEach(u => {
    const d = mkUserDisplay(u);
    if (!d) return;
    if (d.id)  byId[d.id]  = d.label;
    if (d.ext) byExt[d.ext] = d.label;
  });
  return { byId, byExt };
}

function nameForUserGroup(g, dir){
  const id = (g.id || '').replace(/^u-/, '');
  if (dir.byId[id]) return dir.byId[id];
  if (/^\d{2,6}$/.test(id) && dir.byExt[id]) return dir.byExt[id];
  return g.name || 'User';
}
// ===== /User directory =====
