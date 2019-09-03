

//定义编辑对话框
Ext.define('App.grfz.xxlr.mzpcda.addDlg', {
    extend: 'App.Common.EditDlg',
    title: '民主评测信息',
	width:650,
	height:300,
    QUICKDETECT: false,
    initComponent: function () {
    	
    	var nowTime = new Date();
    	
        
        this.XM=  Ext.create('Ext.form.field.Text', {
    	      labelWidth: 100,   
              name: 'XM',
              emptyText: '',
              allowBlank: false,
              fieldLabel: '姓名',
              width: 240,
             
        });
        
        this.ND=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
           name: 'ND',
           emptyText: '',
           allowBlank: true,
           fieldLabel: '年度',
           width: 240,
          
      });
        
       this.SZDW=  Ext.create('Ext.form.field.Text', {
    	   labelWidth: 100,
            name: 'SZDW',
            emptyText: '',
            allowBlank: true,
            fieldLabel: '所在单位',
            width: 240,
           
       });
       

      
      this.CPQK=Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
	        fieldLabel: '评测情况',
			width : 240,
			 allowBlank: false,
		    name: 'CPQK',	       
		    emptyText: '',
		    
           
       });
      
  
      this.JH=  Ext.create('Ext.form.field.Text', {
    	  labelWidth: 100,
          name: 'JH',
          emptyText: '',
          allowBlank: false,
          fieldLabel: '警号',
          width: 240,
         
     });


        this.leftContain=Ext.create('Ext.container.Container',{
        	width:600,
        	height:190,
        	layout:'absolute',
        	items:[
        	       {
                       x:20,
                       y:20,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.XM,
                                this.ND ,
                                
                       ]
                   },
                   {
                	   x:20,
                       y:50,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.SZDW,
                                
                                this.CPQK  
                       ]
                   },
                   {
                	   x:20,
                       y:80,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ 
                                this.JH ,
                                
                       ]
                   },
        	       
        	       ]
        })
        
  
        this.items = [  
               {
                xtype: 'container',
                layout: 'hbox',
                items: [ this.leftContain,
                         
                ]
            }
            ],           
      
        this.callParent(arguments);
    },

});

