Ext.define('App.SystemSetting.YWSvr.CheckProp.CheckDrvList', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    gridautoLoad: true,
    url: '../YWSvr/ListDrv',
    oldStyle: true,
    showBarPager: false,
    selType: 'rowmodel',
    mode: 'SINGLE',
    initComponent: function () {
        var vme = this;
        this.columns = [
        {
            name: 'SEL',
            type: 'bool',
            gridcol: {
                xtype: 'checkcolumn',
                sortable: false,
                header: '',
                width: 40
            }
        },
        {
            name: 'CHECKDRVID',
            type: 'string'
        },
        {
            name: 'GUID',
            type: 'string'
        },
        {
            name: 'NM',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '检测名称',
                flex: 1
            }
        }];
        this.callParent(arguments);
    }
});


Ext.define('App.SystemSetting.YWSvr.CheckProp', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    height: 422,
    title: '巡检设置',
    PARAMS: null,
    lastselValue: null,
    initComponent: function () {
        var vme = this;
        this.wizardId = 'CheckProp';

        this.drvlist = Ext.create('App.SystemSetting.YWSvr.CheckProp.CheckDrvList',
        {
            height: '100%',
            width: 280,
            listeners:
            {
                scope: this,
                selectionchange: this.onDrvSelectChange
            }
        });

        this.propgrid = Ext.create('App.Common.Property', {
            height: '100%',
            flex: 1,
            url: '../YWSvr/GetDrvProperty',
            params: { USERID: vme.wizard.rightParams.USERID, CHECKDRVID: null }
        });
        this.items = [
        {
            xtype: 'container',
            layout: 'hbox',
            width: '100%',
            height: 400,
            items: [this.drvlist,
            {
                xtype: 'component',
                width: 4
            },
            this.propgrid]
        }
        ];
        this.callParent(arguments);

        this.drvlist.store.on('datachanged', function (store) {
            
            if (vme.PARAMS) {
                for (var i = 0; i < store.getCount(); i++) {
                    var rec = store.getAt(i);
                    var vitem = vme.PARAMS[rec.get('GUID')];
                    if (typeof vitem != 'undefined') {
                        if (vitem.SEL)
                            rec.set('SEL', true);
                    }
                }
            }

        }, this);
    },
    onDrvSelectChange: function (grid, selected, eOpts) {
        var vme = this;
        if (selected.length > 0) {
            if (vme.lastselValue) {
                var vValues = vme.propgrid.getSource();
                vme.lastselValue.values = vValues;
            }
            vme.lastselValue = { GUID: selected[0].get('GUID'), values: {} };
            if (vme.PARAMS) {
                if (typeof vme.PARAMS[selected[0].get('GUID')] != 'undefined') {
                    vme.lastselValue = vme.PARAMS[selected[0].get('GUID')];
                }
                else {
                    vme.PARAMS[vme.lastselValue.GUID] = vme.lastselValue;
                }
            }

            vme.propgrid.params.CHECKDRVID = selected[0].get('CHECKDRVID');
            vme.propgrid.params.GUID = selected[0].get('GUID');
            vme.propgrid.refresh(vme.lastselValue.values, vme.wizard);
        }
        else {
            vme.propgrid.params.CHECKDRVID = null;
            vme.propgrid.params.GUID = null;
            vme.propgrid.refresh();
        }
    },
    onPrev: function () {
        if (!this.isValid())
            return;
        this.wizard.onSetWizardItemActive('modinfo');
    },
    onNext: function () {
    },
    onWizardInit: function () {
        var vme = this;
    },
    onWizardActive: function () {
        var vme = this;
        var store = vme.drvlist.store;
        vme.wizard.setWizardBtnDisabled('finished', false);
        vme.wizard.setWizardBtnDisabled('prev', false);
        vme.wizard.setWizardBtnDisabled('next', true);

        if (!vme.PARAMS) {
            vme.PARAMS = {};
            for (var i = 0; i < vme.wizard.rightParams.PARAMS.length; i++) {
                var vitem = vme.wizard.rightParams.PARAMS[i];
                vme.PARAMS[vitem.GUID] = vitem;
            }
            store.suspendEvents();
            for (var i = 0; i < store.getCount(); i++) {
                var rec = store.getAt(i);
                var vitem = vme.PARAMS[rec.get('GUID')];
                if (typeof vitem != 'undefined') {
                    if (vitem.SEL)
                        rec.set('SEL', true);
                }
            }
            store.resumeEvents();
            this.drvlist.vdatagrid.getView().refresh();
        }
    },
    getValues: function () {
        var vme = this;
        if (vme.PARAMS == null) {
            vme.PARAMS = [];
        }
        if (vme.lastselValue) {
            var vValues = vme.propgrid.getSource();
            vme.lastselValue.values = vValues;
        }

        var vparams = [];
        for (var i = 0; i < this.drvlist.store.getCount(); i++) {
            var rec = this.drvlist.store.getAt(i);
            var vitem = vme.PARAMS[rec.get('GUID')];
            if (typeof vitem != 'undefined') {
                vitem.SEL = rec.get('SEL');
                vparams.push(vitem);
            }
            else {
                vitem = { GUID: rec.get('GUID'), values: {}, SEL: rec.get('SEL') };
                vparams.push(vitem);
            }
        }
        return { PARAMS: Ext.JSON.encode(vparams) };
    }
});

