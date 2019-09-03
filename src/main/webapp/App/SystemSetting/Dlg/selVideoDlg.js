//定义编辑对话框
Ext.define('App.SystemSetting.Dlg.selVideoDlg', {
	extend : 'Ext.window.Window',
	layout : 'fit',
	modal : true,
	title : '通道选择',
	width : 700,
	height : 500,
	bodyPadding : 10,
	treeUrl : '../DevGroup/GetVideoChnTree',
	gridurl : '../GISPoliceCar/listSelChn',
	sortable: true,
	initComponent : function() {
		var me = this;
		this.addEvents('saveok');
		var vme = this;

		var rootNode = {
			expanded : true,
			text : '',
			id : -1,
			leaf : false
		};
		this.store = Ext.create('Ext.data.TreeStore', {
					autoLoad : true,
					root : rootNode,
					nodeParam : 'id',
					proxy : {
						type : 'ajax',
						actionMethods : 'post',
						url : this.treeUrl,
						reader : {
							type : 'json'
						}
					}
				});

		this.dwtree = Ext.create('App.Common.MultTree', {
					rootVisible : false, //默认不显示根节点
					useArrows : true,
					autoScroll : true,
					enableDD : false,
					flex : 1,
					width : '100%',
					store : this.store,
					listeners : {
						scope : this,
						itemdblclick : function(tree, record, item, index, e,
								eOpts) {
							this.AddItem(record);
						}
					}
				});

		this.columns = [{
					name : '',
					type : 'string',
					gridcol : {
						sortable : false,
						autoSizable : true,
						xtype : 'rownumberer',
						header : '序号',
						width : 60
					}
				}, {
					name : 'GLOBALID',
					type : 'string'
				}, {
					name : 'CHNNAME',
					type : 'string',
					gridcol : {
						header : '名称',
						sortable : false,
						flex : 1
					}
				}];
		this.dwlist = Ext.create('App.Common.ImagePreview', {
					height : '100%',
					flex : 1,
					gridpageSize : 10000,
					showBarPager : false,
					oldStyle : true,
					gridautoLoad : false,
					//selType: 'rowmodel',
					url : this.gridurl,
					columns : this.columns
				});

		this.items = [{
			xtype : 'container',
			flex : 1,
			width : '100%',
			layout : 'hbox',
			items : [{
						xtype : 'container',
						layout : 'vbox',
						width : 230,
						height : '100%',
						items : [this.dwtree]
					}, {
						xtype : 'container',
						height : '100%',
						margins : '0 4',
						layout : {
							type : 'vbox',
							pack : 'center'
						},
						items : [{
							xtype : 'button',
							tooltip : '',
							handler : vme.onBtnTop,
							scope : this,
							cls : Ext.baseCSSPrefix + 'form-itemselector-btn',
							iconCls : Ext.baseCSSPrefix
									+ 'form-itemselector-top',
							navBtn : true,
							margin : '4 0 0 0',
							hidden: !this.sortable
						}, {
							xtype : 'button',
							tooltip : '',
							handler : vme.onBtnUp,
							cls : Ext.baseCSSPrefix + 'form-itemselector-btn',
							iconCls : Ext.baseCSSPrefix
									+ 'form-itemselector-up',
							navBtn : true,
							scope : this,
							margin : '4 0 0 0',
							hidden: !this.sortable
						}, {
							xtype : 'button',
							tooltip : '',
							handler : vme.onBtnAdd,
							cls : Ext.baseCSSPrefix + 'form-itemselector-btn',
							iconCls : Ext.baseCSSPrefix
									+ 'form-itemselector-add',
							navBtn : true,
							scope : this,
							margin : '4 0 0 0'
						}, {
							xtype : 'button',
							tooltip : '',
							handler : vme.onBtnRemove,
							cls : Ext.baseCSSPrefix + 'form-itemselector-btn',
							iconCls : Ext.baseCSSPrefix
									+ 'form-itemselector-remove',
							navBtn : true,
							scope : this,
							margin : '4 0 0 0'
						}, {
							xtype : 'button',
							tooltip : '',
							handler : vme.onBtnDown,
							cls : Ext.baseCSSPrefix + 'form-itemselector-btn',
							iconCls : Ext.baseCSSPrefix
									+ 'form-itemselector-down',
							navBtn : true,
							scope : this,
							margin : '4 0 0 0',
							hidden: !this.sortable
						}, {
							xtype : 'button',
							tooltip : '',
							handler : vme.onBtnBottom,
							cls : Ext.baseCSSPrefix + 'form-itemselector-btn',
							iconCls : Ext.baseCSSPrefix
									+ 'form-itemselector-bottom',
							navBtn : true,
							scope : this,
							margin : '4 0 0 0',
							hidden: !this.sortable
						}]
					}, this.dwlist]
		}];

		this.buttons = [{
					text : '确定',
					action : 'save',
					scope : this,
					handler : this.onSave
				}, {
					text : '取消',
					scope : this,
					handler : function() {
						//this.fireEvent('close', this);
						this.close();
					}
				}];
		this.callParent(arguments);
	},
	afterRender : function() {
		this.callParent(arguments);
		var store = this.dwlist.store;
		if(!this.filters)
		{
			 this.filters = [{
                property: 'ID',
                value: this.SELID
            }];
			
		}
		store.clearFilter(true);
			store.filter(this.filters);
		
	},
	getChildChn : function(grid, curnode, arraydw) {
		curnode.eachChild(function(child) {
					if (child.data.leaf)
						arraydw.push(child.raw);
					else
						grid.getChildChn(grid, child, arraydw);
				});
	},
	onBtnAdd : function() {
		var vsel = this.dwtree.getSelectionModel().getSelection();
		this.AddItem(vsel);
	},
	AddItem : function(vsel) {
		if (!vsel)
			return;
		if (!Ext.isArray(vsel))
			vsel = [vsel];
		var v = [];
		if (vsel.length != 0) {
			if (vsel[0].data.leaf)
				v.push(vsel[0].raw);
			else
				this.getChildChn(this, vsel[0], v);
		}

		var store = this.dwlist.store;
		var a = [];
		for (var i = 0; i < v.length; i++) {
			var b = false;
			for (var j = 0; j < store.getCount(); j++) {
				if (store.getAt(j).get('GLOBALID') == v[i].attributes.GLOBALID) {
					b = true;
					break;
				}

			}
			if (!b)
				a.push({
							GLOBALID : v[i].attributes.GLOBALID,
							CHNNAME : v[i].text
						});
		}
		this.dwlist.store.add(a);
	},
	onBtnRemove : function() {
		var vsel = this.dwlist.getSelectionModel().getSelection();
		this.dwlist.store.remove(vsel);
	},
	onBtnTop : function() {
		var store = this.dwlist.store;
		var selected = this.dwlist.getSelectionModel().getSelection();
		store.suspendEvents();
		store.remove(selected, true);
		store.insert(0, selected);
		store.resumeEvents();
		this.dwlist.getView().refresh();
	},
	onBtnUp : function() {
		var store = this.dwlist.store, selected = this.dwlist
				.getSelectionModel().getSelection(), rec, i = 0, len = selected.length, index = 0;
		store.suspendEvents();
		for (; i < len; ++i, index++) {
			rec = selected[i];
			index = Math.max(index, store.indexOf(rec) - 1);
			store.remove(rec, true);
			store.insert(index, rec);
		}
		store.resumeEvents();
		this.dwlist.getView().refresh();
	},
	onBtnDown : function() {
		var store = this.dwlist.store, selected = this.dwlist
				.getSelectionModel().getSelection(), rec, i = selected.length
				- 1, index = store.getCount() - 1;

		// Move each selection down by one place if possible
		store.suspendEvents();
		for (; i > -1; --i, index--) {
			rec = selected[i];
			index = Math.min(index, store.indexOf(rec) + 1);
			store.remove(rec, true);
			store.insert(index, rec);
		}
		store.resumeEvents();
		this.dwlist.getView().refresh();
	},
	onBtnBottom : function() {
		var store = this.dwlist.store;
		var selected = this.dwlist.getSelectionModel().getSelection();
		store.suspendEvents();
		store.remove(selected, true);
		store.add(selected);
		store.resumeEvents();
		this.dwlist.getView().refresh();
	},
	onSave : function() {
		var vme = this;
		var store = this.dwlist.store;
		var vchns = '';
		for (var j = 0; j < store.getCount(); j++) {
			if (vchns != '')
				vchns += ',';
			vchns += store.getAt(j).get('GLOBALID');
		}
		var myMask = new Ext.LoadMask(vme, {
					msg : "正在保存，请稍候！"
				});
		myMask.show();
		Ext.Ajax.request({
					url : vme.saveurl, //请求地址  
					params : {
						ID : this.SELID,
						CHNS : vchns
					},
					method : 'post', //方法  
					callback : function(options, success, response) {
						myMask.hide();
						if (success) {
							var result = Ext.JSON.decode(response.responseText);
							if (result.success) {
								vme.fireEvent('saveok', vme);
								vme.close();

							} else {
								alert(result.msg);
							}
						} else {
							alert("网络错误！");
						}
					}
				});
	}
});
