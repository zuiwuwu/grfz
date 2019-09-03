/*
 * A simple reusable store that loads static calendar field definitions into memory
 * and can be bound to the CalendarCombo widget and used for calendar color selection.
 */
Ext.define('App.Common.calendar.data.MemoryCalendarStore', {
    extend: 'Ext.data.Store',
    model: 'App.Common.calendar.data.CalendarModel',
    
    requires: [
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
        'App.Common.calendar.data.CalendarModel',
        'App.Common.calendar.data.CalendarMappings'
    ],
    
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'calendars'
        },
        writer: {
            type: 'json'
        }
    },

    autoLoad: true,
    
    initComponent: function() {
        var me = this,
            calendarData = App.Common.calendar.data;
            
        me.sorters = me.sorters || [{
            property: calendarData.CalendarMappings.Title.name,
            direction: 'ASC'
        }];
        
        me.idProperty = me.idProperty || calendarData.CalendarMappings.CalendarId.name || 'id';
        
        me.fields = calendarData.CalendarModel.prototype.fields.getRange();
        
        me.callParent(arguments);
    }
});