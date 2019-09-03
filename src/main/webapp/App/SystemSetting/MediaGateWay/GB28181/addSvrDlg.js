//定义编辑对话框
Ext.define('App.SystemSetting.MediaGateWay.GB28181.addSvrDlg', {
    extend: 'App.Common.EditDlg',
    title: '下级网关属相',
    initComponent: function () {

        var vwidth = 280;
        var vlabelWidth = 90;
        var states = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [
        { "id": "0", "name": "否" },
        { "id": "1", "name": "是" }
    ]
        });

        // Create the combo box, attached to the states data store
        var CheckUser = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '是否鉴权',
            store: states,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            value: this.CHECKUSER,
            labelWidth: vlabelWidth,
            width: vwidth,
            name: 'CHECKUSER',
            allowBlank: false
        });
        this.items = [
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'ID',
            width: vwidth,
            hidden: true,
            value: this.ID
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'LOWERSVR',
            width: vwidth,
            hidden: true,
            value: this.LOWERSVR
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'SVRID',
            width: vwidth,
            value: this.SVRID,
            fieldLabel: '编号',
            allowBlank: false
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'SVRNAME',
            width: vwidth,
            value: this.SVRNAME,
            fieldLabel: '名称',
            allowBlank: false
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'SVRUSER',
            width: vwidth,
            value: this.SVRUSER,
            fieldLabel: '登录用户',
            allowBlank: true
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'SVRPSW',
            width: vwidth,
            value: this.SVRPSW,
            fieldLabel: '登录密码',
            allowBlank: true
        },
        CheckUser,
        Ext.create('App.Common.ComboBoxDropList', {
            fieldLabel: '网关类型',
            labelWidth: vlabelWidth,
            width: vwidth,
            allowBlank: true,
            name: 'SERVERTYPE',
            url: '../GB28181/GetServerType?id=' + this.MEDIAGATEWAYID,
            value: this.SERVERTYPE
        })
        ];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent();
    }
});

