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

// ===== Intelli Routing overlay harness (no scroll) =====
;(function () {
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
    root.innerHTML = '<p style="margin:0">Overlay ready. Your app can mount here via <code>cvIntelliRoutingMount(root)</code>.</p>';
  };

  // open handler
  window.addEventListener('cv:intelli-routing:open', function () {
    var host = getMount();
    host.style.display = 'block';
    var mount = host._mountEl;
    try { window.cvIntelliRoutingMount(mount); } catch (e) { console.error(e); }
  });

  console.log('Intelli harness ready');

// in https://democlarityvoice-del.github.io/newsmartrouting/smartrouting.js
window.cvIntelliRoutingMount = function(root){
  // styles
  var css = document.createElement('style');
  css.textContent = ".ir-row{display:flex;gap:16px}.ir-aa{border:1px solid #e8e8e8;border-radius:10px;margin:10px 0;box-shadow:0 4px 20px rgba(0,0,0,.06)}.ir-h{padding:10px 12px;background:#fafafa;border-bottom:1px solid #eee;display:flex;justify-content:space-between;align-items:center}.ir-b{padding:12px}.ir-key{padding:6px 8px;border:1px solid #eee;border-radius:8px;margin:4px 0;cursor:pointer}.ir-dest{margin:6px 0 6px 14px;border-left:2px solid #ddd;padding-left:10px;color:#444}.ir-tag{font-size:12px;padding:2px 6px;border-radius:6px;background:#eef;}";
  root.innerHTML = ""; root.appendChild(css);

  // layout
  var wrap = document.createElement('div');
  wrap.innerHTML =
    '<div class="ir-row">'+
      '<div style="width:220px">'+
        '<div><b>View</b></div>'+
        '<div><label><input type="radio" name="irv" value="aa" checked> Auto Attendants</label></div>'+
        '<div><label><input type="radio" name="irv" value="trace"> Trace a call</label></div>'+
        '<hr style="margin:10px 0">'+
        '<input id="ir-search" placeholder="Search AA..." style="width:100%;padding:6px 8px;border:1px solid #ddd;border-radius:8px">'+
      '</div>'+
      '<div id="ir-main" style="flex:1"></div>'+
    '</div>';
  root.appendChild(wrap);

  var main = wrap.querySelector('#ir-main');
  var search = wrap.querySelector('#ir-search');

  // --- fake data for now (swap later) ---
  function loadAAIndex(){return Promise.resolve([
    {id:"aa-main", name:"Main Menu"}, {id:"aa-sales", name:"Sales IVR"}, {id:"aa-support", name:"Support IVR"}
  ]);}
  function loadAADetails(id){
    var map = {
      "aa-main": {id:"aa-main", name:"Main Menu", keys:{
        "1": {label:"Sales", dest:{type:"Queue", name:"Sales", id:"q-sales"}},
        "2": {label:"Support", dest:{type:"AA", name:"Support IVR", id:"aa-support"}},
        "timeout": {label:"Timeout", dest:{type:"Voicemail", name:"Main VM", id:"vm-main"}},
        "invalid": {label:"Invalid", dest:{type:"Announcement", name:"Try again", id:"ann-retry"}}
      }},
      "aa-sales": {id:"aa-sales", name:"Sales IVR", keys:{
        "1": {label:"East", dest:{type:"Queue", name:"Sales East", id:"q-se"}},
        "2": {label:"West", dest:{type:"Queue", name:"Sales West", id:"q-sw"}}
      }},
      "aa-support": {id:"aa-support", name:"Support IVR", keys:{
        "1": {label:"Phones", dest:{type:"Queue", name:"Support Phones", id:"q-ph"}},
        "2": {label:"Internet", dest:{type:"Queue", name:"Support Net", id:"q-net"}},
        "0": {label:"Operator", dest:{type:"User", name:"Front Desk", id:"u-op"}}
      }}
    };
    return Promise.resolve(map[id]);
  }
  // --------------------------------------

  var aaIndex = [];
  function renderAAList(filter){
    main.innerHTML = "";
    aaIndex.filter(function(a){ return !filter || a.name.toLowerCase().indexOf(filter.toLowerCase())>=0; })
      .forEach(function(aa){ main.appendChild(renderAACard(aa)); });
  }

  function renderAACard(aa){
    var card = document.createElement('div'); card.className = 'ir-aa';
    card.innerHTML = '<div class="ir-h"><div>'+aa.name+'</div><div class="ir-tag">Auto Attendant</div></div><div class="ir-b" id="b-'+aa.id+'">Loading…</div>';
    loadAADetails(aa.id).then(function(detail){
      var b = card.querySelector('#b-'+aa.id);
      b.innerHTML = "";
      Object.keys(detail.keys).forEach(function(key){
        var row = document.createElement('div'); row.className = 'ir-key';
        var kLabel = (key==="timeout"||key==="invalid") ? key : 'Key '+key;
        row.textContent = kLabel+' — '+detail.keys[key].label;
        b.appendChild(row);
        // destination preview
        var dest = document.createElement('div'); dest.className = 'ir-dest';
        var d = detail.keys[key].dest;
        dest.textContent = '→ '+d.type+': '+d.name;
        b.appendChild(dest);
      });
    });
    return card;
  }

  loadAAIndex().then(function(list){ aaIndex = list; renderAAList(""); });
  search.addEventListener('input', function(){ renderAAList(this.value||""); });
};
  
})();
