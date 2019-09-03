Ext.define('App.SystemSetting.DevMng.batchDevInfo.Combo', {
    extend: 'Ext.form.field.ComboBox',
    allowBlank: false,
    forceSelection: true,
    width: 300,
    labelWidth: 70,
    editable: false,
    emptyText: '请选择',
    displayField: 'NAME',
    valueField: 'ID',
    initComponent: function () {
        var vme = this;
        this.store = new Ext.data.Store({
            autoLoad: true,
            remoteFilter: true,
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: this.url,
                reader: {
                    type: 'json',
                    root: 'rows',
                    successProperty: 'success',
                    totalProperty: 'total'
                },
                filterParam: 'id',
                encodeFilters: function (filters) {
                    return filters[0].value;
                }
            },
            fields: [{
                name: 'ID'
            }, {
                name: 'NAME'
            }]
        });

        this.callParent(arguments);
    }
});

//定义编辑对话框
Ext.define('App.SystemSetting.DevMng.batchDevInfo', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 700,
    height: 422,
    title: '设备信息',
    initComponent: function () {
        this.wizardId = 'devinfo';

        var labelWidth = 90;

        this.combCompany = Ext.create('App.SystemSetting.DevMng.batchDevInfo.Combo', {
            fieldLabel: '厂家',
            name: 'COMPANYID',
            labelWidth: labelWidth,
            disabled: this.wizard.modifyMod,
            hidden: this.wizard.modifyMod,
            listeners: {
                scope: this,
                select: this.onCompanySelect
            },
            url: '../DevMng/ListCompany'
        });
        this.combDevType = Ext.create('App.SystemSetting.DevMng.batchDevInfo.Combo', {
            fieldLabel: SPLanguage.getMessage("STYLE"),
            name: 'DEVTYPEID',
            labelWidth: labelWidth,
            disabled: this.wizard.modifyMod,
            hidden: this.wizard.modifyMod,
            listeners: {
                scope: this,
                select: this.onDevTypeSelect
            },
            url: '../DevMng/ListDevType'
        });

        this.combDevProduct = Ext.create('App.SystemSetting.DevMng.batchDevInfo.Combo', {
            fieldLabel: '型号',
            labelWidth: labelWidth,
            disabled: this.wizard.modifyMod,
            hidden: this.wizard.modifyMod,
            name: 'PRODUCTID',
            url: '../DevMng/ListProduct'
        });

        this.items = [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'container',
                layout: 'anchor',
                width: 300,
                items: [
        this.combCompany,
        this.combDevType,
        this.combDevProduct,
        {
            labelWidth: labelWidth,
            xtype: 'textfield',
            width: 300,
            allowBlank: false,
            fieldLabel: '起始地址',
            name: 'STARTADDR',
            vtype: 'IPAddress'
        },
        {
            labelWidth: labelWidth,
            xtype: 'textfield',
            width: 300,
            allowBlank: false,
            fieldLabel: '结束地址',
            name: 'STOPADDR',
            vtype: 'IPAddress'
        },
        {
            labelWidth: labelWidth,
            xtype: 'numberfield',
            width: 300,
            allowBlank: false,
            fieldLabel: '起始端口',
            name: 'STARTPORT',
            value: 0
        },
        {
            labelWidth: labelWidth,
            xtype: 'numberfield',
            width: 300,
            allowBlank: false,
            fieldLabel: '结束端口',
            name: 'STOPPORT',
            value: 0
        },
        {
            labelWidth: labelWidth,
            xtype: 'textfield',
            width: 300,
            allowBlank: true,
            fieldLabel: '登陆用户',
            name: 'USR'
        },
        {
            labelWidth: labelWidth,
            xtype: 'textfield',
            width: 300,
            allowBlank: true,
            fieldLabel: '登陆密码',
            name: 'PSW'
        }]
            }, {
                xtype: 'container',
                layout: 'anchor',
                width: 300,
                padding: '0 0 0 16',
                items: [
        ]
            }]
        }
        ];
        this.callParent(arguments);
    },
    onPrev: function () {
    },
    onNext: function () {
        if (!this.isValid())
            return;
        this.wizard.onSetWizardItemActive('devprop');
    },
    onWizardInit: function () {
        var vme = this;
        vme.isloading = true;
        if (vme.wizard.modifyMod) {
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
                callback: function (options, success, response) {
                    myMask.hide();
                    vme.isloading = false;
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        form.loadRecord(Ext.create('App.SystemSetting.DevMng.batchDevInfo.Model', v));
                        vme.wizard.rightParams.PRODUCTID = v.PRODUCTID;
                        vme.onWizardActive();
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
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

    },
    onDevTypeSelect: function (combo, records, eOpts) {
        
        if (records.length > 0) {
            this.combDevProduct.store.clearFilter(true);
            this.combDevProduct.store.filter([{
                property: 'id',
                value: this.combCompany.getValue() + ',' + records[0].get('ID')
            }]);
            this.combDevProduct.updateLayout();
        }

    },
    onDevTypeLoad: function (store) {
        var v = this.combDevType.getValue();
    }
});

