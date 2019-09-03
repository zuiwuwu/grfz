Ext.define('App.Common.DateCheckBoxMonthPicker', {
   extend: 'Ext.Component',
    childEls: [
        'bodyEl', 'prevEl', 'nextEl', 'buttonsEl', 'monthEl', 'yearEl'
    ],

    renderTpl: [
        '<div id="{id}-bodyEl" class="{baseCls}-body">',
          '<div id="{id}-monthEl" class="{baseCls}-months">',
              '<tpl for="months">',
                  '<div class="{parent.baseCls}-item {parent.baseCls}-month">',
                      // the href attribute is required for the :hover selector to work in IE6/7/quirks
                      '<a style="{parent.monthStyle}" hidefocus="on" class="{parent.baseCls}-item-inner" href="#">{.}</a>',
                  '</div>',
              '</tpl>',
          '</div>',
          '<div id="{id}-yearEl" class="{baseCls}-years">',
              '<div class="{baseCls}-yearnav">',
                  '<div class="{baseCls}-yearnav-button-ct">',
                      // the href attribute is required for the :hover selector to work in IE6/7/quirks
                      '<a id="{id}-prevEl" class="{baseCls}-yearnav-button {baseCls}-yearnav-prev" href="#" hidefocus="on" ></a>',
                  '</div>',
                  '<div class="{baseCls}-yearnav-button-ct">',
                      // the href attribute is required for the :hover selector to work in IE6/7/quirks
                      '<a id="{id}-nextEl" class="{baseCls}-yearnav-button {baseCls}-yearnav-next" href="#" hidefocus="on" ></a>',
                  '</div>',
              '</div>',
              '<tpl for="years">',
                  '<div class="{parent.baseCls}-item {parent.baseCls}-year">',
                      // the href attribute is required for the :hover selector to work in IE6/7/quirks
                      '<a hidefocus="on" class="{parent.baseCls}-item-inner" href="#">{.}</a>',
                  '</div>',
              '</tpl>',
          '</div>',
          '<div class="' + Ext.baseCSSPrefix + 'clear"></div>',
        '</div>',
        '<tpl if="showButtons">',
            '<div id="{id}-buttonsEl" class="{baseCls}-buttons">{%',
                'var me=values.$comp, okBtn=me.okBtn, cancelBtn=me.cancelBtn;',
                'okBtn.ownerLayout = cancelBtn.ownerLayout = me.componentLayout;',
                'okBtn.ownerCt = cancelBtn.ownerCt = me;',
                'Ext.DomHelper.generateMarkup(okBtn.getRenderTree(), out);',
                'Ext.DomHelper.generateMarkup(cancelBtn.getRenderTree(), out);',
            '%}</div>',
        '</tpl>'
    ],
    okText: '确定',
    cancelText: '取消',
    baseCls: Ext.baseCSSPrefix + 'monthpicker',
    showButtons: true,
    
    measureWidth: 35,
    measureMaxHeight: 20,

    // used when attached to date picker which isnt showing buttons
    smallCls: Ext.baseCSSPrefix + 'monthpicker-small',

    // @private
    totalYears: 10,
    yearOffset: 5, // 10 years in total, 2 per row
    monthOffset: 6, // 12 months, 2 per row

    // @private
    // @inheritdoc
    initComponent: function(){
        var me = this;

        me.selectedCls = me.baseCls + '-selected';
        me.addEvents(
            'cancelclick',
            'monthclick',
            'monthdblclick',
            'okclick',
            'select',
            'yearclick',
            'yeardblclick'
        );
        if (me.small) {
            me.addCls(me.smallCls);
        }
        me.setValue(me.value);
        me.activeYear = me.getLastYear()||(new Date().getFullYear() - 4);

        if (me.showButtons) {
            me.okBtn = new Ext.button.Button({
                text: me.okText,
                handler: me.onOkClick,
                scope: me
            });
            me.cancelBtn = new Ext.button.Button({
                text: me.cancelText,
                handler: me.onCancelClick,
                scope: me
            });
        }

        this.callParent();
    },

    // @private
    // @inheritdoc
    beforeRender: function(){
        var me = this,
            i = 0,
            months = [],
            shortName = Ext.Date.getShortMonthName,
            monthLen = me.monthOffset,
            margin = me.monthMargin,
            style = '';

        me.callParent();

        for (; i < monthLen; ++i) {
            months.push(shortName(i), shortName(i + monthLen));
        }
        
        if (Ext.isDefined(margin)) {
            style = 'margin: 0 ' + margin + 'px;';
        }

        Ext.apply(me.renderData, {
            months: months,
            years: me.getYears(),
            showButtons: me.showButtons,
            monthStyle: style
        });
    },
    afterRender: function(){
        var me = this,
            body = me.bodyEl,
            buttonsEl = me.buttonsEl;

        me.callParent();

        me.mon(body, 'click', me.onBodyClick, me);
        me.mon(body, 'dblclick', me.onBodyClick, me);

        // keep a reference to the year/month elements since we'll be re-using them
        me.years = body.select('.' + me.baseCls + '-year a');
        me.months = body.select('.' + me.baseCls + '-month a');

        me.backRepeater = new Ext.util.ClickRepeater(me.prevEl, {
            handler: Ext.Function.bind(me.adjustYear, me, [-me.totalYears])
        });

        me.prevEl.addClsOnOver(me.baseCls + '-yearnav-prev-over');
        me.nextRepeater = new Ext.util.ClickRepeater(me.nextEl, {
            handler: Ext.Function.bind(me.adjustYear, me, [me.totalYears])
        });
        me.nextEl.addClsOnOver(me.baseCls + '-yearnav-next-over');
        me.updateBody();
        
        if (!Ext.isDefined(me.monthMargin)) {
            Ext.picker.Month.prototype.monthMargin = me.calculateMonthMargin();
        }
    },
    
    calculateMonthMargin: function(){
        // We use this method for locales where the short month name
        // may be longer than we see in English. For example in the 
        // zh_TW locale the month ends up spanning lines, so we loosen
        // the margins to get some extra space
        var me = this,
            monthEl = me.monthEl,
            months = me.months,
            first = months.first(),
            itemMargin = first.getMargin('l');
            
        while (itemMargin && me.getLargest() > me.measureMaxHeight) {
            --itemMargin;
            months.setStyle('margin', '0 ' + itemMargin + 'px');
        }
        return itemMargin;
    },
    
    getLargest: function(months){
        var largest = 0;
        this.months.each(function(item){
            var h = item.getHeight();
            if (h > largest) {
                largest = h;
            }
        });
        return largest;
        
    },
    getLastYear:function()
    {
    	 var me = this;
    	if(!me.value
    	||me.value.length < 1)
    		return null;
    		
    	if(!Ext.isArray(me.value))
    		return null;
    	me.value.sort(function(a,b){
            return a.getFullYear()-b.getFullYear()});
        return me.value[me.value.length - 1].getFullYear();
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
    setValue: function(value){
        var me = this,
            active = me.activeYear,
            offset = me.monthOffset,
            year,
            index;

        if (!value) {
            me.value = null;
        } else {
            me.value = value;
        }

        if (me.rendered) {
            year = me.getLastYear();
            if (year !== null) {
                if ((year < active || year > active + me.yearOffset)) {
                    me.activeYear = year - me.yearOffset + 1;
                }
            }
            me.updateBody();
        }

        return me;
    },
    getValue: function(){
        return this.value;
    },
	isMonthSelected:function(value)
	{
		if(!Ext.isDate(value))
		{
			value = new Date(value);
		}
		if(!this.value)
    		return false;
    	else
    	{
    		for(var i = 0;i < this.value.length;i ++)
    		{
    			if(this.value[i].getFullYear() == value.getFullYear()
    			&&this.value[i].getMonth() == value.getMonth())
    				return true;
    		}
    	}
    	return false;
	},
    hasSelection: function(){
        var value = this.value;
        return value !== null && value.length > 1;
    },
    getYears: function(){
        var me = this,
            offset = me.yearOffset,
            start = me.activeYear, // put the "active" year on the left
            end = start + offset,
            i = start,
            years = [];

        for (; i < end; ++i) {
            years.push(i, i + offset);
        }

        return years;
    },
    updateBody: function(){
        var me = this,
            years = me.years,
            months = me.months,
            yearNumbers = me.getYears(),
            cls = me.selectedCls,
            value = me.getYear(null),
            monthOffset = me.monthOffset,
            year,
            yearItems, y, yLen, el;

        if (me.rendered) {
            years.removeCls(cls);
            months.removeCls(cls);

            yearItems = years.elements;
            yLen      = yearItems.length;

            for (y = 0; y < yLen; y++) {
                el = Ext.fly(yearItems[y]);

                year = yearNumbers[y];
                el.dom.innerHTML = year;
                if (year == value) {
                    el.addCls(cls);
                }
            }
            var date = new Date();
            date.setFullYear(me.activeYear);
            for (y = 0; y < months.getCount(); y++) {
           	 	date.setMonth(me.resolveOffset(y, monthOffset));
            	if(me.isMonthSelected(date))
                	months.item(y).addCls(cls);
            }
            
        }
    },

    getYear: function(defaultValue, offset) {
        var year = this.activeYear;
        offset = offset || 0;
        return year === null ? defaultValue : year + offset;
    },
    onBodyClick: function(e, t) {
        var me = this,
            isDouble = e.type == 'dblclick';

        if (e.getTarget('.' + me.baseCls + '-month')) {
            e.stopEvent();
            me.onMonthClick(t, isDouble);
        } else if (e.getTarget('.' + me.baseCls + '-year')) {
            e.stopEvent();
            me.onYearClick(t, isDouble);
        }
    },
    adjustYear: function(offset){
        if (typeof offset != 'number') {
            offset = this.totalYears;
        }
        this.activeYear += offset;
        this.updateBody();
    },

    /**
     * React to the ok button being pressed
     * @private
     */
    onOkClick: function(){
        this.fireEvent('okclick', this, this.value);
    },
    onCancelClick: function(){
        this.fireEvent('cancelclick', this);
    },
    onMonthClick: function(target, isDouble){
        var me = this;
        var date = new Date();
        date.setFullYear(me.activeYear);
        date.setMonth(me.resolveOffset(me.months.indexOf(target), me.monthOffset));
        if(me.isMonthSelected(date))
        	me.removeValue(date);
        else
        	me.addValue(date);
        me.updateBody();
        //me.fireEvent('month' + (isDouble ? 'dbl' : '') + 'click', me, me.value);
        me.fireEvent('select', me, me.value);
    },
    onYearClick: function(target, isDouble){
        var me = this;
        me.activeYear = me.activeYear + me.resolveOffset(me.years.indexOf(target), me.yearOffset);
        me.updateBody();
        //me.fireEvent('year' + (isDouble ? 'dbl' : '') + 'click', me, me.value);
        //me.fireEvent('select', me, me.value);
    },
    resolveOffset: function(index, offset){
        if (index % 2 === 0) {
            return (index / 2);
        } else {
            return offset + Math.floor(index / 2);
        }
    },

    // @private
    // @inheritdoc
    beforeDestroy: function(){
        var me = this;
        me.years = me.months = null;
        Ext.destroyMembers(me, 'backRepeater', 'nextRepeater', 'okBtn', 'cancelBtn');
        me.callParent();
    },

    // Do the job of a container layout at this point even though we are not a Container.
    // TODO: Refactor as a Container.
    finishRenderChildren: function () {
        var me = this;

        this.callParent(arguments);

        if (this.showButtons) {
            me.okBtn.finishRender();
            me.cancelBtn.finishRender();
        }
    },

    onDestroy: function() {
        Ext.destroyMembers(this, 'okBtn', 'cancelBtn');
        this.callParent();
    }
    
});