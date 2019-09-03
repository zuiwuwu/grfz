Ext.define('App.SystemSetting.DevMng.DevMng.newImportDlg', {
			extend : 'App.Common.Wizard',
			title : '导入设备',
			modifyMod : false,
			initComponent : function() {
				this.wizardItems = ['App.SystemSetting.DevMng.DevList',
						'App.SystemSetting.DevMng.DevProp',
						'App.SystemSetting.DevMng.DevChns'];
				this.callParent(arguments);
			}
		});

Ext.define('App.SystemSetting.DevMng.DevMng.batchnewDlg', {
			extend : 'App.Common.Wizard',
			title : '批量添加设备',
			modifyMod : false,
			initComponent : function() {
				this.wizardItems = ['App.SystemSetting.DevMng.batchDevInfo',
						'App.SystemSetting.DevMng.DevProp',
						'App.SystemSetting.DevMng.DevChns'];
				this.callParent(arguments);
			}
		});

Ext.define('App.SystemSetting.DevMng.DevMng.List', {
	extend : 'App.Common.ImagePreview',
	listtype : 'grid',
	showImagePreview : false,
	lastGID : '',
	requires : ['App.Common.HyperLinkColumn'],
	initComponent : function() {
		var vme = this;
		this.viewConfig = {
			//forceFit: true,
			plugins : {
				ptype : 'gridviewdragdrop',
				dragGroup : 'group1',
				dropGroup : 'group2',
				enableDrag : true,
				enableDrop : false
			}
		};
		this.columns = [{
					name : '',
					type : 'string',
					gridcol : {
						sortable : false,
						xtype : 'rownumberer',
						header : SPLanguage.getMessage("SERIALNUM"),
						width : 60
					}
				}, {
					name : 'DEVICEID',
					type : 'string'
				}, {
					name : 'PRODUCTID',
					type : 'string'
				}, {
					name : 'DEVICENAME',
					type : 'string',
					gridcol : {
						sortable : true,
						autoSizable : true,
						header : SPLanguage.getMessage("SBMXM"),
						width : 150,
						xtype : 'hyperlinkcolumn',
						handler : function(grid, rowIndex, colIndex, cellIndex,
								e) {
							var rec = grid.getStore().getAt(rowIndex);
							Ext.create('App.SystemSetting.DevMng.setDevChnDlg',{
								DEVICEID : rec.get('DEVICEID'),
								devname: rec.get('DEVICENAME')
							}).show();
							
						},
						customrender : function(value, metaData, record,
								rowIndex, colIndex, store, vcol) {
							vcol.showtip = true;
							return value;
						}
					}
				}, {
					name : 'DEVICEDESC',
					type : 'string',
					gridcol : {
						sortable : true,
						header : SPLanguage.getMessage("REMARK"),
						width : 200,
						hidden : true,
						renderer : function(value, metaData, record, rowIndex,
								colIndex, store) {
							return '<a title="' + value + '">' + value + '</a>';
						}
					}
				}, {
					name : 'ADDR',
					type : 'string',
					gridcol : {
						sortable : true,
						header : 'IP地址',
						width : 100,
						xtype : 'hyperlinkcolumn',
						handler : function(grid, rowIndex, colIndex, cellIndex,
								e) {
							var rec = grid.getStore().getAt(rowIndex);
							Ext.create('App.SystemSetting.DevMng.pingDlg', {
										IP : rec.get('ADDR')
									}).show();
						}
					}
				}, {
					name : 'PORT',
					type : 'string',
					gridcol : {
						sortable : true,
						header : '端口',
						width : 50
					}
				}, {
					name : 'DWBH',
					type : 'string'
				}, {
					name : 'DWMC',
					type : 'string',
					gridcol : {
						sortable : true,
						autoSizable : true,
						header : '点位名称',
						width : 150,
						xtype : 'hyperlinkcolumn',
						handler : function(grid, rowIndex, colIndex, cellIndex,
								e) {
							vme.onShowDWMenu(grid, rowIndex, colIndex, e);
						},
						customrender : function(value, metaData, record,
								rowIndex, colIndex, store, vcol) {
							vcol.showtip = true;
							return value;
						}
					}
				}, {
					name : 'GID',
					type : 'string'
				}, {
					name : 'GNAME',
					type : 'string',
					gridcol : {
						sortable : true,
						header : '分组名称',
						width : 150
					}
				}, {
					name : 'DEVTYPENAME',
					type : 'string',
					gridcol : {
						sortable : true,
						header : '设备类型',
						width : 100
					}
				}, {
					name : 'PRODUCTNAME',
					type : 'string',
					gridcol : {
						sortable : true,
						header : '设备型号',
						width : 80
					}
				}];

		var vzd = Ext.CustomDic.getZD('1');
		for (var i = 0; i < vzd.length; i++) {
			if (vzd[i].SRLX == 3) {
				this.columns.push({
							name : 'CUSTOM_' + vzd[i].ZDLX + 'NAME',
							type : 'string',
							gridcol : {
								sortable : true,
								header : vzd[i].ZDLXNM,
								width : 100
							}
						});
			} else {
				this.columns.push({
							name : 'CUSTOM_' + vzd[i].ZDLX,
							type : 'string',
							gridcol : {
								sortable : true,
								header : vzd[i].ZDLXNM,
								width : 100
							}
						});
			}
		}
		this.columns.push({
					name : 'STAT',
					type : 'string',
					gridcol : {
						sortable : true,
						header : SPLanguage.getMessage("STATE"),
						width : 50,
						renderer : function(value, metaData, record, rowIndex,
								colIndex, store) {
							if (value == '1') {
								return '在线';
							}
							return '<a style="color:Red">断线</a>';
						}
					}
				}, {
					name : 'JKSBBH',
					type : 'string',
					gridcol : {
						sortable : true,
						header : '设备编号',
						width : 100,
						hidden : true
					}
				}, {
					name : '',
					type : 'string',
					gridcol : {
						header : SPLanguage.getMessage("HANDLE"),
						minWidth : 260,
						sortable : false,
						xtype : 'actioncolumn',
						flex : 1,
						items : [{
									iconCls : 'icon-edit',
									tooltip : SPLanguage.getMessage("EDIT"),
									scope : this,
									handler : this.onModifyClick
								}, {
									iconCls : 'icon-del',
									tooltip : SPLanguage.getMessage("DELETE"),
									scope : this,
									handler : function(grid, rowIndex, colIndex) {
										var rec = grid.getStore()
												.getAt(rowIndex);
										this.delChn(rec.get('DEVICEID'));
									}
								}]
					}
				});

		this.devname = Ext.create('App.Common.AutoComplete', {
					hideLabel : true,
					width : 200,
					url : '../DevMng/GetDevAutoCompleteList',
					displayField : 'NAME',
					valueField : 'ID',
					fields : [{
								name : 'ID'
							}, {
								name : 'NAME'
							}]
				});

		this.combDEVTYPE = Ext.create('App.Common.ComboBoxDropList', {
					hideLabel : true,
					width : 120,
					value : '',
					url : '../DevMng/GetDecTYPEComboAll'
				});

		this.groupTitle = Ext.create('Ext.draw.Text', {
					text : '所有设备'
				});

		var states = Ext.create('Ext.data.Store', {
					fields : ['ID', 'NAME'],
					data : [{
								"ID" : "0",
								"NAME" : "设备名"
							}, {
								"ID" : "1",
								"NAME" : "点位名"
							}, {
								"ID" : "2",
								"NAME" : "IP地址"
							}]
				});

		this.searchType = Ext.create('Ext.form.ComboBox', {
					store : states,
					queryMode : 'local',
					displayField : 'NAME',
					valueField : 'ID',
					value : '0',
					editable : false,
					width : 60
				});
		//////////////////////////////////////////////////////////////////////////
		//工具栏
		this.tbar = [this.searchType, this.devname, '设备类型', this.combDEVTYPE];
		this.customdics = [];
		for (var i = 0; i < vzd.length; i++) {
			var item = Ext.CustomDic.createInput(vzd[i], {
						cls : 'x-sp-toolbar-left',
						width : 200,
						editable : true,
						labelWidth : 60
					});
			this.customdics.push(item);
			this.tbar.push(item);
		}
		this.tbar.push({
					xtype : 'button',
					text : SPLanguage.getMessage("SEARCH"),
					tooltip : SPLanguage.getMessage("SEARCH"),
					iconCls : 'icon-find',
					scope : this,
					handler : this.onSearch
				}, '-', {
					iconCls : 'icon-add',
					text : SPLanguage.getMessage("PUSH"),
					scope : this,
					handler : this.onAddClick
				}, {
					iconCls : 'icon-del',
					text : SPLanguage.getMessage("DELETE"),
					scope : this,
					handler : this.onDelClick
				}, {
					iconCls : 'icon-add',
					text : '工具',
					menu : [{
								iconCls : 'icon-add',
								text : '批量添加',
								scope : this,
								handler : this.onBatchAddClick
							}, {
								iconCls : 'icon-export',
								text : SPLanguage.getMessage("EXPORT"),
								scope : this,
								handler : this.onExportClick
							}, {
								iconCls : 'icon-import',
								text : SPLanguage.getMessage("IMPORT"),
								scope : this,
								handler : this.onImportClick
							}, {
								iconCls : 'icon-import',
								text : '导入更改设备',
								scope : this,
								handler : this.onImportClick
							}, {
								iconCls : 'icon-del',
								text : '生成点位',
								scope : this,
								handler : this.onCreateDW
							}, {
								iconCls : 'icon-del',
								text : '同步设备名称到通道',
								scope : this,
								handler : this.onUpdateDevNameToChnName
							}, {
								iconCls : 'icon-del',
								text : '名称添加前缀',
								scope : this,
								handler : this.onAddPrefix
							}, {
								iconCls : 'icon-del',
								text : '复制设备属性',
								scope : this,
								handler : this.onCopyDevTo
							}, {
								iconCls : 'icon-del',
								text : '从前端下载配置',
								scope : this,
								handler : this.onDownLoadConfig
							}, {
								iconCls : 'icon-del',
								text : '上传配置到前端',
								scope : this,
								handler : this.onUploadConfig
							}, {
								iconCls : 'icon-del',
								text : 'Ping',
								scope : this,
								handler : function() {
									var dd = this.getSelectionModel()
											.getSelection();
									var vchns = '';
									for (var i = 0; i < dd.length; i++) {
										if (vchns != '')
											vchns += ',';
										vchns += dd[i].get('ADDR');
									}
									Ext.create(
											'App.SystemSetting.DevMng.pingDlg',
											{
												IP : vchns
											}).show();
								}
							}, {
								iconCls : 'icon-del',
								text : '批量Ping',
								scope : this,
								handler : function() {
									Ext
											.create(
													'App.SystemSetting.DevMng.pingBatchDlg',
													{}).show();
								}
							}, {
								iconCls : 'icon-del',
								text : 'Ping当前检索结果',
								scope : this,
								handler : function() {
									Ext
											.create(
													'App.SystemSetting.DevMng.pingDevDlg',
													{
														filters : this
																.getFilters()
													}).show();
								}
							}, {
								iconCls : 'icon-find',
								text : '查找设备',
								scope : this,
								handler : function() {
									Ext
											.create(
													'App.SystemSetting.DevMng.discoveryDevDlg',
													{
													}).show();
								}
							}]
				}, '->', this.groupTitle);

		this.changeGroup = function(GID, text, type) {
			if (vme.lastGID != GID) {
				vme.lastGID = GID;
				vme.refreshChn();
				//vme.setTitle(text);
				vme.groupTitle.setText(text);
			}
		};

		this.callParent(arguments);
		vme.store.sorters.add(new Ext.util.Sorter({
					property : 'DEVICENAME',
					direction : 'ASC'
				}));
	},
	refreshChn : function() {
		this.store.clearFilter(true);
		this.store.filter(this.getFilters());
		this.updateLayout();
	},
	getFilters : function() {
		var filters = [{
					property : 'devname',
					value : this.devname.getRawValue()
				}, {
					property : 'searchType',
					value : this.searchType.getValue()
				}, {
					property : 'GID',
					value : this.lastGID
				}, {
					property : 'DEVTYPEID',
					value : this.combDEVTYPE.getValue()
				}];

		for (var i = 0; i < this.customdics.length; i++) {
			filters.push({
						property : this.customdics[i].name,
						value : this.customdics[i].getValue()
					});
		}
		return filters;
	},
	onShowDWMenu : function(grid, rowIndex, colIndex, e) {
		var vme = this;
		var rec = grid.getStore().getAt(rowIndex);
		var x = e.getX() - this.getX();
		var y = e.getY() - this.getY();
		var DEVICEID = rec.get('DEVICEID');
		var DWBH = rec.get('DWBH');
		var contextMenu = Ext.create('Ext.menu.Menu', {
					items : [{
						iconCls : 'icon-car',
						text : '修改点位',
						scope : this,
						handler : function(widget, event) {
							var rec = grid.getStore().getAt(rowIndex);
							var v = Ext.create(
									'App.SystemSetting.DWMng.newDlg', {
										url : '../DWMng/EditDW',
										modifyMod : true,
										//UNITID: rec.get('GXDWDM'),
										DWBH : DWBH,
										listeners : {
											scope : this,
											saveok : function() {
												this.reLoad();
											}
										}
									});
							v.show();
						}
					}]
				});

		contextMenu.showAt(e.getXY());
	},
	onAddClick : function() {
		Ext.create('App.SystemSetting.DevMng.newDlg', {
					modifyMod : false,
					listeners : {
						scope : this,
						finished : this.onFinished
					},
					rightParams : {
						GID : this.lastGID
					}
				}).show();
	},
	onBatchAddClick : function() {
		Ext.create('App.SystemSetting.DevMng.DevMng.batchnewDlg', {
					modifyMod : false,
					listeners : {
						scope : this,
						finished : this.onBatchFinished
					},
					rightParams : {
						GID : this.lastGID
					}
				}).show();
	},
	onBatchFinished : function(wizard) {
		var vme = this;
		var myMask = new Ext.LoadMask(vme, {
					msg : "正在添加设备，请稍候！"
				});
		myMask.show();
		var vValues = wizard.getValues();
		Ext.Ajax.request({
					url : '../DevMng/BatchAddDev',
					method : 'post', //方法  
					jsonData : vValues,
					callback : function(options, success, response) {
						myMask.hide();
						if (success) {
							var v = Ext.JSON.decode(response.responseText);
							if (!v.success)
								alert(v.msg);
							else {
								wizard.close();
								vme.refreshChn();
							}
						} else {
							alert(SPLanguage.getMessage("Net_Error"));
						}
					}
				});
	},
	onExportClick : function() {
		Ext.saveframe.src = '../DevMng/ExportDev?filters='
				+ encodeURIComponent(Ext.encode(this.getFilters()));
	},
	onImportClick : function() {
		Ext.create('App.SystemSetting.DevMng.UploadDevFileDlg', {
					url : '../DevMng/UploadDevExcel',
					title : '导入设备',
					listeners : {
						scope : this,
						saveok : function(result) {
							this.onImportAdd(result);
						}
					}
				}).show();
	},
	onImportAdd : function(result) {
		Ext.create('App.SystemSetting.DevMng.DevMng.newImportDlg', {
					modifyMod : false,
					listeners : {
						scope : this,
						finished : this.onImportAddFinished
					},
					rightParams : {
						devs : result.devs,
						PRODUCTID : result.PRODUCTID
					}
				}).show();
	},
	onImportAddFinished : function(wizard) {
		var vme = this;
		var myMask = new Ext.LoadMask(vme, {
					msg : "正在添加设备，请稍候！"
				});
		myMask.show();
		var vValues = wizard.getValues();
		Ext.Ajax.request({
					url : '../DevMng/ImportAddDev',
					method : 'post', //方法  
					jsonData : vValues,
					callback : function(options, success, response) {
						myMask.hide();
						if (success) {
							var v = Ext.JSON.decode(response.responseText);
							if (!v.success)
								alert(v.msg);
							else {
								wizard.close();
								vme.reLoad();
							}
						} else {
							alert(SPLanguage.getMessage("Net_Error"));
						}
					}
				});
	},
	onCreateDW : function() {
		var vsel = this.getSelectionModel().getSelection();
		var v = new Array();
		for (var i = 0; i < vsel.length; i++) {
			v.push({
						DEVICEID : vsel[i].get('DEVICEID'),
						DEVICENAME : vsel[i].get('DEVICENAME')
					});
		}

		Ext.create('App.SystemSetting.DevMng.addDWByDevDlg', {
					DEVS : v,
					listeners : {
						scope : this,
						saveok : function() {
							this.reLoad();
						}
					}
				}).show();
	},
	onAddPrefix : function() {
		var vsel = this.getSelectionModel().getSelection();
		var v = new Array();
		for (var i = 0; i < vsel.length; i++) {
			v.push({
						DEVICEID : vsel[i].get('DEVICEID'),
						DEVICENAME : vsel[i].get('DEVICENAME')
					});
		}

		Ext.create('App.SystemSetting.DevMng.addPrefixDlg', {
					DEVS : v,
					listeners : {
						scope : this,
						saveok : function() {
							this.reLoad();
						}
					}
				}).show();
	},
	onUpdateDevNameToChnName : function() {
		var vsel = this.getSelectionModel().getSelection();
		var v = new Array();
		for (var i = 0; i < vsel.length; i++) {
			v.push({
						DEVICEID : vsel[i].get('DEVICEID'),
						DEVICENAME : vsel[i].get('DEVICENAME')
					});
		}
		var vme = this;
		Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"),
				'是否确定要同步通道名称?', function(result) {
					if (result != 'yes')
						return;
					var myMask = new Ext.LoadMask(vme, {
								msg : "正在同步通道名称，请稍候！"
							});
					myMask.show();
					Ext.Ajax.request({
								url : '../DevMng/UpdateDevNameToChnName',
								method : 'post', //方法  
								jsonData : {
									DEVS : v
								},
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var v = Ext.JSON
												.decode(response.responseText);
										if (!v.success)
											alert(v.msg);
										else {
											vme.reLoad();
										}
									} else {
										alert(SPLanguage
												.getMessage("Net_Error"));
									}
								}
							});
				});

	},
	onModifyClick : function(grid, rowIndex, colIndex) {
		var rec = grid.getStore().getAt(rowIndex);
		var v = Ext.create('App.SystemSetting.DevMng.newDlg', {
					modifyMod : true,
					listeners : {
						scope : this,
						finished : this.onFinished
					},
					rightParams : {
						ID : rec.get('DEVICEID'),
						DWBH : rec.get('DWBH'),
						PRODUCTID : rec.get('PRODUCTID'),
						JKSBBH : rec.get('JKSBBH')
					}
				});
		v.show();
	},
	delChn : function(vchns) {
		var vme = this;
		Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除设备?',
				function(result) {
					if (result != 'yes')
						return;
					var myMask = new Ext.LoadMask(vme, {
								msg : "正在删除设备，请稍候！"
							});
					myMask.show();
					Ext.Ajax.request({
								url : vme.urlDelGroupChn, //查询案件详细信息
								method : 'post', //方法  
								params : {
									IDS : vchns
								},
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var v = Ext.JSON
												.decode(response.responseText);
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

	},
	onDelClick : function() {
		var vsel = this.getSelectionModel().getSelection();
		if (vsel.length > 0) {
			var vchns = '';
			for (var i = 0; i < vsel.length; i++) {
				if (vchns != '')
					vchns += ',';
				vchns += vsel[i].get('DEVICEID');
			}
			this.delChn(vchns);
		}

	},
	onDelAllClick : function() {
		this.delChn('all');
	},
	onSearch : function() {
		this.refreshChn();
	},
	onFinished : function(wizard) {
		var vme = this;
		if (wizard.modifyMod) {
			//修改模式
			var myMask = new Ext.LoadMask(vme, {
						msg : SPLanguage.getMessage("ZZBCQSH")
					});
			myMask.show();
			var vValues = wizard.getValues();
			var rec = wizard.getItemRecord(0);
			vValues.DEVICEID = wizard.rightParams.ID;
			vValues.JKSBBH = wizard.rightParams.JKSBBH;
			vValues.PRODUCTID = wizard.rightParams.PRODUCTID;
			vValues.DWBH = wizard.rightParams.DWBH;
			Ext.Ajax.request({
						url : '../DevMng/EditDev', //查询案件详细信息
						method : 'post', //方法  
						jsonData : vValues,
						callback : function(options, success, response) {
							myMask.hide();
							if (success) {
								var v = Ext.JSON.decode(response.responseText);
								if (!v.success)
									alert(v.msg);
								else {
									wizard.close();
									vme.reLoad();
								}
							} else {
								alert(SPLanguage.getMessage("Net_Error"));
							}
						}
					});
		} else {
			//添加模式
			var myMask = new Ext.LoadMask(vme, {
						msg : SPLanguage.getMessage("ZZBCQSH")
					});
			myMask.show();
			var vValues = wizard.getValues();
			vValues.DWBH = wizard.rightParams.DWBH;
			Ext.Ajax.request({
						url : '../DevMng/AddDev', //查询案件详细信息
						method : 'post', //方法  
						jsonData : vValues,
						callback : function(options, success, response) {
							myMask.hide();
							if (success) {
								var v = Ext.JSON.decode(response.responseText);
								if (!v.success)
									alert(v.msg);
								else {
									wizard.close();
									vme.reLoad();
								}
							} else {
								alert(SPLanguage.getMessage("Net_Error"));
							}
						}
					});

		}

	}
});

Ext.define('App.SystemSetting.DevMng.DevMng', {
			extend : 'Ext.Panel',
			layout : 'border',
			forumId : '',
			border : 0,
			urlListGroupChn : '../DevMng/ListGroupDev',
			urlDelGroupChn : '../DevMng/DelDev',
			initComponent : function() {
				this.items = [this.createRight(), this.createOCX()];
				// call the superclass's initComponent implementation
				this.callParent(arguments);
			},
			createOCX : function() {

				this.vchnlist = Ext.create(
						'App.SystemSetting.DevMng.DevMng.List', {
							region : 'center',
							url : this.urlListGroupChn,
							urlDelGroupChn : this.urlDelGroupChn,
							parentTab : this.parentTab
						});

				return this.vchnlist;
			},
			createRight : function() {
				var v = Ext.create('App.SystemSetting.DevMng.groupTree', {
							region : 'east',
							title : '点位树',
							width : 210,
							split : true,
							border : 1,
							minWidth : 230,
							maxWidth : 230,
							collapsible : true,
							listeners : {
								scope : this,
								selectionchange : this.onSelectionchange,
								drapuserfinished : this.onDrapuserfinished
							}
						});
				return v;
			},
			onSelectionchange : function(tree, selected, eOpts) {
				if (selected.length > 0) {
					this.vchnlist.changeGroup(selected[0].get('id'),
							selected[0].get('text'));
				}
			},
			onDrapuserfinished : function() {
				this.vchnlist.refreshChn();
			}
		});
