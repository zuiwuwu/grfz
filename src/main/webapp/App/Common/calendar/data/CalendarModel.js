Ext.define('App.Common.calendar.data.CalendarModel', {
    extend: 'Ext.data.Model',
    
    requires: [
        'Ext.util.MixedCollection',
        'App.Common.calendar.data.CalendarMappings'
    ],
    
    statics: {
        /**
         * Reconfigures the default record definition based on the current {@link App.Common.calendar.data.CalendarMappings CalendarMappings}
         * object. See the header documentation for {@link App.Common.calendar.data.CalendarMappings} for complete details and 
         * examples of reconfiguring a CalendarRecord.
         * @method create
         * @static
         * @return {Function} The updated CalendarRecord constructor function
         */
        reconfigure: function(){
            var Data = App.Common.calendar.data,
                Mappings = Data.CalendarMappings,
                proto = Data.CalendarModel.prototype,
                fields = [];
            
            // It is critical that the id property mapping is updated in case it changed, since it
            // is used elsewhere in the data package to match records on CRUD actions:
            proto.idProperty = Mappings.CalendarId.name || 'id';
            
            for(prop in Mappings){
                if(Mappings.hasOwnProperty(prop)){
                    fields.push(Mappings[prop]);
                }
            }
            proto.fields.clear();
            for(var i = 0, len = fields.length; i < len; i++){
                proto.fields.add(Ext.create('Ext.data.Field', fields[i]));
            }
            return Data.CalendarModel;
        }
    }
},
function() {
    App.Common.calendar.data.CalendarModel.reconfigure();
});