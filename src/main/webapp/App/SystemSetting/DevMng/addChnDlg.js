Ext.define('App.SystemSetting.DevMng.addChnDlg', {
			extend : 'Ext.window.Window',
			title : SPLanguage.getMessage("TJYH"),
			layout : 'fit',
			modal : true,
			devname : '',
			width : 600,
			height : 300,
			maximizable : true,
			requires : ['App.Common.HyperLinkColumn'],
			initComponent : function() {
				this.title = '添加通道（' + this.devname + '）';
				var vme = this;
				this.addEvents('saveok');
				this.columns = [{
							name : 'CHNID',
							type : 'string'
						}, {
							name : 'CHNTYPE',
							type : 'string'

						}, {
							name : 'CHNTYPENM',
							type : 'string',
							gridcol : {
								hideable : false,
								header : '通道类型',
								width : 20,
								sortable : true
							}

						}, {
							name : 'CHNNAME',
							type : 'string',
							gridcol : {
								sortable : false,
								header : SPLanguage.getMessage("TDMC"),
								flex : 1,
								editor : {
									allowBlank : false
								}
							}
						}, {
							name : 'ICON',
							type : 'string'
						}];

				//////////////////////////////////////////////////////////////////////////
				//工具栏

				this.list = Ext.create('App.Common.ImagePreview', {
							columns : this.columns,
							url : '../DevMng/GetDevNotAddChns',
							oldStyle : true,
							gridautoLoad : false,
							showBarPager : false,
							header : false,
							gridpageSize : 1000,
							groupField : 'CHNTYPENM',
							cellEditing : new Ext.grid.plugin.CellEditing({
										clicksToEdit : 1
									}),
							gridfeatures : [{
										id : 'group',
										ftype : 'groupingsummary',
										groupHeaderTpl : '{name}',
										hideGroupedHeader : true,
										enableGroupingMenu : false,
										showSummaryRow : false
									}]
						});
				this.items = [this.list];

				this.buttons = [{
							iconCls : 'icon-add',
							text : '添加',
							scope : this,
							handler : this.onSave
						}, {
							iconCls : 'icon-add',
							text : '关闭',
							scope : this,
							handler : function() {
								this.close();
							}
						}];
				this.callParent(arguments);
			},
			afterRender : function() {
				this.callParent(arguments);
				this.onSearch();
			},
			getFilters : function() {
				var vme = this;
				var filters = [{
							property : 'DEVICEID',
							value : this.DEVICEID
						}];
				return filters;
			},
			onSearch : function() {
				var vme = this;
				vme.list.store.clearFilter(true);
				vme.list.store.filter(this.getFilters());
			},
			onSave : function() {
				var vme = this;
				var v = new Array();
				var vsel = this.list.getSelectionModel().getSelection();
				if(vsel.length == 0)
				{
					Ext.MessageBox.alert('提示','请选择要添加的通道！');
					return ;
				}
				for (var i = 0; i < vsel.length; i++) {
					v.push({
								CHNID : vsel[i].get('CHNID'),
								CHNNAME : vsel[i].get('CHNNAME'),
								CHNTYPE : vsel[i].get('CHNTYPE'),
								ICON : vsel[i].get('ICON')
							});
				}
				var vValues = {
					DEVICEID : this.DEVICEID,
					GID: this.GID,
					CHNS : v
				};
				var myMask = new Ext.LoadMask(vme, {
							msg : "正在添加通道，请稍候！"
						});
				myMask.show();
				Ext.Ajax.request({
							url : '../DevMng/AddDevChn', //查询案件详细信息
							method : 'post', //方法  
							jsonData : vValues,
							scope : this,
							callback : function(options, success, response) {
								myMask.hide();
								if (success) {
									var v = Ext.JSON
											.decode(response.responseText);
									if (!v.success)
										Ext.MessageBox.alert('提示',v.msg);
									else {
										this.fireEvent('saveok');
										this.close();
									}
								} else {
									Ext.MessageBox.alert('提示',SPLanguage.getMessage("Net_Error"));
								}
							}
						});
			}
		});
