/**
 * @class App.Common.calendar.view.Week
 * @extends App.Common.calendar.DayView
 * <p>Displays a calendar view by week. This class does not usually need ot be used directly as you can
 * use a {@link App.Common.calendar.CalendarPanel CalendarPanel} to manage multiple calendar views at once including
 * the week view.</p>
 * @constructor
 * @param {Object} config The config object
 */
Ext.define('App.Common.calendar.view.Week', {
    extend: 'App.Common.calendar.view.Day',
    alias: 'widget.weekview',
    
    /**
     * @cfg {Number} dayCount
     * The number of days to display in the view (defaults to 7)
     */
    dayCount: 7
});
