
Ext.define('App.SystemSetting.DevMng.DevList.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    showBarPager: false,
    lastgroupid: 0,
    header: false,
    gridautoLoad: false,
    gridpageSize: 15,
    oldStyle: true,
    initComponent: function () {
        var vme = this;
        this.columns = [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: SPLanguage.getMessage("SERIALNUM"),
                width: 40
            }
        },
        {
            name: 'PRODUCTID',
            type: 'string'
        },
        {
            name: 'DEVICENAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: SPLanguage.getMessage("NAME"),
                width: 200
            }
        },
        {
            name: 'PRODUCTNAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '型号',
                width: 100
            }
        },
        {
            name: 'ADDR',
            type: 'string',
            gridcol: {
                sortable: false,
                header: 'IP地址',
                width: 100
            }
        },
        {
            name: 'PORT',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '端口号',
                width: 60
            }
        },
        {
            name: 'USER',
            type: 'string'
        },
        {
            name: 'PSW',
            type: 'string'
        }];

        this.getValues = function () {
            var vsel = this.getSelectionModel().getSelection();
            var v = new Array();
            for (var i = 0; i < vsel.length; i++) {
                v.push(vsel[i].raw);
            }
            return v;
        };

        this.callParent(arguments);
    }
});

Ext.define('App.SystemSetting.DevMng.DevList', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 700,
    title: '导入设备选择',
    initComponent: function () {
        var vme = this;
        this.wizardId = 'devinfo';

        this.vchnlist = Ext.create('App.SystemSetting.DevMng.DevList.List', {
            height: 400,
            border: 1
        });

        this.items = [
        this.vchnlist];



        this.callParent(arguments);


        this.getValues = function () {
            var form = vme.down('form');
            var v = form.getValues();
            return { DEVS: vme.vchnlist.getValues()};
        };
    },
    onPrev: function () {
    },
    onNext: function () {
        this.wizard.onSetWizardItemActive('devprop');
    },
    onWizardActive: function () {
        var vme = this;
        if (!vme.isloading) {
            if (!vme.wizard.modifyMod) {
                vme.wizard.setWizardBtnDisabled('finished', true);
                vme.wizard.setWizardBtnDisabled('prev', true);
                vme.wizard.setWizardBtnDisabled('next', false);
            }
            else {
                vme.wizard.setWizardBtnDisabled('finished', false);
                vme.wizard.setWizardBtnDisabled('prev', true);
                vme.wizard.setWizardBtnDisabled('next', false);
            }
        }
    },
    onWizardInit: function () {
        this.vchnlist.store.loadData(this.wizard.rightParams.devs);
    }
});
