Ext.define('App.grczpt.xxgl.point.RoleUserMng', {
	extend : 'Ext.Window',
	width : 850,
	height : 500,
	id : 'ss',
	title : '角色用户管理',
	modal : true,
	layout : 'fit',
	initComponent : function() {
		var vme = this;

		this.fuzzy = Ext.create('Ext.form.field.Text', {
			emptyText : '模糊查询',
			width : 200
		});
		/*this.UNITS = Ext.create('App.Common.ComboBoxDropList', {
					width : 160,
					editable : true,
//					url : '../UNIT/GetUNITCombo'
				});*/

		//////////////////////////////////////////////////////////////////////////
		//工具栏
		this.tbar = ["用户名", this.fuzzy,{
					xtype : 'button',
					text : "查询",
					tooltip : "SEARCH",
					iconCls : 'icon-find',
					scope : this,
					handler : this.onSearch
				}];

		this.vuserlist = Ext.create('App.Common.ImagePreview', {
					flex : 1,
					height : '100%',
					title : '用户',
					gridautoLoad : false,
					showProgressBarPager : false,
					oldStyle : true,
					//selType: 'rowmodel',
					url : '../roleuser/getUsersLists',
					columns : [{
								name : '',
								type : 'string',
								gridcol : {
									sortable : false,
									xtype : 'rownumberer',
									header : "序号",
									width : 60
								}
							}, {
								name : 'JBXXDABH',
								type : 'string'
							}, {
								name : 'XM',
								type : 'string',
								gridcol : {
									sortable : true,
									header : "用户",
									flex : 1
								}
							}]
				});

		this.vroleuserList = Ext.create('App.Common.ImagePreview', {
					title : '角色用户',
					height : '100%',
					flex : 1,
					url : '../roleuser/getLists?ROLEID='+this.ROLEID,
					gridautoLoad : false,
					showBarPager : false,
					oldStyle : true,
					//selType: 'rowmodel',
					columns : [{
								name : '',
								type : 'string',
								gridcol : {
									sortable : false,
									xtype : 'rownumberer',
									header : "序号",
									width : 60
								}
							}, {
								name : 'USERID',
								type : 'string'
							}, {
								name : 'USERNAME',
								type : 'string',
								gridcol : {
									sortable : true,
									header : "用户",
									flex : 1
								}
							}]
				});

		

			 
		this.items = [{
			xtype : 'container',
			layout : 'hbox',
			items : [this.vuserlist, {
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
							cls : Ext.baseCSSPrefix + 'form-itemselector-btn',
							iconCls : Ext.baseCSSPrefix
									+ 'form-itemselector-adds',
							navBtn : true,
							scope : this,
							margin : '4 0 0 0'
						}, {
							xtype : 'button',
							tooltip : '',
							handler : vme.onBtnRemove,
							cls : Ext.baseCSSPrefix + 'form-itemselector-btn',
							iconCls : Ext.baseCSSPrefix
									+ 'form-itemselector-removes',
							navBtn : true,
							scope : this,
							margin : '4 0 0 0'
						}]
			}, this.vroleuserList]
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
						vme.close();
					}
				}];
		this.callParent(arguments);
	},
	afterRender : function() {
		this.callParent(arguments);
		if (this.ROLEID) {
			this.vroleuserList.store.clearFilter(true);
			this.vroleuserList.store.filter([{
						property : 'ROLEID',
						value : this.ROLEID
					}]);
			this.vroleuserList.updateLayout();
		}
		this.onSearch();
	},
	onBtnAdd : function() {
		var vsel = this.vuserlist.getSelectionModel().getSelection();
		if (vsel.length == 0)
			return;
		var store = this.vroleuserList.store;
		var vusers = {};
		for (var i = 0; i < store.getCount(); i++) {
			var rec = store.getAt(i);
			vusers[rec.get('JBXXDABH')] = true;
		}
		var v = [];
		for (var i = 0; i < vsel.length; i++) {
			if (!vusers[vsel[i].get('JBXXDABH')]) {
				v.push({
							USERID : vsel[i].get('JBXXDABH'),
							USERNAME : vsel[i].get('XM'),
							
						});
			}
		}
		store.add(v);
	},
	onBtnRemove : function() {
		this.vchns = '';
		var vsel = this.vroleuserList.getSelectionModel().getSelection();
		if (vsel.length == 0)
			return;
		this.vroleuserList.store.remove(vsel);
		if (vsel.length > 0) {			
			for (var i = 0; i < vsel.length; i++) {
				if (this.vchns != '')
					this.vchns += ',';
				this.vchns += vsel[i].data.USERID;				
			}
		}
		console.log(this.vchns)
	},
	onSearch : function() {
		this.vuserlist.store.clearFilter(true);
		this.vuserlist.store.filter([{
					property : 'fuzzy',
					value : this.fuzzy.getRawValue()
				}]);
		console.log(this.fuzzy.getRawValue())
		this.vuserlist.updateLayout();
	},
	onSave : function() {
		debugger
		var vme = this;
		var store = this.vroleuserList.store;
		var vusers = '';
		var name = '';
		for (var i = 0; i < store.getCount(); i++) {
			var rec = store.getAt(i);
			if (vusers != '')
				vusers += ',';
			vusers += rec.get('USERID');
		}
		for (var i = 0; i < store.getCount(); i++) {
			var rec = store.getAt(i);
			if (name != '')
				name += ',';
			name += rec.get('USERNAME');
		}
		
		/*var myMask = new Ext.LoadMask(vme, {
					msg : "正在保存，请稍候！"
				});
		myMask.show();*/
		Ext.Ajax.request({
					url : '../roleuser/addField',
					params : {
						NAME : name,
						ID : vusers,
						REMOVID : this.vchns,
						ROLEID : this.ROLEID,
					},
					method : 'post', //方法  
					success:function(){
						Ext.Msg.alert("成功","设置成功！");
 					}
				});
		vme.close();
	}
});
