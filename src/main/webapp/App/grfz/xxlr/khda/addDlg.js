

//定义编辑对话框
Ext.define('App.grfz.xxlr.khda.addDlg', {
    extend: 'App.Common.EditDlg',
    title: '考核信息',
	width:650,
	height:300,
    QUICKDETECT: false,
    initComponent: function () {
    	
    	var nowTime = new Date();
    	
        
        this.USERNAME=  Ext.create('Ext.form.field.Text', {
    	      labelWidth: 100,   
              name: 'USERNAME',
              emptyText: '',
              allowBlank: false,
              fieldLabel: '用户名',
              width: 240,
             
        });
        
        this.TIME=  Ext.create('Ext.form.field.Date', {
    	   labelWidth: 100,
           name: 'TIME',
           format: 'Y年', 
           fieldLabel: '时间',
           width: 240,
           anchor: '100%',
      });
        
       this.GRADE=  Ext.create('App.Common.ComboBoxDropList', {
    	   labelWidth: 100,
            name: 'GRADE',
            fieldLabel: '等级评定',
            width: 240,
            url: '../GRFZZD/getGWYKHDCList',
            valueField: 'NAME',
            displayField:'NAME',
            value:'',
            noCache: false
           
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
                       items: [ this.USERNAME,
                                this.TIME ,
                                
                       ]
                   },
                   {
                	   x:20,
                       y:50,
                       xtype: 'container',
                       layout: 'hbox',
                       items: [ this.GRADE
                       ]
                   }
        	       
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

