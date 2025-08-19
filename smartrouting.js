/* ===================== Intelli Routing (compact/drop-in) ===================== */

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

      // icon
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

      // click → lazy-load Smart Routing script once, then signal open
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
})();

/* --- SAFETY FALLBACK: robust, jQuery-free reinserter --- */
;(function(){
  function findNavContainer(){
    var sels = ['#nav-buttons','ul#nav-buttons','.nav-buttons','nav #nav-buttons','#navigation #nav-buttons'];
    for (var i=0;i<sels.length;i++){ var el = document.querySelector(sels[i]); if (el) return el; }
    return null;
  }
  function insertIfMissing(){
    if (document.getElementById('nav-intelli-routing')) return;
    var container = findNavContainer(); if (!container) return;

    var template = document.getElementById('nav-music') || container.querySelector('li'); if (!template) return;
    var el = template.cloneNode(true); el.id = 'nav-intelli-routing';

    var a = el.querySelector('a'); if (!a) { a = document.createElement('a'); el.appendChild(a); }
    a.id = 'nav-intelli-routing-link'; a.href = '#'; a.title = 'Intelli Routing';
    a.addEventListener('click', function(e){ e.preventDefault(); window.dispatchEvent(new CustomEvent('cv:intelli-routing:open')); });

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
  insertIfMissing();
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', insertIfMissing);
  new MutationObserver(insertIfMissing).observe(document.documentElement,{childList:true,subtree:true});
})();

/* ===== Intelli Routing — Overlay (dock; scoped; banner/title swap; active state) ===== */
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
      '#cv-intelli-root .cv-panel{position:absolute; inset:0; background:#fff; box-sizing:border-box; font:13px/1.35 system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif}',
      '#cv-intelli-root.float .cv-panel{margin:4% auto; max-width:1040px; height:auto; border-radius:12px; box-shadow:0 8px 40px rgba(0,0,0,.12)}',

      /* hide the portal’s orange banner (we already have the grey title bar) */
      '#cv-intelli-root .cv-h{display:none}',
      '#cv-intelli-root .cv-b{padding:10px 12px; height:100%; overflow:auto}',

      /* compact list layout (left column only) */
      '#cv-intelli-root .ir{display:flex; gap:12px; min-height:420px}',
      '#cv-intelli-root .ir-right{display:none!important;}',
      '#cv-intelli-root .ir-left{width:520px!important;max-width:620px!important;}',
      '#cv-intelli-root .ir-h1{font-weight:600; margin:0 0 6px; font-size:13px; color:#333}',
      '#cv-intelli-root .ir-search{width:100%; padding:6px 9px; border:1px solid #ddd; border-radius:8px}',
      '#cv-intelli-root .ir-search:focus{outline:none; box-shadow:0 0 0 3px rgba(229,112,39,.28); border-color:var(--cv-accent)}',
      '#cv-intelli-root .ir-filters{display:flex; gap:6px; flex-wrap:wrap; margin:6px 0 8px}',
      '#cv-intelli-root .chip{font-size:11px; padding:3px 7px; border:1px solid #e5e5e5; border-radius:999px; background:#fafafa; cursor:pointer}',
      '#cv-intelli-root .chip:hover{background:#f6f7fb}',
      '#cv-intelli-root .chip.active{background:var(--cv-tint); border-color:var(--cv-accent); color:#4a2a00}',
      '#cv-intelli-root .list-outer{border:1px solid #eee; border-radius:10px; background:#fff}',
      '#cv-intelli-root .card{position:relative; border:1px solid #eee; border-radius:11px; background:#fff; box-shadow:0 6px 22px rgba(0,0,0,.05); margin-bottom:8px}',
      '#cv-intelli-root .card .left-bar{position:absolute; left:0; top:0; bottom:0; width:4px; border-top-left-radius:11px; border-bottom-left-radius:11px; background:var(--cv-accent)}',
      '#cv-intelli-root .card-h{position:relative; display:flex; justify-content:space-between; align-items:center; gap:10px; padding:9px 12px 9px 16px; border-bottom:1px solid #f2f2f2; background:#fafafa; border-top-left-radius:11px; border-top-right-radius:11px}',
      '#cv-intelli-root .card-title{font-weight:600; line-height:1.15; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:180px}',
      '#cv-intelli-root .hdr-left{display:flex; align-items:center; gap:7px; min-width:0}',
      '#cv-intelli-root .hdr-right{display:flex; align-items:center; gap:8px; flex-shrink:0}',
      '#cv-intelli-root .count-badge{font-size:11px; background:var(--cv-tint); color:#4a2a00; border:1px solid var(--cv-accent); border-radius:999px; padding:1px 7px; white-space:nowrap}',
      '#cv-intelli-root .dest-badge{font-size:11px; padding:1px 6px; border-radius:6px; background:var(--cv-tint); border:1px solid var(--cv-accent); white-space:nowrap}',

      /* expand/collapse body */
      '#cv-intelli-root .card-b{padding:8px 12px; display:none}',
      '#cv-intelli-root .card.open .card-b{display:block}',

      /* mini scroller for numbers */
      '#cv-intelli-root .rows{position:relative; max-height:180px; overflow:auto; border:1px solid #eee; border-radius:8px; background:#fff}',
      '#cv-intelli-root .vpad{height:0}',
      '#cv-intelli-root .row{display:flex; align-items:center; justify-content:space-between; height:32px; padding:0 10px; border-bottom:1px solid #f6f6f6; font-variant-numeric:tabular-nums}',
      '#cv-intelli-root .row:hover{background:#fff7f2}',
      '#cv-intelli-root .row-num{font-variant-numeric:tabular-nums}',
      '#cv-intelli-root .muted{color:#666; font-size:12px}',

      /* generic buttons */
      '#cv-intelli-root .btn{cursor:pointer; border:none; background:var(--cv-accent); color:#fff; padding:7px 10px; border-radius:9px; line-height:1; font-weight:600; font-size:12px}',
      '#cv-intelli-root .btn:hover{filter:brightness(.96)}',
      '#cv-intelli-root .btn.ghost{background:#f6f6f6; color:#333; border:1px solid #e3e3e3}',
      '#cv-intelli-root .btn:disabled{opacity:.5; cursor:not-allowed}',

      /* preview drawer (kept, but optional) */
      '#cv-intelli-root .drawer{position:fixed; right:24px; bottom:24px; width:560px; max-width:calc(100% - 48px); max-height:72vh; background:#fff; border:1px solid #ddd; border-radius:12px; box-shadow:0 12px 48px rgba(0,0,0,.18); transform:translateY(12px); opacity:0; pointer-events:none; transition:opacity .16s ease, transform .16s ease;}',
      '#cv-intelli-root .drawer.open{opacity:1; transform:none; pointer-events:auto;}',
      '#cv-intelli-root .drawer-h{padding:10px 12px; background:#fafafa; border-bottom:1px solid #eee; display:flex; align-items:center; justify-content:space-between; font-weight:600}',
      '#cv-intelli-root .drawer-b{padding:12px; overflow:auto; max-height:calc(72vh - 44px)}',
      '#cv-intelli-root .drawer-x{background:transparent; border:none; font-size:18px; cursor:pointer; padding:0 4px}'
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
      var x = root.querySelector('.cv-x'); if (x) x.addEventListener('click', close);
    } else {
      var parent = host || document.body;
      if (root.parentNode !== parent) parent.appendChild(root);
    }

    root.className = mode;
    if (host && getComputedStyle(host).position === 'static'){ host.style.position = 'relative'; }
    return root;
  }

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

/* ===================== Intelli Routing — COMPLETE DROP-IN (compact + drawer) ===================== */
;(function(){
  "use strict";

  /* ---------- config ---------- */
  window.cvIntelliExportUrl = window.cvIntelliExportUrl || '/portal/inventory/export.csv';
  window.cvIntelliPreferMode = window.cvIntelliPreferMode || 'export'; // 'export' | 'api' | 'scrape'
  var __cvInvPromise = null;

  /* ---------- helpers ---------- */
  function log(){ try{ console.log.apply(console, ['[Intelli]'].concat([].slice.call(arguments))); }catch(_){} }
  function make(tag, cls, html){ var el=document.createElement(tag); if(cls) el.className=cls; if(html!=null) el.innerHTML=html; return el; }
  function addParam(url, key, val){
    try { var u=new URL(url, location.origin); if(!u.searchParams.has(key)) u.searchParams.set(key, val); return u.pathname+u.search; }
    catch(_) { return url + (/\?/.test(url)?'&':'?') + encodeURIComponent(key) + '=' + encodeURIComponent(val); }
  }
  async function fetchJSON(url){
    const r = await fetch(url, { credentials: 'include', headers: { 'Accept':'application/json, text/javascript, */*; q=0.01', 'X-Requested-With':'XMLHttpRequest' }});
    const ct=(r.headers.get('content-type')||'').toLowerCase();
    if(!r.ok) throw new Error('HTTP '+r.status+' on '+url);
    if(ct.includes('application/json')||ct.includes('text/json')) return r.json();
    const txt=await r.text();
    throw new Error('Non-JSON response from '+url+' — "'+txt.slice(0,80)+'…"');
  }
  function formatTN(s){
    s=(s||'').replace(/[^\d]/g,''); if(s.length===11 && s[0]==='1') s=s.slice(1);
    if(s.length===10) return '('+s.slice(0,3)+') '+s.slice(3,6)+'-'+s.slice(6); return s||'';
  }
  function _norm(v){ return (v==null?'':String(v)).trim(); }
  function _normKey(v){ return _norm(v).toLowerCase(); }

  /* ---------- type mapping (from Treatment) ---------- */
  function mapDestType(t){
    t = _normKey(t);
    if (!t) return 'External';
    if (/^(user|person|extension)$/.test(t))                return 'User';
    if (/^(queue|call ?queue|acd)$/.test(t))                return 'Queue';
    if (/^(aa|auto.?attendant|ivr)$/.test(t))               return 'AA';
    if (/^(vm|voice ?mail|voicemail)$/.test(t))             return 'VM';
    if (/^(available number|unassigned)$/.test(t))          return 'External';
    if (/^(external|pstn|sip|route|number)$/.test(t))       return 'External';
    if (/number$/.test(t))                                  return 'External';
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  function extFromDestination(destText){
    const s = _norm(destText);
    let m = s.match(/^\s*(\d{2,6})\b/);
    if (m) return m[1];
    m = s.match(/\((\d{2,6})\)/) || s.match(/\b(?:ext(?:ension)?\.?|x|#)\s*(\d{2,6})\b/i) || s.match(/\b(\d{2,6})\b/);
    return m ? m[1] : '';
  }

  /* ---------- CSV helpers (Inventory → rows) ---------- */
  function parseCSV(text) {
    text = String(text || '');
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    var rows = [], row = [], i = 0, c, q = false, field = '';
    for (; i < text.length; i++) {
      c = text[i];
      if (q) { if (c === '"') { if (text[i+1] === '"') { field += '"'; i++; } else q = false; } else field += c; }
      else { if (c === '"') q = true;
             else if (c === ',') { row.push(field); field = ''; }
             else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
             else if (c !== '\r') field += c; }
    }
    row.push(field); rows.push(row);
    var headers = (rows.shift() || []).map(h => (h || '').trim());
    return rows.filter(r => r.some(x => x && String(x).trim().length))
               .map(r => { var o = {}; for (var j=0; j<headers.length; j++) o[headers[j]] = (r[j] || '').trim(); return o; });
  }

  function mapExportRecord(rec) {
    function pick(o, ks) { for (var k of ks) if (o[k] != null && String(o[k]).trim() !== '') return String(o[k]).trim(); return ''; }
    var phone = pick(rec, ['Phone Number','Phone','Number','TN','DID','DNIS']);
    var treat = pick(rec, ['Treatment','Routing','Type','Destination Type','Owner Type']);
    var dname = pick(rec, ['Destination','Destination Name','Owner','Owner Name','Notes','Description']);
    var did   = pick(rec, ['Dest ID','Destination ID','Owner ID','Extension','Ext','Login','Username','User ID']);
    if (!did && dname) did = extFromDestination(dname);
    var digits = (phone || '').replace(/[^\d]/g,'');
    var label  = pick(rec, ['Label','Alias','Tag']) || dname;       // ← default to Destination

    return {
      id:       (rec.id || rec.uuid || ('n' + (digits || '').slice(-8))),
      number:   formatTN(phone),
      label:    label,
      destType: mapDestType(treat),                                 // ← from Treatment
      destId:   String(did || ''),
      destName: _norm(dname)
    };
  }

  async function probeExportUrl() {
    if (window.cvIntelliExportUrl) return window.cvIntelliExportUrl;
    const candidates = [
      '/portal/inventory/export.csv',
      '/portal/inventory/export?format=csv',
      '/portal/inventory?export=csv'
    ];
    for (let i = 0; i < candidates.length; i++) {
      try {
        const res = await fetch(candidates[i], { credentials: 'include' });
        const ct  = (res.headers.get('content-type') || '').toLowerCase();
        if (res.ok && (ct.includes('text/csv') || ct.includes('application/csv') || ct.includes('octet-stream'))) {
          window.cvIntelliExportUrl = candidates[i];
          return window.cvIntelliExportUrl;
        }
      } catch (_) {}
    }
    return '/portal/inventory/export.csv';
  }

  async function loadInventoryViaExport() {
    const exp = await probeExportUrl();
    const res = await fetch(exp, { credentials: 'include', headers: { 'Accept': 'text/csv, */*' } });
    if (!res.ok) throw new Error('HTTP ' + res.status + ' fetching export CSV');
    const txt  = await res.text();
    const rows = parseCSV(txt).map(mapExportRecord);
    if (!rows.length) throw new Error('Export CSV parsed, but no rows found');
    window.__cvIntelliNumCache = { t: Date.now(), rows: rows.slice() }; // cache 5m
    return rows;
  }

  /* ---------- numbers via API or iframe (fallback) ---------- */
  var NUMBERS_URL = window.cvIntelliNumbersUrl || null;
  async function probeNumbersUrl(){
    if (NUMBERS_URL) return NUMBERS_URL;
    const candidates = [
      '/portal/api/numbers','/portal/api/v1/numbers','/portal/ajax/numbers','/portal/ajax/dids',
      '/portal/inventory/numbers','/portal/inventory/dids','/portal/inventory/tns',
      '/api/numbers','/ns-api/numbers','/portal/number/list'
    ];
    for (let i=0;i<candidates.length;i++){
      try {
        const data = await fetchJSON(addParam(candidates[i], 'limit', '25'));
        const list = Array.isArray(data) ? data : (data.items || data.results || data.data || data.numbers);
        if (Array.isArray(list)) { log('numbers endpoint:', candidates[i]); NUMBERS_URL = candidates[i]; return NUMBERS_URL; }
      } catch(_) {}
    }
    throw new Error('No JSON endpoint; falling back to iframe scrape.');
  }

  function scrapeInventoryViaIframe(){
    return new Promise(function(resolve, reject){
      try{
        if (window.__cvIntelliNumCache && (Date.now() - window.__cvIntelliNumCache.t < 5*60*1000)) {
          return resolve(window.__cvIntelliNumCache.rows.slice());
        }
        var frame=document.getElementById('cv-intelli-invframe');
        if(frame && frame.parentNode) frame.parentNode.removeChild(frame);
        frame=document.createElement('iframe');
        frame.id='cv-intelli-invframe';
        frame.src='/portal/inventory';
        frame.setAttribute('aria-hidden','true');
        Object.assign(frame.style, { position:'fixed', left:'-9999px', top:'-9999px', width:'1px', height:'1px', opacity:'0' });
        document.body.appendChild(frame);

        var killed=false, timeout=setTimeout(function(){ cleanup(); reject(new Error('Inventory iframe timed out')); }, 45000);
        function cleanup(){ if(killed) return; killed=true; clearTimeout(timeout); if(frame && frame.parentNode) frame.parentNode.removeChild(frame); }

        frame.onload=function(){
          try{
            var win=frame.contentWindow, doc=win.document, tries=0;
            (function waitDT(){
              tries++;
              var $=win.jQuery||win.$;
              var table=doc.querySelector('table.dataTable')||doc.querySelector('table');
              if($ && $.fn && $.fn.dataTable && table) hook($, table);
              else if(tries<160) setTimeout(waitDT, 250);
              else { cleanup(); reject(new Error('Inventory table not found')); }
            })();

            function readRowCells(tr){
              var tds = tr && tr.querySelectorAll ? tr.querySelectorAll('td,th') : [];
              if (tds.length < 3) return null;
              return {
                phone: (tds[0].textContent||'').trim(),
                treatment: (tds[1].textContent||'').trim(),
                destination: (tds[2].textContent||'').trim()
              };
            }

            function hook($, table){
              var dt = $(table).DataTable ? $(table).DataTable() :
                       ($(table).dataTable && $(table).dataTable().api ? $(table).dataTable().api() : null);
              if(!dt){ cleanup(); return reject(new Error('DataTables not active on inventory table')); }

              try {
                var settings = dt.settings()[0];
                if (settings && !settings.oFeatures.bServerSide) {
                  var data = dt.rows({ search:'applied' }).nodes().toArray();
                  var rows = [], seen = new Set();
                  data.forEach(function(tr){
                    var c = readRowCells(tr); if (!c) return;
                    var tnDigits = (c.phone||'').replace(/[^\d]/g,''); if (!tnDigits || seen.has(tnDigits)) return; seen.add(tnDigits);
                    var type = mapDestType(c.treatment);
                    var id   = (type==='User' || type==='AA' || type==='Queue') ? extFromDestination(c.destination) : '';
                    rows.push({
                      id:       'n'+tnDigits.slice(-8),
                      number:   formatTN(c.phone),
                      label:    _norm(c.destination),   // fallback label = Destination
                      destType: type,
                      destId:   String(id || ''),
                      destName: _norm(c.destination)
                    });
                  });
                  cleanup();
                  window.__cvIntelliNumCache = { t: Date.now(), rows: rows.slice() };
                  return resolve(rows);
                }
              } catch(_) { /* fall through */ }

              try{ dt.page.len(200).draw(false); }catch(_){}
              var out=[], seen=new Set();
              function collectPage(){
                dt.rows({ page:'current' }).every(function(){
                  var c = readRowCells(this.node()); if (!c) return;
                  var tnDigits = (c.phone||'').replace(/[^\d]/g,''); if(!tnDigits || seen.has(tnDigits)) return; seen.add(tnDigits);
                  var type = mapDestType(c.treatment);
                  var id   = (type==='User' || type==='AA' || type==='Queue') ? extFromDestination(c.destination) : '';
                  out.push({
                    id:       'n'+tnDigits.slice(-8),
                    number:   formatTN(c.phone),
                    label:    _norm(c.destination),
                    destType: type,
                    destId:   String(id || ''),
                    destName: _norm(c.destination)
                  });
                });
              }
              $(table).on('draw.dt', function(){
                collectPage();
                var info=dt.page.info();
                if(info.page < info.pages-1) dt.page('next').draw(false);
                else { cleanup(); window.__cvIntelliNumCache = { t: Date.now(), rows: out.slice() }; resolve(out); }
              });
              collectPage(); dt.draw(false);
            }
          }catch(e){ cleanup(); reject(e); }
        };
      }catch(ex){ reject(ex); }
    });
  }

  async function loadInventory(){
    if (window.__cvIntelliNumCache && (Date.now() - window.__cvIntelliNumCache.t < 5*60*1000)) {
      return window.__cvIntelliNumCache.rows.slice();
    }
    if (__cvInvPromise) return __cvInvPromise;

    __cvInvPromise = (async () => {
      if ((window.cvIntelliPreferMode || 'export') !== 'api') {
        try {
          const rows = await loadInventoryViaExport();
          if (rows && rows.length) return rows;
        } catch (e) {
          log('Export CSV failed — falling back:', e && e.message ? e.message : e);
        }
      }

      try {
        const base = await probeNumbersUrl();
        const raw  = await fetchJSON(addParam(base, 'limit', '5000'));
        const list = Array.isArray(raw) ? raw : (raw.items || raw.results || raw.data || raw.numbers || []);
        if (!Array.isArray(list) || !list.length) throw new Error('Endpoint returned no items: '+base);
        const rows = list.map(function(x,i){
          const typeRaw = x.dest_type || x.owner_type || x.type || x.destination_type || x.treatment;
          const type    = mapDestType(typeRaw);
          const nameRaw = x.dest_name || x.owner_name || x.destination_name || x.destination || x.notes || '';
          const idRaw   = x.dest_id   || x.owner_id   || x.destination_id || x.owner_ext || x.ext
                          || (type==='User'||type==='AA'||type==='Queue' ? extFromDestination(nameRaw) : '');
          return {
            id:       x.id || x.uuid || ('num'+i),
            number:   formatTN(x.number || x.tn || x.did || x.dnis || x.e164 || x.phone || ''),
            label:    x.label || x.alias || _norm(nameRaw),     // fallback label = Destination
            destType: type,
            destId:   String(idRaw || ''),
            destName: _norm(nameRaw)
          };
        });
        window.__cvIntelliNumCache = { t: Date.now(), rows: rows.slice() };
        return rows;
      } catch(apiErr){
        log('API numbers failed — falling back to iframe scrape:', apiErr && apiErr.message ? apiErr.message : apiErr);
      }

      return await scrapeInventoryViaIframe();
    })().finally(function(){ __cvInvPromise = null; });

    return __cvInvPromise;
  }

  /* ---------- users directory (for nicer User titles) ---------- */
  var USERS_URL = window.cvIntelliUsersUrl || null;
  async function probeUsersUrl(){
    if (USERS_URL) return USERS_URL;
    const candidates = ['/portal/api/users','/portal/api/v1/users','/portal/ajax/users','/portal/ajax/user/list','/api/users','/ns-api/users'];
    for (let i=0;i<candidates.length;i++){
      try {
        const data = await fetchJSON(addParam(candidates[i], 'limit', '1'));
        const list = Array.isArray(data) ? data : (data.items || data.results || data.data || data.users);
        if (Array.isArray(list)) { log('users endpoint:', candidates[i]); USERS_URL = candidates[i]; return USERS_URL; }
      } catch(_) {}
    }
    throw new Error('No users JSON endpoint; will try UI scrape.');
  }
  function mkUserDisplay(u){
    const ext   = _norm(u.ext || u.extension || u.exten || u.login || u.username);
    const first = _norm(u.first_name || u.first);
    const last  = _norm(u.last_name  || u.last);
    const base  = _norm(u.display_name || u.full_name || u.name || ((first||last)?(first+' '+last).trim():'')); 
    const id    = _norm(u.id || u.user_id || u.uuid || u.uid || ext);
    const label = base || ('User ' + (ext || id));
    return { id, ext, label: ext ? (label + ' ('+ext+')') : label };
  }
  async function scrapeUsersViaIframe(){
    return new Promise(function(resolve, reject){
      try{
        var frame=document.getElementById('cv-intelli-usersframe');
        if(frame && frame.parentNode) frame.parentNode.removeChild(frame);
        frame=document.createElement('iframe');
        frame.id='cv-intelli-usersframe';
        frame.src='/portal/users';
        frame.setAttribute('aria-hidden','true');
        Object.assign(frame.style, { position:'fixed', left:'-9999px', top:'-9999px', width:'1px', height:'1px', opacity:'0' });
        document.body.appendChild(frame);

        var killed=false, timeout=setTimeout(function(){ cleanup(); reject(new Error('Users iframe timed out')); }, 30000);
        function cleanup(){ if(killed) return; killed=true; clearTimeout(timeout); if(frame && frame.parentNode) frame.parentNode.removeChild(frame); }

        frame.onload=function(){
          try{
            var doc=frame.contentWindow.document;
            var rows=[].slice.call(doc.querySelectorAll('table tr, .list tbody tr, .table tr'));
            var byId=Object.create(null), byExt=Object.create(null);
            rows.forEach(function(tr){
              var tds=tr.querySelectorAll ? tr.querySelectorAll('td,th') : []; if(!tds || tds.length<2) return;
              var text=[].map.call(tds, td=> (td.textContent||'').trim());
              var name=(text[0]||'').trim(); var ext='';
              for(var i=1;i<text.length;i++){ var m=text[i].match(/\b(\d{2,6})\b/); if(m){ ext=m[1]; break; } }
              if(!name || !ext) return;
              var id=ext; var label=name+' ('+ext+')';
              byId[id]=label; byExt[ext]=label;
            });
            cleanup(); resolve({ byId, byExt });
          }catch(e){ cleanup(); reject(e); }
        };
      }catch(ex){ reject(ex); }
    });
  }
  async function loadUserDirectory(){
    try{
      const url = await probeUsersUrl();
      const raw = await fetchJSON(addParam(url, 'limit', '5000'));
      const list = Array.isArray(raw) ? raw : (raw.items || raw.results || raw.data || raw.users || []);
      const byId=Object.create(null), byExt=Object.create(null);
      list.forEach(u => { const d=mkUserDisplay(u); if(d.id) byId[d.id]=d.label; if(d.ext) byExt[d.ext]=d.label; });
      return { byId, byExt };
    }catch(e){
      log('users JSON failed — scraping UI:', e && e.message ? e.message : e);
      return await scrapeUsersViaIframe();
    }
  }
  function nameForUserGroup(g, dir){
    if (dir && dir.byId && dir.byId[g.id]) return dir.byId[g.id];
    if (dir && dir.byExt && /^\d{2,6}$/.test(g.id) && dir.byExt[g.id]) return dir.byExt[g.id];
    if (_norm(g.name) && _norm(g.name).toLowerCase()!=='user') return g.name;
    return g.id ? ('User '+g.id) : 'User';
  }

  /* ---------- grouping ---------- */
  function groupByDestination(rows){
    var map = Object.create(null), out = [];
    for (var i=0;i<rows.length;i++){
      var r = rows[i];
      var type = r.destType || 'External';
      var id   = _norm(r.destId);
      var name = _norm(r.destName);
      var keyPart = (id ? ('id:'+id) : ('name:'+_normKey(name)));
      var key = type + '|' + keyPart;

      if (!map[key]) map[key] = { key, type, id, name, numbers: [] };
      map[key].numbers.push({ id:r.id, number:r.number, label:(r.label || r.destName || '') });
    }
    for (var k in map){ if (Object.prototype.hasOwnProperty.call(map,k)) { map[k].count = map[k].numbers.length; out.push(map[k]); } }
    out.sort(function(a,b){ return b.count - a.count || (a.type > b.type ? 1 : -1) || (_normKey(a.name) > _normKey(b.name) ? 1 : -1); });
    return out;
  }

  /* ---------- virtual list ---------- */
  function mountVirtualList(container, items, rowH, rightLabel){
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
        var left=make('div',null,'<div class="row-num">'+it.number+'</div>'+(it.label?'<div class="muted">'+it.label+'</div>':'')); // label under TN
        var right=make('div','muted', rightLabel || '');
        row.appendChild(left); row.appendChild(right); rows.appendChild(row);
      }
    }
    container.addEventListener('scroll', draw); draw(); return { redraw: draw };
  }

  /* ---------- mount UI (left column with expand) ---------- */
  function cvIntelliRoutingMount(root){
    try{
      root.innerHTML='';
      var wrap=make('div','ir');
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
      + '</div>';
      root.appendChild(wrap);

      /* (optional) preview drawer scaffold kept for future */
      var drawer=document.getElementById('ir-drawer');
      if(!drawer){
        drawer=document.createElement('div');
        drawer.id='ir-drawer'; drawer.className='drawer';
        drawer.innerHTML='<div class="drawer-h"><div id="ir-drawer-title">Preview</div><button class="drawer-x" title="Close">×</button></div><div class="drawer-b" id="ir-drawer-body"></div>';
        root.appendChild(drawer);
        drawer.querySelector('.drawer-x').addEventListener('click', function(){ drawer.classList.remove('open'); });
      }

      var groups=[], viewGroups=[], openKey=null;

      function titleFor(g){
        return (g.type==='User') ? nameForUserGroup(g, window.__cvUserDir||null) : (g.name||g.type);
      }

      function renderCard(g){
        var title  = titleFor(g);
        var isOpen = (openKey === g.key);

        var card = make('div','card'); card.appendChild(make('div','left-bar'));
        var hdr  = make('div','card-h');

        var left = make('div','hdr-left');
        left.appendChild(make('div','card-title', title));
        left.appendChild(make('span','dest-badge', g.type));
        hdr.appendChild(left);

        var right = make('div','hdr-right');
        right.appendChild(make('span','count-badge', g.count + ' number' + (g.count===1?'':'s')));
        var btn = make('button','btn', isOpen ? 'Collapse' : 'Expand');
        right.appendChild(btn);
        hdr.appendChild(right);
        card.appendChild(hdr);

        var body = make('div','card-b');
        if (isOpen){
          card.classList.add('open');

          /* Export CSV for just this destination (Number,Destination) */
          var acts = make('div','card-actions');
          var exportBtn = make('button','btn','Export CSV');
          exportBtn.onclick = function(){
            var dest = (title || '').replace(/"/g,'""');
            var csv  = 'Number,Destination\n';
            for (var i=0;i<g.numbers.length;i++){
              csv += '"' + g.numbers[i].number + '","' + dest + '"\n';
            }
            var blob = new Blob([csv], {type:'text/csv'});
            var url  = URL.createObjectURL(blob);
            var a    = document.createElement('a');
            a.href = url;
            a.download = (g.type+' '+(title||'')+' numbers.csv').replace(/\s+/g,'_');
            a.click();
            setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
          };
          acts.appendChild(exportBtn);
          body.appendChild(acts);

          /* mini list */
          var rowsHost = make('div','rows');
          body.appendChild(rowsHost);
          var rightLabel = /^\d{2,6}$/.test(g.id) ? ('#'+g.id) : '';
          mountVirtualList(rowsHost, g.numbers, 32, rightLabel);
        }
        card.appendChild(body);

        btn.onclick = function(){ openKey = isOpen ? null : g.key; renderGroups(); };
        return card;
      }

      function renderGroups(){
        var host=document.getElementById('ir-groups'); host.innerHTML='';
        for(var i=0;i<viewGroups.length;i++) host.appendChild(renderCard(viewGroups[i]));
        document.getElementById('ir-count').textContent = viewGroups.length + ' destination group' + (viewGroups.length===1?'':'s');
      }

      function applyFilters(){
        var term=_normKey(document.getElementById('ir-q').value||'');
        var chips=document.querySelectorAll('#cv-intelli-root .chip'), i, type='all';
        for(i=0;i<chips.length;i++){ if(chips[i].classList.contains('active')){ type=chips[i].getAttribute('data-ft')||'all'; break; } }
        viewGroups=[];
        for(i=0;i<groups.length;i++){
          var g=groups[i]; if(type!=='all' && g.type!==type) continue;
          var t = titleFor(g);
          var match=!term || (t && _normKey(t).indexOf(term)>=0);
          if(!match && /[0-9]/.test(term)){
            for(var j=0;j<g.numbers.length;j++){ if(_normKey(g.numbers[j].number).indexOf(term)>=0){ match=true; break; } }
            if(!match && g.id && _normKey(String(g.id)).indexOf(term)>=0) match=true;
          }
          if(match) viewGroups.push(g);
        }
        renderGroups();
      }

      /* events */
      document.getElementById('ir-q').addEventListener('input', applyFilters);
      var chips = wrap.querySelectorAll('.chip');
      chips.forEach(function(ch){ ch.addEventListener('click', function(){
        chips.forEach(function(c){ c.classList.remove('active'); });
        this.classList.add('active'); applyFilters();
      });});

      /* boot */
      loadInventory().then(async function(rows){
        groups = groupByDestination(rows||[]);
        try { window.__cvUserDir = await loadUserDirectory(); } catch(e){ log('user names not resolved:', e && e.message ? e.message : e); }
        applyFilters();
      }).catch(function(err){
        var msg='<div style="color:#a00; border:1px solid #f3c2b8; background:#fff3f0; padding:10px; border-radius:8px;">'
          + '<div style="font-weight:600; margin-bottom:6px;">Could not load phone number inventory</div>'
          + '<div style="margin-bottom:6px;">' + (err && err.message ? err.message : err) + '</div>'
          + '<div style="font-size:12px;">Set endpoints if known:<br>'
          + '<code>window.cvIntelliNumbersUrl = "/exact/numbers/path";</code><br>'
          + '<code>window.cvIntelliUsersUrl   = "/exact/users/path";</code><br>then click the tile again.</div>'
          + '</div>';
        root.innerHTML = msg;
      });
    }catch(e){
      try{ root.innerHTML='<div style="color:#a00">Mount error: '+(e && e.message ? e.message : e)+'</div>'; }catch(_){}
      console.error(e);
    }
  }
  window.cvIntelliRoutingMount = cvIntelliRoutingMount;
})();
