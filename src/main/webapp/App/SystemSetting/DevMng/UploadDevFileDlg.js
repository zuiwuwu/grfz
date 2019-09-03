//定义编辑对话框
Ext.define('App.SystemSetting.DevMng.UploadDevFileDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    initComponent: function () {
        this.addEvents('saveok');

        var labelWidth = 50;

        this.combCompany = Ext.create('App.Common.ComboBoxDropList', {
            fieldLabel: '厂家',
            name: 'COMPANYID',
            labelWidth: labelWidth,
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
            remoteFilter: true,
            listeners: {
                scope: this,
                select: this.onDevTypeSelect
            },
            url: '../DevMng/ListDevType'
        });

        this.combDevProduct = Ext.create('App.Common.ComboBoxDropList', {
            fieldLabel: '型号',
            labelWidth: labelWidth,
            name: 'PRODUCTID',
            remoteFilter: true,
            url: '../DevMng/ListProduct'
        });

        this.moddownload = Ext.create('Ext.Component',
        {
            html: '<a href="../download/DEVICE_DEV.xls">模板下载</a>'
        });
        this.PRODUCTNAME = Ext.create('Ext.form.field.Text',
        {
            name: 'PRODUCTNAME',
            hidden: true
        });
        this.items = [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    width: 320,
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                    {
                        xtype: 'textfield',
                        id: 'ID',
                        name: 'ID',
                        hidden: true,
                        value: this.ID
                    },
                    this.PRODUCTNAME,
                    {
                        allowBlank: false,
                        labelWidth: 50,
                        xtype: 'filefield',
                        id: 'FILE',
                        emptyText: '请选择文件',
                        fieldLabel: '文件',
                        name: 'FILE',
                        buttonText: '',
                        buttonConfig: {
                            iconCls: 'upload-icon'
                        }
                    },
                    this.combCompany,
                    this.combDevType,
                    this.combDevProduct,
                    this.moddownload]
                }];

        this.buttons = [
                {
                    text: SPLanguage.getMessage("SURE"),
                    action: 'save',
                    scope: this,
                    handler: this.onSave
                },
                {
                    text: SPLanguage.getMessage("GB"),
                    scope: this,
                    handler: this.close
                }];


        this.callParent(arguments);
    },
    onSave: function (button) {
        var vme = this;
        var form = this.down('form').getForm();
        if (form.isValid()) {
            this.PRODUCTID = this.combDevProduct.getValue();
            this.PRODUCTNAME.setValue(this.combDevProduct.getRawValue());
            form.submit({
                url: vme.url,
                waitMsg: SPLanguage.getMessage("ING") + this.title + '...',
                success: function (fp, o) {
                    var result = Ext.JSON.decode(this.response.responseText);
                    if (result.success) {
                        result.PRODUCTID = vme.PRODUCTID;
                        vme.fireEvent('saveok', result);
                        vme.close();
                    }
                    else {
                        alert(result.msg);
                    }
                },
                failure: function () {
                    alert('上传文件失败！');
                }
            });
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

    }
});

