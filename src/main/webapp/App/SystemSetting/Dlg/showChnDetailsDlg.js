// 显示通道详细信息
Ext.define('App.SystemSetting.Dlg.showChnDetailsDlg', {
			extend : 'App.Common.ExEditDlg',
			title : '通道详细信息',
			width : 900,
			height : 500,
			initComponent : function() {
				var me = this;
				var vwidth = 378;
				var labelWidth = 90;
				var vmainitems = [{
							labelWidth : labelWidth,
							xtype : 'textfield',
							width : vwidth,
							fieldLabel : 'ID',
							readOnly : true,
							name : 'GLOBALID',
							value : this.GLOBALID
						},
						{
							labelWidth : labelWidth,
							xtype : 'textfield',
							width : vwidth,
							fieldLabel : '设备编号',
							readOnly : true,
							name : 'JKSBBH'
						}, {
							labelWidth : labelWidth,
							xtype : 'textfield',
							width : vwidth,
							allowBlank : true,
							fieldLabel : '通道号',
							readOnly : true,
							name : 'CHNID'
						}, {
							labelWidth : labelWidth,
							xtype : 'textfield',
							width : vwidth,
							readOnly : true,
							fieldLabel : '下级系统编号',
							name : 'SUBSVRJKSBBH'
						}, {
							labelWidth : labelWidth,
							xtype : 'textfield',
							width : vwidth,
							readOnly : true,
							fieldLabel : '型号',
							name : 'CHNMODEL'
						}, {
							labelWidth : labelWidth,
							xtype : 'numberfield',
							width : vwidth,
							readOnly : true,
							fieldLabel : '设备像素',
							name : 'SBXS',
							value : 200
						}, {
							labelWidth : labelWidth,
							xtype : 'textfield',
							width : vwidth,
							readOnly : true,
							fieldLabel : '设备类型',
							name : 'SBLX'
						}, Ext.create('App.Common.ComboBoxDropList', {
									labelWidth : labelWidth,
									width : vwidth,
									url : '../DevMng/GetJSFXCombo',
									fieldLabel : '监视方向',
									name : 'JSFX',
									readOnly : true,
									noCache : false
								}), Ext.create('App.Common.ComboBoxDropList', {
									labelWidth : labelWidth,
									width : vwidth,
									url : '../DevMng/GetSSBMCombo',
									fieldLabel : '所属警种部门',
									name : 'SSBM',
									readOnly : true,
									noCache : false
								}), Ext.create('App.Common.ComboBoxDropList', {
									labelWidth : labelWidth,
									width : vwidth,
									url : '../DevMng/GetJSDWCombo',
									fieldLabel : '建设单位',
									name : 'BUILDCMPID',
									readOnly : true,
									noCache : false
								}), {
							labelWidth : labelWidth,
							xtype : 'textfield',
							width : vwidth,
							readOnly : true,
							fieldLabel : '通道IP',
							name : 'CHNADDR'
						}, Ext.create('App.Common.ComboBoxDropList', {
									labelWidth : labelWidth,
									width : vwidth,
									url : '../ZDGL/GetZDCombox?ID=24',
									readOnly : true,
									fieldLabel : SPLanguage.getMessage("TJLX"),
									name : 'TJTYPE'
								})];

				var vzd = Ext.CustomDic.getZD('0');
				for (var i = 0; i < vzd.length; i++) {
					var item = Ext.CustomDic.createInput(vzd[i], {
								labelWidth : labelWidth,
								width : vwidth,
								readOnly : true
							});
					vmainitems.push(item);
				}

				var vchninfo = [[], []];
				for (var i = 0; i < vmainitems.length; i++) {
					vchninfo[i % 2].push(vmainitems[i]);
				}
				this.items = [{
							xtype : 'fieldset',
							columnWidth : 0.5,
							title : '通道信息',
							collapsible : true,
							defaultType : 'textfield',
							defaults : {
								anchor : '100%'
							},
							layout : 'hbox',
							items : [{
										xtype : 'container',
										layout : 'anchor',
										width : 400,
										items : vchninfo[0]
									}, {
										xtype : 'container',
										layout : 'anchor',
										width : 400,
										items : vchninfo[1]
									}]
						}, {
							// Fieldset in Column 1 - collapsible via toggle
							// button
							xtype : 'fieldset',
							columnWidth : 0.5,
							title : '设备信息',
							collapsible : true,
							defaultType : 'textfield',
							defaults : {
								anchor : '100%'
							},
							layout : 'anchor',
							items : [{
										fieldLabel : 'Field 1',
										name : 'field1'
									}]
						}, {
							// Fieldset in Column 1 - collapsible via toggle
							// button
							xtype : 'fieldset',
							columnWidth : 0.5,
							title : '点位信息',
							collapsible : true,
							defaultType : 'textfield',
							defaults : {
								anchor : '100%'
							},
							layout : 'anchor',
							items : [{
										fieldLabel : 'Field 1',
										name : 'field1'
									}]
						}];

				this.callParent(arguments);
			}
		});
