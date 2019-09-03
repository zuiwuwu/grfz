Ext.define('App.grfz.highsearch.xqahxxContain', {
    extend: 'Ext.container.Container',
    layout : 'absolute',
    border: 1,
    style:{
    },
    initComponent: function () {   	
    	
    	this.XQAH=  Ext.create('Ext.form.field.Text', {
    		 x:60,
    		 y:15,
     	     labelWidth: 60,   
             name: 'XQAH',
             emptyText: '',
             allowBlank: false,
             fieldLabel: '兴趣爱好',
             width: 240,
            
       });
    	 	 
    	this.items=[this.XQAH]
    	this.callParent(arguments);
    },
    getValue:function(){
    	  var me=this;
    	  var filters = [{
  				property : 'XQAH',
  				value : me.XQAH.getValue(),
  			}]
    	  return filters
      }
});