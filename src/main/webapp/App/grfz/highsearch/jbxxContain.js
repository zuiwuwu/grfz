Ext.define('App.grfz.highsearch.jbxxContain', {
    extend: 'Ext.container.Container',
    layout : 'absolute',
    border: 1,
    style:{
    },
    initComponent: function () {   	
    	  	 
    	this.XM=  Ext.create('Ext.form.field.Text', {   		
     	     labelWidth: 60,   
             name: 'XM',
             emptyText: '',
             x:60,
             y:15,
             allowBlank: false,
             fieldLabel: '姓名',
             width: 240,
            
       });
    	this.NL=  Ext.create('Ext.form.field.Text', {
     	     labelWidth: 60,   
             name: 'NL',
             emptyText: '',
             x:360,
             y:15,
             allowBlank: false,
             fieldLabel: '年龄',
             width: 240,
            
       });
    	
    	this.PHONE=  Ext.create('Ext.form.field.Text', {
  	      labelWidth: 60,   
          name: 'PHONE',
          emptyText: '',
          x:660,
          y:15,
          allowBlank: false,
          fieldLabel: '手机号',
          width: 240,
         
    });
    	 this.DBM = Ext.create('App.Common.ComboBoxDropList', {
              fieldLabel: '大部门',
              width: 240,
              labelWidth: 60,
              x:960,
              y:15,
              allowBlank: false,
              url: '../GRFZZD/getDBMList',
              valueField: 'ID',
              displayField:'NAME',
              name:'DBM',
              value:'',
              noCache: false
          });
    	 
    	this.items=[this.XM,this.NL,this.PHONE,this.DBM]
    	this.callParent(arguments);
    },
      getValue:function(){
    	  var me=this;
    	  var filters = [{
				property : 'XM',
				value : me.XM.getValue(),
			},{
				property : 'NL',
				value : me.NL.getValue(),
			},{
				property : 'PHONE',
				value : me.PHONE.getValue(),
			},{
				property : 'DBM',
				value : me.DBM.getValue(),
			}]
    	  return filters
      }
});