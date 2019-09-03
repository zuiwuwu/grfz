//定义编辑对话框
Ext.define('App.SystemSetting.Dlg.selDWDlgEx', {
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
							name : 'GXDWDM',
							type : 'string'
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
								width : 100
							}
						}]
				var vzd = Ext.CustomDic.getZD('2');
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
							name : '',
							type : 'string',
							gridcol : {
								header : SPLanguage.getMessage("HANDLE"),
								//hidden: true,
								sortable : false,
								xtype : 'actioncolumn',
								flex : 1,
								minWidth : 0,
								items : []
							}
						});

				this.dwname = Ext.create('App.Common.AutoComplete', {
							hideLabel : false,
							fieldLabel : '点位名称',
							labelWidth : 60,
							width : 200,
							url : 'DWMng/GetAutoCompleteList',
							displayField : 'NAME',
							valueField : 'ID',
							cls : 'x-sp-toolbar-left',
							fields : [{
										name : 'ID'
									}, {
										name : 'NAME'
									}]
						});

				this.combDWTYPE = Ext.create('App.Common.ComboBoxDropList', {
							hideLabel : false,
							fieldLabel : '点位类型',
							labelWidth : 60,
							width : 180,
							value : '',
							cls : 'x-sp-toolbar-left',
							url : '../DWMng/GetDWTYPEComboAll'
						});

				this.groupTitle = Ext.create('Ext.draw.Text', {
							text : SPLanguage.getMessage("SYDW")
						});
				//////////////////////////////////////////////////////////////////////////
				//工具栏
				var items = [this.dwname, this.combDWTYPE];

				this.customdics = [];
				for (var i = 0; i < vzd.length; i++) {
					var item = Ext.CustomDic.createInput(vzd[i], {
								cls : 'x-sp-toolbar-left',
								width : 200,
								editable : true,
								labelWidth : 60
							});
					this.customdics.push(item);
					items.push(item);
				}
				items.push({
							xtype : 'button',
							text : SPLanguage.getMessage("SEARCH"),
							tooltip : SPLanguage.getMessage("SEARCH"),
							iconCls : 'icon-find',
							cls : 'x-sp-toolbar-left',
							scope : this,
							handler : this.onSearch
						});

				this.tbar = [{
							xtype : 'container',
							width : '100%',
							layout : 'auto',
							items : items
						}];

				this.listdw = Ext.create('App.Common.ImagePreview', {
							columns : this.columns,
							oldStyle : true,
							url : '../DWMng/ListGroupDW',
							pageitemselectkey : 'DWBH',
							listeners : {
								scope : this,
								select : this.onSelectionChange,
								deselect : this.onSelectionChange
							}
						});

				this.items = [this.listdw];

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
			},
			onSelectionChange : function() {
				var sel = this.listdw.getSelectedItems();

				this.setTitle('点位选择（选中：' + sel.length + '）');
			},
			getFilters : function() {
				var filters = [{
							property : 'DWMC',
							value : this.dwname.getRawValue()
						},
						//            {
						//                property: 'GXDWDM',
						//                value: this.lastGXDWDM
						//            },
						{
							property : 'DWTYPE',
							value : this.combDWTYPE.getValue()
						}];

				for (var i = 0; i < this.customdics.length; i++) {
					filters.push({
								property : this.customdics[i].name,
								value : this.customdics[i].getValue()
							});
				}
				return filters;
			},
			onSearch : function() {
				this.listdw.store.clearFilter(true);
				this.listdw.store.filter(this.getFilters());
			},
			onSave : function() {
				this.fireEvent('saveok', this.listdw.getSelectedString());
				this.close();
			}
		});
