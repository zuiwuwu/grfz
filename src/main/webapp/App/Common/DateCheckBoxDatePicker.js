Ext.define('App.Common.DateCheckBoxDatePicker', {
   extend: 'Ext.Component',
    childEls: [
        'innerEl', 'eventEl', 'prevEl', 'nextEl', 'middleBtnEl', 'footerEl'
    ],
    border: true,
    renderTpl: [
        '<div id="{id}-innerEl" role="grid">',
            '<div role="presentation" class="{baseCls}-header">',
                 // the href attribute is required for the :hover selector to work in IE6/7/quirks
                '<a id="{id}-prevEl" class="{baseCls}-prev {baseCls}-arrow" href="#" role="button" title="{prevText}" hidefocus="on" ></a>',
                '<div class="{baseCls}-month" id="{id}-middleBtnEl">{%this.renderMonthBtn(values, out)%}</div>',
                 // the href attribute is required for the :hover selector to work in IE6/7/quirks
                '<a id="{id}-nextEl" class="{baseCls}-next {baseCls}-arrow" href="#" role="button" title="{nextText}" hidefocus="on" ></a>',
            '</div>',
            '<table id="{id}-eventEl" class="{baseCls}-inner" cellspacing="0" role="grid">',
                '<thead role="presentation"><tr role="row">',
                    '<tpl for="dayNames">',
                        '<th role="columnheader" class="{parent.baseCls}-column-header" title="{.}">',
                            '<div class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
                        '</th>',
                    '</tpl>',
                '</tr></thead>',
                '<tbody role="presentation"><tr role="row">',
                    '<tpl for="days">',
                        '{#:this.isEndOfWeek}',
                        '<td role="gridcell" id="{[Ext.id()]}">',
                            // the href attribute is required for the :hover selector to work in IE6/7/quirks
                            '<a role="presentation" hidefocus="on" class="{parent.baseCls}-date" href="#"></a>',
                        '</td>',
                    '</tpl>',
                '</tr></tbody>',
            '</table>',
            '<tpl if="showToday">',
                '<div id="{id}-footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
            '</tpl>',
        '</div>',
        {
            firstInitial: function(value) {
                return Ext.picker.Date.prototype.getDayInitial(value);
            },
            isEndOfWeek: function(value) {
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            renderTodayBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderMonthBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            }
        }
    ],
    todayText : '确定',
    ariaTitle: 'Date Picker: {0}',
    ariaTitleDateFormat: 'F d, Y',
    todayTip : '{0} (Spacebar)',
    minText : 'This date is before the minimum date',
    maxText : 'This date is after the maximum date',
    disabledDaysText : 'Disabled',
    disabledDatesText : 'Disabled',
    nextText : 'Next Month (Control+Right)',
    prevText : 'Previous Month (Control+Left)',
    monthYearText : 'Choose a month (Control+Up/Down to move years)',
    monthYearFormat: 'F Y',
    startDay : 0,
    showToday : true,
     disableAnim: false,
    baseCls: Ext.baseCSSPrefix + 'datepicker',
    longDayFormat: 'F d, Y',
    focusOnShow: false,
    focusOnSelect: true,
    initHour: 12, // 24-hour format
    numDays: 42,
    
    initComponent : function() {
        var me = this,
            clearTime = Ext.Date.clearTime;
        me.selectedCls = me.baseCls + '-selected';
        me.disabledCellCls = me.baseCls + '-disabled';
        me.prevCls = me.baseCls + '-prevday';
        me.activeCls = me.baseCls + '-active';
        me.cellCls = me.baseCls + '-cell';
        me.nextCls = me.baseCls + '-prevday';
        me.todayCls = me.baseCls + '-today';
        if (!me.format) {
            me.format = Ext.Date.defaultFormat;
        }
        if (!me.dayNames) {
            me.dayNames = Ext.Date.dayNames;
        }
        me.dayNames = me.dayNames.slice(me.startDay).concat(me.dayNames.slice(0, me.startDay));

        me.callParent();

        if(me.value)
        {
        	if(!Ext.isArray(me.value))
        	{
        		me.value = [clearTime(me.value, true)];
        	}
        	else
        	{
        		for(var i = 0;i < me.value.length;i ++)
        		{
        			me.value[i] = clearTime(me.value[i], true) ;
        		}
        	}
        }
        
        me.showDate = me.showDate ?
           clearTime(me.showDate, true) : clearTime(new Date());

        me.addEvents(
            'select',
            'okclick'
        );

        me.initDisabledDays();
    },

    beforeRender: function () {
        var me = this,
            days = new Array(me.numDays),
            today = Ext.Date.format(new Date(), me.format);

        // If there's a Menu among our ancestors, then add the menu class.
        // This is so that the MenuManager does not see a mousedown in this Component as a document mousedown, outside the Menu
        if (me.up('menu')) {
            me.addCls(Ext.baseCSSPrefix + 'menu');
        }

        me.monthBtn = new Ext.button.Split({
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            text: '',
            tooltip: me.monthYearText,
            listeners: {
                click: me.showMonthPicker,
                arrowclick: me.showMonthPicker,
                scope: me
            }
        });

        if (me.showToday) {
            me.todayBtn = new Ext.button.Button({
                ownerCt: me,
                ownerLayout: me.getComponentLayout(),
                text: Ext.String.format(me.todayText, today),
                tooltip: Ext.String.format(me.todayTip, today),
                tooltipType: 'title',
                handler: me.selectToday,
                scope: me
            });
        }

        me.callParent();

        Ext.applyIf(me, {
            renderData: {}
        });

        Ext.apply(me.renderData, {
            dayNames: me.dayNames,
            showToday: me.showToday,
            prevText: me.prevText,
            nextText: me.nextText,
            days: days
        });

        me.protoEl.unselectable();
    },
    finishRenderChildren: function () {
        var me = this;
        
        me.callParent();
        me.monthBtn.finishRender();
        if (me.showToday) {
            me.todayBtn.finishRender();
        }
    },
    onRender : function(container, position){
        var me = this;

        me.callParent(arguments);

        me.cells = me.eventEl.select('tbody td');
        me.textNodes = me.eventEl.query('tbody td a');
        
        me.mon(me.eventEl, {
            scope: me,
            mousewheel: me.handleMouseWheel,
            click: {
                fn: me.handleDateClick,
                delegate: 'a.' + me.baseCls + '-date'
            }
        });
        
    },
    initEvents: function(){
        var me = this,
            eDate = Ext.Date,
            day = eDate.DAY;

        me.callParent();

        me.prevRepeater = new Ext.util.ClickRepeater(me.prevEl, {
            handler: me.showPrevMonth,
            scope: me,
            preventDefault: true,
            stopDefault: true
        });

        me.nextRepeater = new Ext.util.ClickRepeater(me.nextEl, {
            handler: me.showNextMonth,
            scope: me,
            preventDefault:true,
            stopDefault:true
        });

        me.keyNav = new Ext.util.KeyNav(me.eventEl, Ext.apply({
            scope: me,
            left : function(e){
                if(e.ctrlKey){
                    me.showPrevMonth();
                }else{
                    me.update(eDate.add(me.activeDate, day, -1));
                }
            },

            right : function(e){
                if(e.ctrlKey){
                    me.showNextMonth();
                }else{
                    me.update(eDate.add(me.activeDate, day, 1));
                }
            },

            up : function(e){
                if(e.ctrlKey){
                    me.showNextYear();
                }else{
                    me.update(eDate.add(me.activeDate, day, -7));
                }
            },

            down : function(e){
                if(e.ctrlKey){
                    me.showPrevYear();
                }else{
                    me.update(eDate.add(me.activeDate, day, 7));
                }
            },

            pageUp:function (e) {
                if (e.altKey) {
                    me.showPrevYear();
                } else {
                    me.showPrevMonth();
                }
            },

            pageDown:function (e) {
                if (e.altKey) {
                    me.showNextYear();
                } else {
                    me.showNextMonth();
                }
            },

            tab:function (e) {
                me.doCancelFieldFocus = true;
                me.handleTabClick(e);
                delete me.doCancelFieldFocus;
                return true;
            },
            
            enter : function(e){
                e.stopPropagation();
                return true;
            },

            //space: ???

            home:function (e) {
                me.update(eDate.getFirstDateOfMonth(me.activeDate));
            },

            end:function (e) {
                me.update(eDate.getLastDateOfMonth(me.activeDate));
            }
        }, me.keyNavConfig));

        if (me.showToday) {
            me.todayKeyListener = me.eventEl.addKeyListener(Ext.EventObject.SPACE, me.selectToday,  me);
        }
        me.update(me.showDate);
    },

    handleTabClick:function (e) {
        var me = this,
            t = me.getSelectedDate(me.activeDate),
            handler = me.handler;

        // The following code is like handleDateClick without the e.stopEvent()
        if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
            me.doCancelFocus = me.focusOnSelect === false;
            me.setShowValue(new Date(t.dateValue));
            delete me.doCancelFocus;
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            me.onSelect();
        }
    },

    getSelectedDate:function (date) {
        var me = this,
            t = date.getTime(),
            cells = me.cells,
            cls = me.selectedCls,
            cellItems = cells.elements,
            c,
            cLen = cellItems.length,
            cell;

        cells.removeCls(cls);

        for (c = 0; c < cLen; c++) {
            cell = Ext.fly(cellItems[c]);

            if (cell.dom.firstChild.dateValue == t) {
                return cell.dom.firstChild;
            }
        }
        return null;
    },
    initDisabledDays : function(){
        var me = this,
            dd = me.disabledDates,
            re = '(?:',
            len,
            d, dLen, dI;

        if(!me.disabledDatesRE && dd){
                len = dd.length - 1;

            dLen = dd.length;

            for (d = 0; d < dLen; d++) {
                dI = dd[d];

                re += Ext.isDate(dI) ? '^' + Ext.String.escapeRegex(Ext.Date.dateFormat(dI, me.format)) + '$' : dI;
                if (d != len) {
                    re += '|';
                }
            }

            me.disabledDatesRE = new RegExp(re + ')');
        }
    },
    setDisabledDates : function(dd){
        var me = this;

        if(Ext.isArray(dd)){
            me.disabledDates = dd;
            me.disabledDatesRE = null;
        }else{
            me.disabledDatesRE = dd;
        }
        me.initDisabledDays();
        me.update(me.value, true);
        return me;
    },
    setDisabledDays : function(dd){
        this.disabledDays = dd;
        return this.update(this.value, true);
    },
    setMinDate : function(dt){
        this.minDate = dt;
        return this.update(this.value, true);
    },
    setMaxDate : function(dt){
        this.maxDate = dt;
        return this.update(this.value, true);
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
    },
    removeValue:function(value)
    {
    	var value = Ext.Date.clearTime(value, true);
    	if(this.value)
    	{
    		for(var i = 0;i < this.value.length;i ++)
    		{
    			if(this.value[i].getTime() == value.getTime())
    			{
    				this.value.splice(i,1);
    				return ;
    			}
    		}
    		
    	}
    },
    isDateSelected:function(value){
    	if(!this.value)
    		return false;
    	else
    	{
    		for(var i = 0;i < this.value.length;i ++)
    		{
    			if(this.value[i].getTime() == value)
    				return true;
    		}
    	}
    	return false;
    },
    setValue : function(value){
        this.value = value;
        return this.update(this.activeDate);
    },
    setShowValue : function(value){
        this.showDate = Ext.Date.clearTime(value, true);
        return this.update(this.showDate);
    },
    getValue : function(){
        return this.value;
    },
    getDayInitial: function(value){
        return value.substr(0,1);
    },
    focus : function(){
        this.update(this.activeDate);
    },
    onEnable: function(){
        this.callParent();
        this.setDisabledStatus(false);
        this.update(this.activeDate);

    },
    onDisable : function(){
        this.callParent();
        this.setDisabledStatus(true);
    },
    setDisabledStatus : function(disabled){
        var me = this;

        me.keyNav.setDisabled(disabled);
        me.prevRepeater.setDisabled(disabled);
        me.nextRepeater.setDisabled(disabled);
        if (me.showToday) {
            me.todayKeyListener.setDisabled(disabled);
            me.todayBtn.setDisabled(disabled);
        }
    },
    getActive: function(){
        return this.activeDate || this.value;
    },
    runAnimation: function(isHide){
        var picker = this.monthPicker,
            options = {
                duration: 200,
                callback: function(){
                    if (isHide) {
                        picker.hide();
                    } else {
                        picker.show();
                    }
                }
            };

        if (isHide) {
            picker.el.slideOut('t', options);
        } else {
            picker.el.slideIn('t', options);
        }
    },
    hideMonthPicker : function(animate){
        var me = this,
            picker = me.monthPicker;

        if (picker) {
            if (me.shouldAnimate(animate)) {
                me.runAnimation(true);
            } else {
                picker.hide();
            }
        }
        return me;
    },
    showMonthPicker : function(animate){
        var me = this,
            picker;
        
        if (me.rendered && !me.disabled) {
            picker = me.createMonthPicker();
            picker.setShowValue(me.getActive());
            picker.setSize(me.getSize());
            picker.setPosition(-1, -1);
            if (me.shouldAnimate(animate)) {
                me.runAnimation(false);
            } else {
                picker.show();
            }
        }
        return me;
    },
    shouldAnimate: function(animate){
        return Ext.isDefined(animate) ? animate : !this.disableAnim;
    },
    createMonthPicker: function(){
        var me = this,
            picker = me.monthPicker;

        if (!picker) {
            me.monthPicker = picker = new Ext.picker.Month({
                renderTo: me.el,
                floating: true,
                shadow: false,
                small: me.showToday === false,
                listeners: {
                    scope: me,
                    cancelclick: me.onCancelClick,
                    okclick: me.onOkClick,
                    yeardblclick: me.onOkClick,
                    monthdblclick: me.onOkClick
                }
            });
            if (!me.disableAnim) {
                // hide the element if we're animating to prevent an initial flicker
                picker.el.setStyle('display', 'none');
            }
            me.on('beforehide', Ext.Function.bind(me.hideMonthPicker, me, [false]));
        }
        return picker;
    },
    onOkClick: function(picker, value){
        var me = this,
            month = value[0],
            year = value[1],
            date = new Date(year, month, me.getActive().getDate());

        if (date.getMonth() !== month) {
            // 'fix' the JS rolling date conversion if needed
            date = Ext.Date.getLastDateOfMonth(new Date(year, month, 1));
        }
        me.setShowValue(date);
        me.hideMonthPicker();
    },
    onCancelClick: function(){
        // update the selected value, also triggers a focus
        this.selectedUpdate();
        this.hideMonthPicker();
    },
    showPrevMonth : function(e){
        return this.setShowValue(Ext.Date.add(this.activeDate, Ext.Date.MONTH, -1));
    },
    showNextMonth : function(e){
        return this.setShowValue(Ext.Date.add(this.activeDate, Ext.Date.MONTH, 1));
    },
    showPrevYear : function(){
        return this.setShowValue(Ext.Date.add(this.activeDate, Ext.Date.YEAR, -1));
    },
    showNextYear : function(){
        return this.setShowValue(Ext.Date.add(this.activeDate, Ext.Date.YEAR, 1));
    },
    handleMouseWheel : function(e){
        e.stopEvent();
        if(!this.disabled){
            var delta = e.getWheelDelta();
            if(delta > 0){
                this.showPrevMonth();
            } else if(delta < 0){
                this.showNextMonth();
            }
        }
    },
    handleDateClick : function(e, t){
        var me = this,
            handler = me.handler;

        e.stopEvent();
        if(!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)){
            me.doCancelFocus = me.focusOnSelect === false;
            if(me.isDateSelected(t.dateValue))
            	me.removeValue(new Date(t.dateValue));
            else
            	me.addValue(new Date(t.dateValue));
            me.setShowValue(new Date(t.dateValue));
            delete me.doCancelFocus;
            //me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            // event handling is turned off on hide
            // when we are using the picker in a field
            // therefore onSelect comes AFTER the select
            // event.
            me.onSelect();
        }
    },
    onSelect: function() {
       // if (this.hideOnSelect) {
       //      this.hide();
       //  }
    },
    selectToday : function(){
        var me = this,
            btn = me.todayBtn,
            handler = me.handler;
		
        if(btn && !btn.disabled){
            //me.setShowValue(Ext.Date.clearTime(new Date()));
            me.fireEvent('okclick', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
           me.onSelect();
        }
        return me;
    },
    selectedUpdate: function(){
        var me        = this,
            cells     = me.cells,
            cls       = me.selectedCls,
            cellItems = cells.elements,
            c,
            cLen      = cellItems.length,
            cell;

        cells.removeCls(cls);

        for (c = 0; c < cLen; c++) {
            cell = Ext.fly(cellItems[c]);

            if (this.isDateSelected(cell.dom.firstChild.dateValue)) {
                me.fireEvent('highlightitem', me, cell);
                cell.addCls(cls);

                if(me.isVisible() && !me.doCancelFocus){
                    Ext.fly(cell.dom.firstChild).focus(50);
                }
            }
        }
    },
    fullUpdate: function(date){
        var me = this,
            cells = me.cells.elements,
            textNodes = me.textNodes,
            disabledCls = me.disabledCellCls,
            eDate = Ext.Date,
            i = 0,
            extraDays = 0,
            visible = me.isVisible(),
            newDate = +eDate.clearTime(date, true),
            today = +eDate.clearTime(new Date()),
            min = me.minDate ? eDate.clearTime(me.minDate, true) : Number.NEGATIVE_INFINITY,
            max = me.maxDate ? eDate.clearTime(me.maxDate, true) : Number.POSITIVE_INFINITY,
            ddMatch = me.disabledDatesRE,
            ddText = me.disabledDatesText,
            ddays = me.disabledDays ? me.disabledDays.join('') : false,
            ddaysText = me.disabledDaysText,
            format = me.format,
            days = eDate.getDaysInMonth(date),
            firstOfMonth = eDate.getFirstDateOfMonth(date),
            startingPos = firstOfMonth.getDay() - me.startDay,
            previousMonth = eDate.add(date, eDate.MONTH, -1),
            longDayFormat = me.longDayFormat,
            prevStart,
            current,
            disableToday,
            tempDate,
            setCellClass,
            html,
            cls,
            formatValue,
            value;

        if (startingPos < 0) {
            startingPos += 7;
        }

        days += startingPos;
        prevStart = eDate.getDaysInMonth(previousMonth) - startingPos;
        current = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), prevStart, me.initHour);

        if (me.showToday) {
            tempDate = eDate.clearTime(new Date());
            disableToday = (tempDate < min || tempDate > max ||
                (ddMatch && format && ddMatch.test(eDate.dateFormat(tempDate, format))) ||
                (ddays && ddays.indexOf(tempDate.getDay()) != -1));

            if (!me.disabled) {
                me.todayBtn.setDisabled(disableToday);
                me.todayKeyListener.setDisabled(disableToday);
            }
        }

        setCellClass = function(cell, cls){
            value = +eDate.clearTime(current, true);
            cell.title = eDate.format(current, longDayFormat);
            // store dateValue number as an expando
            cell.firstChild.dateValue = value;
            if(value == today){
                cls += ' ' + me.todayCls;
                cell.title = me.todayText;
                
                // Extra element for ARIA purposes
                me.todayElSpan = Ext.DomHelper.append(cell.firstChild, {
                    tag:'span',
                    cls: Ext.baseCSSPrefix + 'hide-clip',
                    html:me.todayText
                }, true);
            }
            if(me.isDateSelected(value)) {
                cls += ' ' + me.selectedCls;
                //me.fireEvent('highlightitem', me, cell);
                //if (visible && me.floating) {
                //    Ext.fly(cell.firstChild).focus(50);
                //}
            }

            if (value < min) {
                cls += ' ' + disabledCls;
                cell.title = me.minText;
            }
            else if (value > max) {
                cls += ' ' + disabledCls;
                cell.title = me.maxText;
            }
            else if (ddays && ddays.indexOf(current.getDay()) !== -1){
                cell.title = ddaysText;
                cls += ' ' + disabledCls;
            }
            else if (ddMatch && format){
                formatValue = eDate.dateFormat(current, format);
                if(ddMatch.test(formatValue)){
                    cell.title = ddText.replace('%0', formatValue);
                    cls += ' ' + disabledCls;
                }
            }
            cell.className = cls + ' ' + me.cellCls;
        };

        for(; i < me.numDays; ++i) {
            if (i < startingPos) {
                html = (++prevStart);
                cls = me.prevCls;
            } else if (i >= days) {
                html = (++extraDays);
                cls = me.nextCls;
            } else {
                html = i - startingPos + 1;
                cls = me.activeCls;
            }
            textNodes[i].innerHTML = html;
            current.setDate(current.getDate() + 1);
            setCellClass(cells[i], cls);
        }

        me.monthBtn.setText(Ext.Date.format(date, me.monthYearFormat));
    },
    update : function(date, forceRefresh){
        var me = this,
            active = me.activeDate;
        if (me.rendered) {
            me.activeDate = date;
            if(!forceRefresh && active && me.el && active.getMonth() == date.getMonth() && active.getFullYear() == date.getFullYear()){
                me.selectedUpdate();
            } else {
                me.fullUpdate(date, active);
            }
        }
        return me;
    },
    beforeDestroy : function() {
        var me = this;

        if (me.rendered) {
            Ext.destroy(
                me.todayKeyListener,
                me.keyNav,
                me.monthPicker,
                me.monthBtn,
                me.nextRepeater,
                me.prevRepeater,
                me.todayBtn
            );
            delete me.textNodes;
            delete me.cells.elements;
        }
        me.callParent();
    },
    onShow: function() {
        this.callParent(arguments);
        if (this.focusOnShow) {
            this.focus();
        }
    }
});