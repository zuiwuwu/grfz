﻿Ext.define('App.Common.ComboBoxDropList', {
    extend: 'Ext.form.field.ComboBox',
    alias: ['widget.comboboxdroplist'],
    //forceSelection: true,
    editable: false,
    emptyText: '请选择',
    displayField: 'NAME',
    valueField: 'ID',
    queryMode: 'local',
    autoSelect: false,
    url: '',
    autoStoreLoad: true,
    noCache: true,
    remoteFilter: false,
    initComponent: function () {
        var vme = this;
        if (this.data) {
            this.store = new Ext.data.Store({
                data: this.data,
                fields: [{
                    name: this.valueField,
                    type: 'string'
                }, {
                    name: this.displayField,
                    type: 'string'
                }]
            });
        }
        else {
            this.store = new Ext.data.Store({
                autoLoad: this.autoStoreLoad,
                remoteFilter: this.remoteFilter,
                listeners: {
                    scope: this,
                    load: function (store, records, successful, eOpts) {
                        //                         
                        //                         //this.setValue(this.lastValue);
                        //                         if (!this.value) {
                        //                             if (this.lastValue)
                        //                                 this.setValue(this.lastValue);
                        //                         }
                        //                         else
                        //                             this.setValue(this.value);
                    }
                },
                proxy: {
                    noCache: this.noCache,
                    type: 'ajax',
                    actionMethods: 'post',
                    url: this.url,
                    reader: {
                        type: 'json',
                        root: 'rows',
                        successProperty: 'success',
                        totalProperty: 'total'
                    }
                },
                fields: [{
                    name: this.valueField,
                    type: 'string'
                }, {
                    name: this.displayField,
                    type: 'string'
                }]
            });

        }

        this.callParent(arguments);
    },
    setValue: function (value, doSelect) {
        if (this.multiSelect) {
            if (Ext.isString(value)
        && value.length > 0) {
                if (value[value.length - 1] == ',')
                    value = value.substr(0, value.length - 1);
                value = value.split(',');
                arguments[0] = value;
            }
        }
        if (typeof value != 'undefined'
        &&value != null
        && !Ext.isString(value)
        && !Ext.isArray(value)) {
            value = value.toString();
            arguments[0] = value;
        }

        this.callParent(arguments);
        this.lastValue = value;
    },
    getSubmitValue: function () {
        var v = this.callParent(arguments);
        if (this.multiSelect) {
            if (Ext.isArray(v)) {
                v = v.join(',');
            }
        }
        return v;
    },
    setFilter: function (filters) {
        if (!filters) {
            this.store.clearFilter();
        }
        else {
            this.store.clearFilter(true);
            this.store.filter(filters);
        }
    }
});
