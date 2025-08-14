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

function renderCard(g){  // or renderGroupCard(g)
  var card = make('div','card');
  card.appendChild(make('div','left-bar'));

  var hdr = make('div','card-h');

  var left = make('div','hdr-left');
  left.appendChild(make('div','card-title', g.name));
  left.appendChild(make('span','dest-badge', g.type));
  hdr.appendChild(left);

  var right = make('div','hdr-right');
  right.appendChild(make('span','count-badge', g.count + ' number' + (g.count===1?'':'s')));
  var btn = make('button','btn', activeDetail===g.key ? 'Collapse' : 'Expand');
  right.appendChild(btn);
  hdr.appendChild(right);

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
    // call YOUR existing virtualizer
    (typeof mountVirtualList==='function' ? mountVirtualList : mountVirtual)(rows, g.numbers, 40);
  } else {
    body.appendChild(make('div','muted','Click expand to view numbers and previews.'));
  }
  card.appendChild(body);

  btn.onclick = function(){
    activeDetail = (activeDetail===g.key) ? null : g.key;
    applyFilters();
    var detail=document.getElementById('ir-detail');
    if(activeDetail===g.key){
      detail.innerHTML = '<div class="card"><div class="card-h"><div class="hdr-left"><div class="card-title">'+g.name+
        '</div><span class="dest-badge">'+g.type+'</span></div></div><div class="card-b">This destination has <b>'+g.count+
        '</b> numbers.<br/><span class="muted">Use Export CSV for the full list. “When” affects trace later.</span></div></div>';
    } else if(!activeDetail){
      detail.innerHTML = 'Expand a destination on the left to view numbers and previews.'; detail.className='muted';
    }
  };

  return card;
}


  /* ===== Intelli Routing — Overlay (dock; scoped; banner swap; accent hook) ===== */
;(function(){
  // ---- Accent (defaults) ----
  // Base Clarity orange + a LIGHTER tint for headers.
  var DEFAULT_ACCENT = '#f89406';
  var DEFAULT_TINT   = '#FDE8CC';  // or your favorite from above



  // ---- Scoped styles (affects only our overlay) ----
  function ensureStyle(){
    if (document.getElementById('cv-intelli-style')) return;
    var css = [
      '#cv-intelli-root{display:none; --cv-accent:'+DEFAULT_ACCENT+'; --cv-tint:'+DEFAULT_TINT+';}',
      '#cv-intelli-root.dock{position:absolute; top:8px; right:8px; bottom:8px; left:8px; z-index:2}',
      '#cv-intelli-root.float{position:fixed; top:6%; left:50%; transform:translateX(-50%); z-index:999999; width:960px; max-width:90vw}',
      '#cv-intelli-root .cv-back{position:absolute; inset:0; background:rgba(0,0,0,.15)}',
      '#cv-intelli-root.dock .cv-back{display:none}',
      '#cv-intelli-root .cv-panel{position:absolute; inset:0; background:#fff; border-radius:12px; box-shadow:0 8px 40px rgba(0,0,0,.10); font:14px/1.4 system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif; box-sizing:border-box}',
      '#cv-intelli-root.float .cv-panel{height:auto}',
      '#cv-intelli-root .cv-h{display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:linear-gradient(180deg, var(--cv-tint), #fff); border-bottom:1px solid rgba(229,112,39,.22); font-weight:600}',
      '#cv-intelli-root .cv-x{cursor:pointer; background:transparent; border:none; font-size:20px; line-height:1}',
      '#cv-intelli-root .cv-b{padding:16px; height:calc(100% - 52px); overflow:auto}',

      /* ===== everything below is scoped to our overlay ===== */
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
      '#cv-intelli-root .pill{font-size:12px; padding:2px 8px; border:1px solid #ddd; border-radius:999px; background:#fafafa}'
    ].join('\n');
    var st=document.createElement('style'); st.id='cv-intelli-style'; st.type='text/css';
    st.appendChild(document.createTextNode(css)); document.head.appendChild(st);
  }

  // allow runtime override once you have the exact tint:
  //   cvIntelliSetAccent('#e57027', '#FDE4D4')
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
// create/position the overlay root (docked when possible)
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

    function close(){ root.style.display='none'; swapBanner(false); }
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


// ------- Banner swap helpers (robust) -------
var _bannerEls = [], _origBannerTexts = [];

function collectBannerEls(){
  _bannerEls = []; _origBannerTexts = [];
  var sels = [
    // common title spots
    '#page-title h1','#pageTitle','.page-title h1','.pageTitle',
    '.content-title h1','.section-title h1','.titlebar h1',
    '.breadcrumbs + h1','.breadcrumb .active',
    '.module-title h1','.module-title','.tab-title','.tabs .current',
    // netsapiens/portal variants seen in the wild
    '.ns-content-header .title','.ns-header .title','.scroll-header .title',
    '.sticky-title','.top-bar h1','#breadcrumb h1',
    '.page_header h1','.headerbar h1',
    // fallbacks
    '.home h1','#home h1','#content h1','#content h2'
  ];
  var seen = new Set();
  for (var i=0;i<sels.length;i++){
    var nodes = document.querySelectorAll(sels[i]);
    for (var j=0;j<nodes.length;j++){
      var el = nodes[j]; if (seen.has(el)) continue;
      var txt = (el.textContent||'').trim();
      var box = el.getBoundingClientRect();
      var vis = el.offsetParent !== null && box.width > 100 && box.top < 260;
      if (txt && vis) { _bannerEls.push(el); _origBannerTexts.push(txt); seen.add(el); }
    }
  }
  // Ultimate fallback: any visible element near the top that literally says "Home"
  if (!_bannerEls.length){
    var all = document.querySelectorAll('body *');
    var best = null, bestBox = null;
    for (var k=0;k<all.length;k++){
      var e = all[k];
      if (!e || !e.textContent) continue;
      var t = e.textContent.replace(/\s+/g,' ').trim();
      if (t.toLowerCase() === 'home'){
        var b = e.getBoundingClientRect();
        if (e.offsetParent !== null && b.top < 260 && b.width > 100){
          if (!best || b.top < bestBox.top) { best = e; bestBox = b; }
        }
      }
    }
    if (best){ _bannerEls.push(best); _origBannerTexts.push(best.textContent.trim()); }
  }
}

function swapBanner(on){
  // refresh targets on each open to handle SPA reflows
  if (on) { _bannerEls = []; _origBannerTexts = []; }
  if (!_bannerEls.length) collectBannerEls();
  for (var i=0;i<_bannerEls.length;i++){
    var el=_bannerEls[i]; if (!el) continue;
    el.textContent = on ? 'Intelli Routing' : (_origBannerTexts[i] || el.textContent);
  }
}
// ——— Nav title swap (uses Portal's built-in title element so it stays centered)
var _navTitleEl = null, _origNavTitle = null;
function swapNavTitle(on){
  // Prefer the same element EngageCX used:
  var el = _navTitleEl || document.querySelector('.navigation-title');
  if (!el) return; // if the portal doesn't have it, do nothing
  _navTitleEl = el;
  if (on) {
    if (_origNavTitle == null) _origNavTitle = (el.textContent || '').trim();
    el.textContent = 'Intelli Routing';
  } else if (_origNavTitle != null) {
    el.textContent = _origNavTitle;
    _origNavTitle = null;
  }
}
// ——— Toggle orange "active" state on the Intelli tile only when open
function setNavActiveIntelli(on){
  try {
    var $ = window.jQuery || window.$;
    if ($ && $.fn) {
      $('#nav-buttons li').removeClass('nav-link-current');
      if (on) $('#nav-intelli-routing').addClass('nav-link-current');
      return;
    }
  } catch(_) {}
  // Vanilla fallback
  var lis = document.querySelectorAll('#nav-buttons li');
  for (var i=0;i<lis.length;i++) lis[i].classList.remove('nav-link-current');
  if (on) {
    var me = document.getElementById('nav-intelli-routing');
    if (me) me.classList.add('nav-link-current');
  }
}
  // ——— Close overlay if user clicks any other nav tile
function closeIntelliOverlay(){
  var root = document.getElementById('cv-intelli-root');
  if (root) root.style.display = 'none';
  swapBanner(false);
  swapNavTitle(false);
  setNavActiveIntelli(false);
}

// Delegate to #nav-buttons so SPA nav also triggers close
(function wireNavClose(){
  var $ = window.jQuery || window.$;
  if ($ && $.fn) {
    $(document).off('click.intelli-navclose')
      .on('click.intelli-navclose', '#nav-buttons li:not(#nav-intelli-routing) a', function(){
        closeIntelliOverlay();
      });
  } else {
    // Vanilla delegate
    document.addEventListener('click', function(e){
      var nav = document.getElementById('nav-buttons');
      if (!nav || !nav.contains(e.target)) return;
      var li = e.target.closest('li');
      if (!li || li.id === 'nav-intelli-routing') return;
      closeIntelliOverlay();
    }, true);
  }
})();


// (optional) manual override if you discover the exact selector:
//   cvIntelliForceBanner('.ns-content-header .title')
window.cvIntelliForceBanner = function(sel){
  var el = document.querySelector(sel);
  if (el){
    _bannerEls = [el];
    _origBannerTexts = [el.textContent.trim()];
    swapBanner(true);
  }
};



  function openOverlay(){
  var root = ensureRoot();
  root.style.display = 'block';

  // NEW: make our tile active + swap both banner and centered nav title
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
window.cvIntelliOpen = openOverlay; // optional manual trigger



/* ===== Smart Routing+ — Group by Destination (Portal-safe, vanilla JS) ===== */
;(function(){
  // Public mount called by the overlay
  window.cvIntelliRoutingMount = function(root){
    try {
      // ---- layout scaffold
      root.innerHTML = '';
      var wrap = document.createElement('div'); wrap.className = 'ir';
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

      // ---- demo data (swap to real endpoints later)
      function demoInventory(n){
        var out=[], i, t, id, name, types=["User","Queue","AA","External","VM"];
        for(i=0;i<n;i++){
          t=types[i%types.length];
          if(t==="User"){ id="u-"+(200+(i%8)); name="User "+(200+(i%8)); }
          if(t==="Queue"){ id="q-"+(100+(i%4)); name="Queue "+(100+(i%4)); }
          if(t==="AA"){ id="aa-"+(i%3); name="Main Menu "+(i%3); }
          if(t==="External"){ id="x-"+(i%6); name="+1 (555) 42"+(10+(i%6)); }
          if(t==="VM"){ id="vm-"+(i%5); name="Voicemail "+(i%5); }
          out.push({ id:"num"+i, number:"(555) "+String(2000000+i).slice(0,3)+"-"+String(10000+i).slice(-4),
                     label:(i%10===0)?"Marketing Line "+(i%10):"", destType:t, destId:id, destName:name });
        }
        for(i=0;i<100;i++){ out[i].destType="User"; out[i].destId="u-999"; out[i].destName="Marketing Router"; }
        return out;
      }
      function loadInventory(){ return Promise.resolve(demoInventory(350)); }

      // ---- helpers
      function make(tag, cls, html){ var el=document.createElement(tag); if(cls)el.className=cls; if(html!=null)el.innerHTML=html; return el; }

      function groupByDestination(rows){
        var map={}, k, i, r;
        for(i=0;i<rows.length;i++){
          r=rows[i]; k=r.destType+':'+r.destId;
          if(!map[k]) map[k]={ key:k, type:r.destType, id:r.destId, name:r.destName, numbers:[] };
          map[k].numbers.push({ id:r.id, number:r.number, label:r.label||'' });
        }
        var arr=[], key;
        for(key in map){ if(map.hasOwnProperty(key)){ map[key].count=map[key].numbers.length; arr.push(map[key]); } }
        arr.sort(function(a,b){ return b.count - a.count || (a.type>b.type?1:-1); });
        return arr;
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
          var i, it, row, left, right;
          for(i=start;i<end;i++){
            it=items[i]; row=make('div','row');
            left=make('div',null,'<div class="row-num">'+it.number+'</div>'+(it.label?'<div class="muted">'+it.label+'</div>':''));
            right=make('div','muted','#'+it.id.slice(-4));
            row.appendChild(left); row.appendChild(right); rows.appendChild(row);
          }
        }
        container.addEventListener('scroll', draw); draw(); return { redraw: draw };
      }

      function renderCard(g){
        var card = make('div','card');
        card.appendChild(make('div','left-bar'));

        var hdr = make('div','card-h');

        var left = make('div','hdr-left');
        left.appendChild(make('div','card-title', g.name));
        left.appendChild(make('span','dest-badge', g.type));
        hdr.appendChild(left);

        var right = make('div','hdr-right');
        right.appendChild(make('span','count-badge', g.count + ' number' + (g.count===1?'':'s')));
        var btn = make('button','btn', activeDetail===g.key ? 'Collapse' : 'Expand');
        right.appendChild(btn);
        hdr.appendChild(right);

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
            detail.innerHTML = '<div class="card"><div class="card-h"><div class="hdr-left"><div class="card-title">'+g.name+
              '</div><span class="dest-badge">'+g.type+'</span></div></div><div class="card-b">This destination has <b>'+g.count+
              '</b> numbers.<br/><span class="muted">Use Export CSV for the full list. “When” affects trace later.</span></div></div>';
          } else if(!activeDetail){
            detail.innerHTML = 'Expand a destination on the left to view numbers and previews.'; detail.className='muted';
          }
        };

        return card;
      }

      function renderGroups(){
        var host=document.getElementById('ir-groups'); host.innerHTML='';
        for(var i=0;i<viewGroups.length;i++){ host.appendChild(renderCard(viewGroups[i])); }
        document.getElementById('ir-count').textContent = viewGroups.length + ' destination group' + (viewGroups.length===1?'':'s');
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

      var detailEl=document.getElementById('ir-detail');
      detailEl.innerHTML='Loading inventory…';
      loadInventory().then(function(rows){
        groups = groupByDestination(rows||[]);
        applyFilters();
        detailEl.innerHTML='Expand a destination on the left to view numbers and previews.';
      });
    } catch(e){
      try { root.innerHTML = '<div style="color:#a00">Mount error: '+(e && e.message ? e.message : e)+'</div>'; } catch(_) {}
      console.error(e);
    }
  };
})();

