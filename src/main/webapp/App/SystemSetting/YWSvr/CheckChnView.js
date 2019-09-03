Ext.define('App.SystemSetting.YWSvr.CheckChnView', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    lastGID: '',
    lastType: 0,
    gridautoLoad: false,
    selType: 'rowmodel',
    mode: 'SINGLE',
    url: '../YWSvr/ListModChn',
    initComponent: function () {
        var vme = this;
        this.columns = [
        {
            name: 'SEL',
            type: 'boolean',
            gridcol: {
                xtype: 'checkcolumn',
                sortable: true,
                header: '',
                width: 40
            }
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: SPLanguage.getMessage("SERIALNUM"),
                width: 60
            }
        },
        {
            name: 'GLOBALID',
            type: 'string'
        },
        {
            name: 'CHNNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("TDMC"),
                width: 150
            }
        },
        {
            name: 'CHNID',
            type: 'string'
        },
        {
            name: 'DEVICENAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("SBMXM"),
                width: 200
            }
        },
        {
            name: 'DWMC',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '点位名称',
                width: 200
            }
        },
        {
            name: 'PRODUCTNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '设备型号',
                width: 80
            }
        },
        {
            name: 'CHNMODEL',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '通道型号',
                width: 80
            }
        },
        {
            name: 'CHNTYPENM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("STYLE"),
                width: 80
            }
        },
        {
            name: 'JKSBZT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("STATE"),
                width: 50,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '1') {
                        return '在线';
                    }
                    return '<a style="color:Red">断线</a>';
                }
            }
        },
        {
            name: 'STAT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("STATE"),
                width: 50,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '1') {
                        return SPLanguage.getMessage("QIY");
                    }
                    return '<a style="color:Red">禁用</a>';
                }
            }
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                header: SPLanguage.getMessage("HANDLE"),
                //hidden: true,
                sortable: false,
                minWidth: 80,
                xtype: 'actioncolumn',
                flex: 1,
                items: [
                {
                    iconCls: 'icon-replay',
                    tooltip: '查看实时视频',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        if (vme.parentTab) {
                            vme.parentTab.addFeed(rec.get('CHNNAME'), 'App.AJZC.Real.Index', true, { GLOBALID: rec.get('GLOBALID') });
                        }
                        else {
                            //window.open('../Main/CommonView?class=App.SystemSetting.YWSvr.CheckChnView&DEVICEID=' + rec.get('DEVICEID'), "_blank");
                        }
                    }
                }]
            }
        }];

        this.chnname = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            width: 200,
            url: '../DevMng/GetChnNameAutoCompleteList',
            displayField: 'NAME',
            valueField: 'ID',
            fields: [{
                name: 'ID'
            },
            {
                name: 'NAME'
            }]
        }
        );

        var states = Ext.create('Ext.data.Store', {
            fields: ['ID', 'NAME'],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: '../DevMng/GetChnTypeList',
                reader: {
                    type: 'json',
                    root: 'rows',
                    successProperty: 'success',
                    totalProperty: 'total'
                }
            }
        });
        this.chntype = Ext.create('Ext.form.ComboBox', {
            hideLabel: true,
            store: states,
            width: 80,
            queryMode: 'local',
            displayField: 'NAME',
            valueField: 'ID',
            editable: false,
            value: ''
        });

        this.groupTitle = Ext.create('Ext.Component', {
            html: '所有设备'
        });
        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
        '通道名：',
        this.chnname,
        '类型：',
        this.chntype,
         {
             xtype: 'button',
             text: SPLanguage.getMessage("SEARCH"),
             tooltip: SPLanguage.getMessage("SEARCH"),
             iconCls: 'icon-find',
             scope: this,
             handler: this.onSearch
         },
         '-',
         {
             xtype: 'button',
             text: '全选当前页',
             tooltip: '全选当前页',
             iconCls: 'icon-add',
             scope: this,
             handler: this.onSelAll
         },
         {
             xtype: 'button',
             text: '清除当前页',
             tooltip: '清除当前页',
             iconCls: 'icon-del',
             scope: this,
             handler: this.onCleanAll
         },
         {
             xtype: 'button',
             text: SPLanguage.getMessage("SAVE"),
             tooltip: SPLanguage.getMessage("SAVE"),
             iconCls: 'icon-save',
             scope: this,
             handler: this.onSave
         },
         {
             xtype: 'button',
             text: '全选',
             tooltip: '全选当前条件的通道',
             iconCls: 'icon-save',
             scope: this,
             handler: this.onSave
         }];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.onSearch();
    },
    onSelAll: function () {
        var vme = this;
        vme.store.suspendEvents();
        for (var i = 0; i < vme.store.getCount(); i++) {
            var rec = vme.store.getAt(i);
            rec.set('SEL', true);
        }
        vme.store.resumeEvents();
        vme.vdatagrid.getView().refresh();
    },
    onCleanAll: function () {
        var vme = this;
        vme.store.suspendEvents();
        for (var i = 0; i < vme.store.getCount(); i++) {
            var rec = vme.store.getAt(i);
            rec.set('SEL', false);
        }
        vme.store.resumeEvents();
        vme.vdatagrid.getView().refresh();
    },
    onSave: function () {
        var vme = this;
        var values = [];
        for (var i = 0; i < vme.store.getCount(); i++) {
            var rec = vme.store.getAt(i);
            values.push({ GLOBALID: rec.get('GLOBALID'), SEL: rec.get('SEL'), MODID: vme.commonparams.MODID });
        }
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要保存?', function (btn) {
            if (btn === 'yes') {
                var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZBCQSH") });
                myMask.show();
                Ext.Ajax.request({
                    url: '../YWSvr/AddModChn',
                    method: 'post', //方法  
                    jsonData: values,
                    callback: function (options, success, response) {
                        myMask.hide();
                        if (success) {
                            var v = Ext.JSON.decode(response.responseText);
                            if (!v.success)
                                alert(v.msg);
                            else {
                                vme.reLoad();
                            }
                        }
                        else {
                            alert(SPLanguage.getMessage("Net_Error"));
                        }
                    }
                });
            }
        });

    },
    onSearch: function () {
        var vme = this;
        var vchnname = this.chnname.getRawValue();
        vme.store.clearFilter(true);
        vme.store.filter([{
            property: 'chnname',
            value: vchnname
        },
            {
                property: 'MODID',
                value: vme.commonparams.MODID
            },
            {
                property: 'CHNTYPE',
                value: this.chntype.getValue()
            }]);
        vme.updateLayout();
    }
});
