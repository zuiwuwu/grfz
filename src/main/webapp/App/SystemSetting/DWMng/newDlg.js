//定义编辑对话框
Ext.define('App.SystemSetting.DWMng.newDlg', {
	extend : 'App.Common.EditDlg',
	title : '点位属性',
	initComponent : function() {
		this.addEvents('saveok');

		var v = Ext.getConfig('DWMngnewDlg', 'info');
		if (v) {
			Ext.dwmngnewParams = v;
		}
		/////////////////////////////////////////////////////////
		//初始化参数
		if (typeof Ext.dwmngnewParams == 'undefined') {
			Ext.dwmngnewParams = {
				DWJD : 0,
				DWWD : 0
			};
		}

		this.combLDZX = Ext.create('App.Common.ComboBoxDropList', {
					allowBlank : false,
					fieldLabel : '路段走向',
					name : 'LDZX',
					labelWidth : 90,
					noCache : false,
					value : this.DWBH ? null : Ext.dwmngnewParams.LDZX,
					url : '../DWMng/GetLDZXCombo'
				});

		this.combGXDWDM = Ext.create('App.Common.ComboBoxDropList', {
					allowBlank : false,
					fieldLabel : SPLanguage.getMessage("GXDW"),
					name : 'GXDWDM',
					labelWidth : 90,
					noCache : false,
					value : this.DWBH
							? null
							: (this.UNITID || Ext.dwmngnewParams.GXDWDM),
					url : '../UNIT/GetUNITCombo',
					width : 280
				});

		if (Ext.commonparams.PROJECT == 'changzhouwc') {
			this.combGISPIC = Ext.create('App.Common.ComboBoxDropList', {
						fieldLabel : SPLanguage.getMessage("STYLE"),
						name : 'GISPIC',
						labelWidth : 90,
						noCache : false,
						value : this.DWBH ? null : Ext.dwmngnewParams.GISPIC,
						url : '../DWMng/GetDWGISPICCombo'
					});
		} else {
			this.combGISPIC = Ext.create('App.Common.ComboBoxDropList', {
						fieldLabel : '表现图片',
						name : 'GISPIC',
						labelWidth : 90,
						noCache : false,
						value : this.DWBH ? null : Ext.dwmngnewParams.GISPIC,
						url : '../DWMng/GetDWGISPICCombo'
					});
		}

		this.combDWTYPE = Ext.create('App.Common.ComboBoxDropList', {
					fieldLabel : '点位关联',
					name : 'DWTYPE',
					labelWidth : 90,
					allowBlank : false,
					noCache : false,
					value : this.DWBH ? null : Ext.dwmngnewParams.DWTYPE,
					url : '../DWMng/GetDWTYPECombo'
				});
		this.combDWLX = Ext.create('App.Common.ComboBoxDropList', {
					allowBlank : false,
					fieldLabel : '点位类型',
					name : 'DWLX',
					labelWidth : 90,
					noCache : false,
					value : this.DWBH ? null : Ext.dwmngnewParams.DWLX,
					url : '../DWMng/GetDWLXCombo'
				});

		this.combDWGISTYPE = Ext.create('App.Common.ComboBoxDropList', {
					allowBlank : true,
					fieldLabel : '点位地图分类',
					name : 'DWGISTYPE',
					labelWidth : 90,
					multiSelect : true,
					noCache : false,
					value : this.DWBH ? null : Ext.dwmngnewParams.DWGISTYPE,
					url : '../DWMng/GetDWGISTypeCombo'
				});

		this.editDWWZ = Ext.create('Ext.form.field.Text', {
					allowBlank : false,
					fieldLabel : '点位位置',
					name : 'DWWZ',
					noCache : false,
					value : this.DWBH ? null : Ext.dwmngnewParams.DWWZ,
					labelWidth : 90,
					width : 580
				});
		if (typeof this.DWBH != 'undefined') {
			Ext.dwmngnewParams.DWBH1 = this.DWBH.substr(12, 6);
		}

		this.image = Ext.create('Ext.Img', {
					src : '',
					width : '100%',
					height : 180
				});

		this.imagerul = Ext.create('Ext.form.field.Text', {
					name : 'DWBKPIC',
					allowBlank : true,
					hidden : true
				});

		var vitems = [];
		if (Ext.commonparams.PROJECT == 'changzhouwc') {
			vitems = [this.combGISPIC, {
						xtype : 'numberfield',
						allowBlank : false,
						fieldLabel : '点位经度',
						name : 'DWJD',
						value : this.DWBH ? null : Ext.dwmngnewParams.DWJD,
						decimalPrecision : 6,
						minValue : -180,
						maxValue : 180,
						hideTrigger : true,
						keyNavEnabled : false,
						mouseWheelEnabled : false
					}, {
						xtype : 'numberfield',
						allowBlank : false,
						fieldLabel : '最小缩放',
						name : 'MINZOOM',
						maxValue : 20,
						minValue : 0,
						value : 1
					}, {
						xtype : 'numberfield',
						allowBlank : true,
						fieldLabel : '面积',
						name : 'CM'
					}, {
						xtype : 'numberfield',
						allowBlank : false,
						fieldLabel : '点位纬度',
						name : 'DWWD',
						value : this.DWBH ? null : Ext.dwmngnewParams.DWWD,
						decimalPrecision : 6,
						minValue : -90,
						maxValue : 90,
						hideTrigger : true,
						keyNavEnabled : false,
						mouseWheelEnabled : false
					}, {
						xtype : 'numberfield',
						allowBlank : false,
						fieldLabel : '最大缩放',
						name : 'MAXZOOM',
						maxValue : 20,
						minValue : 0,
						value : 20
					}];
		} else {
			vitems = [this.combGISPIC, this.combLDZX, this.combDWTYPE, this.combDWLX, {
						xtype : 'numberfield',
						allowBlank : false,
						fieldLabel : '点位经度',
						name : 'DWJD',
						value : this.DWBH ? null : Ext.dwmngnewParams.DWJD,
						decimalPrecision : 6,
						minValue : -180,
						maxValue : 180,
						hideTrigger : true,
						keyNavEnabled : false,
						mouseWheelEnabled : false
					}, {
						xtype : 'numberfield',
						allowBlank : false,
						fieldLabel : '点位纬度',
						name : 'DWWD',
						value : this.DWBH ? null : Ext.dwmngnewParams.DWWD,
						decimalPrecision : 6,
						minValue : -90,
						maxValue : 90,
						hideTrigger : true,
						keyNavEnabled : false,
						mouseWheelEnabled : false
					}, {
						allowBlank : false,
						fieldLabel : '联系人',
						name : 'LXR',
						value : this.DWBH ? null : Ext.dwmngnewParams.LXR
					}, {
						allowBlank : false,
						fieldLabel : SPLanguage.getMessage("LXDH"),
						name : 'LXDH',
						value : this.DWBH ? null : Ext.dwmngnewParams.LXDH
					}, Ext.create('App.Common.ComboBoxDropList', {
						fieldLabel : '24小时有警卡口',
						name : 'ZBKK',
						width : 280,
						value : Ext.dwmngnewParams.ZBKK || '0',
						data : [{
												"value" : "0",
												"name" : SPLanguage
														.getMessage("NO")
											}, {
												"value" : "1",
												"name" : SPLanguage
														.getMessage("YES")
											}],
						queryMode : 'local',
						displayField : 'name',
						valueField : 'value'
					}), this.combDWGISTYPE, {
						allowBlank : true,
						fieldLabel : '值班人',
						name : 'ZBR',
						value : this.DWBH ? null : Ext.dwmngnewParams.ZBR
					}, {
						allowBlank : true,
						fieldLabel : SPLanguage.getMessage("ZBDH"),
						name : 'ZBDH',
						value : this.DWBH ? null : Ext.dwmngnewParams.ZBDH
					}, {
						xtype : 'numberfield',
						allowBlank : false,
						fieldLabel : '最小缩放',
						name : 'MINZOOM',
						maxValue : 20,
						minValue : 0,
						value : 1
					}, {
						xtype : 'numberfield',
						allowBlank : false,
						fieldLabel : '最大缩放',
						name : 'MAXZOOM',
						maxValue : 20,
						minValue : 0,
						value : 20
					}, {
						xtype : 'textfield',
						allowBlank : true,
						fieldLabel : SPLanguage.getMessage("REMARK"),
						name : 'CM'
					}];
		}
		this.customkey = [];
		var vzd = Ext.CustomDic.getZD('2');
		for (var i = 0; i < vzd.length; i++) {
			var item = Ext.CustomDic.createInput(vzd[i], {
						width : 280,
										labelWidth : 90,
						allowBlank : true,
						editable : true
					});
			this.customkey.push(item);
			vitems.push(item);
		}
		var vtemp = [[],[]];
		for(var i = 0;i < vitems.length;i ++)
		{
			vtemp[i%2].push(vitems[i]);
		}
		var vinfo = {};
		vinfo = {
			xtype : 'container',
			layout : 'anchor',
			items : [this.imagerul, {
						xtype : 'textfield',
						hidden : !this.modifyMod,
						disabled : true,
						allowBlank : false,
						fieldLabel : '点位编号',
						name : 'DWBH',
						labelWidth : 90,
						width : 580
					}, {
						xtype : 'textfield',
						allowBlank : false,
						fieldLabel : '点位名称',
						name : 'DWMC',
						labelWidth : 90,
						width : 580,
						value : this.DWBH ? null : Ext.dwmngnewParams.DWMC,
						listeners : {
							scope : this,
							blur : function(obj, The, eOpts) {
								var v = this.editDWWZ.getValue();
								if (typeof v == 'undefined' || v == '') {
									this.editDWWZ.setValue(obj.value);
								}
							}
						}
					}, this.editDWWZ, this.combGXDWDM, {
						xtype : 'container',
						layout : 'hbox',
						width : 600,
						items : [

						{
									xtype : 'container',
									layout : 'anchor',
									flex : 1,
									defaultType : 'textfield',
									defaults : {
										width : 280,
										labelWidth : 90
									},
									items : vtemp[0]
								}, {
									xtype : 'container',
									layout : 'anchor',
									flex : 1,
									defaultType : 'textfield',
									defaults : {
										width : 280,
										labelWidth : 90
									},
									items : vtemp[1]
								}]
					}]
		};

		this.items = [{
			xtype : 'container',
			layout : 'hbox',
			items : [vinfo, {
						xtype : 'container',
						layout : 'vbox',
						defaultType : 'textfield',
						defaults : {
							width : 320,
							labelWidth : 90
						},
						items : []
					}, {
						padding : '10 0 0 10',
						xtype : 'container',
						layout : 'vbox',
						width : 200,
						height : 300,
						items : [this.image, {
									xtype : 'container',
									layout : 'hbox',
									width : '100%',
									padding : '10 0 0 0',
									items : [{
												xtype : 'component',
												flex : 1
											}, {
												xtype : 'button',
												text : SPLanguage
														.getMessage("SCTP"),
												height : 20,
												width : 60,
												scope : this,
												handler : this.onUploadBckImage
											}]
								}]
					}]
		}];

		this.buttons = [{
					text : SPLanguage.getMessage("SURE"),
					action : 'save',
					scope : this,
					handler : this.onSave
				}, {
					text : SPLanguage.getMessage("CANCLE"),
					scope : this,
					handler : function() {
						this.close();

					}
				}];

		this.callParent(arguments);
	},
	afterRender : function() {
		this.callParent(arguments);
		var vme = this;
		if (this.DWBH) {
			var form = this.down('form');
			var myMask = new Ext.LoadMask(vme, {
						msg : '正在获取用户信息，请稍候！'
					});
			myMask.show();
			Ext.Ajax.request({
				url : '../DWMng/GetDWInfo',
				method : 'post',
				params : {
					DWBH : vme.DWBH
				},
				scope : this,
				callback : function(options, success, response) {
					myMask.hide();
					if (success) {
						var v = Ext.JSON.decode(response.responseText);
						if (v) {
							this.image.setSrc('../DWMng/GetPic?DWBH=' + v.DWBH);
							this.setValues(v);
						}
					} else {
						alert(SPLanguage.getMessage("Net_Error"));
					}
				}
			});
		}

	},
	onSave : function(button) {
		var vme = this;
		var win = button.up('window');
		form = win.down('form');
		if (!form.isValid())
			return;
		var values = this.getValues();
		

		var myMask = null;

		var url = vme.url;
		var vparams = {};
		if (this.modifyMod) {
			values.DWBH = this.DWBH;
			//values.GXDWDM = this.UNITID;
			myMask = new Ext.LoadMask(vme, {
						msg : "正在修改点位，请稍候！"
					});
		} else {
			//values.GXDWDM = this.UNITID;
			values.DWBH = this.DWBH;
			Ext.dwmngnewParams = values;
			myMask = new Ext.LoadMask(vme, {
						msg : "正在创建点位，请稍候！"
					});
		}
		myMask.show();
		Ext.Ajax.request({
					url : url, //请求地址  
					params : values,
					method : 'post', //方法  
					callback : function(options, success, response) {
						myMask.hide();
						if (success) {
							var result = Ext.JSON.decode(response.responseText);
							if (result.success) {
								vme.fireEvent('saveok', vme);
								win.close();
							} else {
								//$("#txtSearchAJBH").val(ajbh);
								alert(result.msg);
							}
						} else {
							alert(SPLanguage.getMessage("Net_Error"));
						}
					}
				});
	},
	onUploadBckImage : function() {
		var vme = this;
		Ext.create('App.Common.UploadFileDlg', {
			url : '../FileMng/UploadFile',
			ID : 'my_dwbkpic',
			listeners : {
				scope : this,
				saveok : function(result) {
					//vme.backroudImage.setSrc('../TVWall/GetPic?ID=' + vme.lastTVWallID);
					vme.image.setSrc('../FileMng/ShowFilePreview/'
							+ result.fileid);
					vme.imagerul.setValue(result.fileid);
				}
			}
		}).show();
	},
	getValues : function() {
		var form = this.down('form');
		var v = form.getValues();
		var vDWBH = v.DWBH;
		delete v.DWBH;
		Ext.saveConfig('DWMngnewDlg', 'info', v);
		v.DWBH = vDWBH;
		
		var vcustomkey = [];

		if (this.customkey) {

			for (var i = 0; i < this.customkey.length; i++) {
				var a = v[this.customkey[i].name];
				vcustomkey.push({
							property : this.customkey[i].name,
							value : a
						});
				delete v[this.customkey[i].name];
			}

		}
		v.CUSTOMKEYVALUES = Ext.JSON.encode(vcustomkey);
		
		var vDWGISTYPE = v.DWGISTYPE;
		if (Ext.isArray(vDWGISTYPE)) {
			var DWGISTYPE = '';
			for (var i = 0; i < vDWGISTYPE.length; i++) {
				DWGISTYPE += vDWGISTYPE[i] + ',';
			}
			v.DWGISTYPE = DWGISTYPE;
		}
		return v;
	},
	loadRecord : function(rec) {
		this.down('form').loadRecord(rec);
		//this.combDWGISTYPE.setValue(rec.get('DWGISTYPE'));
	}
});
