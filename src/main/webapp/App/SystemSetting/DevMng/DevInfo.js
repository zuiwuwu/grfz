//定义编辑对话框
Ext.define('App.SystemSetting.DevMng.DevInfo', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 700,
    height: 422,
    title: '设备信息',
    initComponent: function () {
        this.wizardId = 'devinfo';

        var labelWidth = 90;

        this.combCompany = Ext.create('App.Common.ComboBoxDropList', {
            fieldLabel: '厂家',
            name: 'COMPANYID',
            labelWidth: labelWidth,
            width: 320,
            //disabled: this.wizard.modifyMod,
            //hidden: this.wizard.modifyMod,
            listeners: {
                scope: this,
                select: this.onCompanySelect
            },
            url: '../DevMng/ListCompany'
        });
        this.combDevType = Ext.create('App.Common.ComboBoxDropList', {
            fieldLabel: SPLanguage.getMessage("STYLE"),
            name: 'DEVTYPEID',
            labelWidth: labelWidth,
            width: 320,
            autoStoreLoad: false,
            remoteFilter: true,
            //disabled: this.wizard.modifyMod,
            //hidden: this.wizard.modifyMod,
            listeners: {
                scope: this,
                select: this.onDevTypeSelect
            },
            url: '../DevMng/ListDevType'
        });

        this.combDevProduct = Ext.create('App.Common.ComboBoxDropList', {
            fieldLabel: '型号',
            labelWidth: labelWidth,
            width: 320,
            autoStoreLoad: false,
            remoteFilter: true,
            //disabled: this.wizard.modifyMod,
            //hidden: this.wizard.modifyMod,
            name: 'PRODUCTID',
            url: '../DevMng/ListProduct',
            listeners: {
                scope: this,
                select: this.onProductSelect
            }
        });

        this.vADDR = Ext.create('Ext.form.field.Text', {
            labelWidth: labelWidth,
            width: 320,
            allowBlank: true,
            fieldLabel: SPLanguage.getMessage("ADDR"),
            name: 'ADDR'
        });
        this.vPORT = Ext.create('Ext.form.field.Number', {
            labelWidth: labelWidth,
            width: 320,
            allowBlank: true,
            fieldLabel: '端口',
            name: 'PORT'
        });
        this.vUSR = Ext.create('Ext.form.field.Text', {
            labelWidth: labelWidth,
            width: 320,
            allowBlank: true,
            fieldLabel: '登陆用户',
            name: 'USR'
        });
        this.vPSW = Ext.create('Ext.form.field.Text', {
            labelWidth: labelWidth,
            width: 320,
            allowBlank: true,
            fieldLabel: '登陆密码',
            name: 'PSW'
        });
        
        var items = [{
            labelWidth: labelWidth,
            xtype: 'textfield',
            width: 320,
            allowBlank: false,
            fieldLabel: SPLanguage.getMessage("SBMC"),
            name: 'DEVICENAME',
            emptyText: SPLanguage.getMessage("BNWK")
        },
        {
            labelWidth: labelWidth,
            xtype: 'textfield',
            width: 320,
            allowBlank: true,
            fieldLabel: SPLanguage.getMessage("REMARK"),
            name: 'DEVICEDESC'
        },
        {
            labelWidth: labelWidth,
            xtype: 'textfield',
            width: 320,
            allowBlank: true,
            fieldLabel: 'MAC地址',
            name: 'MAC'
        },
        this.combCompany,
        this.combDevType,
        this.combDevProduct,
        this.vADDR,
        this.vPORT,
        this.vUSR,
        this.vPSW];
        
        this.customkey = [];
		var vzd = Ext.CustomDic.getZD('1');
		for (var i = 0; i < vzd.length; i++) {
			var item = Ext.CustomDic.createInput(vzd[i], {
						labelWidth : labelWidth,
						width : 320,
						allowBlank : true,
						editable : true
					});
			this.customkey.push(item);
			items.push(item);
		}
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
        
        var vl = [[],[]];
        for(var i = 0;i < items.length;i ++)
        {
        	vl[i%2].push(items[i]);
        }
        this.items = [
        {
            xtype: 'container',
            layout: 'hbox',
            width: '100%',
            items: [{
                xtype: 'container',
                layout: 'anchor',
                width: 320,
                items: vl[0]
            }, {
                xtype: 'container',
                layout: 'anchor',
                width: 320,
                padding: '0 0 0 16',
                items: vl[1]
            }]
        }
        ];

        this.items = [
        {
            xtype: 'container',
            layout: 'vbox',
            items: [this.items[0],
        this.FIELDITMES
        ]
        }];
        this.callParent(arguments);
    },
    onPrev: function () {
    },
    onNext: function () {
        if (!this.isValid())
            return;
        this.wizard.onSetWizardItemActive('devchns');
    },
    onWizardInit: function () {
        var vme = this;
        if (vme.wizard.modifyMod) {
            vme.isloading = true;
            vme.wizard.setWizardBtnDisabled('finished', true);
            vme.wizard.setWizardBtnDisabled('prev', true);
            vme.wizard.setWizardBtnDisabled('next', true);
            var form = vme.down('form');
            var myMask = new Ext.LoadMask(vme, { msg: "正在获取设备信息，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../DevMng/GetDevInfo',
                method: 'post', //方法  
                params: { DEVICEID: vme.wizard.rightParams.ID },
                scope: vme,
                callback: function (options, success, response) {
                    myMask.hide();
                    vme.isloading = false;
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        vme.setValues(v);
                        vme.PRODUCTID = v.PRODUCTID;
                        vme.wizard.rightParams.PRODUCTID = v.PRODUCTID;

                        this.COMPANYID = v.COMPANYID;
                        this.combDevType.store.clearFilter(true);
                        this.combDevType.store.filter([{
                            property: 'id',
                            value: v.COMPANYID
                        }]);

                        this.DEVTYPEID = v.DEVTYPEID;
                        this.combDevProduct.store.clearFilter(true);
                        this.combDevProduct.store.filter([{
                            property: 'id',
                            value: v.COMPANYID + ',' + v.DEVTYPEID
                        }]);


                        vme.onWizardActive();
                        vme.onGetPro();
                    }
                    else {
                        Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        }
    },
    onWizardActive: function () {
        var vme = this;
        if (!vme.isloading) {
            if (!vme.wizard.modifyMod) {
                vme.wizard.setWizardBtnDisabled('finished', true);
                vme.wizard.setWizardBtnDisabled('prev', true);
                vme.wizard.setWizardBtnDisabled('next', false);


            }
            else {
                vme.wizard.setWizardBtnDisabled('finished', false);
                vme.wizard.setWizardBtnDisabled('prev', true);
                vme.wizard.setWizardBtnDisabled('next', false);
            }
        }

    },
    onCompanySelect: function (combo, records, eOpts) {

        if (records.length > 0) {
            if (this.COMPANYID != records[0].get('ID')) {
                this.COMPANYID = records[0].get('ID');
                this.combDevType.store.clearFilter(true);
                this.combDevType.store.filter([{
                    property: 'id',
                    value: records[0].get('ID')
                }]);
                this.combDevType.updateLayout();

                this.combDevProduct.store.clearFilter(true);
                this.combDevProduct.store.filter([{
                    property: 'id',
                    value: this.combCompany.getValue() + ',' + this.combDevType.getValue()
                }]);
                this.combDevProduct.updateLayout();
            }
        }

    },
    onDevTypeSelect: function (combo, records, eOpts) {
        if (records.length > 0) {
            if (this.DEVTYPEID != records[0].get('ID')) {
                this.DEVTYPEID = records[0].get('ID');
                this.combDevProduct.store.clearFilter(true);
                this.combDevProduct.store.filter([{
                    property: 'id',
                    value: this.combCompany.getValue() + ',' + records[0].get('ID')
                }]);
                this.combDevProduct.updateLayout();
            }
        }

    },
    onProductSelect: function (combo, records, eOpts) {
        if (records.length > 0) {
            if (this.PRODUCTID != records[0].get('ID')) {
                this.PRODUCTID = records[0].get('ID');
                this.wizard.rightParams.PRODUCTID = this.PRODUCTID;
                this.onGetPro();
            }
        }

    },
    onDevTypeLoad: function (store) {
        var v = this.combDevType.getValue();

    },
    onGetPro: function () {
        var vme = this;
        var v = vme.wizard.getValues();
        var vme = this;
        var myMask = new Ext.LoadMask(this, { msg: "正在属性，请稍候！" });
        myMask.show();
        this.DEVICEID = vme.wizard.rightParams.ID;
        var vPRODUCTID = vme.PRODUCTID;
        this.FIELDLEFT.removeAll(true);
        this.FIELDRIGHT.removeAll(true);
        Ext.Ajax.request({
            url: '../DevMng/GetAddDevProperty',
            method: 'post', //方法  
            params: { PRODUCTID: vPRODUCTID, DEVICEID: this.DEVICEID },
            scope: vme,
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    if (v.success) {
                        vme.getproperty = true;
                        vme.propertyid = [];
                        var voldsource = vme.getRawValues();
                        var index = 0;
                        for (var i = 0; i < v.rows.length; i++) {
                            var vrow = v.rows[i];

                            if (vrow.id == "ADDR") {
                                if (!this.DEVICEID) {
                                    this.vADDR.setValue(vrow.value);
                                }
                                continue;
                            }
                            else if (vrow.id == "PORT") {
                                if (!this.DEVICEID) {
                                    this.vPORT.setValue(vrow.value);
                                }
                                continue;
                            }
                            else if (vrow.id == "USR") {
                                if (!this.DEVICEID) {
                                    this.vUSR.setValue(vrow.value);
                                }
                                continue;
                            }
                            else if (vrow.id == "PSW") {
                                if (!this.DEVICEID) {
                                    this.vPSW.setValue(vrow.value);
                                }
                                continue;
                            }

                            if (typeof voldsource[vrow.id] != 'undefined') {
                                vrow.value = voldsource[vrow.id];
                            }

                            if (index % 2 == 0)
                                vme.FIELDLEFT.add(vme.createEditor(vrow));
                            else
                                vme.FIELDRIGHT.add(vme.createEditor(vrow));


                            index++;

                        }
                    }
                    else {
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
                width: 320,
                labelWidth: 90
            });
        }
        else if (vtype == 'number') {
            return Ext.create('Ext.form.field.Number', {
                fieldLabel: vrow.name,
                disabled: !venable,
                value: vrow.value,
                name: vrow.id,
                width: 320,
                labelWidth: 90
            });
        }

        return Ext.create('Ext.form.field.Text',
        {
            fieldLabel: vrow.name,
            disabled: !venable,
            value: vrow.value,
            name: vrow.id,
            width: 320,
            labelWidth: 90
        });
    },
    getValues: function () {
        var v = this.getRawValues();
        var values = v;
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
                delete values[this.propertyid[i]];
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
       values.CUSTOMKEYVALUES = Ext.JSON.encode(vcustomkey);
        return values;
    },
    getRawValues: function () {
        var form = this.down('form');
        return form.getValues();
    }
});

