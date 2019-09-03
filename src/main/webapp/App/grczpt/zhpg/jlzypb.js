Ext.define('App.grczpt.zhpg.jlzypb', {
	extend : 'Ext.Component',
	autoStoreLoad : true,
	remoteFilter : false,
	fusionurl : '',
	initComponent : function() {
		var ss = '';
		if (this.ss == '局领导') {
			ss = this.ss
			this.loads(ss)

		} else if (this.ss == '政工纪检室') {
			ss = this.ss
			this.loads(ss)
		} else if (this.ss == '综合保障室') {
			ss = this.ss
			this.loads(ss)
		} else if (this.ss == '情报指挥室') {
			ss = this.ss
			this.loads(ss)
		} else if (this.ss == '执法监督室') {
			ss = this.ss
			this.loads(ss)
		} else if (this.ss == '维稳服从队') {
			ss = this.ss
			this.loads(ss)
		} else if (this.ss == '案件侦办队') {
			ss = this.ss
			this.loads(ss)
		} else if (this.ss == '治安防控队') {
			ss = this.ss
			this.loads(ss)
		} else if (this.ss == '明珠派出所') {
			ss = this.ss
			this.loads(ss)
		} else if (this.ss == '寺港派出所') {
			ss = this.ss
			this.loads(ss)
		} else if (this.ss == '滨江派出所') {
			ss = this.ss
			this.loads(ss)
		}else if(this.ss == '周山河街区派出所'){
	      	   ss = this.ss
	        	 this.loads(ss)
	    }else if(this.ss == '野徐派出所'){
	      	   ss = this.ss
	        	 this.loads(ss)
	    }else if(this.ss == '医药城派出所'){
	      	   ss = this.ss
	        	 this.loads(ss)
	    }

		var vme = this;
		this.addEvents('itemclick');
		if (!this.listeners) {
			this.listeners = {};
		}
		Ext.apply(this.listeners,
				{
					resize : function(panel, width, height, oldWidth,
							oldHeight, eOpts) {
						myChart.resize({
							width : width,
							height : height
						});

					}
				});
		this.callParent(arguments);
	},
	afterRender : function() {
		var vme = this;
		this.callParent(arguments);
		this.init();
	},
	init : function() {

		var vme = this;
		if (this.myChart) {
			this.myChart.dispose();
		}
		myChart = null;
		myChart = echarts.init(this.el.dom, 'test', {
			width : this.getWidth(),
			height : this.getHeight(),

		});
		// var myChartss = echarts.init(document.getElementById('homes'));
		// var a = Ext.getCmp('home').getValue()

		var str = new Array();
		var sts = new Array();

		var sq = [];
		var sc = []
		var ss = '局领导';
		this.loads(ss)

		// debugger
		option = {
			tooltip : {
				trigger : 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
			/*
			 * formatter: function (params) { // alert(JSON.stringify(params))
			 * var res='<div><p>机关民警 实际:'+params[0].value+'
			 * 标准:'+params[1].value+'</p></div>' res+='<p>内勤民警
			 * 实际:'+params[2].value+' 标准:'+params[3].value+'</p>' res+='<p>案件民警
			 * 实际:'+params[4].value+' 标准:'+params[5].value+'</p>' res+='<p>社区民警
			 * 实际:'+params[6].value+' 标准:'+params[7].value+'</p>' return res
			 *  }
			 */
			},
			legend : {y : 5,
				data : [ '社区民警', '实际社区民警', '案件民警', '实际案件民警', '内勤民警', '实际内勤民警',
						'机关民警', '实际机关民警' ],
				textStyle : {
					color : '#9AB1D3'
				}
			},
			toolbox : {
				show : true,
				orient : 'vertical',
				x : 'right',
				y : 'center',

			},
			 grid: {
  		        left: '3%',
  		        right: '4%',
  		        bottom: '3%',
  		        containLabel: true
  		    },
		
			xAxis : [ {
				type : 'category',
				axisLabel : {
					textStyle : {
						color : '#9AB1D3'
					}

				},
				data : [ '一级', '二级', '三级', '四级', '无等级' ]
			} ],
			yAxis : [ {
				type : 'value',
				name : '人数',
				splitLine : {
					show : false
				},
				axisLabel : {
					textStyle : {
						color : '#9AB1D3'
					}

				},
			} ],
			series : [ {
				name : '社区民警',
				type : 'bar',
				stack : '社区民警',
				itemStyle:{
  		           normal:{
  		               color:'#66C2F5'
  		           }
  		       },
				data : [ 2, 2, 2, 2, 2 ]
			}, {
				name : '实际社区民警',
				type : 'bar',
				stack : '社区民警',
				itemStyle:{
	  		           normal:{
	  		               color:'#66DFF5'
	  		           }
	  		       },
				data : [ 2, 2, 2, 2, 2 ]
			}, {
				name : '案件民警',
				type : 'bar',
				stack : '案件民警',
				itemStyle:{
	  		           normal:{
	  		               color:'#94ECB5'
	  		           }
	  		       },
				data : [ 3, 3, 3, 3, 3 ]
			}, {
				name : '实际案件民警',
				type : 'bar',
				stack : '案件民警',
				itemStyle:{
	  		           normal:{
	  		               color:'#C5FA89'
	  		           }
	  		       },
				data : [ 4, 4, 4, 4, 4 ]
			}, {
				name : '内勤民警',
				type : 'bar',
				stack : '内勤民警',
				itemStyle:{
	  		           normal:{
	  		               color:'#E798B2'
	  		           }
	  		       },
				data : [ 5, 5, 5, 5, 5 ],

			}, {
				name : '实际内勤民警',
				type : 'bar',
				itemStyle:{
	  		           normal:{
	  		               color:'#DFAFD1'
	  		           }
	  		       },
				stack : '内勤民警',
				data : [ 6, 6, 6, 6, 6 ]
			}, {
				name : '机关民警',
				type : 'bar',
				stack : '机关民警',
				itemStyle:{
	  		           normal:{
	  		               color:'#c87de6 '
	  		           }
	  		       },
				data : [ 7, 7, 7, 7, 7 ]
			}, {
				name : '实际机关民警',
				type : 'bar',
				stack : '机关民警',
				itemStyle:{
	  		           normal:{
	  		               color:'#A391E9'
	  		           }
	  		       },
				data : [ 8, 8, 8, 8, 8 ]
			}

			]
		};

		/*
		 * if (option) this.myChart.setOption(option); window.onresize =
		 * this.myChart.resize;
		 */
		// window.onresize = this.myChart.resize;
	},
	onDestroy : function() {
		this.callParent(arguments);
	},
	setOption : function(option) {
		if (myChart)
			myChart.setOption(option);
	},
	loads : function(ss) {

		Ext.Ajax.request({
			url : '../zhpg/getjlzydb?ss=' + ss,
			method : 'get',
			scope : this,
			callback : function(options, success, response) {
				if (success) {
					console.log(response)
					if (response.responseText && response.responseText != '') {
						var result = Ext.JSON.decode(response.responseText);
						// debugger
						var seriesData = [];

						for (i = 0; i < result.length; i++) {
							seriesData[i] = result[i]
						}
						option.series[0].data = seriesData;
						console.log(option.series[0].data)
						if (option)
							this.setOption(option);
						window.onresize = myChart.resize;
					}

				} else {
					if (option)
						this.myChart.setOption(option);
				}
			}
		});
	}
});