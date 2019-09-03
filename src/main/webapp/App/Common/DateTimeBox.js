Ext.define('App.Common.DateTimeBox', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.datetimebox',
    requires: ['App.Common.DateTimePicker'],
	format: null,
    initComponent: function () {
    	if( !this.format )
    	 	this.format = SPLanguage.getMessage("TIMEFORMAT3");
        this.format = this.format + ' ' + 'H:i:s';
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
        var format = Ext.String.format;
        return this.pickertime = Ext.create('App.Common.DateTimePicker', {
            ownerCt: me.ownerCt,
            ownerText: me,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                scope: me,
                select: me.onSelect
            },
            keyNavConfig: {
                esc: function () {
                    me.collapse();
                }
            }
        });
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
    }
});