Ext.define('App.SystemSetting.TransSvr.remoteSetDlg', {
			extend : 'App.Common.EditDlg',
			title : ' 远程设置',
			formWidth : 320,
			url : '../TransSvrAsyn/SetRemoteParams', 
			initComponent : function() {
				var vme = this;
				this.items = [{
							allowBlank : true,
							name : 'SVRID',
							hidden : true,
							value: this.USERID
						}, {
							// Fieldset in Column 1 - collapsible via toggle
							// button
							xtype : 'fieldset',
							columnWidth : 0.5,
							title : '参数设置',
							collapsible : false,
							defaultType : 'numberfield',
							defaults : {
								anchor : '100%'
							},
							layout : 'anchor',
							items : [{
										allowBlank : false,
										fieldLabel : '媒体端口',
										name : 'STREAMPORT'
									}, {
										allowBlank : false,
										fieldLabel : '回放端口',
										name : 'PLAYBACKPORT'
									},
									Ext.create('App.Common.ComboBoxDropList', {
												anchor : '100%',
												fieldLabel : '接入云管理平台',
												data : [{
															ID : '0',
															NAME : '否'
														}, {
															ID : '1',
															NAME : '是'
														}],
												value : '0',
												name : 'CLOUDREC'
											}),{
										xtype: 'textfield',
										allowBlank : true,
										fieldLabel : '云管理服务IP',
										name : 'CLOUDIP'
									}, {
										allowBlank : true,
										fieldLabel : '云管理服端口',
										name : 'CLOUDPORT'
									}]
						}, {
							xtype : 'fieldset',
							title : '智能压缩设置',
							columnWidth : 0.5,
							collapsible : false,
							defaultType : 'numberfield',
							defaults : {
								anchor : '100%'
							},
							layout : 'anchor',
							items : [{
										xtype : 'checkbox',
										anchor : '100%',
										boxLabel : '启用',
										name : 'ENABLEZNYS'
									}, {
										allowBlank : true,
										fieldLabel : '原始录像天数',
										name : 'BLTS',
										value: 15
									},
									Ext.create('App.Common.ComboBoxDropList', {
												anchor : '100%',
												fieldLabel : '压缩方式',
												data : [{
															ID : '0',
															NAME : '抽取关键帧'
														}, {
															ID : '1',
															NAME : '保留运动图像'
														}, {
															ID : '2',
															NAME : '重新编码'
														}],
												value : '0',
												name : 'YSFS'
											}), {
										allowBlank : true,
										fieldLabel : '检测灵敏度',
										name : 'JCLMD',
										value: 20
									}, {
										allowBlank : true,
										fieldLabel : '运动阀值',
										name : 'YDFZ',
										value: 20
									}, {
										allowBlank : true,
										fieldLabel : '关键帧间隔',
										name : 'GJZJG',
										value: 90
									}, {
										allowBlank : true,
										fieldLabel : '压缩码流',
										name : 'YDML',
										value: 2000
									}, {
										allowBlank : true,
										fieldLabel : '压缩质量',
										name : 'YSZL',
										value: 10
									},
									Ext.create('App.Common.ComboBoxDropList', {
												anchor : '100%',
												fieldLabel : '码流方式',
												data : [{
															ID : '0',
															NAME : '恒定码流'
														}, {
															ID : '1',
															NAME : '可变码流'
														}],
												value : '0',
												name : 'YSMLFS'
											})]
						}];
				this.callParent(arguments);
			},
			getValues : function() {
				var form = this.down('form');

				var values =  form.getValues();
				if(values.ENABLEZNYS == 'on')
					values.ENABLEZNYS = 1;
					else
					values.ENABLEZNYS = 0;
				return values;
			},
			afterRender : function() {
				this.callParent(arguments);
				if (this.USERID) {
					var myMask = new Ext.LoadMask(this, {
								msg : "正在加载数据，请稍候！"
							});
					myMask.show();
					Ext.Ajax.request({
								url : '../TransSvrAsyn/GetRemoteParams', 
								method : 'post', 
								params : {
									ID : this.USERID
								},
								scope: this,
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var v = Ext.JSON
												.decode(response.responseText);
										this.setValues(v);
									} else {
										this.close();
										Ext.MessageBox.alert('提示','获取参数失败！');
									}
								}
							});
				}

			}
		});
