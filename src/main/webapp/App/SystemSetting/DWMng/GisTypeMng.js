Ext.define('App.SystemSetting.DWMng.GisTypeMng.newDlg', {
			extend : 'App.Common.EditDlg',
			title : '分组属性',
			initComponent : function() {
				this.items = [{
							xtype : 'textfield',
							allowBlank : false,
							fieldLabel : 'ID',
							name : 'GISTYPEID',
							value: this.GISTYPEID,
							emptyText : '不能为空',
							readOnly: this.modifymod?true:false
						}, {
							xtype : 'textfield',
							allowBlank : false,
							fieldLabel : '名称',
							name : 'GISTYPENM',
							emptyText : '不能为空'
						}];

				this.callParent(arguments);
			}
		});
		
		
Ext.define('App.SystemSetting.DWMng.GisTypeMng', {
	extend : 'Ext.Panel',
	layout : 'border',
	border : 0,
	initComponent : function() {
		this.lastDWGISTYPE = null;
		this.dwname = Ext.create('App.Common.AutoComplete', {
					hideLabel : true,
					width : 200,
					url : 'DWMng/GetAutoCompleteList',
					displayField : 'NAME',
					valueField : 'ID',
					fields : [{
								name : 'ID'
							}, {
								name : 'NAME'
							}]
				});

		this.groupTitle = Ext.create('Ext.draw.Text', {
					text : SPLanguage.getMessage("SYDW")
				});
		this.dwlist = Ext.create('App.Common.ImagePreview', {
					url : '../GISDW/ListGISTypeDW',
					region : 'center',
					viewConfig : {
						plugins : {
							ptype : 'gridviewdragdrop',
							dragGroup : 'group1',
							dropGroup : 'group2',
							enableDrag : true,
							enableDrop : false
						},
						listeners : {
							drop : function(node, data, dropRec, dropPosition) {

							}
						}
					},
					tbar : ['点位名称', this.dwname, {
								xtype : 'button',
								text : SPLanguage.getMessage("SEARCH"),
								tooltip : SPLanguage.getMessage("SEARCH"),
								iconCls : 'icon-find',
								scope : this,
								handler : this.onSearch
							}, {
								iconCls : 'icon-del',
								text : SPLanguage.getMessage("DELETE"),
								scope : this,
								handler : this.onDelClick
							}, '->', this.groupTitle],
					columns : [{
								name : '',
								type : 'string',
								gridcol : {
									sortable : false,
									xtype : 'rownumberer',
									header : SPLanguage.getMessage("SERIALNUM"),
									width : 32
								}
							}, {
								name : 'DWBH',
								type : 'string',
								gridcol : {
									sortable : true,
									header : '点位编号',
									width : 150,
									hidden : true
								}
							}, {
								name : 'DWMC',
								type : 'string',
								gridcol : {
									sortable : true,
									header : '点位名称',
									width : 200
								}
							}, {
								name : 'DWWZ',
								type : 'string',
								gridcol : {
									sortable : true,
									header : '点位位置',
									width : 200,
									hidden : true
								}
							}, {
								name : 'UNITNAME',
								type : 'string',
								gridcol : {
									sortable : true,
									header : SPLanguage.getMessage("GXDW"),
									width : 200
								}
							}, {
								name : 'DWGISTYPENM',
								type : 'string'
							}, {
								name : 'DWGISTYPE',
								type : 'string',
								gridcol : {
									sortable : true,
									header : '类型',
									width : 200,
									renderer : function(value, metaData,
											record, rowIndex, colIndex, store) {
										return record.get('DWGISTYPENM');
									}
								}
							}, {
								name : '',
								type : 'string',
								gridcol : {
									header : SPLanguage.getMessage("HANDLE"),
									//hidden: true,
									sortable : false,
									xtype : 'actioncolumn',
									flex : 1,
									minWidth : 300,
									items : [{
										iconCls : 'icon-del',
										tooltip : SPLanguage
												.getMessage("DELETE"),
										scope : this,
										handler : function(grid, rowIndex,
												colIndex) {
											var rec = grid.getStore()
													.getAt(rowIndex);
											this.delChn(rec.get('DWBH'));
										}
									},
									{
                    iconCls: 'icon-edit',
                    tooltip: '修改点位信息',
                    scope: this,
                    handler: this.onModifyClick
                }]
								}
							}]
				});

		this.treestore = Ext.create('Ext.data.TreeStore', {
					autoLoad : true,
					root : {
						expanded : true,
						text : '全部',
						id : ''
					},
					proxy : {
						type : 'ajax',
						actionMethods : 'post',
						url : '../GISDW/GISTypeTree',
						reader : {
							type : 'json'
						}
					}
				});
		this.typetree = Ext.create('Ext.tree.Panel', {
			region : 'east',
			title : '地图分类树',
			width : 210,
			split : true,
			border : 1,
			minWidth : 230,
			collapsible : true,
			store : this.treestore,
			tbar: [{
					iconCls : 'icon-refresh',
					text : '刷新',
					scope : this,
					handler : function() {
						this.treestore.load();
					}
				}, {
					iconCls : 'icon-add',
					text : '添加',
					scope : this,
					handler : this.onAddGroup
				}, {
					iconCls : 'icon-edit',
					text : '修改',
					scope : this,
					handler : this.onEditGroup
				}, {
					iconCls : 'icon-del',
					text : '删除',
					scope : this,
					handler : this.onDelGroup
				}],
			viewConfig : {
				plugins : {
					ptype : 'treeviewdragdrop',
					containerScroll : true,
					dragGroup : 'group1',
					dropGroup : 'group1',
					enableDrag : true,
					enableDrop : true
				},
				listeners : {
					scope: this,
					beforedrop : function(node, data, overModel, dropPosition,
							dropHandlers, eOpts) {
						var vIDS = '';
						for (var i = 0; i < data.records.length; i++) {
							if (vIDS != '')
								vIDS += ',';
							vIDS += data.records[i].get('DWBH');
						}
						dropHandlers.wait = true;
						Ext.Ajax.request({
									url : '../GISDW/EditDWGISType',
									method : 'post', //方法  
									scope: this,
									params : {
										IDS : vIDS,
										GISDWTYPE : overModel.get('id')
									},
									callback : function(options, success,
											response) {
										dropHandlers.cancelDrop();
										if (success) {
											this.dwlist.reLoad();
										} else {
											alert(SPLanguage
													.getMessage("Net_Error"));
										}
									}
								});
					},
					drop : function(node, data, overModel, dropPosition, eOpts) {
					}
				}
			},
			listeners : {
				scope : this,
				selectionchange : this.onSelectionchange
			}
		});
		this.items = [this.dwlist, this.typetree];

		this.callParent(arguments);
	},
	delChn : function(vchns) {
		var vme = this;
		Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除?',
				function(result) {
					if (result != 'yes')
						return;
					var myMask = new Ext.LoadMask(vme, {
								msg : "正在删除，请稍候！"
							});
					myMask.show();
					Ext.Ajax.request({
								url : '../GISDW/DelDWGISType', //查询案件详细信息
								method : 'post', //方法  
								params : {
									IDS : vchns,
									GISDWTYPE : vme.lastDWGISTYPE
								},
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var v = Ext.JSON
												.decode(response.responseText);
										if (!v.success)
											alert(v.msg);
										else
											vme.dwlist.reLoad();
									} else {
										alert(SPLanguage.getMessage("DelFail"));
									}
								}
							});
				});

	},
	onDelClick : function() {
		var vsel = this.dwlist.getSelectionModel().getSelection();
		if (vsel.length > 0) {
			var vchns = '';
			for (var i = 0; i < vsel.length; i++) {
				if (vchns != '')
					vchns += ',';
				vchns += vsel[i].get('DWBH');
			}
			this.delChn(vchns);
		}

	},
	onSelectionchange : function(tree, selected, eOpts) {
		if (selected.length > 0) {
			this.lastDWGISTYPE = selected[0].get('id');
			this.groupTitle.update(selected[0].get('text'));
			this.onSearch();
		}
	},
	onSearch : function() {
		this.dwlist.store.clearFilter(true);
		this.dwlist.store.filter(this.getFilters());
	},
	getFilters : function() {
		return [{
					property : 'DWMC',
					value : this.dwname.getRawValue()
				}, {
					property : 'DWGISTYPE',
					value : this.lastDWGISTYPE
				}];
	},
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.DWMng.newDlg', {
            url: '../DWMng/EditDW',
            modifyMod: true,
            UNITID: rec.get('GXDWDM'),
            DWBH: rec.get('DWBH'),
            listeners: {
                scope: this,
                saveok: function()
                {
                	this.dwlist.reLoad();
                }
            }
        });
        v.show();
        //v.down('form').loadRecord(rec);
    },
	onAddGroup : function() {
		var vsel = this.typetree.getSelectionModel().getSelection();
		var vPARENTID = 0;
		if (vsel.length > 0)
			vPARENTID = vsel[0].get('id');
			if (vPARENTID == '')
			{
				vPARENTID = '01000000';
			}
		Ext.create('App.SystemSetting.DWMng.GisTypeMng.newDlg', {
					GISTYPEID : vPARENTID,
					url : '../GISDW/AddGISType',
					listeners : {
						scope : this,
						saveok : function() {
							this.treestore.load();
						}
					}
				}).show();
	},
	onEditGroup : function() {
		var vsel = this.typetree.getSelectionModel().getSelection();
		if (vsel.length > 0) {
			if(vsel[0].get('id') == '')
				return ;
			var v = Ext.create('App.SystemSetting.DWMng.GisTypeMng.newDlg', {
						grouptree : this,
						url : '../GISDW/EditGISType',
						modifymod: true,
						listeners : {
							scope : this,
							saveok : function() {
								this.treestore.load();
							}
						}
					}).show();
			v.setValues({
						'GISTYPENM' : vsel[0].get('text'),
						'GISTYPEID' : vsel[0].get('id')
					});
		}
	},
	onDelGroup : function() {
		var vsel = this.typetree.getSelectionModel().getSelection();
		if (vsel.length > 0) {
			if(vsel[0].get('id') == '')
				return ;
			Ext.MessageBox.confirm('提示', '是否确定要删除当前类型?', function(result) {
						if (result != 'yes')
							return;

						var myMask = new Ext.LoadMask(this, {
									msg : "正在删除，请稍候！"
								});
						myMask.show();
						Ext.Ajax.request({
									url : '../GISDW/DelGISType',
									method : 'post', // 方法
									params : {
										ID : vsel[0].get('id')
									},
									scope : this,
									callback : function(options, success,
											response) {

										myMask.hide();
										if (success) {
											var v = Ext.JSON
													.decode(response.responseText);
											if (!v.success)
												alert(v.msg);
											else
												this.treestore.load();
										} else {
											alert('删除失败！');
										}
									}
								});
					}, this);
		}
	}
});
