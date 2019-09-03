Ext.define('App.SystemSetting.TrafficGroup.Mng', {
    extend: 'Ext.Panel',
    layout: 'border',
    forumId: '',
    border: 0,
    urlAddGroup: '../DWGroup/AddGroup',
    urlEditGroup: '../DWGroup/EditGroup',
    urlDelGroup: '../DWGroup/DelGroup',
    urlGetGroupTree: '../DWGroup/GetGroupTree',
    urlAddGroupChn: '../DWGroup/AddGroupChn',
    urlListGroupChn: '../DWGroup/ListGroupChn',
    urlDelGroupChn: '../DWGroup/DelGroupChn',
    urlUpdateGroupChn: '../DWGroup/UpdateGroupChn',
    initComponent: function () {

        this.items = [this.createRight(), this.createOCX()];
        // call the superclass's initComponent implementation
        this.callParent(arguments);
    },
    createOCX: function () {

        this.vchnlist = Ext.create('App.SystemSetting.TrafficGroup.List', {
            region: 'center',
            urlAddGroupChn: this.urlAddGroupChn,
            url: this.urlListGroupChn,
            urlDelGroupChn: this.urlDelGroupChn,
            urlUpdateGroupChn: this.urlUpdateGroupChn
        });
        return this.vchnlist;
    },
    createRight: function () {
        var v = Ext.create('App.SystemSetting.TrafficGroup.Tree', {
            region: 'east',
            title: '交通分组',
            width: 210,
            split: true,
            border: 1,
            minWidth: 230,
            maxWidth: 230,
            collapsible: true,
            urlAddGroup: this.urlAddGroup,
            urlEditGroup: this.urlEditGroup,
            urlDelGroup: this.urlDelGroup,
            urlGetGroupTree: this.urlGetGroupTree,
            urlAddGroupChn: this.urlAddGroupChn,
            listeners: {
                scope: this,
                selectionchange: this.onSelectionchange
            }
        });
        return v;
    },
    onSelectionchange: function (tree, selected, eOpts) {
        if (selected.length > 0) {

            this.vchnlist.changeGroup(selected[0].get('id'), selected[0].get('text'));
        }
    }
});

