Ext.define('App.SystemSetting.CustomDic.setZDDataDlg', {
	extend : 'Ext.window.Window',
	title : '字典数据管理',
	layout : 'fit',
	modal : true,
	width : 800,
	height : 500,
	initComponent : function() {

		this.list = Ext.create('App.Common.ImagePreview', {
			url : '../CustomDic/listZDData?ZDLX=' + this.ZDLX,
			oldStyle : true,
			gridpageSize : 19,
			border : 0,
			columns : [{
						name : '',
						type : 'string',
						gridcol : {
							sortable : false,
							xtype : 'rownumberer',
							header : SPLanguage.getMessage("SERIALNUM"),
							width : 32
						}
					}, {
						name : 'ID',
						type : 'string',
						gridcol : {
							sortable : false,
							header : 'ID',
							width : 120
						}
					}, {
						name : 'NM',
						type : 'string',
						gridcol : {
							sortable : false,
							header : '名称',
							flex : 1
						}
					}, {
						name : '',
						type : 'string',
						gridcol : {
							header : SPLanguage.getMessage("HANDLE"),
							//hidden: true,
							sortable : false,
							xtype : 'actioncolumn',
							width : 100,
							items : [{
								iconCls : 'icon-edit',
								tooltip : SPLanguage.getMessage("EDIT"),
								scope : this,
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									if (rec) {
										var v = Ext
												.create(
														'App.SystemSetting.CustomDic.newZDDataDlg',
														{
															url : '../CustomDic/EditZDData',
															modifyMod : true,
															ZDLX : this.ZDLX,
															listeners : {
																scope : this,
																saveok : function() {
																	this.list
																			.reLoad();
																}
															}
														});
										v.show();
										v.down('form').loadRecord(rec);
									}
								}
							}, {
								iconCls : 'icon-del',
								tooltip : '删除',
								scope : this,
								handler : function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									if (rec) {
										this.delItems(rec.get('ID'));
									}
								}
							}]
						}
					}]
		});

		this.tbar = [{
					iconCls : 'icon-add',
					text : '添加',
					scope : this,
					handler : function() {
						Ext.create('App.SystemSetting.CustomDic.newZDDataDlg',
								{
									url : '../CustomDic/AddZDData',
									ZDLX : this.ZDLX,
									listeners : {
										scope : this,
										saveok : function() {
											this.list.reLoad();
										}
									}
								}).show();
					}
				}];
		this.items = [this.list];

		this.callParent(arguments);
	},
	delItems : function(vitems) {
		var vme = this;
		Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage
						.getMessage("SFQDYSC"), function(result) {
					if (result != 'yes')
						return;
					var myMask = new Ext.LoadMask(vme, {
								msg : SPLanguage.getMessage("ZZSCQSH")
							});
					myMask.show();
					Ext.Ajax.request({
								url : '../CustomDic/DelZDData', //查询案件详细信息
								method : 'post', //方法  
								params : {
									ID : vitems,
									ZDLX: vme.ZDLX
								},
								scope: vme,
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var v = Ext.JSON
												.decode(response.responseText);
										if (!v.success)
											alert(v.msg);
										else
											vme.list.reLoad();
									} else {
										alert(SPLanguage.getMessage("DelFail"));
									}
								}
							});
				});

	}
});
