Ext.define('App.Common.DownloadFrame', {
    extend: 'Ext.ux.IFrame',

    alias: 'widget.downloadiframe',

    loadMask: '加载中...',

    src: 'about:blank',

    renderTpl: [
        '<iframe src="{src}" name="{frameName}" width="0" height="0" frameborder="0"></iframe>'
    ]
});