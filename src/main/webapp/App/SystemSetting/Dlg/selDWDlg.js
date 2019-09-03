//定义编辑对话框
Ext.define('App.SystemSetting.Dlg.selDWDlg', {
			extend : 'Ext.window.Window',
			layout : 'fit',
			modal : true,
			title : '点位选择',
			width : 700,
			height : 500,
			bodyPadding : 10,
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
								url : '../DWGroup/GetGroupRoadTree?checkbox=false',
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
							store : this.store
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
							name : 'id',
							type : 'string'
						}, {
							name : 'text',
							type : 'string',
							gridcol : {
								header : '点位名称',
								sortable : false,
								flex : 1
							}
						}];
				this.dwlist = Ext.create('App.Common.ImagePreview', {
							height : '100%',
							flex : 1,
							showBarPager : false,
							oldStyle : true,
							gridautoLoad : false,
							//selType: 'rowmodel',
							url : this.geturl,
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
									handler : vme.onBtnAdd,
									cls : Ext.baseCSSPrefix
											+ 'form-itemselector-btn',
									iconCls : Ext.baseCSSPrefix
											+ 'form-itemselector-add',
									navBtn : true,
									scope : this,
									margin : '4 0 0 0'
								}, {
									xtype : 'button',
									tooltip : '',
									handler : vme.onBtnRemove,
									cls : Ext.baseCSSPrefix
											+ 'form-itemselector-btn',
									iconCls : Ext.baseCSSPrefix
											+ 'form-itemselector-remove',
									navBtn : true,
									scope : this,
									margin : '4 0 0 0'
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
				if (this.seldws) {
					this.dwlist.store.add(this.seldws);
				} else if (this.geturl) {
					var store = this.dwlist.store;
					store.clearFilter(true);
					store.filter(this.filters);
				}
			},
			getChildDW : function(grid, curnode, arraydw) {
				curnode.eachChild(function(child) {
							if (child.data.leaf)
								arraydw.push(child.raw);
							else
								grid.getChildDW(grid, child, arraydw);
						});
			},
			onBtnAdd : function() {
				var nextsel = [];
				var vsel = this.dwtree.getSelectionModel().getSelection();
				var v = [];
				if (vsel.length != 0) {
					if (vsel[0].data.leaf)
					{
						v.push(vsel[0].raw);
						nextsel.push(vsel[0].nextSibling);
					}
					else
						this.getChildDW(this, vsel[0], v);
				}

				var store = this.dwlist.store;
				var a = [];
				for (var i = 0; i < v.length; i++) {
					var b = false;
					for (var j = 0; j < store.getCount(); j++) {
						if (store.getAt(j).get('id') == v[i].id) {
							b = true;
							break;
						}

					}
					if (!b)
						a.push(v[i]);
				}
				this.dwlist.store.add(a);
				
				if(nextsel.length > 0)
				{
					this.dwtree.getSelectionModel().select(nextsel);
				}
			},
			onBtnRemove : function() {
				var vsel = this.dwlist.getSelectionModel().getSelection();
				var index = -1;
				if(vsel.length > 0)
					index = this.dwlist.store.indexOf(vsel[0]);
				this.dwlist.store.remove(vsel);
				if(index > 0)
				{
					if(index < this.dwlist.store.getCount())
					{
						this.dwlist.getSelectionModel().select([ this.dwlist.store.getAt(index)]);
					}
					else if(this.dwlist.store.getCount() > 0)
					{
						this.dwlist.getSelectionModel().select([ this.dwlist.store.getAt(this.dwlist.store.getCount() - 1)]);
					}
				}
			},
			onSave : function() {
				var vme = this;
				var store = this.dwlist.store;
				if (this.saveurl) {
					var vchns = '';
					for (var j = 0; j < store.getCount(); j++) {
						if (vchns != '')
							vchns += ',';
						vchns += store.getAt(j).get('id');
					}
					var myMask = new Ext.LoadMask(vme, {
								msg : "正在保存，请稍候！"
							});
					myMask.show();
					Ext.Ajax.request({
								url : vme.saveurl, //请求地址  
								params : {
									ID : this.SELID,
									DWS : vchns
								},
								method : 'post', //方法  
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var result = Ext.JSON
												.decode(response.responseText);
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
				} else {
					var a = [];
					for (var j = 0; j < store.getCount(); j++) {
						a.push(store.getAt(j).raw);
					}
					vme.fireEvent('saveok', a);
					vme.close();
				}
			}
		});
