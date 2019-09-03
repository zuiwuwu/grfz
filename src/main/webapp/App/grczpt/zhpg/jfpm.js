Ext.define('App.grczpt.zhpg.jfpm', {
	extend : 'App.framework.listfrm',
	oldStyle : true,
	style:{
		 background:'url(../images/grczpt/grczpt_bg.png)',
	       padding: '10px'
	 },
	 hidden : true,
	url : '../listCombo/getLists',
	pageitemselectkey:'ID',
	initComponent : function() {
		
		this.columns = [ {
			name : '',
			type : 'string',
			gridcol : {
				sortable : false,
				xtype : 'rownumberer',
				header : '序号',
				width : 60
			}
		}, {
			name : 'ID',
			type : 'string'
		}, 
		
		{
			name : 'XM',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '名称',
				width : 200
			}
		}, {
			name : 'DBM',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '大部门',
				width : 200
			}
		},{
			name : 'JZ',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '警种',
				width : 200
			}
		},{
			name : 'ZHDF',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '积分',
				width : 200
			}
		},{
			name : 'NAME',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '维度',
				width : 200
			}
		},{
			name : 'EVENTNAME',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '事件',
				width : 200
			}
		},{
			name : 'UPDATETIME',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '年度',
				width : 200
			}
		}, {
			name : '',
			type : 'string',
			gridcol : {
	               header: '操作',
	               sortable: false,
	               xtype: 'actioncolumn',
	               flex: 1,
	               minWidth: 100,
	               items: [{
	            	   iconCls: 'icon-add',
	            	   text: '查看详情',	            	 
	                   scope: this,
	                   handler: function (grid, rowIndex, colIndex) {
	                       var rec = grid.getStore().getAt(rowIndex);
	                       console.log(rec.data.USERNAME+rec.data.NAME)
	                       Ext.create('App.grczpt.xtsz.userlogin.UserJf', {
	                    	        USERNAME : rec.data.XM,
	                    	        NAME : rec.data.NAME
	                    	    
	   						}).show();
	                   }
	                   
	               }]
	           }
		}];
		
		
		
		
		
		this.Year=Ext.create('App.Common.ComboBoxDropList', {
			fieldLabel : '年份',
			labelWidth : 40,
			allowBlank : false,
			width : 150,
			height : 20,
			name : 'YEAR',
			value : '',
			data : [{
						ID : '2010',
						NAME : "2010"
					}, {
						ID : '2011',
						NAME : "2011"
					}, {
						ID : '2012',
						NAME : "2012"
					}, {
						ID : '2013',
						NAME : "2013"
					}, {
						ID : '2014',
						NAME : "2014"
					}, {
						ID : '2015',
						NAME : "2015"
					}, {
						ID : '2016',
						NAME : "2016"
					}, {
						ID : '2017',
						NAME : "2017"
					}]
					
					});
		
		this.Year1=Ext.create('App.Common.ComboBoxDropList', {
			//fieldLabel : '年份1',
			allowBlank : false,
			margin : '0 0 0 20',
			width : 105,
			height : 20,
			name : 'YEAR1',
			value : '',
			data : [{
						ID : '2010',
						NAME : "2010"
					}, {
						ID : '2011',
						NAME : "2011"
					}, {
						ID : '2012',
						NAME : "2012"
					}, {
						ID : '2013',
						NAME : "2013"
					}, {
						ID : '2014',
						NAME : "2014"
					}, {
						ID : '2015',
						NAME : "2015"
					}, {
						ID : '2016',
						NAME : "2016"
					}, {
						ID : '2017',
						NAME : "2017"
					}]
					
					});
		
		this.name = Ext.create('Ext.form.field.Text', {
			name : 'NAME',
			margin : '0 0 0 40',
			fieldLabel : '姓名',
			labelWidth : 40,
			width : 150,
			height : 22,
			
		});
		
		/*this.dbm = Ext.create('Ext.form.field.Text', {
			fieldLabel : '大部门',
			margin : '0 0 0 10',
			width : 180,
			height : 20,
			
		});*/
		
		
		this.DEPT = Ext.create('App.Common.AutoComplete',{
	        name : 'DEPT',
	        margin : '0 0 0 40',
	        labelWidth : 40,
			width : 150,
			height : 20,
	        hideLabel: false,
	        fieldLabel : '部门',
	        url: '../listCombo/listDept',
	        displayField: 'DEPTNAME',
	        valueField: 'DEPTNAME',
	        hideTrigger: false,
	        queryPageSize: 10000,
	        fields: ['DEPTNAME']
	    });
		
		
		
		this.event = Ext.create('App.Common.AutoComplete',{
	        name : 'EVENT',
	        margin : '0 0 0 40',
	        labelWidth : 40,
			width : 150,
			height : 20,
	        hideLabel: false,
	        fieldLabel : '事件',
	        url: '../listCombo/listEvent',
	        displayField: 'EVENT',
	        valueField: 'EVENT',
	        hideTrigger: false,
	        queryPageSize: 10000,
	        fields: ['EVENT']
	    });
		
		/*this.event = Ext.create('Ext.form.ComboBox', {
			fieldLabel: '事件',
			margin : '0 0 0 10',
			//store : states,
			//queryMode : 'local',
			url: '../listCombo/listEvent',
			displayField : 'NAME',
			valueField : 'ID',
			emptyText: '请选择...',
			editable : false,
			width : 180,
			height : 20,
			fields: ['EVENT']
		});*/
		
		
		this.dimensionality = Ext.create('App.Common.AutoComplete',{
	        name : 'DIMENSIONALITY',
	        margin : '0 0 0 40',
	        labelWidth : 40,
			width : 150,
			height : 20,
	        hideLabel: false,
	        fieldLabel : '维度',
	        url: '../listCombo/listDimensionality',
	        displayField: 'DIMENSIONNAME',
	        valueField: 'DIMENSIONNAME',
	        hideTrigger: false,
	        queryPageSize: 10000,
	        fields: ['DIMENSIONNAME']
	    });
		
		
		
		
		
		
		/*this.dimensionality = Ext.create('Ext.form.ComboBox', {
			fieldLabel: '维度',
			margin : '0 0 0 10',
			//store : states,
			//queryMode : 'local',
			url: '../listCombo/listDimensionality',
			displayField : 'NAME',
			valueField : 'ID',
			emptyText: '请选择...',
			editable : false,
			width : 200,
			height : 20,
			fields: ['DIMENSIONNAME']
		});*/
		
		/*this.police = Ext.create('Ext.form.ComboBox', {
			fieldLabel: '警种',
			margin : '0 0 0 10',
			//store : states,
			queryMode : 'local',
			displayField : 'NAME',
			valueField : 'ID',
			emptyText: '请选择...',
			editable : false,
			width : 180,
			height : 20,
		});*/
		
		
		this.JYSX = Ext.create('App.Common.AutoComplete',{
	        name : 'JYSX',
	        margin : '0 0 0 40',
	        labelWidth : 60,
			width : 180,
			height : 20,
	        hideLabel: false,
	        fieldLabel : '警员属性',
	        url: '../listCombo/listJYSX',
	        displayField: 'JYSX',
	        valueField: 'JYSX',
	        hideTrigger: false,
	        queryPageSize: 10000,
	        fields: ['JYSX']
	    });
		
		
		
		var combostore = new Ext.data.ArrayStore({
		       fields: ['id', 'name'],
		       data: [[1, '是'], [2, '否']]
		        });
		
		this.decide = Ext.create('Ext.form.ComboBox', {
			name : 'DECIDE',
			fieldLabel: '是否合格',
			margin : '0 0 0 40',
	        labelWidth : 60,
			width : 180,
			height : 20,
			store : combostore,
			queryMode : 'local',
			displayField : 'name',
			valueField : 'id',
			emptyText: '请选择...',
			editable : false,
			
		});
		
		
		
		this.query = Ext.create('Ext.button.Button', {
				id : 'see',
				margin : '0 0 0 40',
				text : '查询',
				
				scope : this,
				width : 100,
				height : 30,
				handler : this.onSearch
			});
		
		
		this.addDimension = Ext.create('Ext.button.Button', {
			id : 'add',
			margin : '0 0 0 40',
			text : '导出',
			
			scope : this,
			width : 100,
			height : 30,
			//handler : this.addField
		});
		
		this.tbitems = [this.Year,
		                this.Year1,
		                this.name,
		                this.DEPT,
		                this.event,
		                this.dimensionality,
		                this.JYSX ,
		                this.decide,
		                this.query,
		                this.addDimension,
		                //this.deleteDimension
		];
		

			
		this.callParent(arguments);
	},
	
	
	
	
	
	afterRender : function(/*grid, rowIndex, colIndex*/) {
		/*var rec = grid.getStore().getAt(rowIndex);
		 Ext.Ajax.request({
		 	url : '../netDev/get',
		     method: 'post', //方法  
		     params: { ID: rec.get('ID') },
		     scope: vme,
		     callback: function (options, success, response) {
		         if (success) {
		             var v = Ext.JSON.decode(response.responseText);
		             this.setValues(v);
		         }
		         else {
		             Ext.MessageBox.alert('网络错误！');
		         }
		     }
		 });*/
		
		
		this.callParent(arguments);
	},
	
	
	delDimension : function(grid, rowIndex, colIndex) {
	     var vsel = this.list.getSelectedString();
		 debugger;
		 if (vsel.length > 0) {
			var vchns = '';
			vchns += vsel;
			this.delChn(vchns);
			}
			
		

	},
	
	delChn : function(vchns) {
		var vme = this;
			Ext.Msg.confirm(
							'信息',
							'确定要删除?',
							function(result) {
								//获取正航数据
								if (result == 'yes') {
									Ext.Msg
											.show({

												msg : '正在请求数据，请稍后',
												progressText : '正在请求数据',
												width : 300,
												wait : true
											});

									Ext.Ajax
											.request({
												params : {
													VCHNS : vchns
												},
												url : '../dimension/deletedimension',
												method : 'POST',
												failure : function() {
													Ext.Msg
															.hide();
													Ext.Msg
															.alert(
																	"警告",
																	"出现异常，请联系管理员！");
												},
												success : function(response) {
													
													Ext.Msg
															.hide();
													Ext.Msg
															.alert(
																	"成功",
																	"删除成功！");
													vme.list.store.reload();
												}	
											});
								}

							}, this)
						
							
	},
	
	
	
	onSearch : function() {
		var store = this.getStore();
		store.clearFilter(true);
		store.filter(this.getFilters());
	},
	
	getFilters : function() {
		return [ {
			property : 'YEAR',
			value : this.Year.getRawValue()
		},{
			property : 'YEAR1',
			value : this.Year1.getRawValue()
		},{
			property : 'NAME',
			value : this.name.getRawValue()
		},{
			property : 'DEPT',
			value : this.DEPT.getRawValue()
		},{
			property : 'EVENT',
			value : this.event.getRawValue()
		},{
			property : 'DIMENSIONALITY',
			value : this.dimensionality.getRawValue()
		},{
			property : 'JYSX',
			value : this.JYSX.getRawValue()
		},{
			property : 'DECIDE',
			value : this.decide.getRawValue()
		} ];
	},
	
	getfilter : function() {
		var vme = this;
		var filters = this.getFilters();
		filters.push({
			property : 'select',
			value : vme.list.getSelectedString()
		});
		return filters;
	},
	
});