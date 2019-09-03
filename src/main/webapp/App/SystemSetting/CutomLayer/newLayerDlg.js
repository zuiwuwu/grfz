Ext.define('App.SystemSetting.CutomLayer.newLayerDlg', {
    extend: 'App.Common.EditDlg',
    title: '图层属性',
    initComponent: function () {

        this.items = [
                            {
                                hidden: true,
                                allowBlank: true,
                                fieldLabel: 'LAYERID',
                                name: 'LAYERID',
                                value: this.LAYERID
                            },
                        {
                            xtype: 'textfield',
                            allowBlank: false,
                            fieldLabel: '名称',
                            name: 'LAYERNM',
                            value: this.LAYERNM,
                            width: 300,
                            labelWidth: 70
                        },
                        Ext.create('App.Common.ComboBoxDropList',
                        {
                            allowBlank: false,
                            fieldLabel: '类型',
                            name: 'LAYERTYPE',
                            value: this.LAYERTYPE,
                            width: 300,
                            labelWidth: 70,
                            url: '../CustomLayer/GetLayerTypeCombo'
                        })];


        this.callParent(arguments);
    }
});
