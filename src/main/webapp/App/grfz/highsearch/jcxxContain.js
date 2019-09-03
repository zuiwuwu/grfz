Ext.define('App.grfz.highsearch.jcxxContain', {
    extend: 'Ext.container.Container',
    layout : 'absolute',
    border: 1,
    style:{
    },
    initComponent: function () {   	
    	 this.JCLB = Ext.create('App.Common.ComboBoxDropList', {
    		 x:60,
    		 y:15,
    		 fieldLabel: '奖惩类别',
             width: 240,
             labelWidth: 60,
             allowBlank: false,
             url: '../GRFZZD/getDBMList',
             valueField: 'ID',
             displayField:'NAME',
             name:'JCLB',
             value:'',
             noCache: false
          });
    	 
    	this.items=[this.JCLB]
    	this.callParent(arguments);
    },
    getValue:function(){
  	  var me=this;
  	  var filters = [{
				property : 'JCLB',
				value : me.JCLB.getValue(),
			}]
  	  return filters
    }
});