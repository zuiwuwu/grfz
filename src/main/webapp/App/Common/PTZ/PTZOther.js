Ext.define('App.Common.PTZ.PTZOther.Scan.ComboBox', {
    extend: 'Ext.form.ComboBox',
    //fieldLabel: 'Choose State',
    queryMode: 'local',
    displayField: 'name',
    valueField: 'id',
    autoSelect: false,
    editable: false,
    emptyText: '请选择',
    value: '1',
    initComponent: function () {
        var vdata = new Array();
        for (var i = 0; i < 16; i++) {
            vdata.push({ id: i + 1, name: i + 1 });
        }
        this.store = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: vdata
        });
        this.callParent(arguments);
    }
});

Ext.define('App.Common.PTZ.PTZOther.Scan', {
    extend: 'Ext.form.FieldSet',
    title: '扫描',
    collapsible: false,
    layout: 'absolute',
    initComponent: function () {
        this.items = new Array();
        for (var i = 0; i < 6; i++) {
            this.items.push({
                xtype: 'button',
                text: i + 1,
                x: 34 * i,
                y: 0,
                width: 32,
                height: 32
            });
        }

        this.items.push(Ext.create('App.Common.PTZ.PTZOther.Scan.ComboBox', {
            x: 0,
            y: 40,
            width: 120
        }));

        this.items.push({
            xtype: 'button',
            text: '>',
            x: 122,
            y: 40
        });

        this.items.push({
            xtype: 'button',
            text: '设置',
            x: 148,
            y: 40
        });
        this.callParent(arguments);
    }
});

Ext.define('App.Common.PTZ.PTZOther.Aux', {
    extend: 'Ext.form.FieldSet',
    title: '辅助开关',
    collapsible: false,
    layout: 'absolute',
    initComponent: function () {
        var me = this;
        this.addEvents(
            'ptzcmdmsg'
        );
        this.items = new Array();


        this.items.push({
            xtype: 'button',
            text: '打开灯光',
            x: 0,
            y: 0,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'openlight', true, 0);
            }
        });

        this.items.push({
            xtype: 'button',
            text: '关闭灯光',
            x: 122,
            y: 0,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'closelight', true, 0);
            }
        });

        this.items.push({
            xtype: 'button',
            text: '打开除雾',
            x: 0,
            y: 30,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'closelight', true, 0);
            }
        });

        this.items.push({
            xtype: 'button',
            text: '关闭除雾',
            x: 122,
            y: 30,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'closelight', true, 0);
            }
        });

        this.items.push({
            xtype: 'button',
            text: '打开雨刷',
            x: 0,
            y: 60,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'openrainbrush', true, 0);
            }
        });

        this.items.push({
            xtype: 'button',
            text: '关闭雨刷',
            x: 122,
            y: 60,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'closerainbrush', true, 0);
            }
        });


        this.callParent(arguments);
    }
});


Ext.define('App.Common.PTZ.PTZOther', {
    extend: 'Ext.panel.Panel',
    border: false,
    autoScroll: false,
    width: 400,
    height: 400,
    layout: 'absolute',
    initComponent: function () {
        var me = this;
        this.addEvents(
            'ptzcmdmsg'
        );
        this.items = new Array();

        this.items.push(Ext.create('App.Common.PTZ.PTZOther.Scan', {
            x: 2,
            y: 2,
            height:90,
            width: 224,
            listeners: {
                scope: this,
                ptzcmdmsg: this.onPTZCmd
            }
        }));



        this.items.push(Ext.create('App.Common.PTZ.PTZOther.Aux', {
            x: 2,
            y: 92,
            height:108,
            width: 224,
            listeners: {
                scope: this,
                ptzcmdmsg: this.onPTZCmd
            }
        }));
       
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    onPTZCmd: function (cmd, down, speed) {
        this.fireEvent('ptzcmdmsg',cmd, down, speed);
    }
});