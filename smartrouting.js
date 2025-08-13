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
})();
/* ===== Smart Routing+ (Group by Destination) — smartrouting.js ===== */
/* Mounts into the existing overlay via window.cvIntelliRoutingMount(root) */
/* ES5 only (no arrows/backticks) */

(function(){
  // Public entrypoint used by your overlay harness
  window.cvIntelliRoutingMount = function(root){
    try {
      // --- Brand tokens (Clarity Orange) ---
      var ORANGE     = '#e57027';
      var ORANGE_050 = '#fff2eb';
      var ORANGE_075 = '#ffe9de';
      var ORANGE_600 = '#bf541e';
      var FOCUS_RING = '0 0 0 3px rgba(229,112,39,.35)';

      // Try to tint the overlay header bar (in parent shadow root)
      try {
        var sr = root.getRootNode && root.getRootNode();
        var hdr = sr && sr.querySelector && sr.querySelector('.hdr');
        if (hdr) {
          hdr.style.background = 'linear-gradient(0deg, rgba(229,112,39,.06), rgba(229,112,39,.06))';
          hdr.style.borderBottom = '1px solid rgba(229,112,39,.25)';
        }
      } catch(e){}

      // Optional: subtle hover tint on the nav tile
      try {
        var nav = document.getElementById('nav-intelli-routing');
        if (nav) {
          var bg = nav.querySelector('.nav-bg-image');
          if (bg) {
            nav.addEventListener('mouseenter', function(){ bg.style.backgroundColor = 'rgba(229,112,39,.12)'; });
            nav.addEventListener('mouseleave', function(){ bg.style.backgroundColor = ''; });
          }
        }
      } catch(e){}

      // --- Base styles for the app content (lives inside overlay body) ---
      var css = document.createElement('style');
      css.textContent = [
        ".ir{display:flex;gap:16px;min-height:420px}",
        ".ir-left{width:340px;flex:0 0 340px}",
        ".ir-right{flex:1;min-width:0}",
        ".ir-h1{font-weight:600;margin:0 0 8px}",
        ".ir-search{width:100%;padding:8px 10px;border:1px solid #ddd;border-radius:10px}",
        ".ir-search:focus{outline:none;box-shadow:"+FOCUS_RING+";border-color:"+ORANGE+"}",
        ".ir-filters{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 10px}",
        ".chip{font-size:12px;padding:4px 8px;border:1px solid #e5e5e5;border-radius:999px;background:#fafafa;cursor:pointer}",
        ".chip:hover{background:#f6f7fb}",
        ".chip.active{background:"+ORANGE_050+";border-color:"+ORANGE+";color:#4a2a00}",
        ".list-outer{border:1px solid #eee;border-radius:10px;background:#fff}",
        ".card{border:1px solid #eee;border-left:4px solid "+ORANGE+";border-radius:12px;background:#fff;box-shadow:0 8px 30px rgba(0,0,0,.06);margin-bottom:12px}",
        ".card-h{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid #eee;background:#fafafa}",
        ".card-title{font-weight:600}",
        ".count-badge{font-size:12px;background:"+ORANGE_050+";color:#4a2a00;border:1px solid "+ORANGE+";border-radius:999px;padding:2px 8px}",
        ".dest-badge{font-size:12px;padding:2px 6px;border-radius:6px;background:"+ORANGE_050+";border:1px solid "+ORANGE+";margin-left:8px}",
        ".card-b{padding:10px 12px}",
        ".rows{position:relative;height:220px;overflow:auto;border:1px solid #f2f2f2;border-radius:8px;background:#fff}",
        ".vpad{height:0}", /* spacer container for virtualization */
        ".row{display:flex;align-items:center;justify-content:space-between;height:40px;padding:0 10px;border-bottom:1px solid #f6f6f6;font-variant-numeric:tabular-nums}",
        ".row:hover{background:"+ORANGE_075+"}",
        ".row-num{font-variant-numeric:tabular-nums}",
        ".muted{color:#666}",
        ".controls{display:flex;gap:8px;align-items:center;margin:0 0 10px}",
        ".sel{padding:6px 8px;border:1px solid #ddd;border-radius:8px;background:#fff}",
        ".sel:focus{outline:none;box-shadow:"+FOCUS_RING+";border-color:"+ORANGE+"}",
        ".btn{cursor:pointer;border:none;background:"+ORANGE+";color:#fff;padding:8px 10px;border-radius:8px}",
        ".btn:hover{background:"+ORANGE_600+"}",
        ".btn:focus{outline:none;box-shadow:"+FOCUS_RING+"}",
        ".k{padding:6px 8px;border:1px solid #eee;border-radius:8px;margin:6px 0;cursor:pointer}",
        ".k:focus{outline:none;box-shadow:"+FOCUS_RING+"}",
        ".empty{padding:14px;color:#777}",
        ".card-actions{display:flex;gap:8px;align-items:center}",
        ".pill{font-size:12px;padding:2px 8px;border:1px solid #ddd;border-radius:999px;background:#fafafa}",
        ".hdr-row{display:flex;align-items:center;gap:8px}",
        ".hdr-right{display:flex;align-items:center;gap:8px}"
      ].join("\n");
      // wipe and mount
      root.innerHTML = ""; root.appendChild(css);

      // --- Layout scaffold ---
      var wrap = document.createElement('div'); wrap.className = "ir";
      wrap.innerHTML =
        '<div class="ir-left">'+
          '<div class="ir-h1">Destinations</div>'+
          '<input id="ir-q" class="ir-search" placeholder="Search destination or number…"/>'+
          '<div class="ir-filters">'+
            '<span data-ft="all" class="chip active">All</span>'+
            '<span data-ft="User" class="chip">User</span>'+
            '<span data-ft="Queue" class="chip">Queue</span>'+
            '<span data-ft="AA" class="chip">Auto Attendant</span>'+
            '<span data-ft="External" class="chip">External</span>'+
            '<span data-ft="VM" class="chip">Voicemail</span>'+
          '</div>'+
          '<div class="list-outer">'+
            '<div id="ir-groups"></div>'+
          '</div>'+
          '<div id="ir-count" class="muted" style="margin-top:6px"></div>'+
        '</div>'+
        '<div class="ir-right">'+
          '<div class="ir-h1">Details</div>'+
          '<div class="controls">'+
            '<label class="muted">When</label>'+
            '<select id="ir-when" class="sel">'+
              '<option value="now">Now</option>'+
              '<option value="custom">Pick date/time…</option>'+
            '</select>'+
            '<input id="ir-dt" type="datetime-local" class="sel" style="display:none"/>'+
            '<span class="pill" id="ir-mode">Grouping: First Hop</span>'+
          '</div>'+
          '<div id="ir-detail" class="empty">Expand a destination on the left to view numbers and previews.</div>'+
        '</div>';
      root.appendChild(wrap);

      // --- Demo data (preview the UX) ---
      // Replace these loaders with real endpoints later.
      function demoInventory(n){
        // Build many numbers that collapse to a few destinations
        var out = [];
        var i, t, id, name;
        var types = ["User","Queue","AA","External","VM"];
        for (i=0;i<n;i++){
          t = types[i%types.length];
          if (t==="User")  { id="u-"+(200+(i%8)); name="User "+(200+(i%8)); }
          if (t==="Queue") { id="q-"+(100+(i%4)); name="Queue "+(100+(i%4)); }
          if (t==="AA")    { id="aa-"+(i%3);      name="Main Menu "+(i%3); }
          if (t==="External"){ id="x-"+(i%6);     name="+1 (555) 42"+(10+(i%6)); }
          if (t==="VM")    { id="vm-"+(i%5);      name="Voicemail "+(i%5); }
          out.push({
            id: "num"+i,
            number: "(555) "+String(2000000+i).slice(0,3)+"-"+String(10000+i).slice(-4),
            label: i%10===0 ? "Marketing Line "+(i%10) : "",
            destType: t,
            destId: id,
            destName: name
          });
        }
        // make a heavy skew: 100 numbers to one marketing user
        for (i=0;i<100;i++){
          out[i].destType="User"; out[i].destId="u-999"; out[i].destName="Marketing Router";
        }
        return out;
      }
      function loadInventory(){ return Promise.resolve(demoInventory(350)); }

      // Previews (Phase 1.5 placeholders)
      function fetchUserPreview(/*userId*/){ return Promise.resolve({ topRule:"Business Hours", where:{type:"AA", name:"Main Menu"} }); }
      function fetchQueuePreview(/*queueId*/){ return Promise.resolve({ strategy:"round-robin", timeoutSec:60, next:{ onTimeout:{type:"VM", name:"Sales VM"} } }); }
      function fetchAAPreview(/*aaId*/){ return Promise.resolve({ keys:["1: Sales","2: Support","timeout: Main VM"] }); }

      // --- State ---
      var allNumbers = [];
      var groups = [];      // [{key,type,id,name,numbers:[{number,label,id}], count}]
      var viewGroups = [];  // filtered/sorted groups
      var activeDetail = null; // currently expanded group key

      // --- Helpers ---
      function makeEl(tag, cls, html){
        var el = document.createElement(tag);
        if (cls) el.className = cls;
        if (html != null) el.innerHTML = html;
        return el;
      }

      function groupByDestination(rows){
        var map = {}; var k;
        for (var i=0;i<rows.length;i++){
          var r = rows[i];
          k = r.destType + ":" + r.destId;
          if (!map[k]) map[k] = { key:k, type:r.destType, id:r.destId, name:r.destName, numbers:[] };
          map[k].numbers.push({ id:r.id, number:r.number, label:r.label || "" });
        }
        var arr = []; for (k in map){ if (map.hasOwnProperty(k)) { map[k].count = map[k].numbers.length; arr.push(map[k]); } }
        // Sort biggest first for quick wins
        arr.sort(function(a,b){ return b.count - a.count || (a.type>b.type?1:-1); });
        return arr;
      }

      // Virtualized number list inside a card
      function mountVirtualList(container, items, rowHeight){
        container.innerHTML = "";
        container.className = "rows";
        var totals = makeEl('div','vpad'); totals.style.height = (items.length*rowHeight)+'px';
        var rows = makeEl('div'); rows.style.position = 'absolute'; rows.style.left = 0; rows.style.right = 0; rows.style.top = 0;
        container.appendChild(totals); container.appendChild(rows);
        function draw(){
          var top = container.scrollTop, h = container.clientHeight;
          var start = Math.max(0, Math.floor(top/rowHeight) - 4);
          var end = Math.min(items.length, start + Math.ceil(h/rowHeight) + 8);
          rows.style.transform = 'translateY('+(start*rowHeight)+'px)';
          rows.innerHTML = "";
          for (var i=start; i<end; i++){
            var it = items[i];
            var row = makeEl('div','row');
            var left = makeEl('div', null, '<div class="row-num">'+it.number+'</div>'+ (it.label ? '<div class="muted">'+it.label+'</div>' : ''));
            var right = makeEl('div','muted', '#'+it.id.slice(-4));
            row.appendChild(left); row.appendChild(right);
            rows.appendChild(row);
          }
        }
        container.addEventListener('scroll', draw);
        draw();
        return { redraw: draw };
      }

      // Render destination group card
      function renderGroupCard(g){
        var card = makeEl('div','card');
        var hdr = makeEl('div','card-h');
        var titleRow = makeEl('div','hdr-row');
        titleRow.appendChild(makeEl('div','card-title', g.name));
        titleRow.appendChild(makeEl('span','dest-badge', g.type));
        hdr.appendChild(titleRow);
        var right = makeEl('div','hdr-right');
        right.appendChild(makeEl('span','count-badge', g.count + ' number' + (g.count===1?'':'s')));
        var btn = makeEl('button','btn', activeDetail===g.key ? 'Collapse' : 'Expand');
        right.appendChild(btn);
        hdr.appendChild(right);
        card.appendChild(hdr);

        var body = makeEl('div','card-b');
        if (activeDetail===g.key) {
          // Preview line (cheap)
          var preview = makeEl('div','muted');
          if (g.type === 'User') {
            fetchUserPreview(g.id).then(function(p){
              preview.innerHTML = '<b>User preview:</b> Top rule <i>'+p.topRule+'</i> → '+p.where.type+' <b>'+p.where.name+'</b>';
            });
          } else if (g.type === 'Queue') {
            fetchQueuePreview(g.id).then(function(p){
              preview.innerHTML = '<b>Queue:</b> '+p.strategy+', timeout '+p.timeoutSec+'s; on timeout → '+p.next.onTimeout.type+' <b>'+p.next.onTimeout.name+'</b>';
            });
          } else if (g.type === 'AA') {
            fetchAAPreview(g.id).then(function(p){
              preview.innerHTML = '<b>AA keys:</b> '+p.keys.join(' · ');
            });
          } else if (g.type === 'External' || g.type === 'VM') {
            preview.innerHTML = '<b>Direct:</b> '+g.type;
          }
          body.appendChild(preview);

          // Actions
          var acts = makeEl('div','card-actions');
          var exportBtn = makeEl('button','btn','Export CSV');
          exportBtn.addEventListener('click', function(){
            var csv = 'Number,Label\\n';
            for (var i=0;i<g.numbers.length;i++){
              var n = g.numbers[i];
              var lbl = (n.label||'').replace(/"/g,'""');
              csv += '"'+n.number+'","'+lbl+'"\\n';
            }
            var blob = new Blob([csv], {type:'text/csv'});
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url; a.download = (g.type+' '+g.name+' numbers.csv').replace(/\\s+/g,'_');
            a.click();
            setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
          });
          acts.appendChild(exportBtn);
          body.appendChild(acts);

          // Virtualized number list
          var rows = makeEl('div','rows');
          body.appendChild(rows);
          mountVirtualList(rows, g.numbers, 40);
        } else {
          body.appendChild(makeEl('div','muted','Click expand to view numbers and previews.'));
        }
        card.appendChild(body);

        // Toggle
        btn.addEventListener('click', function(){
          activeDetail = (activeDetail===g.key) ? null : g.key;
          renderGroups(); // re-render the list
          // Update right pane detail
          var detail = document.getElementById('ir-detail');
          if (activeDetail===g.key) {
            detail.innerHTML = '';
            var info = makeEl('div','card');
            info.appendChild(makeEl('div','card-h', '<div class="card-title">'+g.name+'</div><span class="dest-badge">'+g.type+'</span>'));
            var ib = makeEl('div','card-b');
            ib.appendChild(makeEl('div',null,'This destination has <b>'+g.count+'</b> numbers.'));
            ib.appendChild(makeEl('div','muted','Use Export CSV for a full list. The “When” selector will affect trace behavior when enabled.'));
            info.appendChild(ib);
            detail.appendChild(info);
          } else {
            // if nothing expanded, reset right pane
            if (!activeDetail) document.getElementById('ir-detail').innerHTML = '<div class="empty">Expand a destination on the left to view numbers and previews.</div>';
          }
        });

        return card;
      }

      function renderGroups(){
        var host = document.getElementById('ir-groups');
        host.innerHTML = "";
        for (var i=0;i<viewGroups.length;i++){
          host.appendChild(renderGroupCard(viewGroups[i]));
        }
        document.getElementById('ir-count').textContent =
          viewGroups.length + ' destination group' + (viewGroups.length===1?'':'s');
      }

      function applyFilters(){
        var term = (document.getElementById('ir-q').value || "").toLowerCase().trim();
        var activeChip = root.querySelector('.chip.active');
        var type = activeChip ? activeChip.getAttribute('data-ft') : 'all';

        viewGroups = [];
        for (var i=0;i<groups.length;i++){
          var g = groups[i];
          if (type!=='all' && g.type!==type) continue;

          // match dest name
          var match = !term || (g.name && g.name.toLowerCase().indexOf(term)>=0);

          // if term looks like digits, also match numbers
          if (!match && /[0-9]/.test(term)) {
            for (var j=0;j<g.numbers.length;j++){
              if (g.numbers[j].number.toLowerCase().indexOf(term)>=0) { match = true; break; }
            }
          }
          if (match) viewGroups.push(g);
        }
        renderGroups();
      }

      // Wire filters
      var chips = root.querySelectorAll('.chip');
      for (var i=0;i<chips.length;i++){
        chips[i].addEventListener('click', function(){
          for (var j=0;j<chips.length;j++) chips[j].classList.remove('active');
          this.classList.add('active');
          activeDetail = null;
          applyFilters();
        });
      }
      var q = document.getElementById('ir-q');
      q.addEventListener('input', function(){ activeDetail = null; applyFilters(); });

      var whenSel = document.getElementById('ir-when');
      var dt = document.getElementById('ir-dt');
      whenSel.addEventListener('change', function(){
        dt.style.display = this.value==='custom' ? '' : 'none';
        // (Trace behavior will use this later)
      });

      // Bootstrap: load inventory → group
      var detailEl = document.getElementById('ir-detail');
      detailEl.innerHTML = '<div class="empty">Loading inventory…</div>';
      loadInventory().then(function(rows){
        allNumbers = rows || [];
        groups = groupByDestination(allNumbers);
        applyFilters();
        detailEl.innerHTML = '<div class="empty">Expand a destination on the left to view numbers and previews.</div>';
      });
    } catch (e) {
      try { root.innerHTML = '<div style="color:#a00">Error mounting Smart Routing+: '+(e && e.message ? e.message : e)+'</div>'; } catch(_) {}
      console.error(e);
    }
  };
})();

