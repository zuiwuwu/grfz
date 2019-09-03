Ext.define('App.SystemSetting.TransRule.newDlg', {
    extend: 'App.Common.EditDlg',
    title: SPLanguage.getMessage("PROPERTY"),
    formWidth: 600,
    requires: ['App.Common.CheckBoxFieldset'],
    initComponent: function () {
        this.items = [
                        {
                            allowBlank: true,
                            name: 'RULEID',
                            hidden: true
                        },
                        {
                            allowBlank: false,
                            fieldLabel: '规则名称',
                            name: 'RULENAME',
                            emptyText: ''
                        },
                        {
                            xtype: 'textareafield',
                            allowBlank: true,
                            fieldLabel: '包含地址',
                            name: 'INCD',
                            value: '*.*.*.*',
                            emptyText: '如：192.168.1.*;10.*.*.*'
                        },
                        {
                            xtype: 'textareafield',
                            allowBlank: true,
                            fieldLabel: '排除地址',
                            name: 'OUTCD',
                            emptyText: '如：192.168.1.*;10.*.*.*'
                        },
                        {
                            xtype: 'checkboxfieldset',
                            title: SPLanguage.getMessage("SSLL"),
                            defaultType: 'textfield',
                            collapsed: false,
                            collapsible: false,
                            checkboxName: 'REALVIEW',
                            layout: 'anchor',
                            defaults: {
                                anchor: '50%'
                            },
                            items: [{
                                xtype: 'combo',
                                fieldLabel: SPLanguage.getMessage("STYLE"),
                                name: 'LINKTYPE',
                                allowBlank: false,
                                emptyText: '请选择',
                                displayField: 'NAME',
                                valueField: 'ID',
                                store: {
                                    data: [{ ID: '1', NAME: '直接连接' }, { ID: '2', NAME: '媒体服务器转发'}],
                                    fields: [{
                                        name: 'ID'
                                    }, {
                                        name: 'NAME'
                                    }]
                                }
                            }, {
                                xtype: 'comboboxdroplist',
                                fieldLabel: '转发服务',
                                name: 'LINKSVRID',
                                allowBlank: false,
                                url: '../TransRule/GetTransSvr'
                            }, , {
                                xtype: 'combo',
                                fieldLabel: '协议类型',
                                name: 'LINKPRT',
                                allowBlank: false,
                                emptyText: '请选择',
                                displayField: 'NAME',
                                valueField: 'ID',
                                store: {
                                    data: [{ ID: '2', NAME: 'UDP' }, { ID: '3', NAME: 'TCP'}],
                                    fields: [{
                                        name: 'ID'
                                    }, {
                                        name: 'NAME'
                                    }]
                                }
                            }, {
                                fieldLabel: 'IP地址',
                                name: 'LINKIP',
                                vtype: 'IPAddress',
                                allowBlank: false,
                                value: '0.0.0.0'
                            }, {
                                xtype: 'numberfield',
                                fieldLabel: '端口号',
                                name: 'LINKPORT',
                                allowBlank: false,
                                value: 0
                            }]
                        },
                        {
                            xtype: 'checkboxfieldset',
                            checkboxToggle: true,
                            title: SPLanguage.getMessage("LXHF"),
                            defaultType: 'textfield',
                            collapsed: false,
                            checkboxName: 'PLAYBACK',
                            layout: 'anchor',
                            defaults: {
                                anchor: '50%'
                            },
                            items: [{
                                xtype: 'comboboxdroplist',
                                fieldLabel: '回放位置',
                                name: 'PLAYSVRID',
                                allowBlank: false,
                                url: '../TransRule/GetPlaybackTransSvr'
                            }, {
                                fieldLabel: 'IP地址',
                                name: 'PLAYIP',
                                vtype: 'IPAddress',
                                allowBlank: false,
                                value: '0.0.0.0'
                            }, {
                                xtype: 'numberfield',
                                fieldLabel: '端口号',
                                name: 'PLAYPORT',
                                allowBlank: false,
                                value: 0
                            }]
                        }];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
    }
});

