
Ext.define('App.SystemSetting.addDevDlg.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    oldStyle: true,
    selType: 'rowmodel',
    gridpageSize: 20,
    gridautoLoad: false,
    initComponent: function () {
        var vme = this;
        this.columns = [
        {
            name: 'SEL',
            type: 'boolean',
            gridcol: {
                xtype: 'checkcolumn',
                sortable: true,
                header: '选择',
                width: 60,
                stopSelection: false
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
                width: 280,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return '<a title="' + Ext.htmlEncode(value) + '">' + Ext.htmlEncode(value) + '</a>';
                }
            }
        },
        {
            name: 'DWMC',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '点位名称',
                width: 200,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return '<a title="' + Ext.htmlEncode(value) + '">' + Ext.htmlEncode(value) + '</a>';
                }
            }
        },
        {
            name: 'DEVICENAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("SBMXM"),
                width: 200,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return '<a title="' + Ext.htmlEncode(value) + '">' + Ext.htmlEncode(value) + '</a>';
                }
            }
        },
        {
            name: 'ADDR',
            type: 'string',
            gridcol: {
                sortable: true,
                header: 'IP地址',
                width: 200,
                flex: 1
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


        this.chntype = Ext.create('App.Common.ComboBoxDropList', {
            hideLabel: true,
            width: 120,
            value: '',
            url: '../DevMng/GetChnTypeList'
        });


        var states = Ext.create('Ext.data.Store', {
            fields: ['ID', 'NAME'],
            data: [
                { "ID": "0", "NAME": "通道名" },
                { "ID": "1", "NAME": "设备名" },
                { "ID": "2", "NAME": "点位名" },
                { "ID": "3", "NAME": "IP地址" }
            ]
        });


        this.searchType = Ext.create('Ext.form.ComboBox', {
            store: states,
            queryMode: 'local',
            displayField: 'NAME',
            valueField: 'ID',
            value: '0',
            editable: false,
            width: 60
        });

        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
        this.searchType,
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
         }];


        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.onSearch();
    },
    getFilters: function () {
        var vme = this;
        var vchnname = this.chnname.getRawValue();
        return [{
            property: 'chnname',
            value: vchnname
        },
        {
            property: 'searchtype',
            value: this.searchType.getValue()
        },
        {
            property: 'CHNTYPE',
            value: this.chntype.getValue()
        },
        {
            property: 'ID',
            value: this.ID
        }];
    },
    onSearch: function () {
        this.store.clearFilter(true);
        this.store.filter(this.getFilters());
        this.updateLayout();
    }
});


Ext.define('App.SystemSetting.addDevDlg', {
    extend: 'Ext.window.Window',
    title: '设置设备',
    layout: 'fit',
    modal: true,
    urlSave: '',
    urlList: '../UserManage/List',
    initComponent: function () {
        this.addEvents('finished');
        this.userlist = Ext.create('App.SystemSetting.addDevDlg.List', {
            flex: 1,
            border: 1,
            height: 480,
            url: this.urlList,
            ID: this.ID
        });
        this.items = [
                {
                    xtype: 'form',
                    width: 600,
                    height: 500,
                    bodyPadding: 10,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [this.userlist]

                }];

        this.buttons = [
                {
                    text: SPLanguage.getMessage("SAVE"),
                    action: 'save',
                    scope: this,
                    tooltip: '仅保存当前页的配置',
                    handler: this.newCase
                },
                {
                    text: SPLanguage.getMessage("GB"),
                    scope: this,
                    handler: this.close
                }];


        this.callParent(arguments);
    },
    newCase: function (button) {
        var win = button.up('window');
        var vme = this;
        var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZBCQSH") });
        myMask.show();

        var v = [];
        var varrayusers = this.userlist.store.getModifiedRecords();
        for (var i = 0; i < varrayusers.length; i++) {

            v.push({ ID: vme.ID, GLOBALID: varrayusers[i].get('GLOBALID'), SEL: varrayusers[i].get('SEL') });
        }


        Ext.Ajax.request({
            url: this.urlSave, //请求地址  
            jsonData: v,
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        this.userlist.reLoad();
                    }
                    else {
                        //$("#txtSearchAJBH").val(ajbh);
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

