Ext.define('App.SystemSetting.PoliceCar.newDlg', {
    extend: 'App.Common.EditDlg',
    title: '属性',
    initComponent: function () {
        var width = 300;

        this.combDWTYPE = Ext.create('App.Common.ComboBoxDropList', {
            hideLabel: true,
            width: 160,
            value: '',
            editable: true,
            url: '../GISPoliceCar/GetGLLX'
        });
        this.items = [{
            xtype: 'textfield',
            allowBlank: true,
            hidden: true,
            fieldLabel: '值班日期',
            name: 'ID',
            labelWidth: 90,
            width: width
        },
        {
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: '接收编号',
            name: 'RCVID',
            labelWidth: 90,
            width: width
        },
        {
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: '号牌',
            name: 'CLHP',
            labelWidth: 90,
            width: width
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: '管理人',
            name: 'GLR',
            labelWidth: 90,
            width: width
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: '电话',
            name: 'PHONE',
            labelWidth: 90,
            width: width
        },
        Ext.create('App.Common.ComboBoxDropList', {
            width: width,
            name: 'GXDWBH',
            labelWidth: 90,
            allowBlank: true,
            fieldLabel: '管辖单位',
            url: '../UNIT/GetUNITCombo'
        }),
        Ext.create('App.Common.ComboBoxDropList', {
            width: width,
            name: 'CLLX',
            labelWidth: 90,
            allowBlank: false,
            fieldLabel: '车辆图标',
            url: '../GISPoliceCar/GetGLLX'
        }),
        Ext.create('App.Common.ComboBoxDropList', {
            width: width,
            name: 'CLFL',
            labelWidth: 90,
            allowBlank: true,
            fieldLabel: '车辆类型',
            multiSelect: true,
            url: '../GISPoliceCar/GetCLFL'
        })
        ];
        this.callParent(arguments);
    },
    afterRender: function () {
        var vme = this;
        vme.callParent(arguments);
        if (vme.CARID) {
            var myMask = new Ext.LoadMask(vme, { msg: "正在获取信息，请稍候！" });
            myMask.show();
            var form = vme.down('form');
            Ext.Ajax.request({
                url: '../GISPoliceCar/Get',
                method: 'post', //方法  
                params: { ID: vme.CARID },
                scope: this,
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        this.setValues(v);
                    }
                    else {
                        alert(SPLanguage.getMessage("HQSB"));
                        vme.close();
                    }
                }
            });
        }

    }
});
