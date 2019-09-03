Ext.define('App.SystemSetting.UNIT.treeModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'UNITID',
						type : 'string'
					}, {
						name : 'UNITNAME',
						type : 'string'
					}, {
						name : 'UNITADDR',
						type : 'string'
					}, {
						name : 'FZJG',
						type : 'string'
					}, {
						name : 'JB',
						type : 'string'
					}, {
						name : 'SJBM',
						type : 'string'
					}, {
						name : 'INDEXID',
						type : 'number'
					}]
		});

//定义编辑对话框
Ext.define('App.SystemSetting.UNIT.newDlg', {
			extend : 'App.Common.EditDlg',
			title : SPLanguage.getMessage("DWSX"),
			layout : 'fit',
			modal : true,
			PARENTID : 0,
			grouptree : null,
			disabledUNITID : false,
			initComponent : function() {
				var vdefault = Ext.commonparams.GB28181AREA + '000000';
				if (!this.UNITID)
					this.UNITID = vdefault;

				if (this.UNITID.length < 12) {
					this.UNITID = vdefault.substr(0, 12 - this.UNITID.length)
							+ this.UNITID;
				}

				var vwidth = 300;
				this.CJBH = Ext.create('App.Common.ComboBoxDropList', {
							fieldLabel : '市级编号',
							url : '../DevMng/GetGB28181QJBH',
							name : 'CJBH',
							value : this.UNITID.substr(0, 4),
							width : vwidth,
							remoteFilter : true,
							listeners : {
								scope : this,
								select : function(combo, records, eOpts) {
									this.QJBH.setFilter([{
										property : 'id',
										value : (records.length > 0)
												? records[0].get('ID')
												: ''
									}]);
									this.onBHChange();
								}
							}
						});

				this.QJBH = Ext.create('App.Common.ComboBoxDropList', {
							fieldLabel : '区级编号',
							url : '../DevMng/GetGB28181QJBH',
							name : 'QXJBH',
							value : this.UNITID.substr(0, 6),
							width : vwidth,
							remoteFilter : true,
							listeners : {
								scope : this,
								select : function(combo, records, eOpts) {
									this.onBHChange();
								}
							}
						});

				this.items = [{
					xtype : 'form',
					width : 420,
					bodyPadding : 10,
					defaultType : 'textfield',
					defaults : {
						anchor : '100%'
					},
					items : [{
								allowBlank : false,
								fieldLabel : SPLanguage.getMessage("NAME"),
								name : 'UNITNAME',
								emptyText : SPLanguage.getMessage("BNWK")
							}, {
								allowBlank : true,
								fieldLabel : SPLanguage.getMessage("BIANHAO"),
								name : 'PARENTID',
								emptyText : SPLanguage.getMessage("BNWK"),
								value : this.PARENTID,
								hidden : true
							}, Ext.create('App.Common.ComboBoxDropList', {
										fieldLabel : '省级编号',
										url : '../DevMng/GetGB28181SJBH',
										name : 'SJBH',
										value : this.UNITID.substr(0, 2),
										width : vwidth,
										remoteFilter : true,
										listeners : {
											scope : this,
											select : function(combo, records,
													eOpts) {
												this.CJBH.setFilter([{
													property : 'id',
													value : (records.length > 0)
															? records[0]
																	.get('ID')
															: ''
												}]);

												this.onBHChange();
											}
										}
									}), this.CJBH, this.QJBH, {
								allowBlank : false,
								fieldLabel : SPLanguage.getMessage("BIANHAO"),
								name : 'XH',
								emptyText : SPLanguage.getMessage("BNWK"),
								maxLength : 6,
								minLength : 6,
								minLengthText : '编号必须为6为数字编号',
								msgTarget : 'under',
								value : this.UNITID.substr(6, 6),
								listeners : {
									scope : this,
									blur : function(t, The, eOpts) {
										if (parseInt(t.getValue()))
											t.setValue(Ext.String.leftPad(
													parseInt(t.getValue()), 6,
													'0').substr(0, 6));
										else
											t.setValue('000000');
									},
									change : function() {
										this.onBHChange();
									}
								}
							},

							{
								allowBlank : false,
								fieldLabel : SPLanguage.getMessage("ADDR"),
								name : 'UNITADDR',
								emptyText : ''
							}, {
								allowBlank : false,
								fieldLabel : SPLanguage.getMessage("HD"),
								name : 'FZJG',
								emptyText : ''
							}, {
								allowBlank : false,
								xtype : 'numberfield',
								fieldLabel : SPLanguage.getMessage("LEVEL"),
								name : 'JB',
								emptyText : ''
							}, {
								xtype : 'numberfield',
								allowBlank : false,
								fieldLabel : SPLanguage.getMessage("SERIALNUM"),
								name : 'INDEXID',
								emptyText : SPLanguage.getMessage("SERIALNUM"),
								vtype : 'alphanum'
							}]

				}];
				this.callParent(arguments);
			},
			getValues : function() {
				var form = this.down('form');
				var values = form.getValues();
				values.UNITID = this.getBH();
				values.OLDUNITID = this.UNITID;
				return values;
			},
			afterRender : function() {
				this.callParent(arguments);

				this.CJBH.setFilter([{
							property : 'id',
							value : this.UNITID.substr(0, 2)
						}]);
				this.QJBH.setFilter([{
							property : 'id',
							value : this.UNITID.substr(0, 4)
						}]);
				this.setTitle('管辖单位属性（' + this.getBH() + '）');
			},
			getBH : function() {
				var form = this.down('form');
				var values = form.getValues();

				var bh = '';
				if (values.SJBH)
					bh += values.SJBH;
				else
					bh += '00';
				if (values.CJBH)
					bh += values.CJBH.substr(2, 2);
				else
					bh += '00';
				if (values.QXJBH)
					bh += values.QXJBH.substr(4, 2);
				else
					bh += '00';

				if (values.XH) {
					if (parseInt(values.XH))
						bh += Ext.String.leftPad(parseInt(values.XH), 6, '0')
								.substr(0, 6);
					else
						bh += '000000';
				} else
					bh += '000000';
				return bh;
			},
			onBHChange : function() {
				this.setTitle('管辖单位属性（' + this.getBH() + '）');
			}
		});

Ext.define('App.SystemSetting.UNIT', {
	extend : 'Ext.tree.Panel',
	//title: '拓扑结构',
	//animCollapse: true,
	rootVisible : true, //默认不显示根节点
	useArrows : true,
	flex : 1,
	autoScroll : true,
	enableDD : true,
	initComponent : function() {

		var vme = this;
		this.store = Ext.create('Ext.data.TreeStore', {
					autoLoad : true,
					root : {
						expanded : true,
						text : '根',
						id : ''
					},
					proxy : {
						type : 'ajax',
						actionMethods : 'post',
						url : '../UNIT/GetUnitTree',
						reader : {
							type : 'json'
						}
					}
				});

		this.viewConfig = {
			plugins : {
				ptype : 'treeviewdragdrop',
				containerScroll : true,
				ddGroup : 'unitmngdrag',
				appendOnly : true
			},
			listeners : {
				beforedrop : function(node, data, overModel, dropPosition,
						dropHandlers, eOpts) {
					dropHandlers.wait = true;
					var vunitid = '';
					if (data.records.length > 0) {
						vunitid = data.records[0].get('id');
					}
					if (vunitid == '') {
						dropHandlers.cancelDrop();
						return;
					}
					Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"),
							'是否确定要移动管辖单位?', function(btn) {
								if (btn === 'yes') {
									Ext.Ajax.request({
										url : '../UNIT/EditUnitParentID', //查询案件详细信息
										method : 'post', //方法  
										params : {
											UNITID : vunitid,
											SJBM : overModel.get('id')
										},
										callback : function(options, success,
												response) {

											if (success) {
												var v = Ext.JSON
														.decode(response.responseText);
												if (!v.success) {
													dropHandlers.cancelDrop();
													alert(v.msg);
												} else
													dropHandlers.processDrop();
											} else {
												dropHandlers.cancelDrop();
												alert(SPLanguage
														.getMessage("Net_Error"));
											}
										}
									});
								} else {
									dropHandlers.cancelDrop();
								}

							});
				},
				drop : function(node, data, overModel, dropPosition, eOpts) {
				}
			}
		};

		this.refreshTree = function() {
			vme.store.load();
		};

		this.tbar = [{
					text : SPLanguage.getMessage("REFRESH"),
					iconCls : 'icon-refresh',
					handler : function() {
						vme.store.load();
					}
				}, {
					text : SPLanguage.getMessage("PUSH"),
					iconCls : 'icon-add',
					scope : this,
					handler : function() {
						var vsel = vme.getSelectionModel().getSelection();
						var vPARENTID = 0;
						if (vsel.length > 0)
							vPARENTID = vsel[0].get('id');
						Ext.create('App.SystemSetting.UNIT.newDlg', {
									PARENTID : vPARENTID,
									url : '../UNIT/AddUnit',
									listeners : {
										scope : this,
										saveok : function() {
											this.refreshTree();
										}
									}
								}).show();
					}
				}, {
					text : SPLanguage.getMessage("ALTER"),
					iconCls : 'icon-edit',
					scope : this,
					handler : function() {
						var vsel = vme.getSelectionModel().getSelection();
						if (vsel.length > 0) {
							var v = Ext.create('App.SystemSetting.UNIT.newDlg',
									{
										url : '../UNIT/EditUnit',
										disabledUNITID : true,
										UNITID : vsel[0].get('id'),
										listeners : {
											scope : this,
											saveok : function() {
												this.refreshTree();
											}
										}
									}).show();
							v.down('form').loadRecord(Ext.create(
									'App.SystemSetting.UNIT.treeModel', {
										'UNITNAME' : vsel[0].get('text'),
										'UNITADDR' : vsel[0].raw.attributes.UNITADDR,
										'FZJG' : vsel[0].raw.attributes.FZJG,
										'JB' : vsel[0].raw.attributes.JB,
										'INDEXID' : vsel[0].raw.attributes.INDEXID,
										'UNITID' : vsel[0].get('id')
									}));
						}
					}
				}, {
					text : SPLanguage.getMessage("DELETE"),
					iconCls : 'icon-del',
					handler : function() {
						var vsel = vme.getSelectionModel().getSelection();
						if (vsel.length > 0) {
							Ext.MessageBox.confirm(SPLanguage
											.getMessage("REMINDER"),
									'是否确定要删除当前分组?', function(result) {
										if (result != 'yes')
											return;
										var myMask = new Ext.LoadMask(vme, {
													msg : "正在删除分组，请稍候！"
												});
										myMask.show();

										Ext.Ajax.request({
											url : '../UNIT/DelUnit', //查询案件详细信息
											method : 'post', //方法  
											params : {
												UNITID : vsel[0].get('id')
											},
											callback : function(options,
													success, response) {
												myMask.hide();
												if (success) {
													var v = Ext.JSON
															.decode(response.responseText);
													if (!v.success)
														alert(v.msg);
													else
														vme.refreshTree();
												} else {
													alert(SPLanguage
															.getMessage("DelFail"));
												}
											}
										});
									});
						}
					}
				}, '-', {
					text : '管辖单位点位设置',
					iconCls : 'icon-edit',
					handler : function() {
						var vsel = vme.getSelectionModel().getSelection();
						if (vsel.length != 1)
							return;
						Ext.create('App.SystemSetting.Dlg.selDWDlg', {
									geturl : '../UNIT/getUNITDW',
									saveurl : '../UNIT/updateUNITDW',
									filters : [{
												property : 'UNITID',
												value : vsel[0].get('id')
											}],
									SELID : vsel[0].get('id')
								}).show();
					}
				}];

		this.callParent(arguments);
	}
});
