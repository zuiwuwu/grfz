/**
 * @class App.Common.calendar.template.DayBody
 * @extends Ext.XTemplate
 * <p>This is the template used to render the scrolling body container used in {@link App.Common.calendar.DayView DayView} and 
 * {@link App.Common.calendar.WeekView WeekView}. This template is automatically bound to the underlying event store by the 
 * calendar components and expects records of type {@link App.Common.calendar.EventRecord}.</p>
 * <p>Note that this template would not normally be used directly. Instead you would use the {@link App.Common.calendar.DayViewTemplate}
 * that internally creates an instance of this template along with a {@link App.Common.calendar.DayHeaderTemplate}.</p>
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('App.Common.calendar.template.DayBody', {
    extend: 'Ext.XTemplate',
    requires: [
        'App.Common.calendar.util.Date'
    ],
    
    constructor: function(config){
        
        Ext.apply(this, config);

        this.callParent([
            '<table class="ext-cal-bg-tbl" cellspacing="0" cellpadding="0">',
                '<tbody>',
                    '<tr height="1">',
                        '<td class="ext-cal-gutter"></td>',
                        '<td colspan="{dayCount}">',
                            '<div class="ext-cal-bg-rows">',
                                '<div class="ext-cal-bg-rows-inner">',
                                    '<tpl for="times">',
                                        '<div class="ext-cal-bg-row">',
                                            '<div class="ext-cal-bg-row-div ext-row-{[xindex]}"></div>',
                                        '</div>',
                                    '</tpl>',
                                '</div>',
                            '</div>',
                        '</td>',
                    '</tr>',
                    '<tr>',
                        '<td class="ext-cal-day-times">',
                            '<tpl for="times">',
                                '<div class="ext-cal-bg-row">',
                                    '<div class="ext-cal-day-time-inner">{.}</div>',
                                '</div>',
                            '</tpl>',
                        '</td>',
                        '<tpl for="days">',
                            '<td class="ext-cal-day-col">',
                                '<div class="ext-cal-day-col-inner">',
                                    '<div id="{[this.id]}-day-col-{.:date("Ymd")}" class="ext-cal-day-col-gutter"></div>',
                                '</div>',
                            '</td>',
                        '</tpl>',
                    '</tr>',
                '</tbody>',
            '</table>'
        ]);
    },

    // private
    applyTemplate : function(o){
        this.today = App.Common.calendar.util.Date.today();
        this.dayCount = this.dayCount || 1;
        
        var i = 0,
            days = [],
            dt = Ext.Date.clone(o.viewStart),
            times = [];
            
        for(; i<this.dayCount; i++){
            days[i] = App.Common.calendar.util.Date.add(dt, {days: i});
        }

        // use a fixed DST-safe date so times don't get skipped on DST boundaries
        dt = Ext.Date.clearTime(new Date('5/26/1972'));
        
        for(i=0; i<24; i++){
            times.push(Ext.Date.format(dt, 'ga'));
            dt = App.Common.calendar.util.Date.add(dt, {hours: 1});
        }
        
        return this.applyOut({
            days: days,
            dayCount: days.length,
            times: times
        }, []).join('');
    },
    
    apply: function(values) {
        return this.applyTemplate.apply(this, arguments);
    }
});