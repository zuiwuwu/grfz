

//定义编辑对话框
Ext.define('App.SystemSetting.DevMng.DevTrafficChnInfo', {
    extend: 'App.Common.EditDlg',
    title: '通道属性',
    width: 800,
    height: 500,
    initComponent: function () {
        var labelwidth = 90;
        var vwidth = 376;
        this.JKSBBHKKBH = Ext.create('Ext.form.field.Text', {
            labelWidth: labelwidth,
            width: 280,
            allowBlank: false,
            fieldLabel: '设备编号',
            name: 'JKSBBHKKBH',
            readOnly: true
        });

        this.JKSBBHLSH = Ext.create('Ext.form.field.Text', {
            allowBlank: false,
            width: 96,
            name: 'JKSBBHLSH',
            vtype: 'BH',
            textlength: 6,
            vtypeText: '必须输入6位数字流水号'
        });

        this.FIELDLEFT = Ext.create('Ext.Container',
        {
            layout: 'anchor',
            items: []
        });
        this.FIELDRIGHT = Ext.create('Ext.Container',
        {
            layout: 'anchor',
            items: [],
            padding: '0 0 0 10'
        });
        this.FIELDITMES = Ext.create('Ext.form.FieldSet',
        {
            title: SPLanguage.getMessage("PROPERTY"),
            width: '100%',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [this.FIELDLEFT, this.FIELDRIGHT]
            }]
        });


        var vmainitems = [{
					labelWidth : labelwidth,
					xtype : 'textfield',
					width : vwidth,
					allowBlank : true,
					fieldLabel : 'ID',
					readOnly : true,
					name : 'GLOBALID',
					value: this.GLOBALID
				},{
					labelWidth : labelwidth,
					xtype : 'textfield',
					width : vwidth,
					allowBlank : true,
					fieldLabel : '通道号',
					readOnly : true,
					name : 'CHNID'
				}, {
					labelWidth : labelwidth,
					xtype : 'textfield',
					width : vwidth,
					allowBlank : true,
					fieldLabel : '下级系统编号',
					name : 'SUBSVRJKSBBH'
				}, {
            labelWidth: labelwidth,
            xtype: 'textfield',
            width: vwidth,
            allowBlank: false,
            fieldLabel: SPLanguage.getMessage("SBMC"),
            name: 'CHNNAME',
            emptyText: SPLanguage.getMessage("BNWK")
        },
                    Ext.create('App.Common.ComboBoxDropList',
            {
                labelWidth: labelwidth,
                width: vwidth,
                url: '../DWMng/GetDWCombox?dwtype=1',
                allowBlank: false,
                fieldLabel: '安装点位',
                name: 'KKBH',
                editable: true,
                listeners: {
                    scope: this,
                    select: function (combo, records, eOpts) {
                        if (records.length > 0) {
                            var v1 = records[0].get('ID');
                            this.JKSBBHKKBH.setValue(v1);
                        }
                    }
                }
            }),
        {
            labelWidth: labelwidth,
            xtype: 'numberfield',
            width: vwidth,
            allowBlank: false,
            fieldLabel: '设备像素',
            name: 'SBXS',
            value: 200
        },
          Ext.create('App.Common.ComboBoxDropList',
            {
                labelWidth: labelwidth,
                width: vwidth,
                url: '../DevMng/GetJSFXCombo',
                allowBlank: false,
                fieldLabel: '监视方向',
                name: 'JSFX',
                editable: true
            }),
          Ext.create('App.Common.ComboBoxDropList',
            {
                labelWidth: labelwidth,
                width: vwidth,
                url: '../DevMng/GetSSBMCombo',
                allowBlank: false,
                fieldLabel: '所属警种部门',
                name: 'SSBM',
                editable: true
            }),
        Ext.create('App.Common.ComboBoxDropList',
            {
                labelWidth: labelwidth,
                width: vwidth,
                url: '../DevMng/GetJSDWCombo',
                allowBlank: true,
                fieldLabel: '建设单位',
                name: 'BUILDCMPID',
                editable: false,
                noCache: false
            }),
        {
            labelWidth: labelwidth,
            xtype: 'textfield',
            width: vwidth,
            allowBlank: true,
            fieldLabel: '违法上传编号',
            name: 'SBBH'
        },
        {
            labelWidth: labelwidth,
            xtype: 'textfield',
            width: vwidth,
            allowBlank: true,
            fieldLabel: '型号',
            name: 'CHNMODEL'
        },
                    Ext.create('App.Common.ComboBoxDropList',
            {
                labelWidth: labelwidth,
                width: vwidth,
                url: '../RcvSvrMng/GetCombo',
                allowBlank: false,
                fieldLabel: '接收服务器',
                name: 'JKXTBH'
            }),
          Ext.create('App.Common.ComboBoxDropList',
            {
                labelWidth: labelwidth,
                width: vwidth,
                url: '../ZCJGS/GetJKLX',
                allowBlank: false,
                fieldLabel: '监控类型',
                name: 'JKLX',
                editable: true
            }),
             Ext.create('App.Common.ComboBoxDropList',
        {
            labelWidth: labelwidth,
            fieldLabel: '所在车道',
            width: vwidth,
            name: 'SZCD',
            editable: false,
            value: '01',
            allowBlank: false,
            data: [{ "value": "00", "name": "非机动车道" },
                 { "value": "01", "name": "01" },
                 { "value": "02", "name": "02" },
                 { "value": "03", "name": "03" },
                 { "value": "04", "name": "04" },
                 { "value": "05", "name": "05" },
                 { "value": "06", "name": "06" },
                 { "value": "07", "name": "07" },
                 { "value": "08", "name": "08" },
                 { "value": "09", "name": "09" },
                 { "value": "10", "name": "10"}],
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value'
        }),
        Ext.create('App.Common.ComboBoxDropList',
        {
            labelWidth: labelwidth,
            fieldLabel: '出入口类型',
            width: vwidth,
            name: 'JKSBEXTYPE',
            editable: false,
            value: '0',
            data: [{ "value": "0", "name": "普通" },
                 { "value": "1", "name": "入口" },
                 { "value": "2", "name": "出口"}],
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value'
        }),
        Ext.create('App.Common.ComboBoxDropList',
        {
            labelWidth: labelwidth,
            fieldLabel: '是否违法上传',
            width: vwidth,
            name: 'WFSC',
            editable: false,
            value: '0',
           data: [{ "value": "0", "name": SPLanguage.getMessage("NO") },
                 { "value": "1", "name": SPLanguage.getMessage("YES")}],
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value'
        }),
        Ext.create('App.Common.ComboBoxDropList',
        {
            labelWidth: labelwidth,
            fieldLabel: '是否上传上级',
            width: vwidth,
            name: 'TZSC',
            editable: false,
            value: '0',
             data : [{ "value": "0", "name": SPLanguage.getMessage("NO") },
                 { "value": "1", "name": SPLanguage.getMessage("YES")}],
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value'
        }),
        {
            labelWidth: labelwidth,
            xtype: 'textfield',
            width: vwidth,
            allowBlank: true,
            fieldLabel: '通道IP',
            name: 'CHNADDR'
        },
          Ext.create('App.Common.ComboBoxDropList',
            {
                labelWidth: labelwidth,
                width: vwidth,
                url: '../ZDGL/GetZDCombox?ID=24',
                allowBlank: false,
                fieldLabel: SPLanguage.getMessage("TJLX"),
                name: 'TJTYPE',
                editable: false
            })];
            
        

        this.MAINFIELDLEFT = Ext.create('Ext.Container',
        {
            layout: 'anchor',
            items: []
        });
        this.MAINFIELDRIGHT = Ext.create('Ext.Container',
        {
            layout: 'anchor',
            items: [],
            padding: '0 0 0 10'
        });

        this.customkey = [];
		var vzd = Ext.CustomDic.getZD('0');
		for (var i = 0; i < vzd.length; i++) {
			var item = Ext.CustomDic.createInput(vzd[i], {
						labelWidth : labelwidth,
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
            }
            else {
                this.MAINFIELDRIGHT.add(vmainitems[i]);
            }
        }

        this.items = [
        {
            xtype: 'container',
            layout: 'hbox',
            padding: '0 0 6 0',
            items: [this.JKSBBHKKBH, this.JKSBBHLSH]
        },
        {
            xtype: 'container',
            layout: 'vbox',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [this.MAINFIELDLEFT,
                this.MAINFIELDRIGHT]
            },
            this.FIELDITMES]
        }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        var vme = this;
        var myMask = new Ext.LoadMask(this, { msg: "正在属性，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../DevMng/GetDevChnProperty',
            method: 'post', //方法  
            params: { GLOBALID: this.GLOBALID },
            callback: function (options, success, response) {
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
                        if (!(vrow.id == 'CHNNAME'
                            || vrow.id == 'CHNMODEL'
                            || vrow.id == 'JKSBBH')) {
                            if (index % 2 == 0)
                                vme.FIELDLEFT.add(vme.createEditor(vrow));
                            else
                                vme.FIELDRIGHT.add(vme.createEditor(vrow));

                            index++;
                        }

                    }
					if (v.params) {
						v.params.JKSBBHKKBH = v.params.JKSBBH.substring(0,18);
						v.params.JKSBBHLSH = v.params.JKSBBH.substring(18);
                        vme.setValues(v.params);
                    }
                    if (!v.success) {
                        Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"), v.msg);
                    }
                }
                else {
                    Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    },
    createEditor: function (vrow) {
        var vtype = 'string';
        var veditor = null;
        var venable = true;
        var vdata = [];
        if (Ext.isString(vrow.editor)) {
            if (vrow.editor == 'numberbox') {
                vtype = 'number';
            }
            else if (vrow.editor == 'checkbox') {
                vtype = 'boolean';
                vdata = [{ 'ID': 'True', 'NAME': 'True' }, { 'ID': 'False', 'NAME': 'False'}];
            }
            else if (vrow.editor == 'datebox')
                vtype = 'date';
        }
        else if (vrow.editor) {
            if (vrow.editor.type == 'numberbox')
                vtype = 'number';
            else if (vrow.editor.type == 'checkbox') {
                vtype = 'boolean';
                vdata = [{ 'ID': 'True', 'NAME': 'True' }, { 'ID': 'False', 'NAME': 'False'}];
            }
            else if (vrow.editor.type == 'datebox')
                vtype = 'date';
            else if (vrow.editor.type == 'combobox') {
                vtype = vrow.editor.type;
                var vcombdata = vrow.editor.options.data;
                for (var j = 0; j < vcombdata.length; j++) {
                    vdata.push({ 'ID': vcombdata[j].value, 'NAME': vcombdata[j].text });
                }
            }
        }
        else {
            venable = false;
        }
        if (venable)
            this.propertyid.push(vrow.id);
        if (vtype == 'combobox'
        || vtype == 'boolean') {
            var states = Ext.create('Ext.data.Store', {
                fields: ['ID', 'NAME'],
                data: vdata
            });

            return Ext.create('Ext.form.ComboBox', {
                fieldLabel: vrow.name,
                editable: false,
                store: states,
                queryMode: 'local',
                valueField: 'ID',
                displayField: 'NAME',
                disabled: !venable,
                value: vrow.value,
                name: vrow.id,
                width: 360
            });
        }

        return Ext.create('Ext.form.field.Text',
        {
            fieldLabel: vrow.name,
            disabled: !venable,
            value: vrow.value,
            name: vrow.id,
            width: 360
        });
    },
    getValues: function () {
        var v = this.getRawValues();
        var values = { GLOBALID: this.GLOBALID };


        v.JKSBBH = v.JKSBBHKKBH + v.JKSBBHLSH;
        delete v.JKSBBHKKBH;
        delete v.JKSBBHLSH;

        if (this.getproperty) {
            var params = '';
            for (var i = 0; i < this.propertyid.length; i++) {
                var a = v[this.propertyid[i]];

                if (typeof a != 'undefined') {
                    a = encodeURIComponent(a);
                }
                else {
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
    getRawValues: function () {
        var form = this.down('form');
        return form.getValues();
    },
    loadRecord: function (rec) {
        var JKSBBH = rec.get('JKSBBH');

        this.JKSBBHKKBH.setValue(JKSBBH.substr(0, 18));
        this.JKSBBHLSH.setValue(JKSBBH.substr(18, 6));


        this.down('form').loadRecord(rec);
    }
});

