//定义编辑对话框
Ext.define('App.SystemSetting.DevMng.DevProp', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 700,
    title: SPLanguage.getMessage("SBSX"),
    initComponent: function () {
        this.wizardId = 'devprop';
        var vme = this;

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
        this.FIELDITMES = Ext.create('Ext.Container',
        {
            width: '100%',
            height: 400,
            layout: 'hbox',
            items: [this.FIELDLEFT, this.FIELDRIGHT]
        });
        this.items = [this.FIELDITMES];


        this.callParent(arguments);

    },
    onPrev: function () {
        if (!this.isValid())
            return;
        this.wizard.onSetWizardItemActive('devinfo');
    },
    onNext: function () {
        if (!this.isValid())
            return;
        this.wizard.onSetWizardItemActive('devchns');
    },
    onWizardActive: function () {
        var vme = this;
        vme.wizard.setWizardBtnDisabled('finished', false);
        vme.wizard.setWizardBtnDisabled('prev', false);
        vme.wizard.setWizardBtnDisabled('next', false);
        var v = vme.wizard.getValues();
        var vPRODUCTID = v.PRODUCTID;
        if (typeof vPRODUCTID == 'undefined') {
            vPRODUCTID = vme.wizard.rightParams.PRODUCTID;
        }
        if (this.PRODUCTID != vPRODUCTID) {
            this.PRODUCTID = vPRODUCTID;
            this.DEVICEID = vme.wizard.rightParams.ID;
            var vme = this;
            var myMask = new Ext.LoadMask(this, { msg: "正在属性，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../DevMng/GetAddDevProperty',
                method: 'post', //方法  
                params: { PRODUCTID: this.PRODUCTID, DEVICEID: this.DEVICEID },
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
                            alert(v.msg);
                        }
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        }

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
        var values = { };
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
            }
            values.PARAMS = params;
        }
        return values;
    },
    getRawValues: function () {
        var form = this.down('form');
        return form.getValues();
    }
});

