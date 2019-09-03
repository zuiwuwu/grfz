
Ext.define('App.SystemSetting.DevMng.DevChns.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    showBarPager: false,
    oldStyle: true,
    lastgroupid: 0,
    header: false,
    gridautoLoad: false,
    gridpageSize: 1000,
    height: 400,
    groupField: 'CHNTYPENM',
    initComponent: function () {
        var vme = this;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        this.gridfeatures = [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false,
            showSummaryRow: false
        }];

        this.columns = [
        {
            name: 'CHNID',
            type: 'string'
        }, {
            name: 'CHNTYPE',
            type: 'string'
            
        }, {
            name: 'CHNTYPENM',
            type: 'string',
            gridcol: {
                hideable: false,
                header: '通道类型',
                width: 20,
                sortable: true
            }
            
        },
        {
            name: 'CHNNAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: SPLanguage.getMessage("TDMC"),
                width: 250,
                editor: {
                    allowBlank: false
                }
            }
        },
        {
            name: 'ICON',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '图标',
                width: 150,
                editor: {
                    allowBlank: false
                }
            }
        }];

        this.getValues = function () {
            var v = new Array();
            var vsel = this.getSelectionModel().getSelection();
            for (var i = 0; i < vsel.length; i++) {
                v.push({ CHNID: vsel[i].get('CHNID'),
                    CHNNAME: vsel[i].get('CHNNAME'),
                    CHNTYPE: vsel[i].get('CHNTYPE'),
                    ICON: vsel[i].get('ICON')
                });
            }
            return v;
        };
        this.callParent(arguments);

    },
    afterRender: function () {
        this.callParent();

    }
});


//定义编辑对话框
Ext.define('App.SystemSetting.DevMng.DevChns', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 700,
    title: '设备通道',
    firstload: true,
    PRODUCTID: null,
    initComponent: function () {
        var vme = this;
        this.wizardId = 'devchns';
        this.chnlist = Ext.create('App.SystemSetting.DevMng.DevChns.List', {
            url: '../DevMng/GetDevNotAddChns'
        });
        this.items = [this.chnlist];
        this.callParent(arguments);

        this.getValues = function () {
            return { CHNS: vme.chnlist.getValues() };
        };
    },
    onPrev: function () {
        this.wizard.onSetWizardItemActive('devinfo');
    },
    onNext: function () {
        //this.wizard.onSetWizardItemActive('rolesel');
    },
    onWizardInit: function () {
        var vme = this;
        if (vme.wizard.rightParams.type == 'adddevchn') {
            this.chnlist.store.clearFilter(true);
            this.chnlist.store.filter([
            {
                property: 'DEVICEID',
                value: vme.wizard.rightParams.ID
            }]);
            this.chnlist.updateLayout();
        }
    },
    onWizardActive: function () {
        var vme = this;
        this.wizard.setWizardBtnDisabled('finished', false);
        this.wizard.setWizardBtnDisabled('prev', false);
        this.wizard.setWizardBtnDisabled('next', true);


        var v = vme.wizard.getValues();

        var vPRODUCTID = v.PRODUCTID;
        if (typeof vPRODUCTID == 'undefined') {
            vPRODUCTID = vme.wizard.rightParams.PRODUCTID;
        }
        if (this.PRODUCTID != vPRODUCTID) {
            this.PRODUCTID = vPRODUCTID;


            this.chnlist.store.clearFilter(true);

            this.chnlist.store.filter([{
                property: 'PRODUCTID',
                value: this.PRODUCTID
            },
            {
                property: 'DEVICEID',
                value: vme.wizard.rightParams.ID
            },
            {
                property: 'DEVICENAME',
                value: v.DEVICENAME
            }]);
            this.chnlist.updateLayout();
        }
    }
});

