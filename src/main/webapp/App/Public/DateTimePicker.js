Ext.define('App.Public.DateTimePicker', {
    extend: 'Ext.picker.Date',
    alias: 'widget.datetimepicker',
    todayText: '确定',
    timeLabel: '时间',
    requires: ['App.Public.TimePickerField'],
    initComponent: function () {
        // keep time part for value
        var value = this.value || new Date();
        this.callParent();
        this.value = value;
    },
    onRender: function (container, position) {
        if (!this.timefield) {
            this.timefield = Ext.create('App.Public.TimePickerField', {
                fieldLabel: this.timeLabel,
                labelWidth: 40,
                value: Ext.Date.format(this.value, 'H:i:s')
            });
        }
        this.timefield.ownerCt = this;
        this.timefield.on('change', this.timeChange, this);
        this.callParent(arguments);
        var table = Ext.get(Ext.DomQuery.selectNode('table', this.el.dom));
        var tfEl = Ext.core.DomHelper.insertAfter(table, {
            tag: 'div',
            style: 'border:0px;',
            children: [{
                tag: 'div',
                cls: 'x-datepicker-footer ux-timefield'
            }]
        }, true);
        this.timefield.render(this.el.child('div div.ux-timefield'));

        var p = this.getEl().parent('div.x-layer');
        if (p) {
            p.setStyle("height", p.getHeight() + 31);
        }
    },
    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.afterRendered = true;
    },
    // listener 时间域修改, timefield change
    timeChange: function (tf, time, rawtime) {
        var me = this;
        me.value = me.fillDateTime(this.value);
        if (me.afterRendered) {
            var owner = me.ownerText;
            Ext.log({ msg: 'timeChange' });
            owner.setRawValue(owner.valueToRaw(me.value));
        }
        //this.setValue(this.value);
    },

    fillDateTime: function (value) {
        if (this.timefield) {
            var rawtime = this.timefield.getRawValue();
            value.setHours(rawtime.h);
            value.setMinutes(rawtime.m);
            value.setSeconds(rawtime.s);
        }
        return value;
    },

    changeTimeFiledValue: function (value) {
        this.timefield.un('change', this.timeChange, this);
        this.timefield.setValue(this.value);
        this.timefield.on('change', this.timeChange, this);
    },

    /* TODO 时间值与输入框绑定, 考虑: 创建this.timeValue 将日期和时间分开保存. */

    setValue: function (value) {
        this.value = value;
        this.changeTimeFiledValue(value);
        return this.update(Ext.Date.clearTime(this.value,true));
    },

    getValue: function () {
        return this.fillDateTime(this.value);
    },

    handleDateClick: function (e, t) {
        var me = this,
	    handler = me.handler;
        e.stopEvent();
        var date = new Date(t.dateValue);
        if (Ext.isDate(date)) {
            if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
                me.doCancelFocus = me.focusOnSelect === false;
                me.setValue(this.fillDateTime(date)); // overwrite: fill time before setValue
                delete me.doCancelFocus;
                if (me.afterRendered) {
		            var owner = me.ownerText;
		            owner.setRawValue(owner.valueToRaw(me.value));
		        }
               // me.fireEvent('select', me, me.value);
                if (handler) {
                    handler.call(me.scope || me, me, me.value);
                }
                me.onSelect();
            }
        }
    },

    // overwrite : fill time before setValue
    selectToday: function () {
        var me = this,
			  btn = me.todayBtn,
			  handler = me.handler;

        if (btn && !btn.disabled) {
            // me.setValue(Ext.Date.clearTime(new Date())); //src
            //me.setValue(new Date()); // overwrite: fill time before setValue
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            me.onSelect();
        }
        return me;
    }
});