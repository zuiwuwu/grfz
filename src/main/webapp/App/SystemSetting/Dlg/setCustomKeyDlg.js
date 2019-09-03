
//管理自定义字段
Ext.define('App.SystemSetting.Dlg.setCustomKeyDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    title: '管理自定义字段',
    width: 900,
    height: 500,
    initComponent: function () {
        var me = this;
        this.columns = [{
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                autoSizable: true,
                xtype: 'rownumberer',
                header: '序号',
                width: 60
            }
        }, {
            name: 'KEYTYPE',
            type: 'string'
        },
        {
            name: 'KEYNM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '字段名称',
                width: 160
            }
        },
        {
            name: 'KEYCOMMENT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '字段中文名',
                width: 160
            }
        }, {
            name: '',
            type: 'string',
            gridcol: {
                header: '操作',
                //hidden: true,
                sortable: false,
                xtype: 'actioncolumn',
                flex: 1,
                minWidth: 160,
                items: [{
                    iconCls: 'icon-edit',
                    tooltip: '修改',
                    text: '修改',
                    scope: this,
                    handler: this.onEditClick
                }, {
                    iconCls: 'icon-del',
                    tooltip: '删除',
                    text: '删除',
                    scope: this,
                    handler: this.onDelClick
                }]
            }
        }];

        this.list = Ext.create('App.Common.ImagePreview',
        {
            gridautoLoad: false,
            showImagePreview: false,
            oldStyle: true,
            url: '../CustomKey/ListItems',
            border: 0,
            columns: this.columns
        });

        this.items = [this.list];


        this.tbar = [
        {
            xtype: 'button',
            text: '刷新',
            tooltip: '刷新',
            iconCls: 'icon-refresh',
            scope: me,
            handler: me.onSearch
        },
        '-',
        {
            xtype: 'button',
            text: '添加',
            tooltip: '添加',
            iconCls: 'icon-add',
            scope: me,
            handler: me.onAddClick
        }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.onSearch();
    },
    onSearch: function () {
        this.list.store.clearFilter(true);
        this.list.store.filter(this.getFilters());
    },
    getFilters: function () {
        var me = this;

        var filters = [{
            property: 'KEYTYPE',
            value: this.KEYTYPE
        }];
        me.searchFilters = filters;
        return filters;
    },
    onAddClick: function () {
        var v = Ext.create('App.Common.EditDlg',
        {
            title: '属性',
            url: '../CustomKey/Create',
            items: [{
                xtype: 'textfield',
                hidden: true,
                allowBlank: false,
                name: 'KEYTYPE',
                labelWidth: 90,
                width: 300,
                value: this.KEYTYPE
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                name: 'KEYNM',
                fieldLabel: '字段名称',
                labelWidth: 90,
                width: 300,
                emptyText: '不支持中文',
                value: ''
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                name: 'KEYCOMMENT',
                labelWidth: 90,
                fieldLabel: '字段中文名',
                width: 300,
                value: ''
            }],
            listeners:
            {
                scope: this,
                saveok: function () {
                    this.list.reLoad();
                }
            }
        });
        v.show();
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.Common.EditDlg',
        {
            title: '属性',
            url: '../CustomKey/Edit',
            items: [{
                xtype: 'textfield',
                hidden: true,
                allowBlank: false,
                name: 'KEYTYPE',
                labelWidth: 90,
                width: 300,
                value: this.KEYTYPE
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                hidden: true,
                name: 'KEYNM',
                fieldLabel: '字段名称',
                labelWidth: 90,
                width: 300,
                emptyText: '不支持中文',
                value: ''
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                name: 'KEYCOMMENT',
                labelWidth: 90,
                fieldLabel: '字段中文名',
                width: 300,
                value: ''
            }],
            listeners:
            {
                scope: this,
                saveok: function () {
                    this.list.reLoad();
                }
            }
        });
        v.show();
        v.setValues(rec.data);
    },
    onDelClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var vme = this;
        Ext.MessageBox.confirm('提示', '是否确定要删除?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../CustomKey/Delete', //查询案件详细信息
                method: 'post', //方法  
                params: { KEYTYPE: vme.KEYTYPE, KEYNM: rec.get('KEYNM') },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.list.reLoad();
                    }
                    else {
                        alert('删除失败！');
                    }
                }
            });
        });
    }
});


