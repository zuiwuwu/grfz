Ext.define('App.Common.DateCheckBox', {
	extend : 'Ext.form.field.Picker',
	alias : 'widget.spdatecheckbox',
	format : "m/d/Y",
	altFormats : "m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j",
	disabledDaysText : "Disabled",
	disabledDatesText : "Disabled",
	minText : "The date in this field must be equal to or after {0}",
	maxText : "The date in this field must be equal to or before {0}",
	invalidText : "{0} is not a valid date - it must be in the format {1}",
	triggerCls : Ext.baseCSSPrefix + 'form-date-trigger',
	showToday : true,
	useStrict : undefined,
	initTime : '12', // 24 hour format
	initTimeFormat : 'H',
	matchFieldWidth : false,
	startDay : 0,
	editable: false,
	initComponent : function() {
		var me = this, isString = Ext.isString, min, max;

		min = me.minValue;
		max = me.maxValue;
		if (isString(min)) {
			me.minValue = me.parseDate(min);
		}
		if (isString(max)) {
			me.maxValue = me.parseDate(max);
		}
		me.disabledDatesRE = null;
		me.initDisabledDays();

		me.callParent();
	},

	initValue : function() {
		var me = this, value = me.value;

		// If a String value was supplied, try to convert it to a proper Date
		if (Ext.isString(value)) {
			me.value = me.rawToValue(value);
		}

		me.callParent();
	},

	// private
	initDisabledDays : function() {
		if (this.disabledDates) {
			var dd = this.disabledDates, len = dd.length - 1, re = "(?:", d, dLen = dd.length, date;

			for (d = 0; d < dLen; d++) {
				date = dd[d];

				re += Ext.isDate(date) ? '^'
						+ Ext.String.escapeRegex(date.dateFormat(this.format))
						+ '$' : date;
				if (d !== len) {
					re += '|';
				}
			}

			this.disabledDatesRE = new RegExp(re + ')');
		}
	},

	setDisabledDates : function(dd) {
		var me = this, picker = me.picker;

		me.disabledDates = dd;
		me.initDisabledDays();
		if (picker) {
			picker.setDisabledDates(me.disabledDatesRE);
		}
	},

	setDisabledDays : function(dd) {
		var picker = this.picker;

		this.disabledDays = dd;
		if (picker) {
			picker.setDisabledDays(dd);
		}
	},

	setMinValue : function(dt) {
		var me = this, picker = me.picker, minValue = (Ext.isString(dt) ? me
				.parseDate(dt) : dt);

		me.minValue = minValue;
		if (picker) {
			picker.minText = Ext.String.format(me.minText, me
							.formatDate(me.minValue));
			picker.setMinDate(minValue);
		}
	},

	setMaxValue : function(dt) {
		var me = this, picker = me.picker, maxValue = (Ext.isString(dt) ? me
				.parseDate(dt) : dt);

		me.maxValue = maxValue;
		if (picker) {
			picker.maxText = Ext.String.format(me.maxText, me
							.formatDate(me.maxValue));
			picker.setMaxDate(maxValue);
		}
	},

	getErrors : function(value) {
		var me = this, format = Ext.String.format, clearTime = Ext.Date.clearTime, errors = me
				.callParent(arguments), disabledDays = me.disabledDays, disabledDatesRE = me.disabledDatesRE, minValue = me.minValue, maxValue = me.maxValue, len = disabledDays
				? disabledDays.length
				: 0, i = 0, svalue, fvalue, day, time;

		value = me.formatDates(value || me.processRawValue(me.getRawValue()));

		if (value === null || value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
			return errors;
		}

		svalue = value;
		value = me.parseDates(value);
		if (!value) {
			errors.push(format(me.invalidText, svalue, Ext.Date
							.unescapeFormat(me.format)));
			return errors;
		}

		for(var i = 0;i < value.length;i ++)
		{
			var v = value[i];
			time = v.getTime();
			if (minValue && time < clearTime(minValue).getTime()) {
				errors.push(format(me.minText, me.formatDate(minValue)));
			}
	
			if (maxValue && time > clearTime(maxValue).getTime()) {
				errors.push(format(me.maxText, me.formatDate(maxValue)));
			}
	
			if (disabledDays) {
				day = v.getDay();
	
				for (; i < len; i++) {
					if (day === disabledDays[i]) {
						errors.push(me.disabledDaysText);
						break;
					}
				}
			}
	
			fvalue = me.formatDate(v);
			if (disabledDatesRE && disabledDatesRE.test(fvalue)) {
				errors.push(format(me.disabledDatesText, fvalue));
			}

		}
		
		return errors;
	},

	rawToValue : function(rawValue) {
		if(rawValue)
		{
			rawValue = rawValue.split(',');
			var v = [];
			for(var i = 0;i < rawValue.length;i ++)
			{
				v.push(this.parseDate(rawValue[i]) || rawValue[i] || null);
			}
			return v;
		}
		return null;
	},

	valueToRaw : function(value) {
		if(value)
		{
			var v = '';
			for(var i = 0;i < value.length;i ++)
			{
				if(v != '')
					v += ',';
				v += this.formatDate(this.parseDate(value[i]))
			}
			return v;
		}
		return '';
	},

	safeParse : function(value, format) {
		var me = this, utilDate = Ext.Date, result = null, strict = me.useStrict, parsedDate;

		if (utilDate.formatContainsHourInfo(format)) {
			// if parse format contains hour information, no DST adjustment is necessary
			result = utilDate.parse(value, format, strict);
		} else {
			// set time to 12 noon, then clear the time
			parsedDate = utilDate.parse(value + ' ' + me.initTime, format + ' '
							+ me.initTimeFormat, strict);
			if (parsedDate) {
				result = utilDate.clearTime(parsedDate);
			}
		}
		return result;
	},

	// @private
	getSubmitValue : function() {
		var format = this.submitFormat || this.format, value = this.getValue();

		return value ? Ext.Date.format(value, format) : '';
	},

	parseDate : function(value) {
		if (!value || Ext.isDate(value)) {
			return value;
		}

		var me = this, val = me.safeParse(value, me.format), altFormats = me.altFormats, altFormatsArray = me.altFormatsArray, i = 0, len;

		if (!val && altFormats) {
			altFormatsArray = altFormatsArray || altFormats.split('|');
			len = altFormatsArray.length;
			for (; i < len && !val; ++i) {
				val = me.safeParse(value, altFormatsArray[i]);
			}
		}
		return val;
	},

	parseDates : function(value) {
		if (!value || Ext.isDate(value)) {
			return value;
		}
		
		return this.rawToValue(value);
	},

	formatDates : function(date) {
		if(Ext.isString())
		{
			return date;
		}
		else if(Ext.isArray(date))
		{
			return this.valueToRaw(date);
		}
		return date;
	},

	formatDate : function(date) {
		return Ext.isDate(date) ? Ext.Date.dateFormat(date, this.format) : date;
	},

	createPicker : function() {

		var me = this;
		if (this.format.match("d") || this.format.match("H")) {
			var me = this, format = Ext.String.format;

			return Ext.create('App.Common.DateCheckBoxDatePicker',{
						pickerField : me,
						ownerCt : me.ownerCt,
						renderTo : document.body,
						floating : true,
						hidden : true,
						focusOnShow : true,
						minDate : me.minValue,
						maxDate : me.maxValue,
						disabledDatesRE : me.disabledDatesRE,
						disabledDatesText : me.disabledDatesText,
						disabledDays : me.disabledDays,
						disabledDaysText : me.disabledDaysText,
						format : me.format,
						showToday : me.showToday,
						startDay : me.startDay,
						minText : format(me.minText, me.formatDate(me.minValue)),
						maxText : format(me.maxText, me.formatDate(me.maxValue)),
						listeners : {
							scope : me,
							select : function()
							{
								
							},
							okclick : me.onSelect
						},
						keyNavConfig : {
							esc : function() {
								me.collapse();
							}
						}
					});
		} else if (this.format.match("m")) {
			return this.pickertime = Ext.create('App.Common.DateCheckBoxMonthPicker', {
						ownerCt : me.ownerCt,
						ownerText : me,
						renderTo : document.body,
						floating : true,
						hidden : true,
						focusOnShow : true,
						height : 200,
						value : this.value,
						listeners : {
							scope : me,
							okclick : me.onSelect,
							cancelclick : function() {
								this.collapse();
							}
						},
						keyNavConfig : {
							esc : function() {
								me.collapse();
							}
						}
					});
		} else {
			return this.pickertime = Ext.create('App.Common.DateCheckBoxYearPicker',
					{
						ownerCt : me.ownerCt,
						ownerText : me,
						renderTo : document.body,
						floating : true,
						hidden : true,
						focusOnShow : true,
						height : 200,
						width : 100,
						value : this.value,
						listeners : {
							scope : me,
							okclick : me.onSelect,
							cancelclick : function() {
								this.collapse();
							}
						},
						keyNavConfig : {
							esc : function() {
								me.collapse();
							}
						}
					});
		}

	},

	onDownArrow : function(e) {
		this.callParent(arguments);
		if (this.isExpanded) {
			this.getPicker().focus();
		}
	},

	onSelect : function(m, d) {
		var me = this;
		if(d)
		{
			d.sort(function(a,b){
	            return a.getTime()-b.getTime()});
		}
		me.setValue(d);
		me.fireEvent('select', me, d);
		me.collapse();
	},
	onExpand : function() {
		var value = this.getValue();
		this.picker.setValue(value);
	},
	onCollapse : function() {
		this.focus(false, 60);
	},
	beforeBlur : function() {
		var me = this, v = me.parseDates(me.getRawValue()), focusTask = me.focusTask;
		if (focusTask) {
			focusTask.cancel();
		}

		if (v) {
			me.setValue(v);
		}
	},
    setFormat:function(fmt)
    {
        this.picker = null;
    	this.format = fmt;
    	this.disabledDatesRE = null;
        this.initDisabledDays();
        var value = this.value;
        this.value = [];
        if(value)
        {
        	for(var i = 0;i < value.length;i ++)
        	{
        		this.addValue(this.parseDate(this.formatDate(value[i])));
        	}
        }
        this.setValue(this.value);
    },
    addValue:function(value)
    {
    	var value = Ext.Date.clearTime(value, true);
    	if(!this.value)
    		this.value = [value];
    	else
    	{
    		for(var i = 0;i < this.value.length;i ++)
    		{
    			if(this.value[i].getTime() == value.getTime())
    				return ;
    		}
    		this.value.push(value);
    	}
    }
});