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

/* ===== Smart Routing+ — Group by Destination (Portal-safe) ===== */
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
        // skew: 100 numbers to one marketing user
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

      function mountVirtual(container, items, rowH){
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
        var card=make('div','card'), hdr=make('div','card-h'), title=make('div','card-title', g.name),
            typeBadge=make('span','dest-badge', g.type), right=document.createElement('div');
        right.appendChild(make('span','count-badge', g.count+' number'+(g.count===1?'':'s')));
        var btn=make('button','btn', activeDetail===g.key ? 'Collapse'
