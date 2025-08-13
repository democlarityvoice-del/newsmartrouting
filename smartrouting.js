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

/* ===== Intelli Routing — Overlay (vanilla JS, dock if possible) ===== */
;(function(){
  var ORANGE='#e57027', ORANGE_050='#fff2eb', ORANGE_075='#ffe9de', ORANGE_600='#bf541e';

  function ensureStyle(){
    if (document.getElementById('cv-intelli-style')) return;
    var css = [
      '#cv-intelli-root{display:none}',
      '#cv-intelli-root.dock{position:absolute; top:8px; right:8px; bottom:8px; left:8px; z-index:2}',
      '#cv-intelli-root.float{position:fixed; top:6%; left:50%; transform:translateX(-50%); z-index:999999; width:960px; max-width:90vw}',
      '#cv-intelli-root .cv-back{position:absolute; top:0; right:0; bottom:0; left:0; background:rgba(0,0,0,.15)}',
      '#cv-intelli-root.dock .cv-back{display:none}',
      '#cv-intelli-root .cv-panel{position:absolute; top:0; right:0; bottom:0; left:0; background:#fff; border-radius:12px; box-shadow:0 8px 40px rgba(0,0,0,.10); font:14px/1.4 system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif; box-sizing:border-box}',
      '#cv-intelli-root.float .cv-panel{height:auto}',
      '#cv-intelli-root .cv-h{display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:linear-gradient(0deg, rgba(229,112,39,.06), rgba(229,112,39,.06)); border-bottom:1px solid rgba(229,112,39,.25); font-weight:600}',
      '#cv-intelli-root .cv-x{cursor:pointer; background:transparent; border:none; font-size:20px; line-height:1}',
      '#cv-intelli-root .cv-b{padding:16px; height:calc(100% - 52px); overflow:auto}',

      /* UI bits (same as before) */
      '.ir{display:flex; gap:16px; min-height:420px}',
      '.ir-left{width:340px; flex:0 0 340px}',
      '.ir-right{flex:1; min-width:0}',
      '.ir-h1{font-weight:600; margin:0 0 8px}',
      '.ir-search{width:100%; padding:8px 10px; border:1px solid #ddd; border-radius:10px}',
      '.ir-search:focus{outline:none; box-shadow:0 0 0 3px rgba(229,112,39,.35); border-color:'+ORANGE+'}',
      '.ir-filters{display:flex; gap:6px; flex-wrap:wrap; margin:8px 0 10px}',
      '.chip{font-size:12px; padding:4px 8px; border:1px solid #e5e5e5; border-radius:999px; background:#fafafa; cursor:pointer}',
      '.chip:hover{background:#f6f7fb}',
      '.chip.active{background:'+ORANGE_050+'; border-color:'+ORANGE+'; color:#4a2a00}',
      '.list-outer{border:1px solid #eee; border-radius:10px; background:#fff}',
      '.card{border:1px solid #eee; border-left:4px solid '+ORANGE+'; border-radius:12px; background:#fff; box-shadow:0 8px 30px rgba(0,0,0,.06); margin-bottom:12px}',
      '.card-h{display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border-bottom:1px solid #eee; background:#fafafa}',
      '.card-title{font-weight:600}',
      '.count-badge{font-size:12px; background:'+ORANGE_050+'; color:#4a2a00; border:1px solid '+ORANGE+'; border-radius:999px; padding:2px 8px}',
      '.dest-badge{font-size:12px; padding:2px 6px; border-radius:6px; background:'+ORANGE_050+'; border:1px solid '+ORANGE+'; margin-left:8px}',
      '.card-b{padding:10px 12px}',
      '.rows{position:relative; height:220px; overflow:auto; border:1px solid #f2f2f2; border-radius:8px; background:#fff}',
      '.vpad{height:0}',
      '.row{display:flex; align-items:center; justify-content:space-between; height:40px; padding:0 10px; border-bottom:1px solid #f6f6f6; font-variant-numeric:tabular-nums}',
      '.row:hover{background:'+ORANGE_075+'}',
      '.row-num{font-variant-numeric:tabular-nums}',
      '.muted{color:#666}',
      '.controls{display:flex; gap:8px; align-items:center; margin:0 0 10px}',
      '.sel{padding:6px 8px; border:1px solid #ddd; border-radius:8px; background:#fff}',
      '.sel:focus{outline:none; box-shadow:0 0 0 3px rgba(229,112,39,.35); border-color:'+ORANGE+'}',
      '.btn{cursor:pointer; border:none; background:'+ORANGE+'; color:#fff; padding:8px 10px; border-radius:8px}',
      '.btn:hover{background:'+ORANGE_600+'}',
      '.pill{font-size:12px; padding:2px 8px; border:1px solid #ddd; border-radius:999px; background:#fafafa}'
    ].join('\n');
    var st=document.createElement('style'); st.id='cv-intelli-style'; st.type='text/css'; st.appendChild(document.createTextNode(css));
    document.head.appendChild(st);
  }

  function findDockHost(){
    var sels=[
      '#page-content','#content','#contentArea','#main-content','#portal-content',
      '#container','#content_wrap','#contentWrap','#workarea','#inner-content',
      '#engagecx-slot'
    ];
    for(var i=0;i<sels.length;i++){
      var el=document.querySelector(sels[i]);
      if(el && el.offsetParent!==null && el.offsetHeight>200) return el;
    }
    return null;
  }

  function ensureRoot(){
    ensureStyle();
    var host=findDockHost();
    var mode = host ? 'dock' : 'float';

    var root=document.getElementById('cv-intelli-root');
    if(!root){
      root=document.createElement('div');
      root.id='cv-intelli-root';
      root.innerHTML =
        '<div class="cv-back"></div>'
      + '<div class="cv-panel" role="dialog" aria-modal="true" aria-label="Intelli Routing">'
      + '  <div class="cv-h"><div>Intelli Routing</div><button class="cv-x" title="Close">×</button></div>'
      + '  <div class="cv-b"><div id="cv-intelli-mount">Loading…</div></div>'
      + '</div>';
      (host||document.body).appendChild(root);
      root.querySelector('.cv-back').addEventListener('click', function(){ root.style.display='none'; });
      root.querySelector('.cv-x').addEventListener('click', function(){ root.style.display='none'; });
    } else {
      // move to the right parent if needed
      var parent = host || document.body;
      if (root.parentNode !== parent) parent.appendChild(root);
    }

    // set positioning class
    root.className = mode;
    if (host && getComputedStyle(host).position==='static'){ host.style.position='relative'; }
    return root;
  }

  function openOverlay(){
    var root=ensureRoot();
    root.style.display='block';
    var mount=document.getElementById('cv-intelli-mount');
    if (typeof window.cvIntelliRoutingMount==='function'){
      try { window.cvIntelliRoutingMount(mount); } catch(e){ console.error('[Intelli] mount error:', e); }
    } else {
      console.warn('[Intelli] cvIntelliRoutingMount not a function');
    }
  }

  window.addEventListener('cv:intelli-routing:open', openOverlay, false);
  // manual test helper:
  window.cvIntelliOpen = openOverlay;
})();

