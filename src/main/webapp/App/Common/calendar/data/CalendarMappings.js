//@define App.Common.calendar.data.CalendarMappings
/**
 * @class App.Common.calendar.data.CalendarMappings
 * @extends Object
 * A simple object that provides the field definitions for Calendar records so that they can be easily overridden.
 */
Ext.ns('App.Common.calendar.data');

App.Common.calendar.data.CalendarMappings = {
    CalendarId: {
        name:    'CalendarId',
        mapping: 'id',
        type:    'int'
    },
    Title: {
        name:    'Title',
        mapping: 'title',
        type:    'string'
    },
    Description: {
        name:    'Description', 
        mapping: 'desc',   
        type:    'string' 
    },
    ColorId: {
        name:    'ColorId',
        mapping: 'color',
        type:    'int'
    },
    IsHidden: {
        name:    'IsHidden',
        mapping: 'hidden',
        type:    'boolean'
    }
};