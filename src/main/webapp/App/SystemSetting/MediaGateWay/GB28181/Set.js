Ext.define('App.SystemSetting.MediaGateWay.GB28181.Set.Model', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'ServerID', type: 'string' },
            { name: 'ServerBindIP', type: 'string' },
            { name: 'ServerBindPort', type: 'string' },
            { name: 'ServerWebPort', type: 'string' },
            { name: 'ServerRtspPort', type: 'string' },
            { name: 'EncryptID', type: 'string' },
            { name: 'EncryptSN', type: 'string' }
        ]
});

Ext.define('App.SystemSetting.MediaGateWay.GB28181.Set', {
    extend: 'Ext.Panel',
    layout: 'fit',
    border: false,
    initComponent: function () {
        var vme = this;

        this.items = [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [{
                        labelWidth: 90,
                        xtype: 'textfield',
                        fieldLabel: '服务器编号',
                        name: 'ServerID'
                    },
                    {
                        labelWidth: 90,
                        xtype: 'textfield',
                        fieldLabel: '绑定IP',
                        name: 'ServerBindIP'
                    },
                    {
                        labelWidth: 90,
                        xtype: 'textfield',
                        fieldLabel: '绑定端口',
                        name: 'ServerBindPort'
                    },
                    {
                        labelWidth: 90,
                        xtype: 'textfield',
                        fieldLabel: 'WEB端口',
                        name: 'ServerWebPort'
                    },
                    {
                        labelWidth: 90,
                        xtype: 'textfield',
                        fieldLabel: 'RTSP端口',
                        name: 'ServerRtspPort'
                    },
                    {
                        labelWidth: 90,
                        xtype: 'textfield',
                        fieldLabel: '注册编号',
                        name: 'EncryptID'
                    },
                    {
                        labelWidth: 90,
                        xtype: 'textfield',
                        fieldLabel: '注册序列号',
                        name: 'EncryptSN'
                    }]
                }];
        this.tbar = [
         {
             xtype: 'button',
             text: '刷新',
             tooltip: '刷新',
             iconCls: 'icon-refresh',
             scope: this,
             handler: this.onRefresh
         },
         '-',
         {
             xtype: 'button',
             text: '保存',
             tooltip: '保存',
             iconCls: 'icon-save',
             scope: this,
             handler: this.onSave
         },
         '-',
         {
             xtype: 'button',
             text: '重启服务',
             tooltip: '重启服务',
             iconCls: 'icon-set',
             scope: this,
             handler: this.onRestart
         }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.onRefresh();
    },
    onRefresh: function () {
        var vme = this;
        var form = this.down('form');
        var myMask = new Ext.LoadMask(vme, { msg: "正在查询，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../GB28181/GetSystemParams?id=' + this.MEDIAGATEWAYID,
            method: 'post', //方法  
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    form.loadRecord(Ext.create('App.SystemSetting.MediaGateWay.GB28181.Set.Model', v));
                }
                else {
                    alert('删除失败！');
                }
            }
        });
    },
    onRestart: function () {
        var vme = this;
        var form = this.down('form');
        var myMask = new Ext.LoadMask(vme, { msg: "正在操作，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../GB28181/Restart?id=' + this.MEDIAGATEWAYID,
            method: 'post', //方法  
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                     if (result.success) {
                        alert("重启成功");
                    }
                    else {
                        alert(result.msg);
                    }
                }
                else {
                     alert("网络错误！");
                }
            }
        });
    },
    getValues: function () {
        var vme = this;
        var form = vme.down('form');
        return form.getValues();
    },
    isValid: function () {
        var form = this.down('form');
        return form.isValid();
    },
    onSave: function () {
        var vme = this;
        //var win = button.up('window');
        if (!this.isValid())
            return;
        var values = vme.getValues();
        var myMask = new Ext.LoadMask(vme, { msg: "正在保存，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../GB28181/SetSystemParams?id=' + this.MEDIAGATEWAYID, //请求地址  
            params: values,
            method: 'post', //方法  
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        alert("保存成功");
                    }
                    else {
                        alert(result.msg);
                    }
                }
                else {
                    alert("网络错误！");
                }
            }
        });
    }
});
