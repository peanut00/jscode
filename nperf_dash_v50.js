(function(){
if(document.getElementById('nperf-v5')){document.getElementById('nperf-v5').remove();return;}
if(typeof Highcharts==='undefined'){const s=document.createElement('script');s.src='https://code.highcharts.com/10.3.3/highcharts.js';s.onload=init;document.head.appendChild(s);}else{init();}

function init(){
const overlay=document.createElement('div');
overlay.id='nperf-v5';
overlay.style.cssText='position:fixed;inset:0;z-index:999999;background:#35363a;overflow:hidden;font-family:Open Sans,Arial;display:flex;';

const closeBtn=document.createElement('button');
closeBtn.innerHTML='✕';
closeBtn.style.cssText='position:fixed;top:12px;right:12px;z-index:1000001;background:#ff4444;color:#fff;border:none;border-radius:4px;padding:8px 14px;font-size:16px;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.3);line-height:1;';
closeBtn.onclick=()=>overlay.remove();

overlay.innerHTML=`
<!-- Sidebar -->
<div style="width:320px;background:#fff;border-right:1px solid #ddd;display:flex;flex-direction:column;overflow:hidden;">
<div style="background:#242527;padding:12px 16px;border-bottom:1px solid #414247;">
<h3 style="color:#fff;margin:0;font-size:16px;font-weight:500;">⚙️ Profil</h3>
</div>
<div style="flex:1;overflow-y:auto;padding:16px;font-size:13px;">

<!-- Profile name -->
<div style="margin-bottom:16px;">
<label style="display:block;font-weight:600;color:#333;margin-bottom:4px;">Profile name</label>
<input type="text" id="profileName" value="Mobile Last 30days/ Day" style="width:100%;padding:6px 10px;border:1px solid #ccc;border-radius:4px;font-size:13px;"/>
</div>

<!-- Dataset (Profile selector) -->
<div style="margin-bottom:16px;">
<label style="display:block;font-weight:600;color:#333;margin-bottom:4px;">Dataset (Profile)</label>
<select id="profileId" style="width:100%;padding:6px 10px;border:1px solid #ccc;border-radius:4px;font-size:12px;background:#fff;">
<option value="11129" selected>Mobile Last 30days/ Day (11129)</option>
<option value="11130">Mobile Current Month (11130)</option>
<option value="11131">Fixed Last 30days (11131)</option>
<option value="0">Custom (create new)</option>
</select>
</div>

<!-- Default period -->
<div style="margin-bottom:16px;">
<label style="display:block;font-weight:600;color:#333;margin-bottom:4px;">Default period</label>
<select id="defaultPeriod" style="width:100%;padding:6px 10px;border:1px solid #ccc;border-radius:4px;font-size:13px;background:#fff;">
<option value="7">Last 7 days</option>
<option value="30" selected>Last 30 days</option>
<option value="90">Last 90 days</option>
<option value="365">Last 365 days</option>
</select>
</div>

<!-- Granularity -->
<div style="margin-bottom:16px;">
<label style="display:block;font-weight:600;color:#333;margin-bottom:4px;">Granularity</label>
<select id="granularity" style="width:100%;padding:6px 10px;border:1px solid #ccc;border-radius:4px;font-size:13px;background:#fff;">
<option value="day" selected>Day</option>
<option value="week">Week</option>
<option value="month">Month</option>
</select>
</div>

<!-- ISP type -->
<div style="margin-bottom:16px;">
<label style="display:block;font-weight:600;color:#333;margin-bottom:4px;">ISP type</label>
<div style="display:flex;gap:8px;">
<button id="btnFixed" onclick="window.setIspType('fixed')" style="flex:1;padding:6px;border:1px solid #ccc;border-radius:4px;background:#f5f5f5;cursor:pointer;font-size:12px;">Fixed / Broadband</button>
<button id="btnMobile" onclick="window.setIspType('mobile')" style="flex:1;padding:6px;border:1px solid #94c11c;border-radius:4px;background:#94c11c;color:#fff;cursor:pointer;font-size:12px;font-weight:600;">Mobile / Cellular</button>
</div>
</div>

<!-- Country -->
<div style="margin-bottom:16px;">
<label style="display:block;font-weight:600;color:#333;margin-bottom:4px;">Country</label>
<div style="display:flex;flex-wrap:wrap;gap:6px;">
<span style="background:#eee;padding:4px 8px;border-radius:3px;font-size:11px;display:inline-flex;align-items:center;">France (FR) <button onclick="this.parentElement.remove()" style="margin-left:4px;border:none;background:none;cursor:pointer;color:#999;font-size:14px;">×</button></span>
</div>
<input type="text" placeholder="Add country..." style="width:100%;padding:4px 8px;border:1px solid #ccc;border-radius:3px;font-size:12px;margin-top:6px;"/>
</div>

<!-- ISP -->
<div style="margin-bottom:16px;">
<label style="display:block;font-weight:600;color:#333;margin-bottom:4px;">ISP</label>
<div id="ispTags" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px;">
<span style="background:#eee;padding:4px 8px;border-radius:3px;font-size:11px;">Free Mobile FR ×</span>
<span style="background:#eee;padding:4px 8px;border-radius:3px;font-size:11px;">SFR Mobile FR ×</span>
<span style="background:#eee;padding:4px 8px;border-radius:3px;font-size:11px;">Bouygues Mobile FR ×</span>
<span style="background:#eee;padding:4px 8px;border-radius:3px;font-size:11px;">Orange Mobile FR ×</span>
</div>
<select id="ispSelect" multiple style="width:100%;padding:6px;border:1px solid #ccc;border-radius:4px;font-size:12px;height:100px;">
<option value="Free Mobile FR" selected>Free Mobile FR</option>
<option value="SFR Mobile FR" selected>SFR Mobile FR</option>
<option value="Bouygues Mobile FR" selected>Bouygues Mobile FR</option>
<option value="Orange Mobile FR" selected>Orange Mobile FR</option>
<option value="Orange Fixe FR">Orange Fixe FR</option>
<option value="Free Fixe FR">Free Fixe FR</option>
</select>
</div>

<!-- Platform -->
<div style="margin-bottom:16px;">
<label style="display:block;font-weight:600;color:#333;margin-bottom:4px;">Platform</label>
<select id="platform" multiple style="width:100%;padding:6px;border:1px solid #ccc;border-radius:4px;font-size:12px;height:80px;">
<option value="android" selected>Android</option>
<option value="ios" selected>iOS</option>
<option value="windows">Windows</option>
<option value="macos">macOS</option>
<option value="linux">Linux</option>
</select>
</div>

<!-- Advanced filters (collapsible) -->
<div style="margin-bottom:16px;">
<div onclick="document.getElementById('advFilters').style.display=document.getElementById('advFilters').style.display==='none'?'block':'none'" style="font-weight:600;color:#333;cursor:pointer;user-select:none;padding:6px 0;border-bottom:1px solid #ddd;">▼ Advanced filters</div>
<div id="advFilters" style="margin-top:10px;">

<!-- Network type -->
<div style="margin-bottom:12px;">
<label style="display:block;font-weight:600;color:#555;margin-bottom:4px;font-size:12px;">Network type</label>
<select id="networkType" style="width:100%;padding:5px;border:1px solid #ccc;border-radius:3px;font-size:12px;background:#fff;">
<option value="mobile" selected>Mobile (cellular)</option>
<option value="wifi">WiFi</option>
<option value="fixed">Fixed (ethernet)</option>
</select>
</div>

<!-- Mobile generation -->
<div style="margin-bottom:12px;">
<label style="display:block;font-weight:600;color:#555;margin-bottom:4px;font-size:12px;">Mobile generation</label>
<div style="display:flex;gap:6px;flex-wrap:wrap;">
<label style="font-size:11px;"><input type="checkbox" id="gen2G"> 2G</label>
<label style="font-size:11px;"><input type="checkbox" id="gen3G" checked> 3G</label>
<label style="font-size:11px;"><input type="checkbox" id="gen4G" checked> 4G</label>
<label style="font-size:11px;"><input type="checkbox" id="gen5G" checked> 5G</label>
</div>
</div>

<!-- Mobile network mode -->
<div style="margin-bottom:12px;">
<label style="display:block;font-weight:600;color:#555;margin-bottom:4px;font-size:12px;">Mobile network mode</label>
<input type="text" placeholder="Search for a network mode..." style="width:100%;padding:4px 8px;border:1px solid #ccc;border-radius:3px;font-size:11px;"/>
</div>

<!-- Location type -->
<div style="margin-bottom:12px;">
<label style="display:block;font-weight:600;color:#555;margin-bottom:4px;font-size:12px;">Location type</label>
<input type="text" placeholder="Search for a location type..." style="width:100%;padding:4px 8px;border:1px solid #ccc;border-radius:3px;font-size:11px;"/>
</div>

<!-- Device -->
<div style="margin-bottom:12px;">
<label style="display:block;font-weight:600;color:#555;margin-bottom:4px;font-size:12px;">Device</label>
<input type="text" placeholder="Search for a device..." style="width:100%;padding:4px 8px;border:1px solid #ccc;border-radius:3px;font-size:11px;"/>
</div>

<!-- Device download floor -->
<div style="margin-bottom:12px;">
<label style="display:block;font-weight:600;color:#555;margin-bottom:4px;font-size:12px;">Device download floor</label>
<div style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;">
<div><label style="font-size:11px;">3G ≥</label><input type="number" placeholder="kb/s" style="width:100%;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:11px;margin-top:2px;"/></div>
<span style="font-size:10px;color:#999;">kb/s</span>
</div>
<div style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;margin-top:6px;">
<div><label style="font-size:11px;">4G ≥</label><input type="number" placeholder="kb/s" style="width:100%;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:11px;margin-top:2px;"/></div>
<span style="font-size:10px;color:#999;">kb/s</span>
</div>
<div style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;margin-top:6px;">
<div><label style="font-size:11px;">5G ≥</label><input type="number" placeholder="kb/s" style="width:100%;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:11px;margin-top:2px;"/></div>
<span style="font-size:10px;color:#999;">kb/s</span>
</div>
</div>

<!-- Geographical filter -->
<div style="margin-bottom:12px;">
<label style="display:block;font-weight:600;color:#555;margin-bottom:4px;font-size:12px;">Geographical filter</label>
<input type="text" placeholder="Search for a location..." style="width:100%;padding:4px 8px;border:1px solid #ccc;border-radius:3px;font-size:11px;"/>
</div>

<!-- OS -->
<div style="margin-bottom:12px;">
<label style="display:block;font-weight:600;color:#555;margin-bottom:4px;font-size:12px;">OS</label>
<input type="text" placeholder="Search for an OS..." style="width:100%;padding:4px 8px;border:1px solid #ccc;border-radius:3px;font-size:11px;"/>
</div>

</div>
</div>

<!-- Profile info -->
<div style="background:#f0f0f0;border:1px solid #ddd;border-radius:4px;padding:10px;margin-top:16px;">
<div style="font-size:10px;font-weight:600;color:#666;margin-bottom:4px;">📋 Profile summary</div>
<div id="profileSummary" style="font-size:10px;color:#555;line-height:1.6;"></div>
</div>

</div>
</div>

<!-- Main content -->
<div style="flex:1;overflow-y:auto;background:#35363a;">
<div style="padding:20px;max-width:1600px;margin:0 auto;">

<!-- Header -->
<div style="background:#242527;border-radius:4px;padding:14px 18px;margin-bottom:20px;box-shadow:0 1px 3px rgba(0,0,0,0.25);">
<h2 style="color:#fff;margin:0;font-size:20px;font-weight:400;">📊 nPerf Dashboard v5.0</h2>
</div>

<!-- Controls -->
<div style="background:#fff;border:1px solid #ddd;border-radius:4px;margin-bottom:20px;">
<div style="background:#eee;padding:8px 12px;border-radius:4px 4px 0 0;border-bottom:1px solid #ddd;">
<div style="font-size:14px;color:#333;font-weight:500;">⚙️ Période</div>
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

window.setIspType=function(type){
const btnF=document.getElementById('btnFixed');
const btnM=document.getElementById('btnMobile');
if(type==='fixed'){
btnF.style.background='#94c11c';btnF.style.color='#fff';btnF.style.borderColor='#94c11c';btnF.style.fontWeight='600';
btnM.style.background='#f5f5f5';btnM.style.color='#333';btnM.style.borderColor='#ccc';btnM.style.fontWeight='400';
}else{
btnM.style.background='#94c11c';btnM.style.color='#fff';btnM.style.borderColor='#94c11c';btnM.style.fontWeight='600';
btnF.style.background='#f5f5f5';btnF.style.color='#333';btnF.style.borderColor='#ccc';btnF.style.fontWeight='400';
}};

function updateSummary(){
const pid=document.getElementById('profileId').value;
const gran=document.getElementById('granularity').value;
const period=document.getElementById('defaultPeriod').value;
const isps=Array.from(document.getElementById('ispSelect').selectedOptions).map(o=>o.value);
const platforms=Array.from(document.getElementById('platform').selectedOptions).map(o=>o.value);
const gens=[];
if(document.getElementById('gen2G').checked)gens.push('2G');
if(document.getElementById('gen3G').checked)gens.push('3G');
if(document.getElementById('gen4G').checked)gens.push('4G');
if(document.getElementById('gen5G').checked)gens.push('5G');
document.getElementById('profileSummary').innerHTML=`
<strong>ProfileId:</strong> ${pid}<br>
<strong>Period:</strong> Last ${period} days<br>
<strong>Granularity:</strong> ${gran}<br>
<strong>ISPs:</strong> ${isps.length} selected<br>
<strong>Platforms:</strong> ${platforms.join(', ')}<br>
<strong>Generations:</strong> ${gens.join(', ')||'none'}
`}

document.getElementById('profileId').addEventListener('change',updateSummary);
document.getElementById('granularity').addEventListener('change',updateSummary);
document.getElementById('defaultPeriod').addEventListener('change',updateSummary);
document.getElementById('ispSelect').addEventListener('change',updateSummary);
document.getElementById('platform').addEventListener('change',updateSummary);
['gen2G','gen3G','gen4G','gen5G'].forEach(id=>document.getElementById(id).addEventListener('change',updateSummary));
updateSummary();

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

let globalData=null;

document.getElementById('btnLoad').onclick=async()=>{
const btn=document.getElementById('btnLoad');
const st=document.getElementById('status');
const ch=document.getElementById('charts');
btn.disabled=true;btn.textContent='⏳...';ch.innerHTML='';
const start=document.getElementById('dtStart').value;
const end=document.getElementById('dtEnd').value;
const pid=parseInt(document.getElementById('profileId').value);

if(end>'2026-02-09'){alert('Date > 09/02/2026');st.innerHTML='<span style="color:#e74c3c;">❌ Future</span>';btn.disabled=false;btn.textContent='🔄 Charger';return}
if(start>end){alert('Start > End');st.innerHTML='<span style="color:#e74c3c;">❌ Invalid</span>';btn.disabled=false;btn.textContent='🔄 Charger';return}

try{
st.textContent='📡 API (profileId:'+pid+')...';
const r1=await fetch('/en/dashboard/jsonStatsExec',{method:'POST',headers:{'Content-Type':'application/json','X-Requested-With':'XMLHttpRequest'},body:JSON.stringify({profileId:pid,dateStart:start+' 00:00:00',dateEnd:end+' 23:59:59',product:'crowd',forceReload:false})});
const e=await r1.json();
console.log('[API]',e);
if(e.status!=='OK')throw new Error('API: '+JSON.stringify(e));
st.textContent=`⏳ Task #${e.taskId}...`;
let t;
for(let i=0;i<60;i++){
await new Promise(r=>setTimeout(r,2000));
const r2=await fetch('/en/task/jsonGetTaskProgress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({task:{id:e.taskId}})});
t=await r2.json();
st.textContent=`⏳ ${t.executionProgress||0}%`;
if(t.executionProgress>=100)break}
if(!t||t.executionProgress<100)throw new Error('Timeout');
st.textContent='📊...';
globalData=JSON.parse(t.outputData);
renderAll(start,end);
st.innerHTML='<span style="color:#27ae60;">✓ '+globalData.data.isps.length+' ISPs</span>'
}catch(err){console.error(err);st.innerHTML='<span style="color:#e74c3c;">❌ '+err.message+'</span>';alert('Error:\\n'+err.message)}
finally{btn.disabled=false;btn.textContent='🔄 Charger'}
};

function renderAll(start,end){
const isps=globalData.data.isps;
const ch=document.getElementById('charts');
ch.innerHTML=`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;"><div style="grid-column:1/-1;background:#0c66aa;color:#fff;padding:8px 14px;border-radius:4px;font-size:15px;font-weight:600;">📊 Moyennes</div>${CHARTS.map(c=>`<div style="background:#fff;border:1px solid #ddd;border-radius:4px;"><div style="background:#eee;padding:8px 12px;border-bottom:1px solid #ddd;font-size:13px;font-weight:500;color:#333;">${c.icon} ${c.title}</div><div id="bar-${c.id}" style="height:240px;"></div></div>`).join('')}</div><div style="margin-top:30px;"><div style="background:#fff;border:1px solid #ddd;border-radius:4px;margin-bottom:20px;"><div style="background:#94c11c;color:#fff;padding:10px 14px;border-radius:4px 4px 0 0;font-size:15px;font-weight:600;">📈 Jour</div><div style="padding:12px;background:#f8f8f8;border-bottom:1px solid #ddd;"><div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center;"><div><strong style="font-size:12px;color:#555;">ISPs:</strong> ${isps.map((isp,i)=>`<label style="margin-left:8px;font-size:12px;cursor:pointer;"><input type="checkbox" class="day-isp" data-idx="${i}" checked> <span style="color:#${isp.Color};font-weight:600;">${isp.Name}</span></label>`).join('')}</div><div><label style="font-size:12px;"><input type="checkbox" id="day-auto" checked> Auto</label></div><div style="display:flex;gap:8px;align-items:center;"><label style="font-size:11px;">Min:</label><input type="number" id="day-min" placeholder="auto" style="width:70px;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:12px;" disabled></div><div style="display:flex;gap:8px;align-items:center;"><label style="font-size:11px;">Max:</label><input type="number" id="day-max" placeholder="auto" style="width:70px;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:12px;" disabled></div><div><label style="font-size:12px;"><input type="checkbox" id="day-smooth"> Smooth</label></div><div><button onclick="window.renderLC('day')" style="background:#0c66aa;color:#fff;border:none;border-radius:3px;padding:5px 12px;font-size:12px;cursor:pointer;">OK</button></div></div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:18px;">${CHARTS.map(c=>`<div style="border:1px solid #ddd;border-radius:4px;"><div style="background:#eee;padding:6px 10px;border-bottom:1px solid #ddd;font-size:12px;font-weight:500;color:#333;">${c.icon} ${c.title}</div><div id="day-${c.id}" style="height:280px;"></div></div>`).join('')}</div></div><div style="background:#fff;border:1px solid #ddd;border-radius:4px;margin-bottom:20px;"><div style="background:#94c11c;color:#fff;padding:10px 14px;border-radius:4px 4px 0 0;font-size:15px;font-weight:600;">📈 Semaine</div><div style="padding:12px;background:#f8f8f8;border-bottom:1px solid #ddd;"><div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center;"><div><strong style="font-size:12px;color:#555;">ISPs:</strong> ${isps.map((isp,i)=>`<label style="margin-left:8px;font-size:12px;cursor:pointer;"><input type="checkbox" class="week-isp" data-idx="${i}" checked> <span style="color:#${isp.Color};font-weight:600;">${isp.Name}</span></label>`).join('')}</div><div><label style="font-size:12px;"><input type="checkbox" id="week-auto" checked> Auto</label></div><div style="display:flex;gap:8px;align-items:center;"><label style="font-size:11px;">Min:</label><input type="number" id="week-min" placeholder="auto" style="width:70px;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:12px;" disabled></div><div style="display:flex;gap:8px;align-items:center;"><label style="font-size:11px;">Max:</label><input type="number" id="week-max" placeholder="auto" style="width:70px;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:12px;" disabled></div><div><label style="font-size:12px;"><input type="checkbox" id="week-smooth"> Smooth</label></div><div><button onclick="window.renderLC('week')" style="background:#0c66aa;color:#fff;border:none;border-radius:3px;padding:5px 12px;font-size:12px;cursor:pointer;">OK</button></div></div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:18px;">${CHARTS.map(c=>`<div style="border:1px solid #ddd;border-radius:4px;"><div style="background:#eee;padding:6px 10px;border-bottom:1px solid #ddd;font-size:12px;font-weight:500;color:#333;">${c.icon} ${c.title}</div><div id="week-${c.id}" style="height:280px;"></div></div>`).join('')}</div></div><div style="background:#fff;border:1px solid #ddd;border-radius:4px;"><div style="background:#94c11c;color:#fff;padding:10px 14px;border-radius:4px 4px 0 0;font-size:15px;font-weight:600;">📈 Mois</div><div style="padding:12px;background:#f8f8f8;border-bottom:1px solid #ddd;"><div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center;"><div><strong style="font-size:12px;color:#555;">ISPs:</strong> ${isps.map((isp,i)=>`<label style="margin-left:8px;font-size:12px;cursor:pointer;"><input type="checkbox" class="month-isp" data-idx="${i}" checked> <span style="color:#${isp.Color};font-weight:600;">${isp.Name}</span></label>`).join('')}</div><div><label style="font-size:12px;"><input type="checkbox" id="month-auto" checked> Auto</label></div><div style="display:flex;gap:8px;align-items:center;"><label style="font-size:11px;">Min:</label><input type="number" id="month-min" placeholder="auto" style="width:70px;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:12px;" disabled></div><div style="display:flex;gap:8px;align-items:center;"><label style="font-size:11px;">Max:</label><input type="number" id="month-max" placeholder="auto" style="width:70px;padding:4px;border:1px solid #ccc;border-radius:3px;font-size:12px;" disabled></div><div><label style="font-size:12px;"><input type="checkbox" id="month-smooth"> Smooth</label></div><div><button onclick="window.renderLC('month')" style="background:#0c66aa;color:#fff;border:none;border-radius:3px;padding:5px 12px;font-size:12px;cursor:pointer;">OK</button></div></div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:18px;">${CHARTS.map(c=>`<div style="border:1px solid #ddd;border-radius:4px;"><div style="background:#eee;padding:6px 10px;border-bottom:1px solid #ddd;font-size:12px;font-weight:500;color:#333;">${c.icon} ${c.title}</div><div id="month-${c.id}" style="height:280px;"></div></div>`).join('')}</div></div></div>`;
['day','week','month'].forEach(g=>{document.getElementById(g+'-auto').onchange=function(){const d=!this.checked;document.getElementById(g+'-min').disabled=d;document.getElementById(g+'-max').disabled=d}});
CHARTS.forEach(def=>{const data=isps.map(isp=>({name:isp.Name,y:parseFloat(def.fmt(isp[def.key]||0)),color:{linearGradient:{x1:0,x2:1,y1:0,y2:0},stops:[[0,colorLum('#'+isp.Color,-0.3)],[1,'#'+isp.Color]]}}));Highcharts.chart('bar-'+def.id,{chart:{type:'bar',height:240,backgroundColor:'#fff',style:{fontFamily:'Roboto,Arial'}},credits:{href:'http://www.nperf.com',text:'nPerf.com',style:{fontSize:'9px'}},title:{text:def.title,style:{fontSize:'14px',fontWeight:'600',color:'#333'}},subtitle:{text:start+' → '+end,style:{fontSize:'11px',color:'#999'}},xAxis:{type:'category',labels:{style:{fontSize:'12px',color:'#555'}}},yAxis:{title:{text:def.unit,style:{fontSize:'11px',color:'#666'}},labels:{style:{fontSize:'11px',color:'#666'}}},tooltip:{valueSuffix:' '+def.unit,valueDecimals:def.unit==='nPoints'?0:2},legend:{enabled:false},plotOptions:{bar:{dataLabels:{enabled:true,format:'{point.y} '+def.unit,style:{fontSize:'11px',fontWeight:'500',textOutline:'none',color:'#000'},backgroundColor:'rgba(255,255,255,0.8)',borderRadius:3,padding:3}}},series:[{name:def.title,data}]})});
renderLC('day');renderLC('week');renderLC('month')}

window.renderLC=function(g){if(!globalData)return;const isps=globalData.data.isps;const auto=document.getElementById(g+'-auto').checked;const yMin=auto?null:parseFloat(document.getElementById(g+'-min').value)||null;const yMax=auto?null:parseFloat(document.getElementById(g+'-max').value)||null;const smooth=document.getElementById(g+'-smooth').checked;const activeISPs=[];document.querySelectorAll('.'+g+'-isp:checked').forEach(cb=>activeISPs.push(parseInt(cb.dataset.idx)));CHARTS.forEach(def=>{const series=isps.map((isp,idx)=>{if(!activeISPs.includes(idx))return null;const raw=(isp.Data||[]).map(d=>[new Date(d.DateTime+'T12:00:00Z').getTime(),parseFloat(def.fmt(d[def.key]||0))]).sort((a,b)=>a[0]-b[0]);const agg=aggregate(raw,g);return{name:isp.Name,color:'#'+isp.Color,data:agg,marker:{radius:4},lineWidth:2}}).filter(s=>s);const yAxis={title:{text:def.unit,style:{fontSize:'11px',color:'#666'}},labels:{style:{fontSize:'11px',color:'#666'}}};if(!auto){if(yMin!==null)yAxis.min=yMin;if(yMax!==null)yAxis.max=yMax}Highcharts.chart(g+'-'+def.id,{chart:{type:smooth?'spline':'line',height:280,backgroundColor:'#fff',zoomType:'x',style:{fontFamily:'Roboto,Arial'}},credits:{href:'http://www.nperf.com',text:'nPerf.com',style:{fontSize:'9px'}},title:{text:def.title,style:{fontSize:'13px',fontWeight:'600',color:'#333'}},xAxis:{type:'datetime',labels:{format:g==='month'?'{value:%m/%Y}':'{value:%d/%m}',style:{fontSize:'11px',color:'#555'}},crosshair:true},yAxis,tooltip:{shared:true,crosshairs:true,valueSuffix:' '+def.unit,valueDecimals:def.unit==='nPoints'?0:2,xDateFormat:'%d/%m/%Y'},legend:{enabled:true,align:'center',verticalAlign:'bottom',itemStyle:{fontSize:'10px',fontWeight:'500',color:'#555'}},plotOptions:{line:{lineWidth:2,states:{hover:{lineWidth:3}},marker:{enabled:g!=='day'}},spline:{lineWidth:2,states:{hover:{lineWidth:3}},marker:{enabled:g!=='day'}}},series})})}

document.getElementById('btnLoad').click()
}
})();
