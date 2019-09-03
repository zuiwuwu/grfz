Ext.define('App.SystemSetting.CustomDic.newDlg', {
    extend: 'App.Common.EditDlg',
    title: SPLanguage.getMessage("PROPERTY"),
    formWidth: 320,
    requires: ['App.Common.ComboBoxDropList'],
    initComponent: function () {
        this.items = [
                        {
                            allowBlank: false,
                            fieldLabel: 'ID',
                            name: 'ZDLX',
                            readOnly: this.modifyMod
                        },
                        {
                            allowBlank: false,
                            fieldLabel: '名称',
                            name: 'ZDLXNM'
                        },
                        {
                        	xtype: 'comboboxdroplist',
                            allowBlank: false,
                            fieldLabel: '类型',
                            name: 'GLLX',
                            data: Ext.CustomDic.data.GLLXdata,
                            readOnly: this.modifyMod
                        },
                        {
                        	xtype: 'comboboxdroplist',
                            allowBlank: false,
                            fieldLabel: '输入类型',
                            name: 'SRLX',
                            data: Ext.CustomDic.data.SRLXdata
                        },
                        {
                        	xtype: 'comboboxdroplist',
                            allowBlank: false,
                            fieldLabel: '是否在列表中显示',
                            name: 'SFXS',
                            data: [{ID:'0',NAME:'否'},
                            {ID:'1',NAME:'是'}],
                            value: 1
                        },
                        {
                        	xtype: 'comboboxdroplist',
                            allowBlank: false,
                            fieldLabel: '是否作为过滤条件',
                            name: 'SFGL',
                            data: [{ID:'0',NAME:'否'},
                            {ID:'1',NAME:'是'}],
                            value: 1
                        },
                        {
                        	xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: '标签长度',
                            name: 'BQDX',
                            value: 60
                        },
                        {
                        	xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: '排序序号',
                            name: 'INDEXID',
                            value: 0
                        }];

        this.callParent(arguments);
    }
});

