Ext.define('App.SystemSetting.DevMng.DevChnInfo.Model', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'DEVICENAME', type: 'string' },
            { name: 'DEVICEDESC', type: 'string' },
            { name: 'DWBH', type: 'string' },
            { name: 'JKSBBH', type: 'string' },
            { name: 'PRODUCTID', type: 'string' },
            { name: 'PRODUCTNAME', type: 'string' },
            { name: 'COMPANYID', type: 'string' },
            { name: 'DEVTYPEID', type: 'string' },
            { name: 'COMPANYNAME', type: 'string' },
            { name: 'DEVTYPENAME', type: 'string' },
            { name: 'ADDR', type: 'string' },
            { name: 'PORT', type: 'string' },
            { name: 'USR', type: 'string' },
            { name: 'PSW', type: 'string' }
        ]
});

//定义编辑对话框
Ext.define('App.SystemSetting.DevMng.DevChnInfo', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    height: 422,
    title: '设备信息',
    initComponent: function () {
        this.wizardId = 'devinfo';

        this.propgrid = Ext.create('App.Common.Property', {
            height: 296,
            url: '../DevMng/GetDecChnProperty',
            params: { GLOBALID: null }
        });
        this.items = [
        {
            labelWidth: 70,
            xtype: 'textfield',
            width: 300,
            hidden: !this.wizard.modifyMod,
            disabled: true,
            allowBlank: false,
            fieldLabel: '设备编号',
            name: 'JKSBBH'
        },
        {
            labelWidth: 70,
            xtype: 'textfield',
            width: 300,
            allowBlank: false,
            fieldLabel: SPLanguage.getMessage("SBMC"),
            name: 'CHNNAME',
            emptyText: SPLanguage.getMessage("BNWK")
        },
        {
            labelWidth: 70,
            xtype: 'textfield',
            width: 300,
            allowBlank: true,
            fieldLabel: '型号',
            name: 'CHNMODEL'
        },
        {
            xtype: 'text',
            text: '属性:',
            margin: '0 0 10 0'
        },
        this.propgrid];
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
        vme.propgrid.params.GLOBALID = vme.wizard.rightParams.ID;
        vme.propgrid.refresh();
    },
    onWizardActive: function () {
        var vme = this;
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

