Ext.define('App.grczpt.xxgl.dimensionmanage.dimension', {
	extend : 'App.framework.listfrm',
	oldStyle : true,
	url : '../dimension/getLists',
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
			name : 'NAME',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '维度名称',
				width : 200
			}
		}, {
			name : 'DESCRIBE',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '维度描述',
				width : 200
			}
		},{
			name : 'UPDATEMAN',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '更新人',
				width : 200
			}
		},{
			name : 'CREATETIEM',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '创建时间',
				width : 200
			}
		},{
			name : 'UPDATETIME',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '更新时间',
				width : 200
			}
		}];
		
		
		this.columns.push({
			name : '',
			type : 'string',
			gridcol : {
				header : '操作',
				minWidth : 260,
				sortable : false,
				xtype : 'actioncolumn',
				flex : 1,
				items : [{
							
							iconCls : 'icon-add',
							text : "查看详情",
							scope : this,
							handler : this.detailed
						},{
							iconCls : 'icon-edit',
							text : "编辑",
							scope : this,
							handler : this.edit
						}, {
							iconCls : 'icon-del',
							text : "删除",
							scope : this,
							handler : function(grid, rowIndex, colIndex) {
								
								var rec = grid.getStore().getAt(rowIndex);			
								this.delChn(rec.get('ID'));
						
							}
						}]
			}
		});
		
		
		
		
		
		
		this.addDimension = Ext.create('Ext.button.Button', {
			id : 'add',
			margin : '0 0 0 10',
			text : '添加',
			iconCls : 'icon-add',
			scope : this,
			width : 100,
			height : 30,
			handler : this.addField
		});
		
		
		this.deleteDimension  = Ext.create('Ext.button.Button', {
			id : 'del',
			text : '删除',
			margin : '0 0 0 12',
			iconCls : 'icon-del',
			scope : this,
			width : 100,
			height : 30,
			handler : this.delDimension

		});
		
		
		
		this.fuzzy = Ext.create('Ext.form.field.Text', {
			width : 200,
			fieldLabel : '维度名称',
			height : 30,
			
		});
		
		this.tbitems = [ this.fuzzy, {
			xtype : 'button',
			margin : '0 0 0 0',
			text : '查询',
			height : 30,
			iconCls : 'icon-accept',
			scope : this,
			handler : this.onSearch
		} ,
		this.addDimension,
		this.deleteDimension
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
	

	/*delChn : function(id) {
		var vme = this;
		Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除维度?',
				function(result) {
					if (result != 'yes')
						return;
					var myMask = new Ext.LoadMask(vme, {msg : "正在删除维度，请稍候！"});
					myMask.show();
					Ext.Ajax.request({
								url : '../dimension/deletedimension', //查询案件详细信息
								method : 'post', //方法  
								params : {
									ID : id
								},
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var v = Ext.JSON.decode(response.responseText);
										if (!v.success)
											alert(v.msg);
										else
											vme.reLoad();
									} else {
										alert(SPLanguage.getMessage("DelFail"));
									}
								}
							});
				});

	},*/
	
	
	onSearch : function() {
		var store = this.getStore();
		store.clearFilter(true);
		store.filter(this.getFilters());
	},
	
	getFilters : function() {
		return [ {
			property : 'fuzzy',
			value : this.fuzzy.getRawValue()
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

	
	addField : function() {
		var sss = this.list.store;
		Ext.create('App.grczpt.xxgl.dimensionmanage.adddimension', {
			sss:sss,
			//url:'../dimension/adddimension',
			/*listeners : {
				scope : this,
				saveok : function(result) {
				 this.list.store.load();
				}
			}*/
		}).show();
	},
	
	detailed:function(grid, rowIndex, colIndex){
		var rec = grid.getStore().getAt(rowIndex);
		Ext.create('App.grczpt.xxgl.dimensionmanage.dimensiondetailed', {
			 rec:rec,
			 
			//url:'../dimension/adddimension',
			/*listeners : {
				scope : this,
				saveok : function(result) {
				 this.list.store.load();
				}
			}*/
		}).show();
		
	},
	
	edit:function(grid, rowIndex, colIndex){
		var sss = this.list.store;
		var rec = grid.getStore().getAt(rowIndex);
		 Ext.create('App.grczpt.xxgl.dimensionmanage.dimensionedit', {
			 rec:rec,
			 sss:sss,
			/*listeners : {
				scope : this,	
				//finished : this.onFinished
			},*/
		}).show();
	},
	
	

	
	
});