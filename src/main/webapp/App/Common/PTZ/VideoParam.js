
Ext.define('App.Common.PTZ.VideoParam', {
    extend: 'Ext.panel.Panel',
    border: false,
    autoScroll: false,
    layout: 'absolute',
    initComponent: function () {

        this.items = new Array();

        this.items.push({
            xtype: 'text',
            text: '亮度',
            x: 8,
            y: 12
        });
        var vbrightness = Ext.create('Ext.slider.Single', {
            hideLabel: true,
            useTips: false,
            height: 10,
            width:160,
            vertical: false,
            minValue: 0,
            maxValue: 100,
            x: 48,
            y: 12
        });
        this.items.push(vbrightness);

        this.items.push({
            xtype: 'text',
            text: '对比度',
            x: 8,
            y: 32
        });
        vbrightness = Ext.create('Ext.slider.Single', {
            hideLabel: true,
            useTips: false,
            height: 10,
            width: 160,
            vertical: false,
            minValue: 0,
            maxValue: 100,
            x: 48,
            y: 32
        });
        this.items.push(vbrightness);

        this.items.push({
            xtype: 'text',
            text: '饱和度',
            x: 8,
            y: 52
        });
        vbrightness = Ext.create('Ext.slider.Single', {
            hideLabel: true,
            useTips: false,
            height: 10,
            width: 160,
            vertical: false,
            minValue: 0,
            maxValue: 100,
            x: 48,
            y: 52
        });
        this.items.push(vbrightness);

        this.items.push({
            xtype: 'text',
            text: '色度',
            x: 8,
            y: 72
        });
        vbrightness = Ext.create('Ext.slider.Single', {
            hideLabel: true,
            useTips: false,
            height: 10,
            width: 160,
            vertical: false,
            minValue: 0,
            maxValue: 100,
            x: 48,
            y: 72
        });
        this.items.push(vbrightness);
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
    }
});