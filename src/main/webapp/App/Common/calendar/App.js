/*
 * This calendar application was forked from Ext Calendar Pro
 * and contributed to Ext JS as an advanced example of what can 
 * be built using and customizing Ext components and templates.
 * 
 * If you find this example to be useful you should take a look at
 * the original project, which has more features, more examples and
 * is maintained on a regular basis:
 * 
 *  http://ext.ensible.com/products/calendar
 */
Ext.define('App.Common.calendar.App', {
    extend: 'Ext.Container',
    requires: [
        'Ext.layout.container.Border',
        'Ext.picker.Date',
        'App.Common.calendar.util.Date',
        'App.Common.calendar.CalendarPanel',
        'App.Common.calendar.data.MemoryCalendarStore',
        'App.Common.calendar.data.MemoryEventStore',
        'App.Common.calendar.data.Events',
        'App.Common.calendar.data.Calendars',
        'App.Common.calendar.form.EventWindow'
    ],
    layout: 'border',
    fieldEventId: 'EventId',
    fieldReminder: 'Reminder',
    fieldStartDate: 'StartDate',
    fieldEndDate: 'EndDate',
    fieldIsAllDay: 'IsAllDay',
    fieldTitle: 'Title',
    enableMonthDD: true,
    initComponent: function () {
        // This is an example calendar store that enables event color-coding
        this.calendarStore = Ext.create('Ext.calendar.data.MemoryCalendarStore', {
            data: []//Ext.calendar.data.Calendars.getData()
        });

        // A sample event store that loads static JSON from a local file. Obviously a real
        // implementation would likely be loading remote data via an HttpProxy, but the
        // underlying store functionality is the same.
        this.eventStore = Ext.create('Ext.calendar.data.MemoryEventStore', {
            data: []//Ext.calendar.data.Events.getData()
        });
        this.items = [{
            xtype: 'component',
            region: 'north',
            height: 35
        }, {
            id: 'app-center',
            title: '...', // will be updated to the current view's date range
            region: 'center',
            layout: 'border',
            listeners: {
                'afterrender': function () {
                    Ext.getCmp('app-center').header.addCls('app-center-header');
                }
            },
            items: [{
                xtype: 'container',
                id: 'app-west',
                region: 'west',
                width: Ext.themeName === 'neptune' ? 214 : 179,
                items: [{
                    xtype: 'datepicker',
                    id: 'app-nav-picker',
                    cls: 'ext-cal-nav-picker',
                    listeners: {
                        'select': {
                            fn: function (dp, dt) {
                                Ext.getCmp('app-calendar').setStartDate(dt);
                            },
                            scope: this
                        }
                    }
                }]
            }, {
                xtype: 'calendarpanel',
                eventStore: this.eventStore,
                calendarStore: this.calendarStore,
                border: false,
                id: 'app-calendar',
                region: 'center',
                activeItem: 3, // month view

                monthViewCfg: {
                    showHeader: true,
                    showWeekLinks: true,
                    showWeekNumbers: true,
                    scope: this,
                    ongetTemplateEventData: this.getMonthTemplateEventData,
                    ongetDayBodyTemplateEventData: this.getTemplateEventData,
                    fieldEventId: this.fieldEventId,
                    fieldReminder: this.fieldEventId,
                    fieldStartDate: this.fieldStartDate,
                    fieldEndDate: this.fieldEndDate,
                    fieldIsAllDay: this.fieldIsAllDay,
                    fieldTitle: this.fieldTitle,
                    enableDD: this.enableMonthDD
                },

                weekViewCfg: {
                    scope: this,
                    ongetTemplateEventData: this.getMonthTemplateEventData,
                    ongetDayBodyTemplateEventData: this.getTemplateEventData,
                    fieldEventId: this.fieldEventId,
                    fieldReminder: this.fieldEventId,
                    fieldStartDate: this.fieldStartDate,
                    fieldEndDate: this.fieldEndDate,
                    fieldIsAllDay: this.fieldIsAllDay,
                    fieldTitle: this.fieldTitle
                },

                dayViewCfg: {
                    scope: this,
                    ongetTemplateEventData: this.getMonthTemplateEventData,
                    ongetDayBodyTemplateEventData: this.getTemplateEventData,
                    fieldEventId: this.fieldEventId,
                    fieldReminder: this.fieldEventId,
                    fieldStartDate: this.fieldStartDate,
                    fieldEndDate: this.fieldEndDate,
                    fieldIsAllDay: this.fieldIsAllDay,
                    fieldTitle: this.fieldTitle
                },

                listeners: {
                    'eventclick': {
                        fn: function (vw, rec, el) {
                            this.showEditWindow(rec, el);
                            this.clearMsg();
                        },
                        scope: this
                    },
                    'eventover': function (vw, rec, el) {
                        //console.log('Entered evt rec='+rec.data.Title+', view='+ vw.id +', el='+el.id);
                    },
                    'eventout': function (vw, rec, el) {
                        //console.log('Leaving evt rec='+rec.data.Title+', view='+ vw.id +', el='+el.id);
                    },
                    'eventadd': {
                        fn: function (cp, rec) {
                            this.showMsg('Event ' + rec.data.Title + ' was added');
                        },
                        scope: this
                    },
                    'eventupdate': {
                        fn: function (cp, rec) {
                            this.showMsg('Event ' + rec.data.Title + ' was updated');
                        },
                        scope: this
                    },
                    'eventcancel': {
                        fn: function (cp, rec) {
                            // edit canceled
                        },
                        scope: this
                    },
                    'viewchange': {
                        fn: function (p, vw, dateInfo) {
                            if (this.editWin) {
                                this.editWin.hide();
                            }
                            if (dateInfo) {
                                // will be null when switching to the event edit form so ignore
                                Ext.getCmp('app-nav-picker').setValue(dateInfo.activeDate);
                                this.updateTitle(dateInfo.viewStart, dateInfo.viewEnd);
                            }
                        },
                        scope: this
                    },
                    'dayclick': {
                        fn: function (vw, dt, ad, el) {
                            this.showEditWindow({
                                StartDate: dt,
                                IsAllDay: ad
                            }, el);
                            this.clearMsg();
                        },
                        scope: this
                    },
                    'rangeselect': {
                        fn: function (win, dates, onComplete) {
                            this.showEditWindow(dates);
                            this.editWin.on('hide', onComplete, this, { single: true });
                            this.clearMsg();
                        },
                        scope: this
                    },
                    'eventmove': {
                        fn: function (vw, rec) {
                            var mappings = Ext.calendar.data.EventMappings,
                                    time = rec.data[mappings.IsAllDay.name] ? '' : ' \\a\\t g:i a';

                            rec.commit();

                            this.showMsg('Event ' + rec.data[mappings.Title.name] + ' was moved to ' +
                                    Ext.Date.format(rec.data[mappings.StartDate.name], ('F jS' + time)));
                        },
                        scope: this
                    },
                    'eventresize': {
                        fn: function (vw, rec) {
                            rec.commit();
                            this.showMsg('Event ' + rec.data.Title + ' was updated');
                        },
                        scope: this
                    },
                    'eventdelete': {
                        fn: function (win, rec) {
                            this.eventStore.remove(rec);
                            this.showMsg('Event ' + rec.data.Title + ' was deleted');
                        },
                        scope: this
                    },
                    'initdrag': {
                        fn: function (vw) {
                            if (this.editWin && this.editWin.isVisible()) {
                                this.editWin.hide();
                            }
                        },
                        scope: this
                    }
                }
            }]
        }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    // private
    getMonthTemplateEventData: function (evt, selector) {
        var title = evt[this.fieldTitle];

        return Ext.applyIf({
            _selectorCls: selector,
            _colorCls: this.getEventColor(evt),
            _elId: selector + '-' + evt._weekIndex,
            _isRecurring: evt.Recurrence && evt.Recurrence != '',
            _isReminder: evt[this.fieldReminder] && evt[this.fieldReminder] != '',
            Title: (evt[this.fieldIsAllDay] ? '' : Ext.Date.format(evt[this.fieldStartDate], 'g:ia ')) + (!title || title.length == 0 ? '(No title)' : title)
        },
        evt);
    },
    getEventColor: function (evt) {
        //return 'ext-color-' + (evt[M.CalendarId.name] ? evt[M.CalendarId.name] : 'default') + (evt._renderAsAllDay ? '-ad' : '');
        return 'ext-color-1' + (evt._renderAsAllDay ? '-ad' : '');
    },
    // private
    getTemplateEventData: function (evt, selector) {
        var data = {};

        data._selectorCls = selector;
        data._colorCls = this.getEventColor(evt);
        data._elId = selector + (evt._weekIndex ? '-' + evt._weekIndex : '');
        data._isRecurring = evt.Recurrence && evt.Recurrence != '';
        data._isReminder = evt[this.fieldReminder] && evt[this.fieldReminder] != '';
        var title = evt[this.fieldTitle];
        data.Title = (evt[this.fieldIsAllDay] ? '' : Ext.Date.format(evt[this.fieldStartDate], 'g:ia ')) + (!title || title.length == 0 ? '(No title)' : title);

        return Ext.applyIf(data, evt);
    },

    // The edit popup window is not part of the CalendarPanel itself -- it is a separate component.
    // This makes it very easy to swap it out with a different type of window or custom view, or omit
    // it altogether. Because of this, it's up to the application code to tie the pieces together.
    // Note that this function is called from various event handlers in the CalendarPanel above.
    showEditWindow: function (rec, animateTarget) {
        if (!this.editWin) {
            this.editWin = Ext.create('Ext.calendar.form.EventWindow', {
                calendarStore: this.calendarStore,
                listeners: {
                    'eventadd': {
                        fn: function (win, rec) {
                            win.hide();
                            rec.data.IsNew = false;
                            this.eventStore.add(rec);
                            this.eventStore.sync();
                            this.showMsg('Event ' + rec.data.Title + ' was added');
                        },
                        scope: this
                    },
                    'eventupdate': {
                        fn: function (win, rec) {
                            win.hide();
                            rec.commit();
                            this.eventStore.sync();
                            this.showMsg('Event ' + rec.data.Title + ' was updated');
                        },
                        scope: this
                    },
                    'eventdelete': {
                        fn: function (win, rec) {
                            this.eventStore.remove(rec);
                            this.eventStore.sync();
                            win.hide();
                            this.showMsg('Event ' + rec.data.Title + ' was deleted');
                        },
                        scope: this
                    },
                    'editdetails': {
                        fn: function (win, rec) {
                            win.hide();
                            Ext.getCmp('app-calendar').showEditForm(rec);
                        }
                    }
                }
            });
        }
        this.editWin.show(rec, animateTarget);
    },

    // The CalendarPanel itself supports the standard Panel title config, but that title
    // only spans the calendar views.  For a title that spans the entire width of the app
    // we added a title to the layout's outer center region that is app-specific. This code
    // updates that outer title based on the currently-selected view range anytime the view changes.
    updateTitle: function (startDt, endDt) {
        var p = Ext.getCmp('app-center'),
            fmt = Ext.Date.format;

        if (Ext.Date.clearTime(startDt).getTime() == Ext.Date.clearTime(endDt).getTime()) {
            p.setTitle(fmt(startDt, 'Y年m月d日'));
        }
        else if (startDt.getFullYear() == endDt.getFullYear()) {
            if (startDt.getMonth() == endDt.getMonth()) {
                p.setTitle(fmt(startDt, 'F j') + ' - ' + fmt(endDt, 'j, Y'));
            }
            else {
                p.setTitle(fmt(startDt, 'F j') + ' - ' + fmt(endDt, 'F j, Y'));
            }
        }
        else {
            p.setTitle(fmt(startDt, 'F j, Y') + ' - ' + fmt(endDt, 'F j, Y'));
        }
    },

    // This is an application-specific way to communicate CalendarPanel event messages back to the user.
    // This could be replaced with a function to do "toast" style messages, growl messages, etc. This will
    // vary based on application requirements, which is why it's not baked into the CalendarPanel.
    showMsg: function (msg) {
        //Ext.fly('app-msg').update(msg).removeCls('x-hidden');
    },
    clearMsg: function () {
        //Ext.fly('app-msg').update('').addCls('x-hidden');
    }
});