Ext.define('App.SystemSetting.TrafficGroup.Mng', {
	extend : 'Ext.Container',
	layout : 'border',
	forumId : '',
	border : 0,
	urlAddGroup : '../DWGroup/AddGroup',
	urlEditGroup : '../DWGroup/EditGroup',
	urlDelGroup : '../DWGroup/DelGroup',
	urlUpdateGroupParent : '../DWGroup/UpdateGroupParent',
	urlGetGroupTree : '../DWGroup/GetGroupTree',
	urlAddGroupChn : '../DWGroup/AddGroupChn',
	urlEditGroupChn : '../DWGroup/EditGroupChn',
	urlListGroupChn : '../DWGroup/ListGroupChn',
	urlDelGroupChn : '../DWGroup/DelGroupChn',
	urlUpdateGroupChn : '../DWGroup/UpdateGroupChn',
	showchntype : false,
	lastgroupid : '',
	initComponent : function() {

		this.items = [this.createRight(), this.createOCX()];
		// call the superclass's initComponent implementation
		this.callParent(arguments);
	},
	createOCX : function() {
		this.cellEditing = new Ext.grid.plugin.CellEditing({
					clicksToEdit : 1
				});
		var viewConfig = {
			plugins : {
				ptype : 'gridviewdragdrop',
				dragGroup : 'groupmng',
				enableDrag : true,
				enableDrop : false
			}
		};
		var columns = [{
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: SPLanguage.getMessage("SERIALNUM"),
                width: 60
            }
        },
        {
            name: 'DWBH',
            type: 'string'
        },
        {
            name: 'DWMC',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '点位名称',
                width: 200
            }
        },
        {
            name: 'DWTYPENM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '点位类型',
                width: 80
            }
        },
        {
            name: 'PGNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '关联分组',
                width: 180
            }
        },
        {
            name: 'INDEXID',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '排序序号',
                width: 60,
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 0
                }
            }
        }, {
					name : '',
					type : 'string',
					gridcol : {
						header : '操作',
						sortable : false,
						xtype : 'actioncolumn',
						flex : 1,
						items : [{
									iconCls : 'icon-del',
									tooltip : '删除',
									scope : this,
									handler : function(grid, rowIndex, colIndex) {
										var rec = grid.getStore()
												.getAt(rowIndex);
										this.delChn(rec.get('DWBH'));
									}
								}]
					}
				}];

		this.groupTitle = Ext.create('Ext.draw.Text', {
					text : '所有通道'
				});

		this.chnname = Ext.create('App.Common.AutoComplete', {
					hideLabel : true,
					width : 200,
					url : '../DevMng/GetChnNameAutoCompleteList',
					displayField : 'NAME',
					valueField : 'ID',
					fields : [{
								name : 'ID'
							}, {
								name : 'NAME'
							}]
				});

		// ////////////////////////////////////////////////////////////////////////
		// 工具栏
		var tbar;
		this.dwname = Ext.create('App.Common.AutoComplete', {
					hideLabel : true,
					width : 200,
					url : '../DWMng/GetAutoCompleteList',
					displayField : 'NAME',
					valueField : 'ID',
					fields : [{
								name : 'ID'
							}, {
								name : 'NAME'
							}]
				});

		this.combDWTYPE = Ext.create('App.Common.ComboBoxDropList', {
					hideLabel : true,
					width : 80,
					value : '',
					url : '../DWMng/GetDWTYPEComboAll'
				});
		//////////////////////////////////////////////////////////////////////////
		//工具栏
		tbar = ['点位名称', this.dwname, '点位关联', this.combDWTYPE, {
					iconCls : 'icon-find',
					text : SPLanguage.getMessage("JS"),
					scope : this,
					handler : this.onRefresh
				}, '-', {
					iconCls : 'icon-del',
					text : SPLanguage.getMessage("DELETE"),
					scope : this,
					handler : this.onDelClick
				}, {
					iconCls : 'icon-save',
					text : SPLanguage.getMessage("SAVE"),
					scope : this,
					handler : this.onSaveModified
				}, '->', this.groupTitle];

		this.vchnlist = Ext.create('App.Common.ImagePreview', {
					region : 'center',
					url : this.urlListGroupChn,
					tbar : tbar,
					viewConfig : viewConfig,
					columns : columns,
					cellEditing : this.cellEditing
				});
		return this.vchnlist;
	},
	createRight : function() {
		var vme = this;
		var store = Ext.create('Ext.data.TreeStore', {
					autoLoad : true,
					root : {
						expanded : true,
						text : '所有通道',
						id : ''
					},
					proxy : {
						type : 'ajax',
						actionMethods : 'post',
						url : this.urlGetGroupTree,
						reader : {
							type : 'json'
						}
					}
				});

		var viewConfig = {
			plugins : {
				ptype : 'treeviewdragdrop',
				containerScroll : true,
				dropGroup : 'groupmng',
				dragGroup : 'groupmng',
				enableDrag : true,
				enableDrop : true
			},
			listeners : {
				scope : this,
				beforedrop : this.onbeforedrop,
				drop : function(node, data, overModel, dropPosition, eOpts) {
				}
			}
		};

		var tbar = [{
					iconCls : 'icon-refresh',
					text : '刷新',
					scope : this,
					handler : function() {
						this.grouptree.store.load();
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
				}];
		this.grouptree = Ext.create('Ext.tree.Panel', {
					store : store,
					tbar : tbar,
					viewConfig : viewConfig,
					rootVisible : true, // 默认不显示根节点
					useArrows : true,
					autoScroll : true,
					enableDD : true,
					region : 'east',
					title : this.treetitle,
					width : 230,
					split : true,
					border : 1,
					minWidth : 230,
					// maxWidth : 230,
					collapsible : true,
					listeners : {
						scope : this,
						selectionchange : this.onSelectionchange
					}
				});
		return this.grouptree;
	},
	onAddGroup : function() {
		var vsel = this.grouptree.getSelectionModel().getSelection();
		var vPARENTID = 0;
		if (vsel.length > 0)
			vPARENTID = vsel[0].get('id');
		Ext.create('App.JWDC.newDlg', {
					PARENTID : vPARENTID,
					url : this.urlAddGroup,
					listeners : {
						scope : this,
						saveok : function() {
							this.grouptree.store.load();
						}
					}
				}).show();
	},
	onEditGroup : function() {
		var vsel = this.grouptree.getSelectionModel().getSelection();
		if (vsel.length > 0) {
			var v = Ext.create('App.JWDC.newDlg', {
						grouptree : this,
						url : this.urlEditGroup,
						listeners : {
							scope : this,
							saveok : function() {
								this.grouptree.store.load();
							}
						}
					}).show();
			v.setValues({
						'GNAME' : vsel[0].get('text'),
						'INDEXID' : vsel[0].raw.attributes.INDEXID,
						'GID' : vsel[0].get('id')
					});
		}
	},
	onDelGroup : function() {
		var vsel = this.grouptree.getSelectionModel().getSelection();
		if (vsel.length > 0) {
			Ext.MessageBox.confirm('提示', '是否确定要删除当前分组?', function(result) {
						if (result != 'yes')
							return;

						var myMask = new Ext.LoadMask(this, {
									msg : "正在删除分组，请稍候！"
								});
						myMask.show();
						Ext.Ajax.request({
									url : this.urlDelGroup, // 查询案件详细信息
									method : 'post', // 方法
									params : {
										GID : vsel[0].get('id')
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
												this.grouptree.store.load();
										} else {
											alert('删除失败！');
										}
									}
								});
					}, this);
		}
	},
	onbeforedrop : function(node, data, overModel, dropPosition, dropHandlers,
			eOpts) {
		var vme = this;
		var view = data.view;
		if (view.xtype == 'treeview') {
			if (data.records.length == 0)
				return;
			var id = data.records[0].get('id');
			dropHandlers.wait = true;
			Ext.MessageBox.confirm('提示', '是否确定要把移动分组?', function(btn) {
				if (btn === 'yes') {
					//
					var url = vme.urlUpdateGroupParent;
					var vparams = {};
					vparams = {
						PARENTID : overModel.get('id'),
						GID : id
					};
					Ext.Ajax.request({
								url : url, // 查询案件详细信息
								method : 'post', // 方法
								params : vparams,
								callback : function(options, success, response) {
									if (success) {
										var result = Ext.JSON
												.decode(response.responseText);
										if (result.success) {
											dropHandlers.processDrop();
										} else {
											dropHandlers.cancelDrop();
											alert(result.msg);
										}

									} else {
										dropHandlers.cancelDrop();
										alert('网络错误！');
									}
								}
							});
				} else {
					dropHandlers.cancelDrop();
				}

			});
		} else {
			var vIDS = '';
			for (var i = 0; i < data.records.length; i++) {
				if (vIDS != '')
					vIDS += ',';
				vIDS += data.records[i].get('DWBH');
			}
			dropHandlers.wait = true;
			Ext.MessageBox.confirm('提示', '是否确定要把通道移动到该分组?', function(btn) {
				if (btn === 'yes') {
					// dropHandlers.processDrop();
					var url = vme.urlAddGroupChn;
					var vparams = {};
					vparams = {
						GID : overModel.get('id'),
						CHNS : vIDS
					};
					Ext.Ajax.request({
								url : url, // 查询案件详细信息
								method : 'post', // 方法
								params : vparams,
								callback : function(options, success, response) {
									dropHandlers.cancelDrop();
									if (success) {
										vme.onRefresh();

									} else {
										alert('网络错误！');
									}
								}
							});
				} else {
					dropHandlers.cancelDrop();
				}

			});
		}

	},
	onSelectionchange : function(tree, selected, eOpts) {

		if (selected.length > 0) {
			var m = selected[0].get('id');
			this.changeGroup(m, selected[0].get('text'));
		}
	},
	changeGroup : function(groupid, text) {
		if (this.lastgroupid != groupid) {
			this.lastgroupid = groupid;
			this.onRefresh();
			this.groupTitle.setText(text);
		}
	},
	onAddClick : function() {

		if (this.lastgroupid != '') {
			var v = Ext.create('App.SystemSetting.Dlg.selVideoDlg', {
						gridurl : this.urlListGroupChn,
						saveurl : this.urlEditGroupChn,
						SELID : this.lastgroupid,
						filters : [{
									property : 'GID',
									value : this.lastgroupid
								}],
						listeners : {
							scope : this,
							saveok : function() {
								this.vchnlist.reLoad();
							}
						}
					});
			v.show();
		} else {
			alert('请选择分组！');
		}
	},
	delChn : function(vchns) {
		if (!this.lastgroupid || this.lastgroupid == '')
			return;
		var vme = this;
		Ext.MessageBox.confirm('提示', '是否确定要删除通道?', function(result) {
					if (result != 'yes')
						return;
					var myMask = new Ext.LoadMask(vme, {
								msg : "正在删除通道，请稍候！"
							});
					myMask.show();
					Ext.Ajax.request({
								url : vme.urlDelGroupChn, // 查询案件详细信息
								method : 'post', // 方法
								params : {
									GID : vme.lastgroupid,
									CHNS : vchns
								},
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var v = Ext.JSON
												.decode(response.responseText);
										if (!v.success)
											alert(v.msg);
										else
											vme.onRefresh();
									} else {
										alert('删除失败！');
									}
								}
							});
				});

	},
	onDelClick : function() {
		var vsel = this.vchnlist.getSelectionModel().getSelection();
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
	onDelAllClick : function() {
		this.delChn('all');
	},
	onRefresh : function() {
		var vme = this;
		var store = this.vchnlist.store;
		store.clearFilter(true);
		store.filter([{
					property : 'DWMC',
					value : vme.dwname.getRawValue()
				}, {
					property : 'GID',
					value : vme.lastgroupid
				}, {
					property : 'DWTYPE',
					value : vme.combDWTYPE.getValue()
				}]);
	},
	onSaveModified : function() {
		var vme = this;
		var store = this.vchnlist.store;
		var vrecords = store.getModifiedRecords();
		if (vrecords.length == 0)
			return;
		var vchns = new Array();
		for (var i = 0; i < vrecords.length; i++) {
			vchns.push({
						GID : this.lastgroupid,
						DWBH : vrecords[i].get('DWBH'),
						INDEXID : vrecords[i].get('INDEXID')
					});
		}

		Ext.MessageBox.confirm('提示', '是否确定要保存通道?', function(result) {
					if (result != 'yes')
						return;
					var myMask = new Ext.LoadMask(vme, {
								msg : "正在保存，请稍候！"
							});
					myMask.show();
					Ext.Ajax.request({
								url : vme.urlUpdateGroupChn, // 查询案件详细信息
								method : 'post', // 方法
								jsonData : vchns,
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var v = Ext.JSON
												.decode(response.responseText);
										if (!v.success)
											alert(v.msg);
										else
											vme.onRefresh();
									} else {
										alert('保存失败！');
									}
								}
							});
				});
	}
});
