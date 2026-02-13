(function() {
	if (document.getElementById('nperf-custom-overlay')) {
		document.getElementById('nperf-custom-overlay').remove();
		return;
	}
	if (typeof Highcharts === 'undefined') {
		const s = document.createElement('script');
		s.src = 'https://code.highcharts.com/10.3.3/highcharts.js';
		s.onload = init;
		document.head.appendChild(s);
	} else {
		init();
	}

	function init() {
		const overlay = document.createElement('div');
		overlay.id = 'nperf-custom-overlay';
		overlay.style.cssText = 'position:fixed;inset:0;z-index:999999;background:#35363a;overflow:auto;font-family:\'Open Sans\',Arial,sans-serif;';
		const closeBtn = document.createElement('button');
		closeBtn.innerHTML = '✕ Fermer';
		closeBtn.style.cssText = 'position:fixed;top:12px;right:12px;z-index:1000000;background:#ff4444;color:#fff;border:none;border-radius:4px;padding:8px 16px;font-size:13px;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.3);';
		closeBtn.onclick = () => overlay.remove();
		overlay.innerHTML = `<div style="padding:20px;max-width:1600px;margin:0 auto;"><div style="background:#242527;border-radius:4px;padding:14px 18px;margin-bottom:20px;box-shadow:0 1px 3px rgba(0,0,0,0.25);"><h2 style="color:#fff;margin:0;font-size:20px;font-weight:400;display:flex;align-items:center;gap:10px;"><i style="color:#94c11c;font-size:22px;">📊</i> nPerf Custom Dashboard</h2></div><div style="background:#fff;border:1px solid #ddd;border-radius:4px;box-shadow:0 1px 2px rgba(0,0,0,0.06);margin-bottom:20px;"><div style="background:#eee;padding:8px 12px;border-radius:4px 4px 0 0;border-bottom:1px solid #ddd;"><div style="font-size:14px;color:#333;font-weight:500;display:flex;align-items:center;gap:8px;"><i style="color:#666;">⚙️</i> Paramètres</div></div><div style="padding:16px;"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;align-items:end;"><div><label style="font-size:12px;font-weight:600;color:#666;display:block;margin-bottom:4px;">Date de début</label><input type="date" id="npDateStart" value="2026-01-01" max="2026-02-09" style="width:100%;padding:7px 10px;border:1px solid #ccc;border-radius:4px;font-size:14px;font-family:inherit;"/></div><div><label style="font-size:12px;font-weight:600;color:#666;display:block;margin-bottom:4px;">Date de fin</label><input type="date" id="npDateEnd" value="2026-01-31" max="2026-02-09" style="width:100%;padding:7px 10px;border:1px solid #ccc;border-radius:4px;font-size:14px;font-family:inherit;"/></div><div><label style="font-size:12px;font-weight:600;color:#666;display:block;margin-bottom:4px;">Granularité line charts</label><select id="npGranularity" style="width:100%;padding:7px 10px;border:1px solid #ccc;border-radius:4px;font-size:14px;font-family:inherit;background:#fff;"><option value="day">Jour</option><option value="week">Semaine</option><option value="month">Mois</option></select></div><div><button id="npLoadBtn" style="width:100%;background:#94c11c;color:#fff;border:none;border-radius:4px;padding:8px 20px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;">🔄 Charger les données</button></div></div><div id="npStatus" style="margin-top:12px;font-size:12px;color:#999;"></div></div></div><div id="npCharts"></div></div>`;
		document.body.appendChild(overlay);
		document.body.appendChild(closeBtn);
		const CHARTS = [{
			id: 'dl',
			title: 'Download',
			icon: '📥',
			unit: 'Mb/s',
			key: 'DownloadAvgAvg',
			fmt: v => (v / 1000).toFixed(2)
		}, {
			id: 'ul',
			title: 'Upload',
			icon: '📤',
			unit: 'Mb/s',
			key: 'UploadAvgAvg',
			fmt: v => (v / 1000).toFixed(2)
		}, {
			id: 'lat',
			title: 'Latency',
			icon: '⏱️',
			unit: 'ms',
			key: 'LatencyMinAvg',
			fmt: v => v.toFixed(2)
		}, {
			id: 'bro',
			title: 'Browse',
			icon: '🌐',
			unit: '%',
			key: 'BrowseAvg',
			fmt: v => v.toFixed(2)
		}, {
			id: 'str',
			title: 'Stream',
			icon: '▶️',
			unit: '%',
			key: 'StreamAvg',
			fmt: v => v.toFixed(2)
		}, {
			id: 'sco',
			title: 'Score',
			icon: '🏆',
			unit: 'nPoints',
			key: 'ScoreAvg',
			fmt: v => Math.round(v).toString()
		}];

		function colorLum(hex, lum) {
			hex = hex.replace('#', '');
			const num = parseInt(hex, 16);
			let r = (num >> 16) & 255,
				g = (num >> 8) & 255,
				b = num & 255;
			r = Math.round(Math.min(255, Math.max(0, r + (lum < 0 ? r * lum : (255 - r) * lum))));
			g = Math.round(Math.min(255, Math.max(0, g + (lum < 0 ? g * lum : (255 - g) * lum))));
			b = Math.round(Math.min(255, Math.max(0, b + (lum < 0 ? b * lum : (255 - b) * lum))));
			return `rgb(${r},${g},${b})`;
		}

		function aggregateData(dailyData, granularity) {
			if (granularity === 'day') return dailyData;
			const grouped = {};
			dailyData.forEach(point => {
				const date = new Date(point[0]);
				let key;
				if (granularity === 'week') {
					const weekStart = new Date(date);
					weekStart.setDate(date.getDate() - date.getDay());
					key = weekStart.toISOString().split('T')[0];
				} else {
					key = date.toISOString().slice(0, 7);
				}
				if (!grouped[key]) grouped[key] = {
					sum: 0,
					count: 0,
					date: key
				};
				grouped[key].sum += point[1];
				grouped[key].count++;
			});
			return Object.values(grouped).map(g => [new Date(g.date + 'T12:00:00Z').getTime(), g.sum / g.count]).sort((a, b) => a[0] - b[0]);
		}
		document.getElementById('npLoadBtn').onclick = async () => {
			const btn = document.getElementById('npLoadBtn');
			const status = document.getElementById('npStatus');
			const chartsDiv = document.getElementById('npCharts');
			btn.disabled = true;
			btn.textContent = '⏳ Chargement...';
			chartsDiv.innerHTML = '';
			const start = document.getElementById('npDateStart').value;
			const end = document.getElementById('npDateEnd').value;
			const granularity = document.getElementById('npGranularity').value;
			const today = '2026-02-09';
			if (end > today) {
				alert(`❌ Erreur: La date de fin (${end}) est dans le futur.\\n\\nDernière date disponible: ${today}`);
				status.innerHTML = '<span style="color:#e74c3c;">❌ Date de fin invalide (future)</span>';
				btn.disabled = false;
				btn.textContent = '🔄 Charger les données';
				return;
			}
			if (start > end) {
				alert('❌ Erreur: La date de début doit être avant la date de fin.');
				status.innerHTML = '<span style="color:#e74c3c;">❌ Dates invalides</span>';
				btn.disabled = false;
				btn.textContent = '🔄 Charger les données';
				return;
			}
			try {
				status.textContent = '📡 Demande API en cours...';
				const execRes = await fetch('/en/dashboard/jsonStatsExec', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-Requested-With': 'XMLHttpRequest'
					},
					body: JSON.stringify({
						profileId: 11129,
						dateStart: start + ' 00:00:00',
						dateEnd: end + ' 23:59:59',
						product: 'crowd',
						forceReload: false
					})
				});
				const execJson = await execRes.json();
				console.log('[nPerf API] Exec:', execJson);
				if (execJson.status !== 'OK') {
					throw new Error(`API error: ${execJson.message||execJson.status}\\n\\nRéponse: ${JSON.stringify(execJson)}`);
				}
				status.textContent = `⏳ Tâche #${execJson.taskId} en cours...`;
				let taskJson;
				for (let i = 0; i < 60; i++) {
					await new Promise(r => setTimeout(r, 2000));
					const pollRes = await fetch('/en/task/jsonGetTaskProgress', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							task: {
								id: execJson.taskId
							}
						})
					});
					taskJson = await pollRes.json();
					const pct = taskJson.executionProgress || 0;
					status.textContent = `⏳ Calcul... ${pct}%`;
					if (pct >= 100) break;
				}
				if (!taskJson || taskJson.executionProgress < 100) {
					throw new Error('Timeout: >2min. Essayez une période plus courte.');
				}
				status.textContent = '📊 Rendu...';
				const output = JSON.parse(taskJson.outputData);
				const isps = output.data.isps;
				chartsDiv.innerHTML = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;"><div style="grid-column:1/-1;font-size:15px;font-weight:600;color:#fff;background:#0c66aa;padding:8px 14px;border-radius:4px;">📊 Moyennes par ISP</div>${CHARTS.map(c=>`<div style="background:#fff;border:1px solid #ddd;border-radius:4px;box-shadow:0 1px 2px rgba(0,0,0,0.06);"><div style="background:#eee;padding:8px 12px;border-bottom:1px solid #ddd;border-radius:4px 4px 0 0;"><div style="font-size:13px;color:#333;font-weight:500;display:flex;align-items:center;gap:6px;">${c.icon} ${c.title}</div></div><div id="bar-${c.id}" style="height:240px;"></div></div>`).join('')}<div style="grid-column:1/-1;font-size:15px;font-weight:600;color:#fff;background:#94c11c;padding:8px 14px;border-radius:4px;margin-top:10px;">📈 Évolution ${granularity==='day'?'journalière':granularity==='week'?'hebdomadaire':'mensuelle'}</div>${CHARTS.map(c=>`<div style="background:#fff;border:1px solid #ddd;border-radius:4px;box-shadow:0 1px 2px rgba(0,0,0,0.06);"><div style="background:#eee;padding:8px 12px;border-bottom:1px solid #ddd;border-radius:4px 4px 0 0;"><div style="font-size:13px;color:#333;font-weight:500;display:flex;align-items:center;gap:6px;">${c.icon} ${c.title} — évolution</div></div><div id="line-${c.id}" style="height:300px;"></div></div>`).join('')}</div>`;
				CHARTS.forEach(def => {
					const data = isps.map(isp => ({
						name: isp.Name,
						y: parseFloat(def.fmt(isp[def.key] || 0)),
						color: {
							linearGradient: {
								x1: 0,
								x2: 1,
								y1: 0,
								y2: 0
							},
							stops: [
								[0, colorLum('#' + isp.Color, -0.3)],
								[1, '#' + isp.Color]
							]
						}
					}));
					Highcharts.chart('bar-' + def.id, {
						chart: {
							type: 'bar',
							height: 240,
							backgroundColor: '#fff',
							style: {
								fontFamily: 'Roboto,Arial'
							}
						},
						credits: {
							href: 'http://www.nperf.com',
							text: 'nPerf.com',
							style: {
								fontSize: '9px'
							}
						},
						title: {
							text: def.title + ' moyen',
							style: {
								fontSize: '14px',
								fontWeight: '600',
								color: '#333'
							}
						},
						subtitle: {
							text: start + ' → ' + end,
							style: {
								fontSize: '11px',
								color: '#999'
							}
						},
						xAxis: {
							type: 'category',
							labels: {
								style: {
									fontSize: '12px',
									color: '#555'
								}
							}
						},
						yAxis: {
							title: {
								text: def.unit,
								style: {
									fontSize: '11px',
									color: '#666'
								}
							},
							labels: {
								style: {
									fontSize: '11px',
									color: '#666'
								}
							}
						},
						tooltip: {
							valueSuffix: ' ' + def.unit,
							valueDecimals: def.unit === 'nPoints' ? 0 : 2,
							borderRadius: 4
						},
						legend: {
							enabled: false
						},
						plotOptions: {
							bar: {
								dataLabels: {
									enabled: true,
									format: '{point.y} ' + def.unit,
									style: {
										fontSize: '11px',
										fontWeight: '500',
										textOutline: 'none',
										color: '#000'
									},
									backgroundColor: 'rgba(255,255,255,0.8)',
									borderRadius: 3,
									padding: 3
								}
							}
						},
						series: [{
							name: def.title,
							data
						}]
					});
				});
				CHARTS.forEach(def => {
					const series = isps.map(isp => {
						const rawData = (isp.Data || []).map(day => [new Date(day.DateTime + 'T12:00:00Z').getTime(), parseFloat(def.fmt(day[def.key] || 0))]).sort((a, b) => a[0] - b[0]);
						const aggregated = aggregateData(rawData, granularity);
						return {
							name: isp.Name,
							color: '#' + isp.Color,
							data: aggregated,
							marker: {
								radius: 4,
								symbol: 'circle'
							},
							lineWidth: 2
						};
					});
					Highcharts.chart('line-' + def.id, {
						chart: {
							type: 'line',
							height: 300,
							backgroundColor: '#fff',
							zoomType: 'x',
							style: {
								fontFamily: 'Roboto,Arial'
							}
						},
						credits: {
							href: 'http://www.nperf.com',
							text: 'nPerf.com',
							style: {
								fontSize: '9px'
							}
						},
						title: {
							text: def.title + ' — évolution ' + (granularity === 'day' ? 'journalière' : granularity === 'week' ? 'hebdomadaire' : 'mensuelle'),
							style: {
								fontSize: '14px',
								fontWeight: '600',
								color: '#333'
							}
						},
						subtitle: {
							text: start + ' → ' + end,
							style: {
								fontSize: '11px',
								color: '#999'
							}
						},
						xAxis: {
							type: 'datetime',
							labels: {
								format: granularity === 'month' ? '{value:%m/%Y}' : '{value:%d/%m}',
								style: {
									fontSize: '11px',
									color: '#555'
								}
							},
							crosshair: true
						},
						yAxis: {
							title: {
								text: def.unit,
								style: {
									fontSize: '11px',
									color: '#666'
								}
							},
							labels: {
								style: {
									fontSize: '11px',
									color: '#666'
								}
							}
						},
						tooltip: {
							shared: true,
							crosshairs: true,
							valueSuffix: ' ' + def.unit,
							valueDecimals: def.unit === 'nPoints' ? 0 : 2,
							xDateFormat: '%d/%m/%Y',
							borderRadius: 4
						},
						legend: {
							enabled: true,
							align: 'center',
							verticalAlign: 'bottom',
							itemStyle: {
								fontSize: '11px',
								fontWeight: '500',
								color: '#555'
							}
						},
						plotOptions: {
							line: {
								lineWidth: 2,
								states: {
									hover: {
										lineWidth: 3
									}
								},
								marker: {
									enabled: granularity !== 'day'
								}
							}
						},
						series
					});
				});
				status.innerHTML = `<span style="color:#27ae60;">✓ ${isps.length} ISPs, ${isps.reduce((s,i)=>s+i.Samples,0).toLocaleString()} échantillons (${start} → ${end})</span>`;
			} catch (err) {
				console.error('[nPerf]', err);
				status.innerHTML = `<span style="color:#e74c3c;">❌ ${err.message}</span>`;
				alert('❌ Erreur:\\n\\n' + err.message);
			} finally {
				btn.disabled = false;
				btn.textContent = '🔄 Charger les données';
			}
		};
		document.getElementById('npLoadBtn').click();
	}
})();
