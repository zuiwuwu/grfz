
Ext.define('App.Common.PTZ.ControlPanel', {
    extend: 'Ext.tab.Panel',
    border: 0,
    autoScroll: false,
    width: 230,
    height: 230,
    globalid: 0,
    initComponent: function () {
        var me = this;
        this.addEvents(
            'ptzcmdmsg'
        );
        this.vptz = Ext.create('App.Common.PTZ.PTZ', {
            title: '云台',
            listeners: {
                scope: this,
                ptzcmdmsg: this.onPTZCmd
            }
        });
        var vother = Ext.create('App.Common.PTZ.PTZOther', {
            title: ' 其它',
            listeners: {
                scope: this,
                ptzcmdmsg: this.onPTZCmd
            }
        });
        var vvideoParam = Ext.create('App.Common.PTZ.VideoParam', {
            title: ' 视频'
        });
        this.items = [this.vptz, vother, vvideoParam];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    onPTZCmd: function (cmd, down, speed) {
        this.fireEvent('ptzcmdmsg', cmd, down, speed);
        //console.log('cmd= ' + cmd + '  down=' + down + '   speed=' + speed);
    },
    setCurChnID: function (globalid) {
        this.vptz.setCurChnID(globalid);
    }
});