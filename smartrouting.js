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


/* ===================== Intelli Routing — COMPLETE DROP-IN ===================== */
/* ===== Intelli Routing — Consolidated & Fixed Drop-in ===== */
(function () {
  'use strict';

  // avoid double-insert if this exact bundle is already active
  if (window.__cvIntelliBundleInstalled) {
    console.log('cvIntelli: bundle already installed');
    return;
  }
  window.__cvIntelliBundleInstalled = true;

  /* ===================== Config / URLs ===================== */
  var cvBaseUrl = (typeof window.cvBaseUrl !== 'undefined') ? window.cvBaseUrl : (window.__cvBaseUrl || '');
  var cvIntelliNumbersUrl = cvBaseUrl ? (cvBaseUrl.replace(/\/$/, '') + "/portal/ir/numbers") : '/portal/ir/numbers';
  var cvUserDirectoryUrl  = cvBaseUrl ? (cvBaseUrl.replace(/\/$/, '') + "/portal/ir/users") : '/portal/ir/users';

  /* ===================== Utilities ===================== */
  function log() { try { console.log.apply(console, arguments); } catch (e) { } }
  function err() { try { console.error.apply(console, arguments); } catch (e) { } }
  function make(tag, cls, txt) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (txt != null) el.textContent = txt;
    return el;
  }
  function _normKey(s) { return (s || '').toString().trim().toLowerCase(); }

  // small robust when() - works with or without jQuery, SPA-safe
  function when(pred, fn) {
    try {
      if (pred()) return fn();
    } catch (e) { /* ignore */ }
    var obs = new MutationObserver(function () {
      try { if (pred()) { obs.disconnect(); clearInterval(iv); fn(); } } catch (e) { }
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    var iv = setInterval(function () {
      try { if (pred()) { clearInterval(iv); fn(); } } catch (e) { /* ignore */ }
    }, 300);
  }

  /* ===================== Minimal "virtual" list (non-virtual for simplicity) ===================== */
  function mountVirtualList(host, items, itemHeight, rightLabel) {
    host.innerHTML = '';
    if (!Array.isArray(items)) items = [];
    var frag = document.createDocumentFragment();
    items.forEach(function (it, idx) {
      var row = make('div', 'row');
      var left = make('div', 'row-left');
      var num = make('div', 'row-num', it.number || (it.phone || ''));
      left.appendChild(num);
      var lbl = make('div', 'muted', it.label || '');
      lbl.style.marginLeft = '8px';
      left.appendChild(lbl);
      row.appendChild(left);
      var right = make('div', 'row-right');
      if (rightLabel) right.appendChild(make('div', 'muted', rightLabel));
      row.appendChild(right);
      frag.appendChild(row);
    });
    host.appendChild(frag);
  }

  /* ===================== Name / Title helpers ===================== */
  function nameForUserGroup(group, dir) {
    try {
      if (dir && typeof dir === 'object') {
        // assume dir keyed by id
        var key = String(group.id || '');
        if (dir[key]) return dir[key].displayName || dir[key].name || group.name || ('User ' + key);
      }
    } catch (e) { /* ignore */ }
    return group.name || (group.type === 'User' ? ('User ' + (group.id || '')) : group.type || 'Destination');
  }
  function getGroupTitle(g) { return (g && (g.name || g.id || (g.type || ''))).toString(); }

  /* ===================== Data loaders (safe defaults) ===================== */
  /* ===================== Data loaders (safe defaults) ===================== */

  // normalize a single raw row into { id, type, name, number, label }
  function normalizeRow(r) {
    if (!r || typeof r !== 'object') {
      // if it's a primitive (string/number), treat as a number-only External row
      return { id: r ? String(r) : null, type: 'External', name: '', number: String(r || ''), label: '' };
    }
    var id = (r.destination && (r.destination.id || r.destinationId))
          || r.destinationId || r.destId || r.id || r.groupId || r.destination_id || null;

    if (id !== null && id !== undefined) id = String(id);

    var type = (r.destination && r.destination.type)
          || r.type || r.destinationType || r.destType || r.kind || (r.number ? 'External' : 'Unknown');

    var name = (r.destination && r.destination.name)
          || r.name || r.destName || r.displayName || '';

    var number = r.number || r.phone || r.digits || r.value || r.phone_number || '';
    if (number === null || number === undefined) number = '';
    number = String(number || '');

    var label = r.label || r.labelName || r.description || r.note || '';

    // If we were given only a number and no id, generate a stable-ish id so groups still appear
    if (!id) {
      if (number) id = 'ext:' + number;
      else id = 'unknown:' + Math.random().toString(36).slice(2, 7);
    }

    return { id: id, type: String(type || 'External'), name: String(name || ''), number: number, label: String(label || '') };
  }

  // robust loader: accepts {rows:[]}, {data:[]}, array, keyed objects, or primitive arrays
  async function loadInventory() {
    if (typeof window.cvIntelliLoadInventory === 'function') {
      try { return await window.cvIntelliLoadInventory(); } catch (e) { log('cvIntelli: custom loader failed', e); }
    }
    try {
      var res = await fetch(cvIntelliNumbersUrl, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      var body = await res.json();
      var rows = [];
      if (Array.isArray(body)) rows = body;
      else if (Array.isArray(body.rows)) rows = body.rows;
      else if (Array.isArray(body.data)) rows = body.data;
      else if (Array.isArray(body.numbers)) rows = body.numbers;
      else if (body && typeof body === 'object') {
        // handle { id: [..], id2: [..] } shaped responses
        var keys = Object.keys(body || {});
        var maybeArrayOfArrays = keys.length && Array.isArray(body[keys[0]]);
        if (maybeArrayOfArrays) {
          rows = [];
          keys.forEach(function (k) {
            (body[k] || []).forEach(function (entry) {
              if (!entry.destination && !entry.id) entry.destination = { id: k };
              rows.push(entry);
            });
          });
        } else {
          // fallback: flatten simple object values that look like entries
          rows = keys.map(function (k) { return body[k]; }).filter(Boolean);
        }
      }
      return rows;
    } catch (e) {
      log('cvIntelli: loadInventory fail -> []', e && e.message ? e.message : e);
      return [];
    }
  }

  async function loadUserDirectory() {
    if (typeof window.cvIntelliLoadUserDirectory === 'function') {
      try { return await window.cvIntelliLoadUserDirectory(); } catch (e) { log('cvIntelli: custom user directory loader failed', e); }
    }
    try {
      var res = await fetch(cvUserDirectoryUrl, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      var body = await res.json();
      // convert array -> keyed object by id for convenience
      if (Array.isArray(body)) {
        var obj = {};
        body.forEach(function (u) { if (u && (u.id || u.userId)) obj[String(u.id || u.userId)] = u; });
        return obj;
      }
      if (body && typeof body === 'object') return body;
      return {};
    } catch (e) {
      log('cvIntelli: loadUserDirectory failed, returning {}', e && e.message ? e.message : e);
      return {};
    }
  }

/* end of Data loaders (safe defaults) */


  /* ===================== Grouping ===================== */
function groupByDestination(rows) {
  var groups = {};
  (rows || []).forEach(function (raw) {
    try {
      var r = normalizeRow(raw);
      if (!r) return;
      var key = String((r.type || 'External') + '::' + (r.id || ('ext:' + (r.number || ''))));
      if (!groups[key]) {
        groups[key] = { key: key, id: r.id, type: r.type, name: r.name || '', numbers: [] };
      }
      // keep group even if no numbers (so destination shows up)
      if (r.number && r.number.trim()) {
        groups[key].numbers.push({ number: r.number, label: r.label || '' });
      }
    } catch (e) {
      log('groupByDestination: skip row', e && e.message ? e.message : e);
    }
  });
  // convert to array and attach counts
  return Object.keys(groups).map(function (k) {
    var g = groups[k];
    g.count = g.numbers.length;
    return g;
  });
}


  /* ===================== Styling + Root overlay ===================== */
  var DEFAULT_ACCENT = '#f89406';
  var DEFAULT_TINT = '#FDE8CC';

  function ensureStyle() {
    if (document.getElementById('cv-intelli-style')) return;
    var css = [
      '#cv-intelli-root{display:none; --cv-accent:' + DEFAULT_ACCENT + '; --cv-tint:' + DEFAULT_TINT + ';}',
      '#cv-intelli-root.dock{position:absolute; inset:0; z-index:9999}',
      '#cv-intelli-root.float{position:fixed; inset:0; z-index:999999}',
      '#cv-intelli-root .cv-back{position:absolute; inset:0; background:#fff; opacity:1}',
      '#cv-intelli-root .cv-panel{position:absolute; inset:0; background:#fff; box-sizing:border-box; font:14px/1.4 system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif}',
      '#cv-intelli-root.float .cv-panel{margin:4% auto; max-width:960px; height:auto; border-radius:12px; box-shadow:0 8px 40px rgba(0,0,0,.12)}',
      '#cv-intelli-root .cv-h{display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:linear-gradient(180deg, var(--cv-tint), #fff); border-bottom:1px solid rgba(229,112,39,.22); font-weight:600}',
      '#cv-intelli-root .cv-x{cursor:pointer; background:transparent; border:none; font-size:20px; line-height:1}',
      '#cv-intelli-root .cv-b{padding:16px; height:calc(100% - 52px); overflow:auto}',
      '#cv-intelli-root .ir{display:flex; gap:16px; min-height:420px}',
      '#cv-intelli-root .ir-left{width:340px; flex:0 0 340px}',
      '#cv-intelli-root .ir-right{flex:1; min-width:0}',
      '#cv-intelli-root .ir-h1{font-weight:600; margin:0 0 8px}',
      '#cv-intelli-root .ir-search{width:100%; padding:8px 10px; border:1px solid #ddd; border-radius:10px}',
      '#cv-intelli-root .chip{font-size:12px; padding:4px 8px; border:1px solid #e5e5e5; border-radius:999px; background:#fafafa; cursor:pointer}',
      '#cv-intelli-root .chip.active{background:var(--cv-tint); border-color:var(--cv-accent); color:#4a2a00}',
      '#cv-intelli-root .list-outer{border:1px solid #eee; border-radius:10px; background:#fff}',
      '#cv-intelli-root .card{position:relative; border:1px solid #eee; border-radius:12px; background:#fff; box-shadow:0 8px 30px rgba(0,0,0,.06); margin-bottom:12px}',
      '#cv-intelli-root .left-bar{position:absolute; left:0; top:0; bottom:0; width:6px; border-top-left-radius:12px; border-bottom-left-radius:12px; background:var(--cv-accent)}',
      '#cv-intelli-root .card-h{position:relative; display:flex; justify-content:space-between; align-items:center; gap:12px; padding:12px 14px 12px 20px; border-bottom:1px solid #eee; background:#fafafa; border-top-left-radius:12px; border-top-right-radius:12px}',
      '#cv-intelli-root .card-title{font-weight:600; line-height:1.2}',
      '#cv-intelli-root .hdr-left{display:flex; align-items:center; gap:8px; min-width:0}',
      '#cv-intelli-root .hdr-right{display:flex; align-items:center; gap:10px; flex-shrink:0}',
      '#cv-intelli-root .count-badge{font-size:12px; background:var(--cv-tint); color:#4a2a00; border:1px solid var(--cv-accent); border-radius:999px; padding:2px 8px; white-space:nowrap}',
      '#cv-intelli-root .rows{position:relative; height:220px; overflow:auto; border:1px solid #f2f2f2; border-radius:8px; background:#fff}',
      '#cv-intelli-root .row{display:flex; align-items:center; justify-content:space-between; height:40px; padding:0 10px; border-bottom:1px solid #f6f6f6; font-variant-numeric:tabular-nums}',
      '#cv-intelli-root .row:hover{background:#fff7f2}',
      '#cv-intelli-root .muted{color:#666}',
      '#cv-intelli-root .btn{cursor:pointer; border:none; background:var(--cv-accent); color:#fff; padding:8px 12px; border-radius:10px; line-height:1; font-weight:600}'
    ].join('\n');
    var st = document.createElement('style');
    st.id = 'cv-intelli-style';
    st.type = 'text/css';
    st.appendChild(document.createTextNode(css));
    (document.head || document.documentElement).appendChild(st);
  }

  function setAccent(accentHex, tintHex) {
    var root = document.getElementById('cv-intelli-root');
    if (!root) return;
    if (accentHex) root.style.setProperty('--cv-accent', accentHex);
    if (tintHex)   root.style.setProperty('--cv-tint', tintHex);
  }
  window.cvIntelliSetAccent = setAccent;

  function findDockHost() {
    var sels = ['#page-content', '#content', '#contentArea', '#main-content', '#portal-content',
      '#container', '#content_wrap', '#contentWrap', '#workarea', '#inner-content', '#engagecx-slot'];
    for (var i = 0; i < sels.length; i++) {
      var el = document.querySelector(sels[i]);
      if (el && el.offsetParent !== null && el.offsetHeight > 200) return el;
    }
    return null;
  }

  function ensureRoot() {
    ensureStyle();
    var host = findDockHost();
    var mode = host ? 'dock' : 'float';
    var root = document.getElementById('cv-intelli-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'cv-intelli-root';
      root.innerHTML =
        '<div class="cv-back" aria-hidden="true"></div>'
        + '<div class="cv-panel" role="dialog" aria-modal="true" aria-label="Intelli Routing">'
        + '  <div class="cv-h"><div>Intelli Routing</div><button class="cv-x" title="Close">×</button></div>'
        + '  <div class="cv-b"><div id="cv-intelli-mount">Loading…</div></div>'
        + '</div>';
      (host || document.body).appendChild(root);
      function close() {
        root.style.display = 'none';
        swapBanner(false); swapNavTitle(false); setNavActiveIntelli(false);
      }
      var back = root.querySelector('.cv-back');
      if (back) back.addEventListener('click', close);
      var btnX = root.querySelector('.cv-x');
      if (btnX) btnX.addEventListener('click', close);
    } else {
      var parent = host || document.body;
      if (root.parentNode !== parent) parent.appendChild(root);
    }
    root.className = mode;
    if (host && getComputedStyle(host).position === 'static') { host.style.position = 'relative'; }
    return root;
  }

  /* ------- Banner / Title helpers ------- */
  var _bannerEls = [], _origBannerTexts = [];
  function collectBannerEls() {
    _bannerEls = []; _origBannerTexts = [];
    var sels = [
      '#page-title h1', '#pageTitle', '.page-title h1', '.pageTitle',
      '.content-title h1', '.section-title h1', '.titlebar h1',
      '.breadcrumbs + h1', '.breadcrumb .active',
      '.module-title h1', '.module-title', '.tab-title', '.tabs .current',
      '.home h1', '#home h1', '#content h1', '#content h2'
    ];
    var seen = new Set();
    for (var i = 0; i < sels.length; i++) {
      var nodes = document.querySelectorAll(sels[i]);
      for (var j = 0; j < nodes.length; j++) {
        var el = nodes[j]; if (seen.has(el)) continue;
        var txt = (el.textContent || '').trim();
        var b = el.getBoundingClientRect();
        var vis = el.offsetParent !== null && b.width > 100 && b.top < (window.innerHeight || 800) * 0.4;
        if (txt && vis) { _bannerEls.push(el); _origBannerTexts.push(txt); seen.add(el); }
      }
    }
    if (!_bannerEls.length) {
      var all = document.querySelectorAll('h1,h2,.title,.titlebar,.tab-title,.module-title');
      for (var k = 0; k < all.length; k++) {
        var t = (all[k].textContent || '').trim();
        var bb = all[k].getBoundingClientRect();
        if (t && all[k].offsetParent !== null && bb.top < (window.innerHeight || 800) * 0.4 && bb.width > 100) {
          _bannerEls.push(all[k]); _origBannerTexts.push(t);
        }
      }
    }
  }
  function swapBanner(on) {
    if (on) { _bannerEls = []; _origBannerTexts = []; }
    if (!_bannerEls.length) collectBannerEls();
    for (var i = 0; i < _bannerEls.length; i++) {
      var el = _bannerEls[i]; if (!el) continue;
      try { el.textContent = on ? 'Intelli Routing' : (_origBannerTexts[i] || el.textContent); } catch (e) { }
    }
  }

  var _navTitleEl = null, _origNavTitle = null;
  function swapNavTitle(on) {
    var el = _navTitleEl || document.querySelector('.navigation-title');
    if (!el) return;
    _navTitleEl = el;
    if (on) { if (_origNavTitle == null) _origNavTitle = (el.textContent || '').trim(); el.textContent = 'Intelli Routing'; }
    else if (_origNavTitle != null) { el.textContent = _origNavTitle; _origNavTitle = null; }
  }

  function setNavActiveIntelli(on) {
    try {
      var $ = window.jQuery || window.$;
      if ($ && $.fn) {
        $('#nav-buttons li').removeClass('nav-link-current');
        if (on) $('#nav-intelli-routing').addClass('nav-link-current');
        return;
      }
    } catch (_) { }
    var lis = document.querySelectorAll('#nav-buttons li');
    for (var i = 0; i < lis.length; i++) lis[i].classList.remove('nav-link-current');
    if (on) { var me = document.getElementById('nav-intelli-routing'); if (me) me.classList.add('nav-link-current'); }
  }

  function closeIntelliOverlay() {
    var root = document.getElementById('cv-intelli-root');
    if (root) root.style.display = 'none';
    swapBanner(false); swapNavTitle(false); setNavActiveIntelli(false);
  }

  (function wireNavClose() {
    var $ = window.jQuery || window.$;
    if ($ && $.fn) {
      $(document).off('click.intelli-navclose').on('click.intelli-navclose', '#nav-buttons li:not(#nav-intelli-routing) a', function () { closeIntelliOverlay(); });
    } else {
      document.addEventListener('click', function (e) {
        var nav = document.getElementById('nav-buttons');
        if (!nav || !nav.contains(e.target)) return;
        var li = e.target.closest('li');
        if (!li || li.id === 'nav-intelli-routing') return;
        closeIntelliOverlay();
      }, true);
    }
  })();

  /* ===================== MOUNT APP ===================== */
  function cvIntelliRoutingMount(root) {
    try {
      root.innerHTML = '';
      var wrap = make('div', 'ir');
      wrap.innerHTML =
        '<div class="ir-left">'
        + '<div class="ir-h1">Destinations</div>'
        + '<input id="ir-q" class="ir-search" placeholder="Search destination or number…"/>'
        + '<div class="ir-filters">'
        + '<span data-ft="all" class="chip active">All</span>'
        + '<span data-ft="User" class="chip">User</span>'
        + '<span data-ft="Queue" class="chip">Queue</span>'
        + '<span data-ft="AA" class="chip">Auto Attendant</span>'
        + '<span data-ft="External" class="chip">External</span>'
        + '<span data-ft="VM" class="chip">Voicemail</span>'
        + '</div>'
        + '<div class="list-outer"><div id="ir-groups"></div></div>'
        + '<div id="ir-count" class="muted" style="margin-top:6px"></div>'
        + '</div>'
        + '<div class="ir-right">'
        + '<div class="ir-h1">Details</div>'
        + '<div class="controls">'
        + '<label class="muted">When</label>'
        + '<select id="ir-when" class="sel"><option value="now">Now</option><option value="custom">Pick date/time…</option></select>'
        + '<input id="ir-dt" type="datetime-local" class="sel" style="display:none"/>'
        + '<span class="chip muted">Grouping: First Hop</span>'
        + '</div>'
        + '<div id="ir-detail" class="muted">Expand a destination on the left to view numbers and previews.</div>'
        + '</div>';
      root.appendChild(wrap);

      function renderNonAADetail(group, host) {
        var rightLabel = /^\d{2,6}$/.test(String(group.id || '')) ? ('#' + group.id) : '';
        host.className = ''; host.innerHTML =
          '<div class="card">'
          + '  <div class="card-h"><div class="hdr-left"><div class="card-title">' + ((group.type === 'User') ? nameForUserGroup(group, window.__cvUserDir || null) : (group.name || group.type)) + '</div><span class="dest-badge">' + group.type + '</span></div></div>'
          + '  <div class="card-b">This destination has <b>' + group.count + '</b> numbers.<br/><span class="muted">Use Export CSV in the left card for the full list.</span></div>'
          + '</div>'
          + '<div class="card"><div class="card-b"><div id="ir-numbers"></div></div></div>';
        var numbersHost = host.querySelector('#ir-numbers') || document.getElementById('ir-numbers');
        if (numbersHost) mountVirtualList(numbersHost, group.numbers, 40, rightLabel);
      }

      var groups = [], viewGroups = [], activeDetail = null;

      function renderCard(g) {
        var title = getGroupTitle(g);
        var card = make('div', 'card'); card.appendChild(make('div', 'left-bar'));
        var hdr = make('div', 'card-h');
        var left = make('div', 'hdr-left');
        left.appendChild(make('div', 'card-title', title));
        left.appendChild(make('span', 'dest-badge', g.type));
        hdr.appendChild(left);
        var right = make('div', 'hdr-right');
        right.appendChild(make('span', 'count-badge', g.count + ' number' + (g.count === 1 ? '' : 's')));
        var btn = make('button', 'btn', activeDetail === g.key ? 'Collapse' : 'Expand');
        right.appendChild(btn); hdr.appendChild(right);
        card.appendChild(hdr);

        var body = make('div', 'card-b');
        if (activeDetail === g.key) {
          var acts = make('div', 'card-actions');
          var exportBtn = make('button', 'btn', 'Export CSV');
          exportBtn.onclick = function () {
            var csv = 'Number,Label\n', i, n, lbl;
            for (i = 0; i < g.numbers.length; i++) { n = g.numbers[i]; lbl = (n.label || '').replace(/"/g, '""'); csv += '"' + n.number + '","' + lbl + '"\n'; }
            var blob = new Blob([csv], { type: 'text/csv' }), url = URL.createObjectURL(blob), a = document.createElement('a');
            a.href = url; a.download = (g.type + ' ' + (title || '') + ' numbers.csv').replace(/\s+/g, '_'); a.click(); setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
          };
          acts.appendChild(exportBtn); body.appendChild(acts);

          var rows = make('div', 'rows'); body.appendChild(rows);
          var rightLabel = /^\d{2,6}$/.test(String(g.id || '')) ? ('#' + g.id) : '';
          mountVirtualList(rows, g.numbers, 40, rightLabel);
        } else {
          body.appendChild(make('div', 'muted', 'Click expand to view numbers and previews.'));
        }
        card.appendChild(body);

        btn.onclick = function () {
          activeDetail = (activeDetail === g.key) ? null : g.key;
          applyFilters();
          var detail = document.getElementById('ir-detail');
          if (activeDetail === g.key) { renderNonAADetail(g, detail); }
          else { detail.className = 'muted'; detail.innerHTML = 'Expand a destination on the left to view numbers and previews.'; }
        };

        return card;
      }

      function renderGroups() {
        var host = document.getElementById('ir-groups'); host.innerHTML = '';
        for (var i = 0; i < viewGroups.length; i++) { host.appendChild(renderCard(viewGroups[i])); }
        document.getElementById('ir-count').textContent = viewGroups.length + ' destination group' + (viewGroups.length === 1 ? '' : 's');
        var found = viewGroups.find(function (g) { return g.key === activeDetail; });
        var detail = document.getElementById('ir-detail');
        if (found) { renderNonAADetail(found, detail); }
        else { detail.className = 'muted'; detail.innerHTML = 'Expand a destination on the left to view numbers and previews.'; }
      }

      function applyFilters() {
        var term = _normKey(document.getElementById('ir-q').value || '');
        var chips = document.querySelectorAll('#cv-intelli-root .chip'), i, type = 'all';
        for (i = 0; i < chips.length; i++) { if (chips[i].classList.contains('active')) { type = chips[i].getAttribute('data-ft') || 'all'; break; } }
        viewGroups = [];
        for (i = 0; i < groups.length; i++) {
          var g = groups[i]; if (type !== 'all' && g.type !== type) continue;
          var title = getGroupTitle(g);
          var match = !term || (title && _normKey(title).indexOf(term) >= 0);
          if (!match && /[0-9]/.test(term)) {
            for (var j = 0; j < g.numbers.length; j++) { if (_normKey(g.numbers[j].number).indexOf(term) >= 0) { match = true; break; } }
            if (!match && g.id && _normKey(String(g.id)).indexOf(term) >= 0) match = true;
          }
          if (match) viewGroups.push(g);
        }
        renderGroups();
      }

      // wire UI
      var qEl = document.getElementById('ir-q');
      qEl.addEventListener('input', function () { activeDetail = null; applyFilters(); });
      var chips = wrap.querySelectorAll('.chip');
      chips.forEach(function (ch) { ch.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        this.classList.add('active'); activeDetail = null; applyFilters();
      }); });
      document.getElementById('ir-when').addEventListener('change', function () {
        document.getElementById('ir-dt').style.display = this.value === 'custom' ? '' : 'none';
      });


      // boot
var detailEl = document.getElementById('ir-detail');
detailEl.innerHTML = 'Loading inventory…';

loadInventory().then(async function (rows) {
  try { log('cvIntelli: raw inventory count:', (rows && rows.length) || 0); } catch (e) {}
  try { console.log('cvIntelli: sample raw rows', (rows || []).slice(0, 6)); } catch (e) {}

  // normalize rows into expected shape
  var mapped = (rows || []).map(normalizeRow);
  try { console.log('cvIntelli: sample normalized', mapped.slice(0, 6)); } catch (e) {}

  // group into destinations (keeps groups even if they have 0 numbers)
  groups = groupByDestination(mapped || []);
  try { console.log('cvIntelli: groups count:', groups.length, 'sample groups:', groups.slice(0, 6)); } catch (e) {}

  // attempt to load user directory (optional)
  try { window.__cvUserDir = await loadUserDirectory(); } catch (e) { log('user names not resolved:', e && e.message ? e.message : e); }

  applyFilters();
  detailEl.className = 'muted';
  detailEl.innerHTML = 'Expand a destination on the left to view numbers and previews.';
}).catch(function (e) {
  log('cvIntelli: inventory load failed', e && e.message ? e.message : e);
  detailEl.className = 'muted';
  detailEl.innerHTML = 'Could not load inventory.';
});


  /* ===================== Overlay control (open/close) ===================== */
  function openOverlay() {
    var root = ensureRoot();
    root.style.display = 'block';
    setNavActiveIntelli(true);
    swapBanner(true);
    swapNavTitle(true);
    var mount = document.getElementById('cv-intelli-mount');
    if (typeof window.cvIntelliRoutingMount === 'function') {
      try { window.cvIntelliRoutingMount(mount); } catch (e) { err('[Intelli] mount error:', e); }
    } else {
      console.warn('[Intelli] cvIntelliRoutingMount not a function yet');
    }
  }
  window.cvIntelliOpen = openOverlay;
  window.addEventListener('cv:intelli-routing:open', openOverlay, false);

  /* ===================== NAV BUTTON (robust, single insertion) ===================== */
  (function insertNavButton() {
    try {
      function start() {
        if (document.getElementById('nav-intelli-routing')) return;
        var $ = window.jQuery || window.$;
        var container = ($ && $.fn) ? (($('#nav-buttons').length ? $('#nav-buttons')[0] : null)) : document.querySelector('#nav-buttons');
        if (!container) return;

        var template = document.getElementById('nav-music') || container.querySelector('li');
        if (!template) return;

        var el = template.cloneNode(true);
        el.id = 'nav-intelli-routing';

        var a = el.querySelector('a') || document.createElement('a');
        if (!a.parentNode) el.appendChild(a);
        a.id = 'nav-intelli-routing-link';
        a.href = '#';
        a.title = 'Intelli Routing';
        a.addEventListener('click', function (e) { e.preventDefault(); window.cvIntelliOpen(); });

        var txt = el.querySelector('.nav-text'); if (txt) txt.textContent = 'Intelli Routing';
        var bg = el.querySelector('.nav-bg-image'); if (bg) {
          bg.style.webkitMaskImage = "url('https://raw.githubusercontent.com/democlarityvoice-del/intellirouting-icon/refs/heads/main/icon.svg')";
          bg.style.maskImage = "url('https://raw.githubusercontent.com/democlarityvoice-del/intellirouting-icon/refs/heads/main/icon.svg')";
          bg.style.webkitMaskRepeat = 'no-repeat'; bg.style.maskRepeat = 'no-repeat';
          bg.style.webkitMaskPosition = 'center 48%'; bg.style.maskPosition = 'center 48%';
          bg.style.webkitMaskSize = '71% 71%'; bg.style.maskSize = '71% 71%';
          bg.style.backgroundColor = 'rgba(255,255,255,0.92)';
        }

        var after = document.getElementById('nav-callhistory');
        if (after && after.parentNode === container) container.insertBefore(el, after.nextSibling);
        else container.appendChild(el);
        log('Intelli Routing button inserted');
      }

      when(function () { return !!document.querySelector('#nav-buttons'); }, start);

      // watch for SPA re-renders removing our button
      new MutationObserver(function () {
        if (!document.getElementById('nav-intelli-routing')) {
          var c = document.querySelector('#nav-buttons'); if (c) start();
        }
      }).observe(document.documentElement, { childList: true, subtree: true });

    } catch (e) { err('Intelli button script error:', e && e.message ? e.message : e); }
  })();

  /* ===================== optional legacy loader hook (lazy script load) ===================== */
  // If a remote "smartrouting" script should be lazy loaded on click instead of using cvIntelliOpen,
  // page integrators can set window.cvIntelliLazyScript = '<url>' before this bundle runs.
  (function wireLazyLoaderIfConfigured() {
    try {
      if (!window.cvIntelliLazyScript) return;
      // listen to clicks on our nav link and load script once then open
      document.addEventListener('click', function (ev) {
        var a = ev.target.closest && ev.target.closest('#nav-intelli-routing-link');
        if (!a) return;
        ev.preventDefault();
        if (window.__cvIntelliLazyLoaded) { window.cvIntelliOpen(); return; }
        var s = document.createElement('script');
        s.id = 'cv-intelli-loader';
        s.src = window.cvIntelliLazyScript + (/\?/.test(window.cvIntelliLazyScript) ? '&' : '?') + 'v=' + Date.now();
        s.onload = function () {
          window.__cvIntelliLazyLoaded = true;
          try { window.dispatchEvent(new CustomEvent('cv:intelli-routing:open')); } catch (e) { window.cvIntelliOpen(); }
        };
        s.onerror = function () {
          err('Failed to load Intelli Routing script:', s.src);
          alert('Could not load Intelli Routing. Check network or script URL.');
        };
        document.head.appendChild(s);
      }, true);
    } catch (e) { /* no-op */ }
  })();

  /* ===================== final log ===================== */
  log('cvIntelli: bundle initialized');
})();
