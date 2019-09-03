Ext.define('App.Common.PTZ.PTZ.PresetID.ComboBox', {
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
        for (var i = 0; i < 255; i++) {
            vdata.push({ id: i + 1, name: i + 1 });
        }
        this.store = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: vdata
        });
        this.callParent(arguments);
    }
});

Ext.define('App.Common.PTZ.Button', {
    extend: 'Ext.button.Button',
    ptzcmd: '',
    downstate: false,
    ptzpanel: null,
    initComponent: function () {
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    onRender: function () {
        this.callParent(arguments);
        var btn = this.el;
        var btnListeners = {
            scope: this,
            mouseout: this.onMouseOutCur,
            mousedown: this.onMouseDownCur,
            mouseup: this.onMouseUpCur
        };
        this.mon(btn, btnListeners);
    },
    onMouseOutCur: function () {
        if (this.downstate) {
            this.downstate = false;
            this.ptzpanel.onPTZCmd.call(this.ptzpanel, this.ptzcmd, false);
        }
    },
    onMouseDownCur: function () {
        this.downstate = true;
        this.ptzpanel.onPTZCmd.call(this.ptzpanel, this.ptzcmd, true);
    },
    onMouseUpCur: function () {
        this.downstate = false;
        this.ptzpanel.onPTZCmd.call(this.ptzpanel, this.ptzcmd, false);
    },
    setCurChnID: function (globalid) {
    }
});



Ext.define('App.Common.PTZ.PTZ', {
    extend: 'Ext.panel.Panel',
    border: 0,
    autoScroll: false,
    layout: 'absolute',
    globalid: 0,
    initComponent: function () {
        var me = this;
        this.addEvents(
            'ptzcmdmsg'
        );
        this.items = new Array();
        this.items.push(Ext.create('App.Common.PTZ.PanTilt', {
            x: 120,
            listeners: {
                scope: this,
                ptzcmdmsg: this.onPTZCmd
            }
        }));

        var vzoom = [{ id: 'zoom', text: '缩放' }, { id: 'focus', text: '聚焦' }, { id: 'iris', text: '光圈'}];

        for (var i = 0; i < vzoom.length; i++) {
            this.items.push({
                xtype: 'text',
                text: vzoom[i].text,
                x: 44,
                y: 12 + i * 30
            });

            var id = vzoom[i].id;
            if (vzoom[i].id == 'zoom')
                id = 'zoomin';
            else if (vzoom[i].id == 'focus')
                id = 'focusnear';
            else if (vzoom[i].id == 'iris')
                id = 'irisopen';
            this.items.push(Ext.create('App.Common.PTZ.Button', {
                text: '+',
                x: 10,
                y: 10 + i * 30,
                width: 22,
                height: 22,
                ptzpanel: this,
                ptzcmd: id
            }));

            id = vzoom[i].id;
            if (vzoom[i].id == 'zoom')
                id = 'zoomout';
            else if (vzoom[i].id == 'focus')
                id = 'focusfar';
            else if (vzoom[i].id == 'iris')
                id = 'irisclose';
            this.items.push(Ext.create('App.Common.PTZ.Button', {
                text: '-',
                x: 80,
                y: 10 + i * 30,
                width: 22,
                height: 22,
                ptzpanel: this,
                ptzcmd: id,
                tooltip: '提示'
            }));

        }


        this.items.push({
            xtype: 'button',
            text: '锁定',
            x: 10,
            y: 106,
            width: 50,
            height: 22,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'lock', true, 0);
            }
        });

        this.items.push({
            xtype: 'button',
            text: '最近',
            x: 62,
            y: 106,
            width: 50,
            height: 22,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'telenear', true, 0);
            }
        });

        this.items.push({
            xtype: 'button',
            text: '最远',
            x: 114,
            y: 106,
            width: 50,
            height: 22,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'telefar', true, 0);
            }
        });

        this.items.push({
            xtype: 'button',
            text: '对焦',
            x: 166,
            y: 106,
            width: 50,
            height: 22,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'autofocus', true, 0);
            }
        });
        for (var i = 0; i < 6; i++) {
            this.items.push({
                xtype: 'button',
                text: i + 1,
                x: 10 + 35 * i,
                y: 134,
                width: 32,
                height: 32,
                vpresetid: i + 1,
                handler: function () {
                    me.fireEvent('ptzcmdmsg', 'gotopreset', true, this.vpresetid);
                }
            });
        }

        me.vpresetcombo = Ext.create('App.Common.PTZ.PTZ.PresetID.ComboBox', {
            x: 10,
            y: 170,
            width: 112
        });
        this.items.push(this.vpresetcombo);

        this.items.push({
            xtype: 'button',
            text: '>',
            x: 124,
            y: 170,
            width: 22,
            height: 22,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'gotopreset', true, me.vpresetcombo.getValue());
            }
        });

        this.items.push({
            xtype: 'button',
            text: '+',
            x: 148,
            y: 170,
            width: 22,
            height: 22,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'setreset', true, me.vpresetcombo.getValue());
            }
        });

        this.items.push({
            xtype: 'button',
            text: 'M',
            x: 172,
            y: 170,
            width: 22,
            height: 22,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'gotopreset', true, me.vpresetcombo.getValue());
            }
        });

        this.items.push({
            xtype: 'button',
            text: '-',
            x: 196,
            y: 170,
            width: 22,
            height: 22,
            handler: function () {
                me.fireEvent('ptzcmdmsg', 'delpreset', true, me.vpresetcombo.getValue());
            }
        });

        this.vspeed = Ext.create('Ext.slider.Single', {
            hideLabel: true,
            useTips: false,
            height: 82,
            vertical: true,
            minValue: 0,
            maxValue: 100,
            value: '50',
            x: 106,
            y: 10
        });
        this.items.push(this.vspeed);
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    onPTZCmd: function (cmd, down) {
        this.fireEvent('ptzcmdmsg', cmd, down, down ? this.vspeed.getValue() : 0);
        //console.log('cmd= ' + cmd + '  down=' + down);
    },
    setCurChnID: function (globalid) {
        this.vpresetcombo.setCurChnID(globalid);
    }
});