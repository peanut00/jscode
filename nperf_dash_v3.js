(function(){
if(document.getElementById('nperf-v4')){document.getElementById('nperf-v4').remove();return;}
if(typeof Highcharts==='undefined'){const s=document.createElement('script');s.src='https://code.highcharts.com/10.3.3/highcharts.js';s.onload=init;document.head.appendChild(s);}else{init();}

function init(){
const overlay=document.createElement('div');
overlay.id='nperf-v4';
overlay.style.cssText='position:fixed;inset:0;z-index:999999;background:#35363a;overflow:hidden;font-family:Open Sans,Arial;display:flex;';

const closeBtn=document.createElement('button');
closeBtn.innerHTML='✕';
closeBtn.style.cssText='position:fixed;top:12px;right:12px;z-index:1000001;background:#ff4444;color:#fff;border:none;border-radius:4px;padding:8px 14px;font-size:16px;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.3);line-height:1;';
closeBtn.onclick=()=>overlay.remove();

overlay.innerHTML=`
<!-- Sidebar -->
<div id="sidebar" style="width:280px;background:#fff;border-right:1px solid #ddd;display:flex;flex-direction:column;overflow:hidden;">
<div style="background:#242527;padding:12px 16px;border-bottom:1px solid #414247;">
<h3 style="color:#fff;margin:0;font-size:16px;font-weight:500;">⚙️ Filtres de profil</h3>
</div>
<div style="flex:1;overflow-y:auto;padding:16px;">

<!-- Pays -->
<div style="margin-bottom:20px;">
<div style="font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">🌍 Pays</div>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-country" value="FR" checked> France</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-country" value="BE"> Belgique</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-country" value="CH"> Suisse</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-country" value="DE"> Allemagne</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-country" value="ES"> Espagne</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-country" value="IT"> Italie</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-country" value="UK"> Royaume-Uni</label>
</div>

<!-- ISPs -->
<div style="margin-bottom:20px;">
<div style="font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">📡 ISPs (France)</div>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-isp" value="Free Mobile" checked> Free Mobile</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-isp" value="SFR Mobile" checked> SFR Mobile</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-isp" value="Bouygues Mobile" checked> Bouygues Mobile</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-isp" value="Orange Mobile" checked> Orange Mobile</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-isp" value="Orange Fixe"> Orange (Fixe)</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-isp" value="Free Fixe"> Free (Fixe)</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-isp" value="SFR Fixe"> SFR (Fixe)</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-isp" value="Bouygues Fixe"> Bouygues (Fixe)</label>
</div>

<!-- Plateformes -->
<div style="margin-bottom:20px;">
<div style="font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">📱 Plateformes</div>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-platform" value="ios" checked> iOS</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-platform" value="android" checked> Android</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-platform" value="windows"> Windows</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-platform" value="macos"> macOS</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-platform" value="linux"> Linux</label>
</div>

<!-- Types de réseau -->
<div style="margin-bottom:20px;">
<div style="font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">🔌 Type de réseau</div>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-nettype" value="mobile" checked> Mobile</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-nettype" value="wifi"> WiFi</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-nettype" value="fixed"> Fixe (Ethernet)</label>
</div>

<!-- Générations cellulaires -->
<div style="margin-bottom:20px;">
<div style="font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">📶 Génération cellulaire</div>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-cellgen" value="2"> 2G</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-cellgen" value="3" checked> 3G</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-cellgen" value="4" checked> 4G</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-cellgen" value="5" checked> 5G</label>
</div>

<!-- Technologies -->
<div style="margin-bottom:20px;">
<div style="font-size:13px;font-weight:600;color:#333;margin-bottom:6px;">🛠️ Technologies (Fixe)</div>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-tech" value="fiber"> Fibre</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-tech" value="cable"> Câble</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-tech" value="adsl"> ADSL</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-tech" value="vdsl"> VDSL</label>
<label style="display:block;font-size:12px;margin-bottom:3px;cursor:pointer;"><input type="checkbox" class="filter-tech" value="satellite"> Satellite</label>
</div>

<!-- Résumé des filtres -->
<div style="background:#f0f0f0;border:1px solid #ddd;border-radius:4px;padding:10px;margin-top:20px;">
<div style="font-size:11px;font-weight:600;color:#666;margin-bottom:6px;">📋 Filtres actifs</div>
<div id="filterSummary" style="font-size:10px;color:#555;line-height:1.5;"></div>
</div>

</div>
</div>

<!-- Main content -->
<div style="flex:1;overflow-y:auto;background:#35363a;">
<div style="padding:20px;max-width:1600px;margin:0 auto;">

<!-- Header -->
<div style="background:#242527;border-radius:4px;padding:14px 18px;margin-bottom:20px;box-shadow:0 1px 3px rgba(0,0,0,0.25);">
<h2 style="color:#fff;margin:0;font-size:20px;font-weight:400;display:flex;align-items:center;gap:10px;"><i style="color:#94c11c;font-size:22px;">📊</i> nPerf Dashboard v4.0</h2>
</div>

<!-- Controls -->
<div style="background:#fff;border:1px solid #ddd;border-radius:4px;margin-bottom:20px;">
<div style="background:#eee;padding:8px 12px;border-radius:4px 4px 0 0;border-bottom:1px solid #ddd;">
<div style="font-size:14px;color:#333;font-weight:500;">⚙️ Paramètres</div>
</div>
<div style="padding:16px;">
<div style="display:grid;grid-template-columns:1fr 1fr auto;gap:16px;align-items:end;">
<div><label style="font-size:12px;font-weight:600;color:#666;display:block;margin-bottom:4px;">Date début</label><input type="date" id="dtStart" value="2026-01-01" max="2026-02-09" style="width:100%;padding:7px 10px;border:1px solid #ccc;border-radius:4px;font-size:14px;"/></div>
<div><label style="font-size:12px;font-weight:600;color:#666;display:block;margin-bottom:4px;">Date fin</label><input type="date" id="dtEnd" value="2026-01-31" max="2026-02-09" style="width:100%;padding:7px 10px;border:1px solid #ccc;border-radius:4px;font-size:14px;"/></div>
<div><button id="btnLoad" style="background:#94c11c;color:#fff;border:none;border-radius:4px;padding:8px 24px;font-size:14px;font-weight:600;cursor:pointer;">🔄 Charger</button></div>
</div>
<div id="status" style="margin-top:12px;font-size:12px;color:#999;"></div>
</div>
</div>

<!-- Charts -->
<div id="charts"></div>

</div>
</div>
`;

document.body.appendChild(overlay);
document.body.appendChild(closeBtn);

const CHARTS=[
{id:'dl',title:'Download',icon:'📥',unit:'Mb/s',key:'DownloadAvgAvg',fmt:v=>(v/1000).toFixed(2)},
{id:'ul',title:'Upload',icon:'📤',unit:'Mb/s',key:'UploadAvgAvg',fmt:v=>(v/1000).toFixed(2)},
{id:'lat',title:'Latency',icon:'⏱️',unit:'ms',key:'LatencyMinAvg',fmt:v=>v.toFixed(2)},
{id:'bro',title:'Browse',icon:'🌐',unit:'%',key:'BrowseAvg',fmt:v=>v.toFixed(2)},
{id:'str',title:'Stream',icon:'▶️',unit:'%',key:'StreamAvg',fmt:v=>v.toFixed(2)},
{id:'sco',title:'Score',icon:'🏆',unit:'nPoints',key:'ScoreAvg',fmt:v=>Math.round(v).toString()}
];

function colorLum(hex,lum){hex=hex.replace('#','');const n=parseInt(hex,16);let r=(n>>16)&255,g=(n>>8)&255,b=n&255;r=Math.round(Math.min(255,Math.max(0,r+(lum<0?r*lum:(255-r)*lum))));g=Math.round(Math.min(255,Math.max(0,g+(lum<0?g*lum:(255-g)*lum))));b=Math.round(Math.min(255,Math.max(0,b+(lum<0?b*lum:(255-b)*lum))));return `rgb(${r},${g},${b})`}

function aggregate(data,gran){if(gran==='day')return data;const g={};data.forEach(p=>{const d=new Date(p[0]);let k;if(gran==='week'){const w=new Date(d);w.setDate(d.getDate()-d.getDay());k=w.toISOString().split('T')[0]}else{k=d.toISOString().slice(0,7)}if(!g[k])g[k]={s:0,c:0,d:k};g[k].s+=p[1];g[k].c++});return Object.values(g).map(x=>[new Date(x.d+'T12:00:00Z').getTime(),x.s/x.c]).sort((a,b)=>a[0]-b[0])}

function getChecked(cls){return Array.from(document.querySelectorAll('.'+cls+':checked')).map(e=>e.value)}

function updateFilterSummary(){
const summ=document.getElementById('filterSummary');
const countries=getChecked('filter-country');
const isps=getChecked('filter-isp');
const platforms=getChecked('filter-platform');
const nettypes=getChecked('filter-nettype');
const cellgens=getChecked('filter-cellgen');
const techs=getChecked('filter-tech');
summ.innerHTML=`
<strong>Pays:</strong> ${countries.join(', ')||'<em>aucun</em>'}<br>
<strong>ISPs:</strong> ${isps.join(', ')||'<em>aucun</em>'}<br>
<strong>Plateformes:</strong> ${platforms.join(', ')||'<em>aucun</em>'}<br>
<strong>Réseau:</strong> ${nettypes.join(', ')||'<em>aucun</em>'}<br>
<strong>Cellulaire:</strong> ${cellgens.map(g=>g+'G').join(', ')||'<em>aucun</em>'}<br>
<strong>Technologies:</strong> ${techs.join(', ')||'<em>aucun</em>'}
`}

document.querySelectorAll('[class^="filter-"]').forEach(cb=>cb.addEventListener('change',updateFilterSummary));
updateFilterSummary();

let globalData=null;

document.getElementById('btnLoad').onclick=async()=>{
const btn=document.getElementById('btnLoad');
const st=document.getElementById('status');
const ch=document.getElementById('charts');
btn.disabled=true;btn.textContent='⏳ Chargement...';ch.innerHTML='';
const start=document.getElementById('dtStart').value;
const end=document.getElementById('dtEnd').value;

if(end>'2026-02-09'){alert('Date fin > 09/02/2026');st.innerHTML='<span style="color:#e74c3c;">❌ Date future</span>';btn.disabled=false;btn.textContent='🔄 Charger';return}
if(start>end){alert('Date début > date fin');st.innerHTML='<span style="color:#e74c3c;">❌ Dates invalides</span>';btn.disabled=false;btn.textContent='🔄 Charger';return}

const countries=getChecked('filter-country');
const isps=getChecked('filter-isp');
const platforms=getChecked('filter-platform');
const nettypes=getChecked('filter-nettype');
const cellgens=getChecked('filter-cellgen');
const techs=getChecked('filter-tech');

if(!countries.length||!isps.length){alert('Sélectionnez au moins 1 pays et 1 ISP');st.innerHTML='<span style="color:#e74c3c;">❌ Filtres vides</span>';btn.disabled=false;btn.textContent='🔄 Charger';return}

try{
st.textContent='📡 API (filtres: '+countries.length+' pays, '+isps.length+' ISPs)...';
const payload={
profileId:11129,
dateStart:start+' 00:00:00',
dateEnd:end+' 23:59:59',
product:'crowd',
forceReload:false,
filters:{
countries:countries,
isps:isps,
platforms:platforms.length?platforms:null,
networkTypes:nettypes.length?nettypes:null,
cellGenerations:cellgens.length?cellgens:null,
technologies:techs.length?techs:null
}
};
console.log('[API Payload]',payload);
const r1=await fetch('/en/dashboard/jsonStatsExec',{method:'POST',headers:{'Content-Type':'application/json','X-Requested-With':'XMLHttpRequest'},body:JSON.stringify(payload)});
const e=await r1.json();
console.log('[API Response]',e);
if(e.status!=='OK')throw new Error('API: '+JSON.stringify(e));
st.textContent=`⏳ Tâche #${e.taskId}...`;
let t;
for(let i=0;i<60;i++){
await new Promise(r=>setTimeout(r,2000));
const r2=await fetch('/en/task/jsonGetTaskProgress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({task:{id:e.taskId}})});
t=await r2.json();
st.textContent=`⏳ ${t.executionProgress||0}%`;
if(t.executionProgress>=100)break}
if(!t||t.executionProgress<100)throw new Error('Timeout');
st.textContent='📊 Rendu...';
globalData=JSON.parse(t.outputData);
renderAll(start,end);
st.innerHTML='<span style="color:#27ae60;">✓ Chargé ('+globalData.data.isps.length+' ISPs)</span>'
}catch(err){console.error(err);st.innerHTML='<span style="color:#e74c3c;">❌ '+err.message+'</span>';alert('Erreur:\\n'+err.message)}
finally{btn.disabled=false;btn.textContent='🔄 Charger'}
};

function renderAll(start,end){
const isps=globalData.data.isps;
const ch=document.getElementById('charts');

ch.innerHTML=`
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;">
<div style="grid-column:1/-1;background:#0c66aa;color:#fff;padding:8px 14px;border-radius:4px;font-size:15px;font-weight:600;">📊 Moyennes par ISP</div>
${CHARTS.map(c=>`<div style="background:#fff;border:1px solid #ddd;border-radius:4px;"><div style="background:#eee;padding:8px 12px;border-bottom:1px solid #ddd;font-size:13px;font-weight:500;color:#333;">${c.icon} ${c.title}</div><div id="bar-${c.id}" style="height:240px;"></div></div>`).join('')}
</div>

<div style="margin-top:30px;">
<div style="background:#fff;border:1px solid #ddd;border-radius:4px;margin-bottom:20px;">
<div style="background:#94c11c;color:#fff;padding:10px 14px;border-radius:4px 4px 0 0;font-size:15px;font-weight:600;">📈 Évolution journalière</div>
<div style="padding:12px;background:#f8f8f8;border-bottom:1px solid #ddd;"><div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center;">
<div><strong style="font-size:12px;color:#555;">ISPs:</strong> ${isps.map((isp,i)=>`<label style="margin-left:8px;font-size:12px;cursor:pointer;"><input type="checkbox" class="day-isp" data-idx="${i}" checked> <span style="color:#${isp.Color};font-weight:600;">${isp.Name}</span></label>`).join('')}</div>
<div><label style="font-size:12px;"><input type="checkbox" id="day-auto" checked> Auto échelle</label></div>
<div style="display:flex;gap:8px;align-items:center;"><label style="font-size:11px;">Min:</label><input type="number" id="day-min" placeholder="auto" style="width:70px;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:12px;" disabled></div>
<div style="display:flex;gap:8px;align-items:center;"><label style="font-size:11px;">Max:</label><input type="number" id="day-max" placeholder="auto" style="width:70px;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:12px;" disabled></div>
<div><label style="font-size:12px;"><input type="checkbox" id="day-smooth"> Smooth</label></div>
<div><button onclick="window.renderLineCharts('day')" style="background:#0c66aa;color:#fff;border:none;border-radius:3px;padding:5px 12px;font-size:12px;cursor:pointer;">Appliquer</button></div>
</div></div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:18px;">
${CHARTS.map(c=>`<div style="border:1px solid #ddd;border-radius:4px;"><div style="background:#eee;padding:6px 10px;border-bottom:1px solid #ddd;font-size:12px;font-weight:500;color:#333;">${c.icon} ${c.title}</div><div id="day-${c.id}" style="height:280px;"></div></div>`).join('')}
</div></div>

<div style="background:#fff;border:1px solid #ddd;border-radius:4px;margin-bottom:20px;">
<div style="background:#94c11c;color:#fff;padding:10px 14px;border-radius:4px 4px 0 0;font-size:15px;font-weight:600;">📈 Évolution hebdomadaire</div>
<div style="padding:12px;background:#f8f8f8;border-bottom:1px solid #ddd;"><div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center;">
<div><strong style="font-size:12px;color:#555;">ISPs:</strong> ${isps.map((isp,i)=>`<label style="margin-left:8px;font-size:12px;cursor:pointer;"><input type="checkbox" class="week-isp" data-idx="${i}" checked> <span style="color:#${isp.Color};font-weight:600;">${isp.Name}</span></label>`).join('')}</div>
<div><label style="font-size:12px;"><input type="checkbox" id="week-auto" checked> Auto échelle</label></div>
<div style="display:flex;gap:8px;align-items:center;"><label style="font-size:11px;">Min:</label><input type="number" id="week-min" placeholder="auto" style="width:70px;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:12px;" disabled></div>
<div style="display:flex;gap:8px;align-items:center;"><label style="font-size:11px;">Max:</label><input type="number" id="week-max" placeholder="auto" style="width:70px;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:12px;" disabled></div>
<div><label style="font-size:12px;"><input type="checkbox" id="week-smooth"> Smooth</label></div>
<div><button onclick="window.renderLineCharts('week')" style="background:#0c66aa;color:#fff;border:none;border-radius:3px;padding:5px 12px;font-size:12px;cursor:pointer;">Appliquer</button></div>
</div></div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:18px;">
${CHARTS.map(c=>`<div style="border:1px solid #ddd;border-radius:4px;"><div style="background:#eee;padding:6px 10px;border-bottom:1px solid #ddd;font-size:12px;font-weight:500;color:#333;">${c.icon} ${c.title}</div><div id="week-${c.id}" style="height:280px;"></div></div>`).join('')}
</div></div>

<div style="background:#fff;border:1px solid #ddd;border-radius:4px;">
<div style="background:#94c11c;color:#fff;padding:10px 14px;border-radius:4px 4px 0 0;font-size:15px;font-weight:600;">📈 Évolution mensuelle</div>
<div style="padding:12px;background:#f8f8f8;border-bottom:1px solid #ddd;"><div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center;">
<div><strong style="font-size:12px;color:#555;">ISPs:</strong> ${isps.map((isp,i)=>`<label style="margin-left:8px;font-size:12px;cursor:pointer;"><input type="checkbox" class="month-isp" data-idx="${i}" checked> <span style="color:#${isp.Color};font-weight:600;">${isp.Name}</span></label>`).join('')}</div>
<div><label style="font-size:12px;"><input type="checkbox" id="month-auto" checked> Auto échelle</label></div>
<div style="display:flex;gap:8px;align-items:center;"><label style="font-size:11px;">Min:</label><input type="number" id="month-min" placeholder="auto" style="width:70px;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:12px;" disabled></div>
<div style="display:flex;gap:8px;align-items:center;"><label style="font-size:11px;">Max:</label><input type="number" id="month-max" placeholder="auto" style="width:70px;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:12px;" disabled></div>
<div><label style="font-size:12px;"><input type="checkbox" id="month-smooth"> Smooth</label></div>
<div><button onclick="window.renderLineCharts('month')" style="background:#0c66aa;color:#fff;border:none;border-radius:3px;padding:5px 12px;font-size:12px;cursor:pointer;">Appliquer</button></div>
</div></div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:18px;">
${CHARTS.map(c=>`<div style="border:1px solid #ddd;border-radius:4px;"><div style="background:#eee;padding:6px 10px;border-bottom:1px solid #ddd;font-size:12px;font-weight:500;color:#333;">${c.icon} ${c.title}</div><div id="month-${c.id}" style="height:280px;"></div></div>`).join('')}
</div></div>
</div>
`;

['day','week','month'].forEach(g=>{document.getElementById(g+'-auto').onchange=function(){const dis=!this.checked;document.getElementById(g+'-min').disabled=dis;document.getElementById(g+'-max').disabled=dis}});

CHARTS.forEach(def=>{
const data=isps.map(isp=>({name:isp.Name,y:parseFloat(def.fmt(isp[def.key]||0)),color:{linearGradient:{x1:0,x2:1,y1:0,y2:0},stops:[[0,colorLum('#'+isp.Color,-0.3)],[1,'#'+isp.Color]]}}));
Highcharts.chart('bar-'+def.id,{chart:{type:'bar',height:240,backgroundColor:'#fff',style:{fontFamily:'Roboto,Arial'}},credits:{href:'http://www.nperf.com',text:'nPerf.com',style:{fontSize:'9px'}},title:{text:def.title+' moyen',style:{fontSize:'14px',fontWeight:'600',color:'#333'}},subtitle:{text:start+' → '+end,style:{fontSize:'11px',color:'#999'}},xAxis:{type:'category',labels:{style:{fontSize:'12px',color:'#555'}}},yAxis:{title:{text:def.unit,style:{fontSize:'11px',color:'#666'}},labels:{style:{fontSize:'11px',color:'#666'}}},tooltip:{valueSuffix:' '+def.unit,valueDecimals:def.unit==='nPoints'?0:2},legend:{enabled:false},plotOptions:{bar:{dataLabels:{enabled:true,format:'{point.y} '+def.unit,style:{fontSize:'11px',fontWeight:'500',textOutline:'none',color:'#000'},backgroundColor:'rgba(255,255,255,0.8)',borderRadius:3,padding:3}}},series:[{name:def.title,data}]})});

renderLineCharts('day');
renderLineCharts('week');
renderLineCharts('month')}

window.renderLineCharts=function(gran){
if(!globalData)return;
const isps=globalData.data.isps;
const auto=document.getElementById(gran+'-auto').checked;
const yMin=auto?null:parseFloat(document.getElementById(gran+'-min').value)||null;
const yMax=auto?null:parseFloat(document.getElementById(gran+'-max').value)||null;
const smooth=document.getElementById(gran+'-smooth').checked;
const activeISPs=[];
document.querySelectorAll('.'+gran+'-isp:checked').forEach(cb=>activeISPs.push(parseInt(cb.dataset.idx)));

CHARTS.forEach(def=>{
const series=isps.map((isp,idx)=>{
if(!activeISPs.includes(idx))return null;
const raw=(isp.Data||[]).map(d=>[new Date(d.DateTime+'T12:00:00Z').getTime(),parseFloat(def.fmt(d[def.key]||0))]).sort((a,b)=>a[0]-b[0]);
const agg=aggregate(raw,gran);
return{name:isp.Name,color:'#'+isp.Color,data:agg,marker:{radius:4,symbol:'circle'},lineWidth:2}}).filter(s=>s);

const yAxis={title:{text:def.unit,style:{fontSize:'11px',color:'#666'}},labels:{style:{fontSize:'11px',color:'#666'}}};
if(!auto){if(yMin!==null)yAxis.min=yMin;if(yMax!==null)yAxis.max=yMax}

Highcharts.chart(gran+'-'+def.id,{chart:{type:smooth?'spline':'line',height:280,backgroundColor:'#fff',zoomType:'x',style:{fontFamily:'Roboto,Arial'}},credits:{href:'http://www.nperf.com',text:'nPerf.com',style:{fontSize:'9px'}},title:{text:def.title+' ('+gran+')',style:{fontSize:'13px',fontWeight:'600',color:'#333'}},xAxis:{type:'datetime',labels:{format:gran==='month'?'{value:%m/%Y}':'{value:%d/%m}',style:{fontSize:'11px',color:'#555'}},crosshair:true},yAxis,tooltip:{shared:true,crosshairs:true,valueSuffix:' '+def.unit,valueDecimals:def.unit==='nPoints'?0:2,xDateFormat:'%d/%m/%Y'},legend:{enabled:true,align:'center',verticalAlign:'bottom',itemStyle:{fontSize:'10px',fontWeight:'500',color:'#555'}},plotOptions:{line:{lineWidth:2,states:{hover:{lineWidth:3}},marker:{enabled:gran!=='day'}},spline:{lineWidth:2,states:{hover:{lineWidth:3}},marker:{enabled:gran!=='day'}}},series})})}

document.getElementById('btnLoad').click()
}
})();
