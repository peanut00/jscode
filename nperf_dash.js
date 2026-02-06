/* ════════════════════════════════════════════════════════════════
   NPERF DASHBOARD BOOKMARKLET
   
   INSTALLATION:
   1. Créez un nouveau bookmark dans votre navigateur
   2. Collez ce code dans le champ URL/Location
   3. Allez sur https://cockpit.nperf.com/en/crowd/dashboard/compile?profileId=11129
   4. Cliquez sur le bookmark
   5. Le dashboard personnalisé s'affiche en overlay
   
   ════════════════════════════════════════════════════════════════ */

function(){
  /* Remove existing overlay if present */
  const existing = document.getElementById('nperf-custom-dashboard-overlay');
  if (existing) {
    existing.remove();
    return;
  }

  /* Create overlay container */
  const overlay = document.createElement('div');
  overlay.id = 'nperf-custom-dashboard-overlay';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 999999;
    background: #35363a;
    overflow: auto;
    font-family: 'Open Sans', sans-serif;
  `;

  /* Create close button */
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕ Close Dashboard';
  closeBtn.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000000;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  `;
  closeBtn.onclick = () => overlay.remove();

  /* Inject the custom dashboard content */
  overlay.innerHTML = `
    <div style="padding: 20px; max-width: 1400px; margin: 0 auto;">
      <h2 style="color: #fff; margin: 0 0 20px; font-size: 22px;">
        <i style="color: #94c11c;">📊</i> nPerf Custom Dashboard
      </h2>
      
      <div style="background: #fff; border-radius: 4px; padding: 20px; margin-bottom: 20px;">
        <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 16px;">
          <div style="flex: 1; min-width: 250px;">
            <label style="font-size: 12px; font-weight: 600; color: #666; display: block; margin-bottom: 4px;">Date de début</label>
            <input type="date" id="customDateStart" value="2026-01-01" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;"/>
          </div>
          <div style="flex: 1; min-width: 250px;">
            <label style="font-size: 12px; font-weight: 600; color: #666; display: block; margin-bottom: 4px;">Date de fin</label>
            <input type="date" id="customDateEnd" value="2026-01-31" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;"/>
          </div>
          <div style="display: flex; align-items: flex-end;">
            <button id="customLoadBtn" style="background: #94c11c; color: #fff; border: none; border-radius: 4px; padding: 8px 24px; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap;">
              🔄 Charger les données
            </button>
          </div>
        </div>
        
        <div id="customStatus" style="font-size: 12px; color: #666; margin-bottom: 12px;">
          Prêt à charger les données
        </div>
        
        <div id="customChartGrid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          <!-- Charts injected here -->
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(closeBtn);

  /* Load Highcharts if not present */
  if (typeof Highcharts === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://code.highcharts.com/10.3.3/highcharts.js';
    script.onload = initDashboard;
    document.head.appendChild(script);
  } else {
    initDashboard();
  }

  function initDashboard() {
    const CHARTS = [
      { id:'dl', title:'Download',  unit:'Mb/s',    key:'DownloadAvgAvg', fmt: v=>(Math.round(v/10)/100).toFixed(2) },
      { id:'ul', title:'Upload',    unit:'Mb/s',    key:'UploadAvgAvg',   fmt: v=>(Math.round(v/10)/100).toFixed(2) },
      { id:'lat', title:'Latency',  unit:'ms',      key:'LatencyMinAvg',  fmt: v=>(Math.round(v*100)/100).toFixed(2) },
      { id:'bro', title:'Browse',   unit:'%',       key:'BrowseAvg',      fmt: v=>(Math.round(v*100)/100).toFixed(2) },
      { id:'str', title:'Stream',   unit:'%',       key:'StreamAvg',      fmt: v=>(Math.round(v*100)/100).toFixed(2) },
      { id:'sco', title:'Score',    unit:'nPoints', key:'ScoreAvg',       fmt: v=>Math.round(v).toString() }
    ];

    const grid = document.getElementById('customChartGrid');
    
    /* Bar charts section */
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; font-size: 15px; font-weight: 600; color: #333; margin: 10px 0 8px; border-bottom: 2px solid #0c66aa; padding-bottom: 6px;">
        📊 Moyennes par ISP (Bar Charts)
      </div>
    ` + CHARTS.map(c => `
      <div style="border: 1px solid #ddd; border-radius: 4px; background: #fff;">
        <div style="background: #eee; padding: 8px 12px; font-size: 13px; font-weight: 600; color: #333; border-bottom: 1px solid #ddd;">
          ${c.title} (${c.unit})
        </div>
        <div id="hc-bar-${c.id}" style="height: 220px;"></div>
      </div>
    `).join('') + `
      <div style="grid-column: 1 / -1; font-size: 15px; font-weight: 600; color: #333; margin: 20px 0 8px; border-bottom: 2px solid #94c11c; padding-bottom: 6px;">
        📈 Évolution journalière (Line Charts)
      </div>
    ` + CHARTS.map(c => `
      <div style="border: 1px solid #ddd; border-radius: 4px; background: #fff;">
        <div style="background: #eee; padding: 8px 12px; font-size: 13px; font-weight: 600; color: #333; border-bottom: 1px solid #ddd;">
          ${c.title} par jour (${c.unit})
        </div>
        <div id="hc-line-${c.id}" style="height: 280px;"></div>
      </div>
    `).join('');

    document.getElementById('customLoadBtn').onclick = async () => {
      const btn = document.getElementById('customLoadBtn');
      const status = document.getElementById('customStatus');
      btn.disabled = true;
      btn.textContent = '⏳ Chargement...';
      status.textContent = 'Demande en cours...';

      try {
        const start = document.getElementById('customDateStart').value + ' 00:00:00';
        const end = document.getElementById('customDateEnd').value + ' 23:59:59';
        
        /* Step 1: Launch task */
        status.textContent = 'Lancement de la tâche...';
        const execRes = await fetch('/en/dashboard/jsonStatsExec', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
          body: JSON.stringify({ profileId: 11129, dateStart: start, dateEnd: end, product: 'crowd', forceReload: false })
        });
        const execJson = await execRes.json();
        if (execJson.status !== 'OK') throw new Error('Exec failed');

        /* Step 2: Poll task */
        status.textContent = `Tâche #${execJson.taskId} en cours...`;
        let taskJson;
        for (let i = 0; i < 60; i++) {
          await new Promise(r => setTimeout(r, 2000));
          const pollRes = await fetch('/en/task/jsonGetTaskProgress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: { id: execJson.taskId } })
          });
          taskJson = await pollRes.json();
          status.textContent = `Calcul en cours... ${taskJson.executionProgress || 0}%`;
          if (taskJson.executionProgress >= 100) break;
        }

        /* Step 3: Parse & render */
        const output = JSON.parse(taskJson.outputData);
        const isps = output.data.isps;
        
        /* Render BAR charts (aggregated averages per ISP) */
        CHARTS.forEach(def => {
          const container = document.getElementById('hc-bar-' + def.id);
          const data = isps.map(isp => ({
            name: isp.Name,
            y: parseFloat(def.fmt(isp[def.key] || 0)),
            color: '#' + isp.Color
          }));

          Highcharts.chart(container, {
            chart: { type: 'bar', height: 220, backgroundColor: '#fff' },
            credits: { enabled: false },
            title: { text: def.title + ' moyen', style: { fontSize: '13px', fontWeight: '600' } },
            xAxis: { type: 'category', labels: { style: { fontSize: '12px' } } },
            yAxis: { title: { text: def.unit, style: { fontSize: '11px' } } },
            tooltip: { valueSuffix: ' ' + def.unit, valueDecimals: def.unit === 'nPoints' ? 0 : 2 },
            legend: { enabled: false },
            plotOptions: {
              bar: {
                dataLabels: {
                  enabled: true,
                  format: '{point.y} ' + def.unit,
                  style: { fontSize: '11px', fontWeight: '500' }
                }
              }
            },
            series: [{ data }]
          });
        });

        /* Render LINE charts (daily evolution per ISP) */
        CHARTS.forEach(def => {
          const container = document.getElementById('hc-line-' + def.id);
          
          /* Build series: one line per ISP */
          const series = isps.map(isp => {
            /* Extract daily data points from isp.Data array */
            const dailyData = (isp.Data || []).map(day => {
              const date = new Date(day.DateTime + 'T12:00:00Z').getTime(); // UTC noon
              const value = parseFloat(def.fmt(day[def.key] || 0));
              return [date, value];
            }).sort((a, b) => a[0] - b[0]); // sort by date

            return {
              name: isp.Name,
              color: '#' + isp.Color,
              data: dailyData,
              marker: { radius: 3 }
            };
          });

          Highcharts.chart(container, {
            chart: { type: 'line', height: 280, backgroundColor: '#fff', zoomType: 'x' },
            credits: { enabled: false },
            title: { text: def.title + ' — évolution journalière', style: { fontSize: '13px', fontWeight: '600' } },
            xAxis: {
              type: 'datetime',
              labels: {
                format: '{value:%d/%m}',
                style: { fontSize: '11px' }
              },
              crosshair: true
            },
            yAxis: {
              title: { text: def.unit, style: { fontSize: '11px' } },
              labels: { style: { fontSize: '11px' } }
            },
            tooltip: {
              shared: true,
              crosshairs: true,
              valueSuffix: ' ' + def.unit,
              valueDecimals: def.unit === 'nPoints' ? 0 : 2,
              xDateFormat: '%d/%m/%Y'
            },
            legend: {
              enabled: true,
              align: 'center',
              verticalAlign: 'bottom',
              itemStyle: { fontSize: '11px', fontWeight: '500' }
            },
            plotOptions: {
              line: {
                lineWidth: 2,
                states: { hover: { lineWidth: 3 } }
              }
            },
            series
          });
        });

        status.textContent = `✓ Données chargées — ${isps.length} ISPs, ${isps.reduce((s,i)=>s+i.Samples,0).toLocaleString()} échantillons`;
        btn.textContent = '🔄 Recharger';
      } catch (err) {
        status.textContent = '❌ Erreur: ' + err.message;
        btn.textContent = '🔄 Réessayer';
      } finally {
        btn.disabled = false;
      }
    };
  }
}();
