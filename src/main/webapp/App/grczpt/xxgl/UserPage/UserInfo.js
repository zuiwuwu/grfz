//定义编辑对话框
Ext.define('App.SystemSetting.UserPage.UserInfo', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    height: 422,
    title: SPLanguage.getMessage("USERXX"),
      requires: ['App.Common.ComboBoxDropList'],
    initComponent: function () {
        this.wizardId = 'userinfo';

        var vitemwidth = 280;
        var vlabelWidth = 90;
        this.username = Ext.create("Ext.form.field.Text", {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            width: vitemwidth,
            allowBlank: false,
            fieldLabel: SPLanguage.getMessage("USERNAME"),
            name: 'USERNAME',
            emptyText: SPLanguage.getMessage("BNWK")
        });

        var transformed = Ext.create('App.Common.ComboBoxDropList', {
            fieldLabel: '用户等级',
            allowBlank: false,
            name: 'ULVL',
            labelWidth: vlabelWidth,
            width: 200,
            editable: false,
            value: 8,
            url: '../UserLevel/List'
        });


        var ZW = Ext.create('App.Common.ComboBoxDropList', {
            allowBlank: false,
            fieldLabel: SPLanguage.getMessage("OFFICAL"),
            name: 'ZW',
            labelWidth: vlabelWidth,
            width: vitemwidth,
            editable: false,
            value: '9999',
            url: '../UserManage/ListZW'
        });

        this.PSW = Ext.create('Ext.form.field.Text',
        {
            name: 'PSW',
            fieldLabel: SPLanguage.getMessage("PASSWORD"),
            allowBlank: false,
            blankText: '密码不能为空',
            inputType: 'password'
        });

        this.COMFIRMPSW = Ext.create('Ext.form.field.Text',
        {
            name: 'COMFIRMPSW',
            fieldLabel: SPLanguage.getMessage("MAQR"),
            allowBlank: false,
            blankText: '密码确认不能为空',
            inputType: 'password'
        });
        this.pswfield = Ext.create('Ext.form.FieldSet', {
            flex: 1,
            title: SPLanguage.getMessage("PASSWORD"),
            defaultType: 'checkbox', // each item will be a checkbox
            layout: 'anchor',
            defaults: {
                width: vitemwidth,
                labelWidth: 80,
                hideEmptyLabel: false
            },
            items: [this.PSW
            , this.COMFIRMPSW]
        });

        var vblank = {
            xtype: 'component',
            width: 8
        };

        var vbottom = {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [transformed, {
                    labelWidth: vlabelWidth,
                    xtype: 'numberfield',
                    width: 200,
                    allowBlank: false,
                    fieldLabel: SPLanguage.getMessage("YYDLS"),
                    name: 'ALLOWLOGONNUM',
                    value: '1'
                }
        ]
            },
            {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [{
                    labelWidth: vlabelWidth,
                    xtype: 'numberfield',
                    width: 200,
                    allowBlank: false,
                    fieldLabel: '初始分屏数',
                    name: 'INITVIEWNUM',
                    value: '16'
                },
        {
            labelWidth: vlabelWidth,
            xtype: 'numberfield',
            width: 200,
            allowBlank: false,
            fieldLabel: '最大分屏数',
            name: 'MAXVIEWNUM',
            value: '48'
        }]
            }
                ]
        };
        this.items = [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [this.username,
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            width: vitemwidth,
            fieldLabel: '警号',
            name: 'CREDNUM',
            allowBlank: false
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            width: vitemwidth,
            fieldLabel: SPLanguage.getMessage("IDENTIFY"),
            name: 'SFZH',
            allowBlank: false
        },
        ZW,
        {
            labelWidth: vlabelWidth,
            xtype: 'radiogroup',
            fieldLabel: SPLanguage.getMessage("SEX"),
            width: vitemwidth,
            columns: 2,
            items: [
                { boxLabel: SPLanguage.getMessage("MAN"), name: 'SEX', inputValue: '0', checked: true },
                { boxLabel: SPLanguage.getMessage("WOMAN"), name: 'SEX', inputValue: '1' }
            ]
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'comboboxdroplist',
            fieldLabel: SPLanguage.getMessage("CSSD"),
            width: vitemwidth,
            name: 'CSSD',
            editable: false,
            value: '5',
            data: [{ "value": "0", "name": "从不锁定" },
                 { "value": "5", "name": "5分钟" },
                 { "value": "10", "name": "10分钟" },
                 { "value": "30", "name": "30分钟" },
                 { "value": "60", "name": "1小时"}],
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value'
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            width: vitemwidth,
            allowBlank: true,
            fieldLabel: SPLanguage.getMessage("IP_XZ"),
            name: 'ALLOWLOGONIP',
            emptyText: '192.160.1.*;10.*.*.*'
        }]
            },
            {
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            width: vitemwidth,
            allowBlank: false,
            fieldLabel: SPLanguage.getMessage("ZSXM"),
            name: 'DESCRIPTION'
        }
        ,
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            width: vitemwidth,
            fieldLabel: SPLanguage.getMessage("IPHONE_NUM"),
            name: 'ALPHONENUM',
            allowBlank: false
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            width: vitemwidth,
            fieldLabel: '手持台号',
            name: 'SCTH'
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            width: vitemwidth,
            fieldLabel: SPLanguage.getMessage("DDDH"),
            name: 'PHONE'
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'comboboxdroplist',
            fieldLabel: '图片查询时长',
            width: vitemwidth,
            name: 'CXCLSC',
            editable: false,
            value: '7',
                data: [{ "value": "0", "name": "不限" },
                 { "value": "1", "name": "1天" },
                 { "value": "2", "name": "2天" },
                 { "value": "7", "name": "1周" },
                 { "value": "30", "name": "1月" },
                 { "value": "60", "name": "2月" },
                 { "value": "90", "name": "3月" },
                 { "value": "120", "name": "4月" },
                 { "value": "150", "name": "5月" },
                 { "value": "182", "name": "半年" },
                 { "value": "365", "name": "1年"}],
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value'
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'comboboxdroplist',
            fieldLabel: SPLanguage.getMessage("SFXYZM"),
            width: vitemwidth,
            name: 'YZM',
            editable: false,
            value: '1',
            data: [{ "value": "1", "name": SPLanguage.getMessage("YES") },
                 { "value": "0", "name": SPLanguage.getMessage("NO")}],
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value'
        },
         {
            labelWidth: vlabelWidth,
            xtype: 'comboboxdroplist',
            fieldLabel: '警种',
            width: vitemwidth,
            name: 'JZ',
            editable: false,
            url: '../RBZQYJ/getJZ',
            multiSelect: true
         }]
            }]
        },
        this.pswfield
        , {
            xtype: 'fieldset',
            flex: 1,
            title: SPLanguage.getMessage("YHLX"),
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                hideEmptyLabel: true
            },
            items: [{
                xtype: 'radiogroup',
                fieldLabel: '',
                columns: 2,
                items: [
                { boxLabel: SPLanguage.getMessage("KHD"), name: 'TYPE', inputValue: 2, checked: true },
                { boxLabel: SPLanguage.getMessage("DSQ"), name: 'TYPE', inputValue: 0x00002000 }
            ]
            }]
        },
        vbottom];
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
            this.wizard.onSetWizardItemActive('rolesel');
        }
    },
    onWizardActive: function () {
        var vme = this;
        if (vme.hasgetuserinfo) {
            vme.wizard.setWizardBtnDisabled('prev', true);
            vme.wizard.setWizardBtnDisabled('next', false);
            return;
        }

        if (typeof vme.wizard.rightParams.ID != 'undefined') {
            var form = this.down('form');
            //this.username.setDisabled(true);
            //this.pswfield.setVisible(false);
            this.PSW.setDisabled(true);
            this.COMFIRMPSW.setDisabled(true);
            vme.hasShow = false;
            vme.wizard.setWizardBtnDisabled('prev', true);
            vme.wizard.setWizardBtnDisabled('next', true);
            var myMask = new Ext.LoadMask(vme.wizard, { msg: '正在获取用户信息，请稍候！' });
            myMask.show();
            Ext.Ajax.request({
                url: '../UserManage/GetUserInfo', //查询案件详细信息
                method: 'post', //方法  
                params: { USERID: vme.wizard.rightParams.ID },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        vme.hasgetuserinfo = true;
                        var v = Ext.JSON.decode(response.responseText);
                        if (v) {
                            vme.hasShow = true;
                            vme.wizard.setWizardBtnDisabled('prev', true);
                            vme.wizard.setWizardBtnDisabled('next', false);


                            form.getForm().setValues(v);
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

