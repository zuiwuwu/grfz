Ext.define('App.grczpt.xxgl.UserPage.DevRight.groupTree', {
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
								url : '../dictionarys/listsyjbTree',
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

Ext.define('App.grczpt.xxgl.UserPage.DevRight.List', {
	extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    showProgressBarPager: false,
    lastgroupid: 0,
    header: false,
    gridautoLoad: false,
    chnRighs : {},
    gridpageSize: 14,
    selType : 'rowmodel',
    oldStyle: true,
	initComponent : function() {
		var vme = this;
		vme.chnRighs = {};
		this.columns = [{
					name : '',
					type : 'string',
					gridcol : {
						sortable : false,
						xtype : 'rownumberer',
						header : '序号',
						width : 60
					}
				}, {
					name : 'GROWID',
					type : 'string'
				},{
					name : 'VIEW',
					type : 'bool',
					gridcol : {
						sortable : false,
						xtype : 'checkcolumn',
						header : '<div style="position:relative;height: 13px;width: 40px;top: -2px;"><input type="checkbox" id="DEVRIGHTVIEW" style="position:absolute;top: 0px;left: 0px;"/><a style="position:absolute;top: 2px;left: 18px;">选中</a></div>',
						width : 60,
						stopSelection : false,
						listeners : {
							scope : this,
							checkchange : this.onViewCheckChange
						}
					}
				},  {
					name : 'EVENTNAME',
					type : 'string',
					gridcol : {
						sortable : false,
						header : '事件名称',
						width : 150
					}
				}, {
					name : 'EVENTTYPE',
					type : 'string',
					gridcol : {
						sortable : false,
						header : '事件类型',
						width : 150
					}
				},{
			     	   name: '',
			           type: 'string',
			           gridcol: {
			               header: '编辑',
			               sortable: false,
			               xtype: 'actioncolumn',
			               flex: 1,
			               minWidth: 100,
			               items: [{
			            	   iconCls: 'icon-add',
			            	   tooltip : '添加用户',	
							   text:'添加用户',	
			                   scope: this,
			                   width:50,
			                   handler: function (grid, rowIndex, colIndex) {
			                       var rec = grid.getStore().getAt(rowIndex);
			                       console.log(rec.data.GROWID)
			                       Ext.create('App.grczpt.xxgl.point.RoleUserMng', {
			                    	   ROLEID : rec.data.GROWID      
			                    	    
			   						}).show();
			                   }
			               },{
			            	   iconCls: 'icon-add',
			            	   tooltip : '积分设置',	
							   text:'积分设置',	
							   width:50,
			                   scope: this,
			                   handler: function (grid, rowIndex, colIndex) {
			                       var rec = grid.getStore().getAt(rowIndex);
			                       console.log(rec.data.GROWID)
			                       Ext.create('App.grczpt.xxgl.UserPage.JiFen1', {
			                    	   ROLEID : rec.data.GROWID      
			                    	    
			   						}).show();
			                   }
			               }]
			           }
			        }];

		// ////////////////////////////////////////////////////////////////////////
		// 工具栏

		this.changeGroup = function(groupid, text) {
			if (vme.lastgroupid != groupid) {
				vme.lastgroupid = groupid;
				vme.store.clearFilter(true);
				vme.store.filter([{
							property : 'EVENTTYPE',
							value : text
						}]);
				vme.updateLayout();
				vme.setTitle(text);
			}
		};

		this.refreshChn = function() {
			vme.store.clearFilter(true);
			vme.store.filter([{
						property : 'GROWID',
						value : vme.lastgroupid
					}]);
			vme.updateLayout();
		};

/*		this.loadChnRight = function(params) {
			vme.chnRighs = {};*/
/*			Ext.Ajax.request({
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
					});*/
//		};

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
						var vchnright = vme.chnRighs[rec.get('GROWID')];
						if (typeof vchnright != 'undefined') {
							store.getAt(i).set('VIEW', true);
							
						}
					}
				}, this);
		this.store.on('load', function(store) {

					  var vsel = new Array(); 
					  for (var i = 0; i <store.getCount(); i++) { 
						  var rec = store.getAt(i); 
						  if(typeof vme.chnRighs[rec.get('GROWID')] != 'undefined') {
							  vsel.push(rec); 
						  } } 
					  console.log(vsel)
					  	vme.getSelectionModel().select(vsel);
					 
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

	},
	cleanAllSel : function() {
		var vme = this;
		vme.chnRighs = {};
		for (var i = 0; i < vme.store.getCount(); i++) {
			var rec = vme.store.getAt(i);
			if (rec.get('VIEW')) {
				rec.set('VIEW', false);
			}
		
			
		}
	},
	onViewCheckChange : function(col, rowIndex, checked, eOpts) {
		if (this.initing)
			return;
		var vme = this;
		var rec = this.store.getAt(rowIndex);
		var vchnright = vme.chnRighs[rec.get('GROWID')];
		if (checked) {
			if (typeof vchnright == 'undefined') {
				vme.chnRighs[rec.get('GROWID')] = {
						GROWID : rec.get('GROWID'),
//						EVENTNAME : rec.get('EVENTNAME')
				};
			}
		} else {
			if (typeof vchnright != 'undefined') {
				delete vme.chnRighs[rec.get('GROWID')];
				
			}
		}
	},

});

Ext.define('App.grczpt.xxgl.UserPage.DevRight', {
	extend : 'App.Common.WizardForm',
	flex : 1,
	width : 700,
	title : "关联设置",
	initComponent : function() {
		this.wizardId = 'devright';
		var ss = '1231';
		
		this.vchnlist = Ext.create('App.grczpt.xxgl.UserPage.DevRight.List',
				{
					width : 500,
					height : '100%',
					url : '../growevent/getLists',
					border : 0
				});

		this.vtree = Ext.create(
				'App.grczpt.xxgl.UserPage.DevRight.groupTree', {
					width : 150,
					height : '100%',
					listeners : {
						scope : this,
						selectionchange : this.onSelectionchange,
						/*itemcontextmenu : function(tree, record, item, index, e) {
							this.onTreeItemContextMenu(tree, record, e);
							e.stopEvent();
							return false;
						}*/
					},
					border : 1
				});

		this.fuzzy = Ext.create('Ext.form.field.Text', {
			emptyText : '模糊查询',
			width : 200
		});

		this.items = [{
					xtype : 'panel',
					layout : 'hbox',
					border : 1,
					height : 400,
					tbar : [{
								iconCls : 'icon-add',
								margin : '0 0 0 10',
								text : '清除选择',
								scope : this,
								handler : this.onCleanAllClick
							}, "事件名称", this.fuzzy, {
								iconCls : 'icon-find',
								text : "搜索",
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
			console.log(CHNRIGHTS)
		};
	},
	onSelAllClick : function() {
		this.vchnlist.selAll();
	},
	onCleanAllClick : function() {
		this.vchnlist.cleanAllSel();
	},
	onSearchClick : function() {
		var store = this.vchnlist.store;
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
	onPrev : function() {
		this.wizard.onSetWizardItemActive('righttypesel');
	},
	onNext : function() {

		this.wizard.onSetWizardItemActive('jifen');
	},
	onWizardActive : function() {
		this.vchnlist.wizard = this.wizard;
		this.wizard.setWizardBtnDisabled('prev', false);
		this.wizard.setWizardBtnDisabled('next', true);
	},
	onSelectionchange : function(tree, selected, eOpts) {
		if (selected.length > 0) {
			this.vchnlist.changeGroup(selected[0].get('id'), selected[0]
							.get('text'));
		}
	},
	onWizardInit : function() {
		/*if (typeof this.wizard.rightParams != 'undefined')
			this.vchnlist.loadChnRight(this.wizard.rightParams);*/
		this.vtree.expandNode(this.vtree.getRootNode());
	},
/*	onTreeItemContextMenu : function(tree, record, e) {
		if (!record)
			return;
		var me = this;
		
		console.log(record)
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
	}*/
});
