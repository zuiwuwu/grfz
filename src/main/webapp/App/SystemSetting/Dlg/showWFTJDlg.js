Ext.define('App.SystemSetting.Dlg.showWFTJDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    title: '违法统计',
    maximizable: true,
    //minimizable: true,
    width: 900,
    height: 500,
    url: '../YWE/WFTJ',
    initComponent: function () {
        var me = this;
        
       me.test = Ext.create('App.Common.Chart.Line', {
            flex: 1,
            height: '100%',
            title: this.title,
            url: this.url,
            autoloaddata: false,
            basefontcolor: '000000',
            canvasbordercolor: "000000"
        });
        me.items = [me.test];


        var vdate = new Date();
        vdate = new Date(vdate.getTime() - 60 * 60 * 24 * 1000);
        this.starttime = Ext.create('Ext.form.field.Date', {
            width: 120,
            value: vdate,
            format: SPLanguage.getMessage("TIMEFORMAT3"),
            hideLabel: true
        }
        );



        this.stoptime = Ext.create('Ext.form.field.Date', {
            width: 120,
            value: vdate,
            format: SPLanguage.getMessage("TIMEFORMAT3"),
            hideLabel: true
        }
        );
        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
         SPLanguage.getMessage("STARTDATE"),
        this.starttime,
        SPLanguage.getMessage("STOPDATE"),
        this.stoptime,
         {
             xtype: 'button',
             text: SPLanguage.getMessage("TJ"),
             tooltip: SPLanguage.getMessage("TJ"),
             iconCls: 'icon-find',
             scope: this,
             handler: this.onSearch
         }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        if (this.TIME) {
            var date = new Date(this.TIME);
            this.stoptime.setValue(date);
            date = new Date(date.getTime() - 60 * 60 * 24 * 1000 * 30);
            this.starttime.setValue(date);
        }
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


