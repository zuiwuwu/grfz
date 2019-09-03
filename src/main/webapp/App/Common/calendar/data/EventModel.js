Ext.define('App.Common.calendar.data.EventModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.util.MixedCollection',
        'App.Common.calendar.data.EventMappings'
    ],

    statics: {
        /**
        * Reconfigures the default record definition based on the current {@link App.Common.calendar.data.EventMappings EventMappings}
        * object. See the header documentation for {@link App.Common.calendar.data.EventMappings} for complete details and 
        * examples of reconfiguring an EventRecord.
        * @method create
        * @static
        * @return {Function} The updated EventRecord constructor function
        */
        reconfigure: function () {
            var Data = App.Common.calendar.data,
                Mappings = Data.EventMappings,
                proto = Data.EventModel.prototype,
                fields = [];
            // It is critical that the id property mapping is updated in case it changed, since it
            // is used elsewhere in the data package to match records on CRUD actions:
            proto.idProperty = Mappings.EventId.name || 'id';
            proto.idField.name = Mappings.EventId.name || 'id';

            for (prop in Mappings) {
                if (Mappings.hasOwnProperty(prop)) {
                    fields.push(Mappings[prop]);
                }
            }
            proto.fields.clear();
            for (var i = 0, len = fields.length; i < len; i++) {
                proto.fields.add(Ext.create('Ext.data.Field', fields[i]));
            }
            return Data.EventModel;
        }
    }
},
function () {
    App.Common.calendar.data.EventModel.reconfigure();
});