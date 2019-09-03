Ext.define('App.SystemSetting.RoleUserMng', {
	extend : 'Ext.Window',
	width : 800,
	height : 500,
	title : '角色用户管理',
	modal : true,
	layout : 'fit',
	initComponent : function() {
		var vme = this;

		this.username = Ext.create('App.Common.AutoComplete', {
					hideLabel : true,
					width : 100,
//					url : '../UserManage/GetAutoCompleteList',
					displayField : 'USERNAME',
					valueField : 'USERID',
					fields : [{
								name : 'USERID',
								mapping : function(raw) {
									return raw.USERID;
								}
							}, {
								name : 'USERNAME',
								mapping : function(raw) {
									var result = raw.USERNAME;
									return result;
								}
							}, {
								name : 'DESCRIPTION'
							}]
				});
		this.UNITS = Ext.create('App.Common.ComboBoxDropList', {
					width : 160,
					editable : true,
//					url : '../UNIT/GetUNITCombo'
				});

		//////////////////////////////////////////////////////////////////////////
		//工具栏
		this.tbar = [SPLanguage.getMessage("USERNAME"), this.username, '单位',
				this.UNITS, {
					xtype : 'button',
					text : SPLanguage.getMessage("SEARCH"),
					tooltip : SPLanguage.getMessage("SEARCH"),
					iconCls : 'icon-find',
					scope : this,
					handler : this.onSearch
				}];

		this.vuserlist = Ext.create('App.Common.ImagePreview', {
					flex : 1,
					height : '100%',
					title : '用户1234',
					gridautoLoad : false,
					showProgressBarPager : false,
					oldStyle : true,
					//selType: 'rowmodel',
					url : '../JBXXGL/getJBGLLists',
					columns : [{
								name : '',
								type : 'string',
								gridcol : {
									sortable : false,
									xtype : 'rownumberer',
									header : SPLanguage.getMessage("SERIALNUM"),
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
									header : SPLanguage.getMessage("USERNAME"),
									flex : 1
								}
							}]
				});

		this.vroleuserList = Ext.create('App.Common.ImagePreview', {
					title : '角色用户',
					height : '100%',
					flex : 1,
//					url : '../RoleMng/ListRoleUser',
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
									header : SPLanguage.getMessage("SERIALNUM"),
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
									header : SPLanguage.getMessage("USERNAME"),
									flex : 1
								}
							}, {
								name : 'DESCRIPTION',
								type : 'string',
								gridcol : {
									sortable : true,
									header : SPLanguage.getMessage("ZSXM"),
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
			vusers[rec.get('USERID')] = true;
		}
		var v = [];
		for (var i = 0; i < vsel.length; i++) {
			if (!vusers[vsel[i].get('USERID')]) {
				v.push({
							USERID : vsel[i].get('USERID'),
							USERNAME : vsel[i].get('USERNAME'),
							DESCRIPTION : vsel[i].get('DESCRIPTION')
						});
			}
		}
		store.add(v);
	},
	onBtnRemove : function() {
		var vsel = this.vroleuserList.getSelectionModel().getSelection();
		if (vsel.length == 0)
			return;
		this.vroleuserList.store.remove(vsel);
	},
	onSearch : function() {
		this.vuserlist.store.clearFilter(true);
		this.vuserlist.store.filter([{
					property : 'username',
					value : this.username.getRawValue()
				}, {
					property : 'UNITNAME',
					value : this.UNITS.getRawValue()
				}]);
		this.vuserlist.updateLayout();
	},
	onSave : function() {
		var vme = this;
		var store = this.vroleuserList.store;
		var vusers = '';
		for (var i = 0; i < store.getCount(); i++) {
			var rec = store.getAt(i);
			if (vusers != '')
				vusers += ',';
			vusers += rec.get('USERID');
		}
		var myMask = new Ext.LoadMask(vme, {
					msg : "正在保存，请稍候！"
				});
		myMask.show();
		Ext.Ajax.request({
					url : '../RoleMng/AddUser',
					params : {
						ROLEID : this.ROLEID,
						USERS : vusers
					},
					method : 'post', //方法  
					callback : function(options, success, response) {
						myMask.hide();
						if (success) {
							var result = Ext.JSON.decode(response.responseText);
							if (result.success) {
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
