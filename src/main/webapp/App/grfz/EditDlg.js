//定义编辑对话框
Ext.define('App.grfz.EditDlg', {
			extend : 'Ext.window.Window',
			layout : 'fit',
			modal : true,
			formWidth : null,
			saveOkClose : true, //保存完成后退出
			useJsonData : false,
			autoDestroy : true,
			closeAction : 'destroy',
			initComponent : function() {
				var vme = this;
				this.addEvents('saveok');
				var vitems = this.items;
				this.items = [{
							xtype : 'form',
							bodyPadding : 10,
							border : false,
							width : this.formWidth,
							defaultType : 'textfield',
							defaults : {
								anchor : '100%'
							},
							items : vitems
						}];

				if (!this.buttons) {
					this.buttons = [{
								text : '确定',
								action : 'save',
								scope : this,
								handler : this.onSave
							}, {
								text : '取消',
								scope : this,
								hidden : !this.hidden,
								handler : function() {
									//this.fireEvent('close', this);
									this.close();
								}
							}];
				}

				this.callParent(arguments);
			},
			getValues : function() {
				var form = this.down('form');

				return form.getValues();
			},
			afterRender : function() {
				this.callParent(arguments);

				if (this.geturl && this.SAVEID) {
					var myMask = new Ext.LoadMask(this, {
								msg : "正在查询，请稍候！"
							});
					myMask.show();
					Ext.Ajax.request({
								url : this.geturl,
								params : {
									ID : this.SAVEID
								},
								method : 'post',
								scope : this,
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var result = Ext.JSON
												.decode(response.responseText);
										this.onBeforeLoad(result);
										this.setValues(result);
									} else {
										alert("网络错误！");
									}
								}
							});
				}
			},
			onBeforeLoad : function(result) {
			},
			isValid : function() {
				var form = this.down('form');
				return form.isValid();
			},
			setValues : function(values) {
				var form = this.down('form');
				form.getForm().setValues(values);
			},
			loadRecord : function(rec) {
				var form = this.down('form');
				form.getForm().loadRecord(rec);
			},
			onSave : function(button) {
				var vme = this;
				//var win = button.up('window');

				if (!this.isValid())
					return;
				
				var values = vme.getValues();

				if (vme.url) {
					var myMask = new Ext.LoadMask(vme, {
								msg : "正在登陆，请稍候！"
							});
					myMask.show();
					Ext.Ajax.request({
								url : vme.url, //请求地址  
								params : vme.useJsonData ? null : values,
								jsonData : vme.useJsonData ? values : null,
								method : 'post', //方法  
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var result = Ext.JSON
												.decode(response.responseText);
										if (result.success||result.errcode == 0) {
											var saveOkClose = vme.saveOkClose;
											vme
													.fireEvent('saveok', vme,
															values);
											if (saveOkClose)
												vme.close();

										} else {
											alert(result.msg||result.errmsg);
										}
									} else {
										alert("网络错误！");
									}
								}
							});
				} else {
					vme.fireEvent('saveok', vme, values);
					vme.close();
				}

			}
		});