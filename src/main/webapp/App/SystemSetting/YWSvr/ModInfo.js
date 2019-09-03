Ext.define('App.SystemSetting.YWSvr.ModInfo.Model', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'MODID', type: 'string' },
            { name: 'USERID', type: 'string' },
            { name: 'MODNAME', type: 'string' },
            { name: 'MODCOMMENT', type: 'string' },
            { name: 'STARTTIME', type: 'string' },
            { name: 'STOPTIME', type: 'string' },
            { name: 'PARAMS', type: 'string' }
        ]
});

//定义编辑对话框
Ext.define('App.SystemSetting.YWSvr.ModInfo', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    height: 422,
    title: '模板信息',
    initComponent: function () {
        var vme = this;
        this.wizardId = 'modinfo';
        var timeTest = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/i;
        Ext.apply(Ext.form.field.VTypes, {
            //  vtype validation function
            time: function (val, field) {
                return timeTest.test(val);
            },
            // vtype Text property: The error text to display when the validation function returns false
            timeText: '时间格式不正确.  必须输入格式 "12:34".',
            // vtype Mask property: The keystroke filter mask
            timeMask: /[\d\s:]/i
        });
        this.items = [
        {
            labelWidth: 70,
            xtype: 'textfield',
            width: 300,
            hidden: true,
            allowBlank: true,
            name: 'MODID',
            value: vme.wizard.rightParams.MODID
        },
        {
            labelWidth: 70,
            xtype: 'textfield',
            width: 300,
            hidden: true,
            allowBlank: true,
            name: 'USERID',
            value: vme.wizard.rightParams.USERID
        },
        {
            labelWidth: 70,
            xtype: 'textfield',
            width: 300,
            allowBlank: false,
            fieldLabel: SPLanguage.getMessage("NAME"),
            name: 'MODNAME',
            emptyText: SPLanguage.getMessage("BNWK")
        },
        {
            labelWidth: 70,
            xtype: 'textfield',
            width: 300,
            allowBlank: true,
            fieldLabel: SPLanguage.getMessage("REMARK"),
            name: 'MODCOMMENT'
        },
        {
            labelWidth: 70,
            xtype: 'textfield',
            width: 300,
            fieldLabel: SPLanguage.getMessage("STARTTIME"),
            name: 'STARTTIME',
            vtype: 'time',
            value: '00:00'
        },
        {
            labelWidth: 70,
            xtype: 'textfield',
            width: 300,
            fieldLabel: SPLanguage.getMessage("OVERTIME"),
            name: 'STOPTIME',
            vtype: 'time',
            value: '23:59'
        }];
        this.callParent(arguments);
    },
    onPrev: function () {
    },
    onNext: function () {
        if (!this.isValid())
            return;
        this.wizard.onSetWizardItemActive('CheckProp');
    },
    onWizardInit: function () {
        var vme = this;
        vme.isloading = true;
        var form = vme.down('form');
        var values = form.getValues();
        if (typeof values.MODID != 'undefined'
        && values.MODID != '') {
            vme.wizard.setWizardBtnDisabled('finished', true);
            vme.wizard.setWizardBtnDisabled('prev', true);
            vme.wizard.setWizardBtnDisabled('next', true);

            var myMask = new Ext.LoadMask(vme.wizard, { msg: "正在获取设备信息，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../YWSvr/GetModInfo',
                method: 'post', //方法  
                params: { MODID: values.MODID },
                callback: function (options, success, response) {
                    myMask.hide();
                    vme.isloading = false;
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        form.loadRecord(Ext.create('App.SystemSetting.YWSvr.ModInfo.Model', v));
                        if (typeof v.PARAMS != 'undefined'
                        && v.PARAMS != '') {
                            vme.wizard.rightParams.PARAMS = Ext.JSON.decode(v.PARAMS);
                        }
                        else {
                            vme.wizard.rightParams.PARAMS = [];
                        }
                        vme.onWizardActive();
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        }
    },
    onWizardActive: function () {
        var vme = this;
        var form = vme.down('form');
        var values = form.getValues();

        if (!vme.isloading) {
            if (typeof values.MODID != 'undefined'
            && values.MODID != '') {
                vme.wizard.setWizardBtnDisabled('finished', false);
                vme.wizard.setWizardBtnDisabled('prev', true);
                vme.wizard.setWizardBtnDisabled('next', false);
            }
            else {
                vme.wizard.setWizardBtnDisabled('finished', true);
                vme.wizard.setWizardBtnDisabled('prev', true);
                vme.wizard.setWizardBtnDisabled('next', false);
            }
        }
    }
});

