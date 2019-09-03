Ext.define('App.SystemSetting.About.Model', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'ENCRYPTID', type: 'string' },
            { name: 'ENCRYPTREG', type: 'string' }
        ]
});

Ext.define('App.SystemSetting.About', {
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
                        fieldLabel: '注册编号',
                        name: 'ENCRYPTID',
                        disabled: true
                    },
                    {
                        labelWidth: 90,
                        xtype: 'textfield',
                        fieldLabel: '注册码',
                        name: 'ENCRYPTREG'
                    }]
                }];
        this.tbar = [
         {
             xtype: 'button',
             text: SPLanguage.getMessage("REFRESH"),
             tooltip: SPLanguage.getMessage("REFRESH"),
             iconCls: 'icon-refresh',
             scope: this,
             handler: this.onRefresh
         },
         '-',
         {
             xtype: 'button',
             text: SPLanguage.getMessage("SAVE"),
             tooltip: SPLanguage.getMessage("SAVE"),
             iconCls: 'icon-save',
             scope: this,
             handler: this.onSave
         },
         '-',
         Ext.create('App.SWFUpload.UploadButton',
         {
         	text: '上传升级包'
         }),
         {
             xtype: 'button',
             text: SPLanguage.getMessage("SAVE"),
             tooltip: SPLanguage.getMessage("SAVE"),
             iconCls: 'icon-save',
             scope: this,
             handler: function()
             {
             	Ext.create('App.SWFUpload.UploadPanel',
             	{
             	}).show();
             }
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
            url: '../Encrypt/GetEncrypt',
            method: 'post', //方法  
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    form.loadRecord(Ext.create('App.SystemSetting.About.Model', v));
                }
                else {
                    alert(SPLanguage.getMessage("QUERYSB"));
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
        var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZBCQSH") });
        myMask.show();
        Ext.Ajax.request({
            url: '../Encrypt/SetEncrypt', //请求地址  
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
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    }
});
