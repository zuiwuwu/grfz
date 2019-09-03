
Ext.define('App.SystemSetting.DevMng.RightMod.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    showProgressBarPager: false,
    lastgroupid: 0,
    header: false,
    gridautoLoad: false,
    arrraySelModID: {},
    gridpageSize: 15,
    oldStyle: true,
    initComponent: function () {
        this.arrraySelModID = {};
        var vme = this;
        this.listeners =
        {
            scope: this,
            selectionchange: this.OnSelectionChange
        };
        this.columns = [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: SPLanguage.getMessage("SERIALNUM"),
                width: 32
            }
        },
        {
            name: 'MODID',
            type: 'string'
        },
        {
            name: 'MODNM',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '模板名称',
                width: 150
            }
        },
        {
            name: 'MODDESC',
            type: 'string',
            gridcol: {
                sortable: false,
                header: SPLanguage.getMessage("REMARK"),
                width: 300
            }
        }];


        //////////////////////////////////////////////////////////////////////////
        //工具栏

        this.refreshChn = function () {
            vme.store.load();
        };

        this.getValues = function () {
            var v = new Array();
            for (var item in vme.arrraySelModID) {
                if (typeof (vme.arrraySelModID[item]) != 'function')
                    v.push(vme.arrraySelModID[item]);
            }
            return v;
        };

        this.tbar = [{
            xtype: 'checkbox',
            boxLabel: '云台控制',
            name: 'PTZ'
        }, {
            xtype: 'checkbox',
            boxLabel: '回放录像',
            name: 'PLAYBACK'
        }, {
            xtype: 'checkbox',
            boxLabel: '监听',
            name: 'LST'
        }];
        this.callParent(arguments);

        this.store.on('load', function (store) {
            var vsel = new Array();
            for (var i = 0; i < store.getCount(); i++) {
                var rec = store.getAt(i);
                if (typeof vme.arrraySelModID[rec.get('MODID')] != 'undefined') {
                    vsel.push(rec);
                }
            }
            vme.getSelectionModel().select(vsel);
        }, this);
    },
    OnSelectionChange: function (grid, selected, eOpts) {
        for (var i = 0; i < selected.length; i++) {
            var rec = selected[i];
            this.arrraySelModID[rec.get('MODID')] = rec.get('MODID');
        }
    }
});

Ext.define('App.SystemSetting.DevMng.RightMod', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    title: '权限模板选择',
    initComponent: function () {
        var vme = this;
        this.wizardId = 'rightmod';

        this.vchnlist = Ext.create('App.SystemSetting.DevMng.RightMod.List', {
            height: 400,
            url: '../RightMod/List',
            border: 1
        });

        this.items = [
        this.vchnlist];



        this.callParent(arguments);


        this.getValues = function () {
            var form = vme.down('form');
            var v = form.getValues();
            return { RIGHTMODS: vme.vchnlist.getValues(),
                RIGHTMODPTZ: (v.PTZ == 'on'),
                RIGHTMODPLAYBACK: (v.PLAYBACK == 'on'),
                RIGHTMODLST: (v.LST == 'on')
            };
        };
    },
    onPrev: function () {
        this.wizard.onSetWizardItemActive('rolesel');
    },
    onNext: function () {
        //this.wizard.onSetWizardItemActive('mapright');
    },
    onWizardActive: function () {
        this.wizard.setWizardBtnDisabled('prev', false);
        this.wizard.setWizardBtnDisabled('next', true);
    },
    onWizardInit: function () {
        this.vchnlist.refreshChn();
    }
});
