

Ext.define('App.Common.CheckChnTree.SearchField', {
			extend : 'Ext.form.field.Trigger',
			alias : 'widget.searchfield',
			trigger1Cls : 'x-form-clear-trigger',
			//trigger2Cls: 'x-form-search-trigger',
			initComponent : function() {
				var me = this;
				me.callParent(arguments);
				/*
				me.on('specialkey', function (f, e) {
				if (e.getKey() == e.ENTER) {
				me.onTrigger2Click();
				}
				});
				 */
			},
			afterRender : function() {
				this.callParent();
				this.triggerCell.item(0).setDisplayed(false);
			},
			onTrigger1Click : function() {
				var me = this;
				me.setValue('');
				me.triggerCell.item(0).setDisplayed(false);
				me.updateLayout();
			},
			onTrigger2Click : function() {
			}
		});

Ext.define('App.AJZC.RealTraffic.Tree.SearchList', {
			extend : 'Ext.grid.Panel',
			stripeRows : true,
			autoScroll : false,
			border : 0,
			columnLines : true, //显示网格竖线
			rowLines : true,
			hideHeaders : true,
			videochnsearchlist: true,
			initComponent : function() {
				var vme = this;

				this.store = Ext.create('Ext.data.Store', {
							fields : ['NAME', 'ID', 'JKSBBH'],
							autoLoad : false,
							pageSize : 1000,
							remoteFilter : true,
							proxy : {
								type : 'ajax',
								actionMethods : 'post',
								api : {
									read : this.url
								},
								reader : {
									type : 'json',
									root : 'rows',
									successProperty : 'success',
									totalProperty : 'total'
								}
							}
						});

				this.columns = [{
							dataIndex : 'NAME',
							sortable : false,
							header : '通道名',
							flex : 1
						}];
				this.callParent(arguments);

			},
			afterRender : function() {
				this.callParent(arguments);
				//this.el.setStyle('border-radius', '5px 5px 0px 0px');
			},
			getCheckChn : function() {
				var vsel = this.getSelectionModel().getSelection();
				var vchns = new Array();
				for (var i = 0; i < vsel.length; i++) {
					var rec = vsel[i];
					vchns.push({
								id : rec.get('ID'),
								name : rec.get('NAME')
							});
				}
				return vchns;
			},
			getSelectedChn : function() {
				var vsel = this.getSelectionModel().getSelection();
				var vchns = new Array();
				for (var i = 0; i < vsel.length; i++) {
					var rec = vsel[i];
					vchns.push({
								id : rec.get('ID'),
								name : rec.get('NAME')
							});
				}
				return vchns;
			}
		});

Ext.define('App.AJZC.RealTraffic.Tree.chnTree', {
			extend : 'App.Common.MultTree',
			//title: '拓扑结构',
			//animCollapse: true,
			rootVisible : false, //默认不显示根节点
			useArrows : true,
			flex : 1,
			autoScroll : true,
			enableDD : true,
			videochntree: true,
			initComponent : function() {
				this.store = Ext.create('Ext.data.TreeStore', {
							autoLoad : true,
							root : {
								expanded : false
							},
							proxy : {
								type : 'ajax',
								actionMethods : 'post',
								url : this.url,
								reader : {
									type : 'json'
								}
							}
						});
				this.callParent(arguments);
			},
			afterRender : function() {
				this.callParent(arguments);
			},
			getCheckChn : function() {
				var treepanel = this.getChecked();
				var vchns = new Array();
				for (var i = 0; i < treepanel.length; i++) {
					var node = treepanel[i];
					if (node.raw.attributes && node.raw.attributes.TYPE == 1) {
						vchns.push({
									id : node.raw.attributes.GLOBALID,
									name : node.data.text
								});
					}
				}
				return vchns;
			},
			getSelectedChn : function() {
				var vsel = this.getSelectionModel().getSelection();
				var vchns = new Array();
				var pushVchns = function(nodeList) {
					for (var i = 0; i < nodeList.length; i++) {
						var node = nodeList[i];
						if (node.raw.attributes.TYPE == 1) {
							vchns.push({
										id : node.raw.attributes.GLOBALID,
										name : node.data.text
									});
						} else if (node.raw.attributes.TYPE == 0) {
							pushVchns(node.childNodes);
						}
					}
				}
				pushVchns(vsel);
				return vchns;
			}
		});

Ext.define('App.Common.CheckChnTree', {
	extend : 'Ext.panel.Panel',
	border : 0,
	width : 295,
	layout : 'vbox',
	border : 1,
	urlSearch : '../DevMng/GetSearchVideoChn',
	urlGetTree : '../DevGroup/GetVideoChnTree',
	checkBox : true,
	initComponent : function() {
		var vme = this;
		this.addEvents('itemdblclick');
		this.searchchnlist = Ext.create('App.AJZC.RealTraffic.Tree.SearchList',
				{
					border : 0,
					viewConfig : this.searchViewConfig,
					url : this.urlSearch,
					selType : this.checkBox ? 'checkboxmodel' : 'rowmodel',
					listeners : {
						scope : this,
						selectionchange : function(grid, selected, eOpts) {

						},
						itemdblclick : function(grid, record) {
							var chn = {
								GLOBALID : record.get('ID'),
								CHNNAME : record.get('NAME')
							};
							this.fireEvent('itemdblclick', chn);
						}
					}
				});
		this.searchchnlist.store.on('load', function(store) {

				}, this);

		this.chntree = Ext.create('App.AJZC.RealTraffic.Tree.chnTree', {
					border : 0,
					url : this.urlGetTree,
					viewConfig : this.treeViewConfig,
					listeners : {
						scope : this,
						selectionchange : function(grid, selected, eOpts) {

						},
						itemdblclick : function(grid, record) {
							if (record.raw.attributes
									&& record.raw.attributes.TYPE == 1) {
								var chn = {
									GLOBALID : record.raw.attributes.GLOBALID,
									CHNNAME : record.get('text')
								};
								this.fireEvent('itemdblclick', chn);
							}

						}
					}
				});

		this.chnpanel = Ext.create('Ext.container.Container', {
					border : 0,
					layout : 'card',
					flex : 1,
					width : '100%',
					items : [this.chntree, this.searchchnlist]
				});

		this.searchtext = Ext.create('App.Common.CheckChnTree.SearchField', {
					y : 60,
					x : 28,
					width : '100%',
					height : 20,
					border : false,
					fieldStyle : {
						border : 0
					},
					emptyText : '请输入查询关键字',
					name: 'SEARCHTEXT',
					listeners : {
						scope : this,
						change : function(textedit, newValue, oldValue, eOpts) {
							if (newValue.length > 0) {
								vme.searchtext.triggerCell.item(0)
										.setDisplayed(true);
							} else {
								vme.searchtext.triggerCell.item(0)
										.setDisplayed(false);
							}
							if (oldValue != newValue) {
								if (vme.searchtimerid) {
									clearTimeout(vme.searchtimerid);
									vme.searchtimerid = null;
								}
								vme.searchtimerid = setTimeout(function() {
											vme.searchtimerid = null;
											if (newValue == ''
													|| newValue == null
													|| typeof newValue == 'undifined') {
												vme.searchchnlist.selchn = {};
												vme.chnpanel.getLayout()
														.setActiveItem(0);
											} else {
												vme.searchchnlist.selchn = {};
												vme.searchchnlist.store
														.clearFilter(true);
												vme.searchchnlist.store
														.filter([{
																	property : 'query',
																	value : newValue
																}]);
												vme.searchchnlist
														.updateLayout();
												vme.chnpanel.getLayout()
														.setActiveItem(1);
											}
										}, 500);
							}
						}
					}
				});

		this.items = [this.searchtext, this.chnpanel];
		this.callParent(arguments);
	},
	getSelectedChn : function() {
		if (this.chntree.isVisible()) {
			return this.chntree.getSelectedChn();
		} else {
			return this.searchchnlist.getSelectedChn();
		}
	},
	getSelectedItems : function() {
		if (this.chntree.isVisible()) {
			return this.chntree.getSelectionModel().getSelection();
		} else {
			return this.searchchnlist.getSelectionModel().getSelection();
		}
	},
	getCheckedChn : function() {
		if (this.chntree.isVisible()) {
			return this.chntree.getCheckChn();
		} else {
			return this.searchchnlist.getCheckChn();
		}
	},
	selectNextItem:function(item)
	{
		if (this.chntree.isVisible()) {
			if(item.nextSibling)
				this.chntree.getSelectionModel().select(item.nextSibling);
		} else {
				var vindex = this.searchchnlist.store.indexOf(item);
				vindex ++;
				if(vindex <  this.searchchnlist.store.getCount())
					this.searchchnlist.getSelectionModel().select(this.searchchnlist.store.getAt(vindex));
		}
		
	}
});
