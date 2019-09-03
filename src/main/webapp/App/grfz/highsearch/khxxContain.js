Ext.define('App.grfz.highsearch.khxxContain', {
    extend: 'Ext.container.Container',
    layout :'vbox',
    initComponent: function () {   	
    	   	
    	this.EJYM=  Ext.create('Ext.form.field.Text', {
    		 x:360,
    		 y:15,
     	     labelWidth: 60,   
             name: 'EJYM',
             emptyText: '',
             allowBlank: false,
             fieldLabel: '年月',
             width: 240,
            
       });
    	this.EJND=  Ext.create('Ext.form.field.Text', {
   		     x:360,
   		     y:60,
    	     labelWidth: 60,   
             name: 'EJJD',
             emptyText: '',
             allowBlank: false,
             fieldLabel: '年度',
             width: 240,
           
      });
    	
    	this.EJYSCORE=  Ext.create('Ext.form.field.Text', {
    	  x:660,
   		  y:15,
  	      labelWidth: 60,   
          name: 'EJYSCORE',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '月得分',
          width: 240,
         
      });
    	this.EJNZSCORE=  Ext.create('Ext.form.field.Text', {
    		x:660,
       		y:60,
    	    labelWidth: 60,   
            name: 'EJNZSCORE',
            emptyText: '',
            allowBlank: false,
            fieldLabel: '年终得分',
            width: 240,
          }) ;
    	this.EJDBM = Ext.create('App.Common.ComboBoxDropList', {
    		 x:60,
    		 y:15,
             fieldLabel: '部门名称',
             width: 240,
             labelWidth: 60,
             allowBlank: false,
             url: '../GRFZZD/getDBMList',
             valueField: 'ID',
             displayField:'NAME',
             name:'EJDBM',
             value:'',
             noCache: false
         });
    	 this.EJDJPD = Ext.create('App.Common.ComboBoxDropList', {
    		 x:60,
    		 y:60,
             fieldLabel: '等级评定',
             width: 240,
             labelWidth: 60,
             allowBlank: false,
             url: '../GRFZZD/getDJPDList',
             valueField: 'ID',
             displayField:'NAME',
             name:'EJDJPD',
             value:'',
             noCache: false
         });
    	this.EJContain=Ext.create('Ext.container.Container',{
    		 layout : 'absolute',
    		 flex:1,
     	     height:100,
     	     cls: 'x-sp-main-toolbar',
    		 items:[this.EJDBM,this.EJYM,this.EJYSCORE,this.EJDJPD,this.EJND,this.EJNZSCORE]
    	})
    	
    	 this.QJYM=  Ext.create('Ext.form.field.Text', {
    		 x:360,
    		 y:15,
     	     labelWidth: 60,   
             name: 'QJYM',
             emptyText: '',
             allowBlank: false,
             fieldLabel: '年月',
             width: 240,
            
       });
    	this.QJND=  Ext.create('Ext.form.field.Text', {
   		     x:360,
   		     y:60,
    	     labelWidth: 60,   
             name: 'QJND',
             emptyText: '',
             allowBlank: false,
             fieldLabel: '年度',
             width: 240,
           
      });
    	
    	this.QJYSCORE=  Ext.create('Ext.form.field.Text', {
    	  x:660,
   		  y:15,
  	      labelWidth: 60,   
          name: 'QJYSCORE',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '月得分',
          width: 240,
         
      });
    	this.QJNZSCORE=  Ext.create('Ext.form.field.Text', {
    		x:660,
       		y:60,
    	    labelWidth: 60,   
            name: 'QJNZSCORE',
            emptyText: '',
            allowBlank: false,
            fieldLabel: '年终得分',
            width: 240,
          }) ;
    	this.QJDBM = Ext.create('App.Common.ComboBoxDropList', {
    		 x:60,
    		 y:15,
             fieldLabel: '部门名称',
             width: 240,
             labelWidth: 60,
             allowBlank: false,
             url: '../GRFZZD/getDBMList',
             valueField: 'ID',
             displayField:'NAME',
             name:'QJDBM',
             value:'',
             noCache: false
         });
    	 this.QJDJPD = Ext.create('App.Common.ComboBoxDropList', {
    		 x:60,
    		 y:60,
             fieldLabel: '等级评定',
             width: 240,
             labelWidth: 60,
             allowBlank: false,
             url: '../GRFZZD/getDJPDList',
             valueField: 'ID',
             displayField:'NAME',
             name:'QJDJPD',
             value:'',
             noCache: false
         });
    	this.QJContain=Ext.create('Ext.container.Container',{
    		 layout : 'absolute',
    		 flex:1,
     	     height:100,
     	     cls: 'x-sp-main-toolbar',
     	     items:[this.QJDBM,this.QJYM,this.QJYSCORE,this.QJDJPD,this.QJND,this.QJNZSCORE]
    	});
    	 this.SJYM=  Ext.create('Ext.form.field.Text', {
    		 x:360,
    		 y:15,
     	     labelWidth: 60,   
             name: 'QJYM',
             emptyText: '',
             allowBlank: false,
             fieldLabel: '年月',
             width: 240,
            
       });
    	this.SJND=  Ext.create('Ext.form.field.Text', {
   		     x:360,
   		     y:60,
    	     labelWidth: 60,   
             name: 'QJND',
             emptyText: '',
             allowBlank: false,
             fieldLabel: '年度',
             width: 240,
           
      });
    	
    	this.SJYSCORE=  Ext.create('Ext.form.field.Text', {
    	  x:660,
   		  y:15,
  	      labelWidth: 60,   
          name: 'QJYSCORE',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '月得分',
          width: 240,
         
      });
    	this.SJNZSCORE=  Ext.create('Ext.form.field.Text', {
    		x:660,
       		y:60,
    	    labelWidth: 60,   
            name: 'QJNZSCORE',
            emptyText: '',
            allowBlank: false,
            fieldLabel: '年终得分',
            width: 240,
          }) ;
    	this.SJDBM = Ext.create('App.Common.ComboBoxDropList', {
    		 x:60,
    		 y:15,
             fieldLabel: '部门名称',
             width: 240,
             labelWidth: 60,
             allowBlank: false,
             url: '../GRFZZD/getDBMList',
             valueField: 'ID',
             displayField:'NAME',
             name:'QJDBM',
             value:'',
             noCache: false
         });
    	
    	 this.SJDJPD = Ext.create('App.Common.ComboBoxDropList', {
    		 x:60,
    		 y:60,
             fieldLabel: '等级评定',
             width: 240,
             labelWidth: 60,
             allowBlank: false,
             url: '../GRFZZD/getSJKHDCList',
             valueField: 'ID',
             displayField:'NAME',
             name:'SJDJPD',
             value:'',
             noCache: false
         });
    	 
    		this.SJJD=  Ext.create('Ext.form.field.Text', {
        		x:960,
           		y:60,
        	    labelWidth: 60,   
                name: 'SJJD',
                emptyText: '',
                allowBlank: false,
                fieldLabel: '季度',
                width: 240,
              }) ;
    		this.SJJDSCORE=  Ext.create('Ext.form.field.Text', {
        		x:1260,
           		y:60,
        	    labelWidth: 60,   
                name: 'SJJDSCORE',
                emptyText: '',
                allowBlank: false,
                fieldLabel: '季度得分',
                width: 240,
              }) ;
    	this.SJContain=Ext.create('Ext.container.Container',{
    		 layout : 'absolute',
    		 flex:1,
     	     height:100,
     	     cls: 'x-sp-main-toolbar',
     	    items:[this.SJDBM,this.SJYM,this.SJYSCORE,this.SJDJPD,this.SJND,this.SJNZSCORE,this.SJJD,this.SJJDSCORE]
    	});
    	
    	this.GWYNDSTART=  Ext.create('Ext.form.field.Text', {
    		x:60,
    		y:15,
    	    labelWidth: 60,   
            name: 'GWYNDSTART',
            emptyText: '',
            allowBlank: false,
            fieldLabel: '年度区间',
            width: 140,
          }) ;
    	this.GWYNDSTOP=  Ext.create('Ext.form.field.Text', {
    		x:220,
    		y:15,
    	    labelWidth: 20,   
            name: 'GWYNDSTOP',
            emptyText: '',
            allowBlank: false,
            fieldLabel: '至',
            width: 100,
          }) ;
    	 this.GWYDJPD = Ext.create('App.Common.ComboBoxDropList', {
    		 x:380,
    		 y:15,			 
             fieldLabel: '等级评定',
             width: 240,
             labelWidth: 60,
             allowBlank: false,
             url: '../GRFZZD/getGWYKHDCList',
             valueField: 'ID',
             displayField:'NAME',
             name:'GWYDJPD',
             value:'',
             noCache: false
         });
    	this.GWYContain=Ext.create('Ext.container.Container',{
    	 layout : 'absolute',
   		 flex:1,
    	 height:50,
    	 cls: 'x-sp-main-toolbar',
   		 items:[this.GWYNDSTART,this.GWYNDSTOP,this.GWYDJPD]
   	});
    	this.items=[{
	           xtype: 'container',
	           layout: 'hbox',
	           width: '100%',
	           height:100,
	           items: [{ 
	        	   xtype: 'component',
	        	   width:200,
	       	       height:100,
	       	       cls: 'x-sp-main-toolbar',
	       	       padding:'40 20 40 40',
	       	       html:'部门二级考核'
	        	   },
	        	   this.EJContain
	           ]
           },{
	           xtype: 'container',
	           layout: 'hbox',  
	           width: '100%',
	           height:100,
	           items: [{ 
	        	   xtype: 'component',
	        	   width:200,
	       	       height:100,
	       	       cls: 'x-sp-main-toolbar',
	       	       padding:'40 20 40 40',
	       	       html:'全警派出所等级化考核'
	        	   },
	        	   this.QJContain
	           ]
           },{
	           xtype: 'container',
	           layout: 'hbox',  
	           width: '100%',
	           height:100,
	           items: [{ 
	        	   xtype: 'component',
	        	   width:200,
	       	       height:100,
	       	       cls: 'x-sp-main-toolbar',
	       	       padding:'40 20 40 40',
	       	       html:'市局全员绩效考核'
	        	   },
	        	   this.SJContain
	           ]
           },{
	           xtype: 'container',
	           layout: 'hbox',  
	           width: '100%',
	           height:50,
	           items: [{ 
	        	   xtype: 'component',
	        	   width:200,
	       	       height:50,
	       	       cls: 'x-sp-main-toolbar',
	       	       padding:'15 20 15 40',
	       	       html:'公务员年度考核'
	        	   },
	        	   this.GWYContain
	           ]
           }]
    	this.callParent(arguments);
    },
   
});