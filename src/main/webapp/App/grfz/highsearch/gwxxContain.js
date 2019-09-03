Ext.define('App.grfz.highsearch.gwxxContain', {
    extend: 'Ext.container.Container',
    layout : 'absolute',
    border: 1,
    initComponent: function () {   	
    	 this.GWLB = Ext.create('App.Common.ComboBoxDropList', {
             fieldLabel: '岗位类别',
             width: 240,
             labelWidth: 60,
             x:60,
             y:15,
             allowBlank: false,
             url: '../GRFZZD/getGWLBList',
             valueField: 'ID',
             displayField:'NAME',
             name:'GWLB',
             value:'',
             noCache: false
         });
    	 
    	this.GWNDSTART=  Ext.create('Ext.form.field.Text', {
    		 x:360,
             y:15,
     	     labelWidth: 30,   
             name: 'GWNDSTART',         
             emptyText: '',
             allowBlank: false,
             fieldLabel: '年度',
             width: 100,
            
       });
    	this.GWNDSTOP=  Ext.create('Ext.form.field.Text', {
    		 x:470,
             y:15,
    	    labelWidth: 25,   
            name: 'GWNDSTOP',
            emptyText: '',
            allowBlank: false,
            fieldLabel: '至',
            width: 100,
           
      });
    
    	 this.NDCJPMJK = Ext.create('App.Common.ComboBoxDropList', {
    		  x:630,
              y:15,
              fieldLabel: '年度成绩排名情况',
              width: 300,
              labelWidth: 120,
              allowBlank: false,
              url: '../GRFZZD/getCJPMList',
              valueField: 'ID',
              displayField:'NAME',
              name:'NDCJPMJK',
              value:'',
              noCache: false
          });
    	 
    	this.items=[this.GWLB,this.GWNDSTART,this.GWNDSTOP,this.NDCJPMJK]
    	this.callParent(arguments);
    },
    getValue:function(){
  	  var me=this;
  	  var filters = [{
				property : 'GWLB',
				value : me.GWLB.getValue(),
			},{
				property : 'GWNDSTART',
				value : me.GWNDSTART.getValue(),
			},{
				property : 'GWNDSTOP',
				value : me.GWNDSTOP.getValue(),
			},{
				property : 'NDCJPMJK',
				value : me.NDCJPMJK.getValue(),
			}]
  	  return filters
    }
});