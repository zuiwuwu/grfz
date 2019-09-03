
//定义编辑对话框
Ext.define('App.SystemSetting.JKXTMng.newDlg', {
    extend: 'App.Common.EditDlg',
    title: '接收服务属性',
    initComponent: function () {
        /////////////////////////////////////////////////////////
        //初始化参数

        var width = 400;

        this.combUNIT = Ext.create('App.Common.ComboBoxDropList', {
            allowBlank: false,
            fieldLabel: SPLanguage.getMessage("GXDW"),
            name: 'UNITID',
            url: '../UNIT/GetUNITCombo',
            width: width,
            listeners: {
                scope: this,
                select: function (combo, records, eOpts) {
                    var vid = records[0].get('ID');
                    var v = this.vJKXTBH.getValue();
                    if (v
                    && v.length > vid.length) {
                        v = vid + v.substr(vid.length, v.length - vid.length);
                    }
                    else {
                        v = vid;
                    }

                    this.vJKXTBH.setValue(v);
                }
            }

        });
        this.vJKXTBH = Ext.create('Ext.form.field.Text', {
            allowBlank: false,
            fieldLabel: '监控系统编号',
            name: 'JKXTBH',
            width: width,
            vtype: 'BH',
            textlength: 18,
            vtypeText: '必须输入18位数字编号'

        });
        this.items = [
                this.vJKXTBH,
                this.combUNIT,
                {
                    allowBlank: false,
                    fieldLabel: '网络服务名',
                    name: 'WLFWM',
                    width: width
                },
                {
                    allowBlank: false,
                    fieldLabel: '监控系统所在地',
                    name: 'JKXTSZD',
                    width: width
                },
                {
                    allowBlank: false,
                    fieldLabel: '图像路径',
                    name: 'TXLJ',
                    width: width
                },
                {
                    allowBlank: false,
                    fieldLabel: 'IP地址',
                    name: 'IPDZ',
                    width: width
                },
                {
                    xtype: 'numberfield',
                    allowBlank: false,
                    fieldLabel: '端口号',
                    name: 'JKXTPORT',
                    width: width,
                    value: 8080
                },
                {
                    allowBlank: false,
                    fieldLabel: '登录用户名',
                    name: 'JKXTUSER',
                    width: width
                },
                {
                    allowBlank: false,
                    fieldLabel: '登录密码',
                    name: 'JKXTPSW',
                    width: width
                },
                {
                    allowBlank: false,
                    fieldLabel: '联系人',
                    name: 'LXR',
                    width: width
                },
                {
                    allowBlank: false,
                    fieldLabel: SPLanguage.getMessage("LXDH"),
                    name: 'LXDH',
                    width: width
                }
                ];


        this.callParent(arguments);
    },
    getValues: function () {
        var vme = this;
        var form = vme.down('form');
        var v = form.getValues();
        v.OLDID = vme.JKXTBH;
        return v;
    }
});
