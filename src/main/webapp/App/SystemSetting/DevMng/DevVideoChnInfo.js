// 定义编辑对话框
Ext.define('App.SystemSetting.DevMng.DevVideoChnInfo', {
	extend : 'App.Common.EditDlg',
	title : '通道属性',
	width : 800,
	height : 500,
	initComponent : function() {
		var vwidth = 378;
		var labelWidth = 90;
		this.TEXTJKSBBH = Ext.create('Ext.form.field.Text', {
					labelWidth : labelWidth,
					width : vwidth,
					allowBlank : false,
					fieldLabel : '设备编号',
					name : 'JKSBBH',
					vtype : 'BH',
					textlength : 20,
					vtypeText : '必须输入20位数字编号'
				});

		this.vDWBH = Ext.create('Ext.form.field.ComboBox', {
					allowBlank : false,
					// forceSelection: true,
					fieldLabel : '安装点位',
					name : 'KKBH',
					labelWidth : labelWidth,
					width : vwidth,
					editable : true,
					anyMatch : true,
					displayField : 'NAME',
					valueField : 'ID',
					queryMode : 'local',
					store : new Ext.data.Store({
								autoLoad : true,
								listeners : {
									scope : this,
									load : function(store, records, successful,
											eOpts) {
										if (typeof this.KKBH != 'undefined'
												&& this.KKBH != null) {
											this.vDWBH.setValue(this.KKBH);
										}
									}
								},
								proxy : {

									type : 'ajax',
									actionMethods : 'post',
									url : '../DWMng/GetDWCombox?dwtype=2',
									reader : {
										type : 'json',
										root : 'rows',
										successProperty : 'success',
										totalProperty : 'total'
									}
								},
								fields : [{
											name : 'ID'
										}, {
											name : 'NAME'
										}]
							})
				});

		this.FIELDLEFT = Ext.create('Ext.Container', {
					layout : 'anchor',
					items : []
				});
		this.FIELDRIGHT = Ext.create('Ext.Container', {
					layout : 'anchor',
					items : [],
					padding : '0 0 0 10'
				});
		this.FIELDITMES = Ext.create('Ext.form.FieldSet', {
					title : SPLanguage.getMessage("PROPERTY"),
					width : '100%',
					items : [{
								xtype : 'container',
								layout : 'hbox',
								items : [this.FIELDLEFT, this.FIELDRIGHT]
							}]
				});

		var vmainitems = [{
					labelWidth : labelWidth,
					xtype : 'textfield',
					width : vwidth,
					allowBlank : true,
					fieldLabel : 'ID',
					readOnly : true,
					name : 'GLOBALID',
					value: this.GLOBALID
				},{
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
					allowBlank : true,
					fieldLabel : '下级系统编号',
					name : 'SUBSVRJKSBBH'
				}, this.vDWBH, {
					labelWidth : labelWidth,
					xtype : 'textfield',
					width : vwidth,
					allowBlank : true,
					fieldLabel : '型号',
					name : 'CHNMODEL'
				}, {
					labelWidth : labelWidth,
					xtype : 'combobox',
					fieldLabel : '是否可控',
					width : vwidth,
					name : 'SFKK',
					editable : false,
					value : '0',
					store : Ext.create('Ext.data.Store', {
								fields : ['value', 'name'],
								data : [{
											"value" : "0",
											"name" : SPLanguage
													.getMessage("NO")
										}, {
											"value" : "1",
											"name" : SPLanguage
													.getMessage("YES")
										}]
							}),
					queryMode : 'local',
					displayField : 'name',
					valueField : 'value'
				}, {
					labelWidth : labelWidth,
					xtype : 'numberfield',
					width : vwidth,
					allowBlank : false,
					fieldLabel : '设备像素',
					name : 'SBXS',
					value : 200
				}, {
					labelWidth : labelWidth,
					xtype : 'textfield',
					width : vwidth,
					allowBlank : true,
					fieldLabel : '设备类型',
					name : 'SBLX'
				}, Ext.create('App.Common.ComboBoxDropList', {
							labelWidth : labelWidth,
							width : vwidth,
							url : '../DevMng/GetJSFXCombo',
							allowBlank : false,
							fieldLabel : '监视方向',
							name : 'JSFX',
							editable : false,
							noCache : false
						}), Ext.create('App.Common.ComboBoxDropList', {
							labelWidth : labelWidth,
							width : vwidth,
							url : '../DevMng/GetSSBMCombo',
							allowBlank : false,
							fieldLabel : '所属警种部门',
							name : 'SSBM',
							editable : false,
							noCache : false
						}), Ext.create('App.Common.ComboBoxDropList', {
							labelWidth : labelWidth,
							width : vwidth,
							url : '../DevMng/GetJSDWCombo',
							allowBlank : true,
							fieldLabel : '建设单位',
							name : 'BUILDCMPID',
							editable : true,
							noCache : false
						}), {
					labelWidth : labelWidth,
					xtype : 'textfield',
					width : vwidth,
					allowBlank : true,
					fieldLabel : '通道IP',
					name : 'CHNADDR'
				}, Ext.create('App.Common.ComboBoxDropList', {
							labelWidth : labelWidth,
							width : vwidth,
							url : '../ZDGL/GetZDCombox?ID=24',
							allowBlank : true,
							fieldLabel : SPLanguage.getMessage("TJLX"),
							name : 'TJTYPE',
							editable : true
						})];
		this.MAINFIELDLEFT = Ext.create('Ext.Container', {
					layout : 'anchor',
					items : []
				});
		this.MAINFIELDRIGHT = Ext.create('Ext.Container', {
					layout : 'anchor',
					items : [],
					padding : '0 0 0 10'
				});

		this.customkey = [];
		var vzd = Ext.CustomDic.getZD('0');
		for (var i = 0; i < vzd.length; i++) {
			var item = Ext.CustomDic.createInput(vzd[i], {
						labelWidth : labelWidth,
						width : vwidth,
						allowBlank : true,
						editable : true
					});
			this.customkey.push(item);
			vmainitems.push(item);
		}

		for (var i = 0; i < vmainitems.length; i++) {
			if (i % 2 == 0) {
				this.MAINFIELDLEFT.add(vmainitems[i]);
			} else {
				this.MAINFIELDRIGHT.add(vmainitems[i]);
			}
		}

		this.items = [{
			xtype : 'container',
			layout : 'hbox',
			padding : '0 0 6 0',
			items : [this.TEXTJKSBBH, {
						xtype : 'button',
						text : '设置编号',
						scope : this,
						handler : function() {
							var v = this.getValues();
							Ext.create('App.SystemSetting.DevMng.DevGBChnDlg',
									{
										JKSBBH : v.JKSBBH,
										title : 'GB28181编号（' + v.JKSBBH + '）',
										listeners : {
											scope : this,
											saveok : function(t, bh) {
												this.TEXTJKSBBH.setValue(bh);
											}
										}
									}).show();
						}
					}]
		}, {
			labelWidth : labelWidth,
			xtype : 'textfield',
			width : 300,
			allowBlank : false,
			fieldLabel : SPLanguage.getMessage("SBMC"),
			name : 'CHNNAME',
			emptyText : SPLanguage.getMessage("BNWK")
		}, {
			xtype : 'container',
			layout : 'hbox',
			items : [this.MAINFIELDLEFT, this.MAINFIELDRIGHT]
		}, this.FIELDITMES];
		this.callParent(arguments);
	},
	afterRender : function() {
		this.callParent(arguments);
		var vme = this;
		var myMask = new Ext.LoadMask(this, {
					msg : "正在属性，请稍候！"
				});
		myMask.show();
		Ext.Ajax.request({
			url : '../DevMng/GetDevChnProperty',
			method : 'post', // 方法
			params : {
				GLOBALID : this.GLOBALID
			},
			callback : function(options, success, response) {
				myMask.hide();
				if (success) {
					var v = Ext.JSON.decode(response.responseText);
					vme.getproperty = true;
					vme.propertyid = [];
					var voldsource = vme.getRawValues();
					var index = 0;
					for (var i = 0; i < v.rows.length; i++) {
						var vrow = v.rows[i];
						if (typeof voldsource[vrow.id] != 'undefined') {
							vrow.value = voldsource[vrow.id];
						}
						if (!(vrow.id == 'CHNNAME' || vrow.id == 'CHNMODEL' || vrow.id == 'JKSBBH')) {
							if (index % 2 == 0)
								vme.FIELDLEFT.add(vme.createEditor(vrow));
							else
								vme.FIELDRIGHT.add(vme.createEditor(vrow));

							index++;
						}

					}
					if (v.params) {
						vme.setValues(v.params);
					}
					if (!v.success) {
						Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"),
								v.msg);
					}
				} else {
					Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"),
							SPLanguage.getMessage("Net_Error"));
				}
			}
		});
	},
	createEditor : function(vrow) {
		var vtype = 'string';
		var veditor = null;
		var venable = true;
		var vdata = [];
		if (Ext.isString(vrow.editor)) {
			if (vrow.editor == 'numberbox') {
				vtype = 'number';
			} else if (vrow.editor == 'checkbox') {
				vtype = 'boolean';
				vdata = [{
							'ID' : 'True',
							'NAME' : 'True'
						}, {
							'ID' : 'False',
							'NAME' : 'False'
						}];
			} else if (vrow.editor == 'datebox')
				vtype = 'date';
		} else if (vrow.editor) {
			if (vrow.editor.type == 'numberbox')
				vtype = 'number';
			else if (vrow.editor.type == 'checkbox') {
				vtype = 'boolean';
				vdata = [{
							'ID' : 'True',
							'NAME' : 'True'
						}, {
							'ID' : 'False',
							'NAME' : 'False'
						}];
			} else if (vrow.editor.type == 'datebox')
				vtype = 'date';
			else if (vrow.editor.type == 'combobox') {
				vtype = vrow.editor.type;
				var vcombdata = vrow.editor.options.data;
				for (var j = 0; j < vcombdata.length; j++) {
					vdata.push({
								'ID' : vcombdata[j].value,
								'NAME' : vcombdata[j].text
							});
				}
			}
		} else {
			venable = false;
		}
		if (venable)
			this.propertyid.push(vrow.id);
		if (vtype == 'combobox' || vtype == 'boolean') {
			var states = Ext.create('Ext.data.Store', {
						fields : ['ID', 'NAME'],
						data : vdata
					});

			return Ext.create('Ext.form.ComboBox', {
						fieldLabel : vrow.name,
						editable : false,
						store : states,
						queryMode : 'local',
						valueField : 'ID',
						displayField : 'NAME',
						disabled : !venable,
						value : vrow.value,
						name : vrow.id,
						width : 360,
						labelWidth : 90
					});
		} else if (vtype == 'number') {
			return Ext.create('Ext.form.field.Number', {
						fieldLabel : vrow.name,
						disabled : !venable,
						value : vrow.value,
						name : vrow.id,
						width : 360,
						labelWidth : 90
					});
		}

		return Ext.create('Ext.form.field.Text', {
					fieldLabel : vrow.name,
					disabled : !venable,
					value : vrow.value,
					name : vrow.id,
					width : 360,
					labelWidth : 90
				});
	},
	getValues : function() {
		var v = this.getRawValues();
		var kkbh = this.vDWBH.getValue();
		var values = {
			GLOBALID : this.GLOBALID,
			JKSBBH : v.JKSBBH,
			CHNNAME : v.CHNNAME,
			CHNMODEL : v.CHNMODEL,
			KKBH : v.KKBH
		};
		if (this.getproperty) {
			var params = '';
			for (var i = 0; i < this.propertyid.length; i++) {
				var a = v[this.propertyid[i]];

				if (typeof a != 'undefined') {
					a = encodeURIComponent(a);
				} else {
					a = '';
				}
				if (params != '')
					params += '&';
				params += this.propertyid[i] + '=' + a;
				delete v[this.propertyid[i]];
			}
			values.PARAMS = params;
		}
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

		values = Ext.apply(values, v);

		return values;
	},
	getRawValues : function() {
		var form = this.down('form');
		return form.getValues();
	},
	loadRecord : function(rec) {
		this.down('form').loadRecord(rec);
		this.KKBH = rec.get('KKBH');
		// if (this.vDWBH.inputEl) {
		// this.vDWBH.inputEl.dom.value = rec.get('DWMC');
		// this.vDWBH.value = rec.get('KKBH');
		//         }
	}
});
