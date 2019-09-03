Ext.define('App.SystemSetting.UserPage.DevRight.groupTree', {
			extend : 'Ext.tree.Panel',
			// title: '拓扑结构',
			// animCollapse: true,
			rootVisible : false, // 默认不显示根节点
			useArrows : true,
			flex : 1,
			autoScroll : true,
			enableDD : true,
			initComponent : function() {
				this.store = Ext.create('Ext.data.TreeStore', {
							autoLoad : true,
							root : {
								expanded : false,
								text : '根',
								id : 0,
								mustselchild : true
							},
							proxy : {
								type : 'ajax',
								actionMethods : 'post',
								url : '../DevGroup/GetGroupTree',
								reader : {
									type : 'json'
								}
							}
						});

				var vme = this;

				this.refreshTree = function() {
					vme.store.load();
				};
				this.callParent(arguments);
			}
		});

Ext.define('App.SystemSetting.UserPage.DevRight.List', {
	extend : 'App.Common.ImagePreview',
	listtype : 'grid',
	showImagePreview : false,
	showProgressBarPager : false,
	lastgroupid : 0,
	header : false,
	gridautoLoad : false,
	initChnRight : false,
	chnRighs : {},
	selType : 'rowmodel',
	gridpageSize : 14,
	oldStyle : true,
	initComponent : function() {
		var vme = this;
		vme.chnRighs = {};
		this.columns = [{
					name : '',
					type : 'string',
					gridcol : {
						sortable : false,
						xtype : 'rownumberer',
						header : '',
						width : 24
					}
				}, {
					name : 'GLOBALID',
					type : 'string'
				}, {
					name : 'VIEW',
					type : 'bool',
					gridcol : {
						sortable : false,
						xtype : 'checkcolumn',
						header : '<div style="position:relative;height: 13px;width: 40px;top: -2px;"><input type="checkbox" id="DEVRIGHTVIEW" style="position:absolute;top: 0px;left: 0px;"/><a style="position:absolute;top: 2px;left: 18px;">查看</a></div>',
						width : 60,
						stopSelection : false,
						listeners : {
							scope : this,
							checkchange : this.onViewCheckChange
						}
					}
				}, {
					name : 'PTZ',
					type : 'bool',
					gridcol : {
						sortable : false,
						xtype : 'checkcolumn',
						header : '<div style="position:relative;height: 13px;width: 40px;top: -2px;"><input type="checkbox" id="DEVRIGHTPTZ" style="position:absolute;top: 0px;left: 0px;"/><a style="position:absolute;top: 2px;left: 18px;">云台</a></div>',
						width : 60,
						stopSelection : false,
						listeners : {
							scope : this,
							checkchange : this.onPTZCheckChange
						}
					}
				}, {
					name : 'LST',
					type : 'bool',
					gridcol : {
						sortable : false,
						xtype : 'checkcolumn',
						header : '<div style="position:relative;height: 13px;width: 40px;top: -2px;"><input type="checkbox" id="DEVRIGHTLST" style="position:absolute;top: 0px;left: 0px;"/><a style="position:absolute;top: 2px;left: 18px;">监听</a></div>',
						width : 60,
						stopSelection : false,
						listeners : {
							scope : this,
							checkchange : this.onLSTCheckChange
						}
					}
				}, {
					name : 'PLAYBACK',
					type : 'bool',
					gridcol : {
						sortable : false,
						xtype : 'checkcolumn',
						header : '<div style="position:relative;height: 13px;width: 40px;top: -2px;"><input type="checkbox" id="DEVRIGHTPLAYBACK" style="position:absolute;top: 0px;left: 0px;"/><a style="position:absolute;top: 2px;left: 18px;">回放</a></div>',
						width : 60,
						stopSelection : false,
						listeners : {
							scope : this,
							checkchange : this.onPLAYBACKCheckChange
						}
					}
				}, {
					name : 'CHNNAME',
					type : 'string',
					gridcol : {
						sortable : true,
						header : SPLanguage.getMessage("TDMC"),
						width : 200
					}
				}, {
					name : 'DEVICENAME',
					type : 'string',
					gridcol : {
						sortable : false,
						header : SPLanguage.getMessage("SBMC"),
						width : 200
					}
				}, {
					name : 'GNAME',
					type : 'string',
					gridcol : {
						sortable : false,
						header : '物理分组名称',
						width : 200
					}
				}, {
					name : 'INDEXID',
					type : 'string',
					gridcol : {
						sortable : false,
						header : '排序序号',
						width : 60
					}
				}];

		// ////////////////////////////////////////////////////////////////////////
		// 工具栏

		this.changeGroup = function(groupid, text) {
			if (vme.lastgroupid != groupid) {
				vme.lastgroupid = groupid;
				vme.store.clearFilter(true);
				vme.store.filter([{
							property : 'GID',
							value : groupid
						}]);
				vme.updateLayout();
				vme.setTitle(text);
			}
		};

		this.refreshChn = function() {
			vme.store.clearFilter(true);
			vme.store.filter([{
						property : 'GID',
						value : vme.lastgroupid
					}]);
			vme.updateLayout();
		};

		this.loadChnRight = function(params) {
			vme.chnRighs = {};
			Ext.Ajax.request({
						url : '../UserManage/GetUserDevChnRight', // 查询案件详细信息
						method : 'post', // 方法
						params : params,
						callback : function(options, success, response) {
							if (success) {
								var v = Ext.JSON.decode(response.responseText);
								vme.initChnRight = true;
								for (var i = 0; i < v.length; i++) {
									vme.chnRighs[v[i].GLOBALID] = v[i];
								}

								for (var i = 0; i < vme.store.getCount(); i++) {
									var rec = vme.store.getAt(i);
									var vright = vme.chnRighs[rec
											.get('GLOBALID')];
									if (vright) {
										if (!rec.get('VIEW')) {
											rec.set('VIEW', true);
										}
										if (rec.get('PTZ') != vright.PTZ) {
											rec.set('PTZ', vright.PTZ);
										}
										if (rec.get('LST') != vright.LST) {
											rec.set('LST', vright.LST);
										}

										if (rec.get('PLAYBACK') != vright.PLAYBACK) {
											rec
													.set('PLAYBACK',
															vright.PLAYBACK);
										}
									} else {
										if (rec.get('VIEW')) {
											rec.set('VIEW', false);
										}
										if (rec.get('PTZ')) {
											rec.set('PTZ', false);
										}
										if (rec.get('LST')) {
											rec.set('LST', false);
										}

										if (rec.get('PLAYBACK')) {
											rec.set('PLAYBACK', false);
										}
									}

								}
							} else {
								alert('获取用户通道权限失败！');
							}
						}
					});
		};

		this.getValues = function() {
			var v = new Array();
			for (var item in vme.chnRighs) {
				if (typeof(vme.chnRighs[item]) != 'function')
					v.push(vme.chnRighs[item]);
			}
			return v;
		};

		this.callParent(arguments);

		this.store.on('datachanged', function(store) {
					for (var i = 0; i < store.getCount(); i++) {
						var rec = store.getAt(i);
						var vchnright = vme.chnRighs[rec.get('GLOBALID')];
						if (typeof vchnright != 'undefined') {
							store.getAt(i).set('VIEW', true);
							store.getAt(i).set('PTZ', vchnright.PTZ);
							store.getAt(i).set('LST', vchnright.LST);
							store.getAt(i).set('PLAYBACK', vchnright.PLAYBACK);
						}
					}
				}, this);
		this.store.on('load', function(store) {
					/*
					 * var vsel = new Array(); for (var i = 0; i <
					 * store.getCount(); i++) { var rec = store.getAt(i); if
					 * (typeof vme.chnRighs[rec.get('GLOBALID')] != 'undefined') {
					 * vsel.push(rec); } } vme.getSelectionModel().select(vsel);
					 */
				}, this);
	},
	afterRender : function() {
		this.callParent();

		var vme = this;
		this.DEVRIGHTVIEW = Ext.get('DEVRIGHTVIEW');
		this.DEVRIGHTVIEW.on('change', function(e, t, eOpts) {
					var v = this.DEVRIGHTVIEW.dom.checked;
					if (v != this.DEVRIGHTVIEW.checked) {
						this.DEVRIGHTVIEW.checked = v;
						for (var i = 0; i < this.store.getCount(); i++) {
							var rec = this.store.getAt(i);
							rec.set('VIEW', v);
							this.onViewCheckChange(null, i, v, null);
						}
					}

				}, this);

		this.DEVRIGHTPTZ = Ext.get('DEVRIGHTPTZ');
		this.DEVRIGHTPTZ.on('change', function(e, t, eOpts) {
					var v = this.DEVRIGHTPTZ.dom.checked;
					if (v != this.DEVRIGHTPTZ.checked) {
						this.DEVRIGHTPTZ.checked = v;
						for (var i = 0; i < this.store.getCount(); i++) {
							var rec = this.store.getAt(i);
							rec.set('PTZ', v);
							this.onPTZCheckChange(null, i, v, null);
						}
					}

				}, this);

		this.DEVRIGHTLST = Ext.get('DEVRIGHTLST');
		this.DEVRIGHTLST.on('change', function(e, t, eOpts) {
					var v = this.DEVRIGHTLST.dom.checked;
					if (v != this.DEVRIGHTLST.checked) {
						this.DEVRIGHTLST.checked = v;
						for (var i = 0; i < this.store.getCount(); i++) {
							var rec = this.store.getAt(i);
							rec.set('LST', v);
							this.onLSTCheckChange(null, i, v, null);
						}
					}

				}, this);

		this.DEVRIGHTPLAYBACK = Ext.get('DEVRIGHTPLAYBACK');
		this.DEVRIGHTPLAYBACK.on('change', function(e, t, eOpts) {
					var v = this.DEVRIGHTPLAYBACK.dom.checked;
					if (v != this.DEVRIGHTPLAYBACK.checked) {
						this.DEVRIGHTPLAYBACK.checked = v;
						for (var i = 0; i < this.store.getCount(); i++) {
							var rec = this.store.getAt(i);
							rec.set('PLAYBACK', v);
							this.onPLAYBACKCheckChange(null, i, v, null);
						}
					}

				}, this);
	},
	// //////////////////////////////////////////////////////////////
	// 清除选择所有
	cleanAllSel : function() {
		var vme = this;
		vme.chnRighs = {};
		for (var i = 0; i < vme.store.getCount(); i++) {
			var rec = vme.store.getAt(i);
			if (rec.get('VIEW')) {
				rec.set('VIEW', false);
			}
			if (rec.get('PTZ')) {
				rec.set('PTZ', false);
			}
			if (rec.get('LST')) {
				rec.set('LST', false);
			}
			if (rec.get('PLAYBACK')) {
				rec.set('PLAYBACK', false);
			}
		}
	},
	onViewCheckChange : function(col, rowIndex, checked, eOpts) {
		if (this.initing)
			return;
		var vme = this;
		var rec = this.store.getAt(rowIndex);
		var vchnright = vme.chnRighs[rec.get('GLOBALID')];
		if (checked) {
			if (typeof vchnright == 'undefined') {
				vme.chnRighs[rec.get('GLOBALID')] = {
					GLOBALID : rec.get('GLOBALID'),
					PTZ : false,
					LST : false,
					PLAYBACK : false
				};
			}
		} else {
			if (typeof vchnright != 'undefined') {
				delete vme.chnRighs[rec.get('GLOBALID')];
				if (rec.get('PTZ'))
					rec.set('PTZ', false);
				if (rec.get('LST'))
					rec.set('LST', false);
				if (rec.get('PLAYBACK'))
					rec.set('PLAYBACK', false);
			}
		}
	},
	onPTZCheckChange : function(col, rowIndex, checked, eOpts) {
		if (this.initing)
			return;
		var vme = this;
		var rec = this.store.getAt(rowIndex);
		var vchnright = vme.chnRighs[rec.get('GLOBALID')];
		if (checked) {
			if (typeof vchnright == 'undefined') {
				rec.set('VIEW', checked);
				vme.chnRighs[rec.get('GLOBALID')] = {
					GLOBALID : rec.get('GLOBALID'),
					PTZ : true,
					LST : false,
					PLAYBACK : false
				};
			} else {
				vchnright.PTZ = true;
			}
		} else {
			if (typeof vchnright != 'undefined') {
				vchnright.PTZ = false;
			}
		}
	},
	onLSTCheckChange : function(col, rowIndex, checked, eOpts) {
		if (this.initing)
			return;
		var vme = this;
		var rec = this.store.getAt(rowIndex);
		var vchnright = vme.chnRighs[rec.get('GLOBALID')];
		if (checked) {
			if (typeof vchnright == 'undefined') {
				rec.set('VIEW', checked);
				vme.chnRighs[rec.get('GLOBALID')] = {
					GLOBALID : rec.get('GLOBALID'),
					PTZ : false,
					LST : true,
					PLAYBACK : false
				};
			} else {
				vchnright.LST = true;
			}
		} else {
			if (typeof vchnright != 'undefined') {
				vchnright.LST = false;
			}
		}
	},
	onPLAYBACKCheckChange : function(col, rowIndex, checked, eOpts) {
		if (this.initing)
			return;
		var vme = this;
		var rec = this.store.getAt(rowIndex);
		var vchnright = vme.chnRighs[rec.get('GLOBALID')];
		if (checked) {
			if (typeof vchnright == 'undefined') {
				rec.set('VIEW', checked);
				vme.chnRighs[rec.get('GLOBALID')] = {
					GLOBALID : rec.get('GLOBALID'),
					PTZ : false,
					LST : false,
					PLAYBACK : true
				};
			} else {
				vchnright.PLAYBACK = true;
			}
		} else {
			if (typeof vchnright != 'undefined') {
				vchnright.PLAYBACK = false;
			}
		}
	},
	searchByChnName : function(chnname) {
		this.store.clearFilter(true);
		this.store.filter([{
					property : 'CHNNAME',
					value : chnname
				}]);
		this.updateLayout();
	},
	cleanAll : function(GID) {
		var vme = this;
		var myMask = new Ext.LoadMask(vme.wizard, {
					msg : '正在获取通道，请稍候！'
				});
		myMask.show();
		Ext.Ajax.request({
					url : '../DevGroup/GetAllChn',
					method : 'post', // 方法
					params : {
						GID : GID
					},
					scope : this,
					callback : function(options, success, response) {
						myMask.hide();
						if (success) {
							var v = Ext.JSON.decode(response.responseText);
							var vcheck = {};
							for (var i = 0; i < v.length; i++) {
								if (vme.chnRighs[v[i]]) {
									delete vme.chnRighs[v[i]];
								}
								vcheck[v[i]] = true;
							}
							vme.initing = true;
							for (var i = 0; i < vme.store.getCount(); i++) {
								var rec = vme.store.getAt(i);
								var vright = vme.chnRighs[rec.get('GLOBALID')];
								if (vcheck[rec.get('GLOBALID')]) {
									if (rec.get('VIEW')) {
										rec.set('VIEW', false);
									}
									if (rec.get('PTZ')) {
										rec.set('PTZ', false);
									}
									if (rec.get('LST')) {
										rec.set('LST', false);
									}

									if (rec.get('PLAYBACK')) {
										rec.set('PLAYBACK', false);
									}
								}

							}
							vme.initing = false;
						} else {
							alert('获取通道失败！');
						}
					}
				});
	},
	selAll : function(GID, ptz) {
		if (typeof ptz == 'undefined')
			ptz = true;
		var vme = this;
		var myMask = new Ext.LoadMask(vme.wizard, {
					msg : '正在获取通道，请稍候！'
				});
		myMask.show();
		Ext.Ajax.request({
					url : '../DevGroup/GetAllChn',
					method : 'post', // 方法
					params : {
						GID : GID
					},
					scope : this,
					callback : function(options, success, response) {
						myMask.hide();
						if (success) {
							var v = Ext.JSON.decode(response.responseText);
							// vme.chnRighs = {};
							for (var i = 0; i < v.length; i++) {
								vme.chnRighs[v[i]] = {
									GLOBALID : v[i],
									PTZ : ptz,
									LST : true,
									PLAYBACK : true
								};
							}
							vme.initing = true;
							for (var i = 0; i < vme.store.getCount(); i++) {
								var rec = vme.store.getAt(i);
								var vright = vme.chnRighs[rec.get('GLOBALID')];
								if (vright) {
									if (!rec.get('VIEW')) {
										rec.set('VIEW', true);
									}
									if (rec.get('PTZ') != vright.PTZ) {
										rec.set('PTZ', vright.PTZ);
									}
									if (rec.get('LST') != vright.LST) {
										rec.set('LST', vright.LST);
									}

									if (rec.get('PLAYBACK') != vright.PLAYBACK) {
										rec.set('PLAYBACK', vright.PLAYBACK);
									}
								} else {
									if (rec.get('VIEW')) {
										rec.set('VIEW', false);
									}
									if (rec.get('PTZ')) {
										rec.set('PTZ', false);
									}
									if (rec.get('LST')) {
										rec.set('LST', false);
									}

									if (rec.get('PLAYBACK')) {
										rec.set('PLAYBACK', false);
									}
								}

							}
							vme.initing = false;
						} else {
							alert('获取通道失败！');
						}
					}
				});
	}
});

Ext.define('App.SystemSetting.UserPage.DevRight', {
	extend : 'App.Common.WizardForm',
	flex : 1,
	width : 600,
	title : SPLanguage.getMessage("GNQXSZ"),
	initComponent : function() {
		this.wizardId = 'devright';

		this.vchnlist = Ext.create('App.SystemSetting.UserPage.DevRight.List',
				{
					width : 360,
					height : '100%',
					url : '../DevGroup/ListGroupChn',
					border : 0
				});

		this.vtree = Ext.create(
				'App.SystemSetting.UserPage.DevRight.groupTree', {
					width : 210,
					height : '100%',
					listeners : {
						scope : this,
						selectionchange : this.onSelectionchange,
						itemcontextmenu : function(tree, record, item, index, e) {
							this.onTreeItemContextMenu(tree, record, e);
							e.stopEvent();
							return false;
						}
					},
					border : 1
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

		this.items = [{
					xtype : 'panel',
					layout : 'hbox',
					border : 1,
					height : 400,
					tbar : [{
								iconCls : 'icon-add',
								text : '选择所有通道',
								scope : this,
								handler : this.onSelAllClick
							}, {
								iconCls : 'icon-add',
								text : '清除选择',
								scope : this,
								handler : this.onCleanAllClick
							}, SPLanguage.getMessage("TDMC"), this.chnname, {
								iconCls : 'icon-find',
								text : SPLanguage.getMessage("JS"),
								scope : this,
								handler : this.onSearchClick
							}],
					items : [this.vtree, this.vchnlist]
				}];
		this.callParent(arguments);

		this.getValues = function() {
			return {
				CHNRIGHTS : this.vchnlist.getValues()
			};
		};
	},
	onSelAllClick : function() {
		this.vchnlist.selAll();
	},
	onCleanAllClick : function() {
		this.vchnlist.cleanAllSel();
	},
	onSearchClick : function() {
		this.vchnlist.searchByChnName(this.chnname.getRawValue());
	},
	onPrev : function() {
		this.wizard.onSetWizardItemActive('functionright');
	},
	onNext : function() {
		this.wizard.onSetWizardItemActive('dwright');
	},
	onWizardActive : function() {
		this.vchnlist.wizard = this.wizard;
		this.wizard.setWizardBtnDisabled('prev', false);
		this.wizard.setWizardBtnDisabled('next', false);
	},
	onSelectionchange : function(tree, selected, eOpts) {
		if (selected.length > 0) {
			this.vchnlist.changeGroup(selected[0].get('id'), selected[0]
							.get('text'));
		}
	},
	onWizardInit : function() {
		if (typeof this.wizard.rightParams != 'undefined')
			this.vchnlist.loadChnRight(this.wizard.rightParams);
		this.vtree.expandNode(this.vtree.getRootNode());
	},
	onTreeItemContextMenu : function(tree, record, e) {
		if (!record)
			return;
		var me = this;
		var GID = record.get('id');
		var contextMenu = Ext.create('Ext.menu.Menu', {
					items : [Ext.create('Ext.Action', {
										iconCls : 'icon-add',
										text : '选中该节点所有通道（包括云台）',
										handler : function(widget, event) {
											me.vchnlist.selAll(GID, true);
										}
									}), Ext.create('Ext.Action', {
										iconCls : 'icon-add',
										text : '选中该节点所有通道（不包括云台）',
										handler : function(widget, event) {
											me.vchnlist.selAll(GID, false);
										}
									}), Ext.create('Ext.Action', {
										iconCls : 'icon-del',
										text : '删除该节点所有通道',
										handler : function(widget, event) {
											me.vchnlist.cleanAll(GID);
										}
									})]
				});

		contextMenu.showAt(e.getXY());
	}
});
