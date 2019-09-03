Ext.define('App.SystemSetting.RTSPSvr.UserInfo.Model', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'USERID', type: 'string' },
            { name: 'USERNAME', type: 'string' },
            { name: 'DESCRIPTION', type: 'string' }
        ]
});

//定义编辑对话框
Ext.define('App.SystemSetting.RTSPSvr.UserInfo', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    height: 422,
    title: '服务信息',
    initComponent: function () {
        this.wizardId = 'userinfo';



        this.pswfield = Ext.create('Ext.form.FieldSet', {
            flex: 1,
            title: SPLanguage.getMessage("PASSWORD"),
            layout: 'anchor',
            items: [{
                width: 300,
                labelWidth: 80,
                xtype: 'textfield',
                name: 'PSW',
                fieldLabel: SPLanguage.getMessage("PASSWORD"),
                inputType: 'password'
            }, {
                width: 300,
                labelWidth: 80,
                xtype: 'textfield',
                name: 'COMFIRMPSW',
                fieldLabel: SPLanguage.getMessage("MAQR"),
                inputType: 'password'
            }]
        });
        this.items = [
        {
            labelWidth: 91,
            xtype: 'textfield',
            width: 300,
            allowBlank: false,
            fieldLabel: SPLanguage.getMessage("USERNAME"),
            name: 'USERNAME',
            emptyText: SPLanguage.getMessage("BNWK")
        },
        {
            labelWidth: 91,
            xtype: 'textfield',
            width: 300,
            allowBlank: true,
            fieldLabel: SPLanguage.getMessage("REMARK"),
            name: 'DESCRIPTION'
        },
        this.pswfield,
        {
            labelWidth: 91,
            xtype: 'numberfield',
            width: 200,
            allowBlank: false,
            fieldLabel: SPLanguage.getMessage("YYDLS"),
            name: 'ALLOWLOGONNUM',
            value: '1',
            hidden: true
        },
        {
            labelWidth: 91,
            xtype: 'numberfield',
            width: 200,
            allowBlank: false,
            name: 'TYPE',
            value: '32768',
            hidden: true
        }];
        this.callParent(arguments);
    },
    onPrev: function () {
    },
    onNext: function () {
        if (!this.isValid())
            return;
        var v = this.getValues();
        if (v.PSW != v.COMFIRMPSW) {
            alert(SPLanguage.getMessage("MMBZQ"));
            return;
        }

        if (typeof this.wizard.rightParams.ID == 'undefined') {
            ///////////////////////////////////////////////////////////////////
            //检查用户是否已经存在
            var vme = this;
            Ext.Ajax.request({
                url: '../UserManage/UserIsExist', //查询案件详细信息
                method: 'post', //方法  
                params: { USERNAME: v.USERNAME },
                callback: function (options, success, response) {
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else {
                            vme.wizard.onSetWizardItemActive('righttypesel');
                        }
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        }
        else {
            this.wizard.onSetWizardItemActive('righttypesel');
        }
    },
    onWizardActive: function () {
        var vme = this;
        if (typeof vme.wizard.rightParams.ID != 'undefined') {
            var form = this.down('form');
            form.items.get(0).setDisabled(true);
            this.pswfield.setVisible(false);
            vme.hasShow = false;
            vme.wizard.setWizardBtnDisabled('prev', true);
            vme.wizard.setWizardBtnDisabled('next', true);
            Ext.Ajax.request({
                url: '../UserManage/GetUserInfo', //查询案件详细信息
                method: 'post', //方法  
                params: { USERID: vme.wizard.rightParams.ID },
                callback: function (options, success, response) {
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (v) {
                            vme.hasShow = true;
                            vme.wizard.setWizardBtnDisabled('prev', true);
                            vme.wizard.setWizardBtnDisabled('next', false);


                            form.loadRecord(Ext.create('App.SystemSetting.RTSPSvr.UserInfo.Model', v));
                        }
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        }
        else {
            vme.wizard.setWizardBtnDisabled('prev', true);
            vme.wizard.setWizardBtnDisabled('next', false);
        }
    }
});

