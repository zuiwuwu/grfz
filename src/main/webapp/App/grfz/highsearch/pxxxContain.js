Ext.define('App.grfz.highsearch.pxxxContain', {
    extend: 'Ext.container.Container',
    layout : 'absolute',
    border: 1,
    style:{
    },
    initComponent: function () {   	
    	
    	 this.PXLB = Ext.create('App.Common.ComboBoxDropList', {
    		  x:60,
    		  y:15,
              fieldLabel: '培训类别',
              width: 240,
              labelWidth: 60,
              allowBlank: false,
              url: '../GRFZZD/getDBMList',
              valueField: 'ID',
              displayField:'NAME',
              name:'PXLB',
              value:'',
              noCache: false
          });
    	 
    	this.items=[this.PXLB]
    	this.callParent(arguments);
    },
    getValue:function(){
  	  var me=this;
  	  var filters = [{
				property : 'PXLB',
				value : me.PXLB.getValue(),
			}]
  	  return filters
    }
});