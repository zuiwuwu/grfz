Ext.define('App.Common.Chart.FusionCharts', {
	extend : 'Ext.Component',
	chartType : 'Column3D',
	chartParams : {},
	autoloaddata : true,
	canlink : true,
	childEls : ['chartEl'],
	renderTpl : [
			'<div id="{id}-chartEl" style="width:0px;height:0px;position:relative;">',
			'</div>'],
	//url : '../CLXXTJ/Single',
	loading : false,
	showmarsk : true,
	initComponent : function() {
		var vme = this;
		this.addEvents('itemclick');
		this.callParent(arguments);
	},
	onResize:function( width, height, oldWidth, oldHeigh)
	{
		this.callParent(arguments);
		this.myChart.resizeTo(width.toString(), height.toString());
	},
	afterRender : function() {
		var vme = this;
		this.callParent(arguments);
		Ext.listFusionChartsMsgfun[this.getId()] = {
			pfun : this.onLink,
			scope : this
		};
		this.createChart();
	},
	createChart : function() {
		if (!this.rendered)
			return;
		if (this.myChart) {
			this.myChart = null;
			this.chartEl.update("");
		}
		var vme = this;
		var v = this.getId() + '-chartEl';
		var height = this.getHeight();
		this.myChart = new FusionCharts("../Charts/" + this.chartType + ".swf",
				"chart_" + v, '100%', '100%');
		this.myChart.setXMLData("<chart></chart>");
		this.myChart.setTransparent(this.bktransparent);

		//this.myChart.setXMLUrl("../Charts/Data.xml");
		this.myChart.addEventListener("Rendered", function(e, p) {
					vme.myChart.resizeTo(vme.getWidth().toString(), vme
									.getHeight().toString());
					vme.InitChart();

				});
		this.myChart.render(v);
	},
	onDestroy : function() {
		
		var v = Ext.listFusionChartsMsgfun[this.getId()];
		
		if (v){
			
			delete v;
		}
		this.callParent(arguments);
	},
	loadData : function(data) {
		data.chart = Ext.applyIf(data.chart, this.chartParams);
		if (data.data) {
			// Single Series Charts
			for (var i = 0; i < data.data.length; i++) {
				var chartdata = data.data[i];
				if (this.canlink || chartdata.link) {
					chartdata.link = 'j-myFusionChartsJS-' + Ext.JSON.encode({
								id : this.getId(),
								dataIndex : i
							});
				}
			}
		} else if (data.dataset) {
			// Single Series Charts
			var dataset = data.dataset;
			for (var j = 0; j < dataset.length; j++) {
				var datasetdata = dataset[j].data;
				for (var i = 0; i < datasetdata.length; i++) {
					var chartdata = datasetdata[i];
					if (this.canlink || chartdata.link) {
						chartdata.link = 'j-myFusionChartsJS-'
								+ Ext.JSON.encode({
											id : this.getId(),
											dataIndex : i,
											fieldIndex : j
										});
					}
				}
			}
		}
		if(this.myChart
		&&this.hansChartRendered())
			this.myChart.setJSONData(data);
		this.chartdata = data;
	},
	getChartData : function(dataIndex, fieldIndex) {
		if (!this.chartdata)
			return null;
		if (this.chartdata.data)
			return this.chartdata.data[dataIndex];
		if (this.chartdata.dataset) {
			return this.chartdata.dataset[fieldIndex].data[dataIndex];
		}
	},
	hansChartRendered : function() {
		return this.myChart.hasRendered();
	},
	refresh : function(filter, sort) {
		
		if (this.loading)
			return;
		this.filters = filter;
		this.sorters = sort;
		if (!this.rendered)
			return;
		var vparams = {
			page : 1,
			start : 0,
			limit : 25,
			sort : Ext.JSON.encode(sort), // [{ "property": "DEVICENAME",
			// "direction": "ASC"}],
			filter : Ext.JSON.encode(filter)
			// [{ "property": "devname", "value": "1" }, { "property": "DWBH",
			// "value": "" }, { "property": "DEVTYPEID", "value": ""}]
		};
		this.loading = true;
		var vme = this;
		var myMask;
		if (this.showmarsk) {
			myMask = new Ext.LoadMask(vme, {
						msg : "正在加载数据，请稍候！"
					});
			myMask.show();
		}
		Ext.Ajax.request({
					url : this.url, // 请求地址
					params : vparams,
					method : 'post', // 方法
					callback : function(options, success, response) {
						if (myMask)
							myMask.hide();
						vme.loading = false;
						if (success) {
							if (response.responseText
									&& response.responseText != '') {
								var result = Ext.JSON
										.decode(response.responseText);

								vme.loadData(result);
							}
						} else {
						}
					}
				});
	},
	onLink : function(params) {
		var data = this.getChartData(parseInt(params.dataIndex),
				parseInt(params.fieldIndex));
		if (data) {
			//alert(Ext.JSON.encode(data));
			this.fireEvent('itemclick', params.dataIndex,params.fieldIndex, data);
		}
	},
	InitChart : function() {
		var vme = this;
		if (!vme.myChart.jsVars.isResizing) {
			vme.OnInitChart();
		} else {
			setTimeout(function() {
						vme.InitChart();
					}, 10);
		}
	},
	OnInitChart : function() {
		var vme = this;
		if (this.chartdata) {
			vme.loadData(this.chartdata);
		} else if (vme.autoloaddata) {
			vme.autoloaddata = false;
			vme.refresh(vme.filters, vme.sorters);
		}
	},
	changeChartType : function(chartType) {
		this.chartType = chartType;	
		this.createChart();
		
	}
});
