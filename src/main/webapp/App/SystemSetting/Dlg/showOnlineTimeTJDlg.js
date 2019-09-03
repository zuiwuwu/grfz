Ext.define('App.SystemSetting.Dlg.showOnlineTimeTJDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    title: '设备过车统计',
    maximizable: true,
    //minimizable: true,
    width: 900,
    height: 500,
    url: '../DevMng/GetChnOnlineTimeTJ',
    initComponent: function () {
        var me = this;
        me.test = Ext.create('App.Common.Chart.Line', {
            flex: 1,
            height: '100%',
            //title: this.title,
            url: this.url,
            autoloaddata: false,
            basefontcolor: '000000',
            canvasbordercolor: "000000"
        });
        me.items = [me.test];


        var vdate = new Date();

        this.stoptime = Ext.create('Ext.form.field.Date', {
            width: 120,
            value: vdate,
            format: 'Y年m月d日',
            hideLabel: true
        }
        );
        vdate.setMonth(vdate.getMonth() - 1);
        this.starttime = Ext.create('Ext.form.field.Date', {
            width: 120,
            value: vdate,
            format: 'Y年m月d日',
            hideLabel: true
        }
        );



        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
         '开始日期',
        this.starttime,
        '结束日期',
        this.stoptime,
        this.tjfs,
         {
             xtype: 'button',
             text: '统计',
             tooltip: '统计',
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
    onSearch: function () {
        var vme = this;
        var store = vme.test.store;
        vme.test.refresh([
            {
                property: 'STARTTIME',
                value: this.starttime.getValue()
            },
            {
                property: 'STOPTIME',
                value: this.stoptime.getValue()
            },
            {
                property: 'JKSBBH',
                value: this.JKSBBH
            }]);
    }
});


