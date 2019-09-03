Ext.define('App.Common.DateBox', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.spdatebox',
    requires: ['App.Common.DateTimePicker'],
    initComponent: function () {
        this.format = this.format||"Y-m";
        this.width = this.width ? this.width : 178;
        this.callParent();
    },
    setValue: function (value) {
        var me = this;
        if (Ext.isString(value)
        && value != '') {
            arguments[0] = new Date(value);
        }
        this.callParent(arguments);
    },
    // overwrite
    createPicker: function () {  
        var me = this;
        if(this.format.match("d"))
        {
        	return this.callParent(arguments);
        }
        else if(this.format.match("H"))
        {
        	return this.callParent(arguments);
        }
        else if(this.format.match("m"))
        {
        	return this.pickertime = Ext.create('Ext.picker.Month', {
            ownerCt: me.ownerCt,
            ownerText: me,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            height: 200,
            value: this.value,
            listeners: {
                scope: me,
                okclick: me.onMonthSelect,
                cancelclick:function()
                {
                	 this.collapse();
                }
            },
            keyNavConfig: {
                esc: function () {
                    me.collapse();
                }
            }
        });
        }
        else
        {
        	return this.pickertime = Ext.create('App.Common.DateBoxYearPicker', {
            ownerCt: me.ownerCt,
            ownerText: me,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            height: 240,
            width: 100,
            value: this.value,
            listeners: {
                scope: me,
                okclick: me.onYearSelect,
                cancelclick:function()
                {
                	 this.collapse();
                }
            },
            keyNavConfig: {
                esc: function () {
                    me.collapse();
                }
            }
        });
        }
        
    },
    onMonthSelect: function(m, d) {
        var me = this;

        var vdate = me.getValue();
        vdate.setFullYear(d[1]);
        vdate.setMonth(d[0]);
        me.onSelect(m,vdate);
    },
    onYearSelect: function(m, d) {
        var me = this;
        var vdate = me.getValue();
        vdate.setFullYear(d);
        me.onSelect(m,vdate);
    },
    getSubmitData: function () {
        
        var me = this,
            data = null,
            val;
        if (!me.disabled && me.submitValue && !me.isFileUpload()) {
            val = me.getValue();
            if (val !== null) {
                data = {};
                data[me.getName()] = Ext.Date.toString(val);
            }
        }
        return data;
    },
    setFormat:function(fmt)
    {
        this.picker = null;
    	this.format = fmt;
    	this.disabledDatesRE = null;
        this.initDisabledDays();
        this.setValue(this.value);
    }
});