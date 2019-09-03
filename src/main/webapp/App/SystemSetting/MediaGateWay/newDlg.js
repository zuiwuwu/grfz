Ext.define('App.SystemSetting.MediaGateWay.newDlg', {
			extend : 'App.Common.EditDlg',
			title : '网关',
			initComponent : function() {
				this.items = [{
							allowBlank : true,
							name : 'ID',
							hidden : true,
							value : this.MEDIAGATEWAYID
						}, {
							allowBlank : false,
							fieldLabel : '名称',
							name : 'NM',
							emptyText : SPLanguage.getMessage("BNWK")
						}, Ext.create('App.Common.ComboBoxDropList', {
									allowBlank : false,
									fieldLabel : '类型',
									name : 'TYPEID',
									url : '../MediaGateWay/GetType'
								}), {
							allowBlank : false,
							fieldLabel : 'IP地址',
							name : 'IP',
							emptyText : SPLanguage.getMessage("BNWK")
						}, {
							xtype : 'numberfield',
							allowBlank : false,
							fieldLabel : '控制端口',
							name : 'PORT',
							emptyText : SPLanguage.getMessage("BNWK"),
							value : 19000
						}, {
							xtype : 'numberfield',
							allowBlank : false,
							fieldLabel : '媒体端口',
							name : 'STREAMPORT',
							emptyText : SPLanguage.getMessage("BNWK"),
							value : 554
						}, {
							allowBlank : true,
							fieldLabel : '登陆用户',
							name : 'LOGINUSER',
							emptyText : SPLanguage.getMessage("BNWK")
						}, {
							allowBlank : true,
							fieldLabel : '密码',
							name : 'LOGINPSW',
							emptyText : SPLanguage.getMessage("BNWK"),
							inputType : 'password'
						}];

				this.callParent(arguments);
			},
			afterRender : function() {
				this.callParent(arguments);
				if (this.MEDIAGATEWAYID) {
					var myMask = new Ext.LoadMask(this, {
								msg : "正在加载数据，请稍候！"
							});
					myMask.show();
					Ext.Ajax.request({
								url : '../MediaGateWay/Get', //查询案件详细信息
								method : 'post', //方法  
								params : {
									ID : this.MEDIAGATEWAYID
								},
								scope: this,
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var v = Ext.JSON
												.decode(response.responseText);
										this.setValues(v);
									} else {

									}
								}
							});
				}

			}
		});